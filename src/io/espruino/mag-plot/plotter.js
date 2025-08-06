/**
 * --------------------------
 * No need to edit this file!
 * --------------------------
 */
import * as Html from './html.js';
import { PlotElement } from 'https://unpkg.com/@ixfx/components@0.1.3/bundle';

/**
 * @typedef {Readonly<{
* x: number
* y: number
* z: number
* }>} MagReading
*/

const plotEls = {
  x: PlotElement.fromQuery(`#plot-x`),
  y: PlotElement.fromQuery(`#plot-y`),
  z: PlotElement.fromQuery(`#plot-z`)
};

const bc = new BroadcastChannel(`mag`);
let initialised = false;
let isConnected = false;

bc.addEventListener(`message`, ev => {
  const data = ev.data;
  if (!data) return;
  if (!initialised) {
    init();
  }
  if (`connected` in data) {
    isConnected = /** @type boolean */(data.connected);
  } else if (`input` in data && `output` in data) {
    onData(data.input, data.output);
  } else {
    // Unknown input
    console.log(ev);
  }
});


function init() {
  initialised = true;

  // Set plotter output ranges to bipolar scale
  for (const el of Object.values(plotEls)) {
    el?.seriesRanges.set(`out`, [ -1, 1 ]);
  }
}

/**
 * Display data
 * @param {MagReading} input 
 * @param {MagReading} output 
 */
function onData(input, output) {
  for (const axis of [ `x`, `y`, `z` ]) {
    Html.set(`in-${axis}`, input[axis]);
    Html.set(`out-${axis}`, output[axis]);
    plotEls[axis].plotObject({ in: input[axis], out: output[axis] });
  }
}