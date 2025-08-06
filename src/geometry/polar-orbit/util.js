import { Points } from '@ixfx/geometry';

/**
 * Positions an element by a center point
 * @param {HTMLElement} element 
 * @param {import('@ixfx/geometry.js').Point} point 
 */
export function placeElementByCenter(element, point) {
  const rect = element.getBoundingClientRect();
  point = Points.subtract(point, rect.width / 2, rect.height / 2);
  element.style.transform = `translate(${point.x}px, ${point.y}px)`;
}
