/**
 * Returns a key for a cell, ie 'x-y'
 * @param {import("@ixfx/geometry.js").GridCell} cell 
 * @returns 
 */
export function keyForCell(cell) {
  return cell.x + `-` + cell.y;
}