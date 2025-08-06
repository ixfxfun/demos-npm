import * as Dom from '@ixfx/dom';
import { PlotElement } from 'https://unpkg.com/@ixfx/components@0.1.3/bundle';
import * as DeviceMotion from './devicemotion.js';

const settings = Object.freeze({
  useFakeDataAsFallback: true,
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

  const faked = d.faked ? `<small>(faked)</small>` : ``;
  accelEl.innerHTML = `
  <table><tr><td colspan=3>acceleration ${faked}</td></tr>
  <tr><td>x: ${v(d.acceleration.x)}</td><td>y: ${v(d.acceleration.y)}</td><td>z: ${v(d.acceleration.z)}</td></tr>
  </table>
  `;
  accelPlotEl.plotObject(d.acceleration);

  accelGravEl.innerHTML = `
  <table><tr><td colspan=3>accelerationIncludingGravity ${faked}</td></tr>
    <tr><td>x: ${v(d.accelerationIncludingGravity.x)}</td><td>y: ${v(d.accelerationIncludingGravity.y)}</td><td>z: ${v(d.accelerationIncludingGravity.z)}</td></tr>
  </table>`;
  accelGravPlotEl.plotObject(d.accelerationIncludingGravity);

  rotRateEl.innerHTML = `
  <table><tr><td colspan=3>rotationRate ${faked}</td></tr>
  <tr><td>a: ${v(d.rotationRate.alpha)}</td><td>b: ${v(d.rotationRate.beta)}</td><td>g: ${v(d.rotationRate.gamma)}</td></tr>
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
    DeviceMotion.listen(onMotion, settings.useFakeDataAsFallback);
    btnStart.disabled = true;
    btnPause.removeAttribute(`disabled`);
  });

  btnPause.addEventListener(`click`, () => {
    state = {
      ...state,
      paused: !state.paused
    };
  });
};
setup();
