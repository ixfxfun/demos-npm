import { CanvasHelper } from '@ixfx/visual.js';
import * as Draw from './drawing.js';
import { PointTracker } from '@ixfx/geometry.js';

// Define settings - properties that don't change
const settings = Object.freeze({
  updateRateMs: 10,
  hueOffsetPerPoint: 2,
  hueIncrement: 2,
  // sampleLimit determines length of tail
  tracker: new PointTracker({
    sampleLimit: 100
  }),
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {Readonly<{
 * hueOffset: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  hueOffset: 0
});

const update = () => {
  const { hueIncrement, tracker } = settings;
  let { hueOffset } = state;

  hueOffset += hueIncrement;
  if (hueOffset >= 360) hueOffset = hueOffset - 360;

  saveState({ hueOffset });
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const use = () => {
  const { tracker, hueOffsetPerPoint } = settings;
  const { hueOffset } = state;

  // Get canvas
  const { canvas } = settings;

  // Get drawing context
  const { ctx } = canvas;
  const bounds = canvas.getRectangle();

  // Clear canvas
  Draw.clear(ctx, bounds);

  let h = hueOffset;
  for (const v of tracker.values) {
    const hsl = `hsl(${h}deg 50% 50%)`;
    Draw.circleFilledAbsolute(ctx, { ...v, radius: 10 }, {
      fillStyle: hsl
    });
    h += hueOffsetPerPoint;
  }
};


/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, tracker } = settings;

  document.addEventListener(`pointermove`, event => {
    tracker.seen({ x: event.x, y: event.y });
  });

  // State updating loop
  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

  // Animation loop
  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();

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
}