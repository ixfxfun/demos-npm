import { Bipolar } from 'ixfx/numbers.js';
import * as Numbers from 'ixfx/numbers.js';
import * as Util from './util.js';
import * as Html from './html.js';
import * as EspruinoSnippets from './espruino.js';

const settings = Object.freeze({
  // Filter device list
  device: ``, // Put in the name of your device here, eg `Puck.js a123`,
  // Interpolation amount for each axis
  axisInterpolation: 0.01
});

/**
 * @typedef {Readonly<{
 *  lastReading: Util.MagReading
 *  mag: Util.MagReading
 * }>} State
 */

/** @type State */
let state = {
  lastReading: { x: 0, y: 0, z: 0 },
  mag: { x: 0, y: 0, z: 0 }
};

/**
 * Use the state
 * @param {State} state 
 */
function use(state) {
  const { x, y, z } = state.mag;

  // Do something with values...

  // ...display them on page
  Html.set(`x`, x);
  Html.set(`y`, y);
  Html.set(`z`, z);

};

function update() {
  const { axisInterpolation } = settings;
  const { lastReading, mag } = state;

  // Do additional processing of data?

  // Eg. interpolate from mag values from last reading
  const x = Numbers.interpolate(axisInterpolation, mag.x, lastReading.x);
  const y = Numbers.interpolate(axisInterpolation, mag.y, lastReading.y);
  const z = Numbers.interpolate(axisInterpolation, mag.z, lastReading.z);

  // Save newly calculated data
  saveState({ mag: { x, y, z } });

  use(state);

  // Call itself again, in a loop
  window.requestAnimationFrame(update);
}

/**
 * Function to clean input data and return normalised data,
 * where z, y & z are on -1..1 scale.
 * 
 * This will get called at pace of data sending from the Espruino
 * @param {Util.MagReading} data 
 * @returns 
 */
function normaliseData(data) {
  let { x, y, z } = data;

  // Clamp to very broad ranges. 
  // This ought to be narrowed down depending on your interests...
  // Bipolar.scale is clamped to -1...1 scale.
  x = Bipolar.scale(x, -28_000, 28_000);
  y = Bipolar.scale(y, -28_000, 28_000);
  z = Bipolar.scale(z, -28_000, 28_000);

  // Compose x, y & z values into an object
  const cleaned = { x, y, z };

  // Save to state
  saveState({ lastReading: cleaned });

  // Return it back (so it can later be sent to plotter etc)
  return cleaned;
};

function setup() {
  // Init the helper
  Util.init(normaliseData);

  // Connect when button is pressed
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, () => {
    // Pass in chosen script, callback to receive data and optional Puck id filter
    Util.connect(EspruinoSnippets.poll, settings.device);
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
