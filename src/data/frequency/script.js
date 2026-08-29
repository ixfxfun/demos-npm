import { frequency } from '@ixfx/trackers.js';

/**
 * @typedef {[
 * name:string,
 * value:string
 * ]} KeyValue
 */
let state = Object.freeze({
  freq: frequency()
});


const use = () => {
  const { freq } = state;

  const outputElement = document.querySelector(`#output`);
  if (!outputElement) return;

  // Sort with most frequent at position 0 of the array
  const sorted = freq.entriesSorted(`value-reverse`);

  // Grab just the top five
  const topFive = sorted.slice(0, Math.min(sorted.length, 5));

  // Calculate the min, max and avg over all frequencies
  const mma = freq.computeValues();
  const total = mma.total;
  const top = topFive[0];

  let txt = `<p>The top letter is <code>${top[0]}</code>, appearing ${roundToPercentage(top[1], total)}% of the time.</p>`;

  const asList = topFive.map(t => `<li><code>${t[0]}</code> ${roundToPercentage(t[1], total)}%`);

  txt += `<p>Top five ranking: <ol>${asList.join(`,`)}</ol></p>`;
  outputElement.innerHTML = txt;
};

const update = () => {
  // Get input element
  const element = /** @type HTMLInputElement|null */(document.querySelector(`#letters`));
  if (!element) return;

  // Upper case what was typed in
  const text = element.value.toLocaleUpperCase();

  // Create a new frequency tracker
  const f = frequency();

  // Add all letters except spaces
  for (let index = 0; index < text.length; index++) {
    const char = text.charAt(index);
    if (char === ` `) continue; // Skip spaces
    f.add(char);
  }

  // Update and use state
  saveState({ freq: f });
  use();
};


function setup() {
  document.querySelector(`#letters`)?.addEventListener(`input`, event => {
    update();
  });
  update();
}
setup();

/**
 * Convert a decimal value to a rounded percentage
 * ```js
 * roundToPercentage(0.123, 1); // 12
 * ```
 * @param {number|string|bigint} valueOrString 
 * @param {number} total
 * @returns 
 */
function roundToPercentage(valueOrString, total) {
  const value = typeof valueOrString === `number` ? valueOrString : Number.parseFloat(valueOrString.toString());
  return Math.round(value / total * 100);
}
/**
 * Save state
 * @param {Partial<typeof state>} newPartialState 
 */
function saveState(newPartialState) {
  state = Object.freeze({
    ...state,
    ...newPartialState
  });
  return state;
}