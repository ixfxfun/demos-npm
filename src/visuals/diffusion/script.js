import { CanvasHelper } from '@ixfx/visual.js';
import { Colour } from '@ixfx/visual.js';
import { Grids, Points, radianToDegree } from '@ixfx/geometry.js';
import { Forces } from '@ixfx/modulation.js';
import { repeatSync } from '@ixfx/flow.js';
import { NumberTracker } from '@ixfx/trackers.js';
import * as Util from './util.js';
import * as Agents from './agent.js';
import * as World from './world.js';

/**
 * @import {State, AgentState, WorldState} from "./types.js"
 */

// Define settings
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` }),
  howManyThings: 1
});


/** @type State */
let state = Object.freeze({
  cursor: {
    y: 0.5,
    x: 0.5
  },
  constrain: Util.createConstrainForce(),
  world: await World.create(),
  agents: [ ...repeatSync(() => Agents.create(), { count: settings.howManyThings }) ],
});


const update = () => {
  let { world } = state;

  world = World.update(world, state);

  const agents = state.agents.map(t => Agents.update(t, state, world));
  saveState({ agents, world });

  // Util.setText(`#debug`, `
  //   distance: ${distance.toFixed(2)}
  //   distanceAvg: ${distanceAvg.avg.toFixed(2)}
  //   distanceDiff: ${distanceDiff.toFixed(2)}
  //   angle: ${angle.toFixed(2)}
  //   angleDegrees: ${angleDegrees.toFixed(2)}
  // `);
};


/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { canvas } = settings;
  const { cursor, world, agents } = state;

  // Clear canvas
  Util.clear(canvas);


  // Draw world
  World.draw(canvas.ctx, world);

  // Draw each of the agents
  for (const agent of agents) {
    Agents.draw(canvas, agent, world);

    const nosesWithPosition = Agents.getNosePositions(agent);
    let index = 0;
    for (const noseWithPosition of nosesWithPosition) {
      const r = World.scentAt(world, noseWithPosition.point, noseWithPosition.nose);
      if (r.cell) {
        World.drawCell(canvas.ctx, r.cell, world, Colour.goldenAngleColour(index++));
      }
    }
  }

  // Draw cursor
  Util.drawCircle(canvas, cursor, `red`);
};


/**
 * When the pointer moves, save its coordinate (in relative coordinates)
 * to state.
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { canvas } = settings;
  const { world } = state;

  if (event.buttons < 1) return; // User is not pressing

  // Get grid cell at pointer position
  const cell = Grids.cellAtPoint(world.grid, {
    x: event.clientX,
    y: event.clientY
  });
  if (!cell) return; // Out of range

  saveState({ world: World.increaseScentAtCell(world, cell, 1) });

};

/**
 * If the pointer leaves the viewport, reset the state
 * @param {PointerEvent} _event 
 */
const onPointerLeave = (_event) => {
  saveState({ cursor: { x: 0.5, y: 0.5 } });
};

function setup() {
  const { canvas } = settings;
  const canvasEl = canvas.el;

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
  document.addEventListener(`pointerleave`, onPointerLeave);

  document.addEventListener(`contextmenu`, e => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  });

}
setup();

/**
 * Save state
 * @param {Partial<State>} newPartialState
 */
function saveState(newPartialState) {
  state = Object.freeze({
    ...state,
    ...newPartialState
  });
  return state;
}
