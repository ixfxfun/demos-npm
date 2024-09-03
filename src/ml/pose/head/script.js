import * as Dom from 'ixfx/dom.js';
import { Points } from 'ixfx/geometry.js';
import { Poses, PosesConsumer } from "../util/Poses.js";

const pc = new PosesConsumer({ maxAgeMs: 500 });

const settings = Object.freeze({
  // How quickly to call update()
  updateRateMs: 100,
  poses: pc.poses,
  canvasEl: /** @type HTMLCanvasElement */(document.querySelector(`#canvas`)),
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
 * bounds: { width: number, height: number, center: Points.Point }
 * scaleBy: number
 * heads: Array<Head>
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  bounds: {
    width: 0, height: 0,
    center: { x: 0, y: 0 },
  },
  scaleBy: 1,
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
  const { width, height } = state.bounds;
  const { heads } = state;
  const context = settings.canvasEl.getContext(`2d`);
  if (!context) return;

  // Fade out the canvas
  context.fillStyle = `rgba(0,0,0,0.015)`;
  context.fillRect(0, 0, width, height);

  // Draw each head
  for (const head of heads) {
    drawHead(context, head);
  }
};

/**
 * Draws a single head
 * @param {CanvasRenderingContext2D} context 
 * @param {Head} head 
 */
const drawHead = (context, head) => {
  const { scaleBy } = state;
  const { poses } = settings;

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

  Dom.fullSizeCanvas(`#canvas`, arguments_ => {
    // Update state with new size of canvas
    saveState({
      bounds: arguments_.bounds,
      scaleBy: Math.min(arguments_.bounds.width, arguments_.bounds.height)
    });
  });

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

};
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
