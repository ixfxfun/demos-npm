import * as Dom from '@ixfx/dom';
import { CanvasHelper } from '@ixfx/visual';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';

// Will connect and receive poses for us
const pc = new PosesConsumer();

const settings = Object.freeze({
  poses: pc.poses,
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {{
 *  yourState:number
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  yourState: 10
});


const update = () => {
  const { poses } = settings;

  // Work with PosesTracker somehow...

  // We'll just dump the data
  for (const rawData of poses.getRawPosesByAge()) {
    console.log(rawData);
  }

  // Or to take advantage of the trackers:
  for (const pose of poses.get()) {
    // eg. get center point of a body
    // pose.centroid;
  }

  // Save it
  //const s = saveState({ stuffToSave });

  // Use it
  use(state);

  // Run in a loop
  window.requestAnimationFrame(update);
};

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { canvasHelper } = settings;
  const { ctx } = canvasHelper;
  // get stuff from state
  // do stuff with it...

};


function setup() {

  // Draw loop
  window.requestAnimationFrame(update);
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