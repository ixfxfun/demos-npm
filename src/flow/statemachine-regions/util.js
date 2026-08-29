import { resolveEl } from "@ixfx/dom.js";
import { Circles } from "@ixfx/geometry.js";
import { CanvasHelper } from "@ixfx/visual.js";

/**
 * Sets the 'textContent' property for an element
 * ```js
 * setText(`#someId`, `hello`);   // Set text of element with id 'someId'
 * setText(document.body, `hello`); // Set text of element we already have a reference to
 * ```
 * @param {string|HTMLElement} domQueryOrEl Dom query or element
 * @param {string} text Text to set
 */
export function setText(domQueryOrEl, text) {
  const element = resolveEl(domQueryOrEl);
  if (element && element.textContent !== text) {
    element.textContent = text;
  }
}

/**
 * Draw a circle
 * @param {CanvasHelper} canvas
 * @param {Circles.CirclePositioned} circle
 * @param {string} fillStyle
 * @param {string} strokeStyle
 */
export const drawCircle = (canvas, circle, fillStyle, strokeStyle) => {
  const { ctx } = canvas;

  // Get absolute point
  const circlePos = canvas.toAbsolute(circle);

  // Translate to middle of circle
  ctx.save();
  ctx.translate(circlePos.x, circlePos.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, circle.radius * window.innerWidth, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.closePath();

  // Unwind translation
  ctx.restore();
};