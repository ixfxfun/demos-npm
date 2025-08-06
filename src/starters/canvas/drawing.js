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
  const absolutePoint = Points.multiplyScalar(circle, scaleBy);

  // Translate so 0,0 is the center of circle
  ctx.save();
  ctx.translate(absolutePoint.x, absolutePoint.y);

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
 * Clears canvas
 * @param {CanvasRenderingContext2D} ctx 
 * @param {import('@ixfx/geometry.js').Rect} bounds
 */
export function clear(ctx, bounds) {

  // Make background transparent
  ctx.clearRect(0, 0, bounds.width, bounds.height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
}