
import { everyNth, throttle } from "@ixfx/flow.js";
import { Grids } from "@ixfx/geometry.js";
import { interpolate } from "@ixfx/numbers.js";
import { noise2d } from "@ixfx/random.js";
import { Convolve2d } from "@ixfx/visual.js";


/**
 * @import {State, AgentState, AgentNose,WorldState} from "./types.js"
 * @import {Point, GridVisual} from "@ixfx/geometry.js"
 * @import { CanvasHelper} from "@ixfx/visual.js"
 */

const settings = Object.freeze({
  // Desired cell size
  cellSize: 10,
  // Hue in angle degrees
  hue: 9,
  // Only run diffusion every n frames
  diffuseThrottle: everyNth(20)
});

/**
 * @param {WorldState} world
 * @param {Point} screenCoord 
 * @param {AgentNose} nose
 * @returns {{cell:Grids.GridCell|undefined,value:number,nose:AgentNose}}
 */
export function scentAt(world, screenCoord, nose) {
  const cell = Grids.cellAtPoint(world.grid, screenCoord);
  if (!cell) return { cell: undefined, value: 0, nose };
  let value = world.scent[cell.y][cell.x];
  return { cell, value, nose };
}

/**
 * Returns the cell given a screen coord
 * @param {WorldState} world
 * @param {Point} screenCoord 
 * @returns 
 */
export function cellAtScreenCoord(world, screenCoord) {
  return Grids.cellAtPoint(world.grid, screenCoord);
}

/**
 * Mutates the 'scent' array, setting the value at a location
 * @param {WorldState} world 
 * @param {Grids.GridCell} cell 
 * @param {number} value 
 */
export function increaseScentAtCell(world, cell, value) {
  world.scent[cell.y][cell.x] = world.scent[cell.y][cell.x] + value;
  return world;
}

/**
 * Creates a grid based on viewport size and desired cell size in pixels
 * @param {number} size 
 */
export function computeGrid(size) {
  const cols = Math.ceil(window.innerWidth / size);
  const rows = Math.ceil(window.innerHeight / size);
  return { rows, cols, size };
}

/**
 * Diffuses the scent by performing convolution
 * @param {WorldState} world 
 */
export function diffuse(world) {
  const scent = Grids.Array2d.wrapMutable(world.scent);
  Convolve2d.convolveMutateGrid(
    Convolve2d.gaussianBlur3Kernel, // Use the Gaussian blur kernel
    scent,  // Provide grid values in an accessible form
    Convolve2d.averageNumberReducer,
    (conv, original) => {
      return interpolate(0.1, original, conv);

    }
  );
  return scent.array;
}

/**
 * Initialise the world
 * @returns {Promise<WorldState>}
 */
export async function create() {
  const grid = computeGrid(settings.cellSize);
  console.log(grid);
  const n = await noise2d(`simplex`);

  // Create an array for grid
  const scent = Grids.Array2d.createArray(0, grid);
  for (const cell of Grids.By.cells(grid)) {
    scent[cell.y][cell.x] = n(cell.x, cell.y);
  }

  return {
    scent,
    grid
  };
}

/**
 * Updates state of world
 * @param {WorldState} world 
 * @param {State} state 
 */
export const update = (world, state) => {
  if (settings.diffuseThrottle(undefined)) {
    let scent = diffuse(world);
    return {
      ...world,
      scent
    };
  } else {
    return world;
  }
};

/**
 * Draw the world
 * @param {CanvasRenderingContext2D} ctx 
 * @param {WorldState} world
 */
export const draw = (ctx, world) => {
  const { hue } = settings;
  const { scent, grid } = world;
  const cellSize = grid.size;
  for (const cell of Grids.By.cells(grid)) {
    // Get visual bounds for cell
    const rect = Grids.rectangleForCell(grid, cell);
    // Get 'scent' value for cell
    const v = scent[cell.y][cell.x] ?? 0;

    ctx.save();
    ctx.translate(rect.x, rect.y);
    ctx.fillStyle = `oklch(${v * 100}% 0.1 ${hue}deg)`;
    ctx.fillRect(0, 0, cellSize, cellSize);
    ctx.strokeStyle = `oklch(1 0.2 0deg / 0.1)`;
    ctx.strokeRect(0, 0, cellSize, cellSize);
    ctx.restore();
  }
};

/**
 * Fills a cell (useful for debugging)
 * @param {CanvasRenderingContext2D} ctx
 * @param {Grids.GridCell} cell 
 * @param {WorldState} world 
 * @param {string} fillStyle 
 */
export function drawCell(ctx, cell, world, fillStyle = `white`) {
  const { grid } = world;
  const rect = Grids.rectangleForCell(grid, cell);
  ctx.fillStyle = fillStyle;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}