const settings = Object.freeze({});

/**
 * @typedef {Readonly<{
 *  someProp: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  someProp: 0
});

/**
 * Use state
 * @param {State} state 
 */
function use(state) {};

function update() {
  // Compute state
  const state = saveState({});

  // Pass it on
  use(state);
}

function setup() {
  // Call every half a second
  setInterval(update, 500);
};

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
setup();
