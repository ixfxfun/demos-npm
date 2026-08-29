/**
 * Sends JSON to a microcontroller
 */
import { Serial } from '@ixfx/io.js';
import * as Util from './util.js';
const settings = Object.freeze({
  serial: new Serial.Device({ name: `Arduino`, debug: true })
});

let state = Object.freeze({
  data: { brightness: 0 }
});

const connect = async () => {
  const { serial } = settings;
  try {
    // Listen for events
    serial.addEventListener(`change`, event => {
      console.log(`${event.priorState} -> ${event.newState}`);
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
 * Sends current data to micocontroller
 */
const use = () => {
  const { serial } = settings;
  const { data } = state;
  serial.write(JSON.stringify(data));
};

function setup() {
  document.querySelector(`#btnConnect`)?.addEventListener(`click`, connect);
  document.querySelector(`#inputLevel`)?.addEventListener(`input`, event => {
    const element = /** @type {HTMLInputElement}*/(event.target);

    // On scale of 0-100. 
    const value = Number.parseInt(element.value);

    // Convert to 0-1
    saveState({
      data: { brightness: value / 100 }
    });

    // Trigger update
    use();
  });
}
setup();

/**
 * Save state
 * @param {Partial<typeof state>} partialNewState 
 */
function saveState(partialNewState) {
  state = Object.freeze({
    ...state,
    ...partialNewState
  });
}