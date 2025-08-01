/**
 * @typedef {object} Bounds
 * @property {number} width
 * @property {number} height
 * @property {{x:number,y:number}} center
 * @property {number} min
 * @property {number} max
 */


/**
 * Draw a dot at an absolute position
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {string} fillStyle 
 */
export function drawDot(ctx, x, y, radius, fillStyle = `black`) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

/**
 * Make `x` and `y` relative with respect to window dimensions
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}  
 */
export const relativePoint = (x, y) => {
  return {
    x: x / window.innerWidth,
    y: y / window.innerHeight
  };
};

/**
 * Make point absolute
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
export const absPoint = (x, y) => {
  return {
    x: x * window.innerWidth,
    y: y * window.innerHeight
  };
};