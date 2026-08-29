import { Serial } from '@ixfx/io.js';
import * as Util from './util.js';

const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true, eol: `\n` }),
});

let state = Object.freeze({
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
  const { sw } = state;

  Util.setHtml(`#lblSwitch`, sw ? `Pressed` : `Not pressed`);
};

function setup() {
  const { serial } = settings;
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  serial.addEventListener(`data`, event => {
    try {
      const o = JSON.parse(event.data.trim());
      const sw = o.sw ?? false;

      saveState({ sw });
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