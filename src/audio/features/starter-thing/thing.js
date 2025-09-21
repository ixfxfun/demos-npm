import { Points, Rects } from '@ixfx/geometry';
import { interpolate, clamp } from '@ixfx/numbers';
import * as Util from './util.js';

const settings = Object.freeze({
  intensityDropAmount: 0.1,
  agitationAmount: 0.15
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point
 *  size: Rects.Rect
 *  intensity: number
 *  angle: number
 *  el: HTMLElement
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { el, intensity, angle } = thing;
  let { position, size } = thing;

  // Get absolute coordinates
  position = Util.absolutePoint(position);
  size = Util.absoluteRect(size);

  // Apply visual properties to the element
  el.style.width = `${size.width}px`;
  el.style.height = `${size.height}px`;
  el.style.transform = `translate(${position.x}px,${position.y}px) rotate(${angle.toString()}rad)`;
};

/**
 * Updates a given thing based on state
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { intensityDropAmount, agitationAmount } = settings;
  const { agitation } = ambientState;
  let { intensity, angle } = thing;

  // Fold in some of the current 'agitation' value from the main sketch
  intensity += agitation * agitationAmount;

  // Apply a decay of intensity so it slows down
  intensity = intensity - (intensity * intensityDropAmount);

  // Apply intensity to angle
  angle += intensity;

  // Return back changed state
  return Object.freeze({
    ...thing,
    intensity: clamp(intensity),
    angle
  });
};

/**
 * Creates a new thing
 * @returns {Thing}
 */
export const create = () => {
  const el = document.createElement(`div`);
  el.classList.add(`thing`);
  const container = document.querySelector(`#things`);
  if (container) {
    container.append(el);
  } else {
    document.body.append(el);
  }

  return {
    position: { x: 0.5, y: 0.5 },
    size: { width: 0.2, height: 0.2 },
    el,
    intensity: 0.4,
    angle: 0
  };
};