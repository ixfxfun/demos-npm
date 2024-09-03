// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from 'ixfx/dom.js';
import * as MpVision from "../util/Objects.js";
const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 100,
  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  outputEl: /** @type HTMLElement */(document.querySelector(`#output`))
});

/**
 * @typedef {Readonly<{
 *  objects: Array<MpVision.Detection>
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  objects: []
});

/**
 * Runs periodically, computing something
 * new from latest data
 */
const update = () => {
  const { outputEl } = settings;
  const { objects } = state;

  let html = ``;
  let objIndex = 0;
  for (const o of objects) {
    // Every object detected
    html += `<div>
    <h3>Object ${objIndex++}</h3>
    <ol>`;
    // Categories it could be
    for (const c of o.categories) {
      html += `<li>${c.score.toFixed(2)} ${c.categoryName}</li>`;
    }
    html += `</ol></div>`;
  }
  outputEl.innerHTML = html;

  if (objects.length === 0) return;

};

/**
 * Received detected object data
 * @param {MpVision.Detection[]} objects 
 */
function onObjects(objects) {
  // Todo: data processing?

  // for now, just stash in state
  saveState({ objects });
}

/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, remote } = settings;

  remote.onData = (raw) => {
    const data = JSON.parse(raw.data);
    if (`detections` in data) {
      onObjects(data.detections);
    } else {
      console.warn(`Are we receiving object detection data?`);
      console.log(raw);
    }
  };

  // Update at updateRateMs
  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
