import { CanvasHelper } from '@ixfx/visual';
import { Points } from '@ixfx/geometry';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` }),
  // Scaling option determines smoothness (higher == smoother)
  averager: Points.averager(`moving-average-light`, { scaling: 30 }),
});

/**
 * @typedef {Readonly<{
 * raw:Points.Point
 * average:Points.Point
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  raw: Points.Empty,
  average: Points.Empty
});

function use() {
  const { canvas } = settings;
  const { average, raw } = state;
  const { ctx, width, height } = canvas;

  //ctx.clearRect(0, 0, width, height); // Completely clear

  // Fade out canvas
  ctx.fillStyle = `hsl(0 0% 100% / 20%)`;
  ctx.fillRect(0, 0, width, height);

  // Draw each point
  drawPoint(raw, 30, `silver`);
  drawPoint(average, 10, `black`);

}

function update() {

}

/**
 * Each point is drawn as a circle
 * @param {Points.Point} pt 
 * @param {number} radius
 * @param {string} dotColour
 */
const drawPoint = (pt, radius = 5, dotColour = `orange`) => {
  const { canvas } = settings;
  const { ctx } = canvas;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(pt.x, pt.y);

  // Fill a circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = dotColour;
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * PointerMove
 * @param {PointerEvent} event 
 */
function onPointerMove(event) {
  const { averager } = settings;
  const point = { x: event.x, y: event.y };
  const average = averager(point);
  saveState({
    raw: point,
    average
  });
}

function setup() {
  document.addEventListener(`pointermove`, onPointerMove);
  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
}
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}