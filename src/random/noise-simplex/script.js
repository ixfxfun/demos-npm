import { Grids } from '@ixfx/geometry.js';
import * as Random from '@ixfx/random.js';
import { CanvasHelper } from '@ixfx/visual.js';
import * as Util from './util.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` }),
  piPi: Math.PI * 2,
  size: 200, // how many rows & cols
  noise: await Random.noise2d(`simplex`)
});

let state = Object.freeze({
  /** @type Grids.GridVisual */
  grid: { rows: settings.size, cols: settings.size, size: 10 },
  /** @type Record<string,number> */
  noise: {}
});

/**
 * Unlike most sketches, we call `use` just once, since there's no interaction
 */
const use = () => {
  const { canvas } = settings;
  const { grid, noise } = state;
  const { ctx } = canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const cell of Grids.By.cells(grid)) {
    // Get bounds for cell, as well as current mod value
    const rect = Grids.rectangleForCell(grid, cell);
    const cellKey = Util.keyForCell(cell);

    // ...pass on over to drawCell
    Util.drawCell(noise[cellKey], rect, ctx);
  }
};

/**
 * When the window resizes, recompute how big the grid cells should
 * be rendered
 */
function onCanvasResize() {
  const { size, canvas } = settings;
  const { width, height } = canvas;

  // Set grid cell size to be proportional to size of viewport
  const maxDimension = Math.max(width, height);

  saveState({
    grid: {
      rows: size,
      cols: size,
      size: Math.ceil(maxDimension / Math.max(size, size))
    }
  });

}

function setup() {
  // Handle when the canvas resizes
  settings.canvas.addEventListener(`resize`, () => onCanvasResize());

  // Pre-compute noise values for grid
  const noiseValues = /** @type Record<String,number>*/({});
  for (const cell of Grids.By.cells(state.grid)) {
    noiseValues[Util.keyForCell(cell)] = settings.noise(cell.x, cell.y);
  }
  saveState({ noise: noiseValues });

  // Size the grid based on current viewport
  onCanvasResize();

  use();
}
setup();

/**
 * Save state
 * @param {Partial<typeof state>} newPartialState 
 */
function saveState(newPartialState) {
  state = Object.freeze({
    ...state,
    ...newPartialState
  });
}