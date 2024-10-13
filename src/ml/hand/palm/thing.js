import { Numbers, Random } from "ixfx/bundle.js";
import { clamp, scale, scalePercent } from "ixfx/numbers.js";
import * as Mod from 'ixfx/modulation.js';


/**
 * @typedef {Readonly<{
 * x: number
 * y: number
 * strength: number
 * el: HTMLElement
 * energy: number
 * wave: Mod.WaveModulator
 * }>} Thing
 */

/**
 * Updates a thing, returning a mutated version
 * @param {Thing} thing
 * @param {import("./script.js").State} worldState
 * @returns {Thing} 
 */
export const update = (thing, worldState) => {
  let { energy, wave } = thing;

  const strengthInverted = 1 - thing.strength;
  // Mix some of the palm area value, depending on 'strength' of thing
  // this will help to give some variance
  energy += worldState.palmArea * strengthInverted * 0.5;

  // Decay energy, also relative to strength of thing
  energy -= (energy * strengthInverted * 0.01) + 0.0001;

  // Make sure it stays in 0..1 range
  energy = clamp(energy);

  let x = wave();
  // Return copy of thing with changed energy
  return {
    ...thing,
    energy,
    x
  };
};

/**
 * Uses the state of a thing
 * @param {Thing} thing 
 */
export const use = (thing) => {
  let { el, x, y, strength, energy } = thing;
  const dim = Math.min(window.innerHeight, window.innerWidth) / 2;

  // Get screen coords
  x = scalePercent(x, 0, window.innerWidth);
  y = scalePercent(y, 0, window.innerHeight);

  // Size is based on 'strength', screen size and energy level
  let size = strength * dim * Math.max(0.01, energy);

  const bounds = el.getBoundingClientRect();
  el.style.left = `${(x - bounds.width / 2)}px`;
  el.style.top = `${(y - bounds.height / 2)}px`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.opacity = `${energy * 100}%`;
};

/**
 * Create a random thing
 * @returns {Thing}
 */
export const create = () => {
  const el = document.createElement(`div`);
  el.classList.add(`thing`);
  document.body.append(el);
  return {
    energy: Math.random(),
    x: 0,
    y: Math.random(),
    strength: Math.random(),
    el,
    wave: Mod.wave({
      shape: `sine`,
      millis: Random.integer({ min: 2000, max: 10_000 })
    })
  };
};