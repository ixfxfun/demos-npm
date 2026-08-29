import { Points } from '@ixfx/geometry.js';
import { CanvasHelper } from '@ixfx/visual.js';
import { Bipolar, interpolate } from '@ixfx/numbers.js';
import * as Dom from '@ixfx/dom.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Things from './thing.js';
import * as Util from './util.js';


const settings = Object.freeze({
  posesConsumer: new PosesConsumer({ maxAgeMs: 2000 }),
  // How often to compute data from poses & update thing
  updateSpeedMs: 10,
  // How much to push toward 0 neutral position
  tiltDecay: 0.01,
  // How much of computed angle to fold in
  angleAmount: 0.03,
  // Empirically-discovered min Y distance
  tiltMin: 0.25,
  // Empirically-discovered max Y distance
  tiltMax: -0.25,
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {{
 *  tilt:number
 *  thing: Things.Thing
 * }} State
 */

/** @type {State} */
let state = Object.freeze({
  thing: Things.create(),
  // Bipolar value: -1...1
  tilt: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { thing } = state;
  const { canvasHelper } = settings;
  const { ctx } = canvasHelper;

  // Clear canvas
  ctx.fillStyle = `hsl(220, 100%, 90%)`;
  ctx.fillRect(0, 0, canvasHelper.width, canvasHelper.height);

  // Get the thing to draw
  Things.use(thing, ctx, canvasHelper);
};

const update = () => {
  const { posesConsumer, angleAmount, tiltMax, tiltMin, tiltDecay } = settings;
  const { poses } = posesConsumer;
  let { tilt, thing } = state;

  // Calculate change in tilt
  let yTotal = 0;
  let counted = 0;
  for (const pose of poses.get()) {
    let a = computeShoulderHeightDifference(pose);

    // Skip cases where we can't compute (eg. missing keypoints)
    if (Number.isNaN(a)) continue;

    // Scale to bipolar -1 to 1 scale
    a = Bipolar.scale(a, tiltMin, tiltMax);

    // Add up to get average for all poses
    yTotal += a;
    counted++;
  }

  // Interpolate if we have the data
  if (counted > 0) {
    const yAverage = yTotal / counted;

    // Interpolate toward average of all poses
    tilt = interpolate(angleAmount, tilt, yAverage);
  }

  // Push toward 0 (neutral)
  tilt = Bipolar.towardZero(tilt, tiltDecay);

  // Save state of world
  saveState({ tilt });

  // Update thing
  thing = Things.update(state.thing, state);

  // Save changed thing
  saveState({ thing });

  // For debug purposes, dump data to a table
  settings.dataDisplay.update({ tilt, velocity: thing.velocity.x });
};

/**
 * Return angle (in radians) between left and right shoulder
 *
 * Function not used, included for example purposes
 * @param {Poses.PoseTracker} pose 
 */
// const computeShoulderAngle = (pose) => {
//   const left = pose.landmarkValue(`left_shoulder`);
//   const right = pose.landmarkValue(`right_shoulder`);
//   if (!left || !right) return Number.NaN;
//   return Points.angleRadian(left, right);
// };

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
  setInterval(() => {
    update();
    use();
  }, settings.updateSpeedMs);
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

