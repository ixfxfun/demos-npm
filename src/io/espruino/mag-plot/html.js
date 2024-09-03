import * as Numbers from 'ixfx/numbers.js';
// ---- General CSS/HTML helper functions ----
export const setCssDisplay = (id, value) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  element.style.display = value;
};

export const set = (id, value) => {
  if (!id) throw new Error(`Param 'id' should be a string`);
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (!element) return;
  if (typeof value === `number`) {
    if (value < 10)
      value = Numbers.round(2, value);
    else
      value = Numbers.round(0, value);
  }
  element.innerHTML = value;
};

export const setClass = (id, value, cssClass) => {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));

  if (!element) return;
  if (value) element.classList.add(cssClass);
  else element.classList.remove(cssClass);
};

