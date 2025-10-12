import * as Dom from '@ixfx/dom';
import { CanvasHelper } from '@ixfx/visual';
import { Points } from '@ixfx/geometry';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Draw from './draw.js';

const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 100,
  // Tracked poses
  poses: new PosesConsumer({ maxAgeMs: 500 }).poses,
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` }),
  // Overlay to show data for debugging
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/**
 * @typedef {{
 * x: number
 * y: number
 * radius: number
 * poseId: string
 * hue: number
 * }} Head
 */

/**
 * @typedef {Readonly<{
 * heads: Array<Head>
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  heads: []
});

/**
 * Runs periodically, computing something
 * new from latest pose data
 */
const update = () => {
  const { poses } = settings;

  // Compute a head size for each pose
  const heads = [];
  for (const pose of poses.get()) {
    const head = computeHead(pose);
    if (!head) continue; // No head detected
    heads.push(head);
  }
  saveState({ heads });

  // For debug purposes, dump data to a table
  settings.dataDisplay.update(heads);
};

/**
 * Returns a 'Head' based on a few landmarks
 * @param {Poses.PoseTracker} pose
 * @return {Head|undefined} 
 */
const computeHead = (pose) => {
  const nose = pose.landmarkValue(`nose`);
  const leftEar = pose.landmarkValue(`left_ear`);
  const rightEar = pose.landmarkValue(`right_ear`);
  if (!leftEar || !rightEar || !nose) return; // No ears or nose :/
  const earDistance = Points.distance2d(leftEar, rightEar);
  const radius = earDistance / 2;

  return {
    // Nose determines center of circle
    x: nose.x,
    y: nose.y,
    radius, // Computed from distance ear-to-ear
    poseId: pose.guid,
    hue: pose.hue
  };
};

const use = () => {
  const { heads } = state;
  const { canvasHelper } = settings;
  const { ctx } = canvasHelper;

  // Fade out the canvas
  ctx.fillStyle = `rgba(227, 227, 227, 0.44)`;
  ctx.fillRect(0, 0, canvasHelper.width, canvasHelper.height);

  // Draw each head
  heads.forEach(head => Draw.head(canvasHelper, head));
};


/**
 * Called when a new pose is detecteda
 * @param {*} event 
 */
const onPoseAdded = (event) => {
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
  //console.log(`Pose added: ${poseTracker.guid}`);
};

/**
 * Called when a pose is no longer being tracked
 * @param {*} event 
 */
const onPoseExpired = (event) => {
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
  //console.log(`Pose expired: ${poseTracker.guid}`);
};

/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, poses } = settings;
  poses.addEventListener(`added`, onPoseAdded);
  poses.addEventListener(`expired`, onPoseExpired);

  setInterval(() => {
    update();
    use();
  }, updateRateMs);

}
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });

}
