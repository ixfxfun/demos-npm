import { clamp } from "@ixfx/numbers";
import * as M from "https://unpkg.com/meyda@6.0.0-beta.2/dist/web/meyda.min.js";

// @ts-check
/**
 * @typedef {import('./meyda.js').default} MeydaLib
 */

/**
 * @typedef {import('./meyda-wa.js').MeydaAnalyzer} MeydaAnalyzer
 */

/**
 * @typedef {import('./meyda.js').MeydaFeaturesObject} MeydaAudioFeature
 */

const m = /** @type MeydaLib */(/** @type any **/(window).Meyda);

if (!m) throw new Error(`Meyda library not loaded?`);

/**
 * @typedef {object} MeydaLibOptions
 * @property {string} [inputId] If set, the exact id of the audio input device to use
 * @property {string} [inputNameMatch] If set, if an audio device contains this text, it will be used.
 * @property {string[]} featureExtractors
 * @property {number} numberOfMFCCCoefficients The number of MFCC co-efficients that the MFCC feature extractor should return
 * @property {number} numberOfBarkBands The number of bark bands that the loudness feature extractor should return
 * @property {number} chromaBands The number of bands to divide the spectrum into for the Chroma feature extractor. 12 is the standard number of semitones per octave in the western music tradition, but Meyda can use an arbitrary number of bands, which can be useful for microtonal music.
 * @property {number} melBands The number of Mel bands to use in the Mel Frequency Cepstral Co-efficients feature extractor
 * @property {number} sampleRate The number of samples per second of the incoming audio. This affects feature extraction outside of the context of the Web Audio API, and must be set accurately - otherwise calculations will be off.
 * @property {number} bufferSize The length of each buffer that Meyda will extract audio on. When recieving input via the Web Audio API, the Script Processor Node chunks incoming audio into arrays of this length. Longer buffers allow for more precision in the frequency domain, but increase the amount of time it takes for Meyda to output a set of audio features for the buffer. You can calculate how many sets of audio features Meyda will output per second by dividing the buffer size by the sample rate. If you're using Meyda for visualisation, make sure that you're collecting audio features at a rate that's faster than or equal to the video frame rate you expect.
*/

export class MeydaHelper {

  /** @type MeydaLibOptions */
  options;

  verbose = true;

  /** @type AudioContext|undefined */
  audioContext;

  /** @type {MeydaAnalyzer|undefined} */
  analyser;

  /**
   * @type string[]
   */
  cachedDevices = [];

  /** @type {(data:MeydaAudioFeature)=>void} */
  onData = this.defaultHandler.bind(this);

  #paused = false;

  /**
   * Creates an instance of the helper
   * @param {Partial<MeydaLibOptions>} meydaOptions 
   */
  constructor(meydaOptions = {}) {
    this.options = {
      sampleRate: 44100,
      numberOfBarkBands: 24,
      numberOfMFCCCoefficients: 24,
      bufferSize: 512,
      featureExtractors: [ `rms` ],
      chromaBands: 12,
      melBands: 13,
      ...meydaOptions
    };
  }

  /**
   * Set feature extractors. This will restart the Meyda processor.
   * @param {string[]} feats 
   */
  setFeatureExtractors(feats) {
    if (!Array.isArray(feats)) throw Error(`Param 'feats' should be an array`);
    if (feats.length == 0) throw Error(`Param 'feats' empty`);

    this.options.featureExtractors = feats;
    this.#log(`Setting features: ` + JSON.stringify(feats));
    this.#restartAnalyser();
  }

  async init() {
    const { inputId, inputNameMatch } = this.options;

    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(d => d.kind === `audioinput`);

    this.cachedDevices = audioDevices.map(d => `Id: ${d.deviceId} Label: ${d.label}`);

    /** @type MediaDeviceInfo|undefined */
    let targetDevice = audioDevices[0];
    if (inputId) {
      targetDevice = audioDevices.find(d => d.deviceId === inputId);
      if (!targetDevice) {
        this.#logError(`Audio input with id '${inputId}' not found.`);
        this.#logError(`Available devices:`);
        this.printAvailableInputs();
      }
    }
    if (inputNameMatch) {
      targetDevice = audioDevices.find(d => d.label.includes(inputNameMatch));
      if (!targetDevice) {
        this.#logError(`Audio input with label containing '${inputNameMatch}' not found.`);
        this.#logError(`Available devices:`);
        this.printAvailableInputs();
      }
    }
    if (!targetDevice) throw new Error(`No audio input`);

    const openDevice = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: targetDevice.deviceId
      }
    });

    const audioCtx = new AudioContext();
    audioCtx.addEventListener(`statechange`, () => {
      this.#log(`Audio context state: ` + audioCtx.state);
    });
    const sourceStream = audioCtx.createMediaStreamSource(openDevice);

    // Note: spectralFlux seems buggy 
    const analyser = m.createMeydaAnalyzer({
      ...this.options,
      audioContext: audioCtx,
      source: sourceStream,
      callback: (features) => this.onData(features),
    });
    analyser.start();

    this.audioContext = audioCtx;
    this.analyser = analyser;
  }


  defaultHandler(d) {
    // noop
  }

  /**
   * Set paused state
   * @param {boolean} shouldPause 
   * @returns 
   */
  set paused(shouldPause) {
    const analyser = this.analyser;
    if (!analyser) return;

    if (shouldPause == this.#paused) return;
    this.#paused = shouldPause;

    if (!shouldPause) {
      this.#log(`Starting analyser`);
      analyser.start(this.options.featureExtractors);
    } else {
      this.#log(`Stopping analyser`);
      analyser.stop();
    }
  }

  get paused() {
    return this.#paused;
  }

  #restartAnalyser() {
    this.#paused = false;
    this.paused = true;
    this.paused = false;
  }


  /**
   * Prints available audio input devices to console.
   */
  printAvailableInputs() {
    for (const d of this.cachedDevices) {
      console.log(d);
    }
  }

  /**
   * 
   * @param {any} msg 
   */
  #log(msg) {
    if (this.verbose) {
      console.log(`MeydaLib`, msg);
    }
  }

  #logError(msg) {
    console.error(`MeydaLib`, msg);
  }


}

/**
   * Converts Float32Array or number[] to number[]
   * @param {Float32Array|number[]} arr 
   * @returns {number[]}
   */
export function dataToArray(arr) {
  if (!Array.isArray(arr)) {
    arr = Array.from(arr);
  }
  return arr;
}
/**
   * Yield values of a range within an array
   * @param {Float32Array|number[]} data 
   * @param {number} startPercent 
   * @param {number} lengthPercent 
   */
export function* valuesBetweenRelative(data, startPercent, lengthPercent = 1) {
  if (startPercent > 1) throw new TypeError(`Param 'startPercent' should be 0..1`);
  let endPercent = clamp(startPercent + lengthPercent);

  const arr = dataToArray(data);

  let startIndex = Math.floor(arr.length * startPercent);
  let endIndex = Math.ceil(arr.length * endPercent);
  if (startIndex < 0) throw new Error(`Something wrong, startIndex calculated to be less than 0`);
  if (startIndex >= arr.length) throw new Error(`Something wrong, startIndex calculated to be greater than length`);
  if (endIndex >= arr.length) endIndex = arr.length;

  for (let i = startIndex; i < endIndex; i++) {
    yield arr[i];
  }
}

/**
 * Computes the average value of a range within an array
 * ```js
 * // Calculate average of 10% of the array, starting at 50%
 * averageBetweenRelative(arr, 0.5, 0.1);
 * ```
 * @param {Float32Array|number[]} data 
 * @param {number} startPercent 
 * @param {number} lengthPercent 
 */
export function averageBetweenRelative(data, startPercent, lengthPercent = 1) {
  let count = 0;
  let total = 0;
  for (const v of valuesBetweenRelative(data, startPercent, lengthPercent)) {
    total += v;
    count++;
  }
  return total / count;
}