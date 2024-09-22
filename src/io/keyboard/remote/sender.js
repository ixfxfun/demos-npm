// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: false,
    // eg if you use a Glitch-hosted websocket server:
    // websocket: `wss://MY-PROJECT-NAME.glitch.me/ws`
    websocket: `wss://${window.location.host}/ws`
  }),
  lastSentEl: /** @type HTMLElement */(document.querySelector(`#last-sent`))
});

/**
 * Key down/up
 * @param {KeyboardEvent} event 
 */
const onKeyUpOrDown = (event) => {
  const { remote, lastSentEl } = settings;
  event.preventDefault();

  // Data to broadcast
  const d = {
    key: event.key,
    shift: event.shiftKey,
    meta: event.metaKey,
    ctrl: event.ctrlKey,
    alt: event.altKey,
    code: event.code,
    location: event.location,
    timestamp: event.timeStamp,
    type: event.type,
  };
  lastSentEl.textContent = JSON.stringify(d);
  remote.broadcast(d);
};

const setup = () => {
  // Listen for key events
  document.addEventListener(`keydown`, onKeyUpOrDown);
  document.addEventListener(`keyup`, onKeyUpOrDown);
};
setup();
