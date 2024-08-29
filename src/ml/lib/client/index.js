var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};

// src/client/poses/index.ts
var poses_exports = {};
__export(poses_exports, {
  PoseTracker: () => PoseTracker,
  PosesTracker: () => PosesTracker,
  centroid: () => centroid3,
  centroidWorld: () => centroidWorld,
  getLandmark: () => getLandmark,
  getLandmarkIndexByName: () => getLandmarkIndexByName,
  getLandmarkNameByIndex: () => getLandmarkNameByIndex,
  getWorldLandmark: () => getWorldLandmark,
  horizontalSort: () => horizontalSort,
  lineBetween: () => lineBetween,
  roughCenter: () => roughCenter
});

// node_modules/ixfx/dist/chunk-BLACMGG6.js
var throwFromResult = (test) => {
  if (test[0]) return false;
  else throw new Error(test[1]);
};
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
var ifNaN = (v, fallback) => {
  if (Number.isNaN(v)) return fallback;
  if (typeof v !== `number`) {
    throw new TypeError(`v is not a number. Got: ${typeof v}`);
  }
  return v;
};
var integerParse = (value, range2 = ``, defaultValue = Number.NaN) => {
  if (value === void 0) return defaultValue;
  if (value === null) return defaultValue;
  try {
    const parsed = Number.parseInt(value);
    const r = integerTest(parsed, range2, `parsed`);
    return r[0] ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
};
var numberTest = (value, range2 = ``, parameterName = `?`) => {
  if (value === null) return [false, `Parameter '${parameterName}' is null`];
  if (typeof value === `undefined`) {
    return [false, `Parameter '${parameterName}' is undefined`];
  }
  if (Number.isNaN(value)) {
    return [false, `Parameter '${parameterName}' is NaN`];
  }
  if (typeof value !== `number`) {
    return [false, `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`];
  }
  switch (range2) {
    case `finite`: {
      if (!Number.isFinite(value)) {
        return [false, `Parameter '${parameterName} must be finite`];
      }
    }
    case `positive`: {
      if (value < 0) {
        return [false, `Parameter '${parameterName}' must be at least zero (${value})`];
      }
      break;
    }
    case `negative`: {
      if (value > 0) {
        return [false, `Parameter '${parameterName}' must be zero or lower (${value})`];
      }
      break;
    }
    case `aboveZero`: {
      if (value <= 0) {
        return [false, `Parameter '${parameterName}' must be above zero (${value})`];
      }
      break;
    }
    case `belowZero`: {
      if (value >= 0) {
        return [false, `Parameter '${parameterName}' must be below zero (${value})`];
      }
      break;
    }
    case `percentage`: {
      if (value > 1 || value < 0) {
        return [false, `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`];
      }
      break;
    }
    case `nonZero`: {
      if (value === 0) {
        return [false, `Parameter '${parameterName}' must non-zero. (${value})`];
      }
      break;
    }
    case `bipolar`: {
      if (value > 1 || value < -1) {
        return [false, `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`];
      }
      break;
    }
  }
  return [true];
};
var throwNumberTest = (value, range2 = ``, parameterName = `?`) => {
  throwFromResult(numberTest(value, range2, parameterName));
};
var percentTest = (value, parameterName = `?`) => numberTest(value, `percentage`, parameterName);
var throwPercentTest = (value, parameterName = `?`) => {
  throwFromResult(percentTest(value, parameterName));
};
var integerTest = (value, range2 = ``, parameterName = `?`) => {
  const r = numberTest(value, range2, parameterName);
  if (!r[0]) return r;
  if (!Number.isInteger(value)) {
    return [false, `Param '${parameterName}' is not an integer`];
  }
  return [true];
};
var throwIntegerTest = (value, range2 = ``, parameterName = `?`) => {
  throwFromResult(integerTest(value, range2, parameterName));
};

// node_modules/ixfx/dist/chunk-PZET2535.js
var isNull = (p2) => p2.x === null && p2.y === null;
var isNaN2 = (p2) => Number.isNaN(p2.x) || Number.isNaN(p2.y);
function guard(p2, name2 = `Point`) {
  if (p2 === void 0) {
    throw new Error(
      `'${name2}' is undefined. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (p2 === null) {
    throw new Error(
      `'${name2}' is null. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (p2.x === void 0) {
    throw new Error(
      `'${name2}.x' is undefined. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (p2.y === void 0) {
    throw new Error(
      `'${name2}.y' is undefined. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (typeof p2.x !== `number`) {
    throw new TypeError(`'${name2}.x' must be a number. Got ${p2.x}`);
  }
  if (typeof p2.y !== `number`) {
    throw new TypeError(`'${name2}.y' must be a number. Got ${p2.y}`);
  }
  if (p2.x === null) throw new Error(`'${name2}.x' is null`);
  if (p2.y === null) throw new Error(`'${name2}.y' is null`);
  if (Number.isNaN(p2.x)) throw new Error(`'${name2}.x' is NaN`);
  if (Number.isNaN(p2.y)) throw new Error(`'${name2}.y' is NaN`);
}
var guardNonZeroPoint = (pt, name2 = `pt`) => {
  guard(pt, name2);
  throwNumberTest(pt.x, `nonZero`, `${name2}.x`);
  throwNumberTest(pt.y, `nonZero`, `${name2}.y`);
  if (typeof pt.z !== `undefined`) {
    throwNumberTest(pt.z, `nonZero`, `${name2}.z`);
  }
  return true;
};
function isPoint(p2) {
  if (p2 === void 0) return false;
  if (p2 === null) return false;
  if (p2.x === void 0) return false;
  if (p2.y === void 0) return false;
  return true;
}
var isPoint3d = (p2) => {
  if (p2 === void 0) return false;
  if (p2 === null) return false;
  if (p2.x === void 0) return false;
  if (p2.y === void 0) return false;
  if (p2.z === void 0) return false;
  return true;
};
var isEmpty = (p2) => p2.x === 0 && p2.y === 0;
var isPlaceholder = (p2) => Number.isNaN(p2.x) && Number.isNaN(p2.y);
var fromPoints = (a2, b2) => {
  guard(a2, `a`);
  guard(b2, `b`);
  a2 = Object.freeze({ ...a2 });
  b2 = Object.freeze({ ...b2 });
  return Object.freeze({
    a: a2,
    b: b2
  });
};
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
  const a2 = { x: x1, y: y1 };
  const b2 = { x: x2, y: y2 };
  return fromPoints(a2, b2);
};

// node_modules/ixfx/dist/chunk-XO5G6VLT.js
function round(a2, b2) {
  throwIntegerTest(a2, `positive`, `decimalPlaces`);
  let rounder;
  if (a2 === 0) rounder = Math.round;
  else {
    const p2 = Math.pow(10, a2);
    rounder = (v) => Math.floor(v * p2) / p2;
  }
  return b2 === void 0 ? rounder : rounder(b2);
}

// node_modules/ixfx/dist/chunk-LOIP62EP.js
var quantiseEvery = (v, every, middleRoundsUp = true) => {
  const everyStr = every.toString();
  const decimal = everyStr.indexOf(`.`);
  let multiplier = 1;
  if (decimal >= 0) {
    let d2 = everyStr.substring(decimal + 1).length;
    multiplier = 10 * d2;
    every = Math.floor(multiplier * every);
    v = v * multiplier;
  }
  throwNumberTest(v, ``, `v`);
  throwIntegerTest(every, ``, `every`);
  let div = v / every;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5) div++;
  const vv = every * div / multiplier;
  return vv;
};
function* linearSpace(start, end, steps2, precision) {
  throwNumberTest(start, ``, `start`);
  throwNumberTest(end, ``, `end`);
  throwNumberTest(steps2, ``, `steps`);
  const r = precision ? round(precision) : (v) => v;
  const step = (end - start) / (steps2 - 1);
  throwNumberTest(step, ``, `step`);
  if (!Number.isFinite(step)) {
    throw new TypeError(`Calculated step value is infinite`);
  }
  for (let index = 0; index < steps2; index++) {
    const v = start + step * index;
    yield r(v);
  }
}

// node_modules/ixfx/dist/chunk-NGZXMICH.js
var dotProduct = (values) => {
  let r = 0;
  const length5 = values[0].length;
  for (let index = 0; index < length5; index++) {
    let t2 = 0;
    for (const [p2, value] of values.entries()) {
      if (p2 === 0) t2 = value[index];
      else {
        t2 *= value[index];
      }
    }
    r += t2;
  }
  return r;
};
var minIndex = (...data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex,
    0
  )
);
var maxFast = (data) => {
  let m3 = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m3 = Math.max(m3, datum);
  }
  return m3;
};
var totalFast = (data) => {
  let m3 = 0;
  for (const datum of data) {
    m3 += datum;
  }
  return m3;
};
var minFast = (data) => {
  let m3 = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m3 = Math.min(m3, datum);
  }
  return m3;
};

// node_modules/ixfx/dist/chunk-GFZVK53G.js
function intervalToMs(interval2, defaultNumber) {
  if (isInterval(interval2)) {
    if (typeof interval2 === `number`) return interval2;
    let ms = interval2.millis ?? 0;
    ms += (interval2.hours ?? 0) * 60 * 60 * 1e3;
    ms += (interval2.mins ?? 0) * 60 * 1e3;
    ms += (interval2.secs ?? 0) * 1e3;
    return ms;
  } else {
    if (typeof defaultNumber !== `undefined`) return defaultNumber;
    throw new Error(`Not a valid interval: ${interval2}`);
  }
}
function isInterval(interval2) {
  if (interval2 === void 0) return false;
  if (interval2 === null) return false;
  if (typeof interval2 === `number`) {
    if (Number.isNaN(interval2)) return false;
    if (!Number.isFinite(interval2)) return false;
    return true;
  } else if (typeof interval2 !== `object`) return false;
  const hasMillis = `millis` in interval2;
  const hasSecs = `secs` in interval2;
  const hasMins = `mins` in interval2;
  const hasHours = `hours` in interval2;
  if (hasMillis && !numberTest(interval2.millis)[0]) return false;
  if (hasSecs && !numberTest(interval2.secs)[0]) return false;
  if (hasMins && !numberTest(interval2.mins)[0]) return false;
  if (hasHours && !numberTest(interval2.hours)[0]) return false;
  if (hasMillis || hasSecs || hasHours || hasMins) return true;
  return false;
}

// node_modules/ixfx/dist/chunk-6UZ3OSJO.js
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isMap = (value) => toTypeString(value) === `[object Map]`;
var isSet = (value) => toTypeString(value) === `[object Set]`;
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var defaultToString = (object) => {
  if (object === null) return `null`;
  if (typeof object === `boolean` || typeof object === `number`) {
    return object.toString();
  }
  if (typeof object === `string`) return object;
  if (typeof object === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
  return JSON.stringify(object);
};
var toStringOrdered = (itemToMakeStringFor) => {
  if (typeof itemToMakeStringFor === `string`) return itemToMakeStringFor;
  const allKeys = /* @__PURE__ */ new Set();
  JSON.stringify(itemToMakeStringFor, (key, value) => (allKeys.add(key), value));
  return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
var isEqualDefault = (a2, b2) => a2 === b2;
var isEqualValueDefault = (a2, b2) => {
  if (a2 === b2) return true;
  return toStringDefault(a2) === toStringDefault(b2);
};
var isEqualValuePartial = (a2, b2, fieldComparer) => {
  if (typeof a2 !== `object`) throw new Error(`Parameter 'a' expected to be object`);
  if (typeof b2 !== `object`) throw new Error(`Parameter 'b' expected to be object`);
  if (Object.is(a2, b2)) return true;
  const comparer = fieldComparer ?? isEqualValuePartial;
  for (const entryB of Object.entries(b2)) {
    const valueA = a2[entryB[0]];
    const valueB = entryB[1];
    if (typeof valueA === `object` && typeof valueB === `object`) {
      if (!comparer(valueA, valueB)) {
        return false;
      }
    } else {
      if (valueA !== valueB) {
        return false;
      }
    }
  }
  return true;
};
var isEqualValueIgnoreOrder = (a2, b2) => {
  if (a2 === b2) return true;
  return toStringOrdered(a2) === toStringOrdered(b2);
};

// node_modules/ixfx/dist/chunk-L5EJU35C.js
var __defProp2 = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
};

// node_modules/ixfx/dist/chunk-B3EBEJZ3.js
var Events_exports = {};
__export2(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter,
  eventRace: () => eventRace
});
var defaultKeyer = (a2) => {
  return typeof a2 === `string` ? a2 : JSON.stringify(a2);
};
var firstEntryByValue = (map, value, isEqual8 = isEqualDefault) => {
  for (const e of map.entries()) {
    const val = e[1];
    for (const subValue of val) {
      if (isEqual8(subValue, value)) return e;
    }
  }
};
var MapOfSimpleBase = class {
  /**
   * Constructor
   * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
   * @param valueEq Compare values. By default uses JS logic for equality
   */
  constructor(groupBy = defaultKeyer, valueEq = isEqualDefault, initial = []) {
    this.groupBy = groupBy;
    this.valueEq = valueEq;
    this.map = new Map(initial);
  }
  /**
   * Iterate over all entries
   */
  *entriesFlat() {
    for (const key of this.map.keys()) {
      for (const value of this.map.get(key)) {
        yield [key, value];
      }
    }
  }
  *entries() {
    for (const [k, v] of this.map.entries()) {
      yield [k, [...v]];
    }
  }
  firstKeyByValue(value, eq = isEqualDefault) {
    const entry = firstEntryByValue(this, value, eq);
    if (entry) return entry[0];
  }
  /**
   * Get all values under `key`
   * @param key
   * @returns
   */
  *get(key) {
    const m3 = this.map.get(key);
    if (!m3) return;
    yield* m3.values();
  }
  /**
   * Iterate over all keys
   */
  *keys() {
    yield* this.map.keys();
  }
  /**
   * Iterate over all values (regardless of key)
   */
  *valuesFlat() {
    for (const entries of this.map) {
      yield* entries[1];
    }
  }
  /**
   * Iterate over keys and length of values stored under keys
   */
  *keysAndCounts() {
    for (const entries of this.map) {
      yield [entries[0], entries[1].length];
    }
  }
  /**
   * Returns _true_ if `key` exists
   * @param key
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.map.has(key);
  }
  /**
   * Returns _true_ if `value` exists under `key`.
   * @param key Key
   * @param value Value to seek under `key`
   * @returns _True_ if `value` exists under `key`.
   */
  hasKeyValue(key, value) {
    const values = this.map.get(key);
    if (!values) return false;
    for (const v of values) {
      if (this.valueEq(v, value)) return true;
    }
    return false;
  }
  /**
   * Debug dump of contents
   * @returns
   */
  debugString() {
    let r = ``;
    const keys = [...this.map.keys()];
    keys.every((k) => {
      const v = this.map.get(k);
      if (v === void 0) return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  /**
   * _True_ if empty
   */
  get isEmpty() {
    return this.map.size === 0;
  }
  /**
   * Return number of values stored under `key`.
   * Returns 0 if `key` is not found.
   * @param key
   * @returns
   */
  count(key) {
    const values = this.map.get(key);
    if (!values) return 0;
    return values.length;
  }
  get lengthKeys() {
    return this.map.size;
  }
};
var MapOfSimpleMutable = class extends MapOfSimpleBase {
  addKeyedValues(key, ...values) {
    const existing = this.map.get(key);
    if (existing === void 0) {
      this.map.set(key, values);
    } else {
      this.map.set(key, [...existing, ...values]);
    }
  }
  /**
   * Adds a value, automatically extracting a key via the
   * `groupBy` function assigned in the constructor options.
   * @param values Adds several values
   */
  addValue(...values) {
    for (const v of values) {
      const key = this.groupBy(v);
      this.addKeyedValues(key, v);
    }
  }
  /**
   * Delete `value` under a particular `key`
   * @param key
   * @param value
   * @returns _True_ if `value` was found under `key`
   */
  deleteKeyValue(key, value) {
    const existing = this.map.get(key);
    if (existing === void 0) return false;
    const without = existing.filter((existingValue) => !this.valueEq(existingValue, value));
    this.map.set(key, without);
    return without.length < existing.length;
  }
  /**
   * Deletes `value` regardless of key.
   *
   * Uses the constructor-defined equality function.
   * @param value Value to delete
   * @returns
   */
  deleteByValue(value) {
    let del = false;
    const entries = [...this.map.entries()];
    for (const keyEntries of entries) {
      for (const values of keyEntries[1]) {
        if (this.valueEq(values, value)) {
          del = true;
          this.deleteKeyValue(keyEntries[0], value);
        }
      }
    }
    return del;
  }
  /**
   * Deletes all values under `key`,
   * @param key
   * @returns _True_ if `key` was found and values stored
   */
  delete(key) {
    const values = this.map.get(key);
    if (!values) return false;
    if (values.length === 0) return false;
    this.map.delete(key);
    return true;
  }
  /**
   * Clear contents
   */
  clear() {
    this.map.clear();
  }
};
var ofSimpleMutable = (groupBy = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimpleMutable(groupBy, valueEq);
var eventRace = (target, eventNames, options = {}) => {
  const intervalMs = intervalToMs(options.timeout, 60 * 1e3);
  const signal = options.signal;
  let triggered = false;
  let disposed = false;
  let timeout;
  const promise = new Promise((resolve2, reject) => {
    const onEvent = (event) => {
      if (`type` in event) {
        if (eventNames.includes(event.type)) {
          triggered = true;
          resolve2(event);
          dispose();
        } else {
          console.warn(`eventRace: Got event '${event.type}' that is not in race list`);
        }
      } else {
        console.warn(`eventRace: Event data does not have expected 'type' field`);
        console.log(event);
      }
    };
    for (const name2 of eventNames) {
      target.addEventListener(name2, onEvent);
    }
    const dispose = () => {
      if (disposed) return;
      if (timeout !== void 0) clearTimeout(timeout);
      timeout = void 0;
      disposed = true;
      for (const name2 of eventNames) {
        target.removeEventListener(name2, onEvent);
      }
    };
    timeout = setTimeout(() => {
      if (triggered || disposed) return;
      dispose();
      reject(new Error(`eventRace: Events not fired within interval. Events: ${JSON.stringify(eventNames)} Interval: ${intervalMs}`));
    }, intervalMs);
    signal?.addEventListener(`abort`, () => {
      if (triggered || disposed) return;
      dispose();
      reject(new Error(`Abort signal received ${signal.reason}`));
    });
  });
  return promise;
};
var SimpleEventEmitter = class {
  #listeners = ofSimpleMutable();
  #disposed = false;
  dispose() {
    if (this.#disposed) return;
    this.clearEventListeners();
  }
  get isDisposed() {
    return this.#disposed;
  }
  /**
   * Fire event
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  fireEvent(type2, args) {
    if (this.#disposed) throw new Error(`Disposed`);
    const listeners = this.#listeners.get(type2);
    for (const l of listeners) {
      l(args, this);
    }
  }
  /**
   * Adds event listener.
   * 
   * @throws Error if emitter is disposed
   * @typeParam K - Events
   * @param name Event name
   * @param listener Event handler
   */
  addEventListener(name2, listener) {
    if (this.#disposed) throw new Error(`Disposed`);
    this.#listeners.addKeyedValues(
      name2,
      listener
    );
  }
  /**
   * Remove event listener
   *
   * @param listener
   */
  removeEventListener(type2, listener) {
    if (this.#disposed) return;
    this.#listeners.deleteKeyValue(
      type2,
      listener
    );
  }
  /**
   * Clear all event listeners
   * @private
   */
  clearEventListeners() {
    if (this.#disposed) return;
    this.#listeners.clear();
  }
};

// node_modules/ixfx/dist/chunk-UF3EQW5C.js
var set_exports = {};
__export2(set_exports, {
  MassiveSet: () => MassiveSet,
  immutable: () => immutable,
  mutable: () => mutable
});
var mutable = (keyString) => new SetStringMutable(keyString);
var SetStringMutable = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
   */
  constructor(keyString) {
    super();
    this.store = /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  /**
   * Number of items stored in set
   */
  get size() {
    return this.store.size;
  }
  /**
   * Adds one or more items to set. `add` event is fired for each item
   * @param values items to add
   */
  add(...values) {
    let somethingAdded = false;
    for (const value of values) {
      const isUpdated = this.has(value);
      this.store.set(this.keyString(value), value);
      super.fireEvent(`add`, { value, updated: isUpdated });
      if (!isUpdated) somethingAdded = true;
    }
    return somethingAdded;
  }
  /**
   * Returns values from set as an iterable
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  values() {
    return this.store.values();
  }
  /**
   * Clear items from set
   */
  clear() {
    this.store.clear();
    super.fireEvent(`clear`, true);
  }
  /**
   * Delete value from set.
   * @param v Value to delete
   * @returns _True_ if item was found and removed
   */
  delete(v) {
    const isDeleted = this.store.delete(this.keyString(v));
    if (isDeleted) super.fireEvent(`delete`, v);
    return isDeleted;
  }
  /**
   * Returns _true_ if item exists in set
   * @param v
   * @returns
   */
  has(v) {
    return this.store.has(this.keyString(v));
  }
  /**
   * Returns array copy of set
   * @returns Array copy of set
   */
  toArray() {
    return [...this.store.values()];
  }
};
var SetStringImmutable = class _SetStringImmutable {
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(keyString, map) {
    this.store = map ?? /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  get size() {
    return this.store.size;
  }
  add(...values) {
    const s = new Map(this.store);
    for (const v of values) {
      const key = this.keyString(v);
      s.set(key, v);
    }
    return new _SetStringImmutable(this.keyString, s);
  }
  delete(v) {
    const s = new Map(this.store);
    const key = this.keyString(v);
    if (s.delete(key)) return new _SetStringImmutable(this.keyString, s);
    return this;
  }
  has(v) {
    const key = this.keyString(v);
    return this.store.has(key);
  }
  toArray() {
    return [...this.store.values()];
  }
  *values() {
    yield* this.store.values();
  }
};
var immutable = (keyString = toStringDefault) => new SetStringImmutable(keyString);
var MassiveSet = class _MassiveSet {
  constructor(maxDepth = 1, depth = 0) {
    this.children = /* @__PURE__ */ new Map();
    this.values = [];
    this.#depth = depth;
    this.#maxDepth = maxDepth;
  }
  #depth;
  #maxDepth;
  /**
   * Returns the number of values stored in just this level of the set
   * @returns 
   */
  sizeLocal() {
    return this.values.length;
  }
  /**
   * Returns the number of branches at this node
   * Use {@link sizeChildrenDeep} to count all branches recursively
   * @returns 
   */
  sizeChildren() {
    return [...this.children.values()].length;
  }
  sizeChildrenDeep() {
    let t2 = this.sizeChildren();
    for (const c4 of this.children.values()) {
      t2 += c4.sizeChildrenDeep();
    }
    return t2;
  }
  /**
   * Returns the total number of values stored in the set
   */
  size() {
    let x = this.values.length;
    for (const set2 of this.children.values()) {
      x += set2.size();
    }
    return x;
  }
  add(value) {
    if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
    if (value.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value, true);
    if (destination === this) {
      if (!this.hasLocal(value)) {
        this.values.push(value);
      }
      return;
    }
    if (!destination) throw new Error(`Could not create child set for: ${value}`);
    destination.add(value);
  }
  remove(value) {
    if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
    if (value.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value, false);
    if (destination === void 0) return false;
    if (destination === this) {
      if (this.hasLocal(value)) {
        this.values = this.values.filter((v) => v !== value);
        return true;
      }
      return false;
    }
    return destination.remove(value);
  }
  debugDump() {
    const r = this.#dumpToArray();
    for (const rr of r) {
      console.log(rr);
    }
  }
  #dumpToArray(depth = 0) {
    const r = [];
    r.push(`Depth: ${this.#depth} Max: ${this.#maxDepth}`);
    for (const [key, value] of this.children.entries()) {
      const dumped = value.#dumpToArray(depth + 1);
      r.push(` key: ${key}`);
      for (const d2 of dumped) {
        r.push(` `.repeat(depth + 1) + d2);
      }
    }
    r.push(`Values: (${this.values.length})`);
    for (const v of this.values) {
      r.push(` ${v}`);
    }
    return r.map((line) => ` `.repeat(depth) + line);
  }
  #getChild(value, create) {
    if (value === void 0) throw new Error(`Param 'value' undefined`);
    if (this.#depth === this.#maxDepth) return this;
    if (value.length <= this.#depth) return this;
    const k = value[this.#depth];
    if (k === void 0) throw new Error(`Logic error. Depth: ${this.#depth} Len: ${value.length}`);
    let child = this.children.get(k);
    if (child === void 0 && create) {
      child = new _MassiveSet(this.#maxDepth, this.#depth + 1);
      this.children.set(k, child);
    }
    return child;
  }
  /**
   * Returns _true_ if `value` stored on this node
   * @param value 
   * @returns 
   */
  hasLocal(value) {
    for (const v of this.values) {
      if (v === value) return true;
    }
    return false;
  }
  has(value) {
    if (typeof value !== `string`) return false;
    const destination = this.#getChild(value, false);
    if (destination === void 0) return false;
    if (destination === this) return this.hasLocal(value);
    return destination.has(value);
  }
};

// node_modules/ixfx/dist/chunk-GISMJX5E.js
var guardArray = (array, name2 = `?`) => {
  if (array === void 0) {
    throw new TypeError(`Param '${name2}' is undefined. Expected array.`);
  }
  if (array === null) {
    throw new TypeError(`Param '${name2}' is null. Expected array.`);
  }
  if (!Array.isArray(array)) {
    throw new TypeError(`Param '${name2}' not an array as expected`);
  }
};

// node_modules/ixfx/dist/chunk-AGCCB7IA.js
var sortByNumericProperty = (data, propertyName) => [...data].sort((a2, b2) => {
  guardArray(data, `data`);
  const av = a2[propertyName];
  const bv = b2[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});

// node_modules/ixfx/dist/chunk-KN7UFPTB.js
var wrap = (v, min2 = 0, max3 = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min2, ``, `min`);
  throwNumberTest(max3, ``, `max`);
  if (v === min2) return min2;
  if (v === max3) return min2;
  while (v <= min2 || v >= max3) {
    if (v === max3) break;
    if (v === min2) break;
    if (v > max3) {
      v = min2 + (v - max3);
    } else if (v < min2) {
      v = max3 - (min2 - v);
    }
  }
  return v;
};

// node_modules/ixfx/dist/chunk-ZJSCF2A4.js
var clamp = (value, min2 = 0, max3 = 1) => {
  if (Number.isNaN(value)) throw new Error(`'value' parameter is NaN`);
  if (Number.isNaN(min2)) throw new Error(`'min' parameter is NaN`);
  if (Number.isNaN(max3)) throw new Error(`'max' parameter is NaN`);
  if (value < min2) return min2;
  if (value > max3) return max3;
  return value;
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) {
    throw new TypeError(`v parameter must be an integer (${v})`);
  }
  const length5 = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length5)) {
    throw new TypeError(
      `length parameter must be an integer (${length5}, ${typeof length5})`
    );
  }
  v = Math.round(v);
  if (v < 0) return 0;
  if (v >= length5) return length5 - 1;
  return v;
};

// node_modules/ixfx/dist/chunk-GHCV5Z5H.js
var scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
var scaler = (inMin, inMax, outMin, outMax, easing) => {
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a2 = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a2 = easing(a2);
    return a2 * (oMax - oMin) + oMin;
  };
};

// node_modules/ixfx/dist/chunk-5VWJ6TUI.js
var defaultRandom = Math.random;

// node_modules/ixfx/dist/chunk-7U6QARGK.js
var string = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? defaultRandom;
  return calculate().toString(36).slice(2, length + 2);
};

// node_modules/ixfx/dist/chunk-F3LKPXTP.js
var Text_exports = {};
__export2(Text_exports, {
  abbreviate: () => abbreviate,
  afterMatch: () => afterMatch,
  beforeAfterMatch: () => beforeAfterMatch,
  beforeMatch: () => beforeMatch,
  between: () => between,
  betweenChomp: () => betweenChomp,
  countCharsFromStart: () => countCharsFromStart,
  htmlEntities: () => htmlEntities,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  random: () => string,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  toStringAbbreviate: () => toStringAbbreviate,
  unwrap: () => unwrap,
  wildcard: () => wildcard
});
var abbreviate = (source, maxLength = 15) => {
  throwFromResult(integerTest(maxLength, `aboveZero`, `maxLength`));
  if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
  if (source.length > maxLength && source.length > 3) {
    if (maxLength > 15) {
      const chunk = Math.round((maxLength - 2) / 2);
      return source.slice(0, chunk) + `...` + source.slice(-chunk);
    }
    return source.slice(0, maxLength) + `...`;
  }
  return source;
};
var toStringAbbreviate = (source, maxLength = 20) => {
  if (source === void 0) return `(undefined)`;
  if (source === null) return `(null)`;
  return abbreviate(JSON.stringify(source), maxLength);
};
var between = (source, start, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start);
  if (startPos < 0) return;
  if (end === void 0) end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0) return;
  return source.slice(startPos + 1, endPos);
};
var betweenChomp = (source, start, end, lastEndMatch = true) => {
  if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
  if (typeof start !== `string`) throw new Error(`Parameter 'start' is not a string`);
  if (end !== void 0 && typeof end !== `string`) throw new Error(`Parameter 'end' is not a string`);
  const startPos = source.indexOf(start);
  if (startPos < 0) return [source, void 0];
  if (end === void 0) end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0) return [source, void 0];
  const between2 = source.slice(startPos + 1, endPos);
  const sourceResult = source.slice(0, startPos) + source.slice(endPos + 1);
  return [sourceResult, between2];
};
var indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
  for (let index = start; index <= end; index++) {
    if (source.codePointAt(index) === code) return index;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.slice(0, removeStart) + source.slice(removeStart + removeLength);
var splitByLength = (source, length5) => {
  throwFromResult(integerTest(length5, `aboveZero`, `length`));
  if (source === null) throw new Error(`source parameter null`);
  if (typeof source !== `string`) {
    throw new TypeError(`source parameter not a string`);
  }
  const chunks = Math.ceil(source.length / length5);
  const returnValue = [];
  let start = 0;
  for (let c4 = 0; c4 < chunks; c4++) {
    returnValue.push(source.slice(start, start + length5));
    start += length5;
  }
  return returnValue;
};
var beforeMatch = (source, match, options = {}) => {
  const ba = beforeAfterMatch(source, match, options);
  return ba[0];
};
var afterMatch = (source, match, options = {}) => {
  const ba = beforeAfterMatch(source, match, options);
  return ba[1];
};
var beforeAfterMatch = (source, match, options = {}) => {
  if (source === void 0) throw new Error(`Param 'source' is undefined`);
  let fallback = options.fallback;
  const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
  if (ifNoMatch === `original`) fallback = source;
  if (ifNoMatch === `fallback` && fallback === void 0) throw new Error(`Fallback must be provided`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m3 = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m3 < 0 && ifNoMatch === `throw`) throw new Error(`Match '${match}' not found in source.`);
  if (m3 < 0 && ifNoMatch === `original`) return [source, source];
  if (m3 < 0 && ifNoMatch === `fallback`) {
    return [fallback, fallback];
  }
  return [
    source.slice(0, m3),
    source.slice(Math.max(0, m3 + match.length))
  ];
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.slice(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start, end) => {
  let s = -1;
  let endPos = -1;
  for (const [index, r] of ranges.entries()) {
    s = index;
    if (r.text.length === 0) continue;
    if (start < r.end) {
      break;
    }
  }
  for (let index = s; index < ranges.length; index++) {
    const r = ranges[index];
    endPos = index;
    if (end === r.end) {
      endPos = index + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: endPos - s, start: s, end: endPos };
};
var splitRanges = (source, split) => {
  let start = 0;
  let text = ``;
  const ranges = [];
  let index = 0;
  for (let i = 0; i < source.length; i++) {
    if (source.indexOf(split, i) === i) {
      const end = i;
      ranges.push({
        text,
        start,
        end,
        index
      });
      start = end + 1;
      text = ``;
      index++;
    } else {
      text += source.charAt(i);
    }
  }
  if (start < source.length) {
    ranges.push({ text, start, index, end: source.length });
  }
  return ranges;
};
var countCharsFromStart = (source, ...chars) => {
  let counted = 0;
  for (let index = 0; index < source.length; index++) {
    if (chars.includes(source.charAt(index))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start, end = start) => source.startsWith(start) && source.endsWith(end);
var htmlEntities = (source) => source.replaceAll(/[&<>\u00A0-\u9999]/g, (index) => `&#${index.codePointAt(0)};`);
var wildcard = (pattern) => {
  const escapeRegex = (value) => value.replaceAll(/([!$()*+./:=?[\\\]^{|}])/g, `\\$1`);
  pattern = pattern.split(`*`).map((m3) => escapeRegex(m3)).join(`.*`);
  pattern = `^` + pattern + `$`;
  const regex = new RegExp(pattern);
  return (value) => {
    return regex.test(value);
  };
};

// node_modules/ixfx/dist/chunk-5XZFO6U6.js
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
  for (; start > 0; start--, end--) iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}
var guardIndex = (array, index, name2 = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name2);
  if (index > array.length - 1) {
    throw new Error(
      `'${name2}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};
function* filterBetween(array, predicate, startIndex, endIndex) {
  guardArray(array);
  if (typeof startIndex === `undefined`) startIndex = 0;
  if (typeof endIndex === `undefined`) endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array)) yield array[index];
  }
}
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0) throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total2 = 0;
      let min2 = Number.MAX_SAFE_INTEGER;
      let max3 = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total2 += v;
        samples++;
        min2 = Math.min(min2, v);
        max3 = Math.max(max3, v);
      }
      return {
        avg: total2 / samples,
        total: total2,
        max: max3,
        min: min2
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers = [...filterBetween(
    data,
    (d2) => typeof d2 === `number` && !Number.isNaN(d2),
    startIndex,
    endIndex
  )];
  const total = validNumbers.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

// node_modules/ixfx/dist/chunk-ZVECQWBZ.js
var isFunction = (object) => object instanceof Function;
var functionTest = (value, parameterName = `?`) => {
  if (value === void 0) return [false, `Param '${parameterName}' is undefined. Expected: function.`];
  if (value === null) return [false, `Param '${parameterName}' is null. Expected: function.`];
  if (typeof value !== `function`) return [false, `Param '${parameterName}' is type '${typeof value}'. Expected: function`];
  return [true];
};
var throwFunctionTest = (value, parameterName = `?`) => {
  const [ok, msg] = functionTest(value, parameterName);
  if (ok) return;
  throw new TypeError(msg);
};
var stringTest = (value, range2 = ``, parameterName = `?`) => {
  if (typeof value !== `string`) return [false, `Param '${parameterName} is not type string. Got: ${typeof value}`];
  switch (range2) {
    case `non-empty`:
      if (value.length === 0) return [false, `Param '${parameterName} is empty`];
      break;
  }
  return [true];
};
var throwStringTest = (value, range2 = ``, parameterName = `?`) => {
  throwFromResult(stringTest(value, range2, parameterName));
};

// node_modules/ixfx/dist/chunk-QCJFJKA3.js
var guards_exports = {};
__export2(guards_exports, {
  arrayTest: () => arrayTest,
  defined: () => defined,
  functionTest: () => functionTest,
  ifNaN: () => ifNaN,
  integerParse: () => integerParse,
  integerTest: () => integerTest,
  isFunction: () => isFunction,
  isPlainObject: () => isPlainObject,
  isPlainObjectOrPrimitive: () => isPlainObjectOrPrimitive,
  isPowerOfTwo: () => isPowerOfTwo,
  isStringArray: () => isStringArray,
  nullUndef: () => nullUndef,
  numberTest: () => numberTest,
  percentTest: () => percentTest,
  stringTest: () => stringTest,
  throwArrayTest: () => throwArrayTest,
  throwFromResult: () => throwFromResult,
  throwFunctionTest: () => throwFunctionTest,
  throwIntegerTest: () => throwIntegerTest,
  throwNullUndef: () => throwNullUndef,
  throwNumberTest: () => throwNumberTest,
  throwPercentTest: () => throwPercentTest,
  throwStringTest: () => throwStringTest
});
var arrayTest = (value, parameterName = `?`) => {
  if (!Array.isArray(value)) {
    return [false, `Parameter '${parameterName}' is expected to be an array'`];
  }
  return [true];
};
var throwArrayTest = (value, parameterName = `?`) => {
  throwFromResult(arrayTest(value, parameterName));
};
var isStringArray = (value) => {
  if (!Array.isArray(value)) return false;
  return !value.some((v) => typeof v !== `string`);
};
var nullUndef = (value, parameterName = `?`) => {
  if (typeof value === `undefined`) {
    return [false, `${parameterName} param is undefined`];
  }
  if (value === null) return [false, `${parameterName} param is null`];
  return [true];
};
var throwNullUndef = (value, parameterName = `?`) => {
  const r = nullUndef(value, parameterName);
  if (r[0]) return;
  throw new Error(r[1]);
};
var defined = (argument) => argument !== void 0;
var isPlainObject = (value) => {
  if (typeof value !== `object` || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
var isPlainObjectOrPrimitive = (value) => {
  const t2 = typeof value;
  if (t2 === `symbol`) return false;
  if (t2 === `function`) return false;
  if (t2 === `bigint`) return true;
  if (t2 === `number`) return true;
  if (t2 === `string`) return true;
  if (t2 === `boolean`) return true;
  return isPlainObject(value);
};

// node_modules/ixfx/dist/chunk-HOGLR6UM.js
var mapKeys = (object, mapFunction) => {
  const destinationObject = {};
  for (const entries of Object.entries(object)) {
    const key = mapFunction(entries[0]);
    destinationObject[key] = entries[1];
  }
  return destinationObject;
};

// node_modules/ixfx/dist/chunk-F6WHOKNI.js
var util_exports = {};
__export2(util_exports, {
  Guards: () => guards_exports,
  comparerInverse: () => comparerInverse,
  defaultComparer: () => defaultComparer,
  defaultToString: () => defaultToString,
  getSorter: () => getSorter,
  isEqualDefault: () => isEqualDefault,
  isEqualTrace: () => isEqualTrace,
  isEqualValueDefault: () => isEqualValueDefault,
  isEqualValueIgnoreOrder: () => isEqualValueIgnoreOrder,
  isEqualValuePartial: () => isEqualValuePartial,
  isInteger: () => isInteger,
  isMap: () => isMap,
  isSet: () => isSet,
  jsComparer: () => jsComparer,
  mapKeys: () => mapKeys,
  minMaxAvg: () => minMaxAvg2,
  numericComparer: () => numericComparer,
  runningiOS: () => runningiOS,
  throwResult: () => throwResult,
  toStringDefault: () => toStringDefault,
  toStringOrdered: () => toStringOrdered
});
var numericComparer = (x, y) => {
  if (x === y) return 0;
  if (x > y) return 1;
  return -1;
};
var jsComparer = (x, y) => {
  if (x === void 0 && y === void 0) return 0;
  if (x === void 0) return 1;
  if (y === void 0) return -1;
  const xString = defaultToString(x);
  const yString = defaultToString(y);
  if (xString < yString) return -1;
  if (xString > yString) return 1;
  return 0;
};
var comparerInverse = (comparer) => {
  return (x, y) => {
    const v = comparer(x, y);
    return v * -1;
  };
};
var defaultComparer = (x, y) => {
  if (typeof x === `number` && typeof y === `number`) {
    return numericComparer(x, y);
  }
  return jsComparer(x, y);
};
var isEqualTrace = (eq) => {
  return (a2, b2) => {
    const result = eq(a2, b2);
    console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a2)} b: ${toStringAbbreviate(b2)}`);
    return result;
  };
};
var isInteger = (value) => {
  if (value === void 0) return false;
  if (typeof value === `string`) {
    const v = Number.parseInt(value);
    if (Number.isNaN(v)) return false;
    if (v.toString() === value.toString()) return true;
    return false;
  }
  if (typeof value === `number`) {
    if (Number.isNaN(value)) return false;
    if (!Number.isFinite(value)) return false;
    if (Math.round(value) === value) return true;
    return false;
  }
  return false;
};
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || // iPad on iOS 13 detection
navigator.userAgent.includes(`Mac`) && `ontouchend` in document;
function throwResult(result) {
  if (result.success) return true;
  if (typeof result.error === `string`) throw new Error(result.error);
  throw result.error;
}
var sorterByValueIndex = (index, reverse = false) => {
  return (values) => {
    const s = values.toSorted((a2, b2) => {
      return defaultComparer(a2[index], b2[index]);
    });
    if (reverse) return s.reverse();
    return s;
  };
};
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`: {
      return sorterByValueIndex(1, false);
    }
    case `value-reverse`: {
      return sorterByValueIndex(1, true);
    }
    case `key`: {
      return sorterByValueIndex(0, false);
    }
    case `key-reverse`: {
      return sorterByValueIndex(0, true);
    }
    default: {
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
    }
  }
};
var minMaxAvg2 = (entries, conversionFunction) => {
  const converter = conversionFunction ?? ((v) => v[1]);
  const values = entries.map((entry) => converter(entry));
  return minMaxAvg(values);
};

// node_modules/ixfx/dist/chunk-XN3FNKKY.js
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length) {
    throw new Error(`Keys and values arrays should be same length`);
  }
  return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};

// node_modules/ixfx/dist/chunk-HKC65PTS.js
var randomElement = (array, rand = Math.random) => {
  guardArray(array, `array`);
  return array[Math.floor(rand() * array.length)];
};

// node_modules/ixfx/dist/chunk-H3AVG2VJ.js
var geometry_exports = {};
__export2(geometry_exports, {
  Arcs: () => arc_exports,
  Beziers: () => bezier_exports,
  Circles: () => circle_exports,
  Compound: () => CompoundPath_exports,
  Convolve2d: () => Convolve2d_exports,
  CurveSimplification: () => CurveSimplification_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => Grid_exports,
  Layouts: () => Layout_exports,
  Lines: () => line_exports,
  Paths: () => path_exports,
  Points: () => point_exports,
  Polar: () => Polar_exports,
  QuadTree: () => QuadTree_exports,
  Rects: () => rect_exports,
  Scaler: () => Scaler_exports,
  Shapes: () => shape_exports,
  SurfacePoints: () => SurfacePoints_exports,
  Triangles: () => triangle_exports,
  Vectors: () => Vector_exports,
  Waypoints: () => Waypoint_exports,
  degreeToRadian: () => degreeToRadian,
  radianInvert: () => radianInvert,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});
var Waypoint_exports = {};
__export2(Waypoint_exports, {
  fromPoints: () => fromPoints2,
  init: () => init
});
var joinPointsToLines = (...points2) => {
  const lines = [];
  let start = points2[0];
  for (let index = 1; index < points2.length; index++) {
    lines.push(fromPoints(start, points2[index]));
    start = points2[index];
  }
  return lines;
};
var isLine = (p2) => {
  if (p2 === void 0) return false;
  if (p2.a === void 0) return false;
  if (p2.b === void 0) return false;
  if (!isPoint(p2.a)) return false;
  if (!isPoint(p2.b)) return false;
  return true;
};
var isPolyLine = (p2) => {
  if (!Array.isArray(p2)) return false;
  const valid = !p2.some((v) => !isLine(v));
  return valid;
};
var guard2 = (line, name2 = `line`) => {
  if (line === void 0) throw new Error(`${name2} undefined`);
  if (line.a === void 0) throw new Error(`${name2}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`);
  if (line.b === void 0) throw new Error(`${name2}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`);
};
var getPointParameter = (aOrLine, b2) => {
  let a2;
  if (isLine(aOrLine)) {
    b2 = aOrLine.b;
    a2 = aOrLine.a;
  } else {
    a2 = aOrLine;
    if (b2 === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a2)} b: ${JSON.stringify(b2)}`);
  }
  guard(a2, `a`);
  guard(a2, `b`);
  return [a2, b2];
};
function length2(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum5 = aOrLine.reduce((accumulator, v) => length2(v) + accumulator, 0);
    return sum5;
  }
  if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
  const [a2, b2] = getPointParameter(aOrLine, pointB);
  const x = b2.x - a2.x;
  const y = b2.y - a2.y;
  if (a2.z !== void 0 && b2.z !== void 0) {
    const z = b2.z - a2.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}
function interpolate(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow) throwPercentTest(amount, `amount`);
  else throwNumberTest(amount, ``, `amount`);
  const [a2, b2] = getPointParameter(aOrLine, pointBOrAllowOverflow);
  const d2 = length2(a2, b2);
  const d22 = d2 * (1 - amount);
  if (d2 === 0 && d22 === 0) return Object.freeze({ ...b2 });
  const x = b2.x - d22 * (b2.x - a2.x) / d2;
  const y = b2.y - d22 * (b2.y - a2.y) / d2;
  return Object.freeze({
    ...b2,
    x,
    y
  });
}
var directionVector = (line) => ({
  x: line.b.x - line.a.x,
  y: line.b.y - line.a.y
});
var directionVectorNormalised = (line) => {
  const l = length2(line);
  const v = directionVector(line);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var parallel = (line, distance32) => {
  const dv = directionVector(line);
  const dvn = directionVectorNormalised(line);
  const a2 = {
    x: line.a.x - dvn.y * distance32,
    y: line.a.y + dvn.x * distance32
  };
  return {
    a: a2,
    b: {
      x: a2.x + dv.x,
      y: a2.y + dv.y
    }
  };
};
var perpendicularPoint = (line, distance32, amount = 0) => {
  const origin = interpolate(amount, line);
  const dvn = directionVectorNormalised(line);
  return {
    x: origin.x - dvn.y * distance32,
    y: origin.y + dvn.x * distance32
  };
};
var midpoint = (aOrLine, pointB) => {
  const [a2, b2] = getPointParameter(aOrLine, pointB);
  return interpolate(0.5, a2, b2);
};
var line_exports = {};
__export2(line_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder2,
  angleRadian: () => angleRadian2,
  apply: () => apply2,
  asPoints: () => asPoints,
  bbox: () => bbox2,
  distance: () => distance2,
  distanceSingleLine: () => distanceSingleLine,
  divide: () => divide2,
  extendFromA: () => extendFromA,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers,
  fromPivot: () => fromPivot,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointParameter: () => getPointParameter,
  guard: () => guard2,
  interpolate: () => interpolate,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual2,
  isLine: () => isLine,
  isPlaceholder: () => isPlaceholder3,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length2,
  midpoint: () => midpoint,
  multiply: () => multiply3,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect2,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  pointAtX: () => pointAtX,
  pointsOf: () => pointsOf,
  relativePosition: () => relativePosition,
  rotate: () => rotate3,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract2,
  sum: () => sum2,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString3,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange2
});
var guardDim = (d2, name2 = `Dimension`) => {
  if (d2 === void 0) throw new Error(`${name2} is undefined`);
  if (Number.isNaN(d2)) throw new Error(`${name2} is NaN`);
  if (d2 < 0) throw new Error(`${name2} cannot be negative`);
};
var guard3 = (rect, name2 = `rect`) => {
  if (rect === void 0) throw new Error(`{$name} undefined`);
  if (isPositioned(rect)) guard(rect, name2);
  guardDim(rect.width, name2 + `.width`);
  guardDim(rect.height, name2 + `.height`);
};
var getRectPositioned = (rect, origin) => {
  guard3(rect);
  if (isPositioned(rect) && origin === void 0) {
    return rect;
  }
  if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
  return Object.freeze({ ...rect, ...origin });
};
var guardPositioned = (rect, name2 = `rect`) => {
  if (!isPositioned(rect)) throw new Error(`Expected ${name2} to have x,y`);
  guard3(rect, name2);
};
var isEmpty2 = (rect) => rect.width === 0 && rect.height === 0;
var isPlaceholder2 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
var isPositioned = (rect) => rect.x !== void 0 && rect.y !== void 0;
var isRect = (rect) => {
  if (rect === void 0) return false;
  if (rect.width === void 0) return false;
  if (rect.height === void 0) return false;
  return true;
};
var isRectPositioned = (rect) => isRect(rect) && isPositioned(rect);
function normaliseByRect(a2, b2, c4, d2) {
  if (isPoint(a2)) {
    if (typeof b2 === `number` && c4 !== void 0) {
      throwNumberTest(b2, `positive`, `width`);
      throwNumberTest(c4, `positive`, `height`);
    } else {
      if (!isRect(b2)) {
        throw new Error(`Expected second parameter to be a rect`);
      }
      c4 = b2.height;
      b2 = b2.width;
    }
    return Object.freeze({
      x: a2.x / b2,
      y: a2.y / c4
    });
  } else {
    throwNumberTest(a2, `positive`, `x`);
    if (typeof b2 !== `number`) {
      throw new TypeError(`Expecting second parameter to be a number (width)`);
    }
    if (typeof c4 !== `number`) {
      throw new TypeError(`Expecting third parameter to be a number (height)`);
    }
    throwNumberTest(b2, `positive`, `y`);
    throwNumberTest(c4, `positive`, `width`);
    if (d2 === void 0) throw new Error(`Expected height parameter`);
    throwNumberTest(d2, `positive`, `height`);
    return Object.freeze({
      x: a2 / c4,
      y: b2 / d2
    });
  }
}
function getPointParameter2(a2, b2, c4) {
  if (a2 === void 0) return { x: 0, y: 0 };
  if (Array.isArray(a2)) {
    if (a2.length === 0) return Object.freeze({ x: 0, y: 0 });
    if (a2.length === 1) return Object.freeze({ x: a2[0], y: 0 });
    if (a2.length === 2) return Object.freeze({ x: a2[0], y: a2[1] });
    if (a2.length === 3) return Object.freeze({ x: a2[0], y: a2[1], z: a2[2] });
    throw new Error(
      `Expected array to be 1-3 elements in length. Got ${a2.length}.`
    );
  }
  if (isPoint(a2)) {
    return a2;
  } else if (typeof a2 !== `number` || typeof b2 !== `number`) {
    throw new TypeError(
      `Expected point or x,y as parameters. Got: a: ${JSON.stringify(
        a2
      )} b: ${JSON.stringify(b2)}`
    );
  }
  if (typeof c4 === `number`) {
    return Object.freeze({ x: a2, y: b2, z: c4 });
  }
  return Object.freeze({ x: a2, y: b2 });
}
function distance(a2, xOrB, y, z) {
  const pt = getPointParameter2(xOrB, y, z);
  guard(pt, `b`);
  guard(a2, `a`);
  return isPoint3d(pt) && isPoint3d(a2) ? Math.hypot(pt.x - a2.x, pt.y - a2.y, pt.z - a2.z) : Math.hypot(pt.x - a2.x, pt.y - a2.y);
}
var nearest = (line, point22) => {
  const n2 = (line2) => {
    const { a: a2, b: b2 } = line2;
    const atob = { x: b2.x - a2.x, y: b2.y - a2.y };
    const atop = { x: point22.x - a2.x, y: point22.y - a2.y };
    const length5 = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    const t2 = Math.min(1, Math.max(0, dot / length5));
    dot = (b2.x - a2.x) * (point22.y - a2.y) - (b2.y - a2.y) * (point22.x - a2.x);
    return { x: a2.x + atob.x * t2, y: a2.y + atob.y * t2 };
  };
  if (Array.isArray(line)) {
    const pts = line.map((l) => n2(l));
    const dists = pts.map((p2) => distance(p2, point22));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n2(line));
  }
};
var distanceSingleLine = (line, point22) => {
  guard2(line, `line`);
  guard(point22, `point`);
  if (length2(line) === 0) {
    return length2(line.a, point22);
  }
  const near = nearest(line, point22);
  return length2(near, point22);
};
var findMinimum = (comparer, ...points2) => {
  if (points2.length === 0) throw new Error(`No points provided`);
  let min2 = points2[0];
  for (const p2 of points2) {
    min2 = comparer(min2, p2);
  }
  return min2;
};
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y) {
    throw new Error(`topLeft.y greater than bottomRight.y`);
  }
  if (topLeft.y > bottomLeft.y) {
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  }
  const w1 = topRight.x - topLeft.x;
  const w2 = bottomRight.x - bottomLeft.x;
  const h1 = Math.abs(bottomLeft.y - topLeft.y);
  const h2 = Math.abs(bottomRight.y - topRight.y);
  return {
    x: Math.min(topLeft.x, bottomLeft.x),
    y: Math.min(topRight.y, topLeft.y),
    width: Math.max(w1, w2),
    height: Math.max(h1, h2)
  };
};
var bbox = (...points2) => {
  const leftMost = findMinimum((a2, b2) => {
    return a2.x < b2.x ? a2 : b2;
  }, ...points2);
  const rightMost = findMinimum((a2, b2) => {
    return a2.x > b2.x ? a2 : b2;
  }, ...points2);
  const topMost = findMinimum((a2, b2) => {
    return a2.y < b2.y ? a2 : b2;
  }, ...points2);
  const bottomMost = findMinimum((a2, b2) => {
    return a2.y > b2.y ? a2 : b2;
  }, ...points2);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};
var bbox2 = (line) => bbox(line.a, line.b);
function divide(a2, b2, c4, d2) {
  if (isPoint(a2)) {
    guard(a2, `a`);
    if (isPoint(b2)) {
      return Object.freeze({
        x: a2.x / b2.x,
        y: a2.y / b2.y
      });
    } else if (isRect(b2)) {
      guard3(b2, `rect`);
      return Object.freeze({
        x: a2.x / b2.width,
        y: a2.y / b2.height
      });
    } else {
      if (c4 === void 0) c4 = b2;
      guard(a2);
      throwNumberTest(b2, `nonZero`, `x`);
      throwNumberTest(c4, `nonZero`, `y`);
      return Object.freeze({
        x: a2.x / b2,
        y: a2.y / c4
      });
    }
  } else {
    if (typeof b2 !== `number`) {
      throw new TypeError(`expected second parameter to be y1 coord`);
    }
    throwNumberTest(a2, `positive`, `x1`);
    throwNumberTest(b2, `positive`, `y1`);
    if (c4 === void 0) c4 = 1;
    if (d2 === void 0) d2 = c4;
    throwNumberTest(c4, `nonZero`, `x2`);
    throwNumberTest(d2, `nonZero`, `y2`);
    return Object.freeze({
      x: a2 / c4,
      y: b2 / d2
    });
  }
}
function divider(a2, b2, c4) {
  const divisor = getPointParameter2(a2, b2, c4);
  guardNonZeroPoint(divisor, `divisor`);
  return (aa, bb, cc) => {
    const dividend = getPointParameter2(aa, bb, cc);
    return typeof dividend.z === `undefined` ? Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y
    }) : Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y,
      z: dividend.z / (divisor.z ?? 1)
    });
  };
}
var divide2 = (line, point22) => Object.freeze({
  ...line,
  a: divide(line.a, point22),
  b: divide(line.b, point22)
});
var fromFlatArray = (array) => {
  if (!Array.isArray(array)) throw new Error(`arr parameter is not an array`);
  if (array.length !== 4) throw new Error(`array is expected to have length four`);
  return fromNumbers(array[0], array[1], array[2], array[3]);
};
var Polar_exports = {};
__export2(Polar_exports, {
  clampMagnitude: () => clampMagnitude,
  divide: () => divide3,
  dotProduct: () => dotProduct2,
  fromCartesian: () => fromCartesian,
  guard: () => guard4,
  invert: () => invert,
  isAntiParallel: () => isAntiParallel,
  isOpposite: () => isOpposite,
  isParallel: () => isParallel,
  isPolarCoord: () => isPolarCoord,
  multiply: () => multiply,
  normalise: () => normalise,
  rotate: () => rotate,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian,
  toPoint: () => toPoint,
  toString: () => toString
});
function degreeToRadian(angleInDegrees) {
  return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
function radianInvert(angleInRadians) {
  return (angleInRadians + Math.PI) % (2 * Math.PI);
}
function radianToDegree(angleInRadians) {
  return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
var radiansFromAxisX = (point22) => Math.atan2(point22.x, point22.y);
function subtract(a2, b2, c4, d2) {
  if (isPoint(a2)) {
    guard(a2, `a`);
    if (isPoint(b2)) {
      guard(b2, `b`);
      return Object.freeze({
        ...a2,
        x: a2.x - b2.x,
        y: a2.y - b2.y
      });
    } else {
      if (c4 === void 0) c4 = b2;
      return Object.freeze({
        ...a2,
        x: a2.x - b2,
        y: a2.y - c4
      });
    }
  } else {
    throwNumberTest(a2, ``, `a`);
    if (typeof b2 !== `number`) {
      throw new TypeError(`Second parameter is expected to by y value`);
    }
    throwNumberTest(b2, ``, `b`);
    if (Number.isNaN(c4)) throw new Error(`Third parameter is NaN`);
    if (Number.isNaN(d2)) throw new Error(`Fourth parameter is NaN`);
    if (c4 === void 0) c4 = 0;
    if (d2 === void 0) d2 = 0;
    return Object.freeze({
      x: a2 - c4,
      y: b2 - d2
    });
  }
}
var Empty = { x: 0, y: 0 };
var EmptyCartesian = Object.freeze({ x: 0, y: 0 });
var isPolarCoord = (p2) => {
  if (p2.distance === void 0) return false;
  if (p2.angleRadian === void 0) return false;
  return true;
};
var fromCartesian = (point22, origin) => {
  point22 = subtract(point22, origin);
  const angle = Math.atan2(point22.y, point22.x);
  return Object.freeze({
    ...point22,
    angleRadian: angle,
    distance: Math.hypot(point22.x, point22.y)
  });
};
var toCartesian = (a2, b2, c4) => {
  if (isPolarCoord(a2)) {
    if (b2 === void 0) b2 = Empty;
    if (isPoint(b2)) {
      return polarToCartesian(a2.distance, a2.angleRadian, b2);
    }
    throw new Error(
      `Expecting (Coord, Point). Second parameter is not a point`
    );
  } else if (typeof a2 === `object`) {
    throw new TypeError(
      `First param is an object, but not a Coord: ${JSON.stringify(a2)}`
    );
  } else {
    if (typeof a2 === `number` && typeof b2 === `number`) {
      if (c4 === void 0) c4 = Empty;
      if (!isPoint(c4)) {
        throw new Error(
          `Expecting (number, number, Point). Point param wrong type`
        );
      }
      return polarToCartesian(a2, b2, c4);
    } else {
      throw new TypeError(
        `Expecting parameters of (number, number). Got: (${typeof a2}, ${typeof b2}, ${typeof c4}). a: ${JSON.stringify(
          a2
        )}`
      );
    }
  }
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a2 = smoothness * step++;
    yield {
      distance: zoom * a2,
      angleRadian: a2,
      step
    };
  }
}
var rotate = (c4, amountRadian) => Object.freeze({
  ...c4,
  angleRadian: c4.angleRadian + amountRadian
});
var normalise = (c4) => {
  if (c4.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c4,
    distance: 1
  });
};
var guard4 = (p2, name2 = `Point`) => {
  if (p2 === void 0) {
    throw new Error(
      `'${name2}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (p2 === null) {
    throw new Error(
      `'${name2}' is null. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (p2.angleRadian === void 0) {
    throw new Error(
      `'${name2}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (p2.distance === void 0) {
    throw new Error(
      `'${name2}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (typeof p2.angleRadian !== `number`) {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `'${name2}.angleRadian' must be a number. Got ${p2.angleRadian}`
    );
  }
  if (typeof p2.distance !== `number`) {
    throw new TypeError(`'${name2}.distance' must be a number. Got ${p2.distance}`);
  }
  if (p2.angleRadian === null) throw new Error(`'${name2}.angleRadian' is null`);
  if (p2.distance === null) throw new Error(`'${name2}.distance' is null`);
  if (Number.isNaN(p2.angleRadian)) {
    throw new TypeError(`'${name2}.angleRadian' is NaN`);
  }
  if (Number.isNaN(p2.distance)) throw new Error(`'${name2}.distance' is NaN`);
};
var dotProduct2 = (a2, b2) => {
  guard4(a2, `a`);
  guard4(b2, `b`);
  return a2.distance * b2.distance * Math.cos(b2.angleRadian - a2.angleRadian);
};
var invert = (p2) => {
  guard4(p2, `c`);
  return Object.freeze({
    ...p2,
    angleRadian: p2.angleRadian - Math.PI
  });
};
var isOpposite = (a2, b2) => {
  guard4(a2, `a`);
  guard4(b2, `b`);
  if (a2.distance !== b2.distance) return false;
  return a2.angleRadian === -b2.angleRadian;
};
var isParallel = (a2, b2) => {
  guard4(a2, `a`);
  guard4(b2, `b`);
  return a2.angleRadian === b2.angleRadian;
};
var isAntiParallel = (a2, b2) => {
  guard4(a2, `a`);
  guard4(b2, `b`);
  return a2.angleRadian === -b2.angleRadian;
};
var rotateDegrees = (c4, amountDeg) => Object.freeze({
  ...c4,
  angleRadian: c4.angleRadian + degreeToRadian(amountDeg)
});
var spiralRaw = (step, smoothness, zoom) => {
  const a2 = smoothness * step;
  return Object.freeze({
    distance: zoom * a2,
    angleRadian: a2
  });
};
var multiply = (v, amt) => {
  guard4(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance * amt
  });
};
var divide3 = (v, amt) => {
  guard4(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance / amt
  });
};
var clampMagnitude = (v, max22 = 1, min2 = 0) => {
  let mag = v.distance;
  if (mag > max22) mag = max22;
  if (mag < min2) mag = min2;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var polarToCartesian = (distance32, angleRadians, origin = Empty) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance32 * Math.cos(angleRadians),
    y: origin.y + distance32 * Math.sin(angleRadians)
  });
};
var toString = (p2, digits) => {
  if (p2 === void 0) return `(undefined)`;
  if (p2 === null) return `(null)`;
  const angleDeg = radianToDegree(p2.angleRadian);
  const d2 = digits ? p2.distance.toFixed(digits) : p2.distance;
  const a2 = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d2},${a2})`;
};
var toPoint = (v, origin = EmptyCartesian) => {
  guard4(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};
var fromPivot = (origin = { x: 0.5, y: 0.5 }, length5 = 1, angleRadian3 = 0, balance = 0.5) => {
  const left = length5 * balance;
  const right = length5 * (1 - balance);
  const a2 = toCartesian(left, radianInvert(angleRadian3), origin);
  const b2 = toCartesian(right, angleRadian3, origin);
  return Object.freeze({
    a: a2,
    b: b2
  });
};
var fromPointsToPath = (a2, b2) => toPath(fromPoints(a2, b2));
var isEqual = (...p2) => {
  if (p2 === void 0) throw new Error(`parameter 'p' is undefined`);
  if (p2.length < 2) return true;
  for (let index = 1; index < p2.length; index++) {
    if (p2[index].x !== p2[0].x) return false;
    if (p2[index].y !== p2[0].y) return false;
  }
  return true;
};
var isEqual2 = (a2, b2) => isEqual(a2.a, b2.a) && isEqual(a2.b, b2.b);
var point_exports = {};
__export2(point_exports, {
  Empty: () => Empty,
  Placeholder: () => Placeholder,
  abs: () => abs,
  angleRadian: () => angleRadian,
  apply: () => apply,
  bbox: () => bbox,
  centroid: () => centroid,
  clamp: () => clamp2,
  clampMagnitude: () => clampMagnitude2,
  compare: () => compare,
  compareByX: () => compareByX,
  compareByY: () => compareByY,
  convexHull: () => convexHull,
  distance: () => distance,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide,
  divider: () => divider,
  dotProduct: () => dotProduct3,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers2,
  getPointParameter: () => getPointParameter2,
  guard: () => guard,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate2,
  invert: () => invert2,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isNaN: () => isNaN2,
  isNull: () => isNull,
  isPlaceholder: () => isPlaceholder,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  leftmost: () => leftmost,
  multiply: () => multiply2,
  multiplyScalar: () => multiplyScalar,
  normalise: () => normalise2,
  normaliseByRect: () => normaliseByRect,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  progressBetween: () => progressBetween,
  project: () => project,
  quantiseEvery: () => quantiseEvery2,
  random: () => random,
  reduce: () => reduce,
  relation: () => relation,
  rightmost: () => rightmost,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  round: () => round2,
  subtract: () => subtract,
  sum: () => sum,
  toArray: () => toArray,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString2,
  withinRange: () => withinRange,
  wrap: () => wrap2
});
var abs = (pt) => ({
  ...pt,
  x: Math.abs(pt.x),
  y: Math.abs(pt.y)
});
var angleRadian = (a2, b2, c4) => {
  guard(a2, `a`);
  if (b2 === void 0) {
    return Math.atan2(a2.y, a2.x);
  }
  guard(b2, `b`);
  if (c4 === void 0) {
    return Math.atan2(b2.y - a2.y, b2.x - a2.x);
  }
  guard(c4, `c`);
  return Math.atan2(b2.y - a2.y, b2.x - a2.x) - Math.atan2(c4.y - a2.y, c4.x - a2.x);
};
var apply = (pt, fn) => {
  guard(pt, `pt`);
  return Object.freeze({
    ...pt,
    x: fn(pt.x, `x`),
    y: fn(pt.y, `y`)
  });
};
var centroid = (...points2) => {
  if (!Array.isArray(points2)) throw new Error(`Expected list of points`);
  const sum5 = points2.reduce(
    (previous, p2) => {
      if (p2 === void 0) return previous;
      if (Array.isArray(p2)) {
        throw new TypeError(
          `'points' list contains an array. Did you mean: centroid(...myPoints)?`
        );
      }
      if (!isPoint(p2)) {
        throw new Error(
          `'points' contains something which is not a point: ${JSON.stringify(
            p2
          )}`
        );
      }
      return {
        x: previous.x + p2.x,
        y: previous.y + p2.y
      };
    },
    { x: 0, y: 0 }
  );
  return Object.freeze({
    x: sum5.x / points2.length,
    y: sum5.y / points2.length
  });
};
function clamp2(a2, b2, c4, d2) {
  if (isPoint(a2)) {
    if (b2 === void 0) b2 = 0;
    if (c4 === void 0) c4 = 1;
    throwNumberTest(b2, ``, `min`);
    throwNumberTest(c4, ``, `max`);
    return Object.freeze({
      x: clamp(a2.x, b2, c4),
      y: clamp(a2.y, b2, c4)
    });
  } else {
    if (b2 === void 0) throw new Error(`Expected y coordinate`);
    if (c4 === void 0) c4 = 0;
    if (d2 === void 0) d2 = 1;
    throwNumberTest(a2, ``, `x`);
    throwNumberTest(b2, ``, `y`);
    throwNumberTest(c4, ``, `min`);
    throwNumberTest(d2, ``, `max`);
    return Object.freeze({
      x: clamp(a2, c4, d2),
      y: clamp(b2, c4, d2)
    });
  }
}
var compare = (a2, b2) => {
  if (a2.x < b2.x && a2.y < b2.y) return -2;
  if (a2.x > b2.x && a2.y > b2.y) return 2;
  if (a2.x < b2.x || a2.y < b2.y) return -1;
  if (a2.x > b2.x || a2.y > b2.y) return 1;
  if (a2.x === b2.x && a2.x === b2.y) return 0;
  return Number.NaN;
};
var compareByX = (a2, b2) => {
  if (a2.x === b2.x) return 0;
  if (a2.x < b2.x) return -1;
  return 1;
};
var compareByY = (a2, b2) => {
  if (a2.y === b2.y) return 0;
  if (a2.y < b2.y) return -1;
  return 1;
};
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1) return sorted;
  const x = (points2) => {
    const v = [];
    for (const p2 of points2) {
      while (v.length >= 2) {
        const q = v.at(-1);
        const r = v.at(-2);
        if ((q.x - r.x) * (p2.y - r.y) >= (q.y - r.y) * (p2.x - r.x)) {
          v.pop();
        } else break;
      }
      v.push(p2);
    }
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual(lower[0], upper[0])) {
    return upper;
  }
  return [...upper, ...lower];
};
var guard5 = (circle, parameterName = `circle`) => {
  if (isCirclePositioned(circle)) {
    guard(circle, `circle`);
  }
  if (Number.isNaN(circle.radius)) throw new Error(`${parameterName}.radius is NaN`);
  if (circle.radius <= 0) throw new Error(`${parameterName}.radius must be greater than zero`);
};
var guardPositioned2 = (circle, parameterName = `circle`) => {
  if (!isCirclePositioned(circle)) throw new Error(`Expected a positioned circle with x,y`);
  guard5(circle, parameterName);
};
var isNaN22 = (a2) => {
  if (Number.isNaN(a2.radius)) return true;
  if (isCirclePositioned(a2)) {
    if (Number.isNaN(a2.x)) return true;
    if (Number.isNaN(a2.y)) return true;
  }
  return false;
};
var isPositioned2 = (p2) => p2.x !== void 0 && p2.y !== void 0;
var isCircle = (p2) => p2.radius !== void 0;
var isCirclePositioned = (p2) => isCircle(p2) && isPositioned2(p2);
var distanceCenter = (a2, b2) => {
  guardPositioned2(a2, `a`);
  if (isCirclePositioned(b2)) {
    guardPositioned2(b2, `b`);
  }
  return distance(a2, b2);
};
var distanceFromExterior = (a2, b2) => {
  guardPositioned2(a2, `a`);
  if (isCirclePositioned(b2)) {
    return Math.max(0, distanceCenter(a2, b2) - a2.radius - b2.radius);
  } else if (isPoint(b2)) {
    const distribution = distance(a2, b2);
    if (distribution < a2.radius) return 0;
    return distribution;
  } else throw new Error(`Second parameter invalid type`);
};
var isEqual3 = (a2, b2) => {
  if (a2.radius !== b2.radius) return false;
  if (isCirclePositioned(a2) && isCirclePositioned(b2)) {
    if (a2.x !== b2.x) return false;
    if (a2.y !== b2.y) return false;
    if (a2.z !== b2.z) return false;
    return true;
  } else if (!isCirclePositioned(a2) && !isCirclePositioned(b2)) {
  } else return false;
  return false;
};
var sum = function(a2, b2, c4, d2) {
  if (a2 === void 0) throw new TypeError(`a missing`);
  let ptA;
  let ptB;
  if (isPoint(a2)) {
    ptA = a2;
    if (b2 === void 0) b2 = Empty;
    if (isPoint(b2)) {
      ptB = b2;
    } else {
      if (b2 === void 0) throw new Error(`Expects x coordinate`);
      ptB = { x: b2, y: c4 ?? b2 };
    }
  } else if (!isPoint(b2)) {
    if (b2 === void 0) throw new Error(`Expected number as second param`);
    ptA = { x: a2, y: b2 };
    if (c4 === void 0) throw new Error(`Expects x coordiante`);
    ptB = { x: c4, y: d2 ?? 0 };
  }
  if (ptA === void 0) throw new Error(`ptA missing. a: ${JSON.stringify(a2)}`);
  if (ptB === void 0) throw new Error(`ptB missing. b: ${JSON.stringify(b2)}`);
  guard(ptA, `a`);
  guard(ptB, `b`);
  return Object.freeze({
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  });
};
var intersectionLine = (circle, line) => {
  const v1 = {
    x: line.b.x - line.a.x,
    y: line.b.y - line.a.y
  };
  const v2 = {
    x: line.a.x - circle.x,
    y: line.a.y - circle.y
  };
  const b2 = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c4 = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d2 = Math.sqrt(b2 * b2 - 2 * c4 * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
  if (Number.isNaN(d2)) return [];
  const u1 = (b2 - d2) / c4;
  const u2 = (b2 + d2) / c4;
  const returnValue = [];
  if (u1 <= 1 && u1 >= 0) {
    returnValue.push({
      x: line.a.x + v1.x * u1,
      y: line.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    returnValue.push({
      x: line.a.x + v1.x * u2,
      y: line.a.y + v1.y * u2
    });
  }
  return returnValue;
};
var intersections = (a2, b2) => {
  const vector = subtract(b2, a2);
  const centerD = Math.hypot(vector.y, vector.x);
  if (centerD > a2.radius + b2.radius) return [];
  if (centerD < Math.abs(a2.radius - b2.radius)) return [];
  if (isEqual3(a2, b2)) return [];
  const centroidD = (a2.radius * a2.radius - b2.radius * b2.radius + centerD * centerD) / (2 * centerD);
  const centroid32 = {
    x: a2.x + vector.x * centroidD / centerD,
    y: a2.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a2.radius * a2.radius - centroidD * centroidD);
  const intersection = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    sum(centroid32, intersection),
    subtract(centroid32, intersection)
  ];
};
var circleRect = (a2, b2) => {
  const deltaX = a2.x - Math.max(b2.x, Math.min(a2.x, b2.x + b2.width));
  const deltaY = a2.y - Math.max(b2.y, Math.min(a2.y, b2.y + b2.height));
  return deltaX * deltaX + deltaY * deltaY < a2.radius * a2.radius;
};
var circleCircle = (a2, b2) => intersections(a2, b2).length === 2;
function intersectsPoint(rect, a2, b2) {
  guard3(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a2 === `number`) {
    if (b2 === void 0) throw new Error(`x and y coordinate needed`);
    x = a2;
    y = b2;
  } else {
    x = a2.x;
    y = a2.y;
  }
  if (isPositioned(rect)) {
    if (x - rect.x > rect.width || x < rect.x) return false;
    if (y - rect.y > rect.height || y < rect.y) return false;
  } else {
    if (x > rect.width || x < 0) return false;
    if (y > rect.height || y < 0) return false;
  }
  return true;
}
var isIntersecting = (a2, b2) => {
  if (!isRectPositioned(a2)) {
    throw new Error(`a parameter should be RectPositioned`);
  }
  if (isCirclePositioned(b2)) {
    return circleRect(b2, a2);
  } else if (isPoint(b2)) {
    return intersectsPoint(a2, b2);
  }
  throw new Error(`Unknown shape for b: ${JSON.stringify(b2)}`);
};
var center = (rect, origin) => {
  guard3(rect);
  if (origin === void 0 && isPoint(rect)) origin = rect;
  else if (origin === void 0) origin = { x: 0, y: 0 };
  const r = getRectPositioned(rect, origin);
  return Object.freeze({
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  });
};
var Placeholder = Object.freeze({ x: Number.NaN, y: Number.NaN });
var distanceFromExterior2 = (rect, pt) => {
  guardPositioned(rect, `rect`);
  guard(pt, `pt`);
  if (intersectsPoint(rect, pt)) return 0;
  const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
  const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
  return Math.hypot(dx, dy);
};
var distanceFromCenter = (rect, pt) => distance(center(rect), pt);
var distanceToCenter = (a2, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a2);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a2);
  }
  if (isPoint(shape)) return distance(a2, shape);
  throw new Error(`Unknown shape`);
};
var distanceToExterior = (a2, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a2);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a2);
  }
  if (isPoint(shape)) return distance(a2, shape);
  throw new Error(`Unknown shape`);
};
var toArray = (p2) => [p2.x, p2.y];
var dotProduct3 = (...pts) => {
  const a2 = pts.map((p2) => toArray(p2));
  return dotProduct(a2);
};
var from = (xOrArray, y) => {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length !== 2) {
      throw new Error(`Expected array of length two, got ${xOrArray.length}`);
    }
    return Object.freeze({
      x: xOrArray[0],
      y: xOrArray[1]
    });
  } else {
    if (xOrArray === void 0) xOrArray = 0;
    else if (Number.isNaN(xOrArray)) throw new Error(`x is NaN`);
    if (y === void 0) y = 0;
    else if (Number.isNaN(y)) throw new Error(`y is NaN`);
    return Object.freeze({ x: xOrArray, y });
  }
};
var fromNumbers2 = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    for (const coord of coords) {
      if (!(coord.length % 2 === 0)) {
        throw new Error(`coords array should be even-numbered`);
      }
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    }
  } else {
    if (coords.length % 2 !== 0) {
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    }
    for (let index = 0; index < coords.length; index += 2) {
      pts.push(
        Object.freeze({ x: coords[index], y: coords[index + 1] })
      );
    }
  }
  return pts;
};
var interpolate2 = (amount, a2, b2, allowOverflow = false) => interpolate(amount, a2, b2, allowOverflow);
var invert2 = (pt, what = `both`) => {
  switch (what) {
    case `both`: {
      return isPoint3d(pt) ? Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1,
        z: pt.z * -1
      }) : Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1
      });
    }
    case `x`: {
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    }
    case `y`: {
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    }
    case `z`: {
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          z: pt.z * -1
        });
      } else throw new Error(`pt parameter is missing z`);
    }
    default: {
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
    }
  }
};
function multiply2(a2, bOrX, y) {
  guard(a2, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`) y = bOrX;
    throwNumberTest(y, ``, `y`);
    throwNumberTest(bOrX, ``, `x`);
    return Object.freeze({ x: a2.x * bOrX, y: a2.y * y });
  } else if (isPoint(bOrX)) {
    guard(bOrX, `b`);
    return Object.freeze({
      x: a2.x * bOrX.x,
      y: a2.y * bOrX.y
    });
  } else if (isRect(bOrX)) {
    guard3(bOrX, `rect`);
    return Object.freeze({
      x: a2.x * bOrX.width,
      y: a2.y * bOrX.height
    });
  } else {
    throw new Error(
      `Invalid arguments. a: ${JSON.stringify(a2)} b: ${JSON.stringify(bOrX)}`
    );
  }
}
var multiplyScalar = (pt, v) => {
  return isPoint3d(pt) ? Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v,
    z: pt.z * v
  }) : Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v
  });
};
var clampMagnitude2 = (pt, max22 = 1, min2 = 0) => {
  const length5 = distance(pt);
  let ratio = 1;
  if (length5 > max22) {
    ratio = max22 / length5;
  } else if (length5 < min2) {
    ratio = min2 / length5;
  }
  return ratio === 1 ? pt : multiply2(pt, ratio, ratio);
};
var leftmost = (...points2) => findMinimum((a2, b2) => a2.x <= b2.x ? a2 : b2, ...points2);
var rightmost = (...points2) => findMinimum((a2, b2) => a2.x >= b2.x ? a2 : b2, ...points2);
var length22 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0) throw new Error(`Expected y`);
  return Math.hypot(ptOrX, y);
};
var normalise2 = (ptOrX, y) => {
  const pt = getPointParameter2(ptOrX, y);
  const l = length22(pt);
  if (l === 0) return Empty;
  return Object.freeze({
    ...pt,
    x: pt.x / l,
    y: pt.y / l
  });
};
var pipelineApply = (point22, ...pipelineFns) => pipeline(...pipelineFns)(point22);
var pipeline = (...pipeline2) => (pt) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  pipeline2.reduce((previous, current) => current(previous), pt)
);
var progressBetween = (position, waypointA, waypointB) => {
  const a2 = subtract(position, waypointA);
  const b2 = subtract(waypointB, waypointA);
  return isPoint3d(a2) && isPoint3d(b2) ? (a2.x * b2.x + a2.y * b2.y + a2.z * b2.z) / (b2.x * b2.x + b2.y * b2.y + b2.z * b2.z) : (a2.x * b2.x + a2.y * b2.y) / (b2.x * b2.x + b2.y * b2.y);
};
var project = (origin, distance32, angle) => {
  const x = Math.cos(angle) * distance32 + origin.x;
  const y = Math.sin(angle) * distance32 + origin.y;
  return { x, y };
};
var quantiseEvery2 = (pt, snap, middleRoundsUp = true) => {
  guard(pt, `pt`);
  guard(snap, `snap`);
  return Object.freeze({
    x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
    y: quantiseEvery(pt.y, snap.y, middleRoundsUp)
  });
};
var random = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando()
  });
};
var reduce = (pts, fn, initial) => {
  if (initial === void 0) initial = { x: 0, y: 0 };
  let accumulator = initial;
  for (const p2 of pts) {
    accumulator = fn(p2, accumulator);
  }
  ;
  return accumulator;
};
var relation = (a2, b2) => {
  const start = getPointParameter2(a2, b2);
  let totalX = 0;
  let totalY = 0;
  let count = 0;
  let lastUpdate = performance.now();
  let lastPoint = start;
  const update = (aa, bb) => {
    const p2 = getPointParameter2(aa, bb);
    totalX += p2.x;
    totalY += p2.y;
    count++;
    const distanceFromStart = distance(p2, start);
    const distanceFromLast = distance(p2, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p2;
    return Object.freeze({
      angle: angleRadian(p2, start),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid(p2, start),
      average: {
        x: totalX / count,
        y: totalY / count
      }
    });
  };
  return update;
};
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0) origin = { x: 0, y: 0 };
  guard(origin, `origin`);
  throwNumberTest(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0) return pt;
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  for (const [index, p2] of ptAr.entries()) guard(p2, `pt[${index}]`);
  const asPolar = ptAr.map((p2) => fromCartesian(p2, origin));
  const rotated = asPolar.map((p2) => rotate(p2, amountRadian));
  const asCartesisan = rotated.map((p2) => toCartesian(p2, origin));
  return arrayInput ? asCartesisan : asCartesisan[0];
}
var rotatePointArray = (v, amountRadian) => {
  const mat = [
    [Math.cos(amountRadian), -Math.sin(amountRadian)],
    [Math.sin(amountRadian), Math.cos(amountRadian)]
  ];
  const result = [];
  for (const [index, element] of v.entries()) {
    result[index] = [
      mat[0][0] * element[0] + mat[0][1] * element[1],
      mat[1][0] * element[0] + mat[1][1] * element[1]
    ];
  }
  return result;
};
var round2 = (ptOrX, yOrDigits, digits) => {
  const pt = getPointParameter2(ptOrX, yOrDigits);
  digits = digits ?? yOrDigits;
  digits = digits ?? 2;
  return Object.freeze({
    ...pt,
    x: round(digits, pt.x),
    y: round(digits, pt.y)
  });
};
var toIntegerValues = (pt, rounder = Math.round) => {
  guard(pt, `pt`);
  return Object.freeze({
    x: rounder(pt.x),
    y: rounder(pt.y)
  });
};
function toString2(p2, digits) {
  if (p2 === void 0) return `(undefined)`;
  if (p2 === null) return `(null)`;
  guard(p2, `pt`);
  const x = digits ? p2.x.toFixed(digits) : p2.x;
  const y = digits ? p2.y.toFixed(digits) : p2.y;
  if (p2.z === void 0) {
    return `(${x},${y})`;
  } else {
    const z = digits ? p2.z.toFixed(digits) : p2.z;
    return `(${x},${y},${z})`;
  }
}
var withinRange = (a2, b2, maxRange) => {
  guard(a2, `a`);
  guard(b2, `b`);
  if (typeof maxRange === `number`) {
    throwNumberTest(maxRange, `positive`, `maxRange`);
    maxRange = { x: maxRange, y: maxRange };
  } else {
    guard(maxRange, `maxRange`);
  }
  const x = Math.abs(b2.x - a2.x);
  const y = Math.abs(b2.y - a2.y);
  return x <= maxRange.x && y <= maxRange.y;
};
var wrap2 = (pt, ptMax, ptMin) => {
  if (ptMax === void 0) ptMax = { x: 1, y: 1 };
  if (ptMin === void 0) ptMin = { x: 0, y: 0 };
  guard(pt, `pt`);
  guard(ptMax, `ptMax`);
  guard(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap(pt.x, ptMin.x, ptMax.x),
    y: wrap(pt.y, ptMin.y, ptMax.y)
  });
};
var multiply3 = (line, point22) => Object.freeze({
  ...line,
  a: multiply2(line.a, point22),
  b: multiply2(line.b, point22)
});
var relativePosition = (line, pt) => {
  const fromStart = distance(line.a, pt);
  const total = length2(line);
  return fromStart / total;
};
var rotate3 = (line, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return line;
  if (origin === void 0) origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate(origin, line.a, line.b);
  }
  return Object.freeze({
    ...line,
    a: rotate2(line.a, amountRadian, origin),
    b: rotate2(line.b, amountRadian, origin)
  });
};
var subtract2 = (line, point22) => Object.freeze({
  ...line,
  a: subtract(line.a, point22),
  b: subtract(line.b, point22)
});
var sum2 = (line, point22) => Object.freeze({
  ...line,
  a: sum(line.a, point22),
  b: sum(line.b, point22)
});
function toString3(a2, b2) {
  if (isLine(a2)) {
    guard2(a2, `a`);
    b2 = a2.b;
    a2 = a2.a;
  } else if (b2 === void 0) throw new Error(`Expect second point if first is a point`);
  return toString2(a2) + `-` + toString2(b2);
}
var Empty2 = Object.freeze({
  a: Object.freeze({ x: 0, y: 0 }),
  b: Object.freeze({ x: 0, y: 0 })
});
var Placeholder2 = Object.freeze({
  a: Object.freeze({ x: Number.NaN, y: Number.NaN }),
  b: Object.freeze({ x: Number.NaN, y: Number.NaN })
});
var isEmpty3 = (l) => isEmpty(l.a) && isEmpty(l.b);
var isPlaceholder3 = (l) => isPlaceholder(l.a) && isPlaceholder(l.b);
var apply2 = (line, fn) => Object.freeze(
  {
    ...line,
    a: fn(line.a),
    b: fn(line.b)
  }
);
var angleRadian2 = (lineOrPoint, b2) => {
  let a2;
  if (isLine(lineOrPoint)) {
    a2 = lineOrPoint.a;
    b2 = lineOrPoint.b;
  } else {
    a2 = lineOrPoint;
    if (b2 === void 0) throw new Error(`b point must be provided`);
  }
  return Math.atan2(b2.y - a2.y, b2.x - a2.x);
};
var normaliseByRect2 = (line, width, height4) => Object.freeze({
  ...line,
  a: normaliseByRect(line.a, width, height4),
  b: normaliseByRect(line.b, width, height4)
});
var withinRange2 = (line, point22, maxRange) => {
  const calculatedDistance = distance2(line, point22);
  return calculatedDistance <= maxRange;
};
var slope = (lineOrPoint, b2) => {
  let a2;
  if (isLine(lineOrPoint)) {
    a2 = lineOrPoint.a;
    b2 = lineOrPoint.b;
  } else {
    a2 = lineOrPoint;
    if (b2 === void 0) throw new Error(`b parameter required`);
  }
  if (b2 === void 0) {
    throw new TypeError(`Second point missing`);
  } else {
    return (b2.y - a2.y) / (b2.x - a2.x);
  }
};
var scaleFromMidpoint = (line, factor) => {
  const a2 = interpolate(factor / 2, line);
  const b2 = interpolate(0.5 + factor / 2, line);
  return { a: a2, b: b2 };
};
var pointAtX = (line, x) => {
  const y = line.a.y + (x - line.a.x) * slope(line);
  return Object.freeze({ x, y });
};
var extendFromA = (line, distance32) => {
  const calculatedLength = length2(line);
  return Object.freeze({
    ...line,
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / calculatedLength * distance32,
      y: line.b.y + (line.b.y - line.a.y) / calculatedLength * distance32
    })
  });
};
function* pointsOf(line) {
  const { a: a2, b: b2 } = line;
  let x0 = Math.floor(a2.x);
  let y0 = Math.floor(a2.y);
  const x1 = Math.floor(b2.x);
  const y1 = Math.floor(b2.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield { x: x0, y: y0 };
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}
var distance2 = (line, point22) => {
  if (Array.isArray(line)) {
    const distances = line.map((l) => distanceSingleLine(l, point22));
    return minFast(distances);
  } else {
    return distanceSingleLine(line, point22);
  }
};
var toFlatArray = (a2, b2) => {
  if (isLine(a2)) {
    return [a2.a.x, a2.a.y, a2.b.x, a2.b.y];
  } else if (isPoint(a2) && isPoint(b2)) {
    return [a2.x, a2.y, b2.x, b2.y];
  } else {
    throw new Error(`Expected single line parameter, or a and b points`);
  }
};
function* asPoints(lines) {
  for (const l of lines) {
    yield l.a;
    yield l.b;
  }
}
var toSvgString = (a2, b2) => [`M${a2.x} ${a2.y} L ${b2.x} ${b2.y}`];
var toPath = (line) => {
  const { a: a2, b: b2 } = line;
  return Object.freeze({
    ...line,
    length: () => length2(a2, b2),
    interpolate: (amount) => interpolate(amount, a2, b2),
    relativePosition: (point22) => relativePosition(line, point22),
    bbox: () => bbox2(line),
    toString: () => toString3(a2, b2),
    toFlatArray: () => toFlatArray(a2, b2),
    toSvgString: () => toSvgString(a2, b2),
    toPoints: () => [a2, b2],
    rotate: (amountRadian, origin) => toPath(rotate3(line, amountRadian, origin)),
    nearest: (point22) => nearest(line, point22),
    sum: (point22) => toPath(sum2(line, point22)),
    divide: (point22) => toPath(divide2(line, point22)),
    multiply: (point22) => toPath(multiply3(line, point22)),
    subtract: (point22) => toPath(subtract2(line, point22)),
    midpoint: () => midpoint(a2, b2),
    distanceToPoint: (point22) => distanceSingleLine(line, point22),
    parallel: (distance32) => parallel(line, distance32),
    perpendicularPoint: (distance32, amount) => perpendicularPoint(line, distance32, amount),
    slope: () => slope(line),
    withinRange: (point22, maxRange) => withinRange2(line, point22, maxRange),
    isEqual: (otherLine) => isEqual2(line, otherLine),
    apply: (fn) => toPath(apply2(line, fn)),
    kind: `line`
  });
};
var fromPoints2 = (waypoints, opts = {}) => {
  const lines = joinPointsToLines(...waypoints);
  return init(
    lines.map((l) => toPath(l)),
    opts
  );
};
var init = (paths, opts = {}) => {
  const maxDistanceFromLine = opts.maxDistanceFromLine ?? 0.1;
  const checkUnordered = (pt) => {
    const results = paths.map((p2, index) => {
      const nearest3 = p2.nearest(pt);
      const distance32 = distance(pt, nearest3);
      const positionRelative = p2.relativePosition(nearest3, maxDistanceFromLine);
      ;
      return { positionRelative, path: p2, index, nearest: nearest3, distance: distance32, rank: Number.MAX_SAFE_INTEGER };
    });
    const filtered = results.filter((v) => v.distance <= maxDistanceFromLine);
    const sorted = sortByNumericProperty(filtered, `distance`);
    for (let rank = 0; rank < sorted.length; rank++) {
      sorted[rank].rank = rank;
    }
    return sorted;
  };
  return checkUnordered;
};
var Layout_exports = {};
__export2(Layout_exports, {
  CirclePacking: () => CirclePacking_exports
});
var CirclePacking_exports = {};
__export2(CirclePacking_exports, {
  random: () => random3
});
var shape_exports = {};
__export2(shape_exports, {
  arrow: () => arrow,
  center: () => center3,
  isIntersecting: () => isIntersecting3,
  randomPoint: () => randomPoint3,
  starburst: () => starburst
});
var corners = (rect, origin) => {
  const r = getRectPositioned(rect, origin);
  return [
    { x: r.x, y: r.y },
    { x: r.x + r.width, y: r.y },
    { x: r.x + r.width, y: r.y + r.height },
    { x: r.x, y: r.y + r.height }
  ];
};
var fromTopLeft = (origin, width, height4) => {
  guardDim(width, `width`);
  guardDim(height4, `height`);
  guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height: height4 };
};
var isContainedBy = (a2, b2, c4) => {
  const d2 = distanceCenter(a2, b2);
  if (isCircle(b2)) {
    return d2 < Math.abs(a2.radius - b2.radius);
  } else if (isPoint(b2)) {
    if (c4 === void 0) {
      return d2 <= a2.radius;
    } else {
      return d2 < Math.abs(a2.radius - c4);
    }
  } else throw new Error(`b parameter is expected to be CirclePositioned or Point`);
};
var isIntersecting2 = (a2, b2, c4) => {
  if (isEqual(a2, b2)) return true;
  if (isContainedBy(a2, b2, c4)) return true;
  if (isCircle(b2)) {
    return circleCircle(a2, b2);
  } else if (isRectPositioned(b2)) {
    return circleRect(a2, b2);
  } else if (isPoint(b2) && c4 !== void 0) {
    return circleCircle(a2, { ...b2, radius: c4 });
  }
  return false;
};
var piPi = Math.PI * 2;
var randomPoint = (within, opts = {}) => {
  const offset2 = isCirclePositioned(within) ? within : { x: 0, y: 0 };
  const strategy = opts.strategy ?? `uniform`;
  const margin = opts.margin ?? 0;
  const radius = within.radius - margin;
  const rand = opts.randomSource ?? Math.random;
  switch (strategy) {
    case `naive`: {
      return sum(offset2, toCartesian(rand() * radius, rand() * piPi));
    }
    case `uniform`: {
      return sum(offset2, toCartesian(Math.sqrt(rand()) * radius, rand() * piPi));
    }
    default: {
      throw new Error(`Unknown strategy '${strategy}'. Expects 'uniform' or 'naive'`);
    }
  }
};
var center2 = (circle) => {
  return isCirclePositioned(circle) ? Object.freeze({ x: circle.x, y: circle.y }) : Object.freeze({ x: circle.radius, y: circle.radius });
};
var random2 = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando(),
    width: rando(),
    height: rando()
  });
};
var randomPoint2 = (within, options = {}) => {
  const rand = options.randomSource ?? defaultRandom;
  const margin = options.margin ?? { x: 0, y: 0 };
  const x = rand() * (within.width - margin.x - margin.x);
  const y = rand() * (within.height - margin.y - margin.y);
  const pos = { x: x + margin.x, y: y + margin.y };
  return isPositioned(within) ? sum(pos, within) : Object.freeze(pos);
};
var isIntersecting3 = (a2, b2) => {
  if (isCirclePositioned(a2)) {
    return isIntersecting2(a2, b2);
  } else if (isRectPositioned(a2)) {
    return isIntersecting(a2, b2);
  }
  throw new Error(
    `a or b are unknown shapes. a: ${JSON.stringify(a2)} b: ${JSON.stringify(b2)}`
  );
};
var randomPoint3 = (shape, opts = {}) => {
  if (isCirclePositioned(shape)) {
    return randomPoint(shape, opts);
  } else if (isRectPositioned(shape)) {
    return randomPoint2(shape, opts);
  }
  throw new Error(`Unknown shape. Only CirclePositioned and RectPositioned are supported.`);
};
var center3 = (shape) => {
  if (shape === void 0) {
    return Object.freeze({ x: 0.5, y: 0.5 });
  } else if (isRect(shape)) {
    return center(shape);
  } else if (triangle_exports.isTriangle(shape)) {
    return triangle_exports.centroid(shape);
  } else if (isCircle(shape)) {
    return center2(shape);
  } else {
    throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
};
var starburst = (outerRadius, points2 = 5, innerRadius, origin = point_exports.Empty, opts) => {
  throwIntegerTest(points2, `positive`, `points`);
  const angle = Math.PI * 2 / points2;
  const angleHalf = angle / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0) innerRadius = outerRadius / 2;
  let a2 = initialAngle;
  const pts = [];
  for (let index = 0; index < points2; index++) {
    const peak = toCartesian(outerRadius, a2, origin);
    const left = toCartesian(innerRadius, a2 - angleHalf, origin);
    const right = toCartesian(innerRadius, a2 + angleHalf, origin);
    pts.push(left, peak);
    if (index + 1 < points2) pts.push(right);
    a2 += angle;
  }
  return pts;
};
var arrow = (origin, from2, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian3 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from2 === `tip`) {
    tri = triangle_exports.equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = corners(
      fromTopLeft(
        { x: tri.a.x - tailLength, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
  } else if (from2 === `middle`) {
    const midX = tailLength + arrowSize / 2;
    const midY = tailThickness / 2;
    tri = triangle_exports.equilateralFromVertex(
      {
        x: origin.x + arrowSize * 1.2,
        y: origin.y
      },
      arrowSize,
      triAngle
    );
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x - midX, y: origin.y - midY },
        tailLength + arrowSize,
        tailThickness
      )
    );
  } else {
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
    tri = triangle_exports.equilateralFromVertex(
      { x: origin.x + tailLength + arrowSize * 0.7, y: origin.y },
      arrowSize,
      triAngle
    );
  }
  const arrow2 = point_exports.rotate(
    [
      tailPoints[0],
      tailPoints[1],
      tri.a,
      tri.b,
      tri.c,
      tailPoints[2],
      tailPoints[3]
    ],
    angleRadian3,
    origin
  );
  return arrow2;
};
var random3 = (circles, container, opts = {}) => {
  if (!Array.isArray(circles)) throw new Error(`Parameter 'circles' is not an array`);
  const attempts = opts.attempts ?? 2e3;
  const sorted = sortByNumericProperty(circles, `radius`);
  const positionedCircles = [];
  const willHit = (b2, radius) => positionedCircles.some((v) => isIntersecting2(v, b2, radius));
  while (sorted.length > 0) {
    const circle = sorted.pop();
    if (!circle) break;
    const randomPointOpts = { ...opts, margin: { x: circle.radius, y: circle.radius } };
    for (let index = 0; index < attempts; index++) {
      const position = randomPoint3(container, randomPointOpts);
      if (!willHit(position, circle.radius)) {
        positionedCircles.push(Object.freeze({ ...circle, ...position }));
        break;
      }
    }
  }
  return positionedCircles;
};
var circle_exports = {};
__export2(circle_exports, {
  area: () => area,
  bbox: () => bbox3,
  center: () => center2,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter,
  distanceFromExterior: () => distanceFromExterior,
  exteriorIntegerPoints: () => exteriorIntegerPoints,
  guard: () => guard5,
  guardPositioned: () => guardPositioned2,
  interiorIntegerPoints: () => interiorIntegerPoints,
  interpolate: () => interpolate3,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEqual: () => isEqual3,
  isIntersecting: () => isIntersecting2,
  isNaN: () => isNaN22,
  isPositioned: () => isPositioned2,
  length: () => length3,
  multiplyScalar: () => multiplyScalar2,
  nearest: () => nearest2,
  pointOnPerimeter: () => pointOnPerimeter,
  randomPoint: () => randomPoint,
  toPath: () => toPath2,
  toPositioned: () => toPositioned,
  toSvg: () => toSvg
});
var area = (circle) => {
  guard5(circle);
  return Math.PI * circle.radius * circle.radius;
};
var fromCenter = (origin, width, height4) => {
  guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height4, `height`);
  const halfW = width / 2;
  const halfH = height4 / 2;
  return {
    x: origin.x - halfW,
    y: origin.y - halfH,
    width,
    height: height4
  };
};
var bbox3 = (circle) => {
  return isCirclePositioned(circle) ? fromCenter(circle, circle.radius * 2, circle.radius * 2) : { width: circle.radius * 2, height: circle.radius * 2, x: 0, y: 0 };
};
function* exteriorIntegerPoints(circle) {
  const { x, y, radius } = circle;
  let xx = radius;
  let yy = 0;
  let radiusError = 1 - x;
  while (xx >= yy) {
    yield { x: xx + x, y: yy + y };
    yield { x: yy + x, y: xx + y };
    yield { x: -xx + x, y: yy + y };
    yield { x: -yy + x, y: xx + y };
    yield { x: -xx + x, y: -yy + y };
    yield { x: -yy + x, y: -xx + y };
    yield { x: xx + x, y: -yy + y };
    yield { x: yy + x, y: -xx + y };
    yy++;
    if (radiusError < 0) {
      radiusError += 2 * yy + 1;
    } else {
      xx--;
      radiusError += 2 * (yy - xx + 1);
    }
  }
}
function* interiorIntegerPoints(circle) {
  const xMin = circle.x - circle.radius;
  const xMax = circle.x + circle.radius;
  const yMin = circle.y - circle.radius;
  const yMax = circle.y + circle.radius;
  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      const r = Math.abs(distance(circle, x, y));
      if (r <= circle.radius) yield { x, y };
    }
  }
}
var piPi2 = Math.PI * 2;
var nearest2 = (circle, point22) => {
  const n2 = (a2) => {
    const l = Math.sqrt(Math.pow(point22.x - a2.x, 2) + Math.pow(point22.y - a2.y, 2));
    const x = a2.x + a2.radius * ((point22.x - a2.x) / l);
    const y = a2.y + a2.radius * ((point22.y - a2.y) / l);
    return { x, y };
  };
  if (Array.isArray(circle)) {
    const pts = circle.map((l) => n2(l));
    const dists = pts.map((p2) => distance(p2, point22));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n2(circle));
  }
};
var pointOnPerimeter = (circle, angleRadian3, origin) => {
  if (origin === void 0) {
    origin = isCirclePositioned(circle) ? circle : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(-angleRadian3) * circle.radius + origin.x,
    y: Math.sin(-angleRadian3) * circle.radius + origin.y
  };
};
var circumference = (circle) => {
  guard5(circle);
  return piPi2 * circle.radius;
};
var length3 = (circle) => circumference(circle);
var piPi3 = Math.PI * 2;
var interpolate3 = (circle, t2) => pointOnPerimeter(circle, t2 * piPi3);
function multiplyScalar2(a2, value) {
  if (isCirclePositioned(a2)) {
    const pt = multiplyScalar(a2, value);
    return Object.freeze({
      ...a2,
      ...pt,
      radius: a2.radius * value
    });
  } else {
    return Object.freeze({
      ...a2,
      radius: a2.radius * value
    });
  }
}
var toSvg = (a2, sweep, origin) => {
  if (isCircle(a2)) {
    if (origin !== void 0) {
      return toSvgFull(a2.radius, origin, sweep);
    }
    if (isCirclePositioned(a2)) {
      return toSvgFull(a2.radius, a2, sweep);
    } else throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin === void 0) {
      throw new Error(`origin parameter needed`);
    } else {
      return toSvgFull(a2, origin, sweep);
    }
  }
};
var toSvgFull = (radius, origin, sweep) => {
  const { x, y } = origin;
  const s = sweep ? `1` : `0`;
  return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`
`);
};
var toPath2 = (circle) => {
  guard5(circle);
  return {
    ...circle,
    nearest: (point22) => nearest2(circle, point22),
    /**
     * Returns a relative (0.0-1.0) point on a circle. 0=3 o'clock, 0.25=6 o'clock, 0.5=9 o'clock, 0.75=12 o'clock etc.
     * @param {t} Relative (0.0-1.0) point
     * @returns {Point} X,y
     */
    interpolate: (t2) => interpolate3(circle, t2),
    bbox: () => bbox3(circle),
    length: () => circumference(circle),
    toSvgString: (sweep = true) => toSvg(circle, sweep),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `circular`
  };
};
var toPositioned = (circle, defaultPositionOrX, y) => {
  if (isCirclePositioned(circle)) return circle;
  const pt = getPointParameter2(defaultPositionOrX, y);
  return Object.freeze({
    ...circle,
    ...pt
  });
};
var rect_exports = {};
__export2(rect_exports, {
  Empty: () => Empty3,
  EmptyPositioned: () => EmptyPositioned,
  apply: () => apply3,
  applyDim: () => applyDim,
  applyScalar: () => applyScalar,
  area: () => area2,
  cardinal: () => cardinal,
  center: () => center,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior2,
  divide: () => divide4,
  divideDim: () => divideDim,
  divideScalar: () => divideScalar,
  edges: () => edges,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromNumbers: () => fromNumbers3,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  getRectPositioned: () => getRectPositioned,
  getRectPositionedParameter: () => getRectPositionedParameter,
  guard: () => guard3,
  guardDim: () => guardDim,
  guardPositioned: () => guardPositioned,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty2,
  isEqual: () => isEqual4,
  isEqualSize: () => isEqualSize,
  isIntersecting: () => isIntersecting,
  isPlaceholder: () => isPlaceholder2,
  isPositioned: () => isPositioned,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply4,
  multiplyDim: () => multiplyDim,
  multiplyScalar: () => multiplyScalar3,
  random: () => random2,
  randomPoint: () => randomPoint2,
  subtract: () => subtract3,
  subtractOffset: () => subtractOffset,
  sum: () => sum3,
  sumOffset: () => sumOffset,
  toArray: () => toArray2
});
var area2 = (rect) => {
  guard3(rect);
  return rect.height * rect.width;
};
function apply3(op, a2, b2, c4) {
  guard3(a2, `a`);
  if (isRect(b2)) {
    return isRectPositioned(a2) ? Object.freeze({
      ...a2,
      x: op(a2.x, b2.width),
      y: op(a2.y, b2.height),
      width: op(a2.width, b2.width),
      height: op(a2.height, b2.height)
    }) : Object.freeze({
      ...a2,
      width: op(a2.width, b2.width),
      height: op(a2.height, b2.height)
    });
  } else {
    if (typeof b2 !== `number`) {
      throw new TypeError(
        `Expected second parameter of type Rect or number. Got ${JSON.stringify(
          b2
        )}`
      );
    }
    if (typeof c4 !== `number`) throw new Error(`Expected third param as height. Got ${JSON.stringify(c4)}`);
    return isRectPositioned(a2) ? Object.freeze({
      ...a2,
      x: op(a2.x, b2),
      y: op(a2.y, c4),
      width: op(a2.width, b2),
      height: op(a2.height, c4)
    }) : Object.freeze({
      ...a2,
      width: op(a2.width, b2),
      height: op(a2.height, c4)
    });
  }
}
function applyScalar(op, rect, param) {
  return isPositioned(rect) ? Object.freeze({
    ...rect,
    x: op(rect.x, param),
    y: op(rect.y, param),
    width: op(rect.width, param),
    height: op(rect.height, param)
  }) : Object.freeze({
    ...rect,
    width: op(rect.width, param),
    height: op(rect.height, param)
  });
}
function applyDim(op, rect, param) {
  return Object.freeze({
    ...rect,
    width: op(rect.width, param),
    height: op(rect.height, param)
  });
}
var cardinal = (rect, card) => {
  const { x, y, width, height: height4 } = rect;
  switch (card) {
    case `nw`: {
      return Object.freeze({ x, y });
    }
    case `n`: {
      return Object.freeze({
        x: x + width / 2,
        y
      });
    }
    case `ne`: {
      return Object.freeze({
        x: x + width,
        y
      });
    }
    case `sw`: {
      return Object.freeze({ x, y: y + height4 });
    }
    case `s`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4
      });
    }
    case `se`: {
      return Object.freeze({
        x: x + width,
        y: y + height4
      });
    }
    case `w`: {
      return Object.freeze({ x, y: y + height4 / 2 });
    }
    case `e`: {
      return Object.freeze({ x: x + width, y: y + height4 / 2 });
    }
    case `center`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4 / 2
      });
    }
    default: {
      throw new Error(`Unknown direction: ${card}`);
    }
  }
};
var edges = (rect, origin) => {
  const c4 = corners(rect, origin);
  return joinPointsToLines(...c4, c4[0]);
};
var getEdgeX = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.x + rect.width : rect.width;
    }
  }
};
var getEdgeY = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.y + rect.height : rect.height;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.y : 0;
    }
  }
};
var Empty3 = Object.freeze({ width: 0, height: 0 });
var EmptyPositioned = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
var fromElement = (el) => ({
  width: el.clientWidth,
  height: el.clientHeight
});
function fromNumbers3(xOrWidth, yOrHeight, width, height4) {
  if (width === void 0 || height4 === void 0) {
    if (typeof xOrWidth !== `number`) throw new Error(`width is not an number`);
    if (typeof yOrHeight !== `number`) {
      throw new TypeError(`height is not an number`);
    }
    return Object.freeze({ width: xOrWidth, height: yOrHeight });
  }
  if (typeof xOrWidth !== `number`) throw new Error(`x is not an number`);
  if (typeof yOrHeight !== `number`) throw new Error(`y is not an number`);
  if (typeof width !== `number`) throw new Error(`width is not an number`);
  if (typeof height4 !== `number`) throw new Error(`height is not an number`);
  return Object.freeze({ x: xOrWidth, y: yOrHeight, width, height: height4 });
}
function getRectPositionedParameter(a2, b2, c4, d2) {
  if (typeof a2 === `number`) {
    if (typeof b2 === `number`) {
      if (typeof c4 === `number` && typeof d2 === `number`) {
        return { x: a2, y: b2, width: c4, height: d2 };
      } else if (isRect(c4)) {
        return { x: a2, y: b2, width: c4.width, height: c4.height };
      } else {
        throw new TypeError(`If params 'a' & 'b' are numbers, expect following parameters to be x,y or Rect`);
      }
    } else {
      throw new TypeError(`If parameter 'a' is a number, expect following parameters to be: y,w,h`);
    }
  } else if (isRectPositioned(a2)) {
    return a2;
  } else if (isRect(a2)) {
    if (typeof b2 === `number` && typeof c4 === `number`) {
      return { width: a2.width, height: a2.height, x: b2, y: c4 };
    } else if (isPoint(b2)) {
      return { width: a2.width, height: a2.height, x: b2.x, y: b2.y };
    } else {
      throw new TypeError(`If param 'a' is a Rect, expects following parameters to be x,y`);
    }
  } else if (isPoint(a2)) {
    if (typeof b2 === `number` && typeof c4 === `number`) {
      return { x: a2.x, y: a2.y, width: b2, height: c4 };
    } else if (isRect(b2)) {
      return { x: a2.x, y: a2.y, width: b2.width, height: b2.height };
    } else {
      throw new TypeError(`If parameter 'a' is a Point, expect following params to be: Rect or width,height`);
    }
  }
  throw new TypeError(`Expect a first parameter to be x,RectPositioned,Rect or Point`);
}
var isEqualSize = (a2, b2) => {
  if (a2 === void 0) throw new Error(`a undefined`);
  if (b2 === void 0) throw new Error(`b undefined`);
  return a2.width === b2.width && a2.height === b2.height;
};
var isEqual4 = (a2, b2) => {
  if (isPositioned(a2) && isPositioned(b2)) {
    if (!isEqual(a2, b2)) return false;
    return a2.width === b2.width && a2.height === b2.height;
  } else if (!isPositioned(a2) && !isPositioned(b2)) {
    return a2.width === b2.width && a2.height === b2.height;
  } else {
    return false;
  }
};
var lengths = (rect) => {
  guardPositioned(rect, `rect`);
  return edges(rect).map((l) => length2(l));
};
var multiplyOp = (a2, b2) => a2 * b2;
function multiply4(a2, b2, c4) {
  return apply3(multiplyOp, a2, b2, c4);
}
function multiplyScalar3(rect, amount) {
  return applyScalar(multiplyOp, rect, amount);
}
function multiplyDim(rect, amount) {
  return applyDim(multiplyOp, rect, amount);
}
var divideOp = (a2, b2) => a2 / b2;
function divide4(a2, b2, c4) {
  return apply3(divideOp, a2, b2, c4);
}
function divideScalar(rect, amount) {
  return applyScalar(divideOp, rect, amount);
}
function divideDim(rect, amount) {
  return applyDim(divideOp, rect, amount);
}
var subtractOp = (a2, b2) => a2 - b2;
function subtract3(a2, b2, c4) {
  return apply3(subtractOp, a2, b2, c4);
}
function subtractOffset(a2, b2) {
  let x = 0;
  let y = 0;
  if (isPositioned(a2)) {
    x = a2.x;
    y = a2.y;
  }
  let xB = 0;
  let yB = 0;
  if (isPositioned(b2)) {
    xB = b2.x;
    yB = b2.y;
  }
  return Object.freeze({
    ...a2,
    x: x - xB,
    y: y - yB,
    width: a2.width - b2.width,
    height: a2.height - b2.height
  });
}
var sumOp = (a2, b2) => a2 + b2;
function sum3(a2, b2, c4) {
  return apply3(sumOp, a2, b2, c4);
}
function sumOffset(a2, b2) {
  let x = 0;
  let y = 0;
  if (isPositioned(a2)) {
    x = a2.x;
    y = a2.y;
  }
  let xB = 0;
  let yB = 0;
  if (isPositioned(b2)) {
    xB = b2.x;
    yB = b2.y;
  }
  return Object.freeze({
    ...a2,
    x: x + xB,
    y: y + yB,
    width: a2.width + b2.width,
    height: a2.height + b2.height
  });
}
function toArray2(rect) {
  if (isPositioned(rect)) {
    return [rect.x, rect.y, rect.width, rect.height];
  } else if (isRect(rect)) {
    return [rect.width, rect.height];
  } else {
    throw new Error(
      `Param 'rect' is not a rectangle. Got: ${JSON.stringify(rect)}`
    );
  }
}
var path_exports = {};
__export2(path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});
var isQuadraticBezier = (path) => path.quadratic !== void 0;
var isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;
var getStart = function(path) {
  if (isQuadraticBezier(path)) return path.a;
  else if (isLine(path)) return path.a;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
var getEnd = function(path) {
  if (isQuadraticBezier(path)) return path.b;
  else if (isLine(path)) return path.b;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
var Grid_exports = {};
__export2(Grid_exports, {
  access1dArray: () => access1dArray,
  allDirections: () => allDirections,
  array2dUpdater: () => array2dUpdater,
  asRectangles: () => asRectangles,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellFromIndex: () => cellFromIndex,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  cells: () => cells,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  indexFromCell: () => indexFromCell,
  inside: () => inside,
  isEqual: () => isEqual5,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
  rows: () => rows,
  simpleLine: () => simpleLine,
  toArray: () => toArray3,
  visitArray: () => visitArray,
  visitFor: () => visitFor,
  visitNeigbours: () => visitNeigbours,
  visitor: () => visitor,
  visitorBreadth: () => visitorBreadth,
  visitorColumn: () => visitorColumn,
  visitorDepth: () => visitorDepth,
  visitorRandom: () => visitorRandom,
  visitorRandomContiguous: () => visitorRandomContiguous,
  visitorRow: () => visitorRow
});
var isCell = (cell) => {
  if (cell === void 0) return false;
  return `x` in cell && `y` in cell;
};
var isNeighbour = (n2) => {
  if (n2 === void 0) return false;
  if (n2[1] === void 0) return false;
  return true;
};
var isEqual5 = (a2, b2) => {
  if (b2 === void 0) return false;
  if (a2 === void 0) return false;
  if (`rows` in a2 && `cols` in a2) {
    if (`rows` in b2 && `cols` in b2) {
      if (a2.rows !== b2.rows || a2.cols !== b2.cols) return false;
    } else return false;
  }
  if (`size` in a2) {
    if (`size` in b2) {
      if (a2.size !== b2.size) return false;
    } else return false;
  }
  return true;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
var cellEquals = (a2, b2) => {
  if (b2 === void 0) return false;
  if (a2 === void 0) return false;
  return a2.x === b2.x && a2.y === b2.y;
};
var guardCell = (cell, parameterName = `Param`, grid) => {
  if (cell === void 0) {
    throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
  }
  if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
  if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
  if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
  if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
  if (!Number.isInteger(cell.x)) {
    throw new TypeError(parameterName + `.x is non-integer`);
  }
  if (!Number.isInteger(cell.y)) {
    throw new TypeError(parameterName + `.y is non-integer`);
  }
  if (grid !== void 0 && !inside(grid, cell)) {
    throw new Error(
      `${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid.cols}, ${grid.rows}`
    );
  }
};
var guardGrid = (grid, parameterName = `Param`) => {
  if (grid === void 0) {
    throw new Error(`${parameterName} is undefined. Expecting grid.`);
  }
  if (!(`rows` in grid)) throw new Error(`${parameterName}.rows is undefined`);
  if (!(`cols` in grid)) throw new Error(`${parameterName}.cols is undefined`);
  if (!Number.isInteger(grid.rows)) {
    throw new TypeError(`${parameterName}.rows is not an integer`);
  }
  if (!Number.isInteger(grid.cols)) {
    throw new TypeError(`${parameterName}.cols is not an integer`);
  }
};
var inside = (grid, cell) => {
  if (cell.x < 0 || cell.y < 0) return false;
  if (cell.x >= grid.cols || cell.y >= grid.rows) return false;
  return true;
};
var rectangleForCell = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = fromTopLeft({ x, y }, size, size);
  return r;
};
function* asRectangles(grid) {
  for (const c4 of cells(grid)) {
    yield rectangleForCell(grid, c4);
  }
}
var toArray3 = (grid, initialValue) => {
  const returnValue = [];
  for (let row = 0; row < grid.rows; row++) {
    returnValue[row] = Array.from({ length: grid.cols });
    if (initialValue) {
      for (let col = 0; col < grid.cols; col++) {
        returnValue[row][col] = initialValue;
      }
    }
  }
  return returnValue;
};
var cellAtPoint = (grid, position) => {
  const size = grid.size;
  throwNumberTest(size, `positive`, `grid.size`);
  if (position.x < 0 || position.y < 0) return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid.cols) return;
  if (y >= grid.rows) return;
  return { x, y };
};
var allDirections = Object.freeze([
  `n`,
  `ne`,
  `nw`,
  `e`,
  `s`,
  `se`,
  `sw`,
  `w`
]);
var crossDirections = Object.freeze([
  `n`,
  `e`,
  `s`,
  `w`
]);
var neighbours = (grid, cell, bounds = `undefined`, directions) => {
  const directories = directions ?? allDirections;
  const points2 = directories.map(
    (c4) => offset(grid, cell, getVectorFromCardinal(c4), bounds)
  );
  return zipKeyValue(directories, points2);
};
function* visitNeigbours(grid, cell, bounds = `undefined`, directions) {
  const directories = directions ?? allDirections;
  const points2 = directories.map(
    (c4) => offset(grid, cell, getVectorFromCardinal(c4), bounds)
  );
  for (const pt of points2) {
    if (pt !== void 0) yield pt;
  }
}
var cellMiddle = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};
var getLine = (start, end) => {
  guardCell(start);
  guardCell(end);
  let startX = start.x;
  let startY = start.y;
  const dx = Math.abs(end.x - startX);
  const dy = Math.abs(end.y - startY);
  const sx = startX < end.x ? 1 : -1;
  const sy = startY < end.y ? 1 : -1;
  let error = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y) break;
    const error2 = 2 * error;
    if (error2 > -dy) {
      error -= dy;
      startX += sx;
    }
    if (error2 < dx) {
      error += dx;
      startY += sy;
    }
  }
  return cells2;
};
var offsetCardinals = (grid, start, steps2, bounds = `stop`) => {
  guardGrid(grid, `grid`);
  guardCell(start, `start`);
  throwIntegerTest(steps2, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d2) => getVectorFromCardinal(d2, steps2));
  const cells2 = directions.map(
    (d2, index) => offset(grid, start, vectors[index], bounds)
  );
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal2, multiplier = 1) => {
  let v;
  switch (cardinal2) {
    case `n`: {
      v = { x: 0, y: -1 * multiplier };
      break;
    }
    case `ne`: {
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    }
    case `e`: {
      v = { x: 1 * multiplier, y: 0 };
      break;
    }
    case `se`: {
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `s`: {
      v = { x: 0, y: 1 * multiplier };
      break;
    }
    case `sw`: {
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `w`: {
      v = { x: -1 * multiplier, y: 0 };
      break;
    }
    case `nw`: {
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    }
    default: {
      v = { x: 0, y: 0 };
    }
  }
  return Object.freeze(v);
};
var simpleLine = function(start, end, endInclusive = false) {
  const cells2 = [];
  if (start.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start.y; y < lastY; y++) {
      cells2.push({ x: start.x, y });
    }
  } else if (start.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start.x; x < lastX; x++) {
      cells2.push({ x, y: start.y });
    }
  } else {
    throw new Error(
      `Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`
    );
  }
  return cells2;
};
var offset = function(grid, start, vector, bounds = `undefined`) {
  guardCell(start, `start`, grid);
  guardCell(vector);
  guardGrid(grid, `grid`);
  let x = start.x;
  let y = start.y;
  switch (bounds) {
    case `wrap`: {
      x += vector.x % grid.cols;
      y += vector.y % grid.rows;
      if (x < 0) x = grid.cols + x;
      else if (x >= grid.cols) {
        x -= grid.cols;
      }
      if (y < 0) y = grid.rows + y;
      else if (y >= grid.rows) {
        y -= grid.rows;
      }
      break;
    }
    case `stop`: {
      x += vector.x;
      y += vector.y;
      x = clampIndex(x, grid.cols);
      y = clampIndex(y, grid.rows);
      break;
    }
    case `undefined`: {
      x += vector.x;
      y += vector.y;
      if (x < 0 || y < 0) return;
      if (x >= grid.cols || y >= grid.rows) return;
      break;
    }
    case `unbounded`: {
      x += vector.x;
      y += vector.y;
      break;
    }
    default: {
      throw new Error(`Unknown BoundsLogic case ${bounds}`);
    }
  }
  return Object.freeze({ x, y });
};
var neighbourList = (grid, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter((n2) => isNeighbour(n2));
};
var visitor = function* (logic, grid, start, opts = {}) {
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  const v = opts.visited ?? mutable(cellKeyString);
  const possibleNeighbours = logic.options ?? ((g2, c4) => neighbourList(g2, c4, crossDirections, `undefined`));
  if (!isCell(start)) {
    throw new Error(`'start' parameter is undefined or not a cell`);
  }
  let cellQueue = [start];
  let moveQueue = [];
  let current = void 0;
  while (cellQueue.length > 0) {
    if (current === void 0) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid, current).filter(
        (step) => {
          if (step[1] === void 0) return false;
          return !v.has(step[1]);
        }
      );
      if (nextSteps.length === 0) {
        if (current !== void 0) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        for (const n2 of nextSteps) {
          if (n2 === void 0) continue;
          if (n2[1] === void 0) continue;
          moveQueue.push(n2);
        }
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = void 0;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
};
var visitorDepth = (grid, start, opts = {}) => visitor(
  {
    select: (nbos) => nbos.at(-1)
  },
  grid,
  start,
  opts
);
var visitorBreadth = (grid, start, opts = {}) => visitor(
  {
    select: (nbos) => nbos[0]
  },
  grid,
  start,
  opts
);
var randomNeighbour = (nbos) => randomElement(nbos);
var visitorRandomContiguous = (grid, start, opts = {}) => visitor(
  {
    select: randomNeighbour
  },
  grid,
  start,
  opts
);
var visitorRandom = (grid, start, opts = {}) => visitor(
  {
    options: (grid2, cell) => {
      const t2 = [];
      for (const c4 of cells(grid2, cell)) {
        t2.push([`n`, c4]);
      }
      return t2;
    },
    select: randomNeighbour
  },
  grid,
  start,
  opts
);
var visitorRow = (grid, start, opts = {}) => {
  if (!start) start = { x: 0, y: 0 };
  const { reversed = false } = opts;
  const neighbourSelect = (nbos) => nbos.find((n2) => n2[0] === (reversed ? `w` : `e`));
  const possibleNeighbours = (grid2, cell) => {
    if (reversed) {
      if (cell.x > 0) {
        cell = { x: cell.x - 1, y: cell.y };
      } else {
        if (cell.y > 0) {
          cell = { x: grid2.cols - 1, y: cell.y - 1 };
        } else {
          cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
        }
      }
    } else {
      if (cell.x < grid2.rows - 1) {
        cell = { x: cell.x + 1, y: cell.y };
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: 0, y: cell.y + 1 };
        } else {
          cell = { x: 0, y: 0 };
        }
      }
    }
    return [[reversed ? `w` : `e`, cell]];
  };
  const logic = {
    select: neighbourSelect,
    options: possibleNeighbours
  };
  return visitor(logic, grid, start, opts);
};
var visitFor = (grid, start, steps2, visitor2) => {
  throwIntegerTest(steps2, ``, `steps`);
  const opts = {
    reversed: steps2 < 0
  };
  steps2 = Math.abs(steps2);
  let c4 = start;
  let v = visitor2(grid, start, opts);
  v.next();
  let stepsMade = 0;
  while (stepsMade < steps2) {
    stepsMade++;
    const { value } = v.next();
    if (value) {
      c4 = value;
      if (opts.debug) {
        console.log(
          `stepsMade: ${stepsMade} cell: ${c4.x}, ${c4.y} reverse: ${opts.reversed}`
        );
      }
    } else {
      if (steps2 >= grid.cols * grid.rows) {
        steps2 -= grid.cols * grid.rows;
        stepsMade = 0;
        v = visitor2(grid, start, opts);
        v.next();
        c4 = start;
        if (opts.debug) console.log(`resetting visitor to ${steps2}`);
      } else throw new Error(`Value not received by visitor`);
    }
  }
  return c4;
};
var visitorColumn = (grid, start, opts = {}) => {
  const { reversed = false } = opts;
  const logic = {
    select: (nbos) => nbos.find((n2) => n2[0] === (reversed ? `n` : `s`)),
    options: (grid2, cell) => {
      if (reversed) {
        if (cell.y > 0) {
          cell = { x: cell.x, y: cell.y - 1 };
        } else {
          if (cell.x === 0) {
            cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
          } else {
            cell = { x: cell.x - 1, y: grid2.rows - 1 };
          }
        }
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: cell.x, y: cell.y + 1 };
        } else {
          if (cell.x < grid2.cols - 1) {
            cell = { x: cell.x + 1, y: 0 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `n` : `s`, cell]];
    }
  };
  return visitor(logic, grid, start, opts);
};
var rows = function* (grid, start) {
  if (!start) start = { x: 0, y: 0 };
  let row = start.y;
  let rowCells = [];
  for (const c4 of cells(grid, start)) {
    if (c4.y === row) {
      rowCells.push(c4);
    } else {
      yield rowCells;
      rowCells = [c4];
      row = c4.y;
    }
  }
  if (rowCells.length > 0) yield rowCells;
};
var cells = function* (grid, start) {
  if (!start) start = { x: 0, y: 0 };
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  let { x, y } = start;
  let canMove = true;
  do {
    yield { x, y };
    x++;
    if (x === grid.cols) {
      y++;
      x = 0;
    }
    if (y === grid.rows) {
      y = 0;
      x = 0;
    }
    if (x === start.x && y === start.y) canMove = false;
  } while (canMove);
};
var access1dArray = (array, cols) => {
  const grid = { cols, rows: Math.ceil(array.length / cols) };
  const fn = (cell, wrap3) => {
    const index = indexFromCell(grid, cell, wrap3);
    if (index === void 0) return void 0;
    return array[index];
  };
  return fn;
};
var array2dUpdater = (grid, array) => {
  const fn = (v, position) => {
    const pos = cellAtPoint(grid, position);
    if (pos === void 0) {
      throw new Error(
        `Position does not exist. Pos: ${JSON.stringify(
          position
        )} Grid: ${JSON.stringify(grid)}`
      );
    }
    array[pos.y][pos.x] = v;
  };
  return fn;
};
function* visitArray(array, cols, iteratorFunction, opts) {
  if (typeof array === `undefined`) {
    throw new TypeError(`First parameter is undefined, expected an array`);
  }
  if (array === null) throw new Error(`First parameter is null, expected an array`);
  if (!Array.isArray(array)) throw new Error(`First parameter should be an array`);
  throwIntegerTest(cols, `aboveZero`, `cols`);
  if (array.length === 0) return;
  const wrap3 = opts?.boundsWrap ?? `stop`;
  const rows2 = Math.ceil(array.length / cols);
  const grid = {
    cols,
    rows: rows2
  };
  if (iteratorFunction === void 0) iteratorFunction = cells;
  const iter = iteratorFunction(grid, { x: 0, y: 0 }, opts);
  for (const cell of iter) {
    const index = indexFromCell(grid, cell, wrap3);
    if (index === void 0) return void 0;
    yield [array[index], index];
  }
}
var indexFromCell = (grid, cell, wrap3) => {
  guardGrid(grid, `grid`);
  if (cell.x < 0) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, x: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = offset(grid, { x: 0, y: cell.y }, { x: cell.x, y: 0 }, `wrap`);
        break;
      }
    }
  }
  if (cell.y < 0) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, y: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: grid.rows + cell.y };
        break;
      }
    }
  }
  if (cell.x >= grid.cols) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, x: grid.cols - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, x: cell.x % grid.cols };
        break;
      }
    }
  }
  if (cell.y >= grid.rows) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, y: grid.rows - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: cell.y % grid.rows };
        break;
      }
    }
  }
  const index = cell.y * grid.cols + cell.x;
  return index;
};
var cellFromIndex = (colsOrGrid, index) => {
  let cols = 0;
  cols = typeof colsOrGrid === `number` ? colsOrGrid : colsOrGrid.cols;
  throwIntegerTest(cols, `aboveZero`, `colsOrGrid`);
  return {
    x: index % cols,
    y: Math.floor(index / cols)
  };
};
var bezier_exports = {};
__export2(bezier_exports, {
  computeQuadraticSimple: () => computeQuadraticSimple,
  cubic: () => cubic,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticBend: () => quadraticBend,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath3
});
var { abs: abs2, cos, sin, acos, atan2, sqrt, pow } = Math;
function crt(v) {
  return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi = Math.PI;
var tau = 2 * pi;
var quart = pi / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = { x: 0, y: 0, z: 0 };
var utils = {
  // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(t2, derivativeFn) {
    const d2 = derivativeFn(t2);
    let l = d2.x * d2.x + d2.y * d2.y;
    if (typeof d2.z !== "undefined") {
      l += d2.z * d2.z;
    }
    return sqrt(l);
  },
  compute: function(t2, points2, _3d) {
    if (t2 === 0) {
      points2[0].t = 0;
      return points2[0];
    }
    const order = points2.length - 1;
    if (t2 === 1) {
      points2[order].t = 1;
      return points2[order];
    }
    const mt = 1 - t2;
    let p2 = points2;
    if (order === 0) {
      points2[0].t = t2;
      return points2[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p2[0].x + t2 * p2[1].x,
        y: mt * p2[0].y + t2 * p2[1].y,
        t: t2
      };
      if (_3d) {
        ret.z = mt * p2[0].z + t2 * p2[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t2 * t2, a2, b2, c4, d2 = 0;
      if (order === 2) {
        p2 = [p2[0], p2[1], p2[2], ZERO];
        a2 = mt2;
        b2 = mt * t2 * 2;
        c4 = t22;
      } else if (order === 3) {
        a2 = mt2 * mt;
        b2 = mt2 * t2 * 3;
        c4 = mt * t22 * 3;
        d2 = t2 * t22;
      }
      const ret = {
        x: a2 * p2[0].x + b2 * p2[1].x + c4 * p2[2].x + d2 * p2[3].x,
        y: a2 * p2[0].y + b2 * p2[1].y + c4 * p2[2].y + d2 * p2[3].y,
        t: t2
      };
      if (_3d) {
        ret.z = a2 * p2[0].z + b2 * p2[1].z + c4 * p2[2].z + d2 * p2[3].z;
      }
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points2));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t2,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t2
        };
        if (typeof dCpts[i].z !== "undefined") {
          dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t2;
        }
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t2;
    return dCpts[0];
  },
  computeWithRatios: function(t2, points2, ratios, _3d) {
    const mt = 1 - t2, r = ratios, p2 = points2;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d2;
    f1 *= mt;
    f2 *= t2;
    if (p2.length === 2) {
      d2 = f1 + f2;
      return {
        x: (f1 * p2[0].x + f2 * p2[1].x) / d2,
        y: (f1 * p2[0].y + f2 * p2[1].y) / d2,
        z: !_3d ? false : (f1 * p2[0].z + f2 * p2[1].z) / d2,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t2 * t2;
    if (p2.length === 3) {
      d2 = f1 + f2 + f3;
      return {
        x: (f1 * p2[0].x + f2 * p2[1].x + f3 * p2[2].x) / d2,
        y: (f1 * p2[0].y + f2 * p2[1].y + f3 * p2[2].y) / d2,
        z: !_3d ? false : (f1 * p2[0].z + f2 * p2[1].z + f3 * p2[2].z) / d2,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t2 * t2 * t2;
    if (p2.length === 4) {
      d2 = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p2[0].x + f2 * p2[1].x + f3 * p2[2].x + f4 * p2[3].x) / d2,
        y: (f1 * p2[0].y + f2 * p2[1].y + f3 * p2[2].y + f4 * p2[3].y) / d2,
        z: !_3d ? false : (f1 * p2[0].z + f2 * p2[1].z + f3 * p2[2].z + f4 * p2[3].z) / d2,
        t: t2
      };
    }
  },
  derive: function(points2, _3d) {
    const dpoints = [];
    for (let p2 = points2, d2 = p2.length, c4 = d2 - 1; d2 > 1; d2--, c4--) {
      const list = [];
      for (let j = 0, dpt; j < c4; j++) {
        dpt = {
          x: c4 * (p2[j + 1].x - p2[j].x),
          y: c4 * (p2[j + 1].y - p2[j].y)
        };
        if (_3d) {
          dpt.z = c4 * (p2[j + 1].z - p2[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p2 = list;
    }
    return dpoints;
  },
  between: function(v, m3, M) {
    return m3 <= v && v <= M || utils.approximately(v, m3) || utils.approximately(v, M);
  },
  approximately: function(a2, b2, precision) {
    return abs2(a2 - b2) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum5 = 0;
    for (let i = 0, t2; i < len; i++) {
      t2 = z * utils.Tvalues[i] + z;
      sum5 += utils.Cvalues[i] * utils.arcfn(t2, derivativeFn);
    }
    return z * sum5;
  },
  map: function(v, ds, de, ts, te) {
    const d1 = de - ds, d2 = te - ts, v2 = v - ds, r = v2 / d1;
    return ts + d2 * r;
  },
  lerp: function(r, v1, v2) {
    const ret = {
      x: v1.x + r * (v2.x - v1.x),
      y: v1.y + r * (v2.y - v1.y)
    };
    if (v1.z !== void 0 && v2.z !== void 0) {
      ret.z = v1.z + r * (v2.z - v1.z);
    }
    return ret;
  },
  pointToString: function(p2) {
    let s = p2.x + "/" + p2.y;
    if (typeof p2.z !== "undefined") {
      s += "/" + p2.z;
    }
    return s;
  },
  pointsToString: function(points2) {
    return "[" + points2.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot);
  },
  // round as string, to avoid rounding errors
  round: function(v, d2) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d2));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
  },
  closest: function(LUT, point22) {
    let mdist = pow(2, 63), mpos, d2;
    LUT.forEach(function(p2, idx) {
      d2 = utils.dist(point22, p2);
      if (d2 < mdist) {
        mdist = d2;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t2, n2) {
    if (n2 !== 2 && n2 !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const bottom = pow(t2, n2) + pow(1 - t2, n2), top = bottom - 1;
    return abs2(top / bottom);
  },
  projectionratio: function(t2, n2) {
    if (n2 !== 2 && n2 !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const top = pow(1 - t2, n2), bottom = pow(t2, n2) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d2 = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d2 == 0) {
      return false;
    }
    return { x: nx / d2, y: ny / d2 };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(
      p1.x,
      p1.y,
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2,
      p2.x,
      p2.y
    );
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox7 = s.bbox();
      if (mx > bbox7.x.min) mx = bbox7.x.min;
      if (my > bbox7.y.min) my = bbox7.y.min;
      if (MX < bbox7.x.max) MX = bbox7.x.max;
      if (MY < bbox7.y.max) MY = bbox7.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox22, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox22)) return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual) return;
      a2.forEach(function(l2) {
        if (l2.virtual) return;
        const iss = l1.intersects(l2, curveIntersectionThreshold);
        if (iss.length > 0) {
          iss.c1 = l1;
          iss.c2 = l2;
          iss.s1 = s1;
          iss.s2 = s2;
          intersections2.push(iss);
        }
      });
    });
    return intersections2;
  },
  makeshape: function(forward, back, curveIntersectionThreshold) {
    const bpl = back.points.length;
    const fpl = forward.points.length;
    const start = utils.makeline(back.points[bpl - 1], forward.points[0]);
    const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
    const shape = {
      startcap: start,
      forward,
      back,
      endcap: end,
      bbox: utils.findbbox([start, forward, back, end])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(
        shape,
        shape.bbox,
        s2,
        s2.bbox,
        curveIntersectionThreshold
      );
    };
    return shape;
  },
  getminmax: function(curve, d2, list) {
    if (!list) return { min: 0, max: 0 };
    let min2 = nMax, max22 = nMin, t2, c4;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t2 = list[i];
      c4 = curve.get(t2);
      if (c4[d2] < min2) {
        min2 = c4[d2];
      }
      if (c4[d2] > max22) {
        max22 = c4[d2];
      }
    }
    return { min: min2, mid: (min2 + max22) / 2, max: max22, size: max22 - min2 };
  },
  align: function(points2, line) {
    const tx = line.p1.x, ty = line.p1.y, a2 = -atan2(line.p2.y - ty, line.p2.x - tx), d2 = function(v) {
      return {
        x: (v.x - tx) * cos(a2) - (v.y - ty) * sin(a2),
        y: (v.x - tx) * sin(a2) + (v.y - ty) * cos(a2)
      };
    };
    return points2.map(d2);
  },
  roots: function(points2, line) {
    line = line || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points2.length - 1;
    const aligned = utils.align(points2, line);
    const reduce2 = function(t2) {
      return 0 <= t2 && t2 <= 1;
    };
    if (order === 2) {
      const a22 = aligned[0].y, b22 = aligned[1].y, c22 = aligned[2].y, d22 = a22 - 2 * b22 + c22;
      if (d22 !== 0) {
        const m12 = -sqrt(b22 * b22 - a22 * c22), m22 = -a22 + b22, v12 = -(m12 + m22) / d22, v2 = -(-m12 + m22) / d22;
        return [v12, v2].filter(reduce2);
      } else if (b22 !== c22 && d22 === 0) {
        return [(2 * b22 - c22) / (2 * b22 - 2 * c22)].filter(reduce2);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d2 = -pa + 3 * pb - 3 * pc + pd, a2 = 3 * pa - 6 * pb + 3 * pc, b2 = -3 * pa + 3 * pb, c4 = pa;
    if (utils.approximately(d2, 0)) {
      if (utils.approximately(a2, 0)) {
        if (utils.approximately(b2, 0)) {
          return [];
        }
        return [-c4 / b2].filter(reduce2);
      }
      const q3 = sqrt(b2 * b2 - 4 * a2 * c4), a22 = 2 * a2;
      return [(q3 - b2) / a22, (-b2 - q3) / a22].filter(reduce2);
    }
    a2 /= d2;
    b2 /= d2;
    c4 /= d2;
    const p2 = (3 * b2 - a2 * a2) / 3, p3 = p2 / 3, q = (2 * a2 * a2 * a2 - 9 * a2 * b2 + 27 * c4) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p2 / 3, mp33 = mp3 * mp3 * mp3, r = sqrt(mp33), t2 = -q / (2 * r), cosphi = t2 < -1 ? -1 : t2 > 1 ? 1 : t2, phi2 = acos(cosphi), crtr = crt(r), t1 = 2 * crtr;
      x1 = t1 * cos(phi2 / 3) - a2 / 3;
      x2 = t1 * cos((phi2 + tau) / 3) - a2 / 3;
      x3 = t1 * cos((phi2 + 2 * tau) / 3) - a2 / 3;
      return [x1, x2, x3].filter(reduce2);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a2 / 3;
      x2 = -u1 - a2 / 3;
      return [x1, x2].filter(reduce2);
    } else {
      const sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a2 / 3].filter(reduce2);
    }
  },
  droots: function(p2) {
    if (p2.length === 3) {
      const a2 = p2[0], b2 = p2[1], c4 = p2[2], d2 = a2 - 2 * b2 + c4;
      if (d2 !== 0) {
        const m12 = -sqrt(b2 * b2 - a2 * c4), m22 = -a2 + b2, v1 = -(m12 + m22) / d2, v2 = -(-m12 + m22) / d2;
        return [v1, v2];
      } else if (b2 !== c4 && d2 === 0) {
        return [(2 * b2 - c4) / (2 * (b2 - c4))];
      }
      return [];
    }
    if (p2.length === 2) {
      const a2 = p2[0], b2 = p2[1];
      if (a2 !== b2) {
        return [a2 / (a2 - b2)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t2, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d3 = utils.compute(t2, d1);
    const dd = utils.compute(t2, d2);
    const qdsum = d3.x * d3.x + d3.y * d3.y;
    if (_3d) {
      num = sqrt(
        pow(d3.y * dd.z - dd.y * d3.z, 2) + pow(d3.z * dd.x - dd.z * d3.x, 2) + pow(d3.x * dd.y - dd.x * d3.y, 2)
      );
      dnm = pow(qdsum + d3.z * d3.z, 3 / 2);
    } else {
      num = d3.x * dd.y - d3.y * dd.x;
      dnm = pow(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) {
      return { k: 0, r: 0 };
    }
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t2 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t2 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs2(nk - k) + abs2(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points2) {
    if (points2.length < 4) return [];
    const p2 = utils.align(points2, { p1: points2[0], p2: points2.slice(-1)[0] }), a2 = p2[2].x * p2[1].y, b2 = p2[3].x * p2[1].y, c4 = p2[1].x * p2[2].y, d2 = p2[3].x * p2[2].y, v1 = 18 * (-3 * a2 + 2 * b2 + 3 * c4 - d2), v2 = 18 * (3 * a2 - b2 - 3 * c4), v3 = 18 * (c4 - a2);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t2 = -v3 / v2;
        if (0 <= t2 && t2 <= 1) return [t2];
      }
      return [];
    }
    const d22 = 2 * v1;
    if (utils.approximately(d22, 0)) return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0) return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d22, -(v2 + sq) / d22].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t2, d2; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t2 = b2[dim].mid;
      d2 = (b1[dim].size + b2[dim].size) / 2;
      if (abs2(l - t2) >= d2) return false;
    }
    return true;
  },
  expandbox: function(bbox7, _bbox) {
    if (_bbox.x.min < bbox7.x.min) {
      bbox7.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox7.y.min) {
      bbox7.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox7.z.min) {
      bbox7.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox7.x.max) {
      bbox7.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox7.y.max) {
      bbox7.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox7.z.max) {
      bbox7.z.max = _bbox.z.max;
    }
    bbox7.x.mid = (bbox7.x.min + bbox7.x.max) / 2;
    bbox7.y.mid = (bbox7.y.min + bbox7.y.max) / 2;
    if (bbox7.z) {
      bbox7.z.mid = (bbox7.z.min + bbox7.z.max) / 2;
    }
    bbox7.x.size = bbox7.x.max - bbox7.x.min;
    bbox7.y.size = bbox7.y.max - bbox7.y.min;
    if (bbox7.z) {
      bbox7.z.size = bbox7.z.max - bbox7.z.min;
    }
  },
  pairiteration: function(c12, c22, curveIntersectionThreshold) {
    const c1b = c12.bbox(), c2b = c22.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c12._t1 + c12._t2) / 2 | 0) / r + "/" + (r * (c22._t1 + c22._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c12.split(0.5), cc2 = c22.split(0.5), pairs = [
      { left: cc1.left, right: cc2.left },
      { left: cc1.left, right: cc2.right },
      { left: cc1.right, right: cc2.right },
      { left: cc1.right, right: cc2.left }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0) return results;
    pairs.forEach(function(pair) {
      results = results.concat(
        utils.pairiteration(pair.left, pair.right, threshold)
      );
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos(quart) - dy1 * sin(quart), dy1p = dx1 * sin(quart) + dy1 * cos(quart), dx2p = dx2 * cos(quart) - dy2 * sin(quart), dy2p = dx2 * sin(quart) + dy2 * cos(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
    let s = atan2(p1.y - arc.y, p1.x - arc.x), m3 = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
    if (s < e) {
      if (s > m3 || m3 > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m3 && m3 < s) {
        _ = e;
        e = s;
        s = _;
      } else {
        e += tau;
      }
    }
    arc.s = s;
    arc.e = e;
    arc.r = r;
    return arc;
  },
  numberSort: function(a2, b2) {
    return a2 - b2;
  }
};
var PolyBezier = class _PolyBezier {
  constructor(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(curve) {
      return utils.pointsToString(curve.points);
    }).join(", ") + "]";
  }
  addCurve(curve) {
    this.curves.push(curve);
    this._3d = this._3d || curve._3d;
  }
  length() {
    return this.curves.map(function(v) {
      return v.length();
    }).reduce(function(a2, b2) {
      return a2 + b2;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c4 = this.curves;
    var bbox7 = c4[0].bbox();
    for (var i = 1; i < c4.length; i++) {
      utils.expandbox(bbox7, c4[i].bbox());
    }
    return bbox7;
  }
  offset(d2) {
    const offset2 = [];
    this.curves.forEach(function(v) {
      offset2.push(...v.offset(d2));
    });
    return new _PolyBezier(offset2);
  }
};
var { abs: abs3, min, max, cos: cos2, sin: sin2, acos: acos2, sqrt: sqrt2 } = Math;
var pi2 = Math.PI;
var Bezier = class _Bezier {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point3) {
        ["x", "y", "z"].forEach(function(d2) {
          if (typeof point3[d2] !== "undefined") {
            newargs.push(point3[d2]);
          }
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points2 = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point22 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point22.z = args[idx + 2];
      }
      points2.push(point22);
    }
    const order = this.order = points2.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d) dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points2, { p1: points2[0], p2: points2[order] });
    const baselength = utils.dist(points2[0], points2[order]);
    this._linear = aligned.reduce((t2, p2) => t2 + abs3(p2.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t2) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    if (t2 === 0) {
      return new _Bezier(p2, p2, p3);
    }
    if (t2 === 1) {
      return new _Bezier(p1, p2, p2);
    }
    const abc = _Bezier.getABC(2, p1, p2, p3, t2);
    return new _Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B, E, t2, d1) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    const abc = _Bezier.getABC(3, S, B, E, t2);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B, abc.C);
    }
    const d2 = d1 * (1 - t2) / t2;
    const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B.x - bx1, y: B.y - by1 }, e2 = { x: B.x + bx2, y: B.y + by2 }, A = abc.A, v1 = { x: A.x + (e1.x - A.x) / (1 - t2), y: A.y + (e1.y - A.y) / (1 - t2) }, v2 = { x: A.x + (e2.x - A.x) / t2, y: A.y + (e2.y - A.y) / t2 }, nc1 = { x: S.x + (v1.x - S.x) / t2, y: S.y + (v1.y - S.y) / t2 }, nc2 = {
      x: E.x + (v2.x - E.x) / (1 - t2),
      y: E.y + (v2.y - E.y) / (1 - t2)
    };
    return new _Bezier(S, nc1, nc2, E);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return _Bezier.getUtils();
  }
  static get PolyBezier() {
    return PolyBezier;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return utils.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d) return false;
    const p2 = this.points, x = p2[0].x, y = p2[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last2 = p2.length; i < last2; i++) {
      s.push(p2[i].x);
      s.push(p2[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) {
      throw new Error("incorrect number of ratio values");
    }
    this.ratios = ratios;
    this._lut = [];
  }
  verify() {
    const print = this.coordDigest();
    if (print !== this._print) {
      this._print = print;
      this.update();
    }
  }
  coordDigest() {
    return this.points.map(function(c4, pos) {
      return "" + pos + c4.x + c4.y + (c4.z ? c4.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points2 = this.points;
    const angle = utils.angle(points2[0], points2[this.order], points2[1]);
    this.clockwise = angle > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S, B, E, t2 = 0.5) {
    const u = utils.projectionratio(t2, order), um = 1 - u, C = {
      x: u * S.x + um * E.x,
      y: u * S.y + um * E.y
    }, s = utils.abcratio(t2, order), A = {
      x: B.x + (B.x - C.x) / s,
      y: B.y + (B.y - C.y) / s
    };
    return { A, B, C, S, E };
  }
  getABC(t2, B) {
    B = B || this.get(t2);
    let S = this.points[0];
    let E = this.points[this.order];
    return _Bezier.getABC(this.order, S, B, E, t2);
  }
  getLUT(steps2) {
    this.verify();
    steps2 = steps2 || 100;
    if (this._lut.length === steps2 + 1) {
      return this._lut;
    }
    this._lut = [];
    steps2++;
    this._lut = [];
    for (let i = 0, p2, t2; i < steps2; i++) {
      t2 = i / (steps2 - 1);
      p2 = this.compute(t2);
      p2.t = t2;
      this._lut.push(p2);
    }
    return this._lut;
  }
  on(point22, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c4, t2 = 0; i < lut.length; i++) {
      c4 = lut[i];
      if (utils.dist(c4, point22) < error) {
        hits.push(c4);
        t2 += i / lut.length;
      }
    }
    if (!hits.length) return false;
    return t /= hits.length;
  }
  project(point22) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point22), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t3 = t1, ft = t3, p2;
    mdist += 1;
    for (let d2; t3 < t2 + step; t3 += step) {
      p2 = this.compute(t3);
      d2 = utils.dist(point22, p2);
      if (d2 < mdist) {
        mdist = d2;
        ft = t3;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p2 = this.compute(ft);
    p2.t = ft;
    p2.d = mdist;
    return p2;
  }
  get(t2) {
    return this.compute(t2);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t2) {
    if (this.ratios) {
      return utils.computeWithRatios(t2, this.points, this.ratios, this._3d);
    }
    return utils.compute(t2, this.points, this._3d, this.ratios);
  }
  raise() {
    const p2 = this.points, np = [p2[0]], k = p2.length;
    for (let i = 1, pi5, pim; i < k; i++) {
      pi5 = p2[i];
      pim = p2[i - 1];
      np[i] = {
        x: (k - i) / k * pi5.x + i / k * pim.x,
        y: (k - i) / k * pi5.y + i / k * pim.y
      };
    }
    np[k] = p2[k - 1];
    return new _Bezier(np);
  }
  derivative(t2) {
    return utils.compute(t2, this.dpoints[0], this._3d);
  }
  dderivative(t2) {
    return utils.compute(t2, this.dpoints[1], this._3d);
  }
  align() {
    let p2 = this.points;
    return new _Bezier(utils.align(p2, { p1: p2[0], p2: p2[p2.length - 1] }));
  }
  curvature(t2) {
    return utils.curvature(t2, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t2) {
    return this._3d ? this.__normal3(t2) : this.__normal2(t2);
  }
  __normal2(t2) {
    const d2 = this.derivative(t2);
    const q = sqrt2(d2.x * d2.x + d2.y * d2.y);
    return { t: t2, x: -d2.y / q, y: d2.x / q };
  }
  __normal3(t2) {
    const r1 = this.derivative(t2), r2 = this.derivative(t2 + 0.01), q1 = sqrt2(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt2(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c4 = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m3 = sqrt2(c4.x * c4.x + c4.y * c4.y + c4.z * c4.z);
    c4.x /= m3;
    c4.y /= m3;
    c4.z /= m3;
    const R = [
      c4.x * c4.x,
      c4.x * c4.y - c4.z,
      c4.x * c4.z + c4.y,
      c4.x * c4.y + c4.z,
      c4.y * c4.y,
      c4.y * c4.z - c4.x,
      c4.x * c4.z - c4.y,
      c4.y * c4.z + c4.x,
      c4.z * c4.z
    ];
    const n2 = {
      t: t2,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n2;
  }
  hull(t2) {
    let p2 = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p2[0];
    q[idx++] = p2[1];
    q[idx++] = p2[2];
    if (this.order === 3) {
      q[idx++] = p2[3];
    }
    while (p2.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p2.length - 1; i < l; i++) {
        pt = utils.lerp(t2, p2[i], p2[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p2 = _p;
    }
    return q;
  }
  split(t1, t2) {
    if (t1 === 0 && !!t2) {
      return this.split(t2).left;
    }
    if (t2 === 1) {
      return this.split(t1).right;
    }
    const q = this.hull(t1);
    const result = {
      left: this.order === 2 ? new _Bezier([q[0], q[3], q[5]]) : new _Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new _Bezier([q[5], q[4], q[2]]) : new _Bezier([q[9], q[8], q[6], q[3]]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t2) {
      return result;
    }
    t2 = utils.map(t2, t1, 1, 0, 1);
    return result.right.split(t2).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(
      function(dim) {
        let mfn = function(v) {
          return v[dim];
        };
        let p2 = this.dpoints[0].map(mfn);
        result[dim] = utils.droots(p2);
        if (this.order === 3) {
          p2 = this.dpoints[1].map(mfn);
          result[dim] = result[dim].concat(utils.droots(p2));
        }
        result[dim] = result[dim].filter(function(t2) {
          return t2 >= 0 && t2 <= 1;
        });
        roots = roots.concat(result[dim].sort(utils.numberSort));
      }.bind(this)
    );
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(
      function(d2) {
        result[d2] = utils.getminmax(this, d2, extrema[d2]);
      }.bind(this)
    );
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t2, d2) {
    if (typeof d2 !== "undefined") {
      const c4 = this.get(t2), n2 = this.normal(t2);
      const ret = {
        c: c4,
        n: n2,
        x: c4.x + n2.x * d2,
        y: c4.y + n2.y * d2
      };
      if (this._3d) {
        ret.z = c4.z + n2.z * d2;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p2) {
        const ret = {
          x: p2.x + t2 * nv.x,
          y: p2.y + t2 * nv.y
        };
        if (p2.z && nv.z) {
          ret.z = p2.z + t2 * nv.z;
        }
        return ret;
      });
      return [new _Bezier(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) {
        return s.offset(t2)[0];
      }
      return s.scale(t2);
    });
  }
  simple() {
    if (this.order === 3) {
      const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
      const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs3(acos2(s)) < pi2 / 3;
  }
  reduce() {
    let i, t1 = 0, t2 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema);
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1);
    }
    for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
      t2 = extrema[i];
      segment = this.split(t1, t2);
      segment._t1 = t1;
      segment._t2 = t2;
      pass1.push(segment);
      t1 = t2;
    }
    pass1.forEach(function(p1) {
      t1 = 0;
      t2 = 0;
      while (t2 <= 1) {
        for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
          segment = p1.split(t1, t2);
          if (!segment.simple()) {
            t2 -= step;
            if (abs3(t1 - t2) < step) {
              return [];
            }
            segment = p1.split(t1, t2);
            segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
            segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
            pass2.push(segment);
            t1 = t2;
            break;
          }
        }
      }
      if (t1 < 1) {
        segment = p1.split(t1, 1);
        segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
        segment._t2 = p1._t2;
        pass2.push(segment);
      }
    });
    return pass2;
  }
  translate(v, d1, d2) {
    d2 = typeof d2 === "number" ? d2 : d1;
    const o = this.order;
    let d3 = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new _Bezier(
      this.points.map((p2, i) => ({
        x: p2.x + v.x * d3[i],
        y: p2.y + v.y * d3[i]
      }))
    );
  }
  scale(d2) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d2 === "function") {
      distanceFn = d2;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points2 = this.points;
    if (this._linear) {
      return this.translate(
        this.normal(0),
        distanceFn ? distanceFn(0) : d2,
        distanceFn ? distanceFn(1) : d2
      );
    }
    const r1 = distanceFn ? distanceFn(0) : d2;
    const r2 = distanceFn ? distanceFn(1) : d2;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t2) {
      const p2 = np[t2 * order] = utils.copy(points2[t2 * order]);
      p2.x += (t2 ? r2 : r1) * v[t2].n.x;
      p2.y += (t2 ? r2 : r1) * v[t2].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t2) => {
        if (order === 2 && !!t2) return;
        const p2 = np[t2 * order];
        const d22 = this.derivative(t2);
        const p22 = { x: p2.x + d22.x, y: p2.y + d22.y };
        np[t2 + 1] = utils.lli4(p2, p22, o, points2[t2 + 1]);
      });
      return new _Bezier(np);
    }
    [0, 1].forEach(function(t2) {
      if (order === 2 && !!t2) return;
      var p2 = points2[t2 + 1];
      var ov = {
        x: p2.x - o.x,
        y: p2.y - o.y
      };
      var rc = distanceFn ? distanceFn((t2 + 1) / order) : d2;
      if (distanceFn && !clockwise) rc = -rc;
      var m3 = sqrt2(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m3;
      ov.y /= m3;
      np[t2 + 1] = {
        x: p2.x + rc * ov.x,
        y: p2.y + rc * ov.y
      };
    });
    return new _Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n2 = this.normal(0);
      const start = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start.x + n2.x * d1, y: start.y + n2.y * d1 };
      e = { x: end.x + n2.x * d3, y: end.y + n2.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start.x - n2.x * d2, y: start.y - n2.y * d2 };
      e = { x: end.x - n2.x * d4, y: end.y - n2.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new _Bezier(fline), le2, new _Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p2, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d5 = e - s;
        return utils.map(v, 0, 1, s + f1 * d5, s + f2 * d5);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(
          segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen))
        );
        bcurves.push(
          segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen))
        );
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p2 = s.points;
      if (p2[3]) {
        s.points = [p2[3], p2[2], p2[1], p2[0]];
      } else {
        s.points = [p2[2], p2[1], p2[0]];
      }
      return s;
    }).reverse();
    const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
    return new PolyBezier(segments);
  }
  outlineshapes(d1, d2, curveIntersectionThreshold) {
    d2 = d2 || d1;
    const outline = this.outline(d1, d2).curves;
    const shapes = [];
    for (let i = 1, len = outline.length; i < len / 2; i++) {
      const shape = utils.makeshape(
        outline[i],
        outline[len - i],
        curveIntersectionThreshold
      );
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve) return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof _Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(
      this.reduce(),
      curve,
      curveIntersectionThreshold
    );
  }
  lineIntersects(line) {
    const mx = min(line.p1.x, line.p2.x), my = min(line.p1.y, line.p2.y), MX = max(line.p1.x, line.p2.x), MY = max(line.p1.y, line.p2.y);
    return utils.roots(this.points, line).filter((t2) => {
      var p2 = this.get(t2);
      return utils.between(p2.x, mx, MX) && utils.between(p2.y, my, MY);
    });
  }
  selfintersects(curveIntersectionThreshold) {
    const reduced = this.reduce(), len = reduced.length - 2, results = [];
    for (let i = 0, result, left, right; i < len; i++) {
      left = reduced.slice(i, i + 1);
      right = reduced.slice(i + 2);
      result = this.curveintersects(left, right, curveIntersectionThreshold);
      results.push(...result);
    }
    return results;
  }
  curveintersects(c12, c22, curveIntersectionThreshold) {
    const pairs = [];
    c12.forEach(function(l) {
      c22.forEach(function(r) {
        if (l.overlaps(r)) {
          pairs.push({ left: l, right: r });
        }
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(
        pair.left,
        pair.right,
        curveIntersectionThreshold
      );
      if (result.length > 0) {
        intersections2 = intersections2.concat(result);
      }
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c12 = this.get(s + q), c22 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c12), d2 = utils.dist(pc, c22);
    return abs3(d1 - ref) + abs3(d2 - ref);
  }
  _iterate(errorThreshold, circles) {
    let t_s = 0, t_e = 1, safety;
    do {
      safety = 0;
      t_e = 1;
      let np1 = this.get(t_s), np2, np3, arc, prev_arc;
      let curr_good = false, prev_good = false, done;
      let t_m = t_e, prev_e = 1, step = 0;
      do {
        prev_good = curr_good;
        prev_arc = arc;
        t_m = (t_s + t_e) / 2;
        step++;
        np2 = this.get(t_m);
        np3 = this.get(t_e);
        arc = utils.getccenter(np1, np2, np3);
        arc.interval = {
          start: t_s,
          end: t_e
        };
        let error = this._error(arc, np1, t_s, t_e);
        curr_good = error <= errorThreshold;
        done = prev_good && !curr_good;
        if (!done) prev_e = t_e;
        if (curr_good) {
          if (t_e >= 1) {
            arc.interval.end = prev_e = 1;
            prev_arc = arc;
            if (t_e > 1) {
              let d2 = {
                x: arc.x + arc.r * cos2(arc.e),
                y: arc.y + arc.r * sin2(arc.e)
              };
              arc.e += utils.angle({ x: arc.x, y: arc.y }, d2, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else {
          t_e = t_m;
        }
      } while (!done && safety++ < 100);
      if (safety >= 100) {
        break;
      }
      prev_arc = prev_arc ? prev_arc : arc;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};
var quadraticBend = (a2, b2, bend = 0) => quadraticSimple(a2, b2, bend);
var quadraticSimple = (start, end, bend = 0) => {
  if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
  if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
  const middle = interpolate(0.5, start, end);
  let target = middle;
  if (end.y < start.y) {
    target = bend > 0 ? { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y) };
  }
  const handle = interpolate(Math.abs(bend), middle, target);
  return quadratic(start, end, handle);
};
var computeQuadraticSimple = (start, end, bend, amt) => {
  const q = quadraticSimple(start, end, bend);
  const bzr = new Bezier(q.a, q.quadratic, q.b);
  return bzr.compute(amt);
};
var quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath3 = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) {
    return cubicToPath(cubicOrQuadratic);
  } else if (isQuadraticBezier(cubicOrQuadratic)) {
    return quadratictoPath(cubicOrQuadratic);
  } else {
    throw new Error(`Unknown bezier type`);
  }
};
var cubic = (start, end, cubic1, cubic2) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic2) => {
  const { a: a2, cubic1, cubic2: cubic22, b: b2 } = cubic2;
  const bzr = new Bezier(a2, cubic1, cubic22, b2);
  return Object.freeze({
    ...cubic2,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    toSvgString: () => [`brrup`],
    kind: `bezier/cubic`
  });
};
var quadratic = (start, end, handle) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  quadratic: Object.freeze(handle)
});
var quadratictoPath = (quadraticBezier) => {
  const { a: a2, b: b2, quadratic: quadratic2 } = quadraticBezier;
  const bzr = new Bezier(a2, quadratic2, b2);
  return Object.freeze({
    ...quadraticBezier,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a2, b2, quadratic2),
    kind: `bezier/quadratic`
  });
};
var CompoundPath_exports = {};
__export2(CompoundPath_exports, {
  bbox: () => bbox4,
  computeDimensions: () => computeDimensions,
  distanceToPoint: () => distanceToPoint,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate4,
  relativePosition: () => relativePosition2,
  setSegment: () => setSegment,
  toString: () => toString4,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path) => {
  const existing = [...compoundPath.segments];
  existing[index] = path;
  return fromPaths(...existing);
};
var interpolate4 = (paths, t2, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  const expected = t2 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (const [index, element] of l.entries()) {
    if (soFar + element >= expected) {
      const relative = expected - soFar;
      let amt = relative / element;
      if (amt > 1) amt = 1;
      return paths[index].interpolate(amt);
    } else soFar += element;
  }
  return { x: 0, y: 0 };
};
var distanceToPoint = (paths, point22) => {
  if (paths.length === 0) return 0;
  let distances = paths.map((p2, index) => ({ path: p2, index, distance: p2.distanceToPoint(point22) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length === 0) throw new Error(`Could not look up distances`);
  return distances[0].distance;
};
var relativePosition2 = (paths, point22, intersectionThreshold, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  let distances = paths.map((p2, index) => ({ path: p2, index, distance: p2.distanceToPoint(point22) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length < 0) throw new Error(`Point does not intersect with path`);
  const d2 = distances[0];
  if (d2.distance > intersectionThreshold) throw new Error(`Point does not intersect with path. Minimum distance: ${d2.distance}, threshold: ${intersectionThreshold}`);
  const relativePositionOnPath = d2.path.relativePosition(point22, intersectionThreshold);
  let accumulated = 0;
  for (let index = 0; index < d2.index; index++) {
    accumulated += dimensions.lengths[index];
  }
  accumulated += dimensions.lengths[d2.index] * relativePositionOnPath;
  const accumulatedRel = accumulated / dimensions.totalLength;
  console.log(`acc: ${accumulated} rel: ${accumulatedRel} on path: ${relativePositionOnPath} path: ${d2.index}`);
  return accumulatedRel;
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths3 = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (const length5 of lengths3) {
    totalLength += length5;
  }
  for (const width of widths) {
    totalWidth += width;
  }
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox4 = (paths) => {
  const boxes = paths.map((p2) => p2.bbox());
  const corners3 = boxes.flatMap((b2) => corners(b2));
  return bbox(...corners3);
};
var toString4 = (paths) => paths.map((p2) => p2.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = getEnd(paths[0]);
  for (let index = 1; index < paths.length; index++) {
    const start = getStart(paths[index]);
    if (!isEqual(start, lastPos)) throw new Error(`Path index ${index} does not start at prior path end. Start: ${start.x},${start.y} expected: ${lastPos.x},${lastPos.y}`);
    lastPos = getEnd(paths[index]);
  }
};
var toSvgString2 = (paths) => paths.flatMap((p2) => p2.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    interpolate: (t2, useWidth = false) => interpolate4(paths, t2, useWidth, dims),
    relativePosition: (point22, intersectionThreshold) => relativePosition2(paths, point22, intersectionThreshold, dims),
    distanceToPoint: (point22) => distanceToPoint(paths, point22),
    bbox: () => bbox4(paths),
    toString: () => toString4(paths),
    toSvgString: () => toSvgString2(paths),
    kind: `compound`
  });
};
var Ellipse_exports = {};
__export2(Ellipse_exports, {
  fromDegrees: () => fromDegrees
});
var fromDegrees = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});
var CurveSimplification_exports = {};
__export2(CurveSimplification_exports, {
  rdpPerpendicularDistance: () => rdpPerpendicularDistance,
  rdpShortestDistance: () => rdpShortestDistance
});
var rdpShortestDistance = (points2, epsilon2 = 0.1) => {
  const firstPoint = points2[0];
  const lastPoint = points2.at(-1);
  if (points2.length < 3) {
    return points2;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points2.length - 1; index_++) {
    const cDistribution = distanceFromPointToLine(points2[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points2.slice(0, index + 1);
    const l2 = points2.slice(index);
    const r1 = rdpShortestDistance(l1, epsilon2);
    const r2 = rdpShortestDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
var rdpPerpendicularDistance = (points2, epsilon2 = 0.1) => {
  const firstPoint = points2[0];
  const lastPoint = points2.at(-1);
  if (points2.length < 3) {
    return points2;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points2.length - 1; index_++) {
    const cDistribution = findPerpendicularDistance(points2[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points2.slice(0, index + 1);
    const l2 = points2.slice(index);
    const r1 = rdpPerpendicularDistance(l1, epsilon2);
    const r2 = rdpPerpendicularDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
function findPerpendicularDistance(p2, p1, p22) {
  let result;
  let slope2;
  let intercept;
  if (p1.x == p22.x) {
    result = Math.abs(p2.x - p1.x);
  } else {
    slope2 = (p22.y - p1.y) / (p22.x - p1.x);
    intercept = p1.y - slope2 * p1.x;
    result = Math.abs(slope2 * p2.x - p2.y + intercept) / Math.sqrt(Math.pow(slope2, 2) + 1);
  }
  return result;
}
var distanceFromPointToLine = (p2, index, index_) => {
  const lineLength = distance(index, index_);
  if (lineLength == 0) {
    return distance(p2, index);
  }
  const t2 = ((p2.x - index.x) * (index_.x - index.x) + (p2.y - index.y) * (index_.y - index.y)) / lineLength;
  if (t2 < 0) {
    return distance(p2, index);
  }
  if (t2 > 1) {
    return distance(p2, index_);
  }
  return distance(p2, { x: index.x + t2 * (index_.x - index.x), y: index.y + t2 * (index_.y - index.y) });
};
var QuadTree_exports = {};
__export2(QuadTree_exports, {
  Direction: () => Direction,
  QuadTreeNode: () => QuadTreeNode,
  quadTree: () => quadTree
});
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["Nw"] = 0] = "Nw";
  Direction2[Direction2["Ne"] = 1] = "Ne";
  Direction2[Direction2["Sw"] = 2] = "Sw";
  Direction2[Direction2["Se"] = 3] = "Se";
  return Direction2;
})(Direction || {});
var quadTree = (bounds, initialData = [], opts = {}) => {
  const o = {
    maxItems: opts.maxItems ?? 4,
    maxLevels: opts.maxLevels ?? 4
  };
  const n2 = new QuadTreeNode(void 0, bounds, 0, o);
  for (const d2 of initialData) {
    n2.add(d2);
  }
  return n2;
};
var QuadTreeNode = class _QuadTreeNode {
  /**
   * Constructor
   * @param boundary
   * @param level
   * @param opts
   */
  constructor(parent, boundary, level, opts) {
    this.boundary = boundary;
    this.level = level;
    this.opts = opts;
    this.#parent = parent;
  }
  #items = [];
  #children = [];
  #parent;
  getLengthChildren() {
    return this.#children.length;
  }
  *parents() {
    let n2 = this;
    while (n2.#parent !== void 0) {
      yield n2.#parent;
      n2 = n2.#parent;
    }
  }
  getParent() {
    return this.#parent;
  }
  /**
   * Iterates over immediate children
   */
  *children() {
    for (const c4 of this.#children) {
      yield c4;
    }
  }
  /**
   * Array of QuadTreeItem
   * @returns
   */
  getValue() {
    return this.#items;
  }
  getIdentity() {
    return this;
  }
  /**
   * Get a descendant node in a given direction
   * @param d
   * @returns
   */
  direction(d2) {
    return this.#children[d2];
  }
  /**
   * Add an item to the quadtree
   * @param p
   * @returns False if item is outside of boundary, True if item was added
   */
  add(p2) {
    if (!isIntersecting3(this.boundary, p2)) return false;
    if (this.#children.length > 0) {
      for (const d2 of this.#children) d2.add(p2);
      return true;
    }
    this.#items.push(p2);
    if (this.#items.length > this.opts.maxItems && this.level < this.opts.maxLevels) {
      if (this.#children.length === 0) {
        this.#subdivide();
      }
      for (const item of this.#items) {
        for (const d2 of this.#children) d2.add(item);
      }
      this.#items = [];
    }
    return true;
  }
  /**
   * Returns true if point is inside node's boundary
   * @param p
   * @returns
   */
  couldHold(p2) {
    return intersectsPoint(this.boundary, p2);
  }
  #subdivide() {
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    const x = this.boundary.x;
    const y = this.boundary.y;
    const coords = fromNumbers2(x + w, y, x, y, x, y + h, x + w, y + h);
    const rects = coords.map((p2) => fromTopLeft(p2, w, h));
    this.#children = rects.map(
      (r) => new _QuadTreeNode(this, r, this.level + 1, this.opts)
    );
  }
};
var Scaler_exports = {};
__export2(Scaler_exports, {
  scaler: () => scaler2
});
var Placeholder3 = Object.freeze({
  width: Number.NaN,
  height: Number.NaN
});
var PlaceholderPositioned = Object.freeze({
  x: Number.NaN,
  y: Number.NaN,
  width: Number.NaN,
  height: Number.NaN
});
var scaler2 = (scaleBy = `both`, defaultRect) => {
  const defaultBounds = defaultRect ?? Placeholder3;
  let sw = 1;
  let sh = 1;
  let s = { x: 1, y: 1 };
  const computeScale = () => {
    switch (scaleBy) {
      case `height`: {
        return { x: sh, y: sh };
      }
      case `width`: {
        return { x: sw, y: sw };
      }
      case `min`: {
        return { x: Math.min(sw, sh), y: Math.min(sw, sh) };
      }
      case `max`: {
        return { x: Math.max(sw, sh), y: Math.max(sw, sh) };
      }
      default: {
        return { x: sw, y: sh };
      }
    }
  };
  const normalise4 = (a2, b2, c4, d2) => {
    let inX = Number.NaN;
    let inY = Number.NaN;
    let outW = defaultBounds.width;
    let outH = defaultBounds.height;
    if (typeof a2 === `number`) {
      inX = a2;
      if (typeof b2 === `number`) {
        inY = b2;
        if (c4 === void 0) return [inX, inY, outW, outH];
        if (isRect(c4)) {
          outW = c4.width;
          outH = c4.height;
        } else if (typeof c4 === `number`) {
          outW = c4;
          if (typeof d2 === `number`) {
            outH = d2;
          } else {
            throw new TypeError(`Missing final height value`);
          }
        } else throw new Error(`Missing valid output range`);
      } else if (isRect(b2)) {
        outW = b2.width;
        outH = b2.height;
      } else {
        throw new Error(
          `Expected input y or output Rect to follow first number parameter`
        );
      }
    } else if (isPoint(a2)) {
      inX = a2.x;
      inY = a2.y;
      if (b2 === void 0) return [inX, inY, outW, outH];
      if (isRect(b2)) {
        outW = b2.width;
        outH = b2.height;
      } else if (typeof b2 === `number`) {
        outW = b2;
        if (typeof c4 === `number`) {
          outH = c4;
        } else {
          throw new TypeError(
            `Expected height as third parameter after Point and output width`
          );
        }
      } else {
        throw new TypeError(
          `Expected Rect or width as second parameter when first parameter is a Point`
        );
      }
    } else {
      throw new Error(`Expected input Point or x value as first parameter`);
    }
    return [inX, inY, outW, outH];
  };
  const scaleAbs = (a2, b2, c4, d2) => {
    const n2 = normalise4(a2, b2, c4, d2);
    return scaleNormalised(true, ...n2);
  };
  const scaleRel = (a2, b2, c4, d2) => {
    const n2 = normalise4(a2, b2, c4, d2);
    return scaleNormalised(false, ...n2);
  };
  const scaleNormalised = (abs4, x, y, w, h) => {
    if (Number.isNaN(w)) throw new Error(`Output width range missing`);
    if (Number.isNaN(h)) throw new Error(`Output height range missing`);
    if (w !== sw || h !== sh) {
      sw = w;
      sh = h;
      s = computeScale();
    }
    return abs4 ? {
      x: x * s.x,
      y: y * s.y
    } : {
      x: x / s.x,
      y: y / s.y
    };
  };
  return {
    computeScale,
    rel: scaleRel,
    abs: scaleAbs,
    width: defaultBounds.width,
    height: defaultBounds.height
  };
};
var Convolve2d_exports = {};
__export2(Convolve2d_exports, {
  boxBlurKernel: () => boxBlurKernel,
  convolve: () => convolve,
  convolveCell: () => convolveCell,
  convolveImage: () => convolveImage,
  edgeDetectionKernel: () => edgeDetectionKernel,
  gaussianBlur3Kernel: () => gaussianBlur3Kernel,
  gaussianBlur5Kernel: () => gaussianBlur5Kernel,
  identityKernel: () => identityKernel,
  kernel2dToArray: () => kernel2dToArray,
  multiply: () => multiply5,
  rgbReducer: () => rgbReducer,
  sharpenKernel: () => sharpenKernel,
  unsharpMasking5Kernel: () => unsharpMasking5Kernel
});
var ImageDataGrid_exports = {};
__export2(ImageDataGrid_exports, {
  accessor: () => accessor,
  byColumn: () => byColumn,
  byRow: () => byRow
});
var accessor = (image) => {
  const grid = { rows: image.width, cols: image.height };
  const data = image.data;
  const fn = (cell, bounds) => {
    const index = indexFromCell(grid, cell, bounds);
    if (index === void 0) {
      return void 0;
    }
    const pxIndex = index * 4;
    return {
      r: data[pxIndex],
      g: data[pxIndex + 1],
      b: data[pxIndex + 2],
      opacity: data[pxIndex + 3],
      space: `srgb`
    };
  };
  return fn;
};
function* byRow(image) {
  const a2 = accessor(image);
  const grid = { rows: image.width, cols: image.height };
  for (let y = 0; y < grid.rows; y++) {
    let row = [];
    for (let x = 0; x < grid.cols; x++) {
      const p2 = a2({ x, y }, `undefined`);
      if (p2) row.push(p2);
    }
    yield row;
  }
}
function* byColumn(image) {
  const a2 = accessor(image);
  const grid = { rows: image.width, cols: image.height };
  for (let x = 0; x < grid.cols; x++) {
    let col = [];
    for (let y = 0; y < grid.rows; y++) {
      const p2 = a2({ x, y }, `undefined`);
      if (p2) col.push(p2);
    }
    yield col;
  }
}
var multiply5 = (kernel, scalar) => {
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  const copy = [];
  for (let row = 0; row < rows2; row++) {
    copy[row] = [];
    for (let col = 0; col < cols; col++) {
      copy[row][col] = kernel[row][col] * scalar;
    }
  }
  return copy;
};
function convolveCell(c4, kernel, source, access, reduce2) {
  const valuesAtKernelPos = kernel.map((o) => {
    const pos = offset(source, c4, o[0], `stop`);
    if (!pos) return [o[1], void 0];
    return [o[1], access(pos, `undefined`)];
  });
  return reduce2(valuesAtKernelPos);
}
function* convolveImage(kernel, image) {
  const grid = { rows: image.width, cols: image.height };
  const imageDataAsGrid = accessor(image);
  yield* convolve(kernel, grid, imageDataAsGrid, cells(grid), rgbReducer);
}
function* convolve(kernel, source, access, visitor2, reduce2, origin) {
  if (!origin) {
    const kernelRows = kernel.length;
    const kernelCols = kernel[0].length;
    origin = { x: Math.floor(kernelRows / 2), y: Math.floor(kernelCols / 2) };
  }
  const asArray = kernel2dToArray(kernel, origin);
  for (const c4 of visitor2) {
    const v = convolveCell(c4, asArray, source, access, reduce2);
    yield [c4, v];
  }
}
var kernel2dToArray = (kernel, origin) => {
  const offsets = [];
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  if (!origin) origin = { x: Math.floor(rows2 / 2), y: Math.floor(cols / 2) };
  for (let xx = 0; xx < rows2; xx++) {
    for (let yy = 0; yy < cols; yy++) {
      offsets.push([{ x: xx - origin.x, y: yy - origin.y }, kernel[xx][yy]]);
    }
  }
  return offsets;
};
var rgbReducer = (values) => {
  let r = 0;
  let g2 = 0;
  let b2 = 0;
  const opacity2 = 0;
  for (const value of values) {
    const rgb = value[1];
    const scale22 = value[0];
    if (rgb === void 0) continue;
    if (rgb.opacity === 0) continue;
    if (scale22 === 0) continue;
    r += rgb.r * scale22;
    g2 += rgb.g * scale22;
    b2 += rgb.b * scale22;
  }
  const result = {
    r,
    g: g2,
    b: b2,
    opacity: 255,
    space: `srgb`
  };
  return result;
};
var identityKernel = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];
var edgeDetectionKernel = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0]
];
var sharpenKernel = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0]
];
var boxBlurKernel = multiply5([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
], 1 / 9);
var gaussianBlur3Kernel = multiply5([
  [1, 2, 1],
  [2, 4, 2],
  [1, 2, 1]
], 1 / 16);
var gaussianBlur5Kernel = multiply5([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, 36, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], 1 / 256);
var unsharpMasking5Kernel = multiply5([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, -476, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], -1 / 256);
var arc_exports = {};
__export2(arc_exports, {
  bbox: () => bbox5,
  distanceCenter: () => distanceCenter2,
  fromDegrees: () => fromDegrees2,
  guard: () => guard6,
  interpolate: () => interpolate5,
  isArc: () => isArc,
  isEqual: () => isEqual6,
  isPositioned: () => isPositioned3,
  length: () => length4,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath4,
  toSvg: () => toSvg2
});
var isArc = (p2) => p2.startRadian !== void 0 && p2.endRadian !== void 0;
var isPositioned3 = (p2) => p2.x !== void 0 && p2.y !== void 0;
var piPi4 = Math.PI * 2;
function fromDegrees2(radius, startDegrees, endDegrees, origin) {
  const a2 = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees)
  };
  if (isPoint(origin)) {
    guard(origin);
    const ap = {
      ...a2,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else {
    return Object.freeze(a2);
  }
}
var toLine = (arc) => fromPoints(
  point(arc, arc.startRadian),
  point(arc, arc.endRadian)
);
var point = (arc, angleRadian3, origin) => {
  if (angleRadian3 > arc.endRadian) throw new Error(`angleRadian beyond end angle of arc`);
  if (angleRadian3 < arc.startRadian) throw new Error(`angleRadian beyond start angle of arc`);
  if (origin === void 0) {
    origin = isPositioned3(arc) ? arc : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(angleRadian3) * arc.radius + origin.x,
    y: Math.sin(angleRadian3) * arc.radius + origin.y
  };
};
var guard6 = (arc) => {
  if (arc === void 0) throw new Error(`Arc is undefined`);
  if (isPositioned3(arc)) {
    guard(arc, `arc`);
  }
  if (arc.radius === void 0) throw new Error(`Arc radius is undefined (${JSON.stringify(arc)})`);
  if (typeof arc.radius !== `number`) throw new Error(`Radius must be a number`);
  if (Number.isNaN(arc.radius)) throw new Error(`Radius is NaN`);
  if (arc.radius <= 0) throw new Error(`Radius must be greater than zero`);
  if (arc.startRadian === void 0) throw new Error(`Arc is missing 'startRadian' field`);
  if (arc.endRadian === void 0) throw new Error(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc.endRadian)) throw new Error(`Arc endRadian is NaN`);
  if (Number.isNaN(arc.startRadian)) throw new Error(`Arc endRadian is NaN`);
  if (arc.startRadian >= arc.endRadian) throw new Error(`startRadian is expected to be les than endRadian`);
};
var interpolate5 = (amount, arc, origin) => {
  guard6(arc);
  return point(arc, arc.startRadian + (arc.endRadian - arc.startRadian) * amount, origin);
};
var toPath4 = (arc) => {
  guard6(arc);
  return Object.freeze({
    ...arc,
    nearest: (point22) => {
      throw new Error(`not implemented`);
    },
    interpolate: (amount) => interpolate5(amount, arc),
    bbox: () => bbox5(arc),
    length: () => length4(arc),
    toSvgString: () => toSvg2(arc),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `arc`
  });
};
var length4 = (arc) => piPi4 * arc.radius * ((arc.startRadian - arc.endRadian) / piPi4);
var bbox5 = (arc) => {
  if (isPositioned3(arc)) {
    const middle = interpolate5(0.5, arc);
    const asLine = toLine(arc);
    return bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc.radius * 2,
      height: arc.radius * 2
    };
  }
};
var toSvg2 = (a2, b2, c4, d2, e) => {
  if (isArc(a2)) {
    if (isPositioned3(a2)) {
      return toSvgFull2(a2, a2.radius, a2.startRadian, a2.endRadian, b2);
    } else {
      return isPoint(b2) ? toSvgFull2(b2, a2.radius, a2.startRadian, a2.endRadian, c4) : toSvgFull2({ x: 0, y: 0 }, a2.radius, a2.startRadian, a2.endRadian);
    }
  } else {
    if (c4 === void 0) throw new Error(`startAngle undefined`);
    if (d2 === void 0) throw new Error(`endAngle undefined`);
    if (isPoint(a2)) {
      if (typeof b2 === `number` && typeof c4 === `number` && typeof d2 === `number`) {
        return toSvgFull2(a2, b2, c4, d2, e);
      } else {
        throw new TypeError(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull2 = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`) opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start = toCartesian(radius, endRadian - 0.01, origin);
  const end = toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d2 = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle) d2.push(`z`);
  return d2;
};
var distanceCenter2 = (a2, b2) => distance(a2, b2);
var isEqual6 = (a2, b2) => {
  if (a2.radius !== b2.radius) return false;
  if (isPositioned3(a2) && isPositioned3(b2)) {
    if (a2.x !== b2.x) return false;
    if (a2.y !== b2.y) return false;
    if (a2.z !== b2.z) return false;
    return true;
  } else if (!isPositioned3(a2) && !isPositioned3(b2)) {
  } else return false;
  if (a2.endRadian !== b2.endRadian) return false;
  if (a2.startRadian !== b2.startRadian) return false;
  return true;
};
var Vector_exports = {};
__export2(Vector_exports, {
  clampMagnitude: () => clampMagnitude3,
  divide: () => divide5,
  dotProduct: () => dotProduct4,
  fromLineCartesian: () => fromLineCartesian,
  fromLinePolar: () => fromLinePolar,
  fromPointPolar: () => fromPointPolar,
  fromRadians: () => fromRadians,
  multiply: () => multiply6,
  normalise: () => normalise3,
  quadrantOffsetAngle: () => quadrantOffsetAngle,
  subtract: () => subtract4,
  sum: () => sum4,
  toCartesian: () => toCartesian2,
  toPolar: () => toPolar,
  toRadians: () => toRadians,
  toString: () => toString5
});
var EmptyCartesian2 = Object.freeze({ x: 0, y: 0 });
var piPi5 = Math.PI * 2;
var pi3 = Math.PI;
var fromRadians = (radians) => {
  return Object.freeze({
    x: Math.cos(radians),
    y: Math.sin(radians)
  });
};
var toRadians = (point22) => {
  return Math.atan2(point22.y, point22.x);
};
var fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian2) => {
  pt = subtract(pt, origin);
  let direction = Math.atan2(pt.y, pt.x);
  if (angleNormalisation === `unipolar` && direction < 0) direction += piPi5;
  else if (angleNormalisation === `bipolar`) {
    if (direction > pi3) direction -= piPi5;
    else if (direction <= -pi3) direction += piPi5;
  }
  return Object.freeze({
    distance: distance(pt),
    angleRadian: direction
  });
};
var fromLineCartesian = (line) => subtract(line.b, line.a);
var fromLinePolar = (line) => {
  guard2(line, `line`);
  const pt = subtract(line.b, line.a);
  return fromPointPolar(pt);
};
var isPolar = (v) => {
  if (isPolarCoord(v)) return true;
  return false;
};
var isCartesian = (v) => {
  if (isPoint(v)) return true;
  return false;
};
var normalise3 = (v) => {
  if (isPolar(v)) {
    return normalise(v);
  } else if (isCartesian(v)) {
    return normalise2(v);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var quadrantOffsetAngle = (p2) => {
  if (p2.x >= 0 && p2.y >= 0) return 0;
  if (p2.x < 0 && p2.y >= 0) return pi3;
  if (p2.x < 0 && p2.y < 0) return pi3;
  return piPi5;
};
var toPolar = (v, origin = Empty) => {
  if (isPolar(v)) {
    return v;
  } else if (isCartesian(v)) {
    return fromCartesian(v, origin);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toCartesian2 = (v) => {
  if (isPolar(v)) {
    return toPoint(v);
  } else if (isCartesian(v)) {
    return v;
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toString5 = (v, digits) => {
  if (isPolar(v)) {
    return toString(v, digits);
  } else if (isCartesian(v)) {
    return toString2(v, digits);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var dotProduct4 = (a2, b2) => {
  if (isPolar(a2) && isPolar(b2)) {
    return dotProduct2(a2, b2);
  } else if (isCartesian(a2) && isCartesian(b2)) {
    return dotProduct3(a2, b2);
  }
  throw new Error(`Expected two polar/Cartesian vectors.`);
};
var clampMagnitude3 = (v, max22 = 1, min2 = 0) => {
  if (isPolar(v)) {
    return clampMagnitude(v, max22, min2);
  } else if (isCartesian(v)) {
    return clampMagnitude2(v, max22, min2);
  }
  throw new Error(`Expected either polar or Cartesian vector`);
};
var sum4 = (a2, b2) => {
  const polar = isPolar(a2);
  a2 = toCartesian2(a2);
  b2 = toCartesian2(b2);
  const c4 = sum(a2, b2);
  return polar ? toPolar(c4) : c4;
};
var subtract4 = (a2, b2) => {
  const polar = isPolar(a2);
  a2 = toCartesian2(a2);
  b2 = toCartesian2(b2);
  const c4 = subtract(a2, b2);
  return polar ? toPolar(c4) : c4;
};
var multiply6 = (a2, b2) => {
  const polar = isPolar(a2);
  a2 = toCartesian2(a2);
  b2 = toCartesian2(b2);
  const c4 = multiply2(a2, b2);
  return polar ? toPolar(c4) : c4;
};
var divide5 = (a2, b2) => {
  const polar = isPolar(a2);
  a2 = toCartesian2(a2);
  b2 = toCartesian2(b2);
  const c4 = divide(a2, b2);
  return polar ? toPolar(c4) : c4;
};
var SurfacePoints_exports = {};
__export2(SurfacePoints_exports, {
  circleRings: () => circleRings,
  circleVogelSpiral: () => circleVogelSpiral,
  sphereFibonacci: () => sphereFibonacci
});
var cos3 = Math.cos;
var sin3 = Math.sin;
var asin = Math.asin;
var sqrt3 = Math.sqrt;
var pow2 = Math.pow;
var pi4 = Math.PI;
var piPi6 = Math.PI * 2;
var goldenAngle = pi4 * (3 - sqrt3(5));
var goldenSection = (1 + sqrt3(5)) / 2;
function* circleVogelSpiral(circle, opts = {}) {
  const maxPoints = opts.maxPoints ?? 5e3;
  const density = opts.density ?? 0.95;
  const rotationOffset = opts.rotation ?? 0;
  const c4 = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const max22 = c4.radius;
  let spacing = c4.radius * scale(density, 0, 1, 0.3, 0.01);
  if (opts.spacing) spacing = opts.spacing;
  let radius = 0;
  let count = 0;
  let angle = 0;
  while (count < maxPoints && radius < max22) {
    radius = spacing * count ** 0.5;
    angle = rotationOffset + count * 2 * pi4 / goldenSection;
    yield Object.freeze({
      x: c4.x + radius * cos3(angle),
      y: c4.y + radius * sin3(angle)
    });
    count++;
  }
}
function* circleRings(circle, opts = {}) {
  const rings = opts.rings ?? 5;
  const c4 = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const ringR = 1 / rings;
  const rotationOffset = opts.rotation ?? 0;
  let ringCount = 1;
  yield Object.freeze({ x: c4.x, y: c4.y });
  for (let r = ringR; r <= 1; r += ringR) {
    const n2 = Math.round(pi4 / asin(1 / (2 * ringCount)));
    for (const theta of linearSpace(0, piPi6, n2 + 1)) {
      yield Object.freeze({
        x: c4.x + r * cos3(theta + rotationOffset) * c4.radius,
        y: c4.y + r * sin3(theta + rotationOffset) * c4.radius
      });
    }
    ringCount++;
  }
}
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
  const offset2 = 2 / samples;
  const s = sphere ?? { x: 0, y: 0, z: 0, radius: 1 };
  for (let index = 0; index < samples; index++) {
    const y = index * offset2 - 1 + offset2 / 2;
    const r = sqrt3(1 - pow2(y, 2));
    const a2 = (index + 1) % samples * goldenAngle + rotationRadians;
    const x = cos3(a2) * r;
    const z = sin3(a2) * r;
    yield Object.freeze({
      x: s.x + x * s.radius,
      y: s.y + y * s.radius,
      z: s.z + z * s.radius
    });
  }
}
var triangle_exports = {};
__export2(triangle_exports, {
  Empty: () => Empty4,
  Equilateral: () => Equilateral_exports,
  Isosceles: () => Isosceles_exports,
  Placeholder: () => Placeholder4,
  Right: () => Right_exports,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply4,
  area: () => area3,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox6,
  centroid: () => centroid2,
  corners: () => corners2,
  edges: () => edges2,
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints3,
  fromRadius: () => fromRadius,
  guard: () => guard7,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty4,
  isEqual: () => isEqual7,
  isEquilateral: () => isEquilateral,
  isIsosceles: () => isIsosceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder4,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter,
  rotate: () => rotate4,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray2
});
var guard7 = (t2, name2 = `t`) => {
  if (t2 === void 0) throw new Error(`{$name} undefined`);
  guard(t2.a, name2 + `.a`);
  guard(t2.b, name2 + `.b`);
  guard(t2.c, name2 + `.c`);
};
var edges2 = (t2) => {
  guard7(t2);
  return joinPointsToLines(t2.a, t2.b, t2.c, t2.a);
};
var area3 = (t2) => {
  guard7(t2, `t`);
  const lengths3 = edges2(t2).map((l) => length2(l));
  const p2 = (lengths3[0] + lengths3[1] + lengths3[2]) / 2;
  return Math.sqrt(p2 * (p2 - lengths3[0]) * (p2 - lengths3[1]) * (p2 - lengths3[2]));
};
var centroid2 = (t2) => {
  guard7(t2);
  const total = reduce(
    [t2.a, t2.b, t2.c],
    (p2, accumulator) => ({
      x: p2.x + accumulator.x,
      y: p2.y + accumulator.y
    })
  );
  const div = {
    x: total.x / 3,
    y: total.y / 3
  };
  return div;
};
var perimeter = (t2) => {
  guard7(t2);
  return edges2(t2).reduce((accumulator, v) => accumulator + length2(v), 0);
};
var innerCircle = (t2) => {
  const c4 = centroid2(t2);
  const p2 = perimeter(t2) / 2;
  const a2 = area3(t2);
  const radius = a2 / p2;
  return { radius, ...c4 };
};
var outerCircle = (t2) => {
  const [a2, b2, c4] = edges2(t2).map((l) => length2(l));
  const cent = centroid2(t2);
  const radius = a2 * b2 * c4 / Math.sqrt((a2 + b2 + c4) * (-a2 + b2 + c4) * (a2 - b2 + c4) * (a2 + b2 - c4));
  return {
    radius,
    ...cent
  };
};
var rotate4 = (triangle, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return triangle;
  if (origin === void 0) origin = centroid2(triangle);
  return Object.freeze({
    ...triangle,
    a: rotate2(triangle.a, amountRadian, origin),
    b: rotate2(triangle.b, amountRadian, origin),
    c: rotate2(triangle.c, amountRadian, origin)
  });
};
var Equilateral_exports = {};
__export2(Equilateral_exports, {
  area: () => area4,
  centerFromA: () => centerFromA,
  centerFromB: () => centerFromB,
  centerFromC: () => centerFromC,
  circumcircle: () => circumcircle,
  fromCenter: () => fromCenter2,
  height: () => height,
  incircle: () => incircle,
  perimeter: () => perimeter2
});
var pi4over3 = Math.PI * 4 / 3;
var pi2over3 = Math.PI * 2 / 3;
var resolveLength = (t2) => {
  if (typeof t2 === `number`) return t2;
  return t2.length;
};
var fromCenter2 = (t2, origin, rotationRad) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2) / Math.sqrt(3);
  const rot = rotationRad ?? Math.PI * 1.5;
  const b2 = {
    x: r * Math.cos(rot) + origin.x,
    y: r * Math.sin(rot) + origin.y
  };
  const a2 = {
    x: r * Math.cos(rot + pi4over3) + origin.x,
    y: r * Math.sin(rot + pi4over3) + origin.y
  };
  const c4 = {
    x: r * Math.cos(rot + pi2over3) + origin.x,
    y: r * Math.sin(rot + pi2over3) + origin.y
  };
  return Object.freeze({ a: a2, b: b2, c: c4 });
};
var centerFromA = (t2, ptA) => {
  if (!ptA) ptA = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2);
  const { radius } = incircle(t2);
  return {
    x: ptA.x + r / 2,
    y: ptA.y - radius
  };
};
var centerFromB = (t2, ptB) => {
  if (!ptB) ptB = Object.freeze({ x: 0, y: 0 });
  const { radius } = incircle(t2);
  return {
    x: ptB.x,
    y: ptB.y + radius * 2
  };
};
var centerFromC = (t2, ptC) => {
  if (!ptC) ptC = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2);
  const { radius } = incircle(t2);
  return {
    x: ptC.x - r / 2,
    y: ptC.y - radius
  };
};
var height = (t2) => Math.sqrt(3) / 2 * resolveLength(t2);
var perimeter2 = (t2) => resolveLength(t2) * 3;
var area4 = (t2) => Math.pow(resolveLength(t2), 2) * Math.sqrt(3) / 4;
var circumcircle = (t2) => ({
  radius: Math.sqrt(3) / 3 * resolveLength(t2)
});
var incircle = (t2) => ({
  radius: Math.sqrt(3) / 6 * resolveLength(t2)
});
var Right_exports = {};
__export2(Right_exports, {
  adjacentFromHypotenuse: () => adjacentFromHypotenuse,
  adjacentFromOpposite: () => adjacentFromOpposite,
  angleAtPointA: () => angleAtPointA,
  angleAtPointB: () => angleAtPointB,
  area: () => area5,
  circumcircle: () => circumcircle2,
  fromA: () => fromA,
  fromB: () => fromB,
  fromC: () => fromC,
  height: () => height2,
  hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
  hypotenuseFromOpposite: () => hypotenuseFromOpposite,
  hypotenuseSegments: () => hypotenuseSegments,
  incircle: () => incircle2,
  medians: () => medians,
  oppositeFromAdjacent: () => oppositeFromAdjacent,
  oppositeFromHypotenuse: () => oppositeFromHypotenuse,
  perimeter: () => perimeter3,
  resolveLengths: () => resolveLengths
});
var fromA = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const a2 = { x: origin.x, y: origin.y };
  const b2 = { x: origin.x + tt.hypotenuse, y: origin.y };
  const c4 = { x: origin.x + seg[1], y: origin.y - h };
  return { a: a2, b: b2, c: c4 };
};
var fromB = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const b2 = { x: origin.x, y: origin.y };
  const a2 = { x: origin.x - tt.hypotenuse, y: origin.y };
  const c4 = { x: origin.x - seg[0], y: origin.y - h };
  return { a: a2, b: b2, c: c4 };
};
var fromC = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const c4 = { x: origin.x, y: origin.y };
  const a2 = { x: origin.x - seg[1], y: origin.y + h };
  const b2 = { x: origin.x + seg[0], y: origin.y + h };
  return { a: a2, b: b2, c: c4 };
};
var resolveLengths = (t2) => {
  const a2 = t2.adjacent;
  const o = t2.opposite;
  const h = t2.hypotenuse;
  if (a2 !== void 0 && o !== void 0) {
    return {
      ...t2,
      adjacent: a2,
      opposite: o,
      hypotenuse: Math.hypot(a2, o)
    };
  } else if (a2 && h) {
    return {
      ...t2,
      adjacent: a2,
      hypotenuse: h,
      opposite: h * h - a2 * a2
    };
  } else if (o && h) {
    return {
      ...t2,
      hypotenuse: h,
      opposite: o,
      adjacent: h * h - o * o
    };
  } else if (t2.opposite && t2.hypotenuse && t2.adjacent) {
    return t2;
  }
  throw new Error(`Missing at least two edges`);
};
var height2 = (t2) => {
  const tt = resolveLengths(t2);
  const p2 = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return Math.sqrt(p2 * q);
};
var hypotenuseSegments = (t2) => {
  const tt = resolveLengths(t2);
  const p2 = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return [p2, q];
};
var perimeter3 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.adjacent + tt.hypotenuse + tt.opposite;
};
var area5 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.opposite * tt.adjacent / 2;
};
var angleAtPointA = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos(
    (tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse)
  );
};
var angleAtPointB = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos(
    (tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse)
  );
};
var medians = (t2) => {
  const tt = resolveLengths(t2);
  const b2 = tt.adjacent * tt.adjacent;
  const c4 = tt.hypotenuse * tt.hypotenuse;
  const a2 = tt.opposite * tt.opposite;
  return [
    Math.sqrt(2 * (b2 + c4) - a2) / 2,
    Math.sqrt(2 * (c4 + a2) - b2) / 2,
    Math.sqrt(2 * (a2 + b2) - c4) / 2
  ];
};
var circumcircle2 = (t2) => {
  const tt = resolveLengths(t2);
  return { radius: tt.hypotenuse / 2 };
};
var incircle2 = (t2) => {
  const tt = resolveLengths(t2);
  return {
    radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2
  };
};
var oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
var oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
var adjacentFromHypotenuse = (angleRadian3, hypotenuse) => Math.cos(angleRadian3) * hypotenuse;
var adjacentFromOpposite = (angleRadian3, opposite) => opposite / Math.tan(angleRadian3);
var hypotenuseFromOpposite = (angleRadian3, opposite) => opposite / Math.sin(angleRadian3);
var hypotenuseFromAdjacent = (angleRadian3, adjacent) => adjacent / Math.cos(angleRadian3);
var Isosceles_exports = {};
__export2(Isosceles_exports, {
  apexAngle: () => apexAngle,
  area: () => area6,
  baseAngle: () => baseAngle,
  circumcircle: () => circumcircle3,
  fromA: () => fromA2,
  fromB: () => fromB2,
  fromC: () => fromC2,
  fromCenter: () => fromCenter3,
  height: () => height3,
  incircle: () => incircle3,
  legHeights: () => legHeights,
  medians: () => medians2,
  perimeter: () => perimeter4
});
var baseAngle = (t2) => Math.acos(t2.base / (2 * t2.legs));
var apexAngle = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.acos((2 * aa - cc) / (2 * aa));
};
var height3 = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.sqrt((4 * aa - cc) / 4);
};
var legHeights = (t2) => {
  const b2 = baseAngle(t2);
  return t2.base * Math.sin(b2);
};
var perimeter4 = (t2) => 2 * t2.legs + t2.base;
var area6 = (t2) => {
  const h = height3(t2);
  return h * t2.base / 2;
};
var circumcircle3 = (t2) => {
  const h = height3(t2);
  const hh = h * h;
  const cc = t2.base * t2.base;
  return { radius: (4 * hh + cc) / (8 * h) };
};
var incircle3 = (t2) => {
  const h = height3(t2);
  return { radius: t2.base * h / (2 * t2.legs + t2.base) };
};
var medians2 = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  const medianAB = Math.sqrt(aa + 2 * cc) / 2;
  const medianC = Math.sqrt(4 * aa - cc) / 2;
  return [medianAB, medianAB, medianC];
};
var fromCenter3 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const incircleR = incircle3(t2).radius;
  const verticalToApex = h - incircleR;
  const a2 = { x: origin.x - t2.base / 2, y: origin.y + incircleR };
  const b2 = { x: origin.x + t2.base / 2, y: origin.y + incircleR };
  const c4 = { x: origin.x, y: origin.y - verticalToApex };
  return { a: a2, b: b2, c: c4 };
};
var fromA2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const a2 = { x: origin.x, y: origin.y };
  const b2 = { x: origin.x + t2.base, y: origin.y };
  const c4 = { x: origin.x + t2.base / 2, y: origin.y - h };
  return { a: a2, b: b2, c: c4 };
};
var fromB2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const b2 = { x: origin.x, y: origin.y };
  const a2 = { x: origin.x - t2.base, y: origin.y };
  const c4 = { x: origin.x - t2.base / 2, y: origin.y - h };
  return { a: a2, b: b2, c: c4 };
};
var fromC2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const c4 = { x: origin.x, y: origin.y };
  const a2 = { x: origin.x - t2.base / 2, y: origin.y + h };
  const b2 = { x: origin.x + t2.base / 2, y: origin.y + h };
  return { a: a2, b: b2, c: c4 };
};
var piPi7 = Math.PI * 2;
var Empty4 = Object.freeze({
  a: { x: 0, y: 0 },
  b: { x: 0, y: 0 },
  c: { x: 0, y: 0 }
});
var Placeholder4 = Object.freeze({
  a: { x: Number.NaN, y: Number.NaN },
  b: { x: Number.NaN, y: Number.NaN },
  c: { x: Number.NaN, y: Number.NaN }
});
var isEmpty4 = (t2) => isEmpty(t2.a) && isEmpty(t2.b) && isEmpty(t2.c);
var isPlaceholder4 = (t2) => isPlaceholder(t2.a) && isPlaceholder(t2.b) && isPlaceholder(t2.c);
var apply4 = (t2, fn) => Object.freeze({
  ...t2,
  a: fn(t2.a, `a`),
  b: fn(t2.b, `b`),
  c: fn(t2.c, `c`)
});
var isTriangle = (p2) => {
  if (p2 === void 0) return false;
  const tri = p2;
  if (!isPoint(tri.a)) return false;
  if (!isPoint(tri.b)) return false;
  if (!isPoint(tri.c)) return false;
  return true;
};
var isEqual7 = (a2, b2) => isEqual(a2.a, b2.a) && isEqual(a2.b, b2.b) && isEqual(a2.c, b2.c);
var corners2 = (t2) => {
  guard7(t2);
  return [t2.a, t2.b, t2.c];
};
var lengths2 = (t2) => {
  guard7(t2);
  return [
    distance(t2.a, t2.b),
    distance(t2.b, t2.c),
    distance(t2.c, t2.a)
  ];
};
var angles = (t2) => {
  guard7(t2);
  return [
    angleRadian(t2.a, t2.b),
    angleRadian(t2.b, t2.c),
    angleRadian(t2.c, t2.a)
  ];
};
var anglesDegrees = (t2) => {
  guard7(t2);
  return radianToDegree(angles(t2));
};
var isEquilateral = (t2) => {
  guard7(t2);
  const [a2, b2, c4] = lengths2(t2);
  return a2 === b2 && b2 === c4;
};
var isIsosceles = (t2) => {
  const [a2, b2, c4] = lengths2(t2);
  if (a2 === b2) return true;
  if (b2 === c4) return true;
  if (c4 === a2) return true;
  return false;
};
var isRightAngle = (t2) => angles(t2).includes(Math.PI / 2);
var isOblique = (t2) => !isRightAngle(t2);
var isAcute = (t2) => !angles(t2).some((v) => v >= Math.PI / 2);
var isObtuse = (t2) => angles(t2).some((v) => v > Math.PI / 2);
var fromRadius = (origin, radius, opts = {}) => {
  throwNumberTest(radius, `positive`, `radius`);
  guard(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [
    initialAngleRadian,
    initialAngleRadian + piPi7 * 1 / 3,
    initialAngleRadian + piPi7 * 2 / 3
  ];
  const points2 = angles2.map((a2) => toCartesian(radius, a2, origin));
  return fromPoints3(points2);
};
var rotateByVertex = (triangle, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle.a : vertex === `b` ? triangle.b : triangle.c;
  return Object.freeze({
    a: rotate2(triangle.a, amountRadian, origin),
    b: rotate2(triangle.b, amountRadian, origin),
    c: rotate2(triangle.c, amountRadian, origin)
  });
};
var equilateralFromVertex = (origin, length5 = 10, angleRadian3 = Math.PI / 2) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const a2 = project(origin, length5, Math.PI - -angleRadian3 / 2);
  const c4 = project(origin, length5, Math.PI - angleRadian3 / 2);
  return { a: a2, b: origin, c: c4 };
};
var toFlatArray2 = (t2) => {
  guard7(t2);
  return [t2.a.x, t2.a.y, t2.b.x, t2.b.y, t2.c.x, t2.c.y];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords)) throw new Error(`coords expected as array`);
  if (coords.length !== 6) {
    throw new Error(
      `coords array expected with 6 elements. Got ${coords.length}`
    );
  }
  return fromPoints3(fromNumbers2(...coords));
};
var fromPoints3 = (points2) => {
  if (!Array.isArray(points2)) throw new Error(`points expected as array`);
  if (points2.length !== 3) {
    throw new Error(
      `points array expected with 3 elements. Got ${points2.length}`
    );
  }
  const t2 = {
    a: points2[0],
    b: points2[1],
    c: points2[2]
  };
  return t2;
};
var bbox6 = (t2, inflation = 0) => {
  const { a: a2, b: b2, c: c4 } = t2;
  const xMin = Math.min(a2.x, b2.x, c4.x) - inflation;
  const xMax = Math.max(a2.x, b2.x, c4.x) + inflation;
  const yMin = Math.min(a2.y, b2.y, c4.y) - inflation;
  const yMax = Math.max(a2.y, b2.y, c4.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var barycentricCoord = (t2, a2, b2) => {
  const pt = getPointParameter2(a2, b2);
  const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
  const alpha = ab(pt.x, pt.y, t2.b, t2.c) / ab(t2.a.x, t2.a.y, t2.b, t2.c);
  const theta = ab(pt.x, pt.y, t2.c, t2.a) / ab(t2.b.x, t2.b.y, t2.c, t2.a);
  const gamma = ab(pt.x, pt.y, t2.a, t2.b) / ab(t2.c.x, t2.c.y, t2.a, t2.b);
  return {
    a: alpha,
    b: theta,
    c: gamma
  };
};
var barycentricToCartestian = (t2, bc) => {
  guard7(t2);
  const { a: a2, b: b2, c: c4 } = t2;
  const x = a2.x * bc.a + b2.x * bc.b + c4.x * bc.c;
  const y = a2.y * bc.a + b2.y * bc.b + c4.y * bc.c;
  if (a2.z && b2.z && c4.z) {
    const z = a2.z * bc.a + b2.z * bc.b + c4.z * bc.c;
    return Object.freeze({ x, y, z });
  } else {
    return Object.freeze({ x, y });
  }
};
var intersectsPoint2 = (t2, a2, b2) => {
  const box = bbox6(t2);
  const pt = getPointParameter2(a2, b2);
  if (!intersectsPoint(box, pt)) return false;
  const bc = barycentricCoord(t2, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};

// node_modules/ixfx/dist/chunk-BGQOJZFW.js
function* pairwise(values) {
  guardArray(values, `values`);
  if (values.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values.length}`);
  for (let index = 1; index < values.length; index++) {
    yield [values[index - 1], values[index]];
  }
}

// node_modules/ixfx/dist/chunk-BZFRTFR3.js
var Colour_exports = {};
__export2(Colour_exports, {
  cssLinearGradient: () => cssLinearGradient,
  fromHsl: () => fromHsl,
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  interpolator: () => interpolator,
  opacity: () => opacity,
  randomHue: () => randomHue,
  resolve: () => resolve,
  resolveToString: () => resolveToString,
  scale: () => scale3,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb,
  toString: () => toString6
});
function multiplyMatrices(A, B) {
  let m3 = A.length;
  if (!Array.isArray(A[0])) {
    A = [A];
  }
  if (!Array.isArray(B[0])) {
    B = B.map((x) => [x]);
  }
  let p2 = B[0].length;
  let B_cols = B[0].map((_, i) => B.map((x) => x[i]));
  let product = A.map((row) => B_cols.map((col) => {
    let ret = 0;
    if (!Array.isArray(row)) {
      for (let c4 of col) {
        ret += row * c4;
      }
      return ret;
    }
    for (let i = 0; i < row.length; i++) {
      ret += row[i] * (col[i] || 0);
    }
    return ret;
  }));
  if (m3 === 1) {
    product = product[0];
  }
  if (p2 === 1) {
    return product.map((x) => x[0]);
  }
  return product;
}
function isString(str) {
  return type(str) === "string";
}
function type(o) {
  let str = Object.prototype.toString.call(o);
  return (str.match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
}
function serializeNumber(n2, { precision, unit }) {
  if (isNone(n2)) {
    return "none";
  }
  return toPrecision(n2, precision) + (unit ?? "");
}
function isNone(n2) {
  return Number.isNaN(n2) || n2 instanceof Number && n2?.none;
}
function skipNone(n2) {
  return isNone(n2) ? 0 : n2;
}
function toPrecision(n2, precision) {
  if (n2 === 0) {
    return 0;
  }
  let integer = ~~n2;
  let digits = 0;
  if (integer && precision) {
    digits = ~~Math.log10(Math.abs(integer)) + 1;
  }
  const multiplier = 10 ** (precision - digits);
  return Math.floor(n2 * multiplier + 0.5) / multiplier;
}
var angleFactor = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
};
function parseFunction(str) {
  if (!str) {
    return;
  }
  str = str.trim();
  const isFunctionRegex = /^([a-z]+)\((.+?)\)$/i;
  const isNumberRegex = /^-?[\d.]+$/;
  const unitValueRegex = /%|deg|g?rad|turn$/;
  const singleArgument = /\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;
  let parts = str.match(isFunctionRegex);
  if (parts) {
    let args = [];
    parts[2].replace(singleArgument, ($0, rawArg) => {
      let match = rawArg.match(unitValueRegex);
      let arg = rawArg;
      if (match) {
        let unit = match[0];
        let unitlessArg = arg.slice(0, -unit.length);
        if (unit === "%") {
          arg = new Number(unitlessArg / 100);
          arg.type = "<percentage>";
        } else {
          arg = new Number(unitlessArg * angleFactor[unit]);
          arg.type = "<angle>";
          arg.unit = unit;
        }
      } else if (isNumberRegex.test(arg)) {
        arg = new Number(arg);
        arg.type = "<number>";
      } else if (arg === "none") {
        arg = new Number(NaN);
        arg.none = true;
      }
      if ($0.startsWith("/")) {
        arg = arg instanceof Number ? arg : new Number(arg);
        arg.alpha = true;
      }
      if (typeof arg === "object" && arg instanceof Number) {
        arg.raw = rawArg;
      }
      args.push(arg);
    });
    return {
      name: parts[1].toLowerCase(),
      rawName: parts[1],
      rawArgs: parts[2],
      // An argument could be (as of css-color-4):
      // a number, percentage, degrees (hue), ident (in color())
      args
    };
  }
}
function last(arr) {
  return arr[arr.length - 1];
}
function interpolate6(start, end, p2) {
  if (isNaN(start)) {
    return end;
  }
  if (isNaN(end)) {
    return start;
  }
  return start + (end - start) * p2;
}
function interpolateInv(start, end, value) {
  return (value - start) / (end - start);
}
function mapRange(from2, to2, value) {
  return interpolate6(to2[0], to2[1], interpolateInv(from2[0], from2[1], value));
}
function parseCoordGrammar(coordGrammars) {
  return coordGrammars.map((coordGrammar2) => {
    return coordGrammar2.split("|").map((type2) => {
      type2 = type2.trim();
      let range2 = type2.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
      if (range2) {
        let ret = new String(range2[1]);
        ret.range = [+range2[2], +range2[3]];
        return ret;
      }
      return type2;
    });
  });
}
function clamp22(min2, val, max22) {
  return Math.max(Math.min(max22, val), min2);
}
function copySign(to2, from2) {
  return Math.sign(to2) === Math.sign(from2) ? to2 : -to2;
}
function spow(base, exp) {
  return copySign(Math.abs(base) ** exp, base);
}
function zdiv(n2, d2) {
  return d2 === 0 ? 0 : n2 / d2;
}
function bisectLeft(arr, value, lo = 0, hi = arr.length) {
  while (lo < hi) {
    const mid = lo + hi >> 1;
    if (arr[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
var util = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  bisectLeft,
  clamp: clamp22,
  copySign,
  interpolate: interpolate6,
  interpolateInv,
  isNone,
  isString,
  last,
  mapRange,
  multiplyMatrices,
  parseCoordGrammar,
  parseFunction,
  serializeNumber,
  skipNone,
  spow,
  toPrecision,
  type,
  zdiv
});
var Hooks = class {
  add(name2, callback, first) {
    if (typeof arguments[0] != "string") {
      for (var name2 in arguments[0]) {
        this.add(name2, arguments[0][name2], arguments[1]);
      }
      return;
    }
    (Array.isArray(name2) ? name2 : [name2]).forEach(function(name22) {
      this[name22] = this[name22] || [];
      if (callback) {
        this[name22][first ? "unshift" : "push"](callback);
      }
    }, this);
  }
  run(name2, env) {
    this[name2] = this[name2] || [];
    this[name2].forEach(function(callback) {
      callback.call(env && env.context ? env.context : env, env);
    });
  }
};
var hooks = new Hooks();
var defaults = {
  gamut_mapping: "css",
  precision: 5,
  deltaE: "76",
  // Default deltaE method
  verbose: globalThis?.process?.env?.NODE_ENV?.toLowerCase() !== "test",
  warn: function warn(msg) {
    if (this.verbose) {
      globalThis?.console?.warn?.(msg);
    }
  }
};
var WHITES = {
  // for compatibility, the four-digit chromaticity-derived ones everyone else uses
  D50: [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585],
  D65: [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329]
};
function getWhite(name2) {
  if (Array.isArray(name2)) {
    return name2;
  }
  return WHITES[name2];
}
function adapt$2(W1, W2, XYZ, options = {}) {
  W1 = getWhite(W1);
  W2 = getWhite(W2);
  if (!W1 || !W2) {
    throw new TypeError(`Missing white point to convert ${!W1 ? "from" : ""}${!W1 && !W2 ? "/" : ""}${!W2 ? "to" : ""}`);
  }
  if (W1 === W2) {
    return XYZ;
  }
  let env = { W1, W2, XYZ, options };
  hooks.run("chromatic-adaptation-start", env);
  if (!env.M) {
    if (env.W1 === WHITES.D65 && env.W2 === WHITES.D50) {
      env.M = [
        [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
        [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
        [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371]
      ];
    } else if (env.W1 === WHITES.D50 && env.W2 === WHITES.D65) {
      env.M = [
        [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
        [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
        [0.012314014864481998, -0.020507649298898964, 1.330365926242124]
      ];
    }
  }
  hooks.run("chromatic-adaptation-end", env);
  if (env.M) {
    return multiplyMatrices(env.M, env.XYZ);
  } else {
    throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
  }
}
var noneTypes = /* @__PURE__ */ new Set(["<number>", "<percentage>", "<angle>"]);
function coerceCoords(space, format, name2, coords) {
  let types = Object.entries(space.coords).map(([id, coordMeta], i) => {
    let coordGrammar2 = format.coordGrammar[i];
    let arg = coords[i];
    let providedType = arg?.type;
    let type2;
    if (arg.none) {
      type2 = coordGrammar2.find((c4) => noneTypes.has(c4));
    } else {
      type2 = coordGrammar2.find((c4) => c4 == providedType);
    }
    if (!type2) {
      let coordName = coordMeta.name || id;
      throw new TypeError(`${providedType ?? arg.raw} not allowed for ${coordName} in ${name2}()`);
    }
    let fromRange = type2.range;
    if (providedType === "<percentage>") {
      fromRange ||= [0, 1];
    }
    let toRange = coordMeta.range || coordMeta.refRange;
    if (fromRange && toRange) {
      coords[i] = mapRange(fromRange, toRange, coords[i]);
    }
    return type2;
  });
  return types;
}
function parse(str, { meta } = {}) {
  let env = { "str": String(str)?.trim() };
  hooks.run("parse-start", env);
  if (env.color) {
    return env.color;
  }
  env.parsed = parseFunction(env.str);
  if (env.parsed) {
    let name2 = env.parsed.name;
    if (name2 === "color") {
      let id = env.parsed.args.shift();
      let alternateId = id.startsWith("--") ? id.substring(2) : `--${id}`;
      let ids = [id, alternateId];
      let alpha = env.parsed.rawArgs.indexOf("/") > 0 ? env.parsed.args.pop() : 1;
      for (let space of ColorSpace.all) {
        let colorSpec = space.getFormat("color");
        if (colorSpec) {
          if (ids.includes(colorSpec.id) || colorSpec.ids?.filter((specId) => ids.includes(specId)).length) {
            const coords = Object.keys(space.coords).map((_, i) => env.parsed.args[i] || 0);
            let types;
            if (colorSpec.coordGrammar) {
              types = coerceCoords(space, colorSpec, "color", coords);
            }
            if (meta) {
              Object.assign(meta, { formatId: "color", types });
            }
            if (colorSpec.id.startsWith("--") && !id.startsWith("--")) {
              defaults.warn(`${space.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${colorSpec.id}) instead of color(${id}).`);
            }
            if (id.startsWith("--") && !colorSpec.id.startsWith("--")) {
              defaults.warn(`${space.name} is a standard space and supported in the CSS spec. Use color(${colorSpec.id}) instead of prefixed color(${id}).`);
            }
            return { spaceId: space.id, coords, alpha };
          }
        }
      }
      let didYouMean = "";
      let registryId = id in ColorSpace.registry ? id : alternateId;
      if (registryId in ColorSpace.registry) {
        let cssId = ColorSpace.registry[registryId].formats?.color?.id;
        if (cssId) {
          didYouMean = `Did you mean color(${cssId})?`;
        }
      }
      throw new TypeError(`Cannot parse color(${id}). ` + (didYouMean || "Missing a plugin?"));
    } else {
      for (let space of ColorSpace.all) {
        let format = space.getFormat(name2);
        if (format && format.type === "function") {
          let alpha = 1;
          if (format.lastAlpha || last(env.parsed.args).alpha) {
            alpha = env.parsed.args.pop();
          }
          let coords = env.parsed.args;
          let types;
          if (format.coordGrammar) {
            types = coerceCoords(space, format, name2, coords);
          }
          if (meta) {
            Object.assign(meta, { formatId: format.name, types });
          }
          return {
            spaceId: space.id,
            coords,
            alpha
          };
        }
      }
    }
  } else {
    for (let space of ColorSpace.all) {
      for (let formatId in space.formats) {
        let format = space.formats[formatId];
        if (format.type !== "custom") {
          continue;
        }
        if (format.test && !format.test(env.str)) {
          continue;
        }
        let color = format.parse(env.str);
        if (color) {
          color.alpha ??= 1;
          if (meta) {
            meta.formatId = formatId;
          }
          return color;
        }
      }
    }
  }
  throw new TypeError(`Could not parse ${str} as a color. Missing a plugin?`);
}
function getColor(color) {
  if (Array.isArray(color)) {
    return color.map(getColor);
  }
  if (!color) {
    throw new TypeError("Empty color reference");
  }
  if (isString(color)) {
    color = parse(color);
  }
  let space = color.space || color.spaceId;
  if (!(space instanceof ColorSpace)) {
    color.space = ColorSpace.get(space);
  }
  if (color.alpha === void 0) {
    color.alpha = 1;
  }
  return color;
}
var \u03B5$7 = 75e-6;
var ColorSpace = class _ColorSpace {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.base = options.base ? _ColorSpace.get(options.base) : null;
    this.aliases = options.aliases;
    if (this.base) {
      this.fromBase = options.fromBase;
      this.toBase = options.toBase;
    }
    let coords = options.coords ?? this.base.coords;
    for (let name2 in coords) {
      if (!("name" in coords[name2])) {
        coords[name2].name = name2;
      }
    }
    this.coords = coords;
    let white2 = options.white ?? this.base.white ?? "D65";
    this.white = getWhite(white2);
    this.formats = options.formats ?? {};
    for (let name2 in this.formats) {
      let format = this.formats[name2];
      format.type ||= "function";
      format.name ||= name2;
    }
    if (!this.formats.color?.id) {
      this.formats.color = {
        ...this.formats.color ?? {},
        id: options.cssId || this.id
      };
    }
    if (options.gamutSpace) {
      this.gamutSpace = options.gamutSpace === "self" ? this : _ColorSpace.get(options.gamutSpace);
    } else {
      if (this.isPolar) {
        this.gamutSpace = this.base;
      } else {
        this.gamutSpace = this;
      }
    }
    if (this.gamutSpace.isUnbounded) {
      this.inGamut = (coords2, options2) => {
        return true;
      };
    }
    this.referred = options.referred;
    Object.defineProperty(this, "path", {
      value: getPath(this).reverse(),
      writable: false,
      enumerable: true,
      configurable: true
    });
    hooks.run("colorspace-init-end", this);
  }
  inGamut(coords, { epsilon: epsilon2 = \u03B5$7 } = {}) {
    if (!this.equals(this.gamutSpace)) {
      coords = this.to(this.gamutSpace, coords);
      return this.gamutSpace.inGamut(coords, { epsilon: epsilon2 });
    }
    let coordMeta = Object.values(this.coords);
    return coords.every((c4, i) => {
      let meta = coordMeta[i];
      if (meta.type !== "angle" && meta.range) {
        if (Number.isNaN(c4)) {
          return true;
        }
        let [min2, max22] = meta.range;
        return (min2 === void 0 || c4 >= min2 - epsilon2) && (max22 === void 0 || c4 <= max22 + epsilon2);
      }
      return true;
    });
  }
  get isUnbounded() {
    return Object.values(this.coords).every((coord) => !("range" in coord));
  }
  get cssId() {
    return this.formats?.color?.id || this.id;
  }
  get isPolar() {
    for (let id in this.coords) {
      if (this.coords[id].type === "angle") {
        return true;
      }
    }
    return false;
  }
  getFormat(format) {
    if (typeof format === "object") {
      format = processFormat(format, this);
      return format;
    }
    let ret;
    if (format === "default") {
      ret = Object.values(this.formats)[0];
    } else {
      ret = this.formats[format];
    }
    if (ret) {
      ret = processFormat(ret, this);
      return ret;
    }
    return null;
  }
  /**
   * Check if this color space is the same as another color space reference.
   * Allows proxying color space objects and comparing color spaces with ids.
   * @param {string | ColorSpace} space ColorSpace object or id to compare to
   * @returns {boolean}
   */
  equals(space) {
    if (!space) {
      return false;
    }
    return this === space || this.id === space || this.id === space.id;
  }
  to(space, coords) {
    if (arguments.length === 1) {
      const color = getColor(space);
      [space, coords] = [color.space, color.coords];
    }
    space = _ColorSpace.get(space);
    if (this.equals(space)) {
      return coords;
    }
    coords = coords.map((c4) => Number.isNaN(c4) ? 0 : c4);
    let myPath = this.path;
    let otherPath = space.path;
    let connectionSpace, connectionSpaceIndex;
    for (let i = 0; i < myPath.length; i++) {
      if (myPath[i].equals(otherPath[i])) {
        connectionSpace = myPath[i];
        connectionSpaceIndex = i;
      } else {
        break;
      }
    }
    if (!connectionSpace) {
      throw new Error(`Cannot convert between color spaces ${this} and ${space}: no connection space was found`);
    }
    for (let i = myPath.length - 1; i > connectionSpaceIndex; i--) {
      coords = myPath[i].toBase(coords);
    }
    for (let i = connectionSpaceIndex + 1; i < otherPath.length; i++) {
      coords = otherPath[i].fromBase(coords);
    }
    return coords;
  }
  from(space, coords) {
    if (arguments.length === 1) {
      const color = getColor(space);
      [space, coords] = [color.space, color.coords];
    }
    space = _ColorSpace.get(space);
    return space.to(this, coords);
  }
  toString() {
    return `${this.name} (${this.id})`;
  }
  getMinCoords() {
    let ret = [];
    for (let id in this.coords) {
      let meta = this.coords[id];
      let range2 = meta.range || meta.refRange;
      ret.push(range2?.min ?? 0);
    }
    return ret;
  }
  static registry = {};
  // Returns array of unique color spaces
  static get all() {
    return [...new Set(Object.values(_ColorSpace.registry))];
  }
  static register(id, space) {
    if (arguments.length === 1) {
      space = arguments[0];
      id = space.id;
    }
    space = this.get(space);
    if (this.registry[id] && this.registry[id] !== space) {
      throw new Error(`Duplicate color space registration: '${id}'`);
    }
    this.registry[id] = space;
    if (arguments.length === 1 && space.aliases) {
      for (let alias of space.aliases) {
        this.register(alias, space);
      }
    }
    return space;
  }
  /**
   * Lookup ColorSpace object by name
   * @param {ColorSpace | string} name
   */
  static get(space, ...alternatives) {
    if (!space || space instanceof _ColorSpace) {
      return space;
    }
    let argType = type(space);
    if (argType === "string") {
      let ret = _ColorSpace.registry[space.toLowerCase()];
      if (!ret) {
        throw new TypeError(`No color space found with id = "${space}"`);
      }
      return ret;
    }
    if (alternatives.length) {
      return _ColorSpace.get(...alternatives);
    }
    throw new TypeError(`${space} is not a valid color space`);
  }
  /**
   * Get metadata about a coordinate of a color space
   *
   * @static
   * @param {Array | string} ref
   * @param {ColorSpace | string} [workingSpace]
   * @return {Object}
   */
  static resolveCoord(ref, workingSpace) {
    let coordType = type(ref);
    let space, coord;
    if (coordType === "string") {
      if (ref.includes(".")) {
        [space, coord] = ref.split(".");
      } else {
        [space, coord] = [, ref];
      }
    } else if (Array.isArray(ref)) {
      [space, coord] = ref;
    } else {
      space = ref.space;
      coord = ref.coordId;
    }
    space = _ColorSpace.get(space);
    if (!space) {
      space = workingSpace;
    }
    if (!space) {
      throw new TypeError(`Cannot resolve coordinate reference ${ref}: No color space specified and relative references are not allowed here`);
    }
    coordType = type(coord);
    if (coordType === "number" || coordType === "string" && coord >= 0) {
      let meta = Object.entries(space.coords)[coord];
      if (meta) {
        return { space, id: meta[0], index: coord, ...meta[1] };
      }
    }
    space = _ColorSpace.get(space);
    let normalizedCoord = coord.toLowerCase();
    let i = 0;
    for (let id in space.coords) {
      let meta = space.coords[id];
      if (id.toLowerCase() === normalizedCoord || meta.name?.toLowerCase() === normalizedCoord) {
        return { space, id, index: i, ...meta };
      }
      i++;
    }
    throw new TypeError(`No "${coord}" coordinate found in ${space.name}. Its coordinates are: ${Object.keys(space.coords).join(", ")}`);
  }
  static DEFAULT_FORMAT = {
    type: "functions",
    name: "color"
  };
};
function getPath(space) {
  let ret = [space];
  for (let s = space; s = s.base; ) {
    ret.push(s);
  }
  return ret;
}
function processFormat(format, { coords } = {}) {
  if (format.coords && !format.coordGrammar) {
    format.type ||= "function";
    format.name ||= "color";
    format.coordGrammar = parseCoordGrammar(format.coords);
    let coordFormats = Object.entries(coords).map(([id, coordMeta], i) => {
      let outputType = format.coordGrammar[i][0];
      let fromRange = coordMeta.range || coordMeta.refRange;
      let toRange = outputType.range, suffix = "";
      if (outputType == "<percentage>") {
        toRange = [0, 100];
        suffix = "%";
      } else if (outputType == "<angle>") {
        suffix = "deg";
      }
      return { fromRange, toRange, suffix };
    });
    format.serializeCoords = (coords2, precision) => {
      return coords2.map((c4, i) => {
        let { fromRange, toRange, suffix } = coordFormats[i];
        if (fromRange && toRange) {
          c4 = mapRange(fromRange, toRange, c4);
        }
        c4 = serializeNumber(c4, { precision, unit: suffix });
        return c4;
      });
    };
  }
  return format;
}
var xyz_d65 = new ColorSpace({
  id: "xyz-d65",
  name: "XYZ D65",
  coords: {
    x: { name: "X" },
    y: { name: "Y" },
    z: { name: "Z" }
  },
  white: "D65",
  formats: {
    color: {
      ids: ["xyz-d65", "xyz"]
    }
  },
  aliases: ["xyz"]
});
var RGBColorSpace = class extends ColorSpace {
  /**
   * Creates a new RGB ColorSpace.
   * If coords are not specified, they will use the default RGB coords.
   * Instead of `fromBase()` and `toBase()` functions,
   * you can specify to/from XYZ matrices and have `toBase()` and `fromBase()` automatically generated.
   * @param {*} options - Same options as {@link ColorSpace} plus:
   * @param {number[][]} options.toXYZ_M - Matrix to convert to XYZ
   * @param {number[][]} options.fromXYZ_M - Matrix to convert from XYZ
   */
  constructor(options) {
    if (!options.coords) {
      options.coords = {
        r: {
          range: [0, 1],
          name: "Red"
        },
        g: {
          range: [0, 1],
          name: "Green"
        },
        b: {
          range: [0, 1],
          name: "Blue"
        }
      };
    }
    if (!options.base) {
      options.base = xyz_d65;
    }
    if (options.toXYZ_M && options.fromXYZ_M) {
      options.toBase ??= (rgb) => {
        let xyz = multiplyMatrices(options.toXYZ_M, rgb);
        if (this.white !== this.base.white) {
          xyz = adapt$2(this.white, this.base.white, xyz);
        }
        return xyz;
      };
      options.fromBase ??= (xyz) => {
        xyz = adapt$2(this.base.white, this.white, xyz);
        return multiplyMatrices(options.fromXYZ_M, xyz);
      };
    }
    options.referred ??= "display";
    super(options);
  }
};
function getAll(color, space) {
  color = getColor(color);
  if (!space || color.space.equals(space)) {
    return color.coords.slice();
  }
  space = ColorSpace.get(space);
  return space.from(color);
}
function get(color, prop) {
  color = getColor(color);
  let { space, index } = ColorSpace.resolveCoord(prop, color.space);
  let coords = getAll(color, space);
  return coords[index];
}
function setAll(color, space, coords) {
  color = getColor(color);
  space = ColorSpace.get(space);
  color.coords = space.to(color.space, coords);
  return color;
}
setAll.returns = "color";
function set(color, prop, value) {
  color = getColor(color);
  if (arguments.length === 2 && type(arguments[1]) === "object") {
    let object = arguments[1];
    for (let p2 in object) {
      set(color, p2, object[p2]);
    }
  } else {
    if (typeof value === "function") {
      value = value(get(color, prop));
    }
    let { space, index } = ColorSpace.resolveCoord(prop, color.space);
    let coords = getAll(color, space);
    coords[index] = value;
    setAll(color, space, coords);
  }
  return color;
}
set.returns = "color";
var XYZ_D50 = new ColorSpace({
  id: "xyz-d50",
  name: "XYZ D50",
  white: "D50",
  base: xyz_d65,
  fromBase: (coords) => adapt$2(xyz_d65.white, "D50", coords),
  toBase: (coords) => adapt$2("D50", xyz_d65.white, coords)
});
var \u03B5$6 = 216 / 24389;
var \u03B53$1 = 24 / 116;
var \u03BA$4 = 24389 / 27;
var white$4 = WHITES.D50;
var lab = new ColorSpace({
  id: "lab",
  name: "Lab",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D50, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: white$4,
  base: XYZ_D50,
  // Convert D50-adapted XYX to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(XYZ) {
    let xyz = XYZ.map((value, i) => value / white$4[i]);
    let f = xyz.map((value) => value > \u03B5$6 ? Math.cbrt(value) : (\u03BA$4 * value + 16) / 116);
    return [
      116 * f[1] - 16,
      // L
      500 * (f[0] - f[1]),
      // a
      200 * (f[1] - f[2])
      // b
    ];
  },
  // Convert Lab to D50-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(Lab) {
    let f = [];
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    let xyz = [
      f[0] > \u03B53$1 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA$4,
      Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA$4,
      f[2] > \u03B53$1 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA$4
    ];
    return xyz.map((value, i) => value * white$4[i]);
  },
  formats: {
    "lab": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function constrain(angle) {
  return (angle % 360 + 360) % 360;
}
function adjust(arc, angles2) {
  if (arc === "raw") {
    return angles2;
  }
  let [a1, a2] = angles2.map(constrain);
  let angleDiff = a2 - a1;
  if (arc === "increasing") {
    if (angleDiff < 0) {
      a2 += 360;
    }
  } else if (arc === "decreasing") {
    if (angleDiff > 0) {
      a1 += 360;
    }
  } else if (arc === "longer") {
    if (-180 < angleDiff && angleDiff < 180) {
      if (angleDiff > 0) {
        a1 += 360;
      } else {
        a2 += 360;
      }
    }
  } else if (arc === "shorter") {
    if (angleDiff > 180) {
      a1 += 360;
    } else if (angleDiff < -180) {
      a2 += 360;
    }
  }
  return [a1, a2];
}
var lch = new ColorSpace({
  id: "lch",
  name: "LCH",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 150],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: lab,
  fromBase(Lab) {
    let [L, a2, b2] = Lab;
    let hue;
    const \u03B52 = 0.02;
    if (Math.abs(a2) < \u03B52 && Math.abs(b2) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(b2, a2) * 180 / Math.PI;
    }
    return [
      L,
      // L is still L
      Math.sqrt(a2 ** 2 + b2 ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(LCH) {
    let [Lightness, Chroma, Hue] = LCH;
    if (Chroma < 0) {
      Chroma = 0;
    }
    if (isNaN(Hue)) {
      Hue = 0;
    }
    return [
      Lightness,
      // L is still L
      Chroma * Math.cos(Hue * Math.PI / 180),
      // a
      Chroma * Math.sin(Hue * Math.PI / 180)
      // b
    ];
  },
  formats: {
    "lch": {
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
var Gfactor = 25 ** 7;
var \u03C0$1 = Math.PI;
var r2d = 180 / \u03C0$1;
var d2r$1 = \u03C0$1 / 180;
function pow7(x) {
  const x2 = x * x;
  const x7 = x2 * x2 * x2 * x;
  return x7;
}
function deltaE2000(color, sample, { kL = 1, kC = 1, kH = 1 } = {}) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = lab.from(color);
  let C1 = lch.from(lab, [L1, a1, b1])[1];
  let [L2, a2, b2] = lab.from(sample);
  let C2 = lch.from(lab, [L2, a2, b2])[1];
  if (C1 < 0) {
    C1 = 0;
  }
  if (C2 < 0) {
    C2 = 0;
  }
  let Cbar = (C1 + C2) / 2;
  let C7 = pow7(Cbar);
  let G = 0.5 * (1 - Math.sqrt(C7 / (C7 + Gfactor)));
  let adash1 = (1 + G) * a1;
  let adash2 = (1 + G) * a2;
  let Cdash1 = Math.sqrt(adash1 ** 2 + b1 ** 2);
  let Cdash2 = Math.sqrt(adash2 ** 2 + b2 ** 2);
  let h1 = adash1 === 0 && b1 === 0 ? 0 : Math.atan2(b1, adash1);
  let h2 = adash2 === 0 && b2 === 0 ? 0 : Math.atan2(b2, adash2);
  if (h1 < 0) {
    h1 += 2 * \u03C0$1;
  }
  if (h2 < 0) {
    h2 += 2 * \u03C0$1;
  }
  h1 *= r2d;
  h2 *= r2d;
  let \u0394L = L2 - L1;
  let \u0394C = Cdash2 - Cdash1;
  let hdiff = h2 - h1;
  let hsum = h1 + h2;
  let habs = Math.abs(hdiff);
  let \u0394h;
  if (Cdash1 * Cdash2 === 0) {
    \u0394h = 0;
  } else if (habs <= 180) {
    \u0394h = hdiff;
  } else if (hdiff > 180) {
    \u0394h = hdiff - 360;
  } else if (hdiff < -180) {
    \u0394h = hdiff + 360;
  } else {
    defaults.warn("the unthinkable has happened");
  }
  let \u0394H = 2 * Math.sqrt(Cdash2 * Cdash1) * Math.sin(\u0394h * d2r$1 / 2);
  let Ldash = (L1 + L2) / 2;
  let Cdash = (Cdash1 + Cdash2) / 2;
  let Cdash7 = pow7(Cdash);
  let hdash;
  if (Cdash1 * Cdash2 === 0) {
    hdash = hsum;
  } else if (habs <= 180) {
    hdash = hsum / 2;
  } else if (hsum < 360) {
    hdash = (hsum + 360) / 2;
  } else {
    hdash = (hsum - 360) / 2;
  }
  let lsq = (Ldash - 50) ** 2;
  let SL = 1 + 0.015 * lsq / Math.sqrt(20 + lsq);
  let SC = 1 + 0.045 * Cdash;
  let T = 1;
  T -= 0.17 * Math.cos((hdash - 30) * d2r$1);
  T += 0.24 * Math.cos(2 * hdash * d2r$1);
  T += 0.32 * Math.cos((3 * hdash + 6) * d2r$1);
  T -= 0.2 * Math.cos((4 * hdash - 63) * d2r$1);
  let SH = 1 + 0.015 * Cdash * T;
  let \u0394\u03B8 = 30 * Math.exp(-1 * ((hdash - 275) / 25) ** 2);
  let RC = 2 * Math.sqrt(Cdash7 / (Cdash7 + Gfactor));
  let RT = -1 * Math.sin(2 * \u0394\u03B8 * d2r$1) * RC;
  let dE = (\u0394L / (kL * SL)) ** 2;
  dE += (\u0394C / (kC * SC)) ** 2;
  dE += (\u0394H / (kH * SH)) ** 2;
  dE += RT * (\u0394C / (kC * SC)) * (\u0394H / (kH * SH));
  return Math.sqrt(dE);
}
var XYZtoLMS_M$1 = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
];
var LMStoXYZ_M$1 = [
  [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
  [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
  [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
];
var LMStoLab_M = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
];
var LabtoLMS_M = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092]
];
var OKLab = new ColorSpace({
  id: "oklab",
  name: "Oklab",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    a: {
      refRange: [-0.4, 0.4]
    },
    b: {
      refRange: [-0.4, 0.4]
    }
  },
  // Note that XYZ is relative to D65
  white: "D65",
  base: xyz_d65,
  fromBase(XYZ) {
    let LMS = multiplyMatrices(XYZtoLMS_M$1, XYZ);
    let LMSg = LMS.map((val) => Math.cbrt(val));
    return multiplyMatrices(LMStoLab_M, LMSg);
  },
  toBase(OKLab2) {
    let LMSg = multiplyMatrices(LabtoLMS_M, OKLab2);
    let LMS = LMSg.map((val) => val ** 3);
    return multiplyMatrices(LMStoXYZ_M$1, LMS);
  },
  formats: {
    "oklab": {
      coords: ["<percentage> | <number>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function deltaEOK(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = OKLab.from(color);
  let [L2, a2, b2] = OKLab.from(sample);
  let \u0394L = L1 - L2;
  let \u0394a = a1 - a2;
  let \u0394b = b1 - b2;
  return Math.sqrt(\u0394L ** 2 + \u0394a ** 2 + \u0394b ** 2);
}
var \u03B5$5 = 75e-6;
function inGamut(color, space, { epsilon: epsilon2 = \u03B5$5 } = {}) {
  color = getColor(color);
  if (!space) {
    space = color.space;
  }
  space = ColorSpace.get(space);
  let coords = color.coords;
  if (space !== color.space) {
    coords = space.from(color);
  }
  return space.inGamut(coords, { epsilon: epsilon2 });
}
function clone(color) {
  return {
    space: color.space,
    coords: color.coords.slice(),
    alpha: color.alpha
  };
}
function distance3(color1, color2, space = "lab") {
  space = ColorSpace.get(space);
  let coords1 = space.from(color1);
  let coords2 = space.from(color2);
  return Math.sqrt(coords1.reduce((acc, c12, i) => {
    let c22 = coords2[i];
    if (isNaN(c12) || isNaN(c22)) {
      return acc;
    }
    return acc + (c22 - c12) ** 2;
  }, 0));
}
function deltaE76(color, sample) {
  return distance3(color, sample, "lab");
}
var \u03C0 = Math.PI;
var d2r = \u03C0 / 180;
function deltaECMC(color, sample, { l = 2, c: c4 = 1 } = {}) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = lab.from(color);
  let [, C1, H1] = lch.from(lab, [L1, a1, b1]);
  let [L2, a2, b2] = lab.from(sample);
  let C2 = lch.from(lab, [L2, a2, b2])[1];
  if (C1 < 0) {
    C1 = 0;
  }
  if (C2 < 0) {
    C2 = 0;
  }
  let \u0394L = L1 - L2;
  let \u0394C = C1 - C2;
  let \u0394a = a1 - a2;
  let \u0394b = b1 - b2;
  let H2 = \u0394a ** 2 + \u0394b ** 2 - \u0394C ** 2;
  let SL = 0.511;
  if (L1 >= 16) {
    SL = 0.040975 * L1 / (1 + 0.01765 * L1);
  }
  let SC = 0.0638 * C1 / (1 + 0.0131 * C1) + 0.638;
  let T;
  if (Number.isNaN(H1)) {
    H1 = 0;
  }
  if (H1 >= 164 && H1 <= 345) {
    T = 0.56 + Math.abs(0.2 * Math.cos((H1 + 168) * d2r));
  } else {
    T = 0.36 + Math.abs(0.4 * Math.cos((H1 + 35) * d2r));
  }
  let C4 = Math.pow(C1, 4);
  let F = Math.sqrt(C4 / (C4 + 1900));
  let SH = SC * (F * T + 1 - F);
  let dE = (\u0394L / (l * SL)) ** 2;
  dE += (\u0394C / (c4 * SC)) ** 2;
  dE += H2 / SH ** 2;
  return Math.sqrt(dE);
}
var Yw$1 = 203;
var XYZ_Abs_D65 = new ColorSpace({
  // Absolute CIE XYZ, with a D65 whitepoint,
  // as used in most HDR colorspaces as a starting point.
  // SDR spaces are converted per BT.2048
  // so that diffuse, media white is 203 cd/m²
  id: "xyz-abs-d65",
  cssId: "--xyz-abs-d65",
  name: "Absolute XYZ D65",
  coords: {
    x: {
      refRange: [0, 9504.7],
      name: "Xa"
    },
    y: {
      refRange: [0, 1e4],
      name: "Ya"
    },
    z: {
      refRange: [0, 10888.3],
      name: "Za"
    }
  },
  base: xyz_d65,
  fromBase(XYZ) {
    return XYZ.map((v) => Math.max(v * Yw$1, 0));
  },
  toBase(AbsXYZ) {
    return AbsXYZ.map((v) => Math.max(v / Yw$1, 0));
  }
});
var b$1 = 1.15;
var g = 0.66;
var n$1 = 2610 / 2 ** 14;
var ninv$1 = 2 ** 14 / 2610;
var c1$2 = 3424 / 2 ** 12;
var c2$2 = 2413 / 2 ** 7;
var c3$2 = 2392 / 2 ** 7;
var p = 1.7 * 2523 / 2 ** 5;
var pinv = 2 ** 5 / (1.7 * 2523);
var d = -0.56;
var d0 = 16295499532821565e-27;
var XYZtoCone_M = [
  [0.41478972, 0.579999, 0.014648],
  [-0.20151, 1.120649, 0.0531008],
  [-0.0166008, 0.2648, 0.6684799]
];
var ConetoXYZ_M = [
  [1.9242264357876067, -1.0047923125953657, 0.037651404030618],
  [0.35031676209499907, 0.7264811939316552, -0.06538442294808501],
  [-0.09098281098284752, -0.3127282905230739, 1.5227665613052603]
];
var ConetoIab_M = [
  [0.5, 0.5, 0],
  [3.524, -4.066708, 0.542708],
  [0.199076, 1.096799, -1.295875]
];
var IabtoCone_M = [
  [1, 0.1386050432715393, 0.05804731615611886],
  [0.9999999999999999, -0.1386050432715393, -0.05804731615611886],
  [0.9999999999999998, -0.09601924202631895, -0.8118918960560388]
];
var Jzazbz = new ColorSpace({
  id: "jzazbz",
  name: "Jzazbz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    az: {
      refRange: [-0.5, 0.5]
    },
    bz: {
      refRange: [-0.5, 0.5]
    }
  },
  base: XYZ_Abs_D65,
  fromBase(XYZ) {
    let [Xa, Ya, Za] = XYZ;
    let Xm = b$1 * Xa - (b$1 - 1) * Za;
    let Ym = g * Ya - (g - 1) * Xa;
    let LMS = multiplyMatrices(XYZtoCone_M, [Xm, Ym, Za]);
    let PQLMS = LMS.map(function(val) {
      let num = c1$2 + c2$2 * (val / 1e4) ** n$1;
      let denom = 1 + c3$2 * (val / 1e4) ** n$1;
      return (num / denom) ** p;
    });
    let [Iz, az, bz] = multiplyMatrices(ConetoIab_M, PQLMS);
    let Jz = (1 + d) * Iz / (1 + d * Iz) - d0;
    return [Jz, az, bz];
  },
  toBase(Jzazbz2) {
    let [Jz, az, bz] = Jzazbz2;
    let Iz = (Jz + d0) / (1 + d - d * (Jz + d0));
    let PQLMS = multiplyMatrices(IabtoCone_M, [Iz, az, bz]);
    let LMS = PQLMS.map(function(val) {
      let num = c1$2 - val ** pinv;
      let denom = c3$2 * val ** pinv - c2$2;
      let x = 1e4 * (num / denom) ** ninv$1;
      return x;
    });
    let [Xm, Ym, Za] = multiplyMatrices(ConetoXYZ_M, LMS);
    let Xa = (Xm + (b$1 - 1) * Za) / b$1;
    let Ya = (Ym + (g - 1) * Xa) / g;
    return [Xa, Ya, Za];
  },
  formats: {
    // https://drafts.csswg.org/css-color-hdr/#Jzazbz
    "color": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var jzczhz = new ColorSpace({
  id: "jzczhz",
  name: "JzCzHz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    cz: {
      refRange: [0, 1],
      name: "Chroma"
    },
    hz: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Jzazbz,
  fromBase(jzazbz) {
    let [Jz, az, bz] = jzazbz;
    let hue;
    const \u03B52 = 2e-4;
    if (Math.abs(az) < \u03B52 && Math.abs(bz) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(bz, az) * 180 / Math.PI;
    }
    return [
      Jz,
      // Jz is still Jz
      Math.sqrt(az ** 2 + bz ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(jzczhz2) {
    return [
      jzczhz2[0],
      // Jz is still Jz
      jzczhz2[1] * Math.cos(jzczhz2[2] * Math.PI / 180),
      // az
      jzczhz2[1] * Math.sin(jzczhz2[2] * Math.PI / 180)
      // bz
    ];
  }
});
function deltaEJz(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [Jz1, Cz1, Hz1] = jzczhz.from(color);
  let [Jz2, Cz2, Hz2] = jzczhz.from(sample);
  let \u0394J = Jz1 - Jz2;
  let \u0394C = Cz1 - Cz2;
  if (Number.isNaN(Hz1) && Number.isNaN(Hz2)) {
    Hz1 = 0;
    Hz2 = 0;
  } else if (Number.isNaN(Hz1)) {
    Hz1 = Hz2;
  } else if (Number.isNaN(Hz2)) {
    Hz2 = Hz1;
  }
  let \u0394h = Hz1 - Hz2;
  let \u0394H = 2 * Math.sqrt(Cz1 * Cz2) * Math.sin(\u0394h / 2 * (Math.PI / 180));
  return Math.sqrt(\u0394J ** 2 + \u0394C ** 2 + \u0394H ** 2);
}
var c1$1 = 3424 / 4096;
var c2$1 = 2413 / 128;
var c3$1 = 2392 / 128;
var m1$1 = 2610 / 16384;
var m2 = 2523 / 32;
var im1 = 16384 / 2610;
var im2 = 32 / 2523;
var XYZtoLMS_M = [
  [0.3592832590121217, 0.6976051147779502, -0.035891593232029],
  [-0.1920808463704993, 1.100476797037432, 0.0753748658519118],
  [0.0070797844607479, 0.0748396662186362, 0.8433265453898765]
];
var LMStoIPT_M = [
  [2048 / 4096, 2048 / 4096, 0],
  [6610 / 4096, -13613 / 4096, 7003 / 4096],
  [17933 / 4096, -17390 / 4096, -543 / 4096]
];
var IPTtoLMS_M = [
  [0.9999999999999998, 0.0086090370379328, 0.111029625003026],
  [0.9999999999999998, -0.0086090370379328, -0.1110296250030259],
  [0.9999999999999998, 0.5600313357106791, -0.3206271749873188]
];
var LMStoXYZ_M = [
  [2.0701522183894223, -1.3263473389671563, 0.2066510476294053],
  [0.3647385209748072, 0.6805660249472273, -0.0453045459220347],
  [-0.0497472075358123, -0.0492609666966131, 1.1880659249923042]
];
var ictcp = new ColorSpace({
  id: "ictcp",
  name: "ICTCP",
  // From BT.2100-2 page 7:
  // During production, signal values are expected to exceed the
  // range E′ = [0.0 : 1.0]. This provides processing headroom and avoids
  // signal degradation during cascaded processing. Such values of E′,
  // below 0.0 or exceeding 1.0, should not be clipped during production
  // and exchange.
  // Values below 0.0 should not be clipped in reference displays (even
  // though they represent “negative” light) to allow the black level of
  // the signal (LB) to be properly set using test signals known as “PLUGE”
  coords: {
    i: {
      refRange: [0, 1],
      // Constant luminance,
      name: "I"
    },
    ct: {
      refRange: [-0.5, 0.5],
      // Full BT.2020 gamut in range [-0.5, 0.5]
      name: "CT"
    },
    cp: {
      refRange: [-0.5, 0.5],
      name: "CP"
    }
  },
  base: XYZ_Abs_D65,
  fromBase(XYZ) {
    let LMS = multiplyMatrices(XYZtoLMS_M, XYZ);
    return LMStoICtCp(LMS);
  },
  toBase(ICtCp) {
    let LMS = ICtCptoLMS(ICtCp);
    return multiplyMatrices(LMStoXYZ_M, LMS);
  }
});
function LMStoICtCp(LMS) {
  let PQLMS = LMS.map(function(val) {
    let num = c1$1 + c2$1 * (val / 1e4) ** m1$1;
    let denom = 1 + c3$1 * (val / 1e4) ** m1$1;
    return (num / denom) ** m2;
  });
  return multiplyMatrices(LMStoIPT_M, PQLMS);
}
function ICtCptoLMS(ICtCp) {
  let PQLMS = multiplyMatrices(IPTtoLMS_M, ICtCp);
  let LMS = PQLMS.map(function(val) {
    let num = Math.max(val ** im2 - c1$1, 0);
    let denom = c2$1 - c3$1 * val ** im2;
    return 1e4 * (num / denom) ** im1;
  });
  return LMS;
}
function deltaEITP(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [I1, T1, P1] = ictcp.from(color);
  let [I2, T2, P2] = ictcp.from(sample);
  return 720 * Math.sqrt((I1 - I2) ** 2 + 0.25 * (T1 - T2) ** 2 + (P1 - P2) ** 2);
}
var white$3 = WHITES.D65;
var adaptedCoef = 0.42;
var adaptedCoefInv = 1 / adaptedCoef;
var tau2 = 2 * Math.PI;
var cat16 = [
  [0.401288, 0.650173, -0.051461],
  [-0.250268, 1.204414, 0.045854],
  [-2079e-6, 0.048952, 0.953127]
];
var cat16Inv = [
  [1.8620678550872327, -1.0112546305316843, 0.14918677544445175],
  [0.38752654323613717, 0.6214474419314753, -0.008973985167612518],
  [-0.015841498849333856, -0.03412293802851557, 1.0499644368778496]
];
var m1 = [
  [460, 451, 288],
  [460, -891, -261],
  [460, -220, -6300]
];
var surroundMap = {
  dark: [0.8, 0.525, 0.8],
  dim: [0.9, 0.59, 0.9],
  average: [1, 0.69, 1]
};
var hueQuadMap = {
  // Red, Yellow, Green, Blue, Red
  h: [20.14, 90, 164.25, 237.53, 380.14],
  e: [0.8, 0.7, 1, 1.2, 0.8],
  H: [0, 100, 200, 300, 400]
};
var rad2deg = 180 / Math.PI;
var deg2rad$1 = Math.PI / 180;
function adapt$1(coords, fl) {
  const temp = coords.map((c4) => {
    const x = spow(fl * Math.abs(c4) * 0.01, adaptedCoef);
    return 400 * copySign(x, c4) / (x + 27.13);
  });
  return temp;
}
function unadapt(adapted, fl) {
  const constant = 100 / fl * 27.13 ** adaptedCoefInv;
  return adapted.map((c4) => {
    const cabs = Math.abs(c4);
    return copySign(constant * spow(cabs / (400 - cabs), adaptedCoefInv), c4);
  });
}
function hueQuadrature(h) {
  let hp = constrain(h);
  if (hp <= hueQuadMap.h[0]) {
    hp += 360;
  }
  const i = bisectLeft(hueQuadMap.h, hp) - 1;
  const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
  const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
  const Hi = hueQuadMap.H[i];
  const t2 = (hp - hi) / ei;
  return Hi + 100 * t2 / (t2 + (hii - hp) / eii);
}
function invHueQuadrature(H) {
  let Hp = (H % 400 + 400) % 400;
  const i = Math.floor(0.01 * Hp);
  Hp = Hp % 100;
  const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
  const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
  return constrain(
    (Hp * (eii * hi - ei * hii) - 100 * hi * eii) / (Hp * (eii - ei) - 100 * eii)
  );
}
function environment(refWhite, adaptingLuminance, backgroundLuminance, surround, discounting) {
  const env = {};
  env.discounting = discounting;
  env.refWhite = refWhite;
  env.surround = surround;
  const xyzW = refWhite.map((c4) => {
    return c4 * 100;
  });
  env.la = adaptingLuminance;
  env.yb = backgroundLuminance;
  const yw = xyzW[1];
  const rgbW = multiplyMatrices(cat16, xyzW);
  surround = surroundMap[env.surround];
  const f = surround[0];
  env.c = surround[1];
  env.nc = surround[2];
  const k = 1 / (5 * env.la + 1);
  const k4 = k ** 4;
  env.fl = k4 * env.la + 0.1 * (1 - k4) * (1 - k4) * Math.cbrt(5 * env.la);
  env.flRoot = env.fl ** 0.25;
  env.n = env.yb / yw;
  env.z = 1.48 + Math.sqrt(env.n);
  env.nbb = 0.725 * env.n ** -0.2;
  env.ncb = env.nbb;
  const d2 = discounting ? 1 : Math.max(
    Math.min(f * (1 - 1 / 3.6 * Math.exp((-env.la - 42) / 92)), 1),
    0
  );
  env.dRgb = rgbW.map((c4) => {
    return interpolate6(1, yw / c4, d2);
  });
  env.dRgbInv = env.dRgb.map((c4) => {
    return 1 / c4;
  });
  const rgbCW = rgbW.map((c4, i) => {
    return c4 * env.dRgb[i];
  });
  const rgbAW = adapt$1(rgbCW, env.fl);
  env.aW = env.nbb * (2 * rgbAW[0] + rgbAW[1] + 0.05 * rgbAW[2]);
  return env;
}
var viewingConditions$1 = environment(
  white$3,
  64 / Math.PI * 0.2,
  20,
  "average",
  false
);
function fromCam16(cam162, env) {
  if (!(cam162.J !== void 0 ^ cam162.Q !== void 0)) {
    throw new Error("Conversion requires one and only one: 'J' or 'Q'");
  }
  if (!(cam162.C !== void 0 ^ cam162.M !== void 0 ^ cam162.s !== void 0)) {
    throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");
  }
  if (!(cam162.h !== void 0 ^ cam162.H !== void 0)) {
    throw new Error("Conversion requires one and only one: 'h' or 'H'");
  }
  if (cam162.J === 0 || cam162.Q === 0) {
    return [0, 0, 0];
  }
  let hRad = 0;
  if (cam162.h !== void 0) {
    hRad = constrain(cam162.h) * deg2rad$1;
  } else {
    hRad = invHueQuadrature(cam162.H) * deg2rad$1;
  }
  const cosh = Math.cos(hRad);
  const sinh = Math.sin(hRad);
  let Jroot = 0;
  if (cam162.J !== void 0) {
    Jroot = spow(cam162.J, 1 / 2) * 0.1;
  } else if (cam162.Q !== void 0) {
    Jroot = 0.25 * env.c * cam162.Q / ((env.aW + 4) * env.flRoot);
  }
  let alpha = 0;
  if (cam162.C !== void 0) {
    alpha = cam162.C / Jroot;
  } else if (cam162.M !== void 0) {
    alpha = cam162.M / env.flRoot / Jroot;
  } else if (cam162.s !== void 0) {
    alpha = 4e-4 * cam162.s ** 2 * (env.aW + 4) / env.c;
  }
  const t2 = spow(
    alpha * Math.pow(1.64 - Math.pow(0.29, env.n), -0.73),
    10 / 9
  );
  const et = 0.25 * (Math.cos(hRad + 2) + 3.8);
  const A = env.aW * spow(Jroot, 2 / env.c / env.z);
  const p1 = 5e4 / 13 * env.nc * env.ncb * et;
  const p2 = A / env.nbb;
  const r = 23 * (p2 + 0.305) * zdiv(t2, 23 * p1 + t2 * (11 * cosh + 108 * sinh));
  const a2 = r * cosh;
  const b2 = r * sinh;
  const rgb_c = unadapt(
    multiplyMatrices(m1, [p2, a2, b2]).map((c4) => {
      return c4 * 1 / 1403;
    }),
    env.fl
  );
  return multiplyMatrices(
    cat16Inv,
    rgb_c.map((c4, i) => {
      return c4 * env.dRgbInv[i];
    })
  ).map((c4) => {
    return c4 / 100;
  });
}
function toCam16(xyzd65, env) {
  const xyz100 = xyzd65.map((c4) => {
    return c4 * 100;
  });
  const rgbA = adapt$1(
    multiplyMatrices(cat16, xyz100).map((c4, i) => {
      return c4 * env.dRgb[i];
    }),
    env.fl
  );
  const a2 = rgbA[0] + (-12 * rgbA[1] + rgbA[2]) / 11;
  const b2 = (rgbA[0] + rgbA[1] - 2 * rgbA[2]) / 9;
  const hRad = (Math.atan2(b2, a2) % tau2 + tau2) % tau2;
  const et = 0.25 * (Math.cos(hRad + 2) + 3.8);
  const t2 = 5e4 / 13 * env.nc * env.ncb * zdiv(
    et * Math.sqrt(a2 ** 2 + b2 ** 2),
    rgbA[0] + rgbA[1] + 1.05 * rgbA[2] + 0.305
  );
  const alpha = spow(t2, 0.9) * Math.pow(1.64 - Math.pow(0.29, env.n), 0.73);
  const A = env.nbb * (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]);
  const Jroot = spow(A / env.aW, 0.5 * env.c * env.z);
  const J = 100 * spow(Jroot, 2);
  const Q = 4 / env.c * Jroot * (env.aW + 4) * env.flRoot;
  const C = alpha * Jroot;
  const M = C * env.flRoot;
  const h = constrain(hRad * rad2deg);
  const H = hueQuadrature(h);
  const s = 50 * spow(env.c * alpha / (env.aW + 4), 1 / 2);
  return { J, C, h, s, Q, M, H };
}
var cam16 = new ColorSpace({
  id: "cam16-jmh",
  cssId: "--cam16-jmh",
  name: "CAM16-JMh",
  coords: {
    j: {
      refRange: [0, 100],
      name: "J"
    },
    m: {
      refRange: [0, 105],
      name: "Colorfulness"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: xyz_d65,
  fromBase(xyz) {
    const cam162 = toCam16(xyz, viewingConditions$1);
    return [cam162.J, cam162.M, cam162.h];
  },
  toBase(cam162) {
    return fromCam16(
      { J: cam162[0], M: cam162[1], h: cam162[2] },
      viewingConditions$1
    );
  }
});
var white$2 = WHITES.D65;
var \u03B5$4 = 216 / 24389;
var \u03BA$3 = 24389 / 27;
function toLstar(y) {
  const fy = y > \u03B5$4 ? Math.cbrt(y) : (\u03BA$3 * y + 16) / 116;
  return 116 * fy - 16;
}
function fromLstar(lstar) {
  return lstar > 8 ? Math.pow((lstar + 16) / 116, 3) : lstar / \u03BA$3;
}
function fromHct(coords, env) {
  let [h, c4, t2] = coords;
  let xyz = [];
  let j = 0;
  if (t2 === 0) {
    return [0, 0, 0];
  }
  let y = fromLstar(t2);
  if (t2 > 0) {
    j = 0.00379058511492914 * t2 ** 2 + 0.608983189401032 * t2 + 0.9155088574762233;
  } else {
    j = 9514440756550361e-21 * t2 ** 2 + 0.08693057439788597 * t2 - 21.928975842194614;
  }
  const threshold = 2e-12;
  const max_attempts = 15;
  let attempt = 0;
  let last2 = Infinity;
  while (attempt <= max_attempts) {
    xyz = fromCam16({ J: j, C: c4, h }, env);
    const delta = Math.abs(xyz[1] - y);
    if (delta < last2) {
      if (delta <= threshold) {
        return xyz;
      }
      last2 = delta;
    }
    j = j - (xyz[1] - y) * j / (2 * xyz[1]);
    attempt += 1;
  }
  return fromCam16({ J: j, C: c4, h }, env);
}
function toHct(xyz, env) {
  const t2 = toLstar(xyz[1]);
  if (t2 === 0) {
    return [0, 0, 0];
  }
  const cam162 = toCam16(xyz, viewingConditions);
  return [constrain(cam162.h), cam162.C, t2];
}
var viewingConditions = environment(
  white$2,
  200 / Math.PI * fromLstar(50),
  fromLstar(50) * 100,
  "average",
  false
);
var hct = new ColorSpace({
  id: "hct",
  name: "HCT",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    c: {
      refRange: [0, 145],
      name: "Colorfulness"
    },
    t: {
      refRange: [0, 100],
      name: "Tone"
    }
  },
  base: xyz_d65,
  fromBase(xyz) {
    return toHct(xyz);
  },
  toBase(hct2) {
    return fromHct(hct2, viewingConditions);
  },
  formats: {
    color: {
      id: "--hct",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var deg2rad = Math.PI / 180;
var ucsCoeff = [1, 7e-3, 0.0228];
function convertUcsAb(coords) {
  if (coords[1] < 0) {
    coords = hct.fromBase(hct.toBase(coords));
  }
  const M = Math.log(Math.max(1 + ucsCoeff[2] * coords[1] * viewingConditions.flRoot, 1)) / ucsCoeff[2];
  const hrad = coords[0] * deg2rad;
  const a2 = M * Math.cos(hrad);
  const b2 = M * Math.sin(hrad);
  return [coords[2], a2, b2];
}
function deltaEHCT(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [t1, a1, b1] = convertUcsAb(hct.from(color));
  let [t2, a2, b2] = convertUcsAb(hct.from(sample));
  return Math.sqrt((t1 - t2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}
var deltaEMethods = {
  deltaE76,
  deltaECMC,
  deltaE2000,
  deltaEJz,
  deltaEITP,
  deltaEOK,
  deltaEHCT
};
function calcEpsilon(jnd) {
  const order = !jnd ? 0 : Math.floor(Math.log10(Math.abs(jnd)));
  return Math.max(parseFloat(`1e${order - 2}`), 1e-6);
}
var GMAPPRESET = {
  "hct": {
    method: "hct.c",
    jnd: 2,
    deltaEMethod: "hct",
    blackWhiteClamp: {}
  },
  "hct-tonal": {
    method: "hct.c",
    jnd: 0,
    deltaEMethod: "hct",
    blackWhiteClamp: { channel: "hct.t", min: 0, max: 100 }
  }
};
function toGamut(color, {
  method = defaults.gamut_mapping,
  space = void 0,
  deltaEMethod = "",
  jnd = 2,
  blackWhiteClamp = {}
} = {}) {
  color = getColor(color);
  if (isString(arguments[1])) {
    space = arguments[1];
  } else if (!space) {
    space = color.space;
  }
  space = ColorSpace.get(space);
  if (inGamut(color, space, { epsilon: 0 })) {
    return color;
  }
  let spaceColor;
  if (method === "css") {
    spaceColor = toGamutCSS(color, { space });
  } else {
    if (method !== "clip" && !inGamut(color, space)) {
      if (Object.prototype.hasOwnProperty.call(GMAPPRESET, method)) {
        ({ method, jnd, deltaEMethod, blackWhiteClamp } = GMAPPRESET[method]);
      }
      let de = deltaE2000;
      if (deltaEMethod !== "") {
        for (let m3 in deltaEMethods) {
          if ("deltae" + deltaEMethod.toLowerCase() === m3.toLowerCase()) {
            de = deltaEMethods[m3];
            break;
          }
        }
      }
      let clipped = toGamut(to(color, space), { method: "clip", space });
      if (de(color, clipped) > jnd) {
        if (Object.keys(blackWhiteClamp).length === 3) {
          let channelMeta = ColorSpace.resolveCoord(blackWhiteClamp.channel);
          let channel = get(to(color, channelMeta.space), channelMeta.id);
          if (isNone(channel)) {
            channel = 0;
          }
          if (channel >= blackWhiteClamp.max) {
            return to({ space: "xyz-d65", coords: WHITES["D65"] }, color.space);
          } else if (channel <= blackWhiteClamp.min) {
            return to({ space: "xyz-d65", coords: [0, 0, 0] }, color.space);
          }
        }
        let coordMeta = ColorSpace.resolveCoord(method);
        let mapSpace = coordMeta.space;
        let coordId = coordMeta.id;
        let mappedColor = to(color, mapSpace);
        mappedColor.coords.forEach((c4, i) => {
          if (isNone(c4)) {
            mappedColor.coords[i] = 0;
          }
        });
        let bounds = coordMeta.range || coordMeta.refRange;
        let min2 = bounds[0];
        let \u03B52 = calcEpsilon(jnd);
        let low = min2;
        let high = get(mappedColor, coordId);
        while (high - low > \u03B52) {
          let clipped2 = clone(mappedColor);
          clipped2 = toGamut(clipped2, { space, method: "clip" });
          let deltaE2 = de(mappedColor, clipped2);
          if (deltaE2 - jnd < \u03B52) {
            low = get(mappedColor, coordId);
          } else {
            high = get(mappedColor, coordId);
          }
          set(mappedColor, coordId, (low + high) / 2);
        }
        spaceColor = to(mappedColor, space);
      } else {
        spaceColor = clipped;
      }
    } else {
      spaceColor = to(color, space);
    }
    if (method === "clip" || !inGamut(spaceColor, space, { epsilon: 0 })) {
      let bounds = Object.values(space.coords).map((c4) => c4.range || []);
      spaceColor.coords = spaceColor.coords.map((c4, i) => {
        let [min2, max22] = bounds[i];
        if (min2 !== void 0) {
          c4 = Math.max(min2, c4);
        }
        if (max22 !== void 0) {
          c4 = Math.min(c4, max22);
        }
        return c4;
      });
    }
  }
  if (space !== color.space) {
    spaceColor = to(spaceColor, color.space);
  }
  color.coords = spaceColor.coords;
  return color;
}
toGamut.returns = "color";
var COLORS = {
  WHITE: { space: OKLab, coords: [1, 0, 0] },
  BLACK: { space: OKLab, coords: [0, 0, 0] }
};
function toGamutCSS(origin, { space } = {}) {
  const JND = 0.02;
  const \u03B52 = 1e-4;
  origin = getColor(origin);
  if (!space) {
    space = origin.space;
  }
  space = ColorSpace.get(space);
  const oklchSpace = ColorSpace.get("oklch");
  if (space.isUnbounded) {
    return to(origin, space);
  }
  const origin_OKLCH = to(origin, oklchSpace);
  let L = origin_OKLCH.coords[0];
  if (L >= 1) {
    const white2 = to(COLORS.WHITE, space);
    white2.alpha = origin.alpha;
    return to(white2, space);
  }
  if (L <= 0) {
    const black = to(COLORS.BLACK, space);
    black.alpha = origin.alpha;
    return to(black, space);
  }
  if (inGamut(origin_OKLCH, space, { epsilon: 0 })) {
    return to(origin_OKLCH, space);
  }
  function clip(_color) {
    const destColor = to(_color, space);
    const spaceCoords = Object.values(space.coords);
    destColor.coords = destColor.coords.map((coord, index) => {
      if ("range" in spaceCoords[index]) {
        const [min22, max3] = spaceCoords[index].range;
        return clamp22(min22, coord, max3);
      }
      return coord;
    });
    return destColor;
  }
  let min2 = 0;
  let max22 = origin_OKLCH.coords[1];
  let min_inGamut = true;
  let current = clone(origin_OKLCH);
  let clipped = clip(current);
  let E = deltaEOK(clipped, current);
  if (E < JND) {
    return clipped;
  }
  while (max22 - min2 > \u03B52) {
    const chroma = (min2 + max22) / 2;
    current.coords[1] = chroma;
    if (min_inGamut && inGamut(current, space, { epsilon: 0 })) {
      min2 = chroma;
    } else {
      clipped = clip(current);
      E = deltaEOK(clipped, current);
      if (E < JND) {
        if (JND - E < \u03B52) {
          break;
        } else {
          min_inGamut = false;
          min2 = chroma;
        }
      } else {
        max22 = chroma;
      }
    }
  }
  return clipped;
}
function to(color, space, { inGamut: inGamut2 } = {}) {
  color = getColor(color);
  space = ColorSpace.get(space);
  let coords = space.from(color);
  let ret = { space, coords, alpha: color.alpha };
  if (inGamut2) {
    ret = toGamut(ret, inGamut2 === true ? void 0 : inGamut2);
  }
  return ret;
}
to.returns = "color";
function serialize(color, {
  precision = defaults.precision,
  format = "default",
  inGamut: inGamut$1 = true,
  ...customOptions
} = {}) {
  let ret;
  color = getColor(color);
  let formatId = format;
  format = color.space.getFormat(format) ?? color.space.getFormat("default") ?? ColorSpace.DEFAULT_FORMAT;
  let coords = color.coords.slice();
  inGamut$1 ||= format.toGamut;
  if (inGamut$1 && !inGamut(color)) {
    coords = toGamut(clone(color), inGamut$1 === true ? void 0 : inGamut$1).coords;
  }
  if (format.type === "custom") {
    customOptions.precision = precision;
    if (format.serialize) {
      ret = format.serialize(coords, color.alpha, customOptions);
    } else {
      throw new TypeError(`format ${formatId} can only be used to parse colors, not for serialization`);
    }
  } else {
    let name2 = format.name || "color";
    if (format.serializeCoords) {
      coords = format.serializeCoords(coords, precision);
    } else {
      if (precision !== null) {
        coords = coords.map((c4) => {
          return serializeNumber(c4, { precision });
        });
      }
    }
    let args = [...coords];
    if (name2 === "color") {
      let cssId = format.id || format.ids?.[0] || color.space.id;
      args.unshift(cssId);
    }
    let alpha = color.alpha;
    if (precision !== null) {
      alpha = serializeNumber(alpha, { precision });
    }
    let strAlpha = color.alpha >= 1 || format.noAlpha ? "" : `${format.commas ? "," : " /"} ${alpha}`;
    ret = `${name2}(${args.join(format.commas ? ", " : " ")}${strAlpha})`;
  }
  return ret;
}
var toXYZ_M$5 = [
  [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
  [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
  [0, 0.028072693049087428, 1.060985057710791]
];
var fromXYZ_M$5 = [
  [1.716651187971268, -0.355670783776392, -0.25336628137366],
  [-0.666684351832489, 1.616481236634939, 0.0157685458139111],
  [0.017639857445311, -0.042770613257809, 0.942103121235474]
];
var REC2020Linear = new RGBColorSpace({
  id: "rec2020-linear",
  cssId: "--rec2020-linear",
  name: "Linear REC.2020",
  white: "D65",
  toXYZ_M: toXYZ_M$5,
  fromXYZ_M: fromXYZ_M$5
});
var \u03B1 = 1.09929682680944;
var \u03B2 = 0.018053968510807;
var REC2020 = new RGBColorSpace({
  id: "rec2020",
  name: "REC.2020",
  base: REC2020Linear,
  // Non-linear transfer function from Rec. ITU-R BT.2020-2 table 4
  toBase(RGB) {
    return RGB.map(function(val) {
      if (val < \u03B2 * 4.5) {
        return val / 4.5;
      }
      return Math.pow((val + \u03B1 - 1) / \u03B1, 1 / 0.45);
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      if (val >= \u03B2) {
        return \u03B1 * Math.pow(val, 0.45) - (\u03B1 - 1);
      }
      return 4.5 * val;
    });
  }
});
var toXYZ_M$4 = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976]
];
var fromXYZ_M$4 = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
];
var P3Linear = new RGBColorSpace({
  id: "p3-linear",
  cssId: "--display-p3-linear",
  name: "Linear P3",
  white: "D65",
  toXYZ_M: toXYZ_M$4,
  fromXYZ_M: fromXYZ_M$4
});
var toXYZ_M$3 = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
];
var fromXYZ_M$3 = [
  [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
  [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
  [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
];
var sRGBLinear = new RGBColorSpace({
  id: "srgb-linear",
  name: "Linear sRGB",
  white: "D65",
  toXYZ_M: toXYZ_M$3,
  fromXYZ_M: fromXYZ_M$3
});
var KEYWORDS = {
  "aliceblue": [240 / 255, 248 / 255, 1],
  "antiquewhite": [250 / 255, 235 / 255, 215 / 255],
  "aqua": [0, 1, 1],
  "aquamarine": [127 / 255, 1, 212 / 255],
  "azure": [240 / 255, 1, 1],
  "beige": [245 / 255, 245 / 255, 220 / 255],
  "bisque": [1, 228 / 255, 196 / 255],
  "black": [0, 0, 0],
  "blanchedalmond": [1, 235 / 255, 205 / 255],
  "blue": [0, 0, 1],
  "blueviolet": [138 / 255, 43 / 255, 226 / 255],
  "brown": [165 / 255, 42 / 255, 42 / 255],
  "burlywood": [222 / 255, 184 / 255, 135 / 255],
  "cadetblue": [95 / 255, 158 / 255, 160 / 255],
  "chartreuse": [127 / 255, 1, 0],
  "chocolate": [210 / 255, 105 / 255, 30 / 255],
  "coral": [1, 127 / 255, 80 / 255],
  "cornflowerblue": [100 / 255, 149 / 255, 237 / 255],
  "cornsilk": [1, 248 / 255, 220 / 255],
  "crimson": [220 / 255, 20 / 255, 60 / 255],
  "cyan": [0, 1, 1],
  "darkblue": [0, 0, 139 / 255],
  "darkcyan": [0, 139 / 255, 139 / 255],
  "darkgoldenrod": [184 / 255, 134 / 255, 11 / 255],
  "darkgray": [169 / 255, 169 / 255, 169 / 255],
  "darkgreen": [0, 100 / 255, 0],
  "darkgrey": [169 / 255, 169 / 255, 169 / 255],
  "darkkhaki": [189 / 255, 183 / 255, 107 / 255],
  "darkmagenta": [139 / 255, 0, 139 / 255],
  "darkolivegreen": [85 / 255, 107 / 255, 47 / 255],
  "darkorange": [1, 140 / 255, 0],
  "darkorchid": [153 / 255, 50 / 255, 204 / 255],
  "darkred": [139 / 255, 0, 0],
  "darksalmon": [233 / 255, 150 / 255, 122 / 255],
  "darkseagreen": [143 / 255, 188 / 255, 143 / 255],
  "darkslateblue": [72 / 255, 61 / 255, 139 / 255],
  "darkslategray": [47 / 255, 79 / 255, 79 / 255],
  "darkslategrey": [47 / 255, 79 / 255, 79 / 255],
  "darkturquoise": [0, 206 / 255, 209 / 255],
  "darkviolet": [148 / 255, 0, 211 / 255],
  "deeppink": [1, 20 / 255, 147 / 255],
  "deepskyblue": [0, 191 / 255, 1],
  "dimgray": [105 / 255, 105 / 255, 105 / 255],
  "dimgrey": [105 / 255, 105 / 255, 105 / 255],
  "dodgerblue": [30 / 255, 144 / 255, 1],
  "firebrick": [178 / 255, 34 / 255, 34 / 255],
  "floralwhite": [1, 250 / 255, 240 / 255],
  "forestgreen": [34 / 255, 139 / 255, 34 / 255],
  "fuchsia": [1, 0, 1],
  "gainsboro": [220 / 255, 220 / 255, 220 / 255],
  "ghostwhite": [248 / 255, 248 / 255, 1],
  "gold": [1, 215 / 255, 0],
  "goldenrod": [218 / 255, 165 / 255, 32 / 255],
  "gray": [128 / 255, 128 / 255, 128 / 255],
  "green": [0, 128 / 255, 0],
  "greenyellow": [173 / 255, 1, 47 / 255],
  "grey": [128 / 255, 128 / 255, 128 / 255],
  "honeydew": [240 / 255, 1, 240 / 255],
  "hotpink": [1, 105 / 255, 180 / 255],
  "indianred": [205 / 255, 92 / 255, 92 / 255],
  "indigo": [75 / 255, 0, 130 / 255],
  "ivory": [1, 1, 240 / 255],
  "khaki": [240 / 255, 230 / 255, 140 / 255],
  "lavender": [230 / 255, 230 / 255, 250 / 255],
  "lavenderblush": [1, 240 / 255, 245 / 255],
  "lawngreen": [124 / 255, 252 / 255, 0],
  "lemonchiffon": [1, 250 / 255, 205 / 255],
  "lightblue": [173 / 255, 216 / 255, 230 / 255],
  "lightcoral": [240 / 255, 128 / 255, 128 / 255],
  "lightcyan": [224 / 255, 1, 1],
  "lightgoldenrodyellow": [250 / 255, 250 / 255, 210 / 255],
  "lightgray": [211 / 255, 211 / 255, 211 / 255],
  "lightgreen": [144 / 255, 238 / 255, 144 / 255],
  "lightgrey": [211 / 255, 211 / 255, 211 / 255],
  "lightpink": [1, 182 / 255, 193 / 255],
  "lightsalmon": [1, 160 / 255, 122 / 255],
  "lightseagreen": [32 / 255, 178 / 255, 170 / 255],
  "lightskyblue": [135 / 255, 206 / 255, 250 / 255],
  "lightslategray": [119 / 255, 136 / 255, 153 / 255],
  "lightslategrey": [119 / 255, 136 / 255, 153 / 255],
  "lightsteelblue": [176 / 255, 196 / 255, 222 / 255],
  "lightyellow": [1, 1, 224 / 255],
  "lime": [0, 1, 0],
  "limegreen": [50 / 255, 205 / 255, 50 / 255],
  "linen": [250 / 255, 240 / 255, 230 / 255],
  "magenta": [1, 0, 1],
  "maroon": [128 / 255, 0, 0],
  "mediumaquamarine": [102 / 255, 205 / 255, 170 / 255],
  "mediumblue": [0, 0, 205 / 255],
  "mediumorchid": [186 / 255, 85 / 255, 211 / 255],
  "mediumpurple": [147 / 255, 112 / 255, 219 / 255],
  "mediumseagreen": [60 / 255, 179 / 255, 113 / 255],
  "mediumslateblue": [123 / 255, 104 / 255, 238 / 255],
  "mediumspringgreen": [0, 250 / 255, 154 / 255],
  "mediumturquoise": [72 / 255, 209 / 255, 204 / 255],
  "mediumvioletred": [199 / 255, 21 / 255, 133 / 255],
  "midnightblue": [25 / 255, 25 / 255, 112 / 255],
  "mintcream": [245 / 255, 1, 250 / 255],
  "mistyrose": [1, 228 / 255, 225 / 255],
  "moccasin": [1, 228 / 255, 181 / 255],
  "navajowhite": [1, 222 / 255, 173 / 255],
  "navy": [0, 0, 128 / 255],
  "oldlace": [253 / 255, 245 / 255, 230 / 255],
  "olive": [128 / 255, 128 / 255, 0],
  "olivedrab": [107 / 255, 142 / 255, 35 / 255],
  "orange": [1, 165 / 255, 0],
  "orangered": [1, 69 / 255, 0],
  "orchid": [218 / 255, 112 / 255, 214 / 255],
  "palegoldenrod": [238 / 255, 232 / 255, 170 / 255],
  "palegreen": [152 / 255, 251 / 255, 152 / 255],
  "paleturquoise": [175 / 255, 238 / 255, 238 / 255],
  "palevioletred": [219 / 255, 112 / 255, 147 / 255],
  "papayawhip": [1, 239 / 255, 213 / 255],
  "peachpuff": [1, 218 / 255, 185 / 255],
  "peru": [205 / 255, 133 / 255, 63 / 255],
  "pink": [1, 192 / 255, 203 / 255],
  "plum": [221 / 255, 160 / 255, 221 / 255],
  "powderblue": [176 / 255, 224 / 255, 230 / 255],
  "purple": [128 / 255, 0, 128 / 255],
  "rebeccapurple": [102 / 255, 51 / 255, 153 / 255],
  "red": [1, 0, 0],
  "rosybrown": [188 / 255, 143 / 255, 143 / 255],
  "royalblue": [65 / 255, 105 / 255, 225 / 255],
  "saddlebrown": [139 / 255, 69 / 255, 19 / 255],
  "salmon": [250 / 255, 128 / 255, 114 / 255],
  "sandybrown": [244 / 255, 164 / 255, 96 / 255],
  "seagreen": [46 / 255, 139 / 255, 87 / 255],
  "seashell": [1, 245 / 255, 238 / 255],
  "sienna": [160 / 255, 82 / 255, 45 / 255],
  "silver": [192 / 255, 192 / 255, 192 / 255],
  "skyblue": [135 / 255, 206 / 255, 235 / 255],
  "slateblue": [106 / 255, 90 / 255, 205 / 255],
  "slategray": [112 / 255, 128 / 255, 144 / 255],
  "slategrey": [112 / 255, 128 / 255, 144 / 255],
  "snow": [1, 250 / 255, 250 / 255],
  "springgreen": [0, 1, 127 / 255],
  "steelblue": [70 / 255, 130 / 255, 180 / 255],
  "tan": [210 / 255, 180 / 255, 140 / 255],
  "teal": [0, 128 / 255, 128 / 255],
  "thistle": [216 / 255, 191 / 255, 216 / 255],
  "tomato": [1, 99 / 255, 71 / 255],
  "turquoise": [64 / 255, 224 / 255, 208 / 255],
  "violet": [238 / 255, 130 / 255, 238 / 255],
  "wheat": [245 / 255, 222 / 255, 179 / 255],
  "white": [1, 1, 1],
  "whitesmoke": [245 / 255, 245 / 255, 245 / 255],
  "yellow": [1, 1, 0],
  "yellowgreen": [154 / 255, 205 / 255, 50 / 255]
};
var coordGrammar = Array(3).fill("<percentage> | <number>[0, 255]");
var coordGrammarNumber = Array(3).fill("<number>[0, 255]");
var sRGB = new RGBColorSpace({
  id: "srgb",
  name: "sRGB",
  base: sRGBLinear,
  fromBase: (rgb) => {
    return rgb.map((val) => {
      let sign = val < 0 ? -1 : 1;
      let abs4 = val * sign;
      if (abs4 > 31308e-7) {
        return sign * (1.055 * abs4 ** (1 / 2.4) - 0.055);
      }
      return 12.92 * val;
    });
  },
  toBase: (rgb) => {
    return rgb.map((val) => {
      let sign = val < 0 ? -1 : 1;
      let abs4 = val * sign;
      if (abs4 <= 0.04045) {
        return val / 12.92;
      }
      return sign * ((abs4 + 0.055) / 1.055) ** 2.4;
    });
  },
  formats: {
    "rgb": {
      coords: coordGrammar
    },
    "rgb_number": {
      name: "rgb",
      commas: true,
      coords: coordGrammarNumber,
      noAlpha: true
    },
    "color": {
      /* use defaults */
    },
    "rgba": {
      coords: coordGrammar,
      commas: true,
      lastAlpha: true
    },
    "rgba_number": {
      name: "rgba",
      commas: true,
      coords: coordGrammarNumber
    },
    "hex": {
      type: "custom",
      toGamut: true,
      test: (str) => /^#([a-f0-9]{3,4}){1,2}$/i.test(str),
      parse(str) {
        if (str.length <= 5) {
          str = str.replace(/[a-f0-9]/gi, "$&$&");
        }
        let rgba = [];
        str.replace(/[a-f0-9]{2}/gi, (component) => {
          rgba.push(parseInt(component, 16) / 255);
        });
        return {
          spaceId: "srgb",
          coords: rgba.slice(0, 3),
          alpha: rgba.slice(3)[0]
        };
      },
      serialize: (coords, alpha, {
        collapse = true
        // collapse to 3-4 digit hex when possible?
      } = {}) => {
        if (alpha < 1) {
          coords.push(alpha);
        }
        coords = coords.map((c4) => Math.round(c4 * 255));
        let collapsible = collapse && coords.every((c4) => c4 % 17 === 0);
        let hex = coords.map((c4) => {
          if (collapsible) {
            return (c4 / 17).toString(16);
          }
          return c4.toString(16).padStart(2, "0");
        }).join("");
        return "#" + hex;
      }
    },
    "keyword": {
      type: "custom",
      test: (str) => /^[a-z]+$/i.test(str),
      parse(str) {
        str = str.toLowerCase();
        let ret = { spaceId: "srgb", coords: null, alpha: 1 };
        if (str === "transparent") {
          ret.coords = KEYWORDS.black;
          ret.alpha = 0;
        } else {
          ret.coords = KEYWORDS[str];
        }
        if (ret.coords) {
          return ret;
        }
      }
    }
  }
});
var P3 = new RGBColorSpace({
  id: "p3",
  cssId: "display-p3",
  name: "P3",
  base: P3Linear,
  // Gamma encoding/decoding is the same as sRGB
  fromBase: sRGB.fromBase,
  toBase: sRGB.toBase
});
defaults.display_space = sRGB;
var supportsNone;
if (typeof CSS !== "undefined" && CSS.supports) {
  for (let space of [lab, REC2020, P3]) {
    let coords = space.getMinCoords();
    let color = { space, coords, alpha: 1 };
    let str = serialize(color);
    if (CSS.supports("color", str)) {
      defaults.display_space = space;
      break;
    }
  }
}
function display(color, { space = defaults.display_space, ...options } = {}) {
  let ret = serialize(color, options);
  if (typeof CSS === "undefined" || CSS.supports("color", ret) || !defaults.display_space) {
    ret = new String(ret);
    ret.color = color;
  } else {
    let fallbackColor = color;
    let hasNone = color.coords.some(isNone) || isNone(color.alpha);
    if (hasNone) {
      if (!(supportsNone ??= CSS.supports("color", "hsl(none 50% 50%)"))) {
        fallbackColor = clone(color);
        fallbackColor.coords = fallbackColor.coords.map(skipNone);
        fallbackColor.alpha = skipNone(fallbackColor.alpha);
        ret = serialize(fallbackColor, options);
        if (CSS.supports("color", ret)) {
          ret = new String(ret);
          ret.color = fallbackColor;
          return ret;
        }
      }
    }
    fallbackColor = to(fallbackColor, space);
    ret = new String(serialize(fallbackColor, options));
    ret.color = fallbackColor;
  }
  return ret;
}
function equals(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  return color1.space === color2.space && color1.alpha === color2.alpha && color1.coords.every((c4, i) => c4 === color2.coords[i]);
}
function getLuminance(color) {
  return get(color, [xyz_d65, "y"]);
}
function setLuminance(color, value) {
  set(color, [xyz_d65, "y"], value);
}
function register$2(Color2) {
  Object.defineProperty(Color2.prototype, "luminance", {
    get() {
      return getLuminance(this);
    },
    set(value) {
      setLuminance(this, value);
    }
  });
}
var luminance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getLuminance,
  register: register$2,
  setLuminance
});
function contrastWCAG21(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  return (Y1 + 0.05) / (Y2 + 0.05);
}
var normBG = 0.56;
var normTXT = 0.57;
var revTXT = 0.62;
var revBG = 0.65;
var blkThrs = 0.022;
var blkClmp = 1.414;
var loClip = 0.1;
var deltaYmin = 5e-4;
var scaleBoW = 1.14;
var loBoWoffset = 0.027;
var scaleWoB = 1.14;
function fclamp(Y) {
  if (Y >= blkThrs) {
    return Y;
  }
  return Y + (blkThrs - Y) ** blkClmp;
}
function linearize(val) {
  let sign = val < 0 ? -1 : 1;
  let abs4 = Math.abs(val);
  return sign * Math.pow(abs4, 2.4);
}
function contrastAPCA(background, foreground) {
  foreground = getColor(foreground);
  background = getColor(background);
  let S;
  let C;
  let Sapc;
  let R, G, B;
  foreground = to(foreground, "srgb");
  [R, G, B] = foreground.coords;
  let lumTxt = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.072175;
  background = to(background, "srgb");
  [R, G, B] = background.coords;
  let lumBg = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.072175;
  let Ytxt = fclamp(lumTxt);
  let Ybg = fclamp(lumBg);
  let BoW = Ybg > Ytxt;
  if (Math.abs(Ybg - Ytxt) < deltaYmin) {
    C = 0;
  } else {
    if (BoW) {
      S = Ybg ** normBG - Ytxt ** normTXT;
      C = S * scaleBoW;
    } else {
      S = Ybg ** revBG - Ytxt ** revTXT;
      C = S * scaleWoB;
    }
  }
  if (Math.abs(C) < loClip) {
    Sapc = 0;
  } else if (C > 0) {
    Sapc = C - loBoWoffset;
  } else {
    Sapc = C + loBoWoffset;
  }
  return Sapc * 100;
}
function contrastMichelson(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  let denom = Y1 + Y2;
  return denom === 0 ? 0 : (Y1 - Y2) / denom;
}
var max2 = 5e4;
function contrastWeber(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  return Y2 === 0 ? max2 : (Y1 - Y2) / Y2;
}
function contrastLstar(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let L1 = get(color1, [lab, "l"]);
  let L2 = get(color2, [lab, "l"]);
  return Math.abs(L1 - L2);
}
var \u03B5$3 = 216 / 24389;
var \u03B53 = 24 / 116;
var \u03BA$2 = 24389 / 27;
var white$1 = WHITES.D65;
var lab_d65 = new ColorSpace({
  id: "lab-d65",
  name: "Lab D65",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D65, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: white$1,
  base: xyz_d65,
  // Convert D65-adapted XYZ to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(XYZ) {
    let xyz = XYZ.map((value, i) => value / white$1[i]);
    let f = xyz.map((value) => value > \u03B5$3 ? Math.cbrt(value) : (\u03BA$2 * value + 16) / 116);
    return [
      116 * f[1] - 16,
      // L
      500 * (f[0] - f[1]),
      // a
      200 * (f[1] - f[2])
      // b
    ];
  },
  // Convert Lab to D65-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(Lab) {
    let f = [];
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    let xyz = [
      f[0] > \u03B53 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA$2,
      Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA$2,
      f[2] > \u03B53 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA$2
    ];
    return xyz.map((value, i) => value * white$1[i]);
  },
  formats: {
    "lab-d65": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var phi = Math.pow(5, 0.5) * 0.5 + 0.5;
function contrastDeltaPhi(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Lstr1 = get(color1, [lab_d65, "l"]);
  let Lstr2 = get(color2, [lab_d65, "l"]);
  let deltaPhiStar = Math.abs(Math.pow(Lstr1, phi) - Math.pow(Lstr2, phi));
  let contrast2 = Math.pow(deltaPhiStar, 1 / phi) * Math.SQRT2 - 40;
  return contrast2 < 7.5 ? 0 : contrast2;
}
var contrastMethods = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  contrastAPCA,
  contrastDeltaPhi,
  contrastLstar,
  contrastMichelson,
  contrastWCAG21,
  contrastWeber
});
function contrast(background, foreground, o = {}) {
  if (isString(o)) {
    o = { algorithm: o };
  }
  let { algorithm, ...rest } = o;
  if (!algorithm) {
    let algorithms = Object.keys(contrastMethods).map((a2) => a2.replace(/^contrast/, "")).join(", ");
    throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${algorithms}`);
  }
  background = getColor(background);
  foreground = getColor(foreground);
  for (let a2 in contrastMethods) {
    if ("contrast" + algorithm.toLowerCase() === a2.toLowerCase()) {
      return contrastMethods[a2](background, foreground, rest);
    }
  }
  throw new TypeError(`Unknown contrast algorithm: ${algorithm}`);
}
function uv(color) {
  let [X, Y, Z] = getAll(color, xyz_d65);
  let denom = X + 15 * Y + 3 * Z;
  return [4 * X / denom, 9 * Y / denom];
}
function xy(color) {
  let [X, Y, Z] = getAll(color, xyz_d65);
  let sum5 = X + Y + Z;
  return [X / sum5, Y / sum5];
}
function register$1(Color2) {
  Object.defineProperty(Color2.prototype, "uv", {
    get() {
      return uv(this);
    }
  });
  Object.defineProperty(Color2.prototype, "xy", {
    get() {
      return xy(this);
    }
  });
}
var chromaticity = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  register: register$1,
  uv,
  xy
});
function deltaE(c12, c22, o = {}) {
  if (isString(o)) {
    o = { method: o };
  }
  let { method = defaults.deltaE, ...rest } = o;
  for (let m3 in deltaEMethods) {
    if ("deltae" + method.toLowerCase() === m3.toLowerCase()) {
      return deltaEMethods[m3](c12, c22, rest);
    }
  }
  throw new TypeError(`Unknown deltaE method: ${method}`);
}
function lighten(color, amount = 0.25) {
  let space = ColorSpace.get("oklch", "lch");
  let lightness = [space, "l"];
  return set(color, lightness, (l) => l * (1 + amount));
}
function darken(color, amount = 0.25) {
  let space = ColorSpace.get("oklch", "lch");
  let lightness = [space, "l"];
  return set(color, lightness, (l) => l * (1 - amount));
}
var variations = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  darken,
  lighten
});
function mix(c12, c22, p2 = 0.5, o = {}) {
  [c12, c22] = [getColor(c12), getColor(c22)];
  if (type(p2) === "object") {
    [p2, o] = [0.5, p2];
  }
  let r = range(c12, c22, o);
  return r(p2);
}
function steps(c12, c22, options = {}) {
  let colorRange;
  if (isRange(c12)) {
    [colorRange, options] = [c12, c22];
    [c12, c22] = colorRange.rangeArgs.colors;
  }
  let {
    maxDeltaE,
    deltaEMethod,
    steps: steps2 = 2,
    maxSteps = 1e3,
    ...rangeOptions
  } = options;
  if (!colorRange) {
    [c12, c22] = [getColor(c12), getColor(c22)];
    colorRange = range(c12, c22, rangeOptions);
  }
  let totalDelta = deltaE(c12, c22);
  let actualSteps = maxDeltaE > 0 ? Math.max(steps2, Math.ceil(totalDelta / maxDeltaE) + 1) : steps2;
  let ret = [];
  if (maxSteps !== void 0) {
    actualSteps = Math.min(actualSteps, maxSteps);
  }
  if (actualSteps === 1) {
    ret = [{ p: 0.5, color: colorRange(0.5) }];
  } else {
    let step = 1 / (actualSteps - 1);
    ret = Array.from({ length: actualSteps }, (_, i) => {
      let p2 = i * step;
      return { p: p2, color: colorRange(p2) };
    });
  }
  if (maxDeltaE > 0) {
    let maxDelta = ret.reduce((acc, cur, i) => {
      if (i === 0) {
        return 0;
      }
      let \u0394\u0395 = deltaE(cur.color, ret[i - 1].color, deltaEMethod);
      return Math.max(acc, \u0394\u0395);
    }, 0);
    while (maxDelta > maxDeltaE) {
      maxDelta = 0;
      for (let i = 1; i < ret.length && ret.length < maxSteps; i++) {
        let prev = ret[i - 1];
        let cur = ret[i];
        let p2 = (cur.p + prev.p) / 2;
        let color = colorRange(p2);
        maxDelta = Math.max(maxDelta, deltaE(color, prev.color), deltaE(color, cur.color));
        ret.splice(i, 0, { p: p2, color: colorRange(p2) });
        i++;
      }
    }
  }
  ret = ret.map((a2) => a2.color);
  return ret;
}
function range(color1, color2, options = {}) {
  if (isRange(color1)) {
    let [r, options2] = [color1, color2];
    return range(...r.rangeArgs.colors, { ...r.rangeArgs.options, ...options2 });
  }
  let { space, outputSpace, progression, premultiplied } = options;
  color1 = getColor(color1);
  color2 = getColor(color2);
  color1 = clone(color1);
  color2 = clone(color2);
  let rangeArgs = { colors: [color1, color2], options };
  if (space) {
    space = ColorSpace.get(space);
  } else {
    space = ColorSpace.registry[defaults.interpolationSpace] || color1.space;
  }
  outputSpace = outputSpace ? ColorSpace.get(outputSpace) : space;
  color1 = to(color1, space);
  color2 = to(color2, space);
  color1 = toGamut(color1);
  color2 = toGamut(color2);
  if (space.coords.h && space.coords.h.type === "angle") {
    let arc = options.hue = options.hue || "shorter";
    let hue = [space, "h"];
    let [\u03B81, \u03B82] = [get(color1, hue), get(color2, hue)];
    if (isNaN(\u03B81) && !isNaN(\u03B82)) {
      \u03B81 = \u03B82;
    } else if (isNaN(\u03B82) && !isNaN(\u03B81)) {
      \u03B82 = \u03B81;
    }
    [\u03B81, \u03B82] = adjust(arc, [\u03B81, \u03B82]);
    set(color1, hue, \u03B81);
    set(color2, hue, \u03B82);
  }
  if (premultiplied) {
    color1.coords = color1.coords.map((c4) => c4 * color1.alpha);
    color2.coords = color2.coords.map((c4) => c4 * color2.alpha);
  }
  return Object.assign((p2) => {
    p2 = progression ? progression(p2) : p2;
    let coords = color1.coords.map((start, i) => {
      let end = color2.coords[i];
      return interpolate6(start, end, p2);
    });
    let alpha = interpolate6(color1.alpha, color2.alpha, p2);
    let ret = { space, coords, alpha };
    if (premultiplied) {
      ret.coords = ret.coords.map((c4) => c4 / alpha);
    }
    if (outputSpace !== space) {
      ret = to(ret, outputSpace);
    }
    return ret;
  }, {
    rangeArgs
  });
}
function isRange(val) {
  return type(val) === "function" && !!val.rangeArgs;
}
defaults.interpolationSpace = "lab";
function register(Color2) {
  Color2.defineFunction("mix", mix, { returns: "color" });
  Color2.defineFunction("range", range, { returns: "function<color>" });
  Color2.defineFunction("steps", steps, { returns: "array<color>" });
}
var interpolation = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  isRange,
  mix,
  range,
  register,
  steps
});
var HSL = new ColorSpace({
  id: "hsl",
  name: "HSL",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: sRGB,
  // Adapted from https://drafts.csswg.org/css-color-4/better-rgbToHsl.js
  fromBase: (rgb) => {
    let max22 = Math.max(...rgb);
    let min2 = Math.min(...rgb);
    let [r, g2, b2] = rgb;
    let [h, s, l] = [NaN, 0, (min2 + max22) / 2];
    let d2 = max22 - min2;
    if (d2 !== 0) {
      s = l === 0 || l === 1 ? 0 : (max22 - l) / Math.min(l, 1 - l);
      switch (max22) {
        case r:
          h = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h = (b2 - r) / d2 + 2;
          break;
        case b2:
          h = (r - g2) / d2 + 4;
      }
      h = h * 60;
    }
    if (s < 0) {
      h += 180;
      s = Math.abs(s);
    }
    if (h >= 360) {
      h -= 360;
    }
    return [h, s * 100, l * 100];
  },
  // Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
  toBase: (hsl) => {
    let [h, s, l] = hsl;
    h = h % 360;
    if (h < 0) {
      h += 360;
    }
    s /= 100;
    l /= 100;
    function f(n2) {
      let k = (n2 + h / 30) % 12;
      let a2 = s * Math.min(l, 1 - l);
      return l - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    }
    return [f(0), f(8), f(4)];
  },
  formats: {
    "hsl": {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"]
    },
    "hsla": {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
      commas: true,
      lastAlpha: true
    }
  }
});
var HSV = new ColorSpace({
  id: "hsv",
  name: "HSV",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    v: {
      range: [0, 100],
      name: "Value"
    }
  },
  base: HSL,
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  fromBase(hsl) {
    let [h, s, l] = hsl;
    s /= 100;
    l /= 100;
    let v = l + s * Math.min(l, 1 - l);
    return [
      h,
      // h is the same
      v === 0 ? 0 : 200 * (1 - l / v),
      // s
      100 * v
    ];
  },
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  toBase(hsv) {
    let [h, s, v] = hsv;
    s /= 100;
    v /= 100;
    let l = v * (1 - s / 2);
    return [
      h,
      // h is the same
      l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l) * 100,
      l * 100
    ];
  },
  formats: {
    color: {
      id: "--hsv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var hwb = new ColorSpace({
  id: "hwb",
  name: "HWB",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    w: {
      range: [0, 100],
      name: "Whiteness"
    },
    b: {
      range: [0, 100],
      name: "Blackness"
    }
  },
  base: HSV,
  fromBase(hsv) {
    let [h, s, v] = hsv;
    return [h, v * (100 - s) / 100, 100 - v];
  },
  toBase(hwb2) {
    let [h, w, b2] = hwb2;
    w /= 100;
    b2 /= 100;
    let sum5 = w + b2;
    if (sum5 >= 1) {
      let gray = w / sum5;
      return [h, 0, gray * 100];
    }
    let v = 1 - b2;
    let s = v === 0 ? 0 : 1 - w / v;
    return [h, s * 100, v * 100];
  },
  formats: {
    "hwb": {
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var toXYZ_M$2 = [
  [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
  [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
  [0.02703136138641234, 0.07068885253582723, 0.9913375368376388]
];
var fromXYZ_M$2 = [
  [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
  [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
  [0.013444280632031142, -0.11836239223101838, 1.0151749943912054]
];
var A98Linear = new RGBColorSpace({
  id: "a98rgb-linear",
  cssId: "--a98-rgb-linear",
  name: "Linear Adobe\xAE 98 RGB compatible",
  white: "D65",
  toXYZ_M: toXYZ_M$2,
  fromXYZ_M: fromXYZ_M$2
});
var a98rgb = new RGBColorSpace({
  id: "a98rgb",
  cssId: "a98-rgb",
  name: "Adobe\xAE 98 RGB compatible",
  base: A98Linear,
  toBase: (RGB) => RGB.map((val) => Math.pow(Math.abs(val), 563 / 256) * Math.sign(val)),
  fromBase: (RGB) => RGB.map((val) => Math.pow(Math.abs(val), 256 / 563) * Math.sign(val))
});
var toXYZ_M$1 = [
  [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
  [0.2880748288194013, 0.711835234241873, 8993693872564e-17],
  [0, 0, 0.8251046025104602]
];
var fromXYZ_M$1 = [
  [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
  [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
  [0, 0, 1.2119675456389452]
];
var ProPhotoLinear = new RGBColorSpace({
  id: "prophoto-linear",
  cssId: "--prophoto-rgb-linear",
  name: "Linear ProPhoto",
  white: "D50",
  base: XYZ_D50,
  toXYZ_M: toXYZ_M$1,
  fromXYZ_M: fromXYZ_M$1
});
var Et = 1 / 512;
var Et2 = 16 / 512;
var prophoto = new RGBColorSpace({
  id: "prophoto",
  cssId: "prophoto-rgb",
  name: "ProPhoto",
  base: ProPhotoLinear,
  toBase(RGB) {
    return RGB.map((v) => v < Et2 ? v / 16 : v ** 1.8);
  },
  fromBase(RGB) {
    return RGB.map((v) => v >= Et ? v ** (1 / 1.8) : 16 * v);
  }
});
var oklch = new ColorSpace({
  id: "oklch",
  name: "Oklch",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    c: {
      refRange: [0, 0.4],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  white: "D65",
  base: OKLab,
  fromBase(oklab) {
    let [L, a2, b2] = oklab;
    let h;
    const \u03B52 = 2e-4;
    if (Math.abs(a2) < \u03B52 && Math.abs(b2) < \u03B52) {
      h = NaN;
    } else {
      h = Math.atan2(b2, a2) * 180 / Math.PI;
    }
    return [
      L,
      // OKLab L is still L
      Math.sqrt(a2 ** 2 + b2 ** 2),
      // Chroma
      constrain(h)
      // Hue, in degrees [0 to 360)
    ];
  },
  // Convert from polar form
  toBase(oklch2) {
    let [L, C, h] = oklch2;
    let a2, b2;
    if (isNaN(h)) {
      a2 = 0;
      b2 = 0;
    } else {
      a2 = C * Math.cos(h * Math.PI / 180);
      b2 = C * Math.sin(h * Math.PI / 180);
    }
    return [L, a2, b2];
  },
  formats: {
    "oklch": {
      coords: ["<percentage> | <number>", "<number> | <percentage>[0,1]", "<number> | <angle>"]
    }
  }
});
var white = WHITES.D65;
var \u03B5$2 = 216 / 24389;
var \u03BA$1 = 24389 / 27;
var [U_PRIME_WHITE, V_PRIME_WHITE] = uv({ space: xyz_d65, coords: white });
var Luv = new ColorSpace({
  id: "luv",
  name: "Luv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    // Reference ranges from https://facelessuser.github.io/coloraide/colors/luv/
    u: {
      refRange: [-215, 215]
    },
    v: {
      refRange: [-215, 215]
    }
  },
  white,
  base: xyz_d65,
  // Convert D65-adapted XYZ to Luv
  // https://en.wikipedia.org/wiki/CIELUV#The_forward_transformation
  fromBase(XYZ) {
    let xyz = [skipNone(XYZ[0]), skipNone(XYZ[1]), skipNone(XYZ[2])];
    let y = xyz[1];
    let [up, vp] = uv({ space: xyz_d65, coords: xyz });
    if (!Number.isFinite(up) || !Number.isFinite(vp)) {
      return [0, 0, 0];
    }
    let L = y <= \u03B5$2 ? \u03BA$1 * y : 116 * Math.cbrt(y) - 16;
    return [
      L,
      13 * L * (up - U_PRIME_WHITE),
      13 * L * (vp - V_PRIME_WHITE)
    ];
  },
  // Convert Luv to D65-adapted XYZ
  // https://en.wikipedia.org/wiki/CIELUV#The_reverse_transformation
  toBase(Luv2) {
    let [L, u, v] = Luv2;
    if (L === 0 || isNone(L)) {
      return [0, 0, 0];
    }
    u = skipNone(u);
    v = skipNone(v);
    let up = u / (13 * L) + U_PRIME_WHITE;
    let vp = v / (13 * L) + V_PRIME_WHITE;
    let y = L <= 8 ? L / \u03BA$1 : Math.pow((L + 16) / 116, 3);
    return [
      y * (9 * up / (4 * vp)),
      y,
      y * ((12 - 3 * up - 20 * vp) / (4 * vp))
    ];
  },
  formats: {
    color: {
      id: "--luv",
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var LCHuv = new ColorSpace({
  id: "lchuv",
  name: "LChuv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 220],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Luv,
  fromBase(Luv2) {
    let [L, u, v] = Luv2;
    let hue;
    const \u03B52 = 0.02;
    if (Math.abs(u) < \u03B52 && Math.abs(v) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(v, u) * 180 / Math.PI;
    }
    return [
      L,
      // L is still L
      Math.sqrt(u ** 2 + v ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(LCH) {
    let [Lightness, Chroma, Hue] = LCH;
    if (Chroma < 0) {
      Chroma = 0;
    }
    if (isNaN(Hue)) {
      Hue = 0;
    }
    return [
      Lightness,
      // L is still L
      Chroma * Math.cos(Hue * Math.PI / 180),
      // u
      Chroma * Math.sin(Hue * Math.PI / 180)
      // v
    ];
  },
  formats: {
    color: {
      id: "--lchuv",
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
var \u03B5$1 = 216 / 24389;
var \u03BA = 24389 / 27;
var m_r0 = fromXYZ_M$3[0][0];
var m_r1 = fromXYZ_M$3[0][1];
var m_r2 = fromXYZ_M$3[0][2];
var m_g0 = fromXYZ_M$3[1][0];
var m_g1 = fromXYZ_M$3[1][1];
var m_g2 = fromXYZ_M$3[1][2];
var m_b0 = fromXYZ_M$3[2][0];
var m_b1 = fromXYZ_M$3[2][1];
var m_b2 = fromXYZ_M$3[2][2];
function distanceFromOriginAngle(slope2, intercept, angle) {
  const d2 = intercept / (Math.sin(angle) - slope2 * Math.cos(angle));
  return d2 < 0 ? Infinity : d2;
}
function calculateBoundingLines(l) {
  const sub1 = Math.pow(l + 16, 3) / 1560896;
  const sub2 = sub1 > \u03B5$1 ? sub1 : l / \u03BA;
  const s1r = sub2 * (284517 * m_r0 - 94839 * m_r2);
  const s2r = sub2 * (838422 * m_r2 + 769860 * m_r1 + 731718 * m_r0);
  const s3r = sub2 * (632260 * m_r2 - 126452 * m_r1);
  const s1g = sub2 * (284517 * m_g0 - 94839 * m_g2);
  const s2g = sub2 * (838422 * m_g2 + 769860 * m_g1 + 731718 * m_g0);
  const s3g = sub2 * (632260 * m_g2 - 126452 * m_g1);
  const s1b = sub2 * (284517 * m_b0 - 94839 * m_b2);
  const s2b = sub2 * (838422 * m_b2 + 769860 * m_b1 + 731718 * m_b0);
  const s3b = sub2 * (632260 * m_b2 - 126452 * m_b1);
  return {
    r0s: s1r / s3r,
    r0i: s2r * l / s3r,
    r1s: s1r / (s3r + 126452),
    r1i: (s2r - 769860) * l / (s3r + 126452),
    g0s: s1g / s3g,
    g0i: s2g * l / s3g,
    g1s: s1g / (s3g + 126452),
    g1i: (s2g - 769860) * l / (s3g + 126452),
    b0s: s1b / s3b,
    b0i: s2b * l / s3b,
    b1s: s1b / (s3b + 126452),
    b1i: (s2b - 769860) * l / (s3b + 126452)
  };
}
function calcMaxChromaHsluv(lines, h) {
  const hueRad = h / 360 * Math.PI * 2;
  const r0 = distanceFromOriginAngle(lines.r0s, lines.r0i, hueRad);
  const r1 = distanceFromOriginAngle(lines.r1s, lines.r1i, hueRad);
  const g0 = distanceFromOriginAngle(lines.g0s, lines.g0i, hueRad);
  const g1 = distanceFromOriginAngle(lines.g1s, lines.g1i, hueRad);
  const b0 = distanceFromOriginAngle(lines.b0s, lines.b0i, hueRad);
  const b1 = distanceFromOriginAngle(lines.b1s, lines.b1i, hueRad);
  return Math.min(r0, r1, g0, g1, b0, b1);
}
var hsluv = new ColorSpace({
  id: "hsluv",
  name: "HSLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: LCHuv,
  gamutSpace: sRGB,
  // Convert LCHuv to HSLuv
  fromBase(lch2) {
    let [l, c4, h] = [skipNone(lch2[0]), skipNone(lch2[1]), skipNone(lch2[2])];
    let s;
    if (l > 99.9999999) {
      s = 0;
      l = 100;
    } else if (l < 1e-8) {
      s = 0;
      l = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max22 = calcMaxChromaHsluv(lines, h);
      s = c4 / max22 * 100;
    }
    return [h, s, l];
  },
  // Convert HSLuv to LCHuv
  toBase(hsl) {
    let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
    let c4;
    if (l > 99.9999999) {
      l = 100;
      c4 = 0;
    } else if (l < 1e-8) {
      l = 0;
      c4 = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max22 = calcMaxChromaHsluv(lines, h);
      c4 = max22 / 100 * s;
    }
    return [l, c4, h];
  },
  formats: {
    color: {
      id: "--hsluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
fromXYZ_M$3[0][0];
fromXYZ_M$3[0][1];
fromXYZ_M$3[0][2];
fromXYZ_M$3[1][0];
fromXYZ_M$3[1][1];
fromXYZ_M$3[1][2];
fromXYZ_M$3[2][0];
fromXYZ_M$3[2][1];
fromXYZ_M$3[2][2];
function distanceFromOrigin(slope2, intercept) {
  return Math.abs(intercept) / Math.sqrt(Math.pow(slope2, 2) + 1);
}
function calcMaxChromaHpluv(lines) {
  let r0 = distanceFromOrigin(lines.r0s, lines.r0i);
  let r1 = distanceFromOrigin(lines.r1s, lines.r1i);
  let g0 = distanceFromOrigin(lines.g0s, lines.g0i);
  let g1 = distanceFromOrigin(lines.g1s, lines.g1i);
  let b0 = distanceFromOrigin(lines.b0s, lines.b0i);
  let b1 = distanceFromOrigin(lines.b1s, lines.b1i);
  return Math.min(r0, r1, g0, g1, b0, b1);
}
var hpluv = new ColorSpace({
  id: "hpluv",
  name: "HPLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: LCHuv,
  gamutSpace: "self",
  // Convert LCHuv to HPLuv
  fromBase(lch2) {
    let [l, c4, h] = [skipNone(lch2[0]), skipNone(lch2[1]), skipNone(lch2[2])];
    let s;
    if (l > 99.9999999) {
      s = 0;
      l = 100;
    } else if (l < 1e-8) {
      s = 0;
      l = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max22 = calcMaxChromaHpluv(lines);
      s = c4 / max22 * 100;
    }
    return [h, s, l];
  },
  // Convert HPLuv to LCHuv
  toBase(hsl) {
    let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
    let c4;
    if (l > 99.9999999) {
      l = 100;
      c4 = 0;
    } else if (l < 1e-8) {
      l = 0;
      c4 = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max22 = calcMaxChromaHpluv(lines);
      c4 = max22 / 100 * s;
    }
    return [l, c4, h];
  },
  formats: {
    color: {
      id: "--hpluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var Yw = 203;
var n = 2610 / 2 ** 14;
var ninv = 2 ** 14 / 2610;
var m = 2523 / 2 ** 5;
var minv = 2 ** 5 / 2523;
var c1 = 3424 / 2 ** 12;
var c2 = 2413 / 2 ** 7;
var c3 = 2392 / 2 ** 7;
var rec2100Pq = new RGBColorSpace({
  id: "rec2100pq",
  cssId: "rec2100-pq",
  name: "REC.2100-PQ",
  base: REC2020Linear,
  toBase(RGB) {
    return RGB.map(function(val) {
      let x = (Math.max(val ** minv - c1, 0) / (c2 - c3 * val ** minv)) ** ninv;
      return x * 1e4 / Yw;
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      let x = Math.max(val * Yw / 1e4, 0);
      let num = c1 + c2 * x ** n;
      let denom = 1 + c3 * x ** n;
      return (num / denom) ** m;
    });
  }
});
var a = 0.17883277;
var b = 0.28466892;
var c = 0.55991073;
var scale2 = 3.7743;
var rec2100Hlg = new RGBColorSpace({
  id: "rec2100hlg",
  cssId: "rec2100-hlg",
  name: "REC.2100-HLG",
  referred: "scene",
  base: REC2020Linear,
  toBase(RGB) {
    return RGB.map(function(val) {
      if (val <= 0.5) {
        return val ** 2 / 3 * scale2;
      }
      return (Math.exp((val - c) / a) + b) / 12 * scale2;
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      val /= scale2;
      if (val <= 1 / 12) {
        return Math.sqrt(3 * val);
      }
      return a * Math.log(12 * val - b) + c;
    });
  }
});
var CATs = {};
hooks.add("chromatic-adaptation-start", (env) => {
  if (env.options.method) {
    env.M = adapt(env.W1, env.W2, env.options.method);
  }
});
hooks.add("chromatic-adaptation-end", (env) => {
  if (!env.M) {
    env.M = adapt(env.W1, env.W2, env.options.method);
  }
});
function defineCAT({ id, toCone_M, fromCone_M }) {
  CATs[id] = arguments[0];
}
function adapt(W1, W2, id = "Bradford") {
  let method = CATs[id];
  let [\u03C1s, \u03B3s, \u03B2s] = multiplyMatrices(method.toCone_M, W1);
  let [\u03C1d, \u03B3d, \u03B2d] = multiplyMatrices(method.toCone_M, W2);
  let scale4 = [
    [\u03C1d / \u03C1s, 0, 0],
    [0, \u03B3d / \u03B3s, 0],
    [0, 0, \u03B2d / \u03B2s]
  ];
  let scaled_cone_M = multiplyMatrices(scale4, method.toCone_M);
  let adapt_M = multiplyMatrices(method.fromCone_M, scaled_cone_M);
  return adapt_M;
}
defineCAT({
  id: "von Kries",
  toCone_M: [
    [0.40024, 0.7076, -0.08081],
    [-0.2263, 1.16532, 0.0457],
    [0, 0, 0.91822]
  ],
  fromCone_M: [
    [1.8599363874558397, -1.1293816185800916, 0.21989740959619328],
    [0.3611914362417676, 0.6388124632850422, -6370596838649899e-21],
    [0, 0, 1.0890636230968613]
  ]
});
defineCAT({
  id: "Bradford",
  // Convert an array of XYZ values in the range 0.0 - 1.0
  // to cone fundamentals
  toCone_M: [
    [0.8951, 0.2664, -0.1614],
    [-0.7502, 1.7135, 0.0367],
    [0.0389, -0.0685, 1.0296]
  ],
  // and back
  fromCone_M: [
    [0.9869929054667121, -0.14705425642099013, 0.15996265166373122],
    [0.4323052697233945, 0.5183602715367774, 0.049291228212855594],
    [-0.00852866457517732, 0.04004282165408486, 0.96848669578755]
  ]
});
defineCAT({
  id: "CAT02",
  // with complete chromatic adaptation to W2, so D = 1.0
  toCone_M: [
    [0.7328, 0.4296, -0.1624],
    [-0.7036, 1.6975, 61e-4],
    [3e-3, 0.0136, 0.9834]
  ],
  fromCone_M: [
    [1.0961238208355142, -0.27886900021828726, 0.18274517938277307],
    [0.4543690419753592, 0.4735331543074117, 0.07209780371722911],
    [-0.009627608738429355, -0.00569803121611342, 1.0153256399545427]
  ]
});
defineCAT({
  id: "CAT16",
  toCone_M: [
    [0.401288, 0.650173, -0.051461],
    [-0.250268, 1.204414, 0.045854],
    [-2079e-6, 0.048952, 0.953127]
  ],
  // the extra precision is needed to avoid roundtripping errors
  fromCone_M: [
    [1.862067855087233, -1.0112546305316845, 0.14918677544445172],
    [0.3875265432361372, 0.6214474419314753, -0.008973985167612521],
    [-0.01584149884933386, -0.03412293802851557, 1.0499644368778496]
  ]
});
Object.assign(WHITES, {
  // whitepoint values from ASTM E308-01 with 10nm spacing, 1931 2 degree observer
  // all normalized to Y (luminance) = 1.00000
  // Illuminant A is a tungsten electric light, giving a very warm, orange light.
  A: [1.0985, 1, 0.35585],
  // Illuminant C was an early approximation to daylight: illuminant A with a blue filter.
  C: [0.98074, 1, 1.18232],
  // The daylight series of illuminants simulate natural daylight.
  // The color temperature (in degrees Kelvin/100) ranges from
  // cool, overcast daylight (D50) to bright, direct sunlight (D65).
  D55: [0.95682, 1, 0.92149],
  D75: [0.94972, 1, 1.22638],
  // Equal-energy illuminant, used in two-stage CAT16
  E: [1, 1, 1],
  // The F series of illuminants represent fluorescent lights
  F2: [0.99186, 1, 0.67393],
  F7: [0.95041, 1, 1.08747],
  F11: [1.00962, 1, 0.6435]
});
WHITES.ACES = [0.32168 / 0.33767, 1, (1 - 0.32168 - 0.33767) / 0.33767];
var toXYZ_M = [
  [0.6624541811085053, 0.13400420645643313, 0.1561876870049078],
  [0.27222871678091454, 0.6740817658111484, 0.05368951740793705],
  [-0.005574649490394108, 0.004060733528982826, 1.0103391003129971]
];
var fromXYZ_M = [
  [1.6410233796943257, -0.32480329418479, -0.23642469523761225],
  [-0.6636628587229829, 1.6153315916573379, 0.016756347685530137],
  [0.011721894328375376, -0.008284441996237409, 0.9883948585390215]
];
var ACEScg = new RGBColorSpace({
  id: "acescg",
  cssId: "--acescg",
  name: "ACEScg",
  // ACEScg – A scene-referred, linear-light encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescg/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  coords: {
    r: {
      range: [0, 65504],
      name: "Red"
    },
    g: {
      range: [0, 65504],
      name: "Green"
    },
    b: {
      range: [0, 65504],
      name: "Blue"
    }
  },
  referred: "scene",
  white: WHITES.ACES,
  toXYZ_M,
  fromXYZ_M
});
var \u03B5 = 2 ** -16;
var ACES_min_nonzero = -0.35828683;
var ACES_cc_max = (Math.log2(65504) + 9.72) / 17.52;
var acescc = new RGBColorSpace({
  id: "acescc",
  cssId: "--acescc",
  name: "ACEScc",
  // see S-2014-003 ACEScc – A Logarithmic Encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescc/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  // Appendix A: "Very small ACES scene referred values below 7 1/4 stops
  // below 18% middle gray are encoded as negative ACEScc values.
  // These values should be preserved per the encoding in Section 4.4
  // so that all positive ACES values are maintained."
  coords: {
    r: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Red"
    },
    g: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Green"
    },
    b: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Blue"
    }
  },
  referred: "scene",
  base: ACEScg,
  // from section 4.4.2 Decoding Function
  toBase(RGB) {
    const low = (9.72 - 15) / 17.52;
    return RGB.map(function(val) {
      if (val <= low) {
        return (2 ** (val * 17.52 - 9.72) - \u03B5) * 2;
      } else if (val < ACES_cc_max) {
        return 2 ** (val * 17.52 - 9.72);
      } else {
        return 65504;
      }
    });
  },
  // Non-linear encoding function from S-2014-003, section 4.4.1 Encoding Function
  fromBase(RGB) {
    return RGB.map(function(val) {
      if (val <= 0) {
        return (Math.log2(\u03B5) + 9.72) / 17.52;
      } else if (val < \u03B5) {
        return (Math.log2(\u03B5 + val * 0.5) + 9.72) / 17.52;
      } else {
        return (Math.log2(val) + 9.72) / 17.52;
      }
    });
  }
  // encoded media white (rgb 1,1,1) => linear  [ 222.861, 222.861, 222.861 ]
  // encoded media black (rgb 0,0,0) => linear [ 0.0011857, 0.0011857, 0.0011857]
});
var spaces = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  A98RGB: a98rgb,
  A98RGB_Linear: A98Linear,
  ACEScc: acescc,
  ACEScg,
  CAM16_JMh: cam16,
  HCT: hct,
  HPLuv: hpluv,
  HSL,
  HSLuv: hsluv,
  HSV,
  HWB: hwb,
  ICTCP: ictcp,
  JzCzHz: jzczhz,
  Jzazbz,
  LCH: lch,
  LCHuv,
  Lab: lab,
  Lab_D65: lab_d65,
  Luv,
  OKLCH: oklch,
  OKLab,
  P3,
  P3_Linear: P3Linear,
  ProPhoto: prophoto,
  ProPhoto_Linear: ProPhotoLinear,
  REC_2020: REC2020,
  REC_2020_Linear: REC2020Linear,
  REC_2100_HLG: rec2100Hlg,
  REC_2100_PQ: rec2100Pq,
  XYZ_ABS_D65: XYZ_Abs_D65,
  XYZ_D50,
  XYZ_D65: xyz_d65,
  sRGB,
  sRGB_Linear: sRGBLinear
});
var Color = class _Color {
  /**
   * Creates an instance of Color.
   * Signatures:
   * - `new Color(stringToParse)`
   * - `new Color(otherColor)`
   * - `new Color({space, coords, alpha})`
   * - `new Color(space, coords, alpha)`
   * - `new Color(spaceId, coords, alpha)`
   */
  constructor(...args) {
    let color;
    if (args.length === 1) {
      color = getColor(args[0]);
    }
    let space, coords, alpha;
    if (color) {
      space = color.space || color.spaceId;
      coords = color.coords;
      alpha = color.alpha;
    } else {
      [space, coords, alpha] = args;
    }
    Object.defineProperty(this, "space", {
      value: ColorSpace.get(space),
      writable: false,
      enumerable: true,
      configurable: true
      // see note in https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
    });
    this.coords = coords ? coords.slice() : [0, 0, 0];
    this.alpha = alpha > 1 || alpha === void 0 ? 1 : alpha < 0 ? 0 : alpha;
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i] === "NaN") {
        this.coords[i] = NaN;
      }
    }
    for (let id in this.space.coords) {
      Object.defineProperty(this, id, {
        get: () => this.get(id),
        set: (value) => this.set(id, value)
      });
    }
  }
  get spaceId() {
    return this.space.id;
  }
  clone() {
    return new _Color(this.space, this.coords, this.alpha);
  }
  toJSON() {
    return {
      spaceId: this.spaceId,
      coords: this.coords,
      alpha: this.alpha
    };
  }
  display(...args) {
    let ret = display(this, ...args);
    ret.color = new _Color(ret.color);
    return ret;
  }
  /**
   * Get a color from the argument passed
   * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
   */
  static get(color, ...args) {
    if (color instanceof _Color) {
      return color;
    }
    return new _Color(color, ...args);
  }
  static defineFunction(name2, code, o = code) {
    let { instance = true, returns } = o;
    let func = function(...args) {
      let ret = code(...args);
      if (returns === "color") {
        ret = _Color.get(ret);
      } else if (returns === "function<color>") {
        let f = ret;
        ret = function(...args2) {
          let ret2 = f(...args2);
          return _Color.get(ret2);
        };
        Object.assign(ret, f);
      } else if (returns === "array<color>") {
        ret = ret.map((c4) => _Color.get(c4));
      }
      return ret;
    };
    if (!(name2 in _Color)) {
      _Color[name2] = func;
    }
    if (instance) {
      _Color.prototype[name2] = function(...args) {
        return func(this, ...args);
      };
    }
  }
  static defineFunctions(o) {
    for (let name2 in o) {
      _Color.defineFunction(name2, o[name2], o[name2]);
    }
  }
  static extend(exports) {
    if (exports.register) {
      exports.register(_Color);
    } else {
      for (let name2 in exports) {
        _Color.defineFunction(name2, exports[name2]);
      }
    }
  }
};
Color.defineFunctions({
  get,
  getAll,
  set,
  setAll,
  to,
  equals,
  inGamut,
  toGamut,
  distance: distance3,
  toString: serialize
});
Object.assign(Color, {
  util,
  hooks,
  WHITES,
  Space: ColorSpace,
  spaces: ColorSpace.registry,
  parse,
  // Global defaults one may want to configure
  defaults
});
for (let key of Object.keys(spaces)) {
  ColorSpace.register(spaces[key]);
}
for (let id in ColorSpace.registry) {
  addSpaceAccessors(id, ColorSpace.registry[id]);
}
hooks.add("colorspace-init-end", (space) => {
  addSpaceAccessors(space.id, space);
  space.aliases?.forEach((alias) => {
    addSpaceAccessors(alias, space);
  });
});
function addSpaceAccessors(id, space) {
  let propId = id.replace(/-/g, "_");
  Object.defineProperty(Color.prototype, propId, {
    // Convert coords to coords in another colorspace and return them
    // Source colorspace: this.spaceId
    // Target colorspace: id
    get() {
      let ret = this.getAll(id);
      if (typeof Proxy === "undefined") {
        return ret;
      }
      return new Proxy(ret, {
        has: (obj, property) => {
          try {
            ColorSpace.resolveCoord([space, property]);
            return true;
          } catch (e) {
          }
          return Reflect.has(obj, property);
        },
        get: (obj, property, receiver) => {
          if (property && typeof property !== "symbol" && !(property in obj)) {
            let { index } = ColorSpace.resolveCoord([space, property]);
            if (index >= 0) {
              return obj[index];
            }
          }
          return Reflect.get(obj, property, receiver);
        },
        set: (obj, property, value, receiver) => {
          if (property && typeof property !== "symbol" && !(property in obj) || property >= 0) {
            let { index } = ColorSpace.resolveCoord([space, property]);
            if (index >= 0) {
              obj[index] = value;
              this.setAll(id, obj);
              return true;
            }
          }
          return Reflect.set(obj, property, value, receiver);
        }
      });
    },
    // Convert coords in another colorspace to internal coords and set them
    // Target colorspace: this.spaceId
    // Source colorspace: id
    set(coords) {
      this.setAll(id, coords);
    },
    configurable: true,
    enumerable: true
  });
}
Color.extend(deltaEMethods);
Color.extend({ deltaE });
Object.assign(Color, { deltaEMethods });
Color.extend(variations);
Color.extend({ contrast });
Color.extend(chromaticity);
Color.extend(luminance);
Color.extend(interpolation);
Color.extend(contrastMethods);
var toHsl = (colour, safe = false) => {
  if (typeof colour === `string` && colour === `transparent`) return { h: 0, s: 0, l: 0, opacity: 0, space: `hsl` };
  const c4 = resolve(colour);
  const hsl = c4.hsl;
  let hue = hsl[0];
  if (Number.isNaN(hue) && safe) hue = 0;
  let sat = hsl[1];
  if (Number.isNaN(sat) && safe) sat = 0;
  const parsedHsl = {
    h: hue / 360,
    s: sat / 100,
    l: hsl[2] / 100,
    opacity: 1,
    space: `hsl`
  };
  if (c4.alpha !== 1) {
    if (`type` in c4.alpha) {
      const alphaRaw = Number.parseFloat(c4.alpha.raw);
      return { ...parsedHsl, opacity: alphaRaw };
    }
    return { ...parsedHsl, opacity: c4.alpha / 100 };
  }
  return parsedHsl;
};
var hslToColorJs = (hsl, safe) => {
  let h = hsl.h === null ? safe ? 0 : null : hsl.h;
  let opacity2 = hsl.opacity === void 0 ? 1 : hsl.opacity;
  throwNumberTest(h, `percentage`, `hsl.h`);
  throwNumberTest(hsl.s, `percentage`, `hsl.s`);
  throwNumberTest(hsl.l, `percentage`, `hsl.l`);
  throwNumberTest(opacity2, `percentage`, `hsl.opacity`);
  const coords = [
    h * 360,
    hsl.s * 100,
    hsl.l * 100
  ];
  return new Color(`hsl`, coords, opacity2);
};
var oklchToColorJs = (oklch2) => {
  throwNumberTest(oklch2.l, `percentage`, `oklch.l`);
  throwNumberTest(oklch2.c, `percentage`, `oklch.c`);
  throwNumberTest(oklch2.h, `percentage`, `oklch.h`);
  throwNumberTest(oklch2.opacity, `percentage`, `oklch.opacity`);
  const coords = [
    oklch2.l,
    oklch2.c * 0.4,
    oklch2.h * 360
  ];
  return new Color(`oklch`, coords, oklch2.opacity);
};
var rgbToColorJs = (rgb) => {
  const coords = [
    rgb.r,
    rgb.g,
    rgb.b
  ];
  return `opacity` in rgb ? new Color(`srgb`, coords, rgb.opacity) : new Color(`srgb`, coords);
};
var toString6 = (colour) => {
  const c4 = resolve(colour);
  return c4.display();
};
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75, alpha = 1) => {
  throwNumberTest(index, `positive`, `index`);
  throwNumberTest(saturation, `percentage`, `saturation`);
  throwNumberTest(lightness, `percentage`, `lightness`);
  throwNumberTest(alpha, `percentage`, `alpha`);
  const hue = index * 137.508;
  return alpha === 1 ? `hsl(${hue},${saturation * 100}%,${lightness * 100}%)` : `hsl(${hue},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};
var fromHsl = (h, s = 1, l = 0.5, opacity2 = 1) => {
  throwNumberTest(h, `percentage`, `h`);
  throwNumberTest(s, `percentage`, `s`);
  throwNumberTest(l, `percentage`, `l`);
  return resolve({ h, s, l, opacity: opacity2, space: `hsl` });
};
var toRgb = (colour) => {
  const c4 = resolve(colour);
  const rgb = c4.srgb;
  return c4.alpha < 1 ? { r: rgb.r, g: rgb.g, b: rgb.b, opacity: c4.alpha, space: `srgb` } : { r: rgb.r, g: rgb.g, b: rgb.b, opacity: 1, space: `srgb` };
};
var resolve = (colour, safe = false) => {
  if (typeof colour === `string`) {
    if (colour.startsWith(`--`)) {
      colour = getComputedStyle(document.body).getPropertyValue(colour);
    }
    return new Color(colour);
  } else {
    if (isHsl(colour)) return new Color(hslToColorJs(colour, safe));
    if (isRgb(colour)) return new Color(rgbToColorJs(colour));
    if (isOklch(colour)) return new Color(oklchToColorJs(colour));
  }
  return colour;
};
var resolveToString = (...colours) => {
  for (const colour of colours) {
    if (colour === void 0) continue;
    if (colour === null) continue;
    const c4 = resolve(colour);
    try {
      return c4.display();
    } catch (ex) {
      if (typeof colour === `string`) return colour;
      throw ex;
    }
  }
  return `rebeccapurple`;
};
var toHex = (colour, safe = false) => {
  if (typeof colour === `string` && colour === `transparent`) return `#00000000`;
  return resolve(colour, safe).to(`srgb`).toString({ format: `hex`, collapse: false });
};
var opacity = (colour, amt) => {
  const c4 = resolve(colour);
  c4.alpha *= amt;
  return c4.toString();
};
var getCssVariable = (name2, fallbackColour = `black`, root) => {
  if (root === void 0) root = document.body;
  if (name2.startsWith(`--`)) name2 = name2.substring(2);
  const fromCss = getComputedStyle(root).getPropertyValue(`--${name2}`).trim();
  if (fromCss === void 0 || fromCss.length === 0) return fallbackColour;
  return fromCss;
};
var interpolator = (colours, opts = {}) => {
  const space = opts.space ?? `lch`;
  const hue = opts.hue ?? `shorter`;
  const pieces = interpolatorInit(colours);
  const ranges = pieces.map((piece) => piece[0].range(piece[1], { space, hue }));
  return (amt) => {
    amt = clamp(amt);
    const s = scale(amt, 0, 1, 0, ranges.length);
    const index = Math.floor(s);
    const amtAdjusted = s - index;
    return ranges[index](amtAdjusted);
  };
};
var interpolatorInit = (colours) => {
  if (!Array.isArray(colours)) throw new Error(`Param 'colours' is not an array as expected. Got: ${typeof colours}`);
  if (colours.length < 2) throw new Error(`Param 'colours' should be at least two in length. Got: ${colours.length}`);
  const c4 = colours.map((colour) => resolve(colour));
  return [...pairwise(c4)];
};
var scale3 = (colours, numberOfSteps, opts = {}) => {
  const space = opts.space ?? `lch`;
  const hue = opts.hue ?? `shorter`;
  const pieces = interpolatorInit(colours);
  const stepsPerPair = Math.floor(numberOfSteps / pieces.length);
  const steps2 = pieces.map((piece) => piece[0].steps(
    piece[1],
    { space, hue, steps: stepsPerPair, outputSpace: `srgb` }
  ));
  return steps2.flat();
};
var cssLinearGradient = (colours) => {
  const c4 = colours.map((c5) => resolve(c5));
  return `linear-gradient(to right, ${c4.map((v) => v.display()).join(`, `)})`;
};
var isHsl = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  if (p2.spaceId !== void 0) return false;
  if (p2.coords !== void 0) return false;
  const space = p2.space;
  if (space !== `hsl` && space !== void 0) return false;
  const pp = p2;
  if (pp.h === void 0) return false;
  if (pp.s === void 0) return false;
  if (pp.l === void 0) return false;
  return true;
};
var isOklch = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  if (p2.spaceId !== void 0) return false;
  if (p2.coords !== void 0) return false;
  if (p2.space !== `oklch`) return false;
  if (p2.l === void 0) return false;
  if (p2.c === void 0) return false;
  if (p2.h === void 0) return false;
  return true;
};
var isRgb = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  if (p2.space !== `srgb` && p2.space !== void 0) return false;
  if (p2.r === void 0) return false;
  if (p2.g === void 0) return false;
  if (p2.b === void 0) return false;
  return true;
};

// src/client/poses/landmarks.ts
var posePoints = ["nose", "left_eye_inner", "left_eye", "left_eye_outer", "right_eye_inner", "right_eye", "right_eye_outer", "left_ear", "right_ear", "mouth_left", "mouth_right", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_pinky", "right_pinky", "left_index", "right_index", "left_thumb", "right_thumb", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle", "left_heel", "right_heel", "left_foot_index", "right_foot_index"];
var getLandmarkIndexByName = (name2) => {
  for (let i = 0; i < posePoints.length; i++) {
    if (posePoints[i] === name2) return i;
  }
};
var getLandmarkNameByIndex = (index) => {
  if (typeof index !== `number`) throw new Error(`Expected numeric index. Got: ${typeof index}`);
  if (index < 0) throw new Error(`Index should be at least 0`);
  if (index >= posePoints.length) throw new Error(`Index is higher than expected (${index})`);
  return posePoints[index];
};
var getLandmark = (pose, indexOrName) => {
  if (typeof indexOrName === `number`) {
    return pose.landmarks[indexOrName];
  } else {
    const index = getLandmarkIndexByName(indexOrName);
    if (!index) return;
    return pose.landmarks[index];
  }
};
var getWorldLandmark = (pose, indexOrName) => {
  if (typeof indexOrName === `number`) {
    return pose.world[indexOrName];
  } else {
    const index = getLandmarkIndexByName(indexOrName);
    if (!index) return;
    return pose.world[index];
  }
};

// src/client/poses/geometry.ts
var horizontalSort = (poses) => {
  const withCentroids = poses.map((p2) => ({
    ...p2,
    centroid: centroid3(p2)
  }));
  withCentroids.sort((a2, b2) => a2.centroid.x - b2.centroid.x);
  return withCentroids;
};
var centroid3 = (pose) => point_exports.centroid(...pose.landmarks);
var centroidWorld = (pose) => point_exports.centroid(...pose.world);
var lineBetween = (pose, a2, b2) => {
  if (pose === void 0) throw new TypeError(`Param 'pose' is undefined. Expected PoseData`);
  if (a2 === void 0) throw new TypeError(`Param 'a' is undefined, expected landmark name or index.`);
  if (b2 === void 0) throw new TypeError(`Param 'b' is undefined, expected landmark name or index.`);
  const ptA = getLandmark(pose, a2);
  const ptB = getLandmark(pose, b2);
  if (ptA === void 0) return;
  if (ptB === void 0) return;
  return Object.freeze({
    a: ptA,
    b: ptB
  });
};
var roughCenter = (pose) => {
  if (pose === void 0) throw new Error(`Param 'pose' is undefined. Expected PoseData`);
  const a2 = lineBetween(pose, `left_shoulder`, `right_hip`);
  const b2 = lineBetween(pose, `right_shoulder`, `left_hip`);
  if (a2 === void 0) return;
  if (b2 === void 0) return;
  const halfA = line_exports.interpolate(0.5, a2);
  const halfB = line_exports.interpolate(0.5, b2);
  const sum5 = point_exports.sum(halfA, halfB);
  return point_exports.divide(sum5, 2, 2);
};

// node_modules/ixfx/dist/chunk-IQEKYUOH.js
var getOrGenerate = (map, fn) => async (key, args) => {
  let value = map.get(key);
  if (value !== void 0) return value;
  value = await fn(key, args);
  if (value === void 0) throw new Error(`fn returned undefined`);
  map.set(key, value);
  return value;
};

// node_modules/ixfx/dist/chunk-UZPYPFQS.js
var TrackerBase = class {
  constructor(opts = {}) {
    this.id = opts.id ?? `tracker`;
    this.debug = opts.debug ?? false;
    this.sampleLimit = opts.sampleLimit ?? -1;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
    this.seenCount = 0;
    if (this.debug) {
      console.log(`TrackerBase: sampleLimit: ${this.sampleLimit} resetAfter: ${this.resetAfterSamples} store: ${this.storeIntermediate}`);
    }
  }
  /**
   * Reset tracker
   */
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  /**
   * Calculate results
   *  
   * @param p 
   * @returns 
   */
  seen(...p2) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    } else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
      this.seenCount = this.trimStore(this.sampleLimit);
      this.onTrimmed();
    }
    this.seenCount += p2.length;
    const t2 = this.filterData(p2);
    return this.computeResults(t2);
  }
};
var TrackedValueMap = class {
  constructor(creator) {
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  /**
   * Number of named values being tracked
   */
  get size() {
    return this.store.size;
  }
  /**
   * Returns _true_ if `id` is stored
   * @param id
   * @returns
   */
  has(id) {
    return this.store.has(id);
  }
  /**
   * For a given id, note that we have seen one or more values.
   * @param id Id
   * @param values Values(s)
   * @returns Information about start to last value
   */
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  //eslint-disable-next-line functional/prefer-immutable-types
  async seen(id, ...values) {
    const trackedValue = await this.getTrackedValue(id, ...values);
    const result = trackedValue.seen(...values);
    return result;
  }
  /**
   * Creates or returns a TrackedValue instance for `id`.
   * @param id
   * @param values
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  async getTrackedValue(id, ...values) {
    if (id === null) throw new Error(`id parameter cannot be null`);
    if (id === void 0) throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
  }
  /**
   * Remove a tracked value by id.
   * Use {@link reset} to clear them all.
   * @param id
   */
  delete(id) {
    this.store.delete(id);
  }
  /**
   * Remove all tracked values.
   * Use {@link delete} to remove a single value by id.
   */
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  /**
   * Enumerate ids
   */
  *ids() {
    yield* this.store.keys();
  }
  /**
   * Enumerate tracked values
   */
  *tracked() {
    yield* this.store.values();
  }
  /**
   * Iterates TrackedValues ordered with oldest first
   * @returns
   */
  *trackedByAge() {
    const tp = [...this.store.values()];
    tp.sort((a2, b2) => {
      const aa = a2.elapsed;
      const bb = b2.elapsed;
      if (aa === bb) return 0;
      if (aa > bb) return -1;
      return 1;
    });
    for (const t2 of tp) {
      yield t2;
    }
  }
  /**
   * Iterates underlying values, ordered by age (oldest first)
   * First the named values are sorted by their `elapsed` value, and then
   * we return the last value for that group.
   */
  *valuesByAge() {
    for (const tb of this.trackedByAge()) {
      yield tb.last;
    }
  }
  /**
   * Enumerate last received values
   *
   * @example Calculate centroid of latest-received values
   * ```js
   * const pointers = pointTracker();
   * const c = Points.centroid(...Array.from(pointers.lastPoints()));
   * ```
   */
  *last() {
    for (const p2 of this.store.values()) {
      yield p2.last;
    }
  }
  /**
   * Enumerate starting values
   */
  *initialValues() {
    for (const p2 of this.store.values()) {
      yield p2.initial;
    }
  }
  /**
   * Returns a tracked value by id, or undefined if not found
   * @param id
   * @returns
   */
  get(id) {
    return this.store.get(id);
  }
};

// node_modules/ixfx/dist/chunk-PACXC2BC.js
var PrimitiveTracker = class extends TrackerBase {
  //data: Array<TimestampedPrimitive<V>>;
  constructor(opts) {
    super(opts);
    this.values = [];
    this.timestamps = [];
  }
  /**
   * Reduces size of value store to `limit`. Returns
   * number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length) return this.values.length;
    this.values = this.values.slice(-limit);
    this.timestamps = this.timestamps.slice(-limit);
    return this.values.length;
  }
  onTrimmed() {
  }
  get last() {
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (this can include the initial value)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the instance was created
   */
  get elapsed() {
    if (this.values.length < 0) throw new Error(`No values seen yet`);
    return Date.now() - this.timestamps[0];
  }
  onReset() {
    this.values = [];
    this.timestamps = [];
  }
  /**
   * Tracks a value
   */
  filterData(rawValues) {
    const lastValue = rawValues.at(-1);
    const last2 = { value: lastValue, at: performance.now() };
    const values = rawValues.map((value) => ({
      at: performance.now(),
      value
    }));
    if (this.storeIntermediate) {
      this.values.push(...rawValues);
      this.timestamps.push(...values.map((v) => v.at));
    } else switch (this.values.length) {
      case 0: {
        this.values.push(last2.value);
        this.timestamps.push(last2.at);
        break;
      }
      case 2: {
        this.values[1] = last2.value;
        this.timestamps[1] = last2.at;
        break;
      }
      case 1: {
        this.values.push(last2.value);
        this.timestamps.push(last2.at);
        break;
      }
    }
    return values;
  }
};
var NumberTracker = class extends PrimitiveTracker {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(opts) {
    super(opts);
    this.total = 0;
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
  }
  get avg() {
    return this.total / this.seenCount;
  }
  /**
   * Difference between last value and initial.
   * Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
   * If either of those is missing, undefined is returned
   */
  difference() {
    if (this.last === void 0) return;
    if (this.initial === void 0) return;
    return this.last - this.initial;
  }
  /**
   * Relative difference between last value and initial.
   * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
   */
  relativeDifference() {
    if (this.last === void 0) return;
    if (this.initial === void 0) return;
    return this.last / this.initial;
  }
  onReset() {
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.total = 0;
    super.onReset();
  }
  onTrimmed() {
    this.min = minFast(this.values);
    this.max = maxFast(this.values);
    this.total = totalFast(this.values);
  }
  computeResults(values) {
    if (values.some((v) => Number.isNaN(v))) throw new Error(`Cannot add NaN`);
    const numbers = values.map((value) => value.value);
    this.total = numbers.reduce((accumulator, v) => accumulator + v, this.total);
    this.min = Math.min(...numbers, this.min);
    this.max = Math.max(...numbers, this.max);
    const r = {
      max: this.max,
      min: this.min,
      total: this.total,
      avg: this.avg
    };
    return r;
  }
  getMinMaxAvg() {
    return {
      min: this.min,
      max: this.max,
      avg: this.avg
    };
  }
};
var number = (opts = {}) => new NumberTracker(opts);

// node_modules/ixfx/dist/chunk-DNND422Y.js
var ObjectTracker = class extends TrackerBase {
  constructor(opts = {}) {
    super(opts);
    this.values = [];
  }
  onTrimmed() {
  }
  /**
   * Reduces size of value store to `limit`. 
   * Returns number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length) return this.values.length;
    this.values = this.values.slice(-limit);
    return this.values.length;
  }
  /**
   * Allows sub-classes to be notified when a reset happens
   * @ignore
   */
  onReset() {
    this.values = [];
  }
  /**
   * Tracks a value
   * @ignore
   */
  filterData(p2) {
    const ts = p2.map(
      (v) => `at` in v ? v : {
        ...v,
        at: Date.now()
      }
    );
    const last2 = ts.at(-1);
    if (this.storeIntermediate) this.values.push(...ts);
    else switch (this.values.length) {
      case 0: {
        this.values.push(last2);
        break;
      }
      case 1: {
        this.values.push(last2);
        break;
      }
      case 2: {
        this.values[1] = last2;
        break;
      }
    }
    return ts;
  }
  /**
   * Last seen value. If no values have been added, it will return the initial value
   */
  get last() {
    if (this.values.length === 1) return this.values[0];
    return this.values.at(-1);
  }
  /**
   * Returns the initial value
   */
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (includes the initial value in the count)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the initial value
   */
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};
var PointTracker = class extends ObjectTracker {
  constructor(opts = {}) {
    super(opts);
  }
  onTrimmed() {
    this.initialRelation = void 0;
  }
  /**
   * Returns the last x coord
   */
  get x() {
    return this.last.x;
  }
  /**
   * Returns the last y coord
   */
  get y() {
    return this.last.y;
  }
  /**
   * @ignore
   */
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
  }
  seenEvent(p2) {
    if (`getCoalescedEvents` in p2) {
      const events = p2.getCoalescedEvents();
      const asPoints2 = events.map((event) => ({ x: event.clientX, y: event.clientY }));
      return this.seen(...asPoints2);
    } else {
      return this.seen({ x: p2.clientX, y: p2.clientY });
    }
  }
  /**
   * Tracks a point, returning data on its relation to the
   * initial point and the last received point.
   * 
   * Use {@link seenEvent} to track a raw `PointerEvent`.
   * 
   * @param _p Point
   */
  computeResults(_p) {
    const currentLast = this.last;
    const previousLast = this.values.at(-2);
    if (this.initialRelation === void 0 && this.initial) {
      this.initialRelation = relation(this.initial);
    } else if (this.initialRelation === void 0) {
      throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    }
    const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
    const initialRel = this.initialRelation(currentLast);
    const speed = previousLast === void 0 ? 0 : length2(previousLast, currentLast) / (currentLast.at - previousLast.at);
    const lastRel = {
      ...lastRelation(currentLast),
      speed
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r;
    return r;
  }
  /**
   * Returns a polyline representation of stored points.
   * Returns an empty array if points were not saved, or there's only one.
   */
  get line() {
    if (this.values.length === 1) return [];
    return joinPointsToLines(...this.values);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a polar coordinate
   */
  get vectorPolar() {
    return Vector_exports.fromLinePolar(this.lineStartEnd);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a Cartesian coordinate
   */
  get vectorCartesian() {
    return Vector_exports.fromLineCartesian(this.lineStartEnd);
  }
  /**
   * Returns a line from initial point to last point.
   *
   * If there are less than two points, Lines.Empty is returned
   */
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial) return Empty2;
    return {
      a: initial,
      b: this.last
    };
  }
  /**
   * Returns distance from latest point to initial point.
   * If there are less than two points, zero is returned.
   *
   * This is the direct distance from initial to last,
   * not the accumulated length.
   * @returns Distance
   */
  distanceFromStart() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? distance(initial, this.last) : 0;
  }
  /**
   * Difference between last point and the initial point, calculated
   * as a simple subtraction of x & y.
   *
   * `Points.Placeholder` is returned if there's only one point so far.
   */
  difference() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? subtract(this.last, initial) : Placeholder;
  }
  /**
   * Returns angle (in radians) from latest point to the initial point
   * If there are less than two points, undefined is return.
   * @returns Angle in radians
   */
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angleRadian(initial, this.last);
    }
  }
  /**
   * Returns the total length of accumulated points.
   * Returns 0 if points were not saved, or there's only one
   */
  get length() {
    if (this.values.length === 1) return 0;
    const l = this.line;
    return length2(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0) throw new Error(`Requires start point`);
      const p2 = new PointTracker({
        ...opts,
        id: key
      });
      p2.seen(start);
      return p2;
    });
  }
  /**
   * Track a PointerEvent
   * @param event
   */
  seenEvent(event) {
    if (`getCoalescedEvents` in event) {
      const events = event.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else {
      return Promise.all([super.seen(event.pointerId.toString(), event)]);
    }
  }
};
var points = (options = {}) => new TrackedPointMap(options);
var point2 = (opts = {}) => new PointTracker(opts);
var unique = (toString7 = toStringDefault) => {
  const set2 = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null) throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
    const asString = typeof value === `string` ? value : toString7(value);
    if (set2.has(asString)) return false;
    set2.add(asString);
    return true;
  };
};
var uniqueInstances = () => {
  const set2 = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null) throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
    if (set2.has(value)) return false;
    set2.add(value);
    return true;
  };
};

// node_modules/ixfx/dist/chunk-TLSLF6A5.js
var trackers_exports = {};
__export2(trackers_exports, {
  FrequencyTracker: () => FrequencyTracker,
  IntervalTracker: () => IntervalTracker,
  NumberTracker: () => NumberTracker,
  ObjectTracker: () => ObjectTracker,
  PointTracker: () => PointTracker,
  PrimitiveTracker: () => PrimitiveTracker,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  frequency: () => frequency,
  interval: () => interval,
  number: () => number,
  point: () => point2,
  points: () => points,
  unique: () => unique,
  uniqueInstances: () => uniqueInstances
});
var FrequencyTracker = class extends SimpleEventEmitter {
  #store;
  #keyString;
  /**
   * Constructor
   * @param keyString Function to key items. Uses JSON.stringify by default
   */
  constructor(keyString) {
    super();
    this.#store = /* @__PURE__ */ new Map();
    if (keyString === void 0) {
      keyString = (a2) => {
        if (a2 === void 0) throw new Error(`Cannot create key for undefined`);
        return typeof a2 === `string` ? a2 : JSON.stringify(a2);
      };
    }
    this.#keyString = keyString;
  }
  /**
   * Clear data. Fires `change` event
   */
  clear() {
    this.#store.clear();
    this.fireEvent(`change`, { context: this });
  }
  /**
   * @returns Iterator over keys (ie. groups)
   */
  keys() {
    return this.#store.keys();
  }
  /**
   * @returns Iterator over frequency counts
   */
  values() {
    return this.#store.values();
  }
  /**
   * @returns Copy of entries as an array of `[key, count]`
   */
  toArray() {
    return [...this.#store.entries()];
  }
  /**
   * Returns a string with keys and counts, useful for debugging.
   * @returns
   */
  debugString() {
    let t2 = ``;
    for (const [key, count] of this.#store.entries()) {
      t2 += `${key}: ${count}, `;
    }
    if (t2.endsWith(`, `)) return t2.slice(0, Math.max(0, t2.length - 2));
    return t2;
  }
  /**
   *
   * @param value Value to count
   * @returns Frequency of value, or _undefined_ if it does not exist
   */
  frequencyOf(value) {
    if (typeof value === `string`) return this.#store.get(value);
    const key = this.#keyString(value);
    return this.#store.get(key);
  }
  /**
   *
   * @param value Value to count
   * @returns Relative frequency of `value`, or _undefined_ if it does not exist
   */
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`) freq = this.#store.get(value);
    else {
      const key = this.#keyString(value);
      freq = this.#store.get(key);
    }
    if (freq === void 0) return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  /**
   * @returns Copy of entries as an array
   */
  entries() {
    return [...this.#store.entries()];
  }
  /**
   *
   * @returns Returns `{min,max,avg,total}`
   */
  minMaxAvg() {
    return minMaxAvg2(this.entries());
  }
  /**
   *
   * @param sortStyle Sorting style (default: _value_, ie. count)
   * @returns Sorted array of [key,frequency]
   */
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  /**
   *
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  add(...values) {
    if (values === void 0) throw new Error(`value parameter is undefined`);
    const keys = values.map((v) => this.#keyString(v));
    for (const key of keys) {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    }
    this.fireEvent(`change`, { context: this });
  }
};
var frequency = (keyString) => new FrequencyTracker(keyString);
var IntervalTracker = class extends NumberTracker {
  constructor() {
    super(...arguments);
    this.lastMark = 0;
  }
  mark() {
    if (this.lastMark > 0) {
      this.seen(performance.now() - this.lastMark);
    }
    this.lastMark = performance.now();
  }
};
var interval = (options) => new IntervalTracker(options);

// src/client/poses/pose-tracker.ts
var PoseTracker = class {
  #fromId;
  #poseId;
  #guid;
  #seen = 0;
  #box;
  #data;
  #hue;
  /**
   * Creates a PoseTracker
   * 
   * Defaults:
   * * sampleLimit: 10
   * * storeIntermediate: false
   * @param fromId Data source for pose (ie device)
   * @param poseId Id of pose from TFjs
   * @param options 
   */
  constructor(fromId, poseId, options = {}) {
    this.#poseId = poseId;
    this.#fromId = fromId;
    this.#guid = fromId + `-` + poseId;
    this.#hue = Math.random() * 360;
    const opts = {
      id: poseId,
      debug: options.debug ?? false,
      sampleLimit: 10,
      storeIntermediate: false
    };
    this.points = points(opts);
  }
  /**
   * Reset stored data for the tracker
   */
  reset() {
    this.points.reset();
  }
  /**
   * Returns a [PointTracker](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark
   * by name or index.
   * 
   * ```js
   * // Eg. get tracker for the 'nose' landmark
   * const nose = pose.landmark(`nose`);
   * 
   * // Get the angle of nose movement since the start
   * const a = nose.angleFromStart();
   * 
   * // Get the distance of nose since start
   * const d = nose.distanceFromStart();
   * ```
   * @param nameOrIndex 
   * @returns 
   */
  landmark(nameOrIndex) {
    if (nameOrIndex === void 0) throw new TypeError(`Param 'nameOrIndex' is undefined. Expected landmark name or numerical index`);
    if (typeof nameOrIndex === `number`) {
      return this.points.get(getLandmarkNameByIndex(nameOrIndex));
    } else {
      return this.points.get(nameOrIndex);
    }
  }
  /**
   * Returns the last position for a given landmark.
   * ```js
   * const pos = pose.landmarkValue(`nose`); // { x, y }
   * ```
   * 
   * Throws an error if `nameOrIndex` does not exist.
   * @param nameOrIndex
   * @returns 
   */
  landmarkValue(nameOrIndex) {
    if (nameOrIndex === void 0) throw new TypeError(`Param 'nameOrIndex' is undefined. Expected landmark name or numerical index`);
    const name2 = typeof nameOrIndex === `string` ? nameOrIndex : getLandmarkNameByIndex(nameOrIndex);
    const t2 = this.points.get(name2);
    if (t2 === void 0) throw new Error(`Point '${name2}' is not tracked`);
    const pt = t2.last;
    if (pt === void 0) throw new Error(`No data for point '${name2}'`);
    return pt;
  }
  /**
   * Update this pose with new information
   * @param pose 
   */
  async seen(pose) {
    this.#seen = Date.now();
    this.#data = pose;
    for (let i = 0; i < pose.landmarks.length; i++) {
      const lm = pose.landmarks[i];
      const name2 = getLandmarkNameByIndex(i);
      await this.points.seen(name2, lm);
    }
  }
  /**
   * Returns all the [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) (ie. landmark) for this pose.
   * 
   * ```js
   * for (const pt of pose.getPointTrackers()) {
   *  // Do something with 'pt' (which tracks one individual landmark)
   * }
   * ```
   */
  *getPointTrackers() {
    yield* this.points.store.values();
  }
  /**
   * Returns the raw landmarks
   * 
   * ```js
   * for (const kp of pose.getRawValues()) {
   *  // { x, y, z?, score, name }
   * }
   * ```
   * @returns {Point>}
   */
  *getRawValues() {
    for (const v of this.points.store.values()) {
      yield v.last;
    }
  }
  /**
   * Returns the centroid of all the pose points
   * ```js
   * pose.centroid; // { x, y }
   * ```
   * 
   * Returns {0.5,0.5} is data is missing
   */
  get centroid() {
    if (!this.#data) return { x: 0.5, y: 0.5 };
    return centroid3(this.#data);
  }
  /**
   * Returns height of bounding box
   */
  get height() {
    return this.box.height;
  }
  /**
   * Return width of bounding box
   */
  get width() {
    return this.box.width;
  }
  /**
   * Gets the bounding box of the pose, computed by 'landmarks'.
   * ```js
   * pose.box; // { x, y, width, height }
   * ````
   * 
   * Returns an empty rectangle if there's no data
   */
  get box() {
    if (this.#box) return this.#box;
    if (!this.#data) return rect_exports.EmptyPositioned;
    this.#box = point_exports.bbox(...this.#data.landmarks);
    return this.#box;
  }
  /**
   * Returns the id of the sender
   */
  get peerId() {
    return this.#fromId;
  }
  /**
   * Returns the middle of the pose bounding box
   * ```js
   * pose.middle; // { x, y }
   * ```
   * @returns 
   */
  get middle() {
    const box = this.box;
    if (box) {
      return {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2
      };
    }
    return { x: 0, y: 0 };
  }
  /**
   * Returns the randomly-assigned hue (0..360)
   */
  get hue() {
    return this.#hue;
  }
  /**
   * Returns a CSS colour: hsl() based on
   * the randomly-assigned hue
   */
  get hsl() {
    return `hsl(${this.#hue}, 70%, 50%)`;
  }
  /**
   * Returns the globally unique id of this pose
   * (fromId-poseId)
   */
  get guid() {
    return this.#guid;
  }
  /**
   * Returns the original pose id from TFjs
   * Warning: this may not be unique if there are multiple senders
   */
  get poseId() {
    return this.#poseId;
  }
  /**
   * Returns the id of the sender of this pose
   */
  get fromId() {
    return this.#fromId;
  }
  /**
   * Returns how long since pose was updated
   */
  get elapsed() {
    return Date.now() - this.#seen;
  }
  /**
   * Returns the last pose data in raw format
   */
  get last() {
    return this.#data;
  }
};

// src/client/poses/poses-tracker.ts
var PosesTracker = class extends EventTarget {
  /** 
   * PoseTrackers, keyed by 'sender-poseid'
   **/
  #data = /* @__PURE__ */ new Map();
  #options;
  /**
   * Constructor
   * @param {Partial<PosesTrackerOptions>} options 
   */
  constructor(options = {}) {
    super();
    this.#options = {
      maxAgeMs: 1e4,
      resetAfterSamples: 0,
      sampleLimit: 100,
      storeIntermediate: false,
      ...options
    };
    setInterval(() => {
      const expired = [...this.#data.entries()].filter((entry) => entry[1].elapsed > this.#options.maxAgeMs);
      for (const entry of expired) {
        this.#data.delete(entry[0]);
        this.dispatchEvent(new CustomEvent(`expired`, { detail: entry[1] }));
      }
    }, 1e3);
  }
  /**
   * Enumerates each of the PoseTrackers, sorted by age.
   * The most recent pose will be at position 0.
   * (ie. one for each body).
   * Use getRawPosesByAge() to enumerate raw pose data
   */
  *getByAge() {
    const trackers = [...this.#data.values()];
    trackers.sort((a2, b2) => a2.elapsed - b2.elapsed);
    yield* trackers.values();
  }
  /**
   * Enumerates PoseTrackers, sorting by the horizontal position.
   * Leftmost pose will be at position 0.
   */
  *getByHorizontal() {
    const trackers = [...this.#data.values()];
    trackers.sort((a2, b2) => a2.middle.x - b2.middle.x);
    yield* trackers;
  }
  /**
   * Enumerate all PoseTracker instances
   */
  *get() {
    const trackers = [...this.#data.values()];
    yield* trackers.values();
  }
  /**
   * Enumerate the last set of raw pose data for
   * each of the PoseTrackers.
   */
  *getRawPosesByAge() {
    for (const tracker of this.getByAge()) {
      yield tracker.last;
    }
  }
  *getRawPoses() {
    const values = [...this.#data.values()];
    for (const tracker of values) {
      const last2 = tracker.last;
      if (!last2) continue;
      yield last2;
    }
  }
  /**
   * Get a raw landmark by name across all poses
   * 
   * @example Get the 'nose' landmark for all bodies
   * ````js
   * for (const n of poses.getRawLandmarks(`nose`)) {
   *  // Yields: { x, y, z?, score, name }
   * }
   * ```
   * 
   * @param nameOrIndex Name or index of landmark to get data for
   */
  *getRawLandmarks(nameOrIndex) {
    if (typeof nameOrIndex === `undefined`) throw new TypeError(`Param 'nameOrIndex' is undefined. Expected landmark name or numerical index`);
    const index = typeof nameOrIndex === `number` ? nameOrIndex : getLandmarkIndexByName(nameOrIndex);
    if (index === void 0) throw new Error(`Landmark unknown: '${name}'`);
    for (const pose of this.getRawPoses()) {
      const kp = pose.landmarks[index];
      if (kp !== void 0) yield kp;
    }
  }
  /**
   * Enumerates all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark id.
   * 
   * eg. to get the PointTracker for 'nose' across all poses currently seen:
   * 
   * ```js
   * for (const pt of poses.getPointTrackers(`nose`)) {
   *  // do something with tracker...
   * }
   * ```
   * 
   * Throws an error if `nameOrIndex` is not found.
   * 
   * @param nameOrIndex Name or index of landmark to get tracker for
   */
  *getPointTrackers(nameOrIndex) {
    if (typeof nameOrIndex === `undefined`) throw new TypeError(`Param 'nameOrIndex' is undefined. Expected landmark name or numerical index`);
    const index = typeof nameOrIndex === `number` ? nameOrIndex : getLandmarkIndexByName(nameOrIndex);
    if (index === void 0) throw new Error(`Landmark unknown: '${name}'`);
    for (const tracker of this.get()) {
      yield tracker.landmark(nameOrIndex);
    }
  }
  /**
   * Returns all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) from a particular sender
   * 
   * ```js
   * for (const pt of poses.getFromSender(`mobile`)) {
   *  // Do something with tracker...
   * }
   * ```
   * 
   * @param senderId Id of sender
   */
  *getFromSender(senderId) {
    const values = [...this.#data.values()];
    for (const tracker of values) {
      if (tracker.fromId === senderId) yield tracker;
    }
  }
  /**
   * Enumerate the set of unique sender ids
   * ```js
   * for (const sender of poses.getSenderIds()) {
   *  // Do something with sender (string)
   * }
   * ```
   */
  *getSenderIds() {
    const set2 = /* @__PURE__ */ new Set();
    const values = [...this.#data.values()];
    for (const entry of values) {
      set2.add(entry.fromId);
    }
    yield* set2.values();
  }
  /**
   * Returns the PoseTracker for this pose id.
   * 
   * ```js
   * const pose = poses.getByPoseId(`123`);
   * pose.middle; // { x, y }
   * ```
   * 
   * Warning: Pose ids are not unique if there are multiple data sources.
   * Prefer using guids.
   * 
   * @param id Id of pose
   */
  getByPoseId(id) {
    for (const entry of this.#data.values()) {
      if (entry.poseId === id) return entry;
    }
  }
  /**
   * Returns the last raw pose data for this pose id.
   * 
   * ```js
   * const pose = poses.getRawPoseByPoseId(`123`);
   * pose.landmark; // array of landmarks { x, y, z?, score, name }
   * pose.score; // score of this pose
   * pose.box;  // bounding box
   * ```
   * 
   * Warning: Pose ids are not unique if there are multiple data sources.
   * Prefer using guids.
   * 
   * @param id Id of pose
   */
  getRawPoseByPoseId(id) {
    for (const entry of this.#data.values()) {
      if (entry.poseId === id) return entry.last;
    }
  }
  /**
   * Enumerate the set of globally-unique ids of poses
   */
  *getGuids() {
    for (const t2 of this.#data.values()) {
      yield t2.guid;
    }
  }
  /**
   * Get the PoseTracker for unique id (based on sender and pose)
   * ```js
   * const pt = poses.getByGuid(`123-123`);
   * pt.middle; // { x, y }
   * ```
   * 
   * Alternatively: {@link getRawPoseByGuid} to get raw data
   * @param id Combined id of sender-poseid
   */
  getByGuid(id) {
    return this.#data.get(id);
  }
  /**
   * Returns the raw pose data for a unique id
   * ```js
   * const pose = poses.getRawPoseByGuide(`123-123`);
   * pose.landmark; // array of { x, y, z?, score, name }
   * pose.score;     // score of pose
   * ```
   * 
   * Alternatively: {@link getByGuid} to get a tracker for pose
   * @param id Combined sender-pose
   * @returns 
   */
  getRawPoseByGuid(id) {
    return this.#data.get(id)?.last;
  }
  /**
   * Track a pose.
   * Fires `added` event if it is a new pose.
   * Returns the globally-unique id for this pose
   * @param pose New pose data
   * @param from Sender id
   */
  seen(from2, pose) {
    if (from2 === void 0) throw new Error(`Param 'from' is undefined`);
    if (pose === void 0) throw new Error(`Param 'pose' is undefined`);
    const id = (pose.poseid ?? 0).toString();
    const nsId = from2 + `-` + id;
    let tp = this.#data.get(nsId);
    if (tp === void 0) {
      tp = new PoseTracker(from2, id, this.#options);
      this.#data.set(nsId, tp);
      tp.seen(pose);
      this.dispatchEvent(new CustomEvent(`added`, { detail: tp }));
    } else {
      tp.seen(pose);
    }
    return nsId;
  }
  /**
   * Return number of tracked poses
   */
  get size() {
    return this.#data.size;
  }
  /**
   * Clear all data
   */
  clear() {
    this.#data.clear();
  }
};

// src/client/hands/index.ts
var hands_exports = {};
export {
  hands_exports as Hands,
  poses_exports as Poses
};
//# sourceMappingURL=index.js.map