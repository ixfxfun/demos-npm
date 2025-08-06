import { Points, Polar } from '@ixfx/geometry';
import * as Util from './util.js';

/**
 * @typedef {Readonly<{
 * polar: Polar.Coord
 * position: Points.Point
 * element: HTMLElement
 * }>} Thing
 */

/**
 * Updates the state of a 'thing' (ie. a circle)
 * @param {Thing} thing 
 * @param {import('./script.js').State} sketchState
 */
export function update(thing, sketchState) {
  const { polar, position, element } = thing;
  const { scaleBy, origin } = sketchState;

  // Apply distance modulation
  const polarPosition = {
    ...polar,
    distance: thing.polar.distance * sketchState.distanceModulation
  };
  // Convert from relative to absolute position
  const absolutePolar = Polar.multiply(polarPosition, scaleBy);

  // Convert from polar coordinates to cartesian
  const absolutePoint = Polar.toCartesian(absolutePolar, origin);

  return {
    ...thing,
    position: absolutePoint
  };
}

/**
 * Updates a HTML element's position based on a polar coordinate
 * @param {Thing} thing 
 * @param {import('./script.js').State} sketchState
 */
export function use(thing, sketchState) {
  const { position, element } = thing;

  // Actually move HTML element
  Util.positionElementByAbs(element, position);
}

/**
 * Creates a thing and a HTML element for it.
 * @param {number} angleRadian 
 * @param {number} index 
 * @returns {Thing}
 */
export function create(angleRadian, index) {
  // Create polar coordinate for this thing
  const polar = {
    // Maximum radius
    distance: 0.4,
    angleRadian
  };

  // Create HTML element and add to document
  const element = document.createElement(`DIV`);
  element.id = `pt-${index}`;
  element.classList.add(`pt`);
  document.body.append(element);

  // Return back as a 'Thing' type
  return { polar, element, position: { x: 0, y: 0 } };
}