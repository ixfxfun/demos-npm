/**
 * Make a human-friendly percentage
 * @param {number} v 
 * @returns 
 */
export function percentage(v) {
  return Math.floor(v * 100) + `%`;
}