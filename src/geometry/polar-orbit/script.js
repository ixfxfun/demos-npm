import { Polar } from '@ixfx/geometry';
import * as Modulation from '@ixfx/modulation';
import * as Util from './util.js';

const settings = Object.freeze({
  // How much angle to increment each loop, if speed is 100%
  maxRadiansPerCycle: 0.05,
  // Modulator that makes a sine wave
  distanceWave: Modulation.wave({ shape: `sine`, hertz: 0.05 }),
  // Element we're moving
  thingElement: /** @type HTMLElement */(document.querySelector(`#thing`))
});

/** @typedef {Readonly<{
 * orbitSpeedFactor:number
 * angleRadians:number
 * distance:number
 * scaleBy:number
 * bounds: { center: {x:number,y:number}, width:number,height:number}
 * }>} State */

/** @type State */
let state = Object.freeze({
  // Multiplier for orbit speed
  orbitSpeedFactor: 0.1,
  // Current angle
  angleRadians: 0,
  // Current distance
  distance: 0,
  // Width or height of viewport, whichever is smaller
  scaleBy: 0,
  // Will be set to size of screen
  bounds: { width: 0, height: 0, center: { x: 0, y: 0 } }
});

// Update state of world
function update() {
  let { angleRadians, orbitSpeedFactor } = state;
  const { distanceWave, maxRadiansPerCycle } = settings;

  // Calculate new angle
  angleRadians = angleRadians + (maxRadiansPerCycle * orbitSpeedFactor);

  // Distance is determined by the oscillator
  const distance = distanceWave();

  // Update state
  saveState({
    ...state,
    angleRadians,
    distance,
  });
}

function use() {
  const { thingElement } = settings;
  const { bounds, scaleBy, distance, angleRadians } = state;
  const origin = bounds.center;

  // Make distance absolute, using the dimension of viewport
  const distanceAbs = distance * scaleBy / 2;  // Halve because we we're setting a radius, not diameter

  const point = Polar.toCartesian(distanceAbs, angleRadians, origin);
  Util.placeElementByCenter(thingElement, point);
}


function setup() {
  // When window has changed size, keep track of width, height & calc center point
  const updateBounds = () => {
    const bounds = {
      width: window.innerWidth,
      height: window.innerHeight,
      center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    };

    saveState({
      bounds: bounds,
      scaleBy: Math.min(bounds.width, bounds.height)
    });
  };


  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };

  window.addEventListener(`resize`, updateBounds);
  updateBounds();

  loop();

  document.querySelector(`#rangeSpeed`)?.addEventListener(`input`, event => {
    const element = /** @type {HTMLInputElement}*/(event.target);

    // Range slider is 0-500, normalise to 0..1
    saveState({ orbitSpeedFactor: Number.parseInt(element.value) / 500 });
  });
}
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
}