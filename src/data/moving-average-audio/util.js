/**
 * Positions an element on the y axis according to some relative amount
 * @param {HTMLElement|null} element 
 * @param {number} relativeValue 
 */
export const relativeMove = (element, relativeValue) => {
  if (!element) return;
  const size = element.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;

  const x = (w - size.width) / 2;
  const y = (h - size.height * 3) * relativeValue;
  element.style.transform = `translate(${x}px, ${y}px)`;
};

/**
 * Sets the inner text of element by id
 * @param {string} id 
 * @param {string} txt 
 */
export const setText = (id, txt) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element) element.textContent = txt;
};

/**
 * Convert a number on 0...1 scale to a human-friendly percentage
 * @param {number} v 
 * @returns 
 */
export const toPercentage = (v) => {
  return Math.floor(v * 100) + `%`;
};