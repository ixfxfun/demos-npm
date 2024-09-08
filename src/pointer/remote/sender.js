// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";

const settings = Object.freeze({
  remote: new Remote({
    allowNetwork: true,
    // eg if you use a Glitch-hosted websocket server:
    // websocket: `wss://MY-PROJECT-NAME.glitch.me/ws`
    websocket: `wss://${window.location.host}/ws`
  })
});

// Called when there is a pointermove event
const onPointerMove = (event) => {
  event.preventDefault();

  const { remote } = settings;
  // Data to broadcast
  const d = {
    x: event.x / window.innerWidth,
    y: event.y / window.innerHeight,
    pointerId: event.pointerId,
    movementX: event.movementX / window.innerWidth,
    movementY: event.movementY / window.innerHeight,
    pressure: event.pressure
  };
  remote.broadcast(d);
};

const setup = () => {
  // Listen for pointermove events
  document.addEventListener(`pointermove`, onPointerMove);

  // Prevent zoom gestures
  document.addEventListener(`wheel`, event => {
    event.preventDefault();
  }, { passive: false });

};
setup();
