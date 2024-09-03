// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from 'ixfx/dom.js';
import * as MpVision from "../../pose/util/Poses.js";
import { average, Bipolar, scaleClamped } from "ixfx/numbers.js";

const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 100,
  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/**
 * @typedef {Readonly<{
 *  faces: Array<MpVision.Detection>
 *  upDown:number
 *  leftRight: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  upDown: 0,
  leftRight: 0,
  faces: []
});

/**
 * Runs periodically, computing something
 * new from latest pose data
 */
const update = () => {
  const { faces } = state;

  if (faces.length === 0) return;

  // Just work with first face
  const face = faces[0];
  const upDown = calculateUpDown(face);
  const leftRight = calcLeftRight(face);

  saveState({ leftRight, upDown });

  // Debug display
  settings.dataDisplay.update({ upDown, leftRight });
};

/**
 * Head title can be roughly figured comparing the height of pts 0 & 1 (eyes) with 3 (mouth).
 * When head is down, this distance increases, when it is up, it deases
 * @param {MpVision.Detection} face 
 */
const calculateUpDown = (face) => {
  // Get average y
  const eyes = average([face.keypoints[0].y, face.keypoints[1].y]);

  const mouth = face.keypoints[3].y;

  const distance = mouth - eyes;

  // Value will depend on distance to camera
  return scaleClamped(distance, 0.05, 0.25);
};

/**
 * Compare the x position of one ear with the nose
 * @param {MpVision.Detection} face 
 */
const calcLeftRight = (face) => {
  const mid = face.keypoints[2].x;

  const ear = mid - face.keypoints[4].x;

  // Scale on bipolar -1..1 scale
  // Value will depend on distance to camera
  return Bipolar.scale(ear, 0.05, 0.3);
};

/**
 * Called when we have pose data via Remote.
 * Faces are saved to state.
 * @param {*} packet 
 */
const onReceivedPoses = (packet) => {
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
  saveState({ faces: d });
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
