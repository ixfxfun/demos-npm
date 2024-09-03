
import { jitter } from 'ixfx/modulation.js';
import * as Plot from './plot.js';

/**
 * @typedef {Readonly<{
 * ticks: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  ticks: 0
});

const update = () => {
  let { ticks } = state;
  ticks += 0.01;

  // Save and use state
  use(saveState({
    ticks
  }));

  window.requestAnimationFrame(update);

};

// With noise
const jitterFunction = jitter({ clamped: false, relative: 0.005 });


// Plot a series of functions
const draw = () => {
  const { ticks } = state;

  // To plot, the function should return a value between -1 and 1, and take two parameters.
  // -1 will be at the bottom of plot, 0 middle and 1 top
  demoSines();

  // Random:
  //Plot.plot(ticks, (ticks, x) => Math.random() * 2 - 1, { strokeStyle: `pink` });

  // Straight line:
  //Plot.plot(ticks, (ticks, x) => 0, { strokeStyle: `pink` });

  // A line that sinks to the bottom
  // (since ticks is an ever-incrementing number)
  // Plot.plot(ticks, (ticks, x) => ticks / 2, { strokeStyle: `pink` });

  // A line that angles from top-left to bottom-right
  // `x` parameter is given as 0 ... 1
  // Plot.plot(ticks, (ticks, x) => x * 2 - 1, { strokeStyle: `pink` });
};

const sineA = (ticks, x) => jitterFunction(Math.sin(x + ticks));
const sineB = (ticks, x) => (Math.sin(x + ticks) + Math.sin(2 * x)) / 2;
const sineC = (ticks, x) => (Math.sin(x + ticks) + Math.cos(2 * x)) / 2;
const sineD = (ticks, x) => (Math.sin(x + ticks) + Math.tanh(x)) / 2;

function demoSines() {
  const { ticks } = state;

  Plot.plot(ticks, sineA, { strokeStyle: `lightblue` });

  Plot.plot(ticks, sineB, {
    strokeStyle: `salmon`,
  });

  Plot.plot(ticks, sineC, {
    strokeStyle: `lightgreen`,
  });

  // These two waves use the same function,
  // but with a slight offset
  Plot.plot(ticks, sineD, {
    strokeStyle: `yellow`
  });

  Plot.plot(ticks, sineD, {
    strokeStyle: `lightyellow`,
    offset: 0.1
  });
}

/**
 * Use state
 * @param {State} state 
 */
function use(state) {
  Plot.newFrame();
  draw();

};


function setup() {
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