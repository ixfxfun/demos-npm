/**
 * Returns a cell based on an HTML element that has data-x and data-y attributes set.
 * 
 * Returns -1 for x/y if attribute is not found.
 * @param {HTMLElement|null} element
 * @returns 
 */
export const getCellFromElement = (element) => {
  if (element === null) throw new Error(`Param 'element' is null`);
  return {
    x: Number.parseInt(element.getAttribute(`data-x`) ?? `-1`),
    y: Number.parseInt(element.getAttribute(`data-y`) ?? `-1`)
  };
};
