import * as Dom from '@ixfx/dom';
import * as DeviceMotion from './devicemotion.js';

const settings = Object.freeze({
  // If true, uses fake data if sensors could
  // not be used for some reason.
  useFakeDataAsFallback: true
});

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
  console.log(data);
};


const setup = () => {
  const btnStart = /** @type HTMLButtonElement */(document.querySelector(`#btnStart`));
  const tipDiv = /** @type HTMLDivElement */(document.querySelector(`#tip`));

  // Useful for catching errors when running on mobile
  Dom.inlineConsole({
    insertIntoEl: `#console`,
    witholdCss: true
  });

  btnStart.addEventListener(`click`, () => {

    DeviceMotion.listen(onMotion, settings.useFakeDataAsFallback);
    btnStart.disabled = true;
    tipDiv.remove();
  });
};
setup();