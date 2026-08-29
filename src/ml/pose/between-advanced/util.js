import { Points } from '@ixfx/geometry.js';

/**
 * Position an element from its middle
 * @param {HTMLElement} element 
 * @param {Points.Point} relativePos 
 */
export const positionFromMiddle = (element, relativePos) => {
  if (!element) throw new Error(`Element undefined`);

  // Convert relative to absolute units
  const absPosition = Points.multiply(relativePos, window.innerWidth, window.innerHeight);

  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absPosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  element.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};

/**
 * Set the inner text of an element
 * @param {string} query 
 * @param {string} text 
 */
export const setText = (query, text) => {
  const el = document.querySelector(query);
  if (!el) {
    console.warn(`No element found for query: ${query}`);
    return;
  }
  el.textContent = text;
};

/**
 * Make `x` and `y` relative with respect to window dimensions
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}  
 */
export const relativePoint = (x, y) => {
  return {
    x: x / window.innerWidth,
    y: y / window.innerHeight
  };
};

