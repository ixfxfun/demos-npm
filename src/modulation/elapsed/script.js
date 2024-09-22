import { Sources } from 'ixfx/modulation.js';
import { scalePercent } from 'ixfx/numbers.js';

const settings = {
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`)),
  bpm: 30
};

/**
 * @typedef {Readonly<{
 *  timeline: () => number
 *  time: number
 * }>} State
 */

/** @type State */
let state = {
  time: 0,
  timeline: Sources.bpm(settings.bpm)
};

async function update() {
  const { timeline } = state;

  let time = timeline();
  use(saveState({ time }));

  window.requestAnimationFrame(update);
}

/**
 * Use state
 * @param {State} state 
 */
function use(state) {
  const { thingEl } = settings;
  const { time } = state;

  // Scale object 10-200%
  const sizeScale = scalePercent(time, 10, 200);
  thingEl.style.scale = `${sizeScale}%`;
  // Also set opacity
  thingEl.style.opacity = `${time * 100}%`;
}

function setup() {
  update();
};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}

