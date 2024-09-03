import { Camera } from 'ixfx/io.js';
import { Video } from 'ixfx/visual.js';
import * as Trackers from 'ixfx/trackers.js';
import { defaultErrorHandler } from 'ixfx/dom.js';
import * as Util from './util.js';

const settings = Object.freeze({
  worker: new Worker(`worker.js`),
  diffTracker: Trackers.number({ id: `difference`, resetAfterSamples: 200 }),
  frameIntervalTracker: Trackers.interval({ id: `fps`, resetAfterSamples: 100 }),
  // HTML elements for status
  lblFps: /** @type HTMLElement */(document.querySelector(`#lblFps`)),
  lblDifferences: /** @type HTMLElement */(document.querySelector(`#lblDifferences`)),
  lblDiffVu: /** @type HTMLElement */(document.querySelector(`#lblDiffVu`))
});

/**
 * @typedef {Readonly<{
 *  fps:number
 *  differences: number
 *  diffVu: string
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  /** @type {number} */
  fps: 0,
  /** @type {number} */
  differences: 0,
  diffVu: ``
});

const use = () => {
  const { fps, differences, diffVu } = state;
  const { lblFps, lblDifferences, lblDiffVu } = settings;

  // Update HTML labels
  if (lblFps) lblFps.textContent = `FPS: ${fps}`;
  if (lblDifferences)
    lblDifferences.textContent = `Differences: ${Util.percentage(differences)}`;
  if (lblDiffVu) lblDiffVu.innerHTML = diffVu;
};

const startVideo = async () => {
  const { worker, frameIntervalTracker } = settings;
  const { videoEl, dispose } = await Camera.start();

  try {
    // Video.frames generator loops forever,
    // returning ImageData from video stream
    for await (const frame of Video.frames(videoEl)) {

      // Post frame to the worker for processing
      worker.postMessage({
        pixels: frame.data.buffer,
        width: frame.width,
        height: frame.height,
        channels: 4
      }, [frame.data.buffer]);

      // Keep track of how long it takes us to process frames
      frameIntervalTracker.mark();

      saveState({
        fps: Math.round(1000 / frameIntervalTracker.avg)
      });
    }
  } catch (error) {
    console.error(error);

    // Clean up camera
    dispose();
  }
};


function setup() {
  const { worker } = settings;
  defaultErrorHandler();

  // Start camera when button is pressed
  document.querySelector(`#btnStart`)?.addEventListener(`click`, async () => {
    await startVideo();
  });

  // Listen for results from the worker
  worker.addEventListener(`message`, event => {
    const d = event.data;
    const { diffTracker } = settings;

    diffTracker.seen(d.differences);
    const mma = diffTracker.getMinMaxAvg();

    // Add what the worker sends to the state
    saveState({
      ...d,
      diffVu: `
       max: ${Util.percentage(mma.max)}<br />
       avg: ${Util.percentage(mma.avg)}<br />
       min: ${Util.percentage(mma.min)}`
    });

    use();
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