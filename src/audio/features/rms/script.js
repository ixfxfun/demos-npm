import { continuously } from 'ixfx';
import { clamp, flip, movingAverage, Normalise } from '@ixfx/numbers';
import { defaultErrorHandler } from '@ixfx/dom';
import * as Meyda from '../lib/index.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Used to normalise values on 0..1 scale
  rmsNormalise: Normalise.stream(),

  // Calculate an average over 100 samples
  rmsAverager: movingAverage(100),

  // Meyda helper. We only want the 'rms' feature extractor
  meyda: new Meyda.MeydaHelper({
    featureExtractors: [ `rms` ]
  })
});

/**
 * @typedef {Readonly<{
 *  rms: number
 *  rmsAverage: number
 * }>} State
 */

/** @type State */
let state = {
  rms: 0,
  rmsAverage: 0
};


function update() {
  // No need to do anything for this sketch
}

function use() {
  const { rms, rmsAverage } = state;

  // Show numeric values for debugging
  Util.setText(`lblRmsAverageLevel`, Util.toPercentage(rmsAverage));
  Util.setText(`lblRmsLevel`, Util.toPercentage(rms));

  // Make sure value is 0...1, and then invert it
  const rmsRelative = flip(clamp(rms));
  const rmsAverageRelative = flip(clamp(rmsAverage));

  // Position circles according to relative level using helper functions from util.js
  Util.relativeMove(document.querySelector(`#rmsAverageLevel`), rmsAverageRelative);
  Util.relativeMove(document.querySelector(`#rmsLevel`), rmsRelative);
}

/**
 * Called each time we have a new analysis
 * @param {Meyda.MeydaAudioFeature} data 
 */
function onData(data) {
  const { rmsAverager, rmsNormalise } = settings;

  if (!(`rms` in data)) {
    // If we forgot to specify the audio extractor, 'rms' will be missing
    console.warn(`Expected 'rms' property was not present. Are audio feature settings correct?`);
    return;
  }

  let rms = data.rms;

  // 1. Normalise to 0..1 scale
  rms = rmsNormalise(rms);

  // 2. Add to averager, getting back average
  const rmsAverage = rmsAverager(rms);

  // 3. Save raw and average levels to state
  saveState({ rms, rmsAverage });

}

function setup() {
  const { meyda } = settings;

  // Show unexpected errors on the page to help debugger;
  defaultErrorHandler();

  // Initialise analyser
  meyda.onData = onData;
  meyda.init();

  // Call update and use continuously
  continuously(() => {
    update();
    use();
  }).start();
}
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