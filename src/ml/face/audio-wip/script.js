// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

import * as Dom from 'ixfx/dom.js';
import * as MpVision from "../../pose/util/Poses.js";
import { Bipolar, scale, scaleClamped, wrapInteger } from "ixfx/numbers.js";
import { Points } from 'ixfx/geometry.js';
import * as Faces from './faces.js';
import { Arrays } from "ixfx/data.js";

const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 500,
  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  faceAngleRange: [-1, 1],
  // Minor pentatonic scale
  musicalScale: [`A`, `B`, `C`, `D`, `E`, `F`, `G`],
  noteLengths: [`32n`, `16n`, `8n`, `1n`],
  // Create a Tone.js Monosythn
  // https://tonejs.github.io/docs/15.0.4/classes/MonoSynth.html
  synth: new Tone.MonoSynth({
    oscillator: {
      type: `square`
    },
    envelope: {
      attack: 1
    },
    volume: -12 // decibels
  }).toDestination()
});

/**
 * @typedef {Readonly<{
 *  faces: Array<{
 *    tilt:number
 *  }>
 *  noteIndex:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  noteIndex: 0,
  faces: []
});

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { synth, musicalScale, noteLengths } = settings;
  const { faces, noteIndex } = state;


  let index = 0;
  for (const face of faces) {
    const { tilt } = face;

    // Which note index to play for this face
    // Cycles through notes in the scale, with each face offset by one note
    let note = atWrap(musicalScale, index + noteIndex + 1);

    let octave = 3;
    let noteStr = `${musicalScale[note]}${octave}`;
    let velocity = Bipolar.toScalar(tilt) * 127;
    //let noteLength = wrapInteger()


    // Note, duration, schedule, velocity
    velocity = 100;
    synth.triggerAttackRelease(noteStr, `8n`, 1, 0.9);

    console.log(`velo: ${velocity} note: ${noteStr}`);
    index++;
  }
};

const update = () => {
  let { noteIndex } = state;
  noteIndex++;
  if (noteIndex >= settings.musicalScale.length) noteIndex = 0;

  use(saveState({ noteIndex }));
};
/**
 * Called when we have pose data via Remote.
 * Faces are saved to state.
 * @param {*} packet 
 */
const onReceivedPoses = (packet) => {
  const { faceAngleRange } = settings;
  const { data } = packet;
  const facesData = JSON.parse(data);

  if (Array.isArray(facesData)) {
    console.warn(`Unexpectedly getting an array of data. Is the sender set to 'face'?`);
    return;
  }

  const d = /** @type {MpVision.Detection[]} */(facesData.detections);
  if (!d) {
    console.warn(`Did not find 'detections' property as expected. Is the sender set to 'face'?`);
    return;
  }

  // Process faces
  const faceData = d.map(face => {
    return {
      // Calculate ear-to-shoulder tilt value,
      // where 0 is where the head is roughly level.
      tilt: Faces.computeTilt(face, faceAngleRange)
    };
  });

  saveState({ faces: faceData });
};

/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, remote } = settings;

  window.addEventListener((`click`), () => {
    Tone.start();
  });

  window.addEventListener(`keypress`, () => {
    Tone.start();
  });

  remote.onData = onReceivedPoses;

  // Update at updateRateMs
  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

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

/**
 * @template T
 * @param {Array<T>} array 
 * @param {number} index 
 * @returns T
 */
function atWrap(array, index) {
  return wrapInteger(index, 0, array.length);
}