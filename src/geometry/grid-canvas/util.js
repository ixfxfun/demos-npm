
/**
 * Returns a string 'key' for a cell.
 * eg, {x:3, y:4} yields `3-4`
 * @param {import('@ixfx/geometry.js').GridCell} cell 
 * @returns 
 */
export const keyForCell = (cell) => cell.x + `-` + cell.y;