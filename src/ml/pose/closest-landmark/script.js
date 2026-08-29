import { DataDisplay } from '@ixfx/dom.js';
import { continuously } from '@ixfx/flow.js';
import { Poses, PosesConsumer } from "../util/Poses.js";

const settings = Object.freeze({
  // Which landmark to compare to
  targetLandmark: `left_shoulder`,
  // How often to look at pose data
  updateRateMs: 100,
  poses: new PosesConsumer({
    // Old poses are ignored after this length of time
    maxAgeMs: 1000
  }).poses,
  dataDisplay: new DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
});

/** 
 * @typedef {{
 *  closest:string
 * }} State
 */

/** @type {State} */
let state = Object.freeze({
  closest: ``
});

const update = () => {
  const { targetLandmark } = settings;

  // We use a sender that only sends one pose
  // Use the most recent one
  const poses = [ ...settings.poses.getByAge() ];
  if (poses.length === 0) {
    saveState({ closest: `No poses.` });
    return;
  }
  const pose = poses[0];

  // Get our target landmark
  const targetLandmarkLandmark = pose.landmarkValue(targetLandmark);

  // Get a list of landmarks sorted by 2d distance to target
  const toTarget = pose.getByDistanceFromPoint(targetLandmarkLandmark, true);

  // We want the second-closest landmark, because the closest will be the landmark itself.
  const closest = toTarget[1];

  if (!closest) {
    saveState({ closest: `No landmarks?` });
    return;
  }

  saveState({ closest: closest.landmark.id });
};

const use = () => {
  // Debug display
  settings.dataDisplay.update(state);
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