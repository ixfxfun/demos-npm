import { clamp } from 'ixfx/numbers.js';
import { Sources } from 'ixfx/modulation.js';

const settings = Object.freeze({
  ageMod: Sources.perSecond(0.1)
});

/**
 * @typedef {Readonly<{
 *  age:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  age: 0
});

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { age } = state;

  const element = document.querySelector(`#ageValue`);
  if (element) {
    element.textContent = Math.floor(age * 100) + `%`;
  }
};

const update = () => {
  const { ageMod } = settings;
  let { age } = state;

  age += ageMod();

  // Save & use state
  use(saveState({
    age: clamp(age)
  }));
};

function setup() {
  setInterval(update, 0);

  document.addEventListener(`click`, () => {
    saveState({
      age: 0
    });
  });
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

