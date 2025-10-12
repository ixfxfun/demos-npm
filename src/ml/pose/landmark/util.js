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

/**
 * Returns a point in absolute coordinates
 * @param {{x:number,y:number}} point Point to scale
 * @param {number} [scaleBy] Amount to scale by, by default uses min viewport dimension
 * @returns
 */
export const absolutePointFixed = (point, scaleBy = Number.NaN) => {
  if (Number.isNaN(scaleBy)) {
    scaleBy = Math.min(window.innerHeight, window.innerWidth);
  }
  return {
    x: point.x * scaleBy,
    y: point.y * scaleBy
  };
};
