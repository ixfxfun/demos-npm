import { Sources } from 'ixfx/modulation.js';
import { resolveFields } from 'ixfx/data.js';
import { clamp, scale, scalePercent } from 'ixfx/numbers.js';

const settings = {
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`)),
  // How much to increase inflation when there's a click
  pumpAmount: 0.04,
  // How quickly to deflate
  deflationRate: 0.03
};

/**
 * @typedef {Readonly<{
 *  inflation: number
 *  deflator: () => number
 * }>} State
 */

/** @type State */
let state = {
  // Amount of inflation on 0..1 scale
  inflation: 1,
  deflator: Sources.perSecond(settings.deflationRate)
};

async function update() {
  let { inflation, deflator } = await resolveFields(state);

  // Deflate using the returned value from the deflator function
  // Clamp to make sure we're within 0..1
  inflation = clamp(inflation - deflator);

  // Save inflation value
  use(saveState({ inflation }));

  window.requestAnimationFrame(update);
}

/**
 * Use state
 * @param {State} state 
 */
function use(state) {
  const { thingEl } = settings;
  const { inflation } = state;

  // Scale object based on inflation, using a range of 10-200%
  // so it doesn't disappear completely.
  const sizeScale = scalePercent(inflation, 10, 200);
  thingEl.style.scale = `${sizeScale}%`;

  // Get size of thing
  const thingSize = thingEl.getBoundingClientRect();

  const availableHeight = window.innerHeight - thingSize.height;
  let yPx = (1 - inflation) * availableHeight;

  thingEl.style.top = `${yPx}px`;
}

function setup() {
  const { pumpAmount } = settings;

  // 'Pump' inflation
  document.addEventListener(`click`, () => {
    saveState({
      inflation: clamp(state.inflation + pumpAmount)
    });
  });

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

