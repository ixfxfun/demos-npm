/**
 * Demonstrates using two movingAverage instances to smooth
 * pointer x,y positions in order to position an element.
 */
import { movingAverage } from '@ixfx/numbers';
import { Points } from '@ixfx/geometry';
import { Records } from '@ixfx/core';

const settings = Object.freeze({
  // Create an averager for x and y
  average: Records.mapObjectShallow({ x: 0, y: 0 }, args => movingAverage(100))
});

let state = Object.freeze({
  avg: { x: 0, y: 0 },
  pointer: { x: 0, y: 0 }
});

const update = () => {
  const { pointer } = state;
  // Adds the current pointer position to moving average
  addAverage(pointer.x, pointer.y);
};

const addAverage = (absX, absY) => {
  const { x, y } = settings.average;

  // Add relative x,y to their respective movingAverage instance
  saveState({
    avg: {
      x: x(absX / window.innerWidth),
      y: y(absY / window.innerHeight)
    }
  });
};

const use = () => {
  const thingElement = /** @type HTMLElement */(document.querySelector(`#thing`));
  moveElement(thingElement);
};
/**
 * Updates position of element based on
 * computed average
 * @param {HTMLElement|null} thingElement;
 */
const moveElement = (thingElement) => {
  if (!thingElement) return;
  const { avg } = state;

  // If we don't have a valid average, don't do anything
  if (Points.isNaN(avg)) return;

  // Map x,y to absolute pos
  const abs = Points.multiply(avg, window.innerWidth, window.innerHeight);

  // We want to position by its middle, not the top-left
  const thingSize = thingElement.getBoundingClientRect();
  const pt = Points.subtract(abs, thingSize.width / 2, thingSize.height / 2);

  // Move thing
  thingElement.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
};

const setup = () => {
  document.addEventListener(`pointermove`, event => {
    saveState({
      pointer: {
        x: event.clientX,
        y: event.clientY
      }
    });
  });

  // If pointer leaves, use center
  document.addEventListener(`pointerout`, () => {
    saveState({
      pointer: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    });
  });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {

  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}