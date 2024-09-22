import { Points, radianToDegree } from 'ixfx/geometry.js';
import { Dom, Numbers } from 'ixfx/bundle.js';
import { Bipolar } from 'ixfx/numbers.js';
import { Audio } from 'ixfx/io.js';

import * as Util from './util.js';
import * as EspruinoSnippets from './espruino.js';

const settings = Object.freeze({
  // Filter device list
  device: ``, // Put in the name of your device here, eg `Puck.js a123`,
  // Interpolation amount for each axis
  axisInterpolation: 0.01,
  // Maximum value of sensor.
  // This might need to be dropped when using weaker magnets
  // or increased if you're hitting -1/1 too easily.
  magnetMax: 16_000,
  // Range of frequencies
  frequencyRange: [65.406, 523.251],
  // Type of oscillator
  oscillator: /** @type OscillatorType */(`sawtooth`),
  // Helper to show raw data
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/**
 * @typedef {Readonly<{
 *  lastReading: Util.MagReading
 *  mag: Util.MagReading
 *  zero: Util.MagReading|undefined
 *  xyDegrees: number
 *  strength: number
 *  voice: Audio.BasicAudioOscillator|undefined
 * }>} State
 */

/** @type State */
let state = {
  lastReading: { x: 0, y: 0, z: 0 },
  mag: { x: 0, y: 0, z: 0 },
  xyDegrees: 0,
  zero: undefined,
  strength: 0,
  voice: undefined
};

/**
 * Use the state
 * @param {State} state 
 */
function use(state) {
  const { dataDisplay, frequencyRange } = settings;
  const { strength, mag, xyDegrees, voice } = state;

  // Debug-print out values to page
  dataDisplay.update({ mag: state.mag, strength, xyDegrees });

  if (!voice) return; // No oscillator
  const { ctx, gain, osc } = voice;

  const freq = Numbers.scale(xyDegrees, 0, 360, frequencyRange[0], frequencyRange[1]);

  gain.gain.setValueAtTime(strength, ctx.currentTime);
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
};

/**
 * Do some additional processing of sensor data
 * since this will run more quickly than we get data
 */
function update() {
  const { axisInterpolation } = settings;
  const { lastReading, mag } = state;

  // Interpolate from last reading
  // This smooths out noise and keeps things dynamic
  const x = Numbers.interpolate(axisInterpolation, mag.x, lastReading.x);
  const y = Numbers.interpolate(axisInterpolation, mag.y, lastReading.y);
  const z = Numbers.interpolate(axisInterpolation, mag.z, lastReading.z);

  // TODO: more processing of x,y,z?

  // Create a Point from it
  const pt = { x, y, z };

  // Calculate distance from {x:0,y:0,z:0}.
  // This essentially gives a magnetic 'strength' value,
  // regardless of magnet's direction.
  const strength = Numbers.clamp(Points.distance(Points.Empty3d, pt));

  // Calculate horizontal-plane angle. Points.angleRadian only uses X & Y values
  // Range will be 0..360
  const xyDegrees = radianToDegree(Points.angleRadianCircle(Points.Empty, pt));

  // Save & use newly calculated data
  use(saveState({ mag: pt, strength, xyDegrees }));

  // Call 'update' again, in a loop
  window.requestAnimationFrame(update);
}

/**
 * Function to clean input data and return normalised data,
 * where z, y & z are on -1..1 scale.
 * 
 * This will get called at pace of data sending from the Espruino.
 * @param {Util.MagReading} data 
 * @returns 
 */
function normaliseData(data) {
  const { magnetMax } = settings;
  let { zero } = state;
  let { x, y, z } = data;

  if (zero) {
    // Subtract zero from current
    x -= zero.x;
    y -= zero.y;
    z -= zero.z;
  } else {
    // Haven't yet got a 'zero' value
    saveState({ zero: { x, y, z } });
  }

  // Scale value to a rough min/max. Return result will be on -1...1 bipolar scale (Bipolar.scale also clamps)
  x = Bipolar.scale(x, -magnetMax, magnetMax);
  y = Bipolar.scale(y, -magnetMax, magnetMax);
  z = Bipolar.scale(z, -magnetMax, magnetMax);

  // Compose x, y & z values into an object
  const cleaned = { x, y, z };

  // Save to state
  saveState({ lastReading: cleaned });

  // Return it back (so it can later be sent to plotter etc)
  return cleaned;
};

function setup() {
  const { frequencyRange, oscillator } = settings;
  // Init the helper, giving it a function to receive the data
  Util.init(normaliseData);

  // Connect when button is pressed
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, () => {
    // Create oscillator
    // This sets up a simple web audio graph
    const voice = Audio.createOscillator({
      frequency: frequencyRange[0],
      type: oscillator
    });
    saveState({ voice });

    voice.osc.start();

    // Pass in chosen script and optional Puck id filter
    Util.connect(EspruinoSnippets.push, settings.device);
  });

  // Recalibrate if 'Z' is pressed on keyboard
  document.addEventListener(`keypress`, event => {
    if (event.key === `z`) {
      console.log(`Zeroed!`);
      saveState({ zero: undefined });
    }
  });
  update();
};

setup();


/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
