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
 * @param {{x:number,y:number}} point
 * @param {number} radius 
 * @param {string} fillStyle 
 */
export function drawDot(ctx, point, radius, fillStyle = `black`) {
  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

export const absolutePointFixed = (point, scaleBy = Number.NaN) => {
  if (Number.isNaN(scaleBy)) {
    scaleBy = Math.min(window.innerHeight, window.innerWidth);
  }
  return {
    x: point.x * scaleBy,
    y: point.y * scaleBy
  };
};


/**
 * Make `x` and `y` relative with respect to window dimensions
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}  
 */
export const relativeXy = (x, y) => {
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