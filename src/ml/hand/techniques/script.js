// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from 'ixfx/dom.js';
import { Points, radiansSum, radianToDegree } from 'ixfx/geometry.js';
import * as Numbers from "ixfx/numbers.js";
import * as MpVision from '../../lib/client/index.js';
import * as Hands from '../hands.js';

/**
 * -----------------
 * You don't want to extend this sketch, because there's a lot going on.
 * 
 * Rather, make a copy of a starter sketch and adapt one of the processing functions from this
 * demo into it.
 * ---------------- 
 */
const settings = Object.freeze({
  // Scales the 'finger tip spread' value
  spreadOfFingersScaler: Numbers.scaler(1.1, 1.5, 0, 1, undefined, true),

  // Scales 'grip rotation' value
  gripRotateScaler: Numbers.scaler(0.06, -0.02, -1, 1, undefined, true),

  // Scales 'fist' value
  fistScaler: Numbers.scaler(0.18, 0.38, 0, 1, undefined, true),

  openHandRotateScaler: Numbers.scaler(-0.05, 0.02, -1, 1, undefined, true),
  updateRateMs: 100, // how quickly to call update()
  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/**
 * @typedef {Readonly<{
 *  thumbCurl:number
 *  spread:number
 *  gripRotate:number
 *  openHandRotate:number
 *  fist:number
 * }>} State
 */

/** @type State */
let state = {
  thumbCurl: 0,
  spread: 0,
  gripRotate: 0,
  openHandRotate: 0,
  fist: 0
};

/**
 * Runs periodically, computing something
 * new from latest pose data
 */
const update = () => {};


function use() {
  // Debug display
  settings.dataDisplay.update(state);
}

/**
 * Called with data from MediaPipe.
 * 
 * In this demo, we only use the first hand.
 * @param {MpVision.HandLandmarkerResult} hands 
 */
const updateFromHands = (hands) => {
  // If we don't have at least one hand, exit
  if (!hands || hands.landmarks.length === 0) return;

  // Get landmarks for first hand (we don't care if it's left or right)
  const hand = 0;
  const normalised = hands.landmarks[hand];
  const world = hands.worldLandmarks[hand];

  saveState({
    spread: spreadOfFingers(world),
    thumbCurl: radianToDegree(fingerCurl(`thumb`, normalised)),
    gripRotate: gripRotation(world),
    openHandRotate: openHandRotation(normalised),
    fist: fist(world)
  });
};

/**
 * Calculates a value indicating the degree of an open-closed fist
 * @param {MpVision.NormalizedLandmark[]} landmarks 
 */
const fist = (landmarks) => {
  const { fistScaler } = settings;

  const fingerNames = Hands.getFingerNames();

  // Calculate extension for each finger
  const extensions = fingerNames.map(name => fingerExtension(name, landmarks));

  // Add up all the numbers
  const sum = Numbers.total(extensions);

  // Scale and invert number
  return Numbers.flip(fistScaler(sum));
};

/**
 * Calculates the amount of extension of a finger.
 * Eg. an outstretched index finger, versus curling it up.
 * 
 * This is based on how close finger tip is to knuckle
 * @param {keyof Hands.FingerIndexes} fingerName 
 * @param {MpVision.NormalizedLandmark[]} landmarks 
 */
const fingerExtension = (fingerName, landmarks) => {
  const tip = Hands.getFingertip(fingerName, landmarks);
  const knuckle = Hands.getKnuckle(fingerName, landmarks);
  return Points.distance(tip, knuckle);
};

/**
 * Calculates average spread between fingers, ignoring thumb
 * @param {keyof Hands.FingerIndexes} fingerName
 * @param {MpVision.NormalizedLandmark[]} landmarks 
 */
const fingerCurl = (fingerName, landmarks) => {
  const indexes = Hands.FingerIndexes[fingerName];
  let accumulatedAngle = 0;
  for (let i = 0; i < indexes.length - 1; i++) {
    const angle = Points.angleRadianCircle(landmarks[i + 1], landmarks[i]);
    accumulatedAngle = radiansSum(accumulatedAngle, angle, false);
  }
  return accumulatedAngle;
};

/**
 * Calculates average spread between fingers, ignoring thumb
 * @param {MpVision.Landmark[]} landmarks 
 */
const spreadOfFingers = (landmarks) => {
  const { spreadOfFingersScaler } = settings;

  const indexToMiddle = spreadBetweenFingers(`index`, `middle`, landmarks);
  const middleToRing = spreadBetweenFingers(`middle`, `ring`, landmarks);
  const ringToPinky = spreadBetweenFingers(`ring`, `pinky`, landmarks);

  const total = indexToMiddle + middleToRing + ringToPinky;
  const average = total / 3;
  return spreadOfFingersScaler(average);
};

/**
 * Assuming an open hand facing the camera, this calculates the left to right pivot of the
 * hand, as we might if we do a royal wave
 * @param {MpVision.Landmark[]} landmarks 
 */
const openHandRotation = (landmarks) => {
  const { openHandRotateScaler } = settings;

  const a = Hands.getKnuckle(`pinky`, landmarks);
  const b = Hands.getKnuckle(`index`, landmarks);

  const zDifference = a.z - b.z;
  return openHandRotateScaler(zDifference);
};

/**
 * Assuming a grip of a cylindrical object, roughly calculates
 * if the object is rotated toward or away from camera
 * @param {MpVision.Landmark[]} landmarks 
 */
const gripRotation = (landmarks) => {
  const { gripRotateScaler } = settings;

  // Get position of finger tips: { thumb: {x,y,z}, index: {x,y,z} ...etc }
  const tips = Hands.getFingertips(landmarks);

  // We don't care which fingers, so convert object to array: [ {x,y,z},{x,y,z} ...etc ]
  const tipsAsArray = Object.values(tips);

  // Get just the Z: [ z1, z2, z2 ... etc]
  const tipsZ = tipsAsArray.map(point => point.z);
  const averageZ = Numbers.average(tipsZ);
  return gripRotateScaler(averageZ);
};

/**
 * Calculates the spacing between given finger tips.
 * Relates it to the knuckle distance. Eg, if finger tips
 * have same distance as the knuckles for the same fingers, result will be 0.
 * 
 * If distance between tips is twice as much as knuckles, result will be 2, etc.
 * 
 * @param {keyof Hands.FingerIndexes} fingerA 
 * @param {keyof Hands.FingerIndexes} fingerB 
 * @param {MpVision.Landmark[]|MpVision.NormalizedLandmark[]} landmarks 
 */
const spreadBetweenFingers = (fingerA, fingerB, landmarks) => {
  const tipDistance = Points.distance(
    Hands.getFingertip(fingerA, landmarks),
    Hands.getFingertip(fingerB, landmarks)
  );
  const knuckleDistance = Points.distance(
    Hands.getKnuckle(fingerA, landmarks),
    Hands.getKnuckle(fingerB, landmarks),
  );
  return tipDistance / knuckleDistance;
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