/** @typedef {{
 * acceleration: {x:number,y:number,z:number}
 * accelerationIncludingGravity: {x:number,y:number,z:number}
 * rotationRate: { alpha: number, beta: number, gamma: number}
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

/**
 * 
 * @param {MotionHandler} handler
 * @returns 
 */
export const listen = async (handler) => {
  if (typeof DeviceMotionEvent === `undefined`) {
    console.log(`DeviceMotionEvent unavailable`);
    return;
  }

  /**
   * 
   * @param {DeviceMotionEvent} e 
   */
  const onMotion = (e) => {
    handler({
      acceleration: getXyz(e.acceleration),
      accelerationIncludingGravity: getXyz(e.accelerationIncludingGravity),
      rotationRate: getAbg(e.rotationRate)
    });
  };

  if (typeof DeviceMotionEvent === `undefined`) {
    throw new TypeError(`DeviceMotionEvent unavailable. Not loaded in secure context?`);
  }

  // @ts-ignore
  if (typeof DeviceMotionEvent.requestPermission === `function`) {
    // @ts-ignore
    const p = await DeviceMotionEvent.requestPermission();
    if (p === `granted`) {
      window.addEventListener(`devicemotion`, onMotion);
    } else {
      throw new Error(`Permission denied when listening for devicemotion events`);
    }
  } else {
    window.addEventListener(`devicemotion`, onMotion);
  }
};
