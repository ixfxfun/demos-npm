import { clamp } from 'ixfx/numbers.js';

const settings = Object.freeze({
  fullMode: window.location.hash === `#full`,
  // On a full scale of 0..1000, what speed
  // is considered maximum
  speedMax: 20,
  labelEl: /** @type HTMLElement */(document.querySelector(`label[for="slider"]`)),
  spotEl: /** @type HTMLElement */(document.querySelector(`#spot`))
});

/**
 * @typedef {Readonly<{
 *  lastSliderValue:number
 *  speed:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  lastSliderValue: 0,
  speed: 0
});

/**
 * Use state
 * @param {State} state
 */
const use = (state) => {
  const { fullMode, labelEl, spotEl } = settings;
  const { speed } = state;

  // Update numeric output
  labelEl.innerHTML = speed.toFixed(2);

  // Map slider value to colour saturation
  const saturation = Math.round(speed * 100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotEl && !fullMode) {
    spotEl.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl;
  }
};

function setup() {
  const { fullMode, speedMax } = settings;

  document.querySelector(`#slider`)?.addEventListener(`input`, event => {
    const element = /** @type HTMLInputElement|null */(event.target);
    if (!element) return;

    // Convert to number
    const v = Number.parseInt(element.value);

    // Compare with last value, ignoring if
    // it's a +/- change
    const diff = Math.abs(v - state.lastSliderValue);

    // Get a speed value of 0..1
    const speed = clamp(diff / speedMax);

    // TODO: It would be better if the speed value
    // was blended into the current speed, and for
    // speed to slowly reduce when there is no movement.
    // movingAverageLight (discussed here: https://ixfx.fun/data/averaging/) would be useful.

    saveState({
      lastSliderValue: v,
      speed,
    });
    use(state);
  });

  const buttonFullScreen = /** @type HTMLElement */(document.querySelector(`#btnFullScreen`));
  if (buttonFullScreen) {
    buttonFullScreen.addEventListener(`click`, event => {
      document.documentElement.requestFullscreen();
    });
    if (!fullMode) buttonFullScreen.style.display = `none`;
  }

  if (fullMode) {
    const spotElement = /** @type HTMLElement */(document.querySelector(`#spot`));
    if (spotElement) spotElement.style.display = `none`;
  }
  use(state);
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
