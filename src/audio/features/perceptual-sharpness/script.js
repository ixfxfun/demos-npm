import { CanvasHelper } from '@ixfx/visual';
import * as Draw from './drawing.js';
import * as Meyda from '../lib/index.js';
import { clamp, movingAverage, scaler } from '@ixfx/numbers';
import { Dom } from 'ixfx';

const settings = Object.freeze({
  // Meyda helper.
  meyda: new Meyda.MeydaHelper({
    bufferSize: 512,
    featureExtractors: [ `perceptualSharpness`, `loudness` ]
  }),
  // Normalise on 0..1 scale. 
  // These values were determined by using the playground and looking at values
  pcScaler: scaler(0.47, 0.78),
  lScaler: scaler(0.3, 2),

  // Smooth values
  pcAverager: movingAverage(100),
  lAverager: movingAverage(100),

  blurMax: 50,

  updateRateMs: 10,
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` }),

  // Used to display the debug info on screen
  dataDisplay: new Dom.DataDisplay({
    numbers: {
      leftPadding: 2,
      precision: 2
    }
  })
});

/** 
 * @typedef {Readonly<{
 * perceptualSharpness:number
 * loudness:number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  perceptualSharpness: 0,
  loudness: 0
});

/**
 * Called each time we have a new analysis
 * @param {Meyda.MeydaAudioFeature} data 
 */
function onData(data) {
  const { pcScaler, pcAverager, lScaler, lAverager } = settings;

  // Scale it 0..1 and then average to avoid jitteryness
  let v = data.perceptualSharpness;
  if (Number.isNaN(v)) return;
  if (!Number.isFinite(v)) return;
  v = pcScaler(v);
  v = pcAverager(v);

  // Get loudness data, and calculate average of last 20% of samples
  // -- this will be the higher-pitched sound
  let l = Meyda.averageBetweenRelative(data.loudness.specific, 0.8);
  l = lScaler(l);
  l = lAverager(l);

  saveState({
    perceptualSharpness: clamp(v),
    loudness: clamp(l)
  });
}

const update = () => {


};


const use = () => {
  const { canvas, blurMax } = settings;
  const { perceptualSharpness: v, loudness } = state;

  // Get drawing context
  const { ctx } = canvas;
  const bounds = canvas.getRectangle();

  // Fade out canvas
  const blurAmount = Math.floor(blurMax * (1 - v));
  ctx.filter = `blur(${blurAmount}px)`;
  ctx.fillStyle = `hsl(0 0% 0% / 5%)`;
  ctx.fillRect(0, 0, bounds.width, bounds.height);

  // Draw the circle
  const radius = loudness;
  const x = 1 - v;
  Draw.circleFilled(ctx, { x, y: 0.5, radius }, {
    fillStyle: `pink`
  });
};


function setup() {
  const { updateRateMs, meyda } = settings;

  // Initialise analyser
  meyda.onData = onData;
  meyda.init();

  const updateLoop = () => {
    update();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

  // Animation loop
  const animationLoop = () => {
    use();
    window.requestAnimationFrame(animationLoop);
  };
  animationLoop();

}
setup();


/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  settings.dataDisplay.update(state);
}