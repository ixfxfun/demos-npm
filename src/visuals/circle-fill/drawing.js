import { Points, Circles, Polar } from '@ixfx/geometry';

const piPi = Math.PI * 2;

/**
 * Draws a point (in pixel coordinates)
 * @param {CanvasRenderingContext2D} context 
 * @param {Points.Point} position 
 */
export function point(context, position, fillStyle = `black`, size = 1) {
  context.fillStyle = fillStyle;
  context.beginPath();
  context.arc(position.x, position.y, size, 0, piPi);
  context.fill();
}
