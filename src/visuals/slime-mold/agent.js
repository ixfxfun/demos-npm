import { degreeToRadian, Points, Vectors, Polar } from "@ixfx/geometry.js";
import { CanvasHelper } from "@ixfx/visual.js";
import { Forces } from "@ixfx/modulation.js";
import { sortByNumericProperty } from "@ixfx/arrays.js";
import * as Random from "@ixfx/random.js";
import * as World from './world.js';

/**
 * @import {State, AgentState, WorldState} from "./types.js"
 */

const settings = Object.freeze({
  // Applied to initial velocity to make it slower/faster
  initialVelocityMultiplier: 5,
  // How thick to draw the lines making up the agent
  lineWidth: 3,
  // Only turn toward a smell if it's 1.2 times stronger than other options
  smellStrengthThreshold: 1.2
});


/**
 * Create a new agent.
 * 
 * We assign some bounded random values to nose angle and distance to give each one a slightly different behaviour
 * @returns {AgentState}
 */
export function create() {
  const { initialVelocityMultiplier } = settings;
  const noseAngle = Random.float({ max: 70, min: 20 });

  return {
    position: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    noses: [
      { angleRadian: degreeToRadian(-noseAngle), distance: Random.float({ max: 4, min: 1 }) },
      { angleRadian: degreeToRadian(0), distance: Random.float({ max: 3, min: 1 }) },
      { angleRadian: degreeToRadian(noseAngle), distance: Random.float({ max: 4, min: 1 }) }
    ],
    velocity: Points.multiplyScalar(Vectors.fromAngle(Math.random() * 360), initialVelocityMultiplier),
    sizePixels: 10,
  };
}

/**
 * Updates the agent, returning its new state
 * 
 * In overview we:
 * 1. Apply velocity and screen-wrapping behaviour
 * 2. Change velocity vector based on nearby 'smells'
 * @param {AgentState} agent 
 * @param {WorldState} world
 * @param {State} state
 */
export const update = (agent, state, world) => {

  const { smellStrengthThreshold } = settings;
  // Set agent size based on grid size
  let sizePixels = state.world.grid.size;

  // Apply forces, getting back a new agent with computations
  agent = Forces.apply(
    // Apply forces to thing
    agent,

    // @ts-ignore
    state.constrain
  );

  let velocity = agent.velocity;

  // 'Smell' at new location
  // 1. Get screen position of noses
  const noses = getNosePositions(agent);
  // 2. Call the 'scentAt' function to disover scent at this screen coord
  const smells = noses.map(nose => World.scentAt(world, nose.point, nose.nose));
  // 3. Sort by strength
  const sorted = sortByNumericProperty(smells, `value`).reverse();
  // 4. Get top two
  const smelliest = sorted[0];
  const nextSmelliest = sorted[1];

  // 5. Only follow smell if it is strong enough. This reduces jittering turns.
  if (smelliest.value > nextSmelliest.value * smellStrengthThreshold) {
    // Apply rotation to agent
    velocity = Points.rotateByAngle(agent.velocity, smelliest.nose.angleRadian);
  }

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

  // Draw body (a rectangle)
  ctx.strokeStyle = `oklch(0.8 0.2 120deg / 50%)`;
  ctx.strokeRect(-halfSize, -halfSize, size, size);

  // Draw head (just a line)
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size * 1.5, 0);
  ctx.stroke();

  // Restore translation & rotation
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