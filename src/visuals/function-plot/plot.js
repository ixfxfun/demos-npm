import { CanvasHelper } from 'ixfx/dom.js';
import { scale, clamp } from 'ixfx/numbers.js';

const settings = Object.freeze({
  // Default width for plot
  lineWidth: 10,
  // Default style for plot
  strokeStyle: `pink`,
  // Vertical space in pixels from top and bottom of screen
  verticalPadding: 50,
  canvas: new CanvasHelper(`#canvas`, { fill: `viewport` })
});

export const newFrame = () => {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Clear canvas
  clear();

  // For added flavour, change compositing mode when drawing functions
  // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  //ctx.globalCompositeOperation = `hard-light`;
  //ctx.globalCompositeOperation = `overlay`;
  ctx.globalCompositeOperation = `soft-light`;
};

/**
 * Plots a function that yields values -1 to 1.
 * 
 * Options:
 * * strokeStyle: string for canvas line drawing
 * * lineWidth: number for canvas line drawing
 * * timeDivider: overrides settings.timeDivider
 * @param {(x:number) => number} fnc Function to plot
 * @param {{strokeStyle?:string, lineWidth?:number}} options Options for this plot 
 */
export const plot = (fnc, options = {}) => {
  const { verticalPadding, canvas } = settings;
  const { ctx } = canvas;

  const w = canvas.width;
  const h = canvas.height - (verticalPadding * 2);

  // Use 100 points divided across width of screen
  const sampleWidth = Math.min(1, Math.floor(w / 100));
  for (let x = 0; x <= w; x += sampleWidth) {
    const xValue = x / w;
    try {
      const v = clamp(fnc(xValue), -1, 1);
      const y = scale(v, -1, 1, 0, h) + verticalPadding;

      if (x === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Apply visual settings
  ctx.strokeStyle = options.strokeStyle ?? settings.strokeStyle;
  ctx.lineWidth = options.lineWidth ?? settings.lineWidth;
  ctx.stroke();
};

/**
 * Clear canvas
 */
const clear = () => {
  const { canvas } = settings;
  const { width, height, ctx } = canvas;

  // Make background transparent
  //ctx.clearRect(0, 0, width, height);

  // Clear with a colour
  //ctx.fillStyle = `orange`;
  //ctx.fillRect(0, 0, width, height);

  // Fade out previously painted pixels
  ctx.globalCompositeOperation = `source-over`;
  ctx.fillStyle = `hsla(200, 100%, 10%, 0.1)`;
  ctx.fillRect(0, 0, width, height);
};