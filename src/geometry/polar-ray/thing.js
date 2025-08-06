import { Points, Polar, Lines, radiansSum } from '@ixfx/geometry';
import * as Util from './util.js';
import { CanvasHelper, Colour } from '@ixfx/visual';
import { Random } from 'ixfx';
import { getCssVariable } from '@ixfx/dom';

const piPi = Math.PI * 2;

/**
 * @typedef {Readonly<Polar.PolarRay & {
 * colour: string
 * line: Lines.Line
 * }>} Thing
 */

/**
 * Updates the state of a 'thing'
 * @param {Thing} thing 
 * @param {import('./script.js').State} sketchState
 */
export function update(thing, sketchState) {
  let { length, offset } = thing;
  const { scaleBy, angleModulation, offsetModulation, originAbsolute } = sketchState;

  // Add angle rotation based on the current
  const angleRadian = radiansSum(thing.angleRadian, piPi * angleModulation);

  // Calculate line using absolute coordintes
  const line = Polar.Ray.toCartesian({
    angleRadian,
    length: length * scaleBy,
    offset: (offset + offsetModulation) * scaleBy,
  }, originAbsolute);

  return {
    ...thing,
    line
  };
}

/**
 * Updates a HTML element's position based on a polar coordinate
 * @param {Thing} thing 
 * @param {import('./script.js').State} sketchState
 * @param {CanvasHelper} canvas
 */
export function use(canvas, thing, sketchState) {
  const { ctx } = canvas;
  const { line, colour } = thing;
  const { a, b } = line;

  // Make drawing a bit funky
  ctx.globalCompositeOperation = `hard-light`;

  // Draw a single line
  ctx.strokeStyle = colour;
  ctx.lineWidth = 20;
  ctx.lineCap = `round`;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

/**
 * Creates a thing
 * @param {number} angleRadian 
 * @param {number} index 
 * @returns {Thing}
 */
export function create(angleRadian, index) {
  /** @type Thing */
  const thing = {
    length: Random.float(0.2),
    angleRadian,
    offset: 0,
    origin: { x: 0.5, y: 0.5 },
    colour: Colour.goldenAngleColour(index),
    line: Lines.Empty
  };
  return thing;
}