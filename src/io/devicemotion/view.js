import * as Dom from 'ixfx/dom.js';
import * as DeviceMotion from './devicemotion.js';
import { PlotElement } from 'ixfx/components.js';

const settings = Object.freeze({
  accelEl: /** @type HTMLElement */(document.querySelector(`#accel`)),
  accelPlotEl: PlotElement.fromQuery(`#accelPlot`),
  accelGravEl: /** @type HTMLElement */(document.querySelector(`#accelGrav`)),
  accelGravPlotEl: PlotElement.fromQuery(`#accelGravPlot`),
  rotRateEl: /** @type HTMLElement */(document.querySelector(`#rotRate`)),
  rotRatePlotEl: PlotElement.fromQuery(`#rotRatePlot`)
});

/** @typedef {Readonly<{
 * paused: boolean
 * }>} State */

/** @type State */
let state = Object.freeze({
  paused: false
});

/**
 * 
 * @param {DeviceMotion.MotionData} d 
 * @returns 
 */
const onMotion = (d) => {
  const { accelEl, accelGravEl, rotRateEl } = settings;
  const { accelPlotEl, accelGravPlotEl, rotRatePlotEl } = settings;

  const { paused } = state;
  if (paused) return;

  const v = (x) => {
    if (!x) return 0;
    return x.toPrecision(2);
  };

  accelEl.innerHTML = `
  <table><tr><td colspan=3>accel x, y, z</td></tr>
  <tr><td>${v(d.acceleration.x)}</td><td>${v(d.acceleration.y)}</td><td>${v(d.acceleration.z)}</td></tr>
  </table>
  `;
  accelPlotEl.plotObject(d.acceleration);

  accelGravEl.innerHTML = `
  <table><tr><td colspan=3>accelGrav x, y, z</td></tr>
    <tr><td>${v(d.accelerationIncludingGravity.x)}</td><td>${v(d.accelerationIncludingGravity.y)}</td><td>${v(d.accelerationIncludingGravity.z)}</td></tr>
  </table>`;
  accelGravPlotEl.plotObject(d.accelerationIncludingGravity);

  rotRateEl.innerHTML = `
  <table><tr><td colspan=3>rotRate alpha, beta, gamma</td></tr>
  <tr><td>${v(d.rotationRate.alpha)}</td><td>${v(d.rotationRate.beta)}</td><td>${v(d.rotationRate.gamma)}</td></tr>
  </table>`;
  rotRatePlotEl.plotObject(d.rotationRate);
};


const setup = () => {
  const btnStart = /** @type HTMLButtonElement */(document.querySelector(`#btnStart`));
  const btnPause = /** @type HTMLButtonElement */(document.querySelector(`#btnPause`));

  Dom.inlineConsole({
    insertIntoEl: `#console`,
    witholdCss: true
  });

  btnStart.addEventListener(`click`, () => {
    DeviceMotion.listen(onMotion);
    btnStart.disabled = true;
    btnPause.removeAttribute(`disabled`);
  });

  document.querySelector(`#btnPause`)?.addEventListener(`click`, () => {
    state = {
      ...state,
      paused: !state.paused
    };
  });
};
setup();