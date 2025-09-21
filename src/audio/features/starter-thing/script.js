import * as Things from './thing.js';
import * as Util from './util.js';
import * as Meyda from '../lib/index.js';
import { continuously } from 'ixfx';
import { Normalise, scalePercent } from '@ixfx/numbers';

const settings = Object.freeze({
  // Meyda helper. In this case just one the feature extractor
  // is added, 'rms'.
  meyda: new Meyda.MeydaHelper({
    featureExtractors: [ `rms` ]
  }),

  // Used to normalise values on 0..1 scale
  rmsNormalise: Normalise.stream(),

  // How often to update state of thing
  thingUpdateSpeedMs: 100,

  // How often to do update/use of main sketch
  sketchUpdateSpeedMs: 10,
});

/** 
 * @typedef {Readonly<{
 *  lastData?: Meyda.MeydaAudioFeature
 *  thing: Things.Thing
 *  agitation: number
 * }>} State
 */

/** @type {State} */
let state = Object.freeze({
  thing: Things.create(),
  agitation: 0
});


function use() {
  const { agitation } = state;

  // 1. Do something with state?
  // Scale 'agitation' value to 10-80 so it's less strobey
  const lightness = scalePercent(agitation, 20, 30);
  document.body.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;

  // 2. Visually update thing too
  Things.use(state.thing);
}

function update() {
  const { lastData } = state;
  if (!lastData) return; // No audio feature data yet

  const { rmsNormalise } = settings;

  // 1. Compute changes to properties
  // Get RMS on a 0..1 scale
  let rmsNormalised = rmsNormalise(lastData.rms);

  // 2. Call saveState to save properties
  saveState({ agitation: rmsNormalised });
}

function setup() {
  const { meyda } = settings;

  // Initialise analyser
  meyda.onData = onData;
  meyda.init();

  // Update thing at a fixed rate
  continuously(() => {
    // Compute new state for thing
    const changedThing = Things.update(state.thing, state);

    // Save it
    saveState({ thing: changedThing });
  }, settings.thingUpdateSpeedMs).start();

  // Update state of sketch and use state
  // at full speed
  continuously(() => {
    update();
    use();
  }, settings.sketchUpdateSpeedMs).start();
}

/**
 * Called each time we have new analysis data
 * @param {Meyda.MeydaAudioFeature} data 
 */
function onData(data) {
  // Save all the feature data into state
  saveState({ lastData: data });
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

