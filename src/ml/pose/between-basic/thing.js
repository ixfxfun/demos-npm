import { shortGuid } from '@ixfx/random.js';
import { clamp } from '@ixfx/numbers.js';
import { Poses } from "../util/Poses.js";

const settings = Object.freeze({
  pressureIncrease: 0.05,
  // How much of 'distance' value to use
  distanceDampening: 0.1,
  containerEl: /** @type HTMLElement */(document.querySelector(`#things`))
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  id: string
 *  pressure: number
 *  element: HTMLElement
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { element, pressure } = thing;

  const height = window.innerHeight * pressure;
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
  const { pressureIncrease, distanceDampening } = settings;
  const { distance } = ambientState;
  let { pressure } = thing;

  // Thing has a tendency to increase pressure
  pressure += pressureIncrease;

  if (!Number.isNaN(distance)) {
    // Invert, so that 1 == hands together, 0 == furtherest apart
    const closeness = 1 - distance;
    // Reduce pressure based on how close hands are together
    pressure -= (closeness * distanceDampening);
  }

  // Make sure value stays between 0..1
  pressure = clamp(pressure);

  return {
    ...thing,
    pressure
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
 * @returns {Thing}
 */
export const create = () => {
  const { containerEl } = settings;
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  containerEl.append(element);

  return {
    id: shortGuid(),
    element,
    pressure: 0
  };
};