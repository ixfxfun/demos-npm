import * as Dom from '@ixfx/dom.js';
import { CanvasHelper } from '@ixfx/visual.js';
import { continuously } from '@ixfx/flow.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';

const settings = Object.freeze({
  updateRateMs: 100,
  poses: new PosesConsumer({
    maxAgeMs: 1000,
    sampleLimit: 25,
    storeIntermediate: true
  }).poses,
  // Debug display of data can be handy
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {{
 *  yourProp:number
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  yourProp: 10
});

function update() {
  const { poses, dataDisplay } = settings;

  // Eg: Work with raw pose data
  // for (const rawData of poses.getRawPosesByAge()) {
  //   console.log(rawData);
  // }

  // Eg. Take advantage of the trackers:
  for (const pose of poses.get()) {
    // eg. Get center point of a body
    const centroid = pose.centroid();

    console.log(`Pose: ${pose.guid} Centroid: ${centroid.x.toFixed((2))}, ${centroid.y.toFixed((2))}`);
  }

  // Save state
  // saveState({ yourProp });

  // Show state
  dataDisplay.update(state);

}

function use() {
  const { canvasHelper, poses } = settings;
  const { yourProp } = state;
  const { ctx } = canvasHelper;

  canvasHelper.clear();

  // Do some drawing!
}

function setup() {
  // Draw loop
  continuously(() => {
    update();
    use();
  }, settings.updateRateMs).start();
}

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