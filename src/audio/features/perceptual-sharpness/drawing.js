import { Points } from '@ixfx/geometry';

/**
 * @typedef {{
 * fillStyle: string
 * message: string
 * textFillStyle: string
 * }} CirleDrawingOptions
 */

/**
 * Draws a filled circle with optional text.
 * 
 * Uses relative values for size and position.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x:number, y:number, radius:number}} circle
 * @param {Partial<CirleDrawingOptions>} options 
 */
export function circleFilled(ctx, circle, options = {}) {
  // Default options
  const fillStyle = options.fillStyle ?? `black`;
  const message = options.message ?? ``;
  const textFillStyle = options.textFillStyle ?? `white`;

  const scaleBy = Math.min(window.innerWidth, window.innerHeight);

  // Convert relative radius based on canvas size
  const radius = circle.radius * scaleBy / 2;

  // Convert x,y to absolute point
  const point = absolutePoint(circle);

  // Translate so 0,0 is the center of circle
  ctx.save();
  ctx.translate(point.x, point.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  if (message.length > 0) {
    ctx.fillStyle = textFillStyle;
    ctx.textAlign = `center`;
    ctx.fillText(message, 0, 0);
  }
  ctx.restore();
}


/**
 * Make `x` and `y` absolute with respect to window dimensions
 * @param {import('@ixfx/geometry.js').Point} point
 * @returns {import('@ixfx/geometry.js').Point}  
 */
export const absolutePoint = (point) => {
  return {
    x: point.x * window.innerWidth,
    y: point.y * window.innerHeight
  };
};

/**
 * Make `x` and `y` absolute with respect to window dimensions
 * @param {import('@ixfx/geometry.js').Rect} rect
 * @returns {import('@ixfx/geometry.js').Rect}  
 */
export const absoluteRect = (rect) => {
  return {
    width: rect.width * Math.min(window.innerWidth, window.innerHeight),
    height: rect.height * Math.min(window.innerHeight, window.innerWidth)
  };
};

/**
 * Make `x` and `y` absolute with respect to window dimensions
 * @param {import('@ixfx/geometry.js').Point} point
 * @returns {import('@ixfx/geometry.js').Point}  
 */
export const relativePoint = (point) => {
  return {
    x: point.x / window.innerWidth,
    y: point.y / window.innerHeight
  };
};
