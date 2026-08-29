/**
 * @import {GridCell, GridVisual, Points} from "@ixfx/geometry.js"
 * @import {Forces} from "@ixfx/modulation.js"
 */

/**
 * @typedef {{
 *  distance:number // Multiplier of body
 *  angleRadian:number    // Angle in radian
 * }} AgentNose
 */
/**
 * @typedef {{
 *  position: Points.Point
 *  velocity: Points.Point
 *  sizePixels:number
 *  noses:AgentNose[]
 * }} AgentState
 */

/**
 * @typedef {{
 *  scent:number[][]
 *  grid:GridVisual
 * }} WorldState
 */

/**
 * @typedef {Readonly<{
 * agents: ReadonlyArray<AgentState>
 * world: WorldState
 * constrain: Forces.ForceFn<AgentState>
 * showAgents:boolean
 * }>} State
 */