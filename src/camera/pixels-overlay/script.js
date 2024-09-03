import { Camera } from 'ixfx/io.js';
import { Video } from 'ixfx/visual.js';
import * as Trackers from 'ixfx/trackers.js';
import { defaultErrorHandler } from 'ixfx/dom.js';
import * as Util from './util.js';
import { movingAverage } from 'ixfx/numbers.js';

const settings = Object.freeze({
  // Difference in grayscale value to count as a changed pixel
  threshold: 30,
  // If true, the differencing is shown. If false, just the
  // difference calculation is shown
  visualise: true,
  frameIntervalTracker: Trackers.interval({
    id: `fps`, resetAfterSamples: 100
  }),
  // Smooth the differences value over 50 samples
  smoother: movingAverage(50),
  // HTML Elements
  canvasEl: /** @type HTMLCanvasElement */(document.querySelector(`#canvas`)),
  lblFps: /** @type HTMLElement */(document.querySelector(`#lblFps`)),
  lblDifferences: /** @type HTMLElement */(document.querySelector(`#lblDifferences`)),
  lblError: /** @type HTMLElement */(document.querySelector(`#error`)),
  lblErrorMsg: /** @type HTMLElement */(document.querySelector(`#errorMsg`))
});

/**
 * @typedef {Readonly<{
 *  fps:number
 *  lastFrame: Uint8ClampedArray,
 *  differences: number
 *  running: boolean
 * }>} State
 */

/**
 * Initial state
 * @type State
 */
let state = {
  fps: 0,
  running: false,
  lastFrame: new Uint8ClampedArray(),
  differences: 0
};

/**
 * Uses calculated state to update labels
 */
const use = () => {
  const { fps, differences } = state;
  const { lblFps, lblDifferences } = settings;

  if (lblFps) lblFps.textContent = `FPS: ${fps}`;
  if (lblDifferences)
    lblDifferences.textContent = `Differences: ${Math.round(differences * 100)}%`;
};

/**
 * In this simple frame processor, the current frame is compared
 * to the last frame. Pixels are compared to get the amount of change
 * frame-on-frame.
 * 
 * @param {ImageData} frame 
 * @param {CanvasRenderingContext2D} context
 */
const update = (frame, context) => {
  const { frameIntervalTracker, smoother } = settings;
  const { data } = frame;
  const { lastFrame } = state;
  let differences = 0;

  if (lastFrame.length === 0) {
    // No previous frame
  } else {
    // Compare to previous frame
    differences = compareFrames(frame, lastFrame, context);
  }

  // Keep track of how long it takes us to process frames
  frameIntervalTracker.mark();

  const smoothedDifferences = smoother(differences);

  // Update state with latest calculations
  saveState({
    fps: Math.round(1000 / frameIntervalTracker.avg),
    lastFrame: data,
    differences: smoothedDifferences
  });
};

/**
 * Compares `frame` with `lastFrame`.
 * @param {ImageData} frame 
 * @param {Uint8ClampedArray} lastFrame
 * @param {CanvasRenderingContext2D} context
 */
const compareFrames = (frame, lastFrame, context) => {
  const { threshold, visualise } = settings;

  // Count of pixels which are deemed different
  let differences = 0;

  // Dimensions of frame
  const w = frame.width;
  const h = frame.height;
  context.fillStyle = `magenta`;

  // Loop left to right of frame
  const current = frame.data;
  for (let x = 0; x < w; x++) {
    // ...and top-to-bottom
    for (let y = 0; y < h; y++) {
      const indexes = Util.rgbaIndexes(w, x, y);          // Get array location for pixel based on x,y
      const pixel = Util.rgbaValues(current, indexes);  // Get pixel data
      const pixelGray = Util.grayscale(pixel);           // Convert to greyscale

      // Get the grayscale value of the same pixel in last frame
      const lastFramePixelGray = Util.grayscale(Util.rgbaValues(lastFrame, indexes));

      // Calculate absolute difference (ie. we don't care if it's darker or lighter)
      const diff = Math.abs(pixelGray - lastFramePixelGray);

      // If the difference meets our threshold, count it
      if (diff > threshold) {
        differences++;

        // ...and if we should, colour that pixel
        if (visualise) context.fillRect(x, y, 1, 1);
      }
    }
  }

  // Get a proportional difference, dividing by total number of pixels
  differences /= (w * h);
  return differences;
};

/**
 * Starts video stream
 */
const startVideo = async () => {
  const { canvasEl, visualise } = settings;
  if (state.running) return;

  // Init camera
  const { videoEl, dispose } = await Camera.start(
    {
      ideal: { width: 800, height: 600 }
    }
  );

  // Get drawing context if possible
  const context = canvasEl.getContext(`2d`);
  if (!context) return;

  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  // Hide canvas if visualise is turned off
  if (!visualise) canvasEl.style.display = `none`;

  try {
    // Video.frames generator loops forever, 
    // returning ImageData from video stream
    const frames = Video.frames(videoEl, { canvasEl });
    saveState({ running: true });
    for await (const frame of frames) {
      // Update calculations
      update(frame, context);

      // Update labels
      use();
    }
  } catch (error) {
    console.error(error);

    // Clean up camera
    dispose();
  }
};

function setup() {
  // Show unexpected errors on the page to help debugger;
  defaultErrorHandler();

  // Attempt to start video stream when button is pressed
  document.querySelector(`#btnStart`)?.addEventListener(`click`, async () => {
    await startVideo();
  });
};

setup();

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