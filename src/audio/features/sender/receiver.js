// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: false,
    websocket: `wss://${window.location.host}/ws`
  })
});

const setup = () => {
  const { remote } = settings;
  remote.onData = (d) => {
    // Display on the page
    setText(`remote-data`, JSON.stringify(d, null, 2));
  };
};
setup();

function setText(id, message) {
  const element = /** @type HTMLElement */(document.querySelector(`#${id}`));
  if (element && element.textContent !== message) {
    element.textContent = message;
  }
}