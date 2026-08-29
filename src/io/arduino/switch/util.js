import { resolveEl } from "@ixfx/dom.js";

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