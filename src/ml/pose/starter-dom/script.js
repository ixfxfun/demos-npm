import * as Dom from '@ixfx/dom.js';
import { continuously } from '@ixfx/flow.js';
import { Poses, PosesConsumer } from "../util/Poses.js";

const settings = Object.freeze({
  updateRateMs: 100,
  poses: new PosesConsumer({
    // Old poses are ignored after this length of time
    maxAgeMs: 1000
  }).poses,
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
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


const update = () => {
  const { poses } = settings;

  // Eg. Use raw data
  // for (const rawData of poses.getRawPosesByAge()) {
  //   console.log(rawData);
  // }

  // Eg. Take advantage of the trackers:
  for (const pose of poses.get()) {
    // eg. Get center point of a body
    const centroid = pose.centroid();

    console.log(`Pose: ${pose.guid} Centroid: ${centroid.x.toFixed((2))}, ${centroid.y.toFixed((2))}`);
  }

  // Save newly computed properties
  // saveState({ yourProp });

  settings.dataDisplay.update(state);

};

const use = () => {
  const { yourProp } = state;
  // Do something with state...
};


function setup() {
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