import { Trackers, Numbers } from 'ixfx/bundle.js';
import { CanvasHelper } from 'ixfx/dom.js';
import { Points, radianToDegree } from 'ixfx/geometry.js';
import { repeatSync } from 'ixfx/flow.js';
import * as Util from './util.js';
import * as Things from './thing.js';
import { NumberTracker } from 'ixfx/trackers.js';

// Define settings
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` })
});

/**
 * @typedef {Readonly<{
 * pointA: import('ixfx/geometry.js').Point
 * pointB: import('ixfx/geometry.js').Point
 * things: ReadonlyArray<Things.Thing>
 * distance:number
 * distanceAvg: NumberTracker
 * distanceDiff: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  pointA: {
    y: 0.5,
    x: 0.5
  },
  pointB: {
    x: 0.8,
    y: 0.5
  },
  things: [...repeatSync(() => Things.create(), { count: 40 })],
  distance: 0,
  distanceAvg: Trackers.number({
    id: `distance`,
    storeIntermediate: true,
    sampleLimit: 200
  }),
  distanceDiff: 0
});


const update = () => {
  const { pointA, pointB, distanceAvg } = state;
  const distance = Points.distance(pointA, pointB);
  const angle = Points.angleRadian(pointA, pointB);
  const angleDegrees = radianToDegree(angle);

  distanceAvg.seen(distance);

  const averageDistance = distanceAvg.avg;
  const distanceDiff = distance - averageDistance;

  saveState({
    distance, distanceDiff
  });

  const things = state.things.map(t => Things.update(t, state));
  saveState({ things });

  setText(`debug`, `
    distance: ${distance.toFixed(2)}
    distanceAvg: ${distanceAvg.avg.toFixed(2)}
    distanceDiff: ${distanceDiff.toFixed(2)}
    angle: ${angle.toFixed(2)}
    angleDegrees: ${angleDegrees.toFixed(2)}
  `);
};



function setText(id, text) {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== text) {
    element.textContent = text;
  }
}

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { canvas } = settings;
  const { pointA, pointB } = state;

  // Clear canvas
  clear(canvas);

  for (const thing of state.things) {
    drawThing(canvas, thing);
  }

  // Draw new things
  Util.drawCircle(canvas, pointA, `red`);
  Util.drawCircle(canvas, pointB, `blue`);
};

/**
 * Draw a thing
 * @param {CanvasHelper} canvas 
 * @param {Things.Thing} thing
 */
const drawThing = (canvas, thing) => {
  const { ctx } = canvas;
  const posAbs = canvas.toAbsolute(thing);
  const radius = thing.scale * window.innerWidth / 4;

  // Translate so 0,0 is the middle
  ctx.save();
  ctx.translate(posAbs.x, posAbs.y);

  // Fill a circle
  ctx.beginPath();
  ctx.fillStyle = `hsl(${thing.mass * 360}, 100%, 50%)`;

  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Unwind translation
  ctx.restore();
};

/**
 * Clears canvas
 * @param {CanvasHelper} canvas 
 */
const clear = (canvas) => {
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

/**
 * 
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { canvas } = settings;
  const pos = canvas.toRelative({ x: event.clientX, y: event.clientY });
  saveState({
    pointA: pos
  });
};


function setup() {
  const loop = () => {
    use(state);
    window.requestAnimationFrame(loop);
  };
  loop();

  const updateLoop = () => {
    update();
    setTimeout(updateLoop, 10);
  };
  updateLoop();
  document.addEventListener(`pointermove`, onPointerMove);
};
setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
