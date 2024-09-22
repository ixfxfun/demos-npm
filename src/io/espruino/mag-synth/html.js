import * as Numbers from 'ixfx/numbers.js';

// ---- General CSS/HTML helper functions ----

/**
 * Sets the CSS 'display' property for all elements that match query
 * @param {string} query 
 * @param {string} value 
 * @returns 
 */
export const setCssDisplay = (query, value) => {
  if (!query) throw new Error(`Param 'query' missing`);

  document.querySelectorAll(query).forEach(el => {
    /** @type HTMLElement */(el).style.display = value;
  });
};

/**
 * Sets the 'innerHTML' property for all elements that match 'query'.
 * If `value` is a number or string we try to display is sensibly.
 * @param {string} query 
 * @param {string|number|boolean} value 
 * @returns 
 */
export const set = (query, value) => {
  if (!query) throw new Error(`Param 'query' missing`);

  /** @type string */
  let formatted = ``;
  if (typeof value === `number`) {
    if (value < 10)
      formatted = Numbers.round(2, value).toString();
    else
      formatted = Numbers.round(0, value).toString();
  } else if (typeof value === `boolean`) {
    formatted = value ? `True` : `False`;
  } else {
    formatted = value;
  }

  document.querySelectorAll(query).forEach(el => {
    /** @type HTMLElement */(el).innerHTML = formatted;
  });

};

/**
 * Sets the CSS class for all elements matching 'query'
 * @param {string} query 
 * @param {boolean} value 
 * @param {string} cssClass 
 */
export const setClass = (query, value, cssClass) => {
  document.querySelectorAll(query).forEach(el => {
    if (value) /** @type HTMLElement */(el).classList.add(cssClass);
    else /** @type HTMLElement */(el).classList.remove(cssClass);
  });

};

export const cssToggle = (query, enabled, className) => {
  document.querySelectorAll(query).forEach(el => {
    if (enabled) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  });
};

export const cssBiToggle = (query, enabled, trueClassName, falseClassName) => {
  cssToggle(query, trueClassName, enabled);
  cssToggle(query, falseClassName, !enabled);
};