import { degreeToRadian, Points, Vectors, Polar } from "@ixfx/geometry.js";
import { CanvasHelper } from "@ixfx/visual.js";
import { Forces } from "@ixfx/modulation.js";
import { sortByNumericProperty } from "@ixfx/arrays.js";

import * as World from './world.js';

/**
 * @import {State, AgentState, WorldState} from "./types.js"
 */

const settings = Object.freeze({
  // Applied to initial velocity to make it slower/faster
  initialVelocityMultiplier: 0.5,
  // How thick to draw the lines making up the agent
  lineWidth: 3,
});


/**
 * Create a new agent
 * @returns {AgentState}
 */
export function create() {
  const { initialVelocityMultiplier } = settings;
  return {
    position: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    noses: [
      { angleRadian: degreeToRadian(-30), distance: 1.5 },
      { angleRadian: degreeToRadian(0), distance: 3 },
      { angleRadian: degreeToRadian(30), distance: 1.5 }
    ],
    velocity: Points.multiplyScalar(Vectors.fromAngle(Math.random() * 360), initialVelocityMultiplier),
    mass: Math.random(),
    sizePixels: 10
  };
}

/**
 * 
 * @param {number} angle 
 */
function smellAtAngle(angle) {

}

/**
 * Updates the thing, returning its new state
 * @param {AgentState} agent 
 * @param {WorldState} world
 * @param {State} state
 */
export const update = (agent, state, world) => {
  // Set agent size based on grid size
  let sizePixels = state.world.grid.size;

  // Apply forces, getting back a new agent with computations
  agent = Forces.apply(
    // Apply forces to thing
    agent,
    // List of forces to apply

    // @ts-ignore
    state.constrain
  );

  // 'Smell' at new location
  // 1. Get screen position of noses
  const noses = getNosePositions(agent);
  // 2. Call the 'scentAt' function to disover scent at this screen coord
  const smells = noses.map(nose => World.scentAt(world, nose.point, nose.nose));
  // 3. Get the angle highest-ranked smell
  const smellsSorted = sortByNumericProperty(smells, `value`);
  const smelliestAngle = smellsSorted[2].nose.angleRadian; // Get last index, since sort is ascending

  // Apply rotation to agent
  const velocity = Points.rotateByAngle(agent.velocity, smelliestAngle);

  return {
    ...agent,
    velocity,
    sizePixels
  };
};

/**
 * Draw an agent
 * @param {CanvasHelper} canvas 
 * @param {AgentState} agent
 * @param {WorldState} world
 */
export const draw = (canvas, agent, world) => {
  const { ctx } = canvas;
  const { lineWidth } = settings;

  const { x, y } = agent.position;
  ctx.save();
  ctx.lineWidth = lineWidth;

  const size = agent.sizePixels;
  const halfSize = size / 2;

  // Translate so canvas 0,0 is the middle of the agent
  ctx.translate(x, y);

  // Rotate canvas according to rotation of agent
  ctx.rotate(Vectors.toRadians(agent.velocity));

  // Draw body
  ctx.strokeStyle = `hsl(${agent.mass * 360}, 100%, 50%)`;
  ctx.strokeRect(-halfSize, -halfSize, size, size);

  // Draw line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size * 1.5, 0);
  ctx.stroke();

  // Unwind translation
  ctx.restore();
};

/**
 * Returns the screen coordinates of an agent's "noses"
 * @param {AgentState} agent 
 */
export function getNosePositions(agent) {
  return agent.noses.map(nose => {
    const distance = nose.distance * agent.sizePixels;
    const angle = Points.angleRadian(agent.velocity);
    return {
      point: Polar.toCartesian(distance, angle + nose.angleRadian, agent.position),
      nose: nose
    };
  });
}