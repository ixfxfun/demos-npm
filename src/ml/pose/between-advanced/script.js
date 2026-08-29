import { DataDisplay } from '@ixfx/dom.js';
import * as Arrays from '@ixfx/arrays.js';
import { PosesConsumer } from "../util/Poses.js";
import * as Things from './thing.js';

const settings = Object.freeze({
  // How often to re-compute and visually update
  updateSpeedMs: 200,
  // Helps us listen for pose data
  poses: new PosesConsumer({ maxAgeMs: 1000 }).poses,
  dataDisplay: new DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/** 
 * @typedef {Readonly<{
 *  things: Things.Thing[]
 * }>} State
 */

/** @type {State} */
let state = Object.freeze({
  things: []
});

function use() {
  const { things } = state;
  // Visually update world (Not needed in this sketch)

  // Visually update all the things
  things.forEach(t => Things.use(t));
}

function update() {
  let { things } = state;

  // Update all the things, collecting into an array
  things = things.map(t => Things.update(t, state));

  // Save updated things into state
  saveState({ things });

  // Debug display the 'distance' prop of each thing
  const debug = things.map(thing => ({ distance: thing.distance }));
  settings.dataDisplay.update(debug);
}


/**
 * Called when a pose is added or removed
 */
function posesHaveChanged() {
  const { poses } = settings;

  // Clean up existing things - deleting those where poses are missing
  let things = cleanUpThings();

  // Access poses left-to-right
  const sorted = [ ...poses.getByHorizontal() ];

  // If there's only one pose, can't do much more
  if (sorted.length < 2) return;

  // Combine them in pairs
  const pairedPoses = [ ...Arrays.pairwise(sorted) ];

  // Create things for pairs
  for (const pair of pairedPoses) {
    // If we already have a thing for this pair, skip it
    if (pairExists(pair[0], pair[1])) continue;

    // Create a thing for this pair and add it to the state
    const t = Things.create(pair[0], pair[1]);
    addThing(t);
  }
}

function pairExists(poseA, poseB) {
  for (const t of state.things) {
    if (Things.usingPose(t, poseA) && Things.usingPose(t, poseB)) {
      return true;
    }
  }
  return false;
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

/**
 * Adds a thing to the state, making sure it isn't in there alreayd
 * @param {Things.Thing} thingToAdd 
 * @returns 
 */
function addThing(thingToAdd) {
  let { things } = state;
  for (const t of things) {
    if (t.id === thingToAdd.id) return; // Already added
  }
  saveState({ things: [ ...things, thingToAdd ] });
  return things;
}

/**
 * Goes through current 'things', looking for those where the pose is no longer
 * valid. It will delete things where either or both poses are missing
 * @returns 
 */
function cleanUpThings() {
  const { poses } = settings;
  let { things } = state;
  let finalThings = [];
  let needCleanup = [];

  for (const t of things) {
    const poseAValid = t.poseA === undefined ? false : poses.hasPoseGuid(t.poseA.guid);
    const poseBValid = t.poseB === undefined ? false : poses.hasPoseGuid(t.poseB.guid);

    // All fine, both poses for this thing are still valid
    if (poseAValid && poseBValid) {
      finalThings.push(t);
      continue;
    }
    needCleanup.push(t);
  }

  saveState({ things: finalThings });
  needCleanup.forEach(t => Things.remove(t));
  return finalThings;
}

// ---- These functions not currently used, but might be helpful ----

/**
 * Update a given thing by its id. The
 * updated thing is returned, or _undefined_
 * if it wasn't found.
 * @param {string} thingId 
 * @param {Partial<Things.Thing>} updatedThing 
 * @returns {Things.Thing|undefined}
 */
function updateThingInState(thingId, updatedThing) {
  let completedThing;

  const things = state.things.map(thing => {
    // Is it the thing we want to change?
    if (thing.id !== thingId) return thing; // nup

    // Return mutated thing
    completedThing = {
      ...thing,
      ...updatedThing
    };
    return completedThing;
  });

  // Save changed things
  saveState({ things });
  return completedThing;
}

/**
 * Deletes things from state, and does clean up
 * @param {Things.Thing[]} thingsToDelete 
 */
function deleteThingsFromState(thingsToDelete) {
  let remainingThings = Arrays.without(state.things, thingsToDelete, (a, b) => a.id === b.id);
  thingsToDelete.forEach(thing => Things.remove(thing));
  saveState({ things: remainingThings });
  return remainingThings;
}
