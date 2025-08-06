import { Points } from "@ixfx/geometry";

/**
 * Positions an element using absolute coordinates
 * @param el {HTMLElement}
 * @param pos {{x:number, y:number}}
 */
export function positionElementByAbs(element, pos) {
  // Get the rectangle containing element
  const b = element.getBoundingClientRect();

  // We want to position by rough center of element, so transform the point
  pos = Points.subtract(pos, b.width / 2, b.height / 2);

  // Finally, set it to the element's style
  element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
}