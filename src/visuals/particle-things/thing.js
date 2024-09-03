import { clamp } from "ixfx/numbers.js";
/**
 * @typedef {{
 *  x: number,
 *  y: number,
 *  scale: number
 *  mass: number
 * }} Thing
 */



/**
 * @returns {Thing}
 */
export function create() {
  return {
    x: Math.random(),
    y: Math.random(),
    mass: Math.random(),
    scale: Math.random() * 0.5
  };
}

/**
 * Updates the thing
 * @param {Thing} thing 
 * @param {import("./script.js").State} state
 */
export const update = (thing, state) => {
  const { distanceDiff } = state;
  const { scale, mass } = thing;

  let computedScale = scale * (0.9999);

  computedScale = computedScale + (distanceDiff * mass * 0.1);
  computedScale = clamp(computedScale, 0.01);

  return {
    ...thing,
    scale: computedScale
  };

};