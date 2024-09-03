// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from 'ixfx/dom.js';
import { Points } from 'ixfx/geometry.js';
import * as MpVision from '../../lib/client/index.js';
import { average, Bipolar, clamp, interpolate, scaler } from "ixfx/numbers.js";

const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 100,

  // Scale pinch distance
  pinchScale: scaler(0, 0.5),

  // Interpolation of pinch value
  pinchInterpolator: interpolate(0.1),

  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`))
});

/**
 * @typedef {Readonly<{
 *  pinchRaw:number
 *  pinch:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  pinchRaw: 0,
  pinch: 0
});

/**
 * Runs periodically, computing something
 * new from latest pose data
 */
const update = () => {
  const { pinchInterpolator } = settings;
  const { pinchRaw } = state;
  let { pinch } = state;

  // Interpolate the pinch value, to smooth
  // out the slow rate of data from ML model.
  pinch = pinchInterpolator(pinch, pinchRaw);

  // Save state
  saveState({ pinch });

  // Debug display
  settings.dataDisplay.update({ pinch, pinchRaw });
};

/**
 * Uses state
 * 
 */
function use() {
  const { thingEl } = settings;
  const { pinch } = state;

  let x = (5 * pinch) + 0.01; // Always make sure there's a little bit
  let y = 1 * (1 - pinch);
  thingEl.style.scale = `${x} ${y}`;
}

/**
 * Called with data from MediaPipe
 * @param {MpVision.HandLandmarkerResult} hands 
 */
const updateFromHands = (hands) => {
  const { pinchScale } = settings;
  if (!hands || hands.landmarks.length === 0) {
    // No data, reset to 0
    saveState({ pinchRaw: 0 });
    return;
  }

  // Get landmarks for first hand
  const lm = hands.landmarks[0];

  // Thumb
  const thumb = lm[4];

  // Pointer
  const pointer = lm[8];

  // Raw distance
  let pinch = Points.distance(thumb, pointer);

  // Scale & invert
  pinch = 1 - clamp(pinchScale(pinch));

  saveState({ pinchRaw: pinch });
};


/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, remote } = settings;

  remote.onData = onReceivedPoses;

  // Update at updateRateMs
  const updateLoop = () => {
    update();
    use();
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
 * Called when we have pose data via Remote.
 * Hand data is saved to state.
 * @param {*} packet 
 */
function onReceivedPoses(packet) {
  const { data } = packet;
  const handsData = /** @type MpVision.HandLandmarkerResult */(JSON.parse(data));

  if (Array.isArray(handsData)) {
    console.warn(`Unexpectedly getting an array of data. Is the sender set to 'face'?`);
    return;
  }

  if (!(`handedness` in handsData)) {
    console.warn(`Did not find 'handedness' property as expected. Is the sender set to 'hand'?`);
    return;
  }

  updateFromHands(handsData);
};