/**
 * Receives JSON from a microcontroller
 */
import { Serial } from '@ixfx/io.js';
import { scale } from '@ixfx/numbers.js';
import * as Util from './util.js';
const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true, eol: `\n` }),
  rangeMax: { x: 1023, y: 1023 },
  rangeMin: { x: 0, y: 0 }
});

// Initial state
let state = Object.freeze({
  /** @type number */
  x: 0,
  /** @type number */
  y: 0,
  /** @type boolean */
  sw: false
});

const connect = async () => {
  const { serial } = settings;
  try {
    // Listen for events
    serial.addEventListener(`change`, event => {
      if (event.newState === `connected`) onConnected(true);
      else onConnected(false);
    });

    // Connect
    await serial.connect();
  } catch (error) {
    console.error(error);
  }
};


/**
 * Called when port is disconnected/connected
 * @param {boolean} connected 
 */
const onConnected = (connected) => {
  Util.setCssDisplay(`#preamble`, connected ? `none` : `block`);
  Util.setCssDisplay(`#connected`, connected ? `block` : `none`);
};

/**
 * Updates UI with current values
 */
const use = () => {
  const { x, y, sw } = state;


  Util.setHtml(`#lblX`, Util.percentage(x));
  Util.setHtml(`#lblY`, Util.percentage(y));
  Util.setHtml(`#lblSwitch`, sw ? `Pressed` : `Not pressed`);
};

function setup() {
  const { serial, rangeMax, rangeMin } = settings;
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  serial.addEventListener(`data`, event => {
    try {
      const o = JSON.parse(event.data.trim());

      // Get relative values
      const x = scale(o.x, rangeMin.x, rangeMax.x);
      const y = scale(o.y, rangeMin.y, rangeMax.y);
      const sw = o.sw ?? false;

      saveState({ x, y, sw });
      use();
    } catch (error) {
      console.log(error);
      console.log(event.data);
    }
  });

}
setup();

/**
 * Update state
 * @param {Partial<typeof state>} partialNewState 
 */
function saveState(partialNewState) {
  state = Object.freeze({
    ...state,
    ...partialNewState
  });
}