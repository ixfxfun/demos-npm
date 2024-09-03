import * as MpVision from "../../pose/util/Poses.js";
import { Points } from 'ixfx/geometry.js';
import { Bipolar, scale, scaleClamped } from "ixfx/numbers.js";

/**
 * Compute tilt angle of head. It should return 0 when head is
 * roughly level, -1 for one extreme, 1 for the other.
 * (ie left-ear to left-shoulder versus right-ear to right-shoulder)
 * @param {MpVision.Detection} face 
 */
export const computeTilt = (face, range = [-1, 1]) => {
  if (!face) return 0;
  const leftEar = face.keypoints[4];
  const rightEar = face.keypoints[5];
  let angle = Points.angleRadian(leftEar, rightEar);
  angle = scaleClamped(angle, range[0], range[1]);
  return Bipolar.fromScalar(angle);
};
