import { Grids } from '@ixfx/geometry.js';
import * as Util from './util.js';

// Define settings
const settings = Object.freeze({
  grid: { rows: 10, cols: 10, size: 10 }
});

// Initialise state
let state = Object.freeze({
  lastClicked: { x: 0, y: 0 }
});


/**
 * Cell has been clicked
 * @param {PointerEvent} event 
 */
const onCellClick = (event) => {
  const cell = Util.getCellFromElement(/** @type HTMLElement */(event.target));
  saveState({
    lastClicked: cell
  });
  use();
};

const use = () => {
  const { lastClicked } = state;
  const feedbackElement = document.querySelector(`#feedback`);
  if (feedbackElement) feedbackElement.innerHTML = `Clicked grid cell: ${lastClicked.x}, ${lastClicked.y}`;
};

function setup() {
  const { grid } = settings;

  const gridElement = /** @type HTMLElement */(document.querySelector(`#grid`));

  if (gridElement === null) return;

  for (const row of Grids.As.rows(grid)) {
    // Make HTML for each cell. This produces an array of strings
    //   Note we encode the coordinate of the cell in the attributes
    const cellsHtml = row.map(cell => `<div data-x="${cell.x}" data-y="${cell.y}" class="cell"></div>`);

    // Make HTML for a row. Join together array of strings
    const rowHtml = `<div class="row"> ${cellsHtml.join(` `)}</div>`;

    // Add it to the parent element
    gridElement.insertAdjacentHTML(`beforeend`, rowHtml);
  }

  gridElement.addEventListener(`pointerup`, onCellClick);
}

setup();

/**
 * Update state
 * @param {Partial<typeof state>} newPartialState 
 */
function saveState(newPartialState) {
  state = Object.freeze({
    ...state,
    ...newPartialState
  });
}