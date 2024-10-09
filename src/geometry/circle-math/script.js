import { CanvasHelper } from '../../ixfx/dom.js';
import { Circles } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both`, coordinateScale: `min` }),
  radius: 0.3,
  ringThickness: 40
});

/** 
 * @typedef {Readonly<{
 *  pointer: {x:number,y:number}
 *  nearest: {x:number,y:number}|undefined
 *  circle: {x:number,y:number,radius:number}
 * }>} State
 **/

/** @type {State} */
let state = Object.freeze({
  pointer: { x: 0, y: 0 },            // Location of pointer, in viewport-coords
  circle: { x: 0, y: 0, radius: 0 },  // Location & size of main circle, in viewport-coords
  nearest: undefined                  // Nearest point on perimeter
});


// Update state of world
const update = () => {
  const { pointer } = state;

  // Compute absolute size & position of circle
  const mid = settings.canvas.toAbsoluteFixed({ x: 0.5, y: 0.5 });
  const circle = {
    ...mid,
    radius: settings.radius * Math.min(window.innerHeight, window.innerWidth)
  };

  let nearest = mid;
  if (pointer) {
    // Get nearest point on perimeter
    nearest = Circles.nearest(circle, pointer);
  }
  saveState({ nearest, circle });
};

/**
 * Draw a filled dot
 * @param {CanvasHelper} canvas 
 * @param {Circles.CirclePositioned} circle
 * @param {string} fillStyle
 */
const drawDot = (canvas, circle, fillStyle = ``) => {
  const { ctx } = canvas;

  // If radius is less than 1, assume it's a relative value
  // that needs converting
  const radius = circle.radius < 1 ? circle.radius * canvas.dimensionMin : circle.radius;

  ctx.save();
  ctx.translate(circle.x, circle.y);

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.closePath();

  ctx.restore();
};


/**
 * Draw a ring
 * @param {CanvasHelper} canvas 
 * @param {Circles.CirclePositioned} circle
 * @param {string} strokeStyle
 * @param {number} lineWidth
 */
const drawRing = (canvas, circle, strokeStyle, lineWidth) => {
  const { ctx } = canvas;
  const radius = circle.radius < 1 ? circle.radius * canvas.dimensionMin : circle.radius;

  ctx.save();
  ctx.translate(circle.x, circle.y);

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.closePath();
  ctx.restore();
};

const use = () => {
  const { canvas, ringThickness } = settings;
  const { ctx, width, height } = canvas;
  const { nearest, circle } = state;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw the silver ring
  drawRing(canvas, circle, `silver`, ringThickness);

  // Draw filled yellow dot at pointer position
  drawDot(canvas, { ...state.pointer, radius: ringThickness / 2 }, `yellow`);

  // Draw filled black dot for closest point on circle
  if (nearest) {
    drawDot(canvas, { ...nearest, radius: ringThickness / 2.2 }, `white`);
  }
};

function setup() {
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(`pointermove`, event => {
    saveState({
      pointer: { x: event.x, y: event.y }
    });
  });
};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}

