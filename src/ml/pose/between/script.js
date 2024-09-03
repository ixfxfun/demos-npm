import { Arrays } from 'ixfx/data.js';
import { Points } from 'ixfx/geometry.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Things from './thing.js';

const pc = new PosesConsumer({ maxAgeMs: 1000 });

const settings = Object.freeze({
  // How often to update the Things
  thingUpdateSpeedMs: 15,
  // How often to update main state
  updateSpeedMs: 200,
  poses: pc.poses
});

/** 
 * @typedef {Readonly<{
 *  things:Things.Thing[]
 *  middles:Array<{id:string,position:Points.Point}>
 * }>} State
 */

/** @type {State} */
let state = Object.freeze({
  things: [],
  middles: []
});

const use = () => {};

const update = () => {
  const { poses } = settings;

  // Calculate middle of each pose
  const middles = [];
  for (const p of poses.get()) {
    const middle = p.middle;
    middles.push({ id: p.guid, position: middle });
  }
  saveState({ middles });
};

/**
 * Called when a new pose is detected
 * @param {*} event 
 */
const onPoseAdded = (event) => {
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);

  // Create a thing for this pose
  const x = poseTracker.middle.x;
  const thingForPose = Things.create(poseTracker.guid, x);

  // Add it
  saveState({ things: [...state.things, thingForPose] });
};

/**
 * Called when a pose is no longer being tracked
 * @param {*} event 
 */
const onPoseExpired = (event) => {
  const { poses } = settings;
  const { things } = state;
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);

  // Synchronise list of things with current poses

  // Get list of current pose guids
  const existing = new Set(poses.getGuids());

  // Split the current list into dead/alive using ixfx Arrays.filterAB
  const [dead, alive] = Arrays.filterAB(things, t => !existing.has(t.id));

  // Remove the dead thigns
  for (const d of dead) {
    Things.remove(d);
  }

  // Alive things are our new list of things
  saveState({ things: alive });
};

/**
 * Get a Thing for a given guid, or _undefined_ if not found
 * @param {string} guid 
 * @returns 
 */
const getThing = (guid) => state.things.find(t => t.id === guid);

function setup() {
  const { poses } = settings;
  poses.addEventListener(`added`, onPoseAdded);
  poses.addEventListener(`expired`, onPoseExpired);

  // Update things
  setInterval(() => {
    let { things } = state;

    // Update all the things
    things = things.map(t => {
      // Get associated tracker for this thing
      const tracker = poses.getByGuid(t.id);
      if (tracker === undefined) return t; // Just in case

      // Update the thing
      return Things.update(t, state, tracker);
    });

    // Save updated things into state
    saveState({ things });

    // Visually update based on new state
    for (const thing of things) {
      Things.use(thing);
    }
  }, settings.thingUpdateSpeedMs);

  // Update state of sketch
  setInterval(() => {
    update();
  }, settings.updateSpeedMs);

  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();
};


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
 * Update a given thing by its id. The
 * updated thing is returned,  or _undefined_
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