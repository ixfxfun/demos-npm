import { Points } from 'ixfx/geometry.js';

/**
 * Move an element by its middle to an relative point
 * @param {HTMLElement|null} element 
 * @param {import('ixfx/geometry.js').Point} relativePosition 
 */
export const moveElement = (element, relativePosition) => {
  if (!element) return;

  // Position is given in relative coordinates, need to map to viewport
  const absPos = Points.multiply(relativePosition, window.innerWidth, window.innerHeight);

  // Get size of element to move
  const size = element.getBoundingClientRect();

  // Point to move to is given point, minus half width & height -- ie the top-left corner
  const pt = Points.subtract(absPos, size.width / 2, size.height / 2);

  element.style.left = `${pt.x}px`;
  element.style.top = `${pt.y}px`;
};