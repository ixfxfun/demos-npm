import { continuously } from '@ixfx/core';
import { Points } from '@ixfx/geometry';
import { wave } from '@ixfx/modulation';
import * as Things from './thing.js';

const settings = Object.freeze({
  // How many things to distribute around the circumference
  totalThings: 8,
  distanceModulator: wave({ secs: 10, shape: `arc` })
});

/**
 * @typedef {Readonly<{
 *  things: Things.Thing[] // Created 'things' (ie. the circles)
 *  scaleBy: number        // Scaling factor for relative coordinates
 *  origin: Points.Point   // Middle of viewport, in absolute coordinates
 *  distanceModulation: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  things: [],
  scaleBy: 1,
  origin: { x: 0, y: 0 },
  distanceModulation: 1
});

function update() {
  const iw = window.innerWidth;
  const ih = window.innerHeight;

  // Factor to scale relative coordinates by
  const scaleBy = Math.min(iw, ih);

  // Middle of viewport
  const origin = {
    x: iw / 2,
    y: ih / 2
  };

  // Compute modulation
  const distanceModulation = settings.distanceModulator();

  // Mutate each thing
  const things = state.things.map(thing => Things.update(thing, state));

  // Save to state
  saveState({ scaleBy, origin, things, distanceModulation });
}

/**
 * Use computed state
 */
function use() {
  const { things } = state;
  for (const thing of things) {
    Things.use(thing, state);
  }
}

function createInitialPoints() {
  const { totalThings } = settings;

  // Evenly distribute angle by number of things (radian angle)
  const angleSteps = (Math.PI * 2) / totalThings;

  /** @type Things.Thing[] */
  const things = [];
  let angle = 0;

  for (let index = 0; index < totalThings; index++) {
    // Create a circle
    things.push(Things.create(angle, index));

    // Step angle for the next circle
    angle += angleSteps;
  }

  // Save everything into state
  saveState({ things });
}

function setup() {
  createInitialPoints();

  // Call continuously
  continuously(() => {
    update();
    use();
  }).start();
}
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

