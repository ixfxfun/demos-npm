/**
 * Move an element by its middle to an relative point
 * @param {HTMLElement|null} element 
 * @param {import('ixfx/geometry.js').Point} relativePosition 
 */
export const moveElement = (element, relativePosition) => {
  if (!element) return;

  const halfSize = element.getBoundingClientRect().width / 2;

  // Move element
  element.style.left = (relativePosition.x * window.innerWidth) - halfSize + `px`;
  element.style.top = (relativePosition.y * window.innerHeight) - halfSize + `px`;
};

/**
 * Returns a viewport-relative coordinate
 * @param {{x:number,y:number}} pos 
 * @returns 
 */
export const getRelativePosition = (pos) => {
  return {
    x: pos.x / window.innerWidth,
    y: pos.y / window.innerHeight
  };
};