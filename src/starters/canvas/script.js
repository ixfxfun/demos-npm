import { CanvasHelper } from '@ixfx/visual';
import * as Draw from './drawing.js';

// Define settings - properties that don't change
const settings = Object.freeze({
  updateRateMs: 10,
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` })
});

/** 
 * @typedef {Readonly<{
 * randomValue:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  randomValue: 0
});

/**
 * This is called at a slower rate
 * than the animation loop. It's meant for
 * mutating state in some manner
 */
const update = () => {

  // Compute state
  let randomValue = Math.random();

  // Save it
  saveState({ randomValue });
};

/**
 * This is run at animation speed. It
 * should just draw based on whatever is in state
 * @returns 
 */
const draw = () => {
  const { randomValue } = state;

  // Get canvas
  const { canvas } = settings;

  // Get drawing context
  const { ctx } = canvas;
  const bounds = canvas.getRectangle();

  // Clear canvas
  Draw.clear(ctx, bounds);

  // TODO: drawing...
  Draw.circleFilled(ctx, { x: 0.2, y: 0.2, radius: 0.1 }, {
    fillStyle: `pink`,
    message: randomValue.toFixed((2))
  });
};


/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs } = settings;

  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

  // Animation loop
  const animationLoop = () => {
    draw();
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