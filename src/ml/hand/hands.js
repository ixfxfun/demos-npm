import { Iterables } from 'ixfx/bundle.js';
import * as MpVision from '../lib/client/index.js';
import { Points, Triangles } from 'ixfx/geometry.js';


/**
 * @typedef {Readonly<{
 * landmarks:MpVision.NormalizedLandmark[]
 * worldLandmarks:MpVision.Landmark[]
 * handedness:MpVision.Category[]
 * }>} Hand
 */

export const FingerIndexes = Object.freeze({
  thumb: [1, 2, 3, 4],
  index: [5, 6, 7, 8],
  middle: [9, 10, 11, 12],
  ring: [13, 14, 15, 16],
  pinky: [17, 18, 19, 20],
});

/**
 * Three points that make up the palm
 */
export const PalmTriangleIndexes = [0, 5, 17];

/**
 * Gets data for a given hand
 * @param {number} index
 * @param {MpVision.HandLandmarkerResult} hands 
 * @returns {Hand}
 */
export function getHand(index, hands) {
  return {
    landmarks: /** @type MpVision.NormalizedLandmark[] */(hands.landmarks.at(index)),
    worldLandmarks: /** @type MpVision.Landmark[] */(hands.worldLandmarks.at(index)),
    handedness: /** @type MpVision.Category[] */(hands.handedness.at(index))
  };
}

/**
 * Returns an array of finger names, thumb->pinky.
 * @returns {Array<keyof FingerIndexes>}
 */
export function getFingerNames() {
  return [`thumb`, `index`, `middle`, `ring`, `pinky`];
}

/**
 * Returns a set of fingertip positions for a hand.
 * ```js
 * const tips = getFingertips(landmarks);
 * tips.thumb; // {x,y,z,visibility}
 * ```
 * 
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 * @returns 
 */
export const getFingertips = (landmarks) => {
  return {
    thumb: getFingertip(`thumb`, landmarks),
    index: getFingertip(`index`, landmarks),
    middle: getFingertip(`middle`, landmarks),
    ring: getFingertip(`ring`, landmarks),
    pinky: getFingertip(`pinky`, landmarks)
  };
};

/**
 * Returns a set of knuckles positions for a hand
 * ```js
 * const tips = getKnuckles(landmarks);
 * tips.thumb; // {x,y,z,visibility}
 * ```
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 * @returns 
 */
export const getKnuckles = (landmarks) => {
  return {
    thumb: getKnuckle(`thumb`, landmarks),
    index: getKnuckle(`index`, landmarks),
    middle: getKnuckle(`middle`, landmarks),
    ring: getKnuckle(`ring`, landmarks),
    pinky: getKnuckle(`pinky`, landmarks)
  };
};

/**
 * Get the position of a fingertip.
 * ```js
 * getFingerTip(`thumb`, landmarks);
 * ```
 * @param {keyof FingerIndexes} fingerName 
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 */
export const getFingertip = (fingerName, landmarks) => {
  const indexes = FingerIndexes[fingerName];
  if (!indexes) throw new Error(`Finger not found? (${fingerName})`);
  const tipIndex = indexes.at(-1);
  if (!tipIndex) return Points.Placeholder3d;
  return landmarks[tipIndex];
};

/**
 * Returns the coordinates of all the points that make up a given finger.
 * Order of points is from base of finger to tip.
 * ```js
 * const points = getFinger(`ring`, landmarks);
 * // [ {x,y,z}, {x,y,z} ... ]
 * ```
 * @param {keyof FingerIndexes} fingerName 
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 */
export const getFinger = (fingerName, landmarks) => {
  const indexes = FingerIndexes[fingerName];
  if (!indexes) throw new Error(`Finger not found? (${fingerName})`);
  return indexes.map(index => landmarks[index]);
};

/**
 * Returns the three points that constitute the palm (0, 5, 17)
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 */
export const getPalm = (landmarks) => {
  return PalmTriangleIndexes.map(index => landmarks[index]);
};

/**
 * Returns the three points that constitute the palm (0, 5, 17) as a triangle
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 */
export const getPalmTriangle = (landmarks) => Triangles.fromPoints(getPalm(landmarks));

/**
 * Returns the three points that constitute the palm (0, 5, 17) as a triangle, but only {x,y} values
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 */
export const getPalmTriangle2d = (landmarks) => Triangles.fromPoints(getPalm(landmarks).map(p => Points.to2d(p)));

/**
 * Get the position of a knuckle closest to the palm
 * ```js
 * getKnuckle(`thumb`, landmarks);
 * ```
 * 
 * For the fingers, this is the first array index in FingerIndexes.
 * We special-case the thumb, and instead use index 1.
 * @param {keyof FingerIndexes} fingerName 
 * @param {MpVision.NormalizedLandmark[]|MpVision.Landmark[]} landmarks 
 */
export const getKnuckle = (fingerName, landmarks) => {
  const indexes = FingerIndexes[fingerName];
  if (!indexes) throw new Error(`Finger not found? (${fingerName})`);
  const tipIndex = fingerName === `thumb` ? indexes.at(1) : indexes.at(0);
  if (!tipIndex) return Points.Placeholder3d;
  return landmarks[tipIndex];
};

/**
 * Gets the index of the first left or right hand result
 * that meets threshold. Returns _undefined_ if the hand doesn't seem to be showing.
 * 
 * Alternatively:
 * - {@link findByHandedness} to get hand data directly
 * - {@link filterIndexByHandedness} to enumerate over all hands that match criteria.
 * 
 * ```js
 * const index = findIndexByHandedness(`left`, results);
 * if (index) {
 *  // Do something with data...
 *  const leftHand = getHand(index, results);
 * } else {
 *  // Doesn't seem to be a left hand at the moment
 * }
 * ```
 * @param {`left`|`right`} which 
 * @param {MpVision.HandLandmarkerResult} results 
 * @param {number} threshold
 */
export const findIndexByHandedness = (which, results, threshold = 0.8) => Iterables.Sync.first(filterIndexByHandedness(which, results, threshold));

/**
 * Gets the hand data for first hand that matches handedness
 * Returns _undefined_ if the hand doesn't seem to be showing.
 * ```js
 * const leftHand = findByHandedness(`left`, results);
 * ```
 * @param {*} which 
 * @param {*} results 
 * @param {*} threshold 
 * @returns 
 */
export const findByHandedness = (which, results, threshold = 0.8) => {
  const index = Iterables.Sync.first(filterIndexByHandedness(which, results, threshold));
  if (!index) return;
  return getHand(index, results);
};

/**
 * Generator that yields all hands that match handedness.
 * Use {@link findIndexByHandedness} if you just want the data for first result.
 * ```js
 * for (const index of filterIndexByHandedness(`right`, result)) {
 *  const hand = getHand(index, result);
 * }
 * ```
 * @param {`left`|`right`} which 
 * @param {MpVision.HandLandmarkerResult} results 
 * @param {number} threshold
 */
export function* filterIndexByHandedness(which, results, threshold = 0.8) {
  for (let i = 0; i < results.handedness.length; i++) {
    for (const r of results.handedness[i]) {
      if (r.categoryName.toLowerCase() === which.toLowerCase() && r.score >= threshold) yield i;
    }
  }
};

/**
 * Returns a landmark as as tring
 * @param {MpVision.NormalizedLandmark|MpVision.Landmark|number|import('ixfx/geometry.js').Point} point 
 */
export function lmString(point, precision = 2) {
  if (typeof point === `number`) {
    return point.toFixed(precision);
  }

  return `${point.x.toFixed((precision))},${point.y.toFixed((precision))}`;
}
