import { Points } from 'ixfx/geometry.js';
import { Forces } from 'ixfx/modulation.js';
import { continuously } from 'ixfx/flow.js';
import * as Util from './util.js';

// Define settings
const settings = Object.freeze({
  /** @type Forces.TargetOpts */
  target: {
    // Getting within 1% is good enough
    range: { x: 0.01, y: 0.01 },
    // Multiplier for acceleration. Higher = faster
    diminishBy: 0.001
  },
  // Drag force so it slows down
  dragForce: Forces.magnitudeForce(0.01),
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`)),
  targetEl:  /** @type HTMLElement */(document.querySelector(`#target`))
});

/**
 * @typedef {Readonly<{
 *  position: import('ixfx/geometry.js').Point
 *  velocity:import('ixfx/geometry.js').Point
 *  targetPos:import('ixfx/geometry.js').Point
 *  window: import('ixfx/geometry.js').Rect
 * }>} State
 */

let state = {
  // Assign random position (normalised 0..1 scale)
  position: Points.random(),
  // Starting velocity is 0, at rest
  velocity: { x: 0, y: 0 },
  // Default target for acceleration: middle of screen
  targetPos: { x: 0.5, y: 0.5 },
  // Record size of window
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

const update = () => {
  const { target, dragForce } = settings;
  const { targetPos, position, velocity } = state;

  // Apply targetForce
  const t = Forces.apply({ velocity, position },
    // Push towards target
    Forces.targetForce(targetPos, target),
    dragForce
  );

  // Wrap point to be between 0,0 and 1,1
  // This means if the new position is outside the bounds of the screen
  // it will carry over to other side
  const posAfterWrap = Points.wrap(t.position ?? Points.Empty);

  // Set to state
  saveState({
    velocity: t.velocity ?? Points.Empty,
    position: posAfterWrap
  });
};

/**
 * Position thing based on state
 * @param {State} state
 */
const use = (state) => {
  const { thingEl } = settings;
  const { position } = state;

  // Move the element
  Util.moveElement(thingEl, position);
};

function setup() {
  const { targetEl } = settings;

  continuously(() => {
    update();
    use(state);
  }).start();

  // Update our tracking of window size if there's a resize
  window.addEventListener(`resize`, () => {
    saveState({ window: { width: window.innerWidth, height: window.innerHeight } });
  });

  window.addEventListener(`pointerup`, (event) => {
    const { window } = state;

    // Normalise pointer to be in relative coords
    const pointerRelative = Points.normaliseByRect(event, window);

    // Set new target
    saveState({ targetPos: pointerRelative });
    Util.moveElement(targetEl, state.targetPos);
  });

  Util.moveElement(targetEl, state.targetPos);
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}