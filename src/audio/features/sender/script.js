// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as MeydaLib from "../lib/index.js";

/** 
 * See https://meyda.js.org/audio-features for list of features and info
 * @type {Partial<MeydaLib.MeydaLibOptions>} 
 * */
const meydaSettings = {
  bufferSize: 512,
  featureExtractors: [
    `rms`,
    `zcr`,
    `spectralCentroid`,
    `spectralFlatness`,
    `spectralSlope`,
    `spectralRolloff`,
    `spectralSpread`,
    `spectralSkewness`,
    `spectralKurtosis`,
    `loudness`,
    `perceptualSpread`,
    `mfcc`
  ]
};

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: false,
    websocket: `wss://${window.location.host}/ws`
  }),
  btnPause: /** @type HTMLButtonElement */ (document.querySelector(`#btnPause`)),
  lastDataEl: /** @type HTMLElement */(document.querySelector(`#lastData`))
});

/**
 * @typedef {Readonly<{
 * helper:MeydaLib.MeydaHelper|undefined
 * }>} State
 */

/** @type State */
let state = {
  helper: undefined
};

function setup() {
  const { btnPause, lastDataEl, remote } = settings;
  btnPause.disabled = true;
  btnPause.addEventListener(`click`, () => {
    const { helper } = state;
    if (!helper) {
      console.warn(`Bug. No Meyda helper instance`);
      return;
    }
    helper.paused = !helper.paused;
    if (helper.paused) {
      btnPause.innerText = `Resume`;
    } else {
      btnPause.innerText = `Pause`;
    }
  });

  // Init helper
  const helper = new MeydaLib.MeydaHelper(meydaSettings);
  btnPause.disabled = false;
  helper.onData = (d) => {
    lastDataEl.innerText = JSON.stringify(d, null, 2);
    remote.broadcast(d);
  };
  saveState({ helper });

  helper.init();

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
