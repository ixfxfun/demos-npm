import { pressureOrForce } from "./pressure-or-force.js";

const settings = Object.freeze({
  // Maximum blur, in pixels
  maxBlur: 100
});

/**
 * Alias PressureForceState as State
 * @typedef {import("./pressure-or-force.js").PressureForceState} State
 */

/** @type State */
let state = Object.freeze({
  webkitForce: 0,
  normalised: 0,
  pointerPressure: 0
});

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { normalised } = state;

  // Higher pressure == less blur
  setBlur(1 - normalised);
};

const setBlur = (relativeAmount) => {
  const { maxBlur } = settings;

  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
  const element = /** @type HTMLElement */(document.querySelector(`#content`));
  if (!element) return;
  element.style.filter = `blur(${Math.round(relativeAmount * maxBlur)}px)`;
};

function setup() {
  // Listen for pressure or force events on body
  pressureOrForce(document.body, state => {
    use(saveState(state));
  });

  // Start off with 100% blur
  setBlur(1);
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}

