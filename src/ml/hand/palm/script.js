// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from 'ixfx/dom.js';
import * as Numbers from "ixfx/numbers.js";
import { Triangles } from "ixfx/geometry.js";
import * as MpVision from '../../lib/client/index.js';
import * as Hands from '../hands.js';
import * as Things from './thing.js';
import { Flow } from "ixfx/bundle.js";

const settings = Object.freeze({
  // Scale calculated area of palm
  areaScaler: Numbers.scaler(0.0005, 0.003, 0, 1, undefined, true),

  thingCount: 150,
  updateRateMs: 1, // How quickly to call update()
  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`))
});


/**
 * @typedef {Readonly<{
 *  palmArea:number
 *  things:readonly Things.Thing[]
 * }>} State
 */

/** @type State */
let state = {
  palmArea: 0,
  things: []
};

/**
 * Runs periodically, computing something
 * new from latest pose data
 */
const update = () => {
  let { things, palmArea } = state;

  // Update each thing
  things = things.map(t => Things.update(t, state));

  // Save it
  saveState({ things: things });
};

/**
 * Uses state
 */
function use() {
  // Do something...
  const { palmArea, things } = state;

  for (const t of things) {
    Things.use(t);
  }

  // Debug
  settings.dataDisplay.update({ palmArea });
}

/**
 * Called with data from MediaPipe
 * @param {MpVision.HandLandmarkerResult} hands 
 */
const updateFromHands = (hands) => {
  if (!hands || hands.landmarks.length === 0) {
    // No data... do something special?
    saveState({ palmArea: 0 });
    return;
  }

  // Eg get data for first hand
  const hand = Hands.getHand(0, hands);
  const palmArea = calculatePalmArea(hand.worldLandmarks);

  saveState({ palmArea });
};

/**
 * Calculates area of palm. This can indicate up/down pivoting
 * @param {MpVision.Landmark[]} landmarks
 */
const calculatePalmArea = (landmarks) => {
  const { areaScaler } = settings;
  const palm = Hands.getPalmTriangle2d(landmarks);
  const area = Triangles.area(palm);
  return areaScaler(area);
};

/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, remote } = settings;

  remote.onData = onReceivedPoses;

  // Create some things
  const things = [...Flow.repeatSync(Things.create, { count: settings.thingCount })];
  saveState({ things: things });

  // Update at updateRateMs
  const updateLoop = () => {
    update();
    use();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

};
setup();

/**
 * Called when we have pose data via Remote.
 * Hand data is saved to state.
 * @param {*} packet 
 */
function onReceivedPoses(packet) {
  const { data } = packet;
  const handsData = /** @type MpVision.HandLandmarkerResult */(JSON.parse(data));

  if (Array.isArray(handsData)) {
    console.warn(`Unexpectedly getting an array of data. Is the sender set to 'face'?`);
    return;
  }

  if (!(`handedness` in handsData)) {
    console.warn(`Did not find 'handedness' property as expected. Is the sender set to 'hand'?`);
    return;
  }
  updateFromHands(handsData);
};

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
