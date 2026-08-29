import { Points } from '@ixfx/geometry.js';
import { interpolate } from '@ixfx/numbers.js';
import { Poses } from "../util/Poses.js";
import * as Util from './util.js';
import { shortGuid } from '@ixfx/random.js';

const settings = Object.freeze({
  positionInterpolate: 0.01,
  maxRelativeHeight: 0.3,
  containerEl: /** @type HTMLElement */(document.querySelector(`#things`))
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  id:string
 *  element: HTMLElement
 *  distance: number
 *  poseA: Poses.PoseTracker|undefined
 *  poseB: Poses.PoseTracker|undefined
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { element, distance } = thing;

  const heightMaxAbs = settings.maxRelativeHeight * window.innerHeight;
  const height = distance * heightMaxAbs;
  element.style.height = `${height}px`;
};

/**
 * Updates a thing based on its own data as well as 'ambient state'
 * of the sketch.
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { poseA, poseB } = thing;
  let { distance } = thing;

  // If we have both poses, calculate distance between left/right hands
  if (poseA && poseB) {
    const left = poseA.landmarkValue(`left_wrist`);
    const right = poseB.landmarkValue(`right_wrist`);
    distance = Points.distance(left, right);
  }

  return {
    ...thing,
    distance
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
 * Returns _true_ if a thing is using a pose
 * in either A or B slots.
 * @param {Thing} thing
 * @param {Poses.PoseTracker|string} poseTrackerOrId 
 */
export const usingPose = (thing, poseTrackerOrId) => {
  if (!poseTrackerOrId) return false;
  const id = (typeof poseTrackerOrId === `object`) ? poseTrackerOrId.guid : poseTrackerOrId;

  if (thing.poseA) {
    if (thing.poseA.guid === id) return true;
  }
  if (thing.poseB) {
    if (thing.poseB.guid === id) return true;
  }
  return false;
};

/**
 * Creates a new thing
 * @param {Poses.PoseTracker} [poseA]
 * @param {Poses.PoseTracker} [poseB]
 * @returns {Thing}
 */
export const create = (poseA, poseB) => {
  const { containerEl } = settings;
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  containerEl.prepend(element);

  return {
    id: shortGuid(),
    element,
    poseA, poseB,
    distance: 0
  };
};