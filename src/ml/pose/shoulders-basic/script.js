import { Bipolar, interpolate } from '@ixfx/numbers.js';
import { continuously } from '@ixfx/flow.js';
import * as Dom from '@ixfx/dom.js';
import { CanvasHelper } from '@ixfx/visual.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';

const settings = Object.freeze({
  // Increment toward current value by 1%
  tiltInterpolator: interpolate(0.01),

  poses: new PosesConsumer({ maxAgeMs: 2000 }).poses,
  // How often to compute data from poses & update thing
  updateSpeedMs: 10,
  // Min and max tilt values (empirically figured out)
  tiltRange: [ -0.25, 0.25 ],
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

  let yTotal = 0;
  let counted = 0;
  for (const pose of poses.get()) {
    let d = computeShoulderHeightDifference(pose);

    // Skip cases where we can't compute angle (eg missing keypoints)
    if (Number.isNaN(d)) continue;

    // Add up to get average for all poses
    yTotal += d;
    counted++;
  }

  // Calculate average
  let yAverage = yTotal / counted;
  if (Number.isNaN(yAverage)) {
    // Could be NaN if there were no poses. Treat this as being in the middle.
    return 0;
  }

  // Put on bipolar scale (-1...1)
  return Bipolar.scale(yAverage, tiltRange[0], tiltRange[1]);
};

const update = () => {
  const { tiltInterpolator } = settings;
  let { tilt } = state;

  // Calculate average angle across all poses
  tilt = calculateCombinedAngle();

  // Interpolate toward value from current
  tilt = tiltInterpolator(state.tilt, tilt);

  // Save state
  saveState({ tilt });
};


const use = () => {
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
 * Return Y difference between left and right shoulder
 * @param {Poses.PoseTracker} pose 
 */
const computeShoulderHeightDifference = (pose) => {
  const left = pose.landmarkValue(`left_shoulder`);
  const right = pose.landmarkValue(`right_shoulder`);
  if (!left || !right) return Number.NaN;
  return left.y - right.y;
};


function setup() {
  continuously(() => {
    update();
    use();
  }).start();
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

