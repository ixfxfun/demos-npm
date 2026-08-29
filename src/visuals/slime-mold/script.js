import { CanvasHelper } from '@ixfx/visual.js';
import { Grids } from '@ixfx/geometry.js';
import { repeatSync } from '@ixfx/flow.js';
import * as Util from './util.js';
import * as Agents from './agent.js';
import * as World from './world.js';

/**
 * @import {State, AgentState, WorldState} from "./types.js"
 */

// Define settings
const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` }),
  howManyAgents: 1000,
  scentTrailStrength: 0.2
});


/** @type State */
let state = Object.freeze({
  showAgents: true,
  constrain: Util.createConstrainForce(),
  world: await World.create(),
  agents: [ ...repeatSync(() => Agents.create(), { count: settings.howManyAgents }) ],
});


const update = () => {
  const { scentTrailStrength } = settings;
  let { world } = state;

  // Update the world: diffuses scent
  world = World.update(world, state);

  // Update the agents
  const agents = state.agents.map(t => Agents.update(t, state, world));

  // Have each agent boost the scent value at its location
  for (const agent of agents) {
    const gridPos = World.cellAtScreenCoord(world, agent.position);
    if (!gridPos) continue;
    World.increaseScentAtCell(world, gridPos, scentTrailStrength);
  }
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
  const { world, agents, showAgents } = state;

  // Draw world
  World.draw(canvas.ctx, world);

  // Draw each of the agents
  if (showAgents) {
    for (const agent of agents) {
      Agents.draw(canvas, agent, world);

    // Debug: visualise nose position
    // const nosesWithPosition = Agents.getNosePositions(agent);
    // let index = 0;
    // for (const noseWithPosition of nosesWithPosition) {
    //   const r = World.scentAt(world, noseWithPosition.point, noseWithPosition.nose);
    //   if (r.cell) {
    //     World.drawCell(canvas.ctx, r.cell, world, Colour.goldenAngleColour(index++));
    //   }
    // }
    }
  }
};


/**
 * Set a debug message
 * @param {string} msg 
 */
function debugLabel(msg) {
  Util.setText(`#debug`, msg);
}

/**
 * When the pointer moves, save its coordinate (in relative coordinates)
 * to state.
 * @param {PointerEvent} event 
 */
const onPointerMove = (event) => {
  const { world } = state;


  // Get grid cell at pointer position
  const cell = Grids.cellAtPoint(world.grid, {
    x: event.clientX,
    y: event.clientY
  });
  if (!cell) return; // Out of range

  const value = world.scent[cell.y][cell.x];
  debugLabel(`Cell: ${cell.x},${cell.y} value: ${value.toFixed(4)}`);

  if (event.buttons < 1) return; // User is not pressing

  saveState({ world: World.increaseScentAtCell(world, cell, 1) });

};

const onPointerLeave = () => {
  debugLabel(``);
};

function setup() {
  const { canvas } = settings;

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

  document.addEventListener(`keypress`, e => {
    saveState({ showAgents: !state.showAgents });
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
