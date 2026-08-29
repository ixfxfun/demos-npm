import * as Dom from '@ixfx/dom.js';
import { CanvasHelper } from '@ixfx/visual.js';
import { Normalise } from '@ixfx/numbers.js';
import { continuously } from '@ixfx/flow.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';

const settings = Object.freeze({
  updateRateMs: 100,
  posesConsumer: new PosesConsumer({
    maxAgeMs: 1000,
    sampleLimit: 25,
    storeIntermediate: true
  }),
  targetSpeedScaler: Normalise.stream(),
  // Debug display of data can be handy
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {Readonly<{
 * targetSpeed:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  targetSpeed: 0
});

function update() {
  const { posesConsumer, dataDisplay, targetSpeedScaler } = settings;

  // PosesTracker: tracks all poses
  const poses = posesConsumer.poses;

  let total = 0;
  let count = 0;
  for (const pose of poses.get()) {
    // Eg. The nose
    const target = pose.landmark(`nose`);
    if (!target) continue; // Just in case there's no nose (!?)

    // See how much landmark has moved over
    // short number of points we record for it
    const distance = target.lengthAverage(true);
    total += distance;
    count++;
  }
  const average = total / count;
  if (Number.isNaN(average)) return;

  const normalised = targetSpeedScaler(average);

  // Save state
  saveState({ targetSpeed: normalised });

  // Show state
  dataDisplay.update(state);
}

function use() {
  const { canvasHelper, posesConsumer } = settings;
  const poses = posesConsumer.poses;
  const { ctx } = canvasHelper;

  // Clear the canvas
  canvasHelper.clear();

  // For all poses...
  for (const pose of poses.get()) {
    // ...and all landmarks
    for (const landmark of pose.landmarks()) {
      // Get stored history of points for this landmark
      const history = landmark.values;

      let age = 0.1;
      let ageIncrement = 0.9 / history.length;

      // Loop over all the stored points
      for (const v of history) {
        // Compute a colour so older points fade out
        const hsl = `hsl(${pose.hue}deg 50% 50% / ${age})`;

        const p = Util.absolutePointFixed(v);

        // Scale size of dot based on age oo
        Util.drawDot(ctx, p, 5 * age, hsl);

        age += ageIncrement;
      }
    }
  }
}


function setup() {
  // Draw loop
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