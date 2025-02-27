import * as Dom from 'ixfx/dom.js';
import * as DeviceMotion from './devicemotion.js';

const settings = Object.freeze({});

/** 
 * @typedef {Readonly<{
 * paused: boolean
 * }>} State */

/** @type State */
let state = Object.freeze({
  paused: false
});


/**
 * Called when there's motion data
 * @param {DeviceMotion.MotionData} data 
 * @returns 
 */
const onMotion = (data) => {
  if (state.paused) return;

  // Do something with data...
};


const setup = () => {
  const btnStart = /** @type HTMLButtonElement */(document.querySelector(`#btnStart`));

  // Useful for catching errors when running on mobile
  Dom.inlineConsole({
    insertIntoEl: `#console`,
    witholdCss: true
  });

  btnStart.addEventListener(`click`, () => {
    DeviceMotion.listen(onMotion);
    btnStart.disabled = true;
  });
};
setup();