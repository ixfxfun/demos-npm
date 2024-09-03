import * as Data from 'ixfx/data.js';
import * as Modulation from 'ixfx/modulation.js';
import { Points } from 'ixfx/geometry.js';
import * as Util from './util.js';

const settings = Object.freeze({
  spring: /** @type Modulation.SpringOptions */({
    // Bounciness. Higher == bouncier
    stiffness: 100,
    // 'Weight' of object. 
    // Less weight means faster movement, but also less noticeable effect of the spring
    mass: 1,
    // Acts a kind of friction
    damping: 10
  }),
  // Thing to move around
  thingElement: /** @type HTMLElement */ (document.querySelector(`#thing`))
});

/**
 * @typedef {()=>number} ComputeFn
 */

/**
 * @typedef {Readonly<{
 *  spring:ComputeFn
 *  to: import('ixfx/geometry.js').Point
 *  from: import('ixfx/geometry.js').Point
 *  currentPos: import('ixfx/geometry.js').Point
 *  isDone:boolean 
 * }>} RawState
 */

/** @type RawState */
let rawState = {
  // Initially spring value will compute as 0
  spring: () => 0,
  // Where object is meant to move (viewport-relative coords)
  to: { x: 0.5, y: 0.5 },
  // Where it started moving from (viewport-relative coords)
  from: { x: 0.5, y: 0.5 },
  // Current calculated position (viewport-relative coords)
  currentPos: { x: 0.5, y: 0.5 },
  // Is the spring finished springing
  isDone: false,
};

// Update state with value from spring
const update = async () => {
  // Compute functions on state object
  const state = await Data.resolveFields(rawState);

  const { spring, to, from } = state;

  // Calculate position between 'from' and 'to' using the value of the
  // spring (0..1) as the %
  const pos = Points.interpolate(spring, from, to, true);

  // Save & trigger a visual refresh
  use(saveState({
    isDone: spring === 1,
    currentPos: pos
  }));

  // Loop
  window.requestAnimationFrame(update);
};

/**
 * Use state
 * @param {RawState} state 
 * @returns 
 */
const use = (state) => {
  const { thingElement } = settings;
  const { isDone, currentPos } = rawState;

  if (isDone) {
    thingElement.classList.add(`isDone`);
    return;
  } else {
    thingElement.classList.remove(`isDone`);
  }

  Util.moveElement(thingElement, currentPos);
};

const setup = () => {
  document.addEventListener(`pointerup`, event => {
    saveState({
      // Reset spring
      spring: Modulation.springValue(settings.spring),
      // Set new 'to' and 'from' positions
      to: Util.getRelativePosition(event),
      from: rawState.currentPos
    });
  });

  update();
};
setup();

/**
 * Save state
 * @param {Partial<RawState>} s 
 */
function saveState(s) {
  rawState = Object.freeze({
    ...rawState,
    ...s
  });
  return rawState;
}
