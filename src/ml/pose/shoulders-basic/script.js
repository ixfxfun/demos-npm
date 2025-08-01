import { Points } from '@ixfx/geometry';
import { Bipolar } from '@ixfx/numbers';
import * as Dom from '@ixfx/dom';
import { CanvasHelper } from '@ixfx/visual';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';

const pc = new PosesConsumer({ maxAgeMs: 2000 });

const settings = Object.freeze({
  // Tracked poses
  poses: pc.poses,
  // How often to compute data from poses & update thing
  updateSpeedMs: 10,
  // Min and max tilt values (empirically figured out)
  tiltRange: [-0.5, 0.5],
  // Be able to show some debug info for ourselves
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` }),
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

/**
 * Calculates a combined shoulder angle of all poses,
 * returning a value on bipolar -1 ... 1 scale. Where 0 means middle.
 * @returns 
 */
const calculateCombinedAngle = () => {
  const { poses, tiltRange } = settings;

  // If there's no poses, say that angle is 0
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
    // Could be NaN if there were no poses. Treat this as being in the middle.
    return 0;
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
  const { canvasHelper } = settings;
  const { ctx } = canvasHelper;

  // For debug purposes, dump data to a table
  settings.dataDisplay.update(state);

  // Fade out canvas
  ctx.fillStyle = `hsl(0,0%,100%,0.01)`;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Get x coordinate based on current tilt value (bipolar)
  const x = Bipolar.toScalar(tilt, window.innerWidth);

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

