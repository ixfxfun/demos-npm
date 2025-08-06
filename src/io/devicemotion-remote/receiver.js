import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as DeviceMotion from './devicemotion.js';

const settings = Object.freeze({});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: false,
  // defaultLog: `verbose`
});

// Called when there is sensor data

/**
 * 
 * @param {DeviceMotion.MotionData} message 
 * @returns 
 */
r.onData = (message) => {
  console.log(message);
  const element = /** @type HTMLElement */(document.querySelector(`#data`));
  if (!element) return;
  element.innerHTML = JSON.stringify(message, undefined, 4);
};
