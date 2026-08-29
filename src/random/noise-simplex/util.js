
/**
 * Returns a string 'key' for a cell.
 * eg, {x:3, y:4} yields `3-4`
 * @param {import('@ixfx/geometry.js').GridCell} cell 
 * @returns 
 */
export const keyForCell = (cell) => cell.x + `-` + cell.y;


/** 
 * Draws a cell, shading it based on `value`
 * @param {{x:number, y:number, width:number, height:number}} rect 
 * @param {CanvasRenderingContext2D} context
 * @param {number} value
 */
export const drawCell = (value, rect, context) => {
  let { x, y, width, height } = rect;
  context.fillStyle = `oklch(${value} 0.2 10deg)`;
  context.fillRect(x, y, width, height);
};