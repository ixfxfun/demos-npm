import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from 'ixfx/dom.js';

const settings = Object.freeze({
  lastDataEl: /** @type HTMLElement */(document.querySelector(`#lastData`))
});

let state = Object.freeze({
  /** @type boolean */
  paused: false
});

const r = new Remote({
  websocket: `wss://${window.location.host}/ws`,
  allowNetwork: true
});

const getXyz = (d) => ({
  x: d.x,
  y: d.y,
  z: d.z
});

const getAbg = (d) => ({
  a: d.alpha,
  b: d.beta,
  g: d.gamma
});

const onMotion = (event) => {
  const { lastDataEl } = settings;
  const { paused } = state;
  if (paused) return;

  const v = (x) => {
    if (!x) return 0;
    return x.toPrecision(2);
  };

  console.log(event);
  // Grab some values
  const d = {
    accel: getXyz(event.acceleration),
    accelGrav: getXyz(event.accelerationIncludingGravity),
    rotRate: getAbg(event.rotationRate)
  };

  // Send it
  r.broadcast(d);

  // Show it
  lastDataEl.innerHTML = `
  <table>
  <tr>
    <td colspan=3>accel x, y, z</td>
  </tr>
  <tr>
    <td>${v(d.accel.x)}</td><td>${v(d.accel.y)}</td><td>${v(d.accel.z)}</td>
  </tr>
  <tr>
    <td colspan=3>accelGrav x, y, z</td>
  </tr>
    <tr>
    <td>${v(d.accelGrav.x)}</td><td>${v(d.accelGrav.y)}</td><td>${v(d.accelGrav.z)}</td>
  </tr>
  <tr>
    <td colspan=3>rotRate alpha, beta, gamma</td>
  </tr>
    <tr>
    <td>${v(d.rotRate.a)}</td><td>${v(d.rotRate.b)}</td><td>${v(d.rotRate.g)}</td>
  </tr>
  </table>`;
};

const startEvents = async () => {
  if (typeof DeviceMotionEvent === `undefined`) {
    console.log(`DeviceMotionEvent unavailable`);
    return;
  }
  // @ts-ignore
  if (typeof DeviceMotionEvent.requestPermission === `function`) {
    console.log(`Requesting permission`);
    // @ts-ignore
    const p = await DeviceMotionEvent.requestPermission();
    if (p === `granted`) {
      console.log(`Listening for devicemotion events (1)`);
      window.addEventListener(`devicemotion`, onMotion);
    } else {
      console.log(`Permission denied when listening for devicemotion events`);
    }
  } else {
    console.log(`Listening for devicemotion events (2)`);
    window.addEventListener(`devicemotion`, onMotion);

  }
  document.querySelector(`#btnStart`)?.remove();
};

const setup = () => {
  Dom.inlineConsole({
    insertIntoEl: `#console`,
    witholdCss: true
  });

  /** @type HTMLInputElement */(document.querySelector(`#txtPeerId`)).value = r.id;

  document.querySelector(`#btnStart`)?.addEventListener(`click`, startEvents);
  document.querySelector(`#btnPause`)?.addEventListener(`click`, event => {
    state = {
      ...state,
      paused: !state.paused
    };
  });

  // Debug: generate random data
  // setInterval(() => {
  //   onMotion({
  //     acceleration: {
  //       x: Math.random(),
  //       y: Math.random(),
  //       z: Math.random()
  //     },
  //     accelerationIncludingGravity: {
  //       x: Math.random(),
  //       y: Math.random(),
  //       z: Math.random()
  //     },
  //     rotationRate: {
  //       alpha: Math.random(),
  //       beta: Math.random(),
  //       gamma: Math.random()
  //     }
  //   });
  // }, 1000);
};
setup();