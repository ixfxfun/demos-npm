import { resolveEl } from "@ixfx/dom.js";
import { Forces } from "@ixfx/modulation.js";
import { CanvasHelper } from "@ixfx/visual.js";
/**
 * @import {State, AgentState, WorldState} from "./types.js"
 */

/**
 * 
 * @returns {Forces.ForceFn<AgentState>}
 */
export function createConstrainForce() {
  return Forces.constrainWrap({
    width: window.innerWidth,
    height: window.innerHeight
  });
}


/**
 * Draw a circle
 * @param {CanvasHelper} canvas 
 * @param {{x:number, y:number}} circle
 * @param {string} fillStyle
 */
export const drawCircle = (canvas, circle, fillStyle) => {
  const { ctx } = canvas;
  const circlePosAbs = canvas.toAbsolute(circle);
  const radius = 5;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(circlePosAbs.x, circlePosAbs.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

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
 * Clears canvas
 * @param {CanvasHelper} canvas 
 */
export const clear = (canvas) => {
  const { width, height, ctx } = canvas;

  // Make background transparent
  ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  //ctx.fillStyle = `hsl(200, 100%, 50%, 0.1%)`;
  //ctx.fillRect(0, 0, width, height);
};