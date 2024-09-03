import { movingAverage } from 'ixfx/numbers.js';
import { AudioAnalysers } from 'ixfx/io.js';
import { clamp, flip } from 'ixfx/numbers.js';
import { defaultErrorHandler } from 'ixfx/dom.js';
import * as Util from './util.js';

const settings = Object.freeze({
  btnStartEl:/** @type HTMLElement */(document.querySelector(`#btnStart`)),
  // Calculate an average over 100 samples
  averager: movingAverage(100),
});

/**
 * @typedef {Readonly<{
 *  avgLevel: number
 *  rawLevel: number
 * }>} State
 */

/**
 * Initial state
 * @type State
 */
let state = {
  avgLevel: 0,
  rawLevel: 0
};


/**
 * Update visuals based on current state
 */
const use = () => {
  const { rawLevel, avgLevel } = state;

  // Show numeric values for debugging
  Util.setText(`lblAvgLevel`, Util.toPercentage(avgLevel));
  Util.setText(`lblRawLevel`, Util.toPercentage(rawLevel));

  // Make sure value is 0...1, and then invert it
  const rawRelative = flip(clamp(rawLevel));
  const avgRelative = flip(clamp(avgLevel));

  // Position circles according to relative level using helper functions from util.js
  Util.relativeMove(document.querySelector(`#avgLevel`), avgRelative);
  Util.relativeMove(document.querySelector(`#rawLevel`), rawRelative);
};

/**
 * Called each time we have a new audio level reading
 * @param {number} rawLevel 
 */
const onData = (rawLevel) => {
  const { averager } = settings;

  // Add current level to averager, getting back the average
  const avgLevel = averager(rawLevel);

  // Save raw and average levels to state
  saveState({ rawLevel, avgLevel });

  use();
};

/**
 * Called when button in HTML is clicked
 */
const start = () => {
  const { btnStartEl } = settings;

  // Initialise analyser. 
  // Analyser runs in a loop, calling `onData` very fast. 
  // We use that loop to drive the sketch rather than make another
  AudioAnalysers.peakLevel(onData);

  // Disable button so it's not clicked twice
  btnStartEl.setAttribute(`disabled`, `true`);
};
/**
 * Setup sketch
 */
function setup() {
  const { btnStartEl } = settings;

  // Show unexpected errors on the page to help debugger;
  defaultErrorHandler();
  btnStartEl.addEventListener(`click`, start);
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