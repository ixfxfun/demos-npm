import { wave, jitter } from '@ixfx/modulation';

/** @typedef {{
 * acceleration: {x:number,y:number,z:number}
 * accelerationIncludingGravity: {x:number,y:number,z:number}
 * rotationRate: { alpha: number, beta: number, gamma: number}
 * faked:boolean
 * }} MotionData
 **/

/**
 * @typedef {(data:MotionData)=>void} MotionHandler
 */

/**
 * 
 * @param {DeviceMotionEventAcceleration|null} d 
 * @param {number} fallback
 * @returns 
 */
const getXyz = (d, fallback = 0) => {
  if (!d) return { x: fallback, y: fallback, z: fallback };
  return {
    x: d.x ?? fallback,
    y: d.y ?? fallback,
    z: d.z ?? fallback
  };
};

/**
 * 
 * @param {DeviceMotionEventRotationRate|null} d 
 * @param {number} fallback 
 */
const getAbg = (d, fallback = 0) => {
  if (!d) return { alpha: fallback, beta: fallback, gamma: fallback };
  return {
    alpha: d.alpha ?? fallback,
    beta: d.beta ?? fallback,
    gamma: d.gamma ?? fallback
  };
};

let fakeRunning = false;

/**
 * 
 * @param {MotionHandler} handler 
 * @returns 
 */
const startFake = (handler) => {
  if (fakeRunning) return;
  console.log(` --- using fake motion data ---`);
  fakeRunning = true;

  const w1 = wave({ secs: 2, shape: `sine` });
  const w2 = wave({ secs: 1.5, shape: `sine` });
  const w3 = wave({ secs: 3, shape: `sine` });
  const j1 = jitter({ relative: 0.1, clamped: true });
  const j2 = jitter({ relative: 0.2, clamped: true });
  const j3 = jitter({ relative: 0.4, clamped: true });

  setInterval(() => {
    handler({
      faked: true,
      acceleration: {
        x: w1(),
        y: w2(),
        z: w3()
      },
      accelerationIncludingGravity: {
        x: j1(1 - w1()),
        y: j2(1 - w2()),
        z: j3(1 - w3())
      }, rotationRate: {
        alpha: Math.random(),
        beta: Math.random(),
        gamma: Math.random()
      }
    });
  }, 200);
};

/**
 * 
 * @param {MotionHandler} handler
 * @returns 
 */
export const listen = async (handler, useFakeDataAsFallback = false) => {
  if (typeof DeviceMotionEvent === `undefined`) {
    console.log(`DeviceMotionEvent unavailable`);
    if (useFakeDataAsFallback) startFake(handler);
    return;
  }

  /**
   * 
   * @param {DeviceMotionEvent} e 
   */
  const onMotion = (e) => {
    if (e.acceleration?.x === null && e.acceleration?.y === null && e.acceleration.z === null) {
      console.log(`Warning: devicemotion data empty. Device maybe doesn't have sensors?`);
      if (useFakeDataAsFallback) startFake(handler);
    }
    handler({
      acceleration: getXyz(e.acceleration),
      accelerationIncludingGravity: getXyz(e.accelerationIncludingGravity),
      rotationRate: getAbg(e.rotationRate),
      faked: false
    });
  };

  if (typeof DeviceMotionEvent === `undefined`) {
    if (useFakeDataAsFallback) startFake(handler);
    throw new TypeError(`DeviceMotionEvent unavailable. Not loaded in secure context?`);
  }

  // @ts-ignore
  if (typeof DeviceMotionEvent.requestPermission === `function`) {
    // @ts-ignore
    const p = await DeviceMotionEvent.requestPermission();
    if (p === `granted`) {
      window.addEventListener(`devicemotion`, onMotion);
    } else {
      if (useFakeDataAsFallback) startFake(handler);
      throw new Error(`Permission denied when listening for devicemotion events`);
    }
  } else {
    window.addEventListener(`devicemotion`, onMotion);
  }
};
