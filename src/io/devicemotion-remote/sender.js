import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '@ixfx/dom';
import * as DeviceMotion from './devicemotion.js';

const settings = Object.freeze({
  useFakeDataAsFallback: true,
  lastDataEl: /** @type HTMLElement */(document.querySelector(`#lastData`)),
  remote: new Remote({
    websocket: `wss://${window.location.host}/ws`,
    allowNetwork: false
  })
});

let state = Object.freeze({
  /** @type boolean */
  paused: false
});

/**
 * 
 * @param {DeviceMotion.MotionData} d 
 * @returns 
 */
const onMotion = (d) => {
  const { lastDataEl, remote } = settings;
  const { paused } = state;
  if (paused) return;

  console.log(d);

  // Send it
  remote.broadcast(d);

  // Show it
  lastDataEl.innerHTML = `
  <table>
  <tr>
    <td colspan=3>accel x, y, z</td>
  </tr>
  <tr>
    <td>${v(d.accel.x)}</td><td>${v(d.accel.y)}</td><td>${v(d.accel.z)}</td>
  </tr>
  <tr>
    <td colspan=3>accelGrav x, y, z</td>
  </tr>
    <tr>
    <td>${v(d.accelGrav.x)}</td><td>${v(d.accelGrav.y)}</td><td>${v(d.accelGrav.z)}</td>
  </tr>
  <tr>
    <td colspan=3>rotRate alpha, beta, gamma</td>
  </tr>
    <tr>
    <td>${v(d.rotRate.alpha)}</td><td>${v(d.rotRate.beta)}</td><td>${v(d.rotRate.gamma)}</td>
  </tr>
  </table>`;
};


const setup = () => {
  const btnStart = /** @type HTMLButtonElement */(document.querySelector(`#btnStart`));
  const btnPause = /** @type HTMLButtonElement */(document.querySelector(`#btnPause`));

  Dom.inlineConsole({
    insertIntoEl: `#console`,
    witholdCss: true
  });

  btnStart.addEventListener(`click`, () => {
    DeviceMotion.listen(onMotion, settings.useFakeDataAsFallback);
    btnStart.disabled = true;
    btnPause.removeAttribute(`disabled`);
  });

  btnPause.addEventListener(`click`, event => {
    state = {
      ...state,
      paused: !state.paused
    };
  });

  /** @type HTMLInputElement */(document.querySelector(`#txtPeerId`)).value = settings.remote.id;

};
setup();

/**
 * Returns a string version of 'value' with
 * only a few digits of precision
 * @param {number} value 
 * @returns 
 */
function v(value) {
  if (!value) return 0;
  return value.toPrecision(2);
}