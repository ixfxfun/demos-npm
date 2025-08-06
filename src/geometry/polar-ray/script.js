import { continuously } from '@ixfx/core';
import { Points } from '@ixfx/geometry';
import { wave } from '@ixfx/modulation';
import * as Things from './thing.js';
import { CanvasHelper } from '@ixfx/visual';

const settings = Object.freeze({
  // How many things to distribute around the circumference
  totalThings: 30,
  offsetModulator: wave({ secs: 10, shape: `sine-bipolar` }),
  angleModulator: wave({ secs: 35, shape: `saw` }),
  canvas: new CanvasHelper(`canvas`, { resizeLogic: `both` })
});

/**
 * @typedef {Readonly<{
 *  things: Things.Thing[]        // Created 'things' (ie. the lines)
 *  scaleBy: number               // Scaling factor for relative coordinates
 *  originAbsolute: Points.Point  // Middle of viewport
 *  offsetModulation: number
 *  angleModulation: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  things: [],
  scaleBy: 1,
  originAbsolute: { x: 0, y: 0 },
  offsetModulation: 1,
  angleModulation: 1
});

function update() {
  const iw = window.innerWidth / 2;
  const ih = window.innerHeight / 2;

  // Factor to scale relative coordinates by
  const scaleBy = Math.min(iw, ih);

  // Middle of viewport
  const originAbsolute = { x: iw, y: ih };

  // Compute modulation
  const offsetModulation = settings.offsetModulator();
  const angleModulation = settings.angleModulator();

  // Save to state
  saveState({ scaleBy, originAbsolute, offsetModulation, angleModulation });

  // Mutate each thing and save them too
  const things = state.things.map(thing => Things.update(thing, state));
  saveState({ things });
}

/**
 * Use computed state
 */
function use() {
  const { canvas } = settings;
  const { things } = state;

  // Fade out canvas a bit by filling with black at 5% opacity
  canvas.fill(`hsl(0 0% 0% / 5%)`);
  for (const thing of things) {
    Things.use(canvas, thing, state);
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

