import { Points } from '@ixfx/geometry.js';
import { DataDisplay } from '@ixfx/dom.js';
import { PosesConsumer, Poses } from "../util/Poses.js";
import * as Things from './thing.js';
import { Normalise } from '@ixfx/numbers.js';

const settings = Object.freeze({
  distanceNormalise: Normalise.stream(),
  // How often to re-compute and visually update
  updateSpeedMs: 200,
  // Helps us listen for pose data
  poses: new PosesConsumer({ maxAgeMs: 1000 }).poses,

  // Overlay to show data for debugging
  dataDisplay: new DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/** 
 * @typedef {Readonly<{
 *  thing: Things.Thing
 *  alive: boolean
 *  poseA: Poses.PoseTracker|undefined
 *  poseB: Poses.PoseTracker|undefined
 *  distance: number
 * }>} State
 */

/** @type {State} */
let state = Object.freeze({
  thing: Things.create(),
  alive: false,
  distance: Number.NaN,
  poseA: undefined,
  poseB: undefined
});

function use() {
  const { thing } = state;

  // Visually update world (Not needed in this sketch)

  if (thing) {
    Things.use(thing);
  }
}

function update() {
  const { distanceNormalise } = settings;
  let { thing, poseA, poseB, distance } = state;

  const alive = poseA !== undefined && poseB !== undefined;
  if (alive) {
    // Get whichever hand is closest to the other for each body
    const poseAHand = poseA.getRightmost(`left_wrist`, `right_wrist`);
    const poseBHand = poseB.getLeftmost(`left_wrist`, `right_wrist`);
    distance = Points.distance2d(poseAHand, poseBHand);

    // Normalise on 0..1 scale
    distance = distanceNormalise(distance);
  } else {
    distance = Number.NaN;
  }

  // Save state of world
  saveState({ alive, distance });

  // Update thing
  thing = Things.update(thing, state);

  // Save updated things into state
  saveState({ thing });

  settings.dataDisplay.update({ distance, pressure: thing.pressure });
}

/**
 * Called when a pose is added or removed
 */
function posesHaveChanged() {
  const { poses } = settings;

  if (poses.size < 2) {
    // Not enough poses :/
    saveState({ poseA: undefined, poseB: undefined });
    return;
  }

  // Sort poses left-to-right
  const sorted = [ ...poses.getByHorizontal() ];

  const first = sorted[0];
  const next = sorted[1];

  // Use the leftmost pose, and the one next to it
  saveState({
    poseA: first,
    poseB: next
  });
}

function setup() {
  const { poses } = settings;
  poses.addEventListener(`added`, posesHaveChanged);
  poses.addEventListener(`expired`, posesHaveChanged);

  setInterval(() => {
    update();
    use();
  }, settings.updateSpeedMs);
}

setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
