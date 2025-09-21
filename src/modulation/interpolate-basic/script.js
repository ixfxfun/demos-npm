import { interpolatorInterval } from '@ixfx/modulation';

const settings = Object.freeze({
  // How long to interpolate
  interpolateDuration: { secs: 20 },
  // Element to change and element to display current value
  satEl: /** @type HTMLElement */(document.querySelector(`#sat`)),
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`))
});

/**
 * @typedef {Readonly<{
 * saturationInterpolator: ()=>number
 * hue:number
 * saturation:number
 * }>} State
 */

/** @type State */
let state = {
  // Start saturation with an interval of 1ms,
  // essentially starting the interpolator at its final value
  saturationInterpolator: interpolatorInterval(1),
  // Hue (0..1)
  hue: Math.random(),
  // Current computed saturation (0..1)
  saturation: 0,
};

function update() {
  const { saturationInterpolator } = state;

  // Update state by computing a new saturation value
  // using the interpolator
  saveState({
    saturation: saturationInterpolator()
  });
}

function use() {
  const { satEl, thingEl } = settings;
  const { saturation, hue } = state;

  // Set background based on interpolated saturation value
  const colour = `hsl(${Math.floor(hue * 360)} ${Math.floor(saturation * 100)}% 50%)`;
  thingEl.style.backgroundColor = colour;

  // For debugging, display on page
  satEl.innerText = saturation.toFixed(2);
}

function loop() {
  update();
  use();
  window.requestAnimationFrame(loop);
}

function resetInterpolator() {
  const { interpolateDuration } = settings;
  saveState({
    // Assign a random colour
    hue: Math.random(),
    // Reset saturation
    saturation: 0,
    // Create a new interpolator
    saturationInterpolator: interpolatorInterval(interpolateDuration)
  });
}

function setup() {
  // When we click, restart interpolation from 0..1
  document.addEventListener(`click`, resetInterpolator);

  // Start loop, do an initial interpolator reset
  loop();
  resetInterpolator();
}
setup();

/**
 * Saves the state
 * @param {Partial<State>} newState 
 */
function saveState(newState) {
  state = Object.freeze({
    ...state,
    ...newState
  });
}

