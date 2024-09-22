import { rate } from 'ixfx/trackers.js';

const settings = Object.freeze({
  updateRateMs: 500,
  tracker: rate({
    // Calculate on the last 10 clicks
    sampleLimit: 10,
    // If there's been no input after 5 secs, reset
    timeoutInterval: { secs: 5 }
  }),
  rateEl: /** @type HTMLElement */(document.querySelector(`#rate`))
});

/**
 * @typedef {Readonly<{
 *  current: number
 * }>} State
 */
let state = {
  current: 0
};


const use = () => {
  const { rateEl } = settings;
  const { current } = state;
  if (!rateEl) return;
  if (current === 0) {
    rateEl.innerHTML = `How reliable is your timing? Try clicking the button at the rate of one click per second.`;
    return;
  }
  const diff = current - 1;
  rateEl.innerHTML = `${current.toFixed(2)} clicks per second, you're off by: ${diff.toFixed(2)}`;
};

const update = () => {
  const { tracker } = settings;

  const perSecond = tracker.perSecond;
  const intervals = tracker.computeIntervals();
  saveState({ current: perSecond });
  use();
  setTimeout(update, settings.updateRateMs);
};


function setup() {
  const { tracker } = settings;
  document.querySelector(`#button`)?.addEventListener(`click`, event => {
    tracker.mark();
  });
  update();
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