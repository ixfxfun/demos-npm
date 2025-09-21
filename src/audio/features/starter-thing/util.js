import { Points } from '@ixfx/geometry';


/**
 * Make `x` and `y` absolute with respect to window dimensions
 * @param {import('@ixfx/geometry.js').Point} point
 * @returns {import('@ixfx/geometry.js').Point}  
 */
export const absolutePoint = (point) => {
  return {
    x: point.x * window.innerWidth,
    y: point.y * window.innerHeight
  };
};

/**
 * Make `x` and `y` absolute with respect to window dimensions
 * @param {import('@ixfx/geometry.js').Rect} rect
 * @returns {import('@ixfx/geometry.js').Rect}  
 */
export const absoluteRect = (rect) => {
  return {
    width: rect.width * Math.min(window.innerWidth, window.innerHeight),
    height: rect.height * Math.min(window.innerHeight, window.innerWidth)
  };
};

/**
 * Make `x` and `y` absolute with respect to window dimensions
 * @param {import('@ixfx/geometry.js').Point} point
 * @returns {import('@ixfx/geometry.js').Point}  
 */
export const relativePoint = (point) => {
  return {
    x: point.x / window.innerWidth,
    y: point.y / window.innerHeight
  };
};
