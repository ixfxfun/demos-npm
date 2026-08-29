
import { Points, radianToDegree } from "@ixfx/geometry.js";
import { Poses } from "../util/Poses.js";

const settings = Object.freeze({
  containerEl: /** @type HTMLElement */(document.querySelector(`#things`))
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  pose: Poses.PoseTracker
 *  element: HTMLElement
 *  wristDistance: number
 *  wristZ: number
 *  indexAngleL: number
 *  armBendL: number
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { pose, element, wristDistance, wristZ, indexAngleL, armBendL } = thing;
  element.innerHTML = `
  <h2>Between hands</h2>
  <div>Distance: ${wristDistance.toFixed(2)}</div>
  <div>Z difference: ${wristZ.toFixed(2)}</div>
  <h2>Left arm</h2>
  <div>Pointing angle: ${indexAngleL.toFixed(2)}</div>
  <div>Bend angle: ${armBendL.toFixed(2)}</div>
  `;
};

/**
 * Updates a thing based on its own data as well as 'ambient state'
 * of the sketch.
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @param {Poses.PoseTracker} pose
 * @returns {Thing}
 */
export const update = (thing, ambientState, pose) => {
  // Get the wrist landmarks
  const wristL = pose.landmarkValue(`left_wrist`);
  const wristR = pose.landmarkValue(`right_wrist`);

  // Get a few landmarks from the left arm
  const shoulderL = pose.landmarkValue(`left_shoulder`);
  const elbowL = pose.landmarkValue(`left_elbow`);
  const indexL = pose.landmarkValue(`left_index`);

  // Calculate distance between wrists, as well as Z separately
  const wristDistance = Points.distance2d(wristL, wristR);
  const wristZ = wristL.z - wristR.z;

  // Calculate angle of index finger to elbow, and arm bend
  const indexAngleL = radianToDegree(Points.angleRadian(elbowL, indexL));
  const armBendL = radianToDegree(Points.angleRadianThreePoint(wristL, elbowL, shoulderL));

  return {
    ...thing,
    wristDistance,
    wristZ,
    indexAngleL, armBendL
  };
};


/**
 * Removes a thing, deleting its associated DOM element
 * @param {Thing} thing 
 */
export const remove = (thing) => {
  const element = thing.element;
  element.remove();
};

/**
 * Creates a new thing
 * @param {Poses.PoseTracker} pose
 * @returns {Thing}
 */
export const create = (pose) => {
  const { containerEl } = settings;
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  containerEl.append(element);

  return {
    element,
    pose: pose,
    indexAngleL: 0,
    armBendL: 0,
    wristDistance: 0,
    wristZ: 0
  };
};