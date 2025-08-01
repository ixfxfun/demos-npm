import { Points } from '@ixfx/geometry';
import { CanvasHelper } from '@ixfx/visual';
import { Bipolar, interpolate } from '@ixfx/numbers';
import * as Dom from '@ixfx/dom';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Things from './thing.js';
import * as Util from './util.js';

const pc = new PosesConsumer({ maxAgeMs: 2000 });

const settings = Object.freeze({
  // How often to compute data from poses & update thing
  updateSpeedMs: 10,
  // How much to push toward 0 neutral position
  tiltDecay: 0.01,
  // How much of computed angle to fold in
  angleAmount: 0.03,
  // Empirically-discovered min angle
  tiltMin: -0.5,
  // Empirically-discovered max angle
  tiltMax: 0.5,
  poses: pc.poses,
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
  const { thing, tilt } = state;
  const { canvasHelper } = settings;
  const { ctx } = canvasHelper;

  Util.textContent(`#info`, tilt);

  ctx.fillStyle = `hsl(220, 100%, 90%)`;
  ctx.fillRect(0, 0, canvasHelper.width, canvasHelper.height);

  Things.use(thing, ctx, canvasHelper);
};

const update = () => {
  const { poses, angleAmount, tiltMax, tiltMin, tiltDecay } = settings;
  let { tilt, thing } = state;

  // Calculate change in tilt
  let angleTotal = 0;
  let counted = 0;
  for (const pose of poses.get()) {
    let a = computeShoulderAngle(pose); // Note: angle is in radians, not degrees

    // Skip cases where we can't compute angle (eg missing keypoints)
    if (Number.isNaN(a)) continue;

    // Scale to bipolar -1 to 1 scale
    a = Bipolar.scale(a, tiltMin, tiltMax);

    // Add up to get average for all poses
    angleTotal += a;
    counted++;
  }

  // Interpolate if we have the data
  if (counted > 0) {
    const angleAverage = angleTotal / counted;

    // Interpolate toward average of all poses
    tilt = interpolate(angleAmount, tilt, angleAverage);
  }

  // Push toward 0 (neutral)
  tilt = Bipolar.towardZero(tilt, tiltDecay);


  // Update thing
  thing = Things.update(state.thing, state);

  // Save
  saveState({ tilt, thing });

  // For debug purposes, dump data to a table
  settings.dataDisplay.update(thing);
};

/**
 * Return angle (in radians) between left and right shoulder
 * @param {Poses.PoseTracker} pose 
 */
const computeShoulderAngle = (pose) => {
  const left = pose.landmarkValue(`left_shoulder`);
  const right = pose.landmarkValue(`right_shoulder`);
  if (!left || !right) return Number.NaN;
  return Points.angleRadian(left, right);
};


function setup() {
  // Update
  setInterval(() => {
    update();
  }, settings.updateSpeedMs);

  // Draw loop
  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  window.requestAnimationFrame(animationLoop);

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

