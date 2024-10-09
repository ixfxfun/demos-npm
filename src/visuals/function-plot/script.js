import { jitter } from 'ixfx/modulation.js';
import { Bipolar } from 'ixfx/numbers.js';
import * as Plot from './plot.js';

/**
 * @typedef {Readonly<{}>} State
 */

const update = () => {
  use({});
  window.requestAnimationFrame(update);

};

// With noise
const jitterFunction = jitter({ clamped: false, relative: 0.005 });

const sine = (x) => Math.sin(x * Math.PI);

const sincImpulse = (x, k) => {
  // Smaller values for k make broader pulses
  // Useful range of k is around 2..20

  const a = Math.PI * (k * x - 1);
  return Math.sin(a) / a;
};

/**
 * Polynominal impulse. X is on 0..1 scale.
 * k and n are for changing shape.
 * @param {number} x 
 * @param {number} k Kind of changes 'attack' of curve. Range is about 0.1-100
 * @param {number} n Roughly changes x position of peak. Range is about 1.1-100
 * @returns 
 */
const polyImpulse = (x, k, n) => {
  return (n / (n - 1)) *
    Math.pow((n - 1) * k, 1 / n) *
    x / (1 + k * Math.pow(x, n));
};

const polyImpulseScaled = (x) => {
  // Need to wrap polyImpulse to convert from bipolar values,
  // and output back to an inverted bipolar at the end.

  x = Bipolar.toScalar(x);
  const y = polyImpulse(x, 100, 10);
  return -1 * Bipolar.fromScalar(y);
};

/**
 * Power curve
 * @param {number} x 
 * @param {number} a
 * @param {number} b 
 * @returns 
 */
const powerCurve = (x, a, b) => {
  const k = Math.pow(a + b, a + b) / (Math.pow(a, a) * Math.pow(b, b));
  // 0..1 scale, 
  const y = k * Math.pow(x, a) * Math.pow(1 - x, b);
  // Put on -1..1 scale and invert
  return -Bipolar.fromScalar(y);
};

// Plot a series of functions
// Plot functions are called with a value from 0..1
// and are expected to output a value of -1 to 1.
const draw = () => {
  //Plot.plot(sine, { strokeStyle: `lightblue` });
  Plot.plot(x => sincImpulse(x, 20), { strokeStyle: `orange` });

  //Plot.plot(x => powerCurve(x, 1.1, 2), { strokeStyle: `orange` });

  // Random:
  //Plot.plot(x => Math.random() * x, { strokeStyle: `silver` });

  // Straight line:
  //Plot.plot((x) => 0, { strokeStyle: `pink` });

  // A diagonal line
  //Plot.plot((x) => -1 * x, { strokeStyle: `pink` });
};


/**
 * Use state
 * @param {State} state 
 */
function use(state) {
  Plot.newFrame();
  draw();
};


function setup() {
  update();
};
setup();
