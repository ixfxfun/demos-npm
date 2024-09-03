const settings = Object.freeze({
  fullMode: window.location.hash === `#full`,
  labelEl: /** @type HTMLElement */(document.querySelector(`label[for="slider"]`)),
  spotEl: /** @type HTMLElement */(document.querySelector(`#spot`))
});

/**
 * @typedef {Readonly<{
 *  slider:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  slider: 0,
});

/**
 * Use state
 * @param {State} state 
 */
function use(state) {
  const { fullMode, labelEl, spotEl } = settings;
  const { slider } = state;

  // Update numeric output
  labelEl.innerHTML = slider.toString();

  // Map slider value to colour saturation
  const saturation = Math.round(slider * 100);
  const hsl = `hsl(var(--hue), ${saturation}%, 50%)`;
  if (spotEl && !fullMode) {
    spotEl.style.backgroundColor = hsl;
  } else if (fullMode) {
    document.body.style.backgroundColor = hsl;
  }
};

function setup() {
  const { fullMode } = settings;

  document.querySelector(`#slider`)?.addEventListener(`input`, event => {
    const element = /** @type HTMLInputElement|null */(event.target);
    if (!element) return;

    // Slider is on range 0..1000, make into a 0..1 range
    saveState({ slider: Number.parseInt(element.value) / 1000 });
    use(state);
  });

  const buttonFullScreen = /** @type HTMLElement */(document.querySelector(`#btnFullScreen`));

  buttonFullScreen.addEventListener(`click`, event => {
    document.documentElement.requestFullscreen();
  });
  if (!fullMode) buttonFullScreen.style.display = `none`;

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
}
