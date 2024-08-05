/**
 * Get array indexes for pixel at x,y. This is four indexes,
 * for R, G, B and A.
 * @param {number} width Width of frame
 * @param {number} x X position
 * @param {number} y Y position
 * @returns number[]
 */
export const rgbaIndexes = (width, x, y) => {
  const p = y * (width * 4) + x * 4;
  return [p, p + 1, p + 2, p + 3];
};

/**
 * Get the pixel values for a set of indexes.
 * This will be a result of [r,g,b,alpha]
 * @param {Uint8ClampedArray} frame 
 * @param {number[]} indexes 
 * @returns number[]
 */
export const rgbaValues = (frame, indexes) => [
  frame[indexes[0]],
  frame[indexes[1]],
  frame[indexes[2]],
  frame[indexes[3]]
];

/**
 * Calculates grayscale value of a pixel (ignoring alpha)
 * @param {number[]} values 
 * @returns number
 */
export const grayscale = (values) => (values[0] + values[1] + values[2]) / 3;
