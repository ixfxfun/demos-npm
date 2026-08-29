import { resolveEl } from "@ixfx/dom.js";


/**
 * Return decimal as rounded percentage. eg 0.123 -> 12
 * @param {number} v 
 * @returns Rounded percentage
 */
export function percentage(v) {
  return Math.round(v * 100) + `%`;
}

/**
 * Set CSS display property
 * @param {string|HTMLElement} domQueryOrEl 
 * @param {string} value 
 * @returns 
 */
export const setCssDisplay = (domQueryOrEl, value) => {
  const element = resolveEl(domQueryOrEl);
  if (!element) return;
  element.style.display = value;
};

/**
 * Set innerHTML
 * @param {string|HTMLElement} domQueryOrEl
 * @param {string} value 
 * @returns 
 */
export const setHtml = (domQueryOrEl, value) => {
  const element = resolveEl(domQueryOrEl);

  if (!element) return;
  element.innerHTML = value;
};