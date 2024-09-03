import { Points } from 'ixfx/geometry.js';
import { Bipolar, interpolate } from 'ixfx/numbers.js';
import * as Dom from 'ixfx/dom.js';
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
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })

});

/** 
 * @typedef {{
 *  tilt:number
 *  thing: Things.Thing
 *  bounds: import('./util.js').Bounds
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  thing: Things.create(),
  bounds: {
    width: 0, height: 0,
    min: 0, max: 0,
    center: { x: 0, y: 0 },
  },
  // Bipolar value: -1...1
  tilt: 0
});

/**
 * Makes use of the data contained in `state`
 */
const use = () => {
  const { bounds, thing, tilt } = state;
  const context = Util.getDrawingContext();

  Util.textContent(`#info`, tilt);

  context.fillStyle = `hsl(220, 100%, 90%)`;
  context.fillRect(0, 0, bounds.width, bounds.height);

  Things.use(thing, context, bounds);
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
  // Automatically size canvas to viewport
  Dom.fullSizeCanvas(`#canvas`, onResized => {
    saveState({ bounds: onResized.bounds });
  });

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

