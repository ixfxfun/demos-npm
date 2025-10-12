import * as Dom from '@ixfx/dom';
import { CanvasHelper } from '@ixfx/visual';
import { continuously } from '@ixfx/flow';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Util from './util.js';
import { Normalise } from '@ixfx/numbers';

const settings = Object.freeze({
  updateRateMs: 100,
  posesConsumer: new PosesConsumer({
    maxAgeMs: 1000,
    sampleLimit: 25,
    storeIntermediate: true
  }),
  noseSpeedScaler: Normalise.stream(),
  // Debug display of data can be handy
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  // Automatically sizes canvas for us
  canvasHelper: new CanvasHelper(`canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {{

 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
});

function update() {
  const { posesConsumer, dataDisplay, noseSpeedScaler } = settings;

  // PosesTracker: tracks all poses
  const poses = posesConsumer.poses;

  let total = 0;
  let count = 0;
  for (const pose of poses.get()) {
    // Eg. The nose
    const nose = pose.landmark(`nose`);
    if (!nose) continue; // Just in case there's no nose (!?)

    // Do something with speed of nose?
    const speed = nose.speedFromStart();
    total += speed;
    count++;
  }
  const average = total / count;
  if (Number.isNaN(average)) return;

  const normalised = noseSpeedScaler(average);
  // Save state
  saveState({ noseSpeed: normalised });

  // Show state
  dataDisplay.update(state);

}

function use() {
  const { canvasHelper, posesConsumer } = settings;
  const poses = posesConsumer.poses;
  const { ctx } = canvasHelper;

  canvasHelper.clear();

  for (const pose of poses.get()) {

    for (const landmark of pose.landmarks()) {
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