import * as Dom from '@ixfx/dom';
import { CanvasHelper } from '@ixfx/visual';
import { Points } from '@ixfx/geometry';
import { Poses, PosesConsumer } from "../util/Poses.js";

const pc = new PosesConsumer({ maxAgeMs: 500 });

const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 100,
  // Tracked poses
  poses: pc.poses,
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
 * Returns a circle based on a few head landmarks
 * @param {Poses.PoseTracker} pose
 * @return {Head|undefined} 
 */
const computeHead = (pose) => {
  const nose = pose.landmarkValue(`nose`);
  const leftEar = pose.landmarkValue(`left_ear`);
  const rightEar = pose.landmarkValue(`right_ear`);
  if (!leftEar || !rightEar || !nose) return; // No ears or nose :/
  const earDistance = Points.distance(leftEar, rightEar);
  const radius = earDistance / 2;
  return {
    x: nose.x,
    y: nose.y,
    radius,
    poseId: pose.guid
  };
};

const draw = () => {
  const { heads } = state;
  const { canvasHelper } = settings;
  const { ctx } = canvasHelper;

  // Fade out the canvas
  ctx.fillStyle = `rgba(227, 227, 227, 0.44)`;
  ctx.fillRect(0, 0, canvasHelper.width, canvasHelper.height);

  // Draw each head
  for (const head of heads) {
    drawHead(ctx, head);
  }
};

/**
 * Draws a single head
 * @param {CanvasRenderingContext2D} context 
 * @param {Head} head 
 */
const drawHead = (context, head) => {
  const { poses } = settings;
  const { canvasHelper } = settings;
  const scaleBy = canvasHelper.dimensionMin;

  const headAbs = Points.multiplyScalar(head, scaleBy);
  const radius = head.radius * scaleBy;
  const tracker = poses.getByGuid(head.poseId);
  if (tracker === undefined) return;
  const hue = tracker.hue;

  // Translate canvas so 0,0 is the center of head
  context.save();
  context.translate(headAbs.x, headAbs.y);

  // Draw a circle
  context.beginPath();
  context.fillStyle = `hsl(${hue},60%,70%)`;
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();

  // Draw id of head
  context.fillStyle = `black`;
  context.fillText(head.poseId.toString(), 0, 0);

  // Undo translation
  context.restore();
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

  // Update at updateRateMs
  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();


  // Draw as fast as possible
  const animationLoop = () => {
    draw();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();

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
