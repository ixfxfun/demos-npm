import { Points } from 'ixfx/geometry.js';
import { Bipolar } from 'ixfx/numbers.js';
import * as Dom from 'ixfx/dom.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';

const pc = new PosesConsumer({ maxAgeMs: 2000 });

const settings = Object.freeze({
  poses: pc.poses,
  // How often to compute data from poses & update thing
  updateSpeedMs: 10,
  // Min and max tilt values
  // (empirically figured out)
  tiltRange: [-0.5, 0.5],
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/** 
 * @typedef {{
 *  tilt:number
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  // Bipolar value, -1 represents one extreme, 1 the other
  tilt: 0
});

const calculateCombinedAngle = () => {
  const { poses, tiltRange } = settings;

  // If there's no poses:
  if (poses.size === 0) return 0;

  let angleTotal = 0;
  let counted = 0;
  for (const pose of poses.get()) {
    let a = computeShoulderAngle(pose); // Note: angle is in radians, not degrees

    // Skip cases where we can't compute angle (eg missing keypoints)
    if (Number.isNaN(a)) continue;

    // Add up to get average for all poses
    angleTotal += a;
    counted++;
  }

  // Calculate average
  let angle = angleTotal / counted;
  if (Number.isNaN(angle)) {
    // Can be NaN if there were no poses
    angle = 0;
  }

  // Put on bipolar scale (-1...1)
  angle = Bipolar.scale(angle, tiltRange[0], tiltRange[1]);

  return angle;
};

const update = () => {
  let { tilt } = state;

  // Calculate average angle across all poses
  tilt = calculateCombinedAngle();

  // Save it
  const s = saveState({ tilt });

  // Use it
  use(s);

  // Run in a loop
  window.requestAnimationFrame(update);
};

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { tilt } = state;
  // For debug purposes, dump data to a table
  settings.dataDisplay.update(state);

  const ctx = Util.getDrawingContext();

  // Fade out canvas
  ctx.fillStyle = `hsl(0,0%,100%,0.01)`;

  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Get x coordinate based on bipolar value
  const x = window.innerWidth * Bipolar.toScalar(tilt);

  Util.drawDot(ctx, x, window.innerHeight / 2, 50 * Math.random(), `black`);
};

/**
 * Return angle (in radians) between left and right shoulder
 * @param {Poses.PoseTracker} pose 
 */
const computeShoulderAngle = (pose) => {
  const left = pose.landmarkValue(`left_shoulder`);
  const right = pose.landmarkValue(`right_shoulder`);
  return Points.angleRadian(right, left);
};

function setup() {
  // Automatically size canvas to viewport
  Dom.fullSizeCanvas(`#canvas`);

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

