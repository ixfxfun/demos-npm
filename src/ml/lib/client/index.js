var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/client/poses/index.ts
var poses_exports = {};
__export(poses_exports, {
  PoseTracker: () => PoseTracker,
  PosesTracker: () => PosesTracker,
  armHandLeftIndexes: () => armHandLeftIndexes,
  armHandRightIndexes: () => armHandRightIndexes,
  armLeftIndexes: () => armLeftIndexes,
  armRightIndexes: () => armRightIndexes,
  centroid: () => centroid2,
  centroidWorld: () => centroidWorld,
  faceIndexes: () => faceIndexes,
  footLeftIndexes: () => footLeftIndexes,
  footRightIndexes: () => footRightIndexes,
  getLandmark: () => getLandmark,
  getLandmarkIndexByName: () => getLandmarkIndexByName,
  getLandmarkNameByIndex: () => getLandmarkNameByIndex,
  getWorldLandmark: () => getWorldLandmark,
  horizontalSort: () => horizontalSort,
  legLeftIndexes: () => legLeftIndexes,
  legRightIndexes: () => legRightIndexes,
  lineBetween: () => lineBetween,
  roughCenter: () => roughCenter,
  torsoIndexes: () => torsoIndexes
});

// node_modules/ixfx/bundle/chunk-51aI8Tpl.js
var __defProp2 = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name in all) __defProp2(target, name, {
    get: all[name],
    enumerable: true
  });
};

// node_modules/ixfx/bundle/src-BBD50Kth.js
var getErrorMessage = (ex) => {
  if (typeof ex === `string`) return ex;
  if (ex instanceof Error) return ex.message;
  return ex;
};
var throwIfFailed = (...results) => {
  const failed = results.filter((r) => resultIsError(r));
  if (failed.length === 0) return;
  const messages = failed.map((f) => resultErrorToString(f));
  throw new Error(messages.join(`, `));
};
function resultThrow(...results) {
  for (const r of results) {
    const rr = typeof r === `object` ? r : r();
    if (rr === void 0) continue;
    if (rr.success) continue;
    throw resultToError(rr);
  }
  return true;
}
function resultThrowSingle(result) {
  if (result.success) return true;
  throw resultToError(result);
}
var resultFirstFail_ = (...results) => {
  for (const r of results) {
    const rr = typeof r === `object` ? r : r();
    if (rr === void 0) continue;
    if (!rr.success) return rr;
  }
};
function resultIsError(result) {
  if (typeof result !== `object`) return false;
  return !result.success;
}
function resultIsOk(result) {
  if (typeof result !== `object`) return false;
  return result.success;
}
function resultToError(result) {
  if (typeof result.error === `string`) throw new Error(result.error, { cause: result.info });
  if (result.error instanceof Error) throw result.error;
  return new Error(JSON.stringify(result.error), { cause: result.info });
}
function resultToValue(result) {
  if (resultIsOk(result)) return result.value;
  throw resultToError(result);
}
function resultErrorToString(result) {
  if (result.error instanceof Error) return getErrorMessage(result.error);
  if (typeof result.error === `string`) return result.error;
  return JSON.stringify(result.error);
}
function errorResult(error, info) {
  return {
    success: false,
    error,
    info
  };
}
var resultsCollate = (...results) => {
  let rr;
  for (const r of results) {
    rr = typeof r === `object` ? r : r();
    if (rr === void 0) continue;
    if (!rr.success) return rr;
  }
  if (!rr) throw new Error(`No results`);
  return rr;
};
var resultWithFail = (result, callback) => {
  if (resultIsError(result)) callback(result);
};
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
var ifNaN = (v, fallback) => {
  if (typeof v !== `number`) throw new TypeError(`v is not a number. Got: ${typeof v}`);
  if (Number.isNaN(v)) return fallback;
  return v;
};
var integerParse = (value2, range = ``, defaultValue = NaN) => {
  if (typeof value2 === `undefined`) return defaultValue;
  if (value2 === null) return defaultValue;
  try {
    const parsed = Number.parseInt(typeof value2 === `number` ? value2.toString() : value2);
    const r = integerTest(parsed, range, `parsed`);
    return r.success ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
};
var numberTest = (value2, range = ``, parameterName = `?`, info) => {
  if (value2 === null) return {
    success: false,
    error: `Parameter '${parameterName}' is null`,
    info
  };
  if (typeof value2 === `undefined`) return {
    success: false,
    error: `Parameter '${parameterName}' is undefined`,
    info
  };
  if (Number.isNaN(value2)) return {
    success: false,
    error: `Parameter '${parameterName}' is NaN`,
    info
  };
  if (typeof value2 !== `number`) return {
    success: false,
    error: `Parameter '${parameterName}' is not a number (${JSON.stringify(value2)})`,
    info
  };
  switch (range) {
    case `finite`: {
      if (!Number.isFinite(value2)) return {
        success: false,
        error: `Parameter '${parameterName} must be finite (Got: ${value2})`,
        info
      };
      break;
    }
    case `positive`: {
      if (value2 < 0) return {
        success: false,
        error: `Parameter '${parameterName}' must be at least zero (${value2})`,
        info
      };
      break;
    }
    case `negative`: {
      if (value2 > 0) return {
        success: false,
        error: `Parameter '${parameterName}' must be zero or lower (${value2})`,
        info
      };
      break;
    }
    case `aboveZero`: {
      if (value2 <= 0) return {
        success: false,
        error: `Parameter '${parameterName}' must be above zero (${value2})`,
        info
      };
      break;
    }
    case `belowZero`: {
      if (value2 >= 0) return {
        success: false,
        error: `Parameter '${parameterName}' must be below zero (${value2})`,
        info
      };
      break;
    }
    case `percentage`: {
      if (value2 > 1 || value2 < 0) return {
        success: false,
        error: `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value2})`,
        info
      };
      break;
    }
    case `nonZero`: {
      if (value2 === 0) return {
        success: false,
        error: `Parameter '${parameterName}' must non-zero. (${value2})`,
        info
      };
      break;
    }
    case `bipolar`: {
      if (value2 > 1 || value2 < -1) return {
        success: false,
        error: `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value2})`,
        info
      };
      break;
    }
  }
  return {
    success: true,
    value: value2,
    info
  };
};
var numberDecimalTest = (a, b, decimals = 3) => {
  if (decimals === 0) {
    a = Math.floor(a);
    b = Math.floor(b);
    if (a === b) return {
      success: true,
      value: a
    };
    return {
      success: false,
      error: `A is not identical to B`
    };
  }
  const mult = Math.pow(10, decimals);
  const aa = Math.floor(a * mult);
  const bb = Math.floor(b * mult);
  if (aa !== bb) return {
    success: false,
    error: `A is not close enough to B. A: ${a} B: ${b} Decimals: ${decimals}`
  };
  return {
    success: true,
    value: a
  };
};
var percentTest = (value2, parameterName = `?`, info) => numberTest(value2, `percentage`, parameterName, info);
var integerTest = (value2, range = ``, parameterName = `?`) => {
  return resultsCollate(numberTest(value2, range, parameterName), () => {
    if (!Number.isInteger(value2)) return {
      success: false,
      error: `Param '${parameterName}' is not an integer`
    };
    return {
      success: true,
      value: value2
    };
  });
};
var integerArrayTest = (numbers) => {
  for (const v of numbers) if (Math.abs(v) % 1 !== 0) return {
    success: false,
    error: `Value is not an integer: ${v}`
  };
  return {
    success: true,
    value: numbers
  };
};
var isInteger = (value2) => {
  if (typeof value2 === `string`) value2 = Number.parseFloat(value2);
  const r = integerTest(value2);
  return r.success;
};
var numberInclusiveRangeTest = (value2, min4, max4, parameterName = `?`) => {
  if (typeof value2 !== `number`) return {
    success: false,
    error: `Param '${parameterName}' is not a number type. Got type: '${typeof value2}' value: '${JSON.stringify(value2)}'`
  };
  if (Number.isNaN(value2)) return {
    success: false,
    error: `Param '${parameterName}' is not within range ${min4}-${max4}. Got: NaN`
  };
  if (Number.isFinite(value2)) {
    if (value2 < min4) return {
      success: false,
      error: `Param '${parameterName}' is below range ${min4}-${max4}. Got: ${value2}`
    };
    else if (value2 > max4) return {
      success: false,
      error: `Param '${parameterName}' is above range ${min4}-${max4}. Got: ${value2}`
    };
    return {
      success: true,
      value: value2
    };
  } else return {
    success: false,
    error: `Param '${parameterName}' is not within range ${min4}-${max4}. Got: infinite`
  };
};
var arrayTest = (value2, parameterName = `?`) => {
  if (!Array.isArray(value2)) return {
    success: false,
    error: `Parameter '${parameterName}' is expected to be an array'`
  };
  return {
    success: true,
    value: value2
  };
};
var arrayIndexTest = (array4, index, name = `index`) => {
  return resultsCollate(arrayTest(array4), integerTest(index, `positive`, name), numberInclusiveRangeTest(index, 0, array4.length - 1, name));
};
var arrayStringsTest = (value2) => {
  if (!Array.isArray(value2)) return {
    success: false,
    error: `Value is not an array`
  };
  if (value2.some((v) => typeof v !== `string`)) return {
    success: false,
    error: `Contains something not a string`
  };
  return {
    success: true,
    value: value2
  };
};
var nullUndefTest = (value2, parameterName = `?`) => {
  if (typeof value2 === `undefined`) return {
    success: false,
    error: `${parameterName} param is undefined`
  };
  if (value2 === null) return {
    success: false,
    error: `${parameterName} param is null`
  };
  return {
    success: true,
    value: value2
  };
};
var isDefined = (argument) => argument !== void 0;
var isFunction = (object) => object instanceof Function;
var functionTest = (value2, parameterName = `?`) => {
  if (value2 === void 0) return {
    success: false,
    error: `Param '${parameterName}' is undefined. Expected: function.`
  };
  if (value2 === null) return {
    success: false,
    error: `Param '${parameterName}' is null. Expected: function.`
  };
  if (typeof value2 !== `function`) return {
    success: false,
    error: `Param '${parameterName}' is type '${typeof value2}'. Expected: function`
  };
  return {
    success: true,
    value: value2
  };
};
var testPlainObject = (value2) => {
  if (typeof value2 !== `object` || value2 === null) return {
    success: false,
    error: `Value is null or not object type`
  };
  const prototype = Object.getPrototypeOf(value2);
  const t2 = (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value2) && !(Symbol.iterator in value2);
  if (t2) return {
    success: true,
    value: value2
  };
  return {
    success: false,
    error: `Fancy object`
  };
};
var testPlainObjectOrPrimitive = (value2) => {
  const t2 = typeof value2;
  if (t2 === `symbol`) return {
    success: false,
    error: `Symbol type`
  };
  if (t2 === `function`) return {
    success: false,
    error: `Function type`
  };
  if (t2 === `bigint`) return {
    success: true,
    value: value2
  };
  if (t2 === `number`) return {
    success: true,
    value: value2
  };
  if (t2 === `string`) return {
    success: true,
    value: value2
  };
  if (t2 === `boolean`) return {
    success: true,
    value: value2
  };
  return testPlainObject(value2);
};
var rangeIntegerTest = (v, expected) => {
  return resultsCollate(rangeTest(v, expected), integerArrayTest(v));
};
var rangeTest = (numbers, expected) => {
  for (const v of numbers) {
    if (expected.minExclusive !== void 0) {
      if (v <= expected.minExclusive) return {
        success: false,
        error: `Value '${v}' must be higher than minExclusive: '${expected.minExclusive}'`
      };
    }
    if (expected.minInclusive !== void 0) {
      if (v < expected.minInclusive) return {
        success: false,
        error: `Value '${v}' must be equal or higher than minInclusive: '${expected.minInclusive}'`
      };
    }
    if (expected.maxExclusive !== void 0) {
      if (v >= expected.maxExclusive) return {
        success: false,
        error: `Value '${v}' must be less than maxExclusive: '${expected.maxExclusive}'`
      };
    }
    if (expected.maxInclusive !== void 0) {
      if (v > expected.maxInclusive) return {
        success: false,
        error: `Value '${v}' must be equal or less than maxInclusive: '${expected.maxInclusive}'`
      };
    }
  }
  return {
    success: true,
    value: numbers
  };
};
var stringTest = (value2, range = ``, parameterName = `?`) => {
  if (typeof value2 !== `string`) return {
    success: false,
    error: `Param '${parameterName} is not type string. Got: ${typeof value2}`
  };
  switch (range) {
    case `non-empty`:
      if (value2.length === 0) return {
        success: false,
        error: `Param '${parameterName} is empty`
      };
      break;
  }
  return {
    success: true,
    value: value2
  };
};
var src_exports = {};
__export2(src_exports, {
  arrayIndexTest: () => arrayIndexTest,
  arrayStringsTest: () => arrayStringsTest,
  arrayTest: () => arrayTest,
  errorResult: () => errorResult,
  functionTest: () => functionTest,
  getErrorMessage: () => getErrorMessage,
  ifNaN: () => ifNaN,
  integerArrayTest: () => integerArrayTest,
  integerParse: () => integerParse,
  integerTest: () => integerTest,
  isDefined: () => isDefined,
  isFunction: () => isFunction,
  isInteger: () => isInteger,
  isPowerOfTwo: () => isPowerOfTwo,
  nullUndefTest: () => nullUndefTest,
  numberDecimalTest: () => numberDecimalTest,
  numberInclusiveRangeTest: () => numberInclusiveRangeTest,
  numberTest: () => numberTest,
  percentTest: () => percentTest,
  rangeIntegerTest: () => rangeIntegerTest,
  rangeTest: () => rangeTest,
  resultErrorToString: () => resultErrorToString,
  resultFirstFail_: () => resultFirstFail_,
  resultIsError: () => resultIsError,
  resultIsOk: () => resultIsOk,
  resultThrow: () => resultThrow,
  resultThrowSingle: () => resultThrowSingle,
  resultToError: () => resultToError,
  resultToValue: () => resultToValue,
  resultWithFail: () => resultWithFail,
  resultsCollate: () => resultsCollate,
  stringTest: () => stringTest,
  testPlainObject: () => testPlainObject,
  testPlainObjectOrPrimitive: () => testPlainObjectOrPrimitive,
  throwIfFailed: () => throwIfFailed
});

// node_modules/ixfx/bundle/is-primitive-eBwrK4Yg.js
function isPrimitive(value2) {
  if (typeof value2 === `number`) return true;
  if (typeof value2 === `string`) return true;
  if (typeof value2 === `bigint`) return true;
  if (typeof value2 === `boolean`) return true;
  return false;
}

// node_modules/ixfx/bundle/interval-type-DajslxUJ.js
var removeCircularReferences = (value2, replaceWith = null, seen = /* @__PURE__ */ new WeakSet(), path = ``) => {
  if (value2 === null) return value2;
  if (typeof value2 !== `object`) throw new TypeError(`Param 'value' must be an object. Got type: ${typeof value2}`);
  seen.add(value2);
  const entries2 = Object.entries(value2);
  for (const entry of entries2) {
    if (entry[1] === null) continue;
    if (typeof entry[1] !== `object`) continue;
    if (seen.has(entry[1])) {
      entry[1] = replaceWith;
      continue;
    }
    entry[1] = removeCircularReferences(entry[1], replaceWith, seen, `${entry[0]}.`);
  }
  return Object.fromEntries(entries2);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var defaultToString = (value2) => {
  if (value2 === null) return `null`;
  if (typeof value2 === `boolean` || typeof value2 === `number`) return value2.toString();
  if (typeof value2 === `string`) return value2;
  if (typeof value2 === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
  try {
    const s = JSON.stringify(value2);
    return s;
  } catch (error) {
    if (typeof value2 === `object`) return JSON.stringify(removeCircularReferences(value2, `(circular)`));
    else throw error;
  }
};
var toStringOrdered = (itemToMakeStringFor) => {
  if (typeof itemToMakeStringFor === `string`) return itemToMakeStringFor;
  const allKeys = /* @__PURE__ */ new Set();
  JSON.stringify(itemToMakeStringFor, (key, value2) => (allKeys.add(key), value2));
  return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueIgnoreOrder = (a, b) => {
  if (a === b) return true;
  return toStringOrdered(a) === toStringOrdered(b);
};
var compareIterableValuesShallow = (a, b, eq = isEqualDefault) => {
  const shared = [];
  const aUnique = [];
  const bUnique = [];
  for (const elementOfA of a) {
    let seenInB = false;
    for (const elementOfB of b) if (eq(elementOfA, elementOfB)) {
      seenInB = true;
      break;
    }
    if (seenInB) shared.push(elementOfA);
    else aUnique.push(elementOfA);
  }
  for (const elementOfB of b) {
    let seenInA = false;
    for (const elementOfA of a) if (eq(elementOfB, elementOfA)) seenInA = true;
    if (!seenInA) bUnique.push(elementOfB);
  }
  const isSame = aUnique.length === 0 && bUnique.length === 0;
  return {
    shared,
    isSame,
    a: aUnique,
    b: bUnique
  };
};
function round(a, b, roundUp) {
  resultThrow(integerTest(a, `positive`, `decimalPlaces`));
  const up = typeof b === `boolean` ? b : roundUp ?? false;
  let rounder;
  if (a === 0) rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    if (up) rounder = (v) => Math.ceil(v * p) / p;
    else rounder = (v) => Math.floor(v * p) / p;
  }
  if (typeof b === `number`) return rounder(b);
  return rounder;
}
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
    throw new Error(`Not a valid interval: ${JSON.stringify(interval2)}`);
  }
}
function isInterval(interval2) {
  if (typeof interval2 === `undefined`) return false;
  if (interval2 === null) return false;
  if (typeof interval2 === `number`) {
    if (Number.isNaN(interval2)) return false;
    if (!Number.isFinite(interval2)) return false;
    return true;
  }
  if (typeof interval2 !== `object`) return false;
  const hasMillis = `millis` in interval2;
  const hasSecs = `secs` in interval2;
  const hasMins = `mins` in interval2;
  const hasHours = `hours` in interval2;
  if (hasMillis && !numberTest(interval2.millis).success) return false;
  if (hasSecs && !numberTest(interval2.secs).success) return false;
  if (hasMins && !numberTest(interval2.mins).success) return false;
  if (hasHours && !numberTest(interval2.hours).success) return false;
  if (hasMillis || hasSecs || hasHours || hasMins) return true;
  return false;
}
var elapsedToHumanString = (millisOrFunction, rounding = 2) => {
  let interval2 = 0;
  if (typeof millisOrFunction === `function`) {
    const intervalResult = millisOrFunction();
    return elapsedToHumanString(intervalResult);
  } else if (typeof millisOrFunction === `number`) interval2 = millisOrFunction;
  else if (typeof millisOrFunction === `object`) interval2 = intervalToMs(interval2);
  let ms = intervalToMs(interval2);
  if (typeof ms === `undefined`) return `(undefined)`;
  if (ms < 1e3) return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120) return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60) return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

// node_modules/ixfx/bundle/basic-D0XoOdBJ.js
var numericComparer = (a, b) => {
  if (a === b) return 0;
  if (a > b) return 1;
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
var defaultComparer = (x, y) => {
  if (typeof x === `number` && typeof y === `number`) return numericComparer(x, y);
  return jsComparer(x, y);
};
var maps_exports = {};
__export2(maps_exports, {
  addObjectEntriesMutate: () => addObjectEntriesMutate,
  addValue: () => addValue,
  addValueMutate: () => addValueMutate,
  addValueMutator: () => addValueMutator,
  deleteByValueCompareMutate: () => deleteByValueCompareMutate,
  filterValues: () => filterValues,
  findBySomeKey: () => findBySomeKey,
  findEntryByPredicate: () => findEntryByPredicate,
  findEntryByValue: () => findEntryByValue,
  findValue: () => findValue,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  some: () => some,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});
var getClosestIntegerKey = (data, target) => {
  target = Math.round(target);
  if (data.has(target)) return target;
  else {
    let offset2 = 1;
    while (offset2 < 1e3) {
      if (data.has(target - offset2)) return target - offset2;
      else if (data.has(target + offset2)) return target + offset2;
      offset2++;
    }
    throw new Error(`Could not find target ${target.toString()}`);
  }
};
var findBySomeKey = (data, keys) => {
  for (const key of keys) if (data.has(key)) return data.get(key);
};
var hasKeyValue = (map2, key, value2, comparer = isEqualDefault) => {
  if (!map2.has(key)) return false;
  const values2 = [...map2.values()];
  return values2.some((v) => comparer(v, value2));
};
var deleteByValueCompareMutate = (map2, value2, comparer = isEqualDefault) => {
  for (const entry of map2.entries()) if (comparer(entry[1], value2)) map2.delete(entry[0]);
};
var findEntryByPredicate = (map2, predicate) => {
  for (const entry of map2.entries()) if (predicate(entry[1], entry[0])) return entry;
};
var findEntryByValue = (map2, value2, isEqual3 = isEqualDefault) => {
  for (const entry of map2.entries()) if (isEqual3(entry[1], value2)) return entry;
};
var addValueMutate = (map2, hasher, collisionPolicy, ...values2) => {
  const m = map2 ?? /* @__PURE__ */ new Map();
  const f = addValueMutator(m, hasher, collisionPolicy);
  f(...values2);
  return m;
};
var addValue = (map2, hasher, collisionPolicy, ...values2) => {
  const m = map2 === void 0 ? /* @__PURE__ */ new Map() : new Map(map2);
  for (const v of values2) {
    const hashResult = hasher(v);
    if (collisionPolicy !== `overwrite`) {
      if (m.has(hashResult)) {
        if (collisionPolicy === `throw`) throw new Error(`Key '${hashResult}' already in map`);
        if (collisionPolicy === `skip`) continue;
      }
    }
    m.set(hashResult, v);
  }
  return m;
};
var addValueMutator = (map2, hasher, collisionPolicy = `overwrite`) => {
  return (...values2) => {
    for (const v of values2) {
      const hashResult = hasher(v);
      if (collisionPolicy !== `overwrite`) {
        if (map2.has(hashResult)) {
          if (collisionPolicy === `throw`) throw new Error(`Key '${hashResult}' already in map`);
          if (collisionPolicy === `skip`) continue;
        }
      }
      map2.set(hashResult, v);
    }
    return map2;
  };
};
var sortByValue = (map2, comparer) => {
  const f = comparer ?? defaultComparer;
  return [...map2.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map2, property, compareFunction) => {
  const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
  return [...map2.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[property], b[property]);
  });
};
var hasAnyValue = (map2, value2, comparer) => {
  const entries2 = [...map2.entries()];
  return entries2.some((kv) => comparer(kv[1], value2));
};
function* filterValues(map2, predicate) {
  for (const v of map2.values()) if (predicate(v)) yield v;
}
var toArray = (map2) => [...map2.values()];
var fromIterable = (data, keyFunction = toStringDefault, collisionPolicy = `overwrite`) => {
  const m = /* @__PURE__ */ new Map();
  for (const d of data) {
    const key = keyFunction(d);
    if (m.has(key)) {
      if (collisionPolicy === `throw`) throw new Error(`Key '${key}' is already used and new data will overwrite it. `);
      if (collisionPolicy === `skip`) continue;
    }
    m.set(key, d);
  }
  return m;
};
var fromObject = (data) => {
  const map2 = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) for (const d of data) addObjectEntriesMutate(map2, d);
  else addObjectEntriesMutate(map2, data);
  return map2;
};
var addObjectEntriesMutate = (map2, data) => {
  const entries2 = Object.entries(data);
  for (const [key, value2] of entries2) map2.set(key, value2);
};
var findValue = (map2, predicate) => [...map2.values()].find((v) => predicate(v));
var some = (map2, predicate) => [...map2.values()].some((v) => predicate(v));
var mapToObjectTransform = (m, valueTransform) => [...m].reduce((object, [key, value2]) => {
  const t2 = valueTransform(value2);
  object[key] = t2;
  return object;
}, {});
var zipKeyValue = (keys, values2) => {
  if (keys.length !== values2.length) throw new Error(`Keys and values arrays should be same length`);
  return Object.fromEntries(keys.map((k, index) => [k, values2[index]]));
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var toObject = (m) => [...m].reduce((object, [key, value2]) => {
  object[key] = value2;
  return object;
}, {});
var mapToArray = (m, transformer) => [...m.entries()].map((x) => transformer(x[0], x[1]));
var mergeByKey = (reconcile, ...maps) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of maps) for (const [mk, mv] of m) {
    let v = result.get(mk);
    v = v ? reconcile(v, mv) : mv;
    result.set(mk, v);
  }
  return result;
};
var getOrGenerateSync = (map2, fn) => (key, args) => {
  let value2 = map2.get(key);
  if (value2 !== void 0) return value2;
  value2 = fn(key, args);
  map2.set(key, value2);
  return value2;
};
var getOrGenerate = (map2, fn) => async (key, args) => {
  let value2 = map2.get(key);
  if (value2 !== void 0) return value2;
  value2 = await fn(key, args);
  if (value2 === void 0) throw new Error(`fn returned undefined`);
  map2.set(key, value2);
  return value2;
};
var continuously = (callback, interval2 = 0, options = {}) => {
  let intervalMs = intervalToMs(interval2, 0);
  resultThrow(integerTest(intervalMs, `positive`, `interval`));
  const fireBeforeWait = options.fireBeforeWait ?? false;
  const onStartCalled = options.onStartCalled;
  const signal = options.signal;
  let disposed = false;
  let runState = `idle`;
  let startCount = 0;
  let startCountTotal = 0;
  let startedAt = performance.now();
  let intervalUsed = interval2 ?? 0;
  let cancelled = false;
  let currentTimer;
  const deschedule = () => {
    if (currentTimer === void 0) return;
    globalThis.clearTimeout(currentTimer);
    currentTimer = void 0;
    startCount = 0;
    startedAt = NaN;
  };
  const schedule = (scheduledCallback) => {
    if (intervalMs === 0) if (typeof requestAnimationFrame === `undefined`) currentTimer = globalThis.setTimeout(scheduledCallback, 0);
    else {
      currentTimer = void 0;
      requestAnimationFrame(scheduledCallback);
    }
    else currentTimer = globalThis.setTimeout(scheduledCallback, intervalMs);
  };
  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (runState === `idle`) return;
    runState = `idle`;
    deschedule();
  };
  const loop = async () => {
    if (signal?.aborted) runState = `idle`;
    if (runState === `idle`) return;
    runState = `running`;
    startCount++;
    startCountTotal++;
    const valueOrPromise = callback(startCount, performance.now() - startedAt);
    const value2 = typeof valueOrPromise === `object` ? await valueOrPromise : valueOrPromise;
    if (cancelled) return;
    runState = `scheduled`;
    if (value2 !== void 0 && !value2) {
      cancel();
      return;
    }
    if (cancelled) return;
    schedule(loop);
  };
  const start = () => {
    if (disposed) throw new Error(`Disposed`);
    cancelled = false;
    if (onStartCalled !== void 0) {
      const doWhat = onStartCalled(startCount, performance.now() - startedAt);
      switch (doWhat) {
        case `cancel`: {
          cancel();
          return;
        }
        case `reset`: {
          reset2();
          return;
        }
        case `dispose`: {
          disposed = true;
          cancel();
          return;
        }
      }
    }
    if (runState === `idle`) {
      startCount = 0;
      startedAt = performance.now();
      runState = `scheduled`;
      if (fireBeforeWait) loop();
      else schedule(loop);
    }
  };
  const reset2 = () => {
    if (disposed) throw new Error(`Disposed`);
    cancelled = false;
    startCount = 0;
    startedAt = NaN;
    if (runState !== `idle`) cancel();
    start();
  };
  return {
    start,
    reset: reset2,
    cancel,
    get interval() {
      return intervalUsed;
    },
    get runState() {
      return runState;
    },
    get startCountTotal() {
      return startCountTotal;
    },
    get startCount() {
      return startCount;
    },
    set interval(interval$1) {
      const ms = intervalToMs(interval$1, 0);
      resultThrow(integerTest(ms, `positive`, `interval`));
      intervalMs = ms;
      intervalUsed = interval$1;
    },
    get isDisposed() {
      return disposed;
    },
    get elapsedMs() {
      return performance.now() - startedAt;
    }
  };
};
var elapsedSince = () => {
  const start = performance.now();
  return () => {
    return performance.now() - start;
  };
};
var elapsedInfinity = () => {
  return () => {
    return Number.POSITIVE_INFINITY;
  };
};
var promiseFromEvent = (target, name) => {
  return new Promise((resolve2) => {
    const handler = (...args) => {
      target.removeEventListener(name, handler);
      if (Array.isArray(args) && args.length === 1) resolve2(args[0]);
      else resolve2(args);
    };
    target.addEventListener(name, handler);
  });
};
if (typeof window === `undefined` || !(`requestAnimationFrame` in window)) {
  if (typeof window === `undefined`) globalThis.requestAnimationFrame = (callback) => {
    setTimeout(callback, 1);
  };
}
var sleep = (optsOrMillis) => {
  const timeoutMs = intervalToMs(optsOrMillis, 1);
  const signal = optsOrMillis.signal;
  const value2 = optsOrMillis.value;
  resultThrow(numberTest(timeoutMs, `positive`, `timeoutMs`));
  if (timeoutMs === 0) return new Promise((resolve2) => requestAnimationFrame((_) => {
    resolve2(value2);
  }));
  else return new Promise((resolve2, reject) => {
    const onAbortSignal = () => {
      clearTimeout(t2);
      if (signal) {
        signal.removeEventListener(`abort`, onAbortSignal);
        reject(new Error(signal.reason));
      } else reject(/* @__PURE__ */ new Error(`Cancelled`));
    };
    if (signal) signal.addEventListener(`abort`, onAbortSignal);
    const t2 = setTimeout(() => {
      signal?.removeEventListener(`abort`, onAbortSignal);
      if (signal?.aborted) {
        reject(new Error(signal.reason));
        return;
      }
      resolve2(value2);
    }, timeoutMs);
  });
};
var max = () => {
  let max$12 = Number.MIN_SAFE_INTEGER;
  const compute = (value2) => {
    const valueArray = Array.isArray(value2) ? value2 : [value2];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      max$12 = Math.max(subValue, max$12);
    }
    return max$12;
  };
  return compute;
};
var min = () => {
  let min$12 = Number.MAX_SAFE_INTEGER;
  const compute = (value2) => {
    const valueArray = Array.isArray(value2) ? value2 : [value2];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      min$12 = Math.min(subValue, min$12);
    }
    return min$12;
  };
  return compute;
};
var sum = () => {
  let t2 = 0;
  const compute = (value2) => {
    const valueArray = Array.isArray(value2) ? value2 : [value2];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) continue;
      t2 += subValue;
    }
    return t2;
  };
  return compute;
};
var average = () => {
  let total2 = 0;
  let tally$12 = 0;
  const compute = (value2) => {
    const valueArray = Array.isArray(value2) ? value2 : [value2];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) continue;
      tally$12++;
      total2 += subValue;
    }
    return total2 / tally$12;
  };
  return compute;
};
var tally = (countArrayItems) => {
  let t2 = 0;
  const compute = (value2) => {
    if (countArrayItems) if (Array.isArray(value2)) t2 += value2.length;
    else t2++;
    else t2++;
    return t2;
  };
  return compute;
};
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  let best;
  return (value2) => {
    if (includeType && typeof value2 !== includeType) return;
    if (best === void 0) {
      best = value2;
      return best;
    } else {
      const result = r(value2, best);
      if (result == `a`) {
        best = value2;
        return best;
      } else if (result === `eq` && emitEqualRanked) return best;
      else if (emitRepeatHighest) return best;
    }
  };
}

// node_modules/ixfx/bundle/src-CSkWIttj.js
var cycle = (options) => {
  throwIfFailed(arrayTest(options, `options`));
  const opts = [...options];
  let index = 0;
  const next3 = () => {
    index++;
    if (index === opts.length) index = 0;
    return value2();
  };
  const prev = () => {
    index--;
    if (index === -1) index = opts.length - 1;
    return value2();
  };
  const value2 = () => {
    return opts.at(index);
  };
  const select = (indexOrValue) => {
    if (typeof indexOrValue === `number`) index = indexOrValue;
    else {
      const found = opts.indexOf(indexOrValue);
      if (found === -1) throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray4 = () => [...opts];
  return {
    toArray: toArray4,
    next: next3,
    prev,
    get current() {
      return value2();
    },
    select
  };
};
var atWrap = (array$1, index) => {
  resultThrow(numberTest(index, ``, `index`));
  if (!Array.isArray(array$1)) throw new Error(`Param 'array' is not an array`);
  index = index % array$1.length;
  return array$1.at(index);
};
function chunks(array$1, size) {
  throwIfFailed(integerTest(size, "aboveZero", `size`), arrayTest(array$1, `array`));
  const output = [];
  for (let index = 0; index < array$1.length; index += size) output.push(array$1.slice(index, index + size));
  return output;
}
var toStringDefault2 = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var isEqualDefault2 = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b) return true;
  return toStringDefault2(a) === toStringDefault2(b);
};
var contains = (haystack, needles, eq = isEqualDefault2) => {
  if (!Array.isArray(haystack)) throw new TypeError(`Expects haystack parameter to be an array`);
  if (!Array.isArray(needles)) throw new TypeError(`Expects needles parameter to be an array. Got: ${typeof needles}`);
  for (const needle of needles) {
    let found = false;
    for (const element of haystack) if (eq(needle, element)) {
      found = true;
      break;
    }
    if (!found) return false;
  }
  return true;
};
var containsDuplicateValues = (data, keyFunction = toStringDefault2) => {
  if (typeof data !== `object`) throw new Error(`Param 'data' is expected to be an Iterable. Got type: ${typeof data}`);
  const set3 = /* @__PURE__ */ new Set();
  for (const v of data) {
    const string_ = keyFunction(v);
    if (set3.has(string_)) return true;
    set3.add(string_);
  }
  return false;
};
var containsDuplicateInstances = (array$1) => {
  if (!Array.isArray(array$1)) throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array$1.length; index++) for (let x = 0; x < array$1.length; x++) {
    if (index === x) continue;
    if (array$1[index] === array$1[x]) return true;
  }
  return false;
};
function ensureLength(data, length2, expandStrategy = `undefined`, truncateStrategy = `from-end`) {
  if (data === void 0) throw new Error(`Data undefined`);
  if (!Array.isArray(data)) throw new Error(`data is not an array`);
  if (data.length === length2) return [...data];
  if (data.length > length2) if (truncateStrategy === `from-end`) return data.slice(0, length2);
  else return data.slice(data.length - length2);
  const d = [...data];
  const add2 = length2 - d.length;
  for (let index = 0; index < add2; index++) switch (expandStrategy) {
    case `undefined`: {
      d.push(void 0);
      break;
    }
    case `repeat`: {
      d.push(data[index % data.length]);
      break;
    }
    case `first`: {
      d.push(data[0]);
      break;
    }
    case `last`: {
      d.push(data.at(-1));
      break;
    }
  }
  return d;
}
var isEqual = (arrayA, arrayB, equality = isEqualDefault2) => {
  resultThrow(arrayTest(arrayA, `arrayA`), arrayTest(arrayB, `arrayB`));
  if (arrayA.length !== arrayB.length) return false;
  for (let indexA = 0; indexA < arrayA.length; indexA++) if (!equality(arrayA[indexA], arrayB[indexA])) return false;
  return true;
};
var containsIdenticalValues = (array$1, equality) => {
  if (!Array.isArray(array$1)) throw new Error(`Param 'array' is not an array.`);
  if (array$1.length === 0) return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array$1[0];
  const r = array$1.some((v) => !eq(a, v));
  if (r) return false;
  return true;
};
var filterAB = (data, filter2) => {
  const a = [];
  const b = [];
  for (const datum of data) if (filter2(datum)) a.push(datum);
  else b.push(datum);
  return [a, b];
};
function* filterBetween(array$1, predicate, startIndex, endIndex) {
  resultThrow(arrayTest(array$1, `array`));
  if (typeof startIndex === `undefined`) startIndex = 0;
  if (typeof endIndex === `undefined`) endIndex = array$1.length;
  resultThrow(arrayIndexTest(array$1, startIndex, `startIndex`));
  resultThrow(arrayIndexTest(array$1, endIndex - 1, `endIndex`));
  for (let index = startIndex; index < endIndex; index++) if (predicate(array$1[index], index, array$1)) yield array$1[index];
}
var flatten = (array$1) => [...array$1].flat();
var mapWithEmptyFallback = (array$1, fn, fallback) => {
  if (typeof array$1 !== `object` || !Array.isArray(array$1) || array$1.length === 0) {
    if (Array.isArray(fallback)) return fallback;
    return [fallback];
  }
  return array$1.map(fn);
};
var frequencyByGroup = (groupBy$1, data) => {
  if (!Array.isArray(data)) throw new TypeError(`Param 'array' is expected to be an array. Got type: '${typeof data}'`);
  const store = /* @__PURE__ */ new Map();
  for (const value2 of data) {
    const group = groupBy$1(value2);
    if (typeof group !== `string` && typeof group !== `number`) throw new TypeError(`groupBy function is expected to return type string or number. Got type: '${typeof group}' for value: '${value2}'`);
    let groupValue = store.get(group);
    groupValue ??= 0;
    groupValue++;
    store.set(group, groupValue);
  }
  return store;
};
var groupBy = (array$1, grouper) => {
  const map2 = /* @__PURE__ */ new Map();
  for (const a of array$1) {
    const key = grouper(a);
    let existing = map2.get(key);
    if (!existing) {
      existing = [];
      map2.set(key, existing);
    }
    existing.push(a);
  }
  return map2;
};
var uniqueDeep = (arrays, comparer = isEqualDefault2) => {
  const t2 = [];
  const contains$1 = (v) => {
    for (const tValue of t2) if (comparer(tValue, v)) return true;
    return false;
  };
  const flattened = arrays.flat(10);
  for (const v of flattened) if (!contains$1(v)) t2.push(v);
  return t2;
};
var unique = (arrays, toString3 = toStringDefault2) => {
  const matching = /* @__PURE__ */ new Set();
  const t2 = [];
  const flattened = arrays.flat(10);
  for (const a of flattened) {
    const stringRepresentation = toString3(a);
    if (matching.has(stringRepresentation)) continue;
    matching.add(stringRepresentation);
    t2.push(a);
  }
  return t2;
};
var insertAt = (data, index, ...values2) => {
  throwIfFailed(arrayTest(data, `data`), arrayIndexTest(data, index, `index`));
  if (index === data.length - 1) return [...data, ...values2];
  if (index === 0) return [...values2, ...data];
  return [
    ...data.slice(0, index),
    ...values2,
    ...data.slice(index)
  ];
};
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
  const lengths2 = arrays.map((a) => a.length);
  if (!containsIdenticalValues(lengths2)) throw new Error(`Arrays must be of same length`);
  const returnValue = [];
  const length2 = lengths2[0];
  for (let index = 0; index < length2; index++) for (const array$1 of arrays) returnValue.push(array$1[index]);
  return returnValue;
};
var intersection = (arrayA, arrayB, equality = isEqualDefault2) => arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));
var mergeByKey2 = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) for (const mv of m) {
    if (mv === void 0) continue;
    const mk = keyFunction(mv);
    let v = result.get(mk);
    v = v ? reconcile(v, mv) : mv;
    result.set(mk, v);
  }
  return [...result.values()];
};
function* pairwise(values2) {
  resultThrow(arrayTest(values2, `values`));
  if (values2.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values2.length}`);
  for (let index = 1; index < values2.length; index++) yield [values2[index - 1], values2[index]];
}
var pairwiseReduce = (array$1, reducer, initial) => {
  resultThrow(arrayTest(array$1, `arr`));
  if (array$1.length < 2) return initial;
  for (let index = 0; index < array$1.length - 1; index++) initial = reducer(initial, array$1[index], array$1[index + 1]);
  return initial;
};
var shuffle = (dataToShuffle, rand = Math.random) => {
  resultThrow(arrayTest(dataToShuffle, `dataToShuffle`));
  const array$1 = [...dataToShuffle];
  for (let index = array$1.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array$1[index], array$1[index_]] = [array$1[index_], array$1[index]];
  }
  return array$1;
};
var randomElement = (array$1, rand = Math.random) => {
  resultThrow(arrayTest(array$1, `array`));
  return array$1[Math.floor(rand() * array$1.length)];
};
var randomIndex = (array$1, rand = Math.random) => Math.floor(rand() * array$1.length);
var remove = (data, index) => {
  if (!Array.isArray(data)) throw new TypeError(`'data' parameter should be an array`);
  resultThrow(arrayIndexTest(data, index, `index`));
  return [...data.slice(0, index), ...data.slice(index + 1)];
};
var sample = (array$1, amount) => {
  if (!Array.isArray(array$1)) throw new TypeError(`Param 'array' is not actually an array. Got type: ${typeof array$1}`);
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array$1.length * amount;
    subsampleSteps = Math.round(array$1.length / numberOfItems);
  } else subsampleSteps = amount;
  resultThrow(integerTest(subsampleSteps, `positive`, `amount`));
  if (subsampleSteps > array$1.length - 1) throw new Error(`Subsample steps exceeds array length`);
  const r = [];
  for (let index = subsampleSteps - 1; index < array$1.length; index += subsampleSteps) r.push(array$1[index]);
  return r;
};
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  resultThrow(arrayTest(data, `data`));
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});
var sortByProperty = (data, propertyName, comparer) => [...data].sort((a, b) => {
  resultThrow(arrayTest(data, `data`));
  const av = a[propertyName];
  const bv = b[propertyName];
  if (comparer === void 0) {
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  } else return comparer(av, bv);
});
function* until(data, predicate, initial) {
  let total$1 = initial;
  for (const datum of data) {
    const r = predicate(datum, total$1);
    if (typeof r === `boolean`) {
      if (r) break;
    } else {
      const [stop, accumulator] = r;
      if (stop) break;
      total$1 = accumulator;
    }
    yield datum;
  }
}
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var without = (sourceArray, toRemove, comparer = isEqualDefault2) => {
  if (Array.isArray(toRemove)) {
    const returnArray = [];
    for (const source of sourceArray) if (!toRemove.some((v) => comparer(source, v))) returnArray.push(source);
    return returnArray;
  } else return sourceArray.filter((v) => !comparer(v, toRemove));
};
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
  const lengths2 = arrays.map((a) => a.length);
  if (!containsIdenticalValues(lengths2)) throw new Error(`Arrays must be of same length`);
  const returnValue = [];
  const length2 = lengths2[0];
  for (let index = 0; index < length2; index++) returnValue.push(arrays.map((a) => a[index]));
  return returnValue;
};
var src_exports$1 = {};
__export2(src_exports$1, {
  atWrap: () => atWrap,
  chunks: () => chunks,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  containsIdenticalValues: () => containsIdenticalValues,
  cycle: () => cycle,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  frequencyByGroup: () => frequencyByGroup,
  groupBy: () => groupBy,
  insertAt: () => insertAt,
  interleave: () => interleave,
  intersection: () => intersection,
  isEqual: () => isEqual,
  mapWithEmptyFallback: () => mapWithEmptyFallback,
  mergeByKey: () => mergeByKey2,
  pairwise: () => pairwise,
  pairwiseReduce: () => pairwiseReduce,
  randomElement: () => randomElement,
  randomIndex: () => randomIndex,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  sortByProperty: () => sortByProperty,
  unique: () => unique,
  uniqueDeep: () => uniqueDeep,
  until: () => until,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip
});
var applyToValues = (object, apply2) => {
  const o = { ...object };
  for (const [key, value2] of Object.entries(object)) if (typeof value2 === `number`) o[key] = apply2(value2);
  else o[key] = value2;
  return o;
};
var weight = (data, fn) => {
  if (!Array.isArray(data)) throw new TypeError(`Param 'data' is expected to be an array. Got type: ${typeof data}`);
  const weightingFunction = fn ?? ((x) => x);
  return data.map((value2, index) => {
    if (typeof value2 !== `number`) throw new TypeError(`Param 'data' contains non-number at index: '${index}'. Type: '${typeof value2}' value: '${value2}'`);
    const relativePos = index / (data.length - 1);
    const weightForPosition = weightingFunction(relativePos);
    if (typeof weightForPosition !== `number`) throw new TypeError(`Weighting function returned type '${typeof weightForPosition}' rather than number for input: '${relativePos}'`);
    const finalResult = value2 * weightForPosition;
    return finalResult;
  });
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values2) => {
  let r = 0;
  const length2 = values2[0].length;
  for (let index = 0; index < length2; index++) {
    let t2 = 0;
    for (const [p, value2] of values2.entries()) if (p === 0) t2 = value2[index];
    else t2 *= value2[index];
    r += t2;
  }
  return r;
};
var average2 = (data) => {
  if (data === void 0) throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total$1 = valid.reduce((accumulator, v) => accumulator + v, 0);
  return total$1 / valid.length;
};
var min2 = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => data.reduce((bestIndex, value2, index, array$1) => value2 > array$1[bestIndex] ? index : bestIndex, 0);
var minIndex = (...data) => data.reduce((bestIndex, value2, index, array$1) => value2 < array$1[bestIndex] ? index : bestIndex, 0);
var max2 = (data) => Math.max(...validNumbers(data));
var total = (data) => data.reduce((previous, current) => {
  if (typeof current !== `number`) return previous;
  if (Number.isNaN(current)) return previous;
  if (!Number.isFinite(current)) return previous;
  return previous + current;
}, 0);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) m = Math.max(m, datum);
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (const datum of data) m += datum;
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) m = Math.min(m, datum);
  return m;
};
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`) weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce((accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]], [0, 0]);
  return totalV / totalW;
};
var clamp = (value2, min$12 = 0, max$12 = 1) => {
  if (Number.isNaN(value2)) throw new Error(`Param 'value' is NaN`);
  if (Number.isNaN(min$12)) throw new Error(`Param 'min' is NaN`);
  if (Number.isNaN(max$12)) throw new Error(`Param 'max' is NaN`);
  if (value2 < min$12) return min$12;
  if (value2 > max$12) return max$12;
  return value2;
};
var clamper = (min$12 = 0, max$12 = 1) => {
  if (Number.isNaN(min$12)) throw new Error(`Param 'min' is NaN`);
  if (Number.isNaN(max$12)) throw new Error(`Param 'max' is NaN`);
  return (v) => {
    if (v > max$12) return max$12;
    if (v < min$12) return min$12;
    return v;
  };
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) throw new TypeError(`v parameter must be an integer (${v})`);
  const length2 = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length2)) throw new TypeError(`length parameter must be an integer (${length2}, ${typeof length2})`);
  v = Math.round(v);
  if (v < 0) return 0;
  if (v >= length2) return length2 - 1;
  return v;
};
var maxAbs = (...values2) => {
  let index = -1;
  let maxA = Number.MIN_SAFE_INTEGER;
  for (let index_ = 0; index_ < values2.length; index_++) {
    const vA = Math.abs(values2[index_]);
    if (vA > maxA) {
      maxA = vA;
      index = index_;
    }
  }
  return values2[index];
};
function* count(amount, offset2 = 0) {
  resultThrow(integerTest(amount, ``, `amount`), integerTest(offset2, ``, `offset`));
  if (amount === 0) return;
  let index = 0;
  do
    yield amount < 0 ? -index + offset2 : index + offset2;
  while (index++ < Math.abs(amount) - 1);
}
var differenceFromFixed = (initial, kind = `absolute`) => (value2) => differenceFrom(kind, value2, initial);
var differenceFromLast = (kind = `absolute`, initialValue = NaN) => {
  let lastValue = initialValue;
  return (value2) => {
    const x = differenceFrom(kind, value2, lastValue);
    lastValue = value2;
    return x;
  };
};
var differenceFrom = (kind = `absolute`, value2, from2) => {
  if (Number.isNaN(from2)) return 0;
  const d = value2 - from2;
  let r = 0;
  if (kind === `absolute`) r = Math.abs(d);
  else if (kind === `numerical`) r = d;
  else if (kind === `relative`) r = Math.abs(d / from2);
  else if (kind === `relativeSigned`) r = d / from2;
  else throw new TypeError(`Unknown kind: '${kind}' Expected: 'absolute', 'relative', 'relativeSigned' or 'numerical'`);
  return r;
};
var isValid = (possibleNumber) => {
  if (typeof possibleNumber !== `number`) return false;
  if (Number.isNaN(possibleNumber)) return false;
  return true;
};
function* filterIterable(it) {
  for (const v of it) if (isValid(v)) yield v;
}
var thresholdAtLeast = (threshold) => {
  return (v) => {
    return v >= threshold;
  };
};
var rangeInclusive = (min$12, max$12) => {
  return (v) => {
    return v >= min$12 && v <= max$12;
  };
};
var flip = (v) => {
  if (typeof v === `function`) v = v();
  resultThrow(numberTest(v, `percentage`, `v`));
  return 1 - v;
};
var numericRangeRaw = function* (interval2, start = 0, end, repeating = false) {
  if (interval2 <= 0) throw new Error(`Interval is expected to be above zero`);
  if (typeof end === `undefined`) end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do
    while (v < end) {
      yield v;
      v += interval2;
    }
  while (repeating);
};
var numericRange = function* (interval2, start = 0, end, repeating = false, rounding) {
  resultThrow(numberTest(interval2, `nonZero`));
  const negativeInterval = interval2 < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) throw new Error(`Interval of ${interval2.toString()} will never go from ${start.toString()} to ${end.toString()}`);
    if (!negativeInterval && start > end) throw new Error(`Interval of ${interval2.toString()} will never go from ${start.toString()} to ${end.toString()}`);
  }
  rounding = rounding ?? 1e3;
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  else end *= rounding;
  interval2 = interval2 * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval2;
    }
  } while (repeating);
};
var numericPercent = function(interval2 = 0.01, repeating = false, start = 0, end = 1) {
  resultThrow(numberTest(interval2, `percentage`, `interval`), numberTest(start, `percentage`, `start`), numberTest(end, `percentage`, `end`));
  return numericRange(interval2, start, end, repeating);
};
function round2(a, b, roundUp) {
  resultThrow(integerTest(a, `positive`, `decimalPlaces`));
  const up = typeof b === `boolean` ? b : roundUp ?? false;
  let rounder;
  if (a === 0) rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    if (up) rounder = (v) => Math.ceil(v * p) / p;
    else rounder = (v) => Math.floor(v * p) / p;
  }
  if (typeof b === `number`) return rounder(b);
  return rounder;
}
function isApprox(rangePercent, baseValue, v) {
  resultThrow(numberTest(rangePercent, `percentage`, `rangePercent`));
  const range = Math.floor(rangePercent * 100);
  const test2 = (base, value2) => {
    try {
      if (typeof value2 !== `number`) return false;
      if (Number.isNaN(value2)) return false;
      if (!Number.isFinite(value2)) return false;
      const diff = Math.abs(value2 - base);
      const relative2 = base === 0 ? Math.floor(diff * 100) : Math.floor(diff / base * 100);
      return relative2 <= range;
    } catch {
      return false;
    }
  };
  if (baseValue === void 0) return test2;
  resultThrow(numberTest(baseValue, ``, `baseValue`));
  if (v === void 0) return (value2) => test2(baseValue, value2);
  else return test2(baseValue, v);
}
var isCloseToAny = (allowedRangeAbsolute, ...targets) => {
  const targetsMin = targets.map((t2) => t2 - allowedRangeAbsolute);
  const targetsMax = targets.map((t2) => t2 + allowedRangeAbsolute);
  return (...values2) => {
    for (const v of values2) for (let index = 0; index < targets.length; index++) if (v >= targetsMin[index] && v <= targetsMax[index]) return true;
    return false;
  };
};
var bipolar_exports = {};
__export2(bipolar_exports, {
  clamp: () => clamp$1,
  fromScalar: () => fromScalar,
  immutable: () => immutable,
  scale: () => scale$1,
  scaleUnclamped: () => scaleUnclamped,
  toScalar: () => toScalar,
  towardZero: () => towardZero
});
var immutable = (startingValueOrBipolar = 0) => {
  if (typeof startingValueOrBipolar === `undefined`) throw new Error(`Start value is undefined`);
  const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
  if (startingValue > 1) throw new Error(`Start value cannot be larger than 1`);
  if (startingValue < -1) throw new Error(`Start value cannot be smaller than -1`);
  if (Number.isNaN(startingValue)) throw new Error(`Start value is NaN`);
  const v = startingValue;
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === `number`) return v;
      else if (hint === `string`) return v.toString();
      return true;
    },
    value: v,
    towardZero: (amt) => {
      return immutable(towardZero(v, amt));
    },
    add: (amt) => {
      return immutable(clamp$1(v + amt));
    },
    multiply: (amt) => {
      return immutable(clamp$1(v * amt));
    },
    inverse: () => {
      return immutable(-v);
    },
    interpolate: (amt, b) => {
      return immutable(clamp$1(interpolate(amt, v, b)));
    },
    asScalar: (max$12 = 1, min$12 = 0) => {
      return toScalar(v, max$12, min$12);
    }
  };
};
var toScalar = (bipolarValue, max$12 = 1, min$12 = 0) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Expected v to be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`Parameter is NaN`);
  return scale(bipolarValue, -1, 1, min$12, max$12);
};
var fromScalar = (scalarValue) => {
  resultThrow(numberTest(scalarValue, `percentage`, `v`));
  return scalarValue * 2 - 1;
};
var scale$1 = (inputValue, inMin, inMax) => {
  return clamp$1(scaler(inMin, inMax, -1, 1)(inputValue));
};
var scaleUnclamped = (inputValue, inMin, inMax) => {
  return scaler(inMin, inMax, -1, 1)(inputValue);
};
var clamp$1 = (bipolarValue) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Param 'bipolarValue' must be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`Param 'bipolarValue' is NaN`);
  if (bipolarValue > 1) return 1;
  if (bipolarValue < -1) return -1;
  return bipolarValue;
};
var towardZero = (bipolarValue, amount) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Parameter 'v' must be a number. Got: ${typeof bipolarValue}`);
  if (typeof amount !== `number`) throw new Error(`Parameter 'amt' must be a number. Got: ${typeof amount}`);
  if (amount < 0) throw new Error(`Parameter 'amt' must be positive`);
  if (bipolarValue < 0) {
    bipolarValue += amount;
    if (bipolarValue > 0) bipolarValue = 0;
  } else if (bipolarValue > 0) {
    bipolarValue -= amount;
    if (bipolarValue < 0) bipolarValue = 0;
  }
  return bipolarValue;
};
var wrapInteger = (v, min$12 = 0, max$12 = 360) => {
  resultThrow(integerTest(v, void 0, `v`), integerTest(min$12, void 0, `min`), integerTest(max$12, void 0, `max`));
  if (v === min$12) return min$12;
  if (v === max$12) return min$12;
  if (v > 0 && v < min$12) v += min$12;
  v -= min$12;
  max$12 -= min$12;
  v = v % max$12;
  if (v < 0) v = max$12 - Math.abs(v) + min$12;
  return v + min$12;
};
var wrap = (v, min$12 = 0, max$12 = 1) => {
  resultThrow(numberTest(v, ``, `min`), numberTest(min$12, ``, `min`), numberTest(max$12, ``, `max`));
  if (v === min$12) return min$12;
  if (v === max$12) return min$12;
  while (v <= min$12 || v >= max$12) {
    if (v === max$12) break;
    if (v === min$12) break;
    if (v > max$12) v = min$12 + (v - max$12);
    else if (v < min$12) v = max$12 - (min$12 - v);
  }
  return v;
};
var wrapRange = (min$12, max$12, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max$12 - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) r = a - fn(distMin);
  else if (distMin === distFwrap) r = a + fn(distMin);
  else if (a > b) r = a - fn(distMin);
  else r = a + fn(distMin);
  return wrapInteger(r, min$12, max$12);
};
var piPi = Math.PI * 2;
function interpolate(pos1, pos2, pos3, pos4) {
  let amountProcess;
  let limits = `clamp`;
  const handleAmount = (amount) => {
    if (amountProcess) amount = amountProcess(amount);
    if (limits === void 0 || limits === `clamp`) amount = clamp(amount);
    else if (limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) amount = 1 + amount % 1;
    }
    return amount;
  };
  const doTheEase = (_amt, _a, _b) => {
    resultThrow(numberTest(_a, ``, `a`), numberTest(_b, ``, `b`), numberTest(_amt, ``, `amount`));
    _amt = handleAmount(_amt);
    return (1 - _amt) * _a + _amt * _b;
  };
  const readOpts = (o = {}) => {
    if (o.transform) {
      if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
      amountProcess = o.transform;
    }
    limits = o.limits ?? `clamp`;
  };
  const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
  if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
  if (typeof pos2 === `number`) {
    let a;
    let b;
    if (pos3 === void 0 || typeof pos3 === `object`) {
      a = pos1;
      b = pos2;
      readOpts(pos3);
      return (amount) => doTheEase(amount, a, b);
    } else if (typeof pos3 === `number`) {
      a = pos2;
      b = pos3;
      readOpts(pos4);
      return doTheEase(pos1, a, b);
    } else throw new Error(`Values for 'a' and 'b' not defined`);
  } else if (pos2 === void 0 || typeof pos2 === `object`) {
    const amount = handleAmount(pos1);
    readOpts(pos2);
    resultThrow(numberTest(amount, ``, `amount`));
    return (aValue, bValue) => rawEase(amount, aValue, bValue);
  }
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0, options) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value2 = interpolate(amount, a, b, options);
    amount += incrementAmount;
    return value2;
  };
};
var interpolateAngle = (amount, aRadians, bRadians, options) => {
  const t2 = wrap(bRadians - aRadians, 0, piPi);
  return interpolate(amount, aRadians, aRadians + (t2 > Math.PI ? t2 - piPi : t2), options);
};
function* linearSpace(start, end, steps, precision) {
  resultThrow(numberTest(start, ``, `start`), numberTest(end, ``, `end`), numberTest(steps, ``, `steps`));
  const r = precision ? round2(precision) : (v) => v;
  const step = (end - start) / (steps - 1);
  resultThrow(numberTest(step, ``, `step`));
  if (!Number.isFinite(step)) throw new TypeError(`Calculated step value is infinite`);
  for (let index = 0; index < steps; index++) {
    const v = start + step * index;
    yield r(v);
  }
}
var BasicQueueMutable = class {
  #store = [];
  enqueue(data) {
    this.#store.push(data);
  }
  dequeue() {
    return this.#store.shift();
  }
  get data() {
    return this.#store;
  }
  get size() {
    return this.#store.length;
  }
};
var PiPi = Math.PI * 2;
var movingAverageLight = (scaling = 3) => {
  resultThrow(numberTest(scaling, `aboveZero`, `scaling`));
  let average$12 = 0;
  let count$1 = 0;
  return (v) => {
    const r = numberTest(v, ``, `v`);
    if (r.success && v !== void 0) {
      count$1++;
      average$12 = average$12 + (v - average$12) / Math.min(count$1, scaling);
    }
    return average$12;
  };
};
var movingAverage = (samples = 100, weighter) => {
  const q = new BasicQueueMutable();
  return (v) => {
    const r = numberTest(v);
    if (r.success && v !== void 0) {
      q.enqueue(v);
      while (q.size > samples) q.dequeue();
    }
    return weighter === void 0 ? average2(q.data) : averageWeighted(q.data, weighter);
  };
};
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor$1, value2, previous) => {
  return smoothingFactor$1 * value2 + (1 - smoothingFactor$1) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value2, timestamp2) => {
    timestamp2 ??= performance.now();
    const timeDelta = timestamp2 - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value2 - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value2, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp2;
    return smoothed;
  };
  return compute;
};
var scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
var scaler = (inMin, inMax, outMin, outMax, easing, clamped) => {
  resultThrow(numberTest(inMin, `finite`, `inMin`), numberTest(inMax, `finite`, `inMax`));
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  const clampFunction = clamped ? clamper(outMin, outMax) : void 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a = easing(a);
    const x = a * (oMax - oMin) + oMin;
    if (clampFunction) return clampFunction(x);
    return x;
  };
};
var scalerNull = () => (v) => v;
var scaleClamped = (v, inMin, inMax, outMin, outMax, easing) => {
  if (typeof outMax === `undefined`) outMax = 1;
  if (typeof outMin === `undefined`) outMin = 0;
  if (inMin === inMax) return outMax;
  const x = scale(v, inMin, inMax, outMin, outMax, easing);
  return clamp(x, outMin, outMax);
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  resultThrow(numberTest(percentage, `percentage`, `v`), numberTest(outMin, `percentage`, `outMin`), numberTest(outMax, `percentage`, `outMax`));
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => scalerPercent(outMin, outMax)(v);
var scalerPercent = (outMin, outMax) => {
  return (v) => {
    resultThrow(numberTest(v, `percentage`, `v`));
    return scale(v, 0, 1, outMin, outMax);
  };
};
var scalerTwoWay = (inMin, inMax, outMin = 0, outMax = 1, clamped = false, easing) => {
  const toOut = scaler(inMin, inMax, outMin, outMax, easing, clamped);
  const toIn = scaler(outMin, outMax, inMin, inMax, easing, clamped);
  return {
    out: toOut,
    in: toIn
  };
};
var numberArrayCompute = (data, opts = {}) => {
  if (data.length === 0) return {
    total: NaN,
    min: NaN,
    max: NaN,
    avg: NaN,
    count: NaN
  };
  const nonNumbers = opts.nonNumbers ?? `throw`;
  let total$1 = 0;
  let min$12 = Number.MAX_SAFE_INTEGER;
  let max$12 = Number.MIN_SAFE_INTEGER;
  let count$1 = 0;
  for (let index = 0; index < data.length; index++) {
    let value2 = data[index];
    if (typeof value2 !== `number`) {
      if (nonNumbers === `ignore`) continue;
      if (nonNumbers === `throw`) throw new Error(`Param 'data' contains a non-number at index: ${index.toString()}`);
      if (nonNumbers === `nan`) value2 = NaN;
    }
    if (Number.isNaN(value2)) continue;
    if (value2 !== void 0) {
      min$12 = Math.min(min$12, value2);
      max$12 = Math.max(max$12, value2);
      total$1 += value2;
      count$1++;
    }
  }
  return {
    total: total$1,
    max: max$12,
    min: min$12,
    count: count$1,
    avg: total$1 / count$1
  };
};
var normalise_exports = {};
__export2(normalise_exports, {
  array: () => array,
  arrayWithContext: () => arrayWithContext,
  stream: () => stream,
  streamWithContext: () => streamWithContext
});
var streamWithContext = (minDefault, maxDefault) => {
  let min$12 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max$12 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  resultThrow(numberTest(min$12), numberTest(max$12));
  return {
    seen: (v) => {
      resultThrow(numberTest(v));
      min$12 = Math.min(min$12, v);
      max$12 = Math.max(max$12, v);
      return scale(v, min$12, max$12);
    },
    reset: (minDefault$1, maxDefault$1) => {
      min$12 = minDefault$1 ?? Number.MAX_SAFE_INTEGER;
      max$12 = maxDefault$1 ?? Number.MIN_SAFE_INTEGER;
    },
    get min() {
      return min$12;
    },
    get max() {
      return max$12;
    },
    get range() {
      return Math.abs(max$12 - min$12);
    }
  };
};
var stream = (minDefault, maxDefault) => {
  const c = streamWithContext(minDefault, maxDefault);
  return c.seen;
};
var arrayWithContext = (values2, minForced, maxForced) => {
  if (!Array.isArray(values2)) throw new TypeError(`Param 'values' should be an array. Got: ${typeof values2}`);
  const mma = numberArrayCompute(values2);
  const min$12 = minForced ?? mma.min;
  const max$12 = maxForced ?? mma.max;
  return {
    values: values2.map((v) => clamp(scale(v, min$12, max$12))),
    original: values2,
    min: min$12,
    max: max$12,
    range: Math.abs(max$12 - min$12)
  };
};
var array = (values2, minForced, maxForced) => {
  const c = arrayWithContext(values2, minForced, maxForced);
  return c.values;
};
var proportion = (v, t2) => {
  if (typeof v === `function`) v = v();
  if (typeof t2 === `function`) t2 = t2();
  resultThrow(numberTest(v, `percentage`, `v`), numberTest(t2, `percentage`, `t`));
  return v * t2;
};
var quantiseEvery = (v, every2, middleRoundsUp = true) => {
  const everyString = every2.toString();
  const decimal = everyString.indexOf(`.`);
  let multiplier = 1;
  if (decimal >= 0) {
    const d = everyString.substring(decimal + 1).length;
    multiplier = 10 * d;
    every2 = Math.floor(multiplier * every2);
    v = v * multiplier;
  }
  resultThrow(numberTest(v, ``, `v`), integerTest(every2, ``, `every`));
  let div = v / every2;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5) div++;
  const vv = every2 * div / multiplier;
  return vv;
};
function rangeMergeValue(value2, previous, nonNumberHandling = `skip`) {
  if (typeof value2 === `number`) {
    if (Number.isNaN(value2) || !Number.isFinite(value2)) {
      if (nonNumberHandling === `error`) throw new TypeError(`Param 'value' is NaN or infinite, and nonNumberHandling is set to 'error'`);
      return previous;
    }
    if (value2 >= previous.min && value2 <= previous.max) return previous;
    return {
      min: Math.min(value2, previous.min),
      max: Math.max(value2, previous.max)
    };
  } else if (nonNumberHandling === `error`) throw new TypeError(`Param 'value' is not a number (type: '${typeof value2}') and nonNumberHandling is set to 'error'`);
  return previous;
}
function rangeScaler(range, outMax = 1, outMin = 0, easing, clamped = true) {
  return scaler(range.min, range.max, outMin, outMax, easing, clamped);
}
function rangeMergeRange(newRange, existingRange) {
  if (newRange.max <= existingRange.max && newRange.min >= existingRange.min) return existingRange;
  return {
    min: Math.min(newRange.min, existingRange.min),
    max: Math.max(newRange.max, existingRange.max)
  };
}
var rangeInit = () => ({
  min: Number.MAX_SAFE_INTEGER,
  max: Number.MIN_SAFE_INTEGER
});
var rangeIsEqual = (a, b) => {
  if (typeof a === `undefined`) return false;
  if (typeof b === `undefined`) return false;
  return a.max === b.max && a.min === b.min;
};
var rangeIsWithin = (a, b) => {
  if (typeof a === `undefined`) return false;
  if (typeof b === `undefined`) return false;
  if (a.min >= b.min && a.max <= b.max) return true;
  return false;
};
var rangeStream = (initWith = rangeInit()) => {
  let { min: min$12, max: max$12 } = initWith;
  const seen = (v) => {
    if (typeof v === `number`) {
      if (!Number.isNaN(v) && Number.isFinite(v)) {
        min$12 = Math.min(min$12, v);
        max$12 = Math.max(max$12, v);
      }
    }
    return {
      min: min$12,
      max: max$12
    };
  };
  const reset2 = () => {
    min$12 = Number.MAX_SAFE_INTEGER;
    max$12 = Number.MIN_SAFE_INTEGER;
  };
  return {
    seen,
    reset: reset2,
    get range() {
      return {
        min: min$12,
        max: max$12
      };
    },
    get min() {
      return min$12;
    },
    get max() {
      return max$12;
    }
  };
};
function rangeCompute(values2, nonNumberHandling = `skip`) {
  let min$12 = Number.MAX_SAFE_INTEGER;
  let max$12 = Number.MIN_SAFE_INTEGER;
  let position = 0;
  for (const v of values2) {
    if (typeof v === `number`) {
      if (Number.isNaN(v) || !Number.isFinite(v)) {
        if (nonNumberHandling === `error`) throw new Error(`Value NaN or infinite at position: ${position}`);
        continue;
      }
    } else {
      if (nonNumberHandling === `error`) throw new Error(`Contains non number value. Type: '${typeof v}' Position: ${position}`);
      continue;
    }
    if (v < min$12) min$12 = v;
    if (v > max$12) max$12 = v;
    position++;
  }
  return {
    min: min$12,
    max: max$12
  };
}
var softmax = (logits) => {
  const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
  const scores = logits.map((l) => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map((s) => s / denom);
};
var trackSimple = () => {
  let count$1 = 0;
  let min$12 = Number.MAX_SAFE_INTEGER;
  let max$12 = Number.MIN_SAFE_INTEGER;
  let total$1 = 0;
  const seen = (v) => {
    min$12 = Math.min(v, min$12);
    max$12 = Math.max(v, max$12);
    total$1 += v;
    count$1++;
  };
  const reset2 = () => {
    count$1 = 0;
    min$12 = Number.MAX_SAFE_INTEGER;
    max$12 = Number.MIN_SAFE_INTEGER;
    total$1 = 0;
  };
  const rangeToString = (digits = 2) => {
    return `${min$12.toFixed(2)} - ${max$12.toFixed(2)}`;
  };
  return {
    seen,
    reset: reset2,
    rangeToString,
    get avg() {
      return total$1 / count$1;
    },
    get min() {
      return min$12;
    },
    get max() {
      return max$12;
    },
    get total() {
      return total$1;
    },
    get count() {
      return count$1;
    }
  };
};
var src_exports2 = {};
__export2(src_exports2, {
  Bipolar: () => bipolar_exports,
  Normalise: () => normalise_exports,
  applyToValues: () => applyToValues,
  average: () => average2,
  averageWeighted: () => averageWeighted,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  clamper: () => clamper,
  count: () => count,
  differenceFromFixed: () => differenceFromFixed,
  differenceFromLast: () => differenceFromLast,
  dotProduct: () => dotProduct,
  filterIterable: () => filterIterable,
  flip: () => flip,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  interpolatorStepped: () => interpolatorStepped,
  isApprox: () => isApprox,
  isCloseToAny: () => isCloseToAny,
  isValid: () => isValid,
  linearSpace: () => linearSpace,
  max: () => max2,
  maxAbs: () => maxAbs,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  min: () => min2,
  minFast: () => minFast,
  minIndex: () => minIndex,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  noiseFilter: () => noiseFilter,
  numberArrayCompute: () => numberArrayCompute,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  proportion: () => proportion,
  quantiseEvery: () => quantiseEvery,
  rangeCompute: () => rangeCompute,
  rangeInclusive: () => rangeInclusive,
  rangeInit: () => rangeInit,
  rangeIsEqual: () => rangeIsEqual,
  rangeIsWithin: () => rangeIsWithin,
  rangeMergeRange: () => rangeMergeRange,
  rangeMergeValue: () => rangeMergeValue,
  rangeScaler: () => rangeScaler,
  rangeStream: () => rangeStream,
  round: () => round2,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler,
  scalerNull: () => scalerNull,
  scalerPercent: () => scalerPercent,
  scalerTwoWay: () => scalerTwoWay,
  softmax: () => softmax,
  thresholdAtLeast: () => thresholdAtLeast,
  total: () => total,
  totalFast: () => totalFast,
  trackSimple: () => trackSimple,
  validNumbers: () => validNumbers,
  weight: () => weight,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// node_modules/ixfx/bundle/src-BC3BytBO.js
var defaultKeyer = (a) => {
  return typeof a === `string` ? a : JSON.stringify(a);
};
var abbreviate = (source, maxLength = 15) => {
  resultThrow(integerTest(maxLength, `aboveZero`, `maxLength`));
  if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
  if (source.length > maxLength && source.length > 3) {
    if (maxLength > 15) {
      const chunk$1 = Math.round((maxLength - 2) / 2);
      return source.slice(0, chunk$1) + `...` + source.slice(-chunk$1);
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
var isAsyncIterable = (v) => {
  if (typeof v !== `object`) return false;
  if (v === null) return false;
  return Symbol.asyncIterator in v;
};
var isIterable = (v) => {
  if (typeof v !== `object`) return false;
  if (v === null) return false;
  return Symbol.iterator in v;
};
function* slice$2(it, start = 0, end = Number.POSITIVE_INFINITY) {
  if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
  if (start < 0) throw new Error(`Param 'start' should be at least 0`);
  let index = 0;
  for (const v of it) {
    if (index < start) {
      index++;
      continue;
    }
    if (index > end) break;
    yield v;
    index++;
  }
}
function reduce$3(it, f, start) {
  for (const v of it) start = f(start, v);
  return start;
}
var sync_exports = {};
__export2(sync_exports, {
  asCallback: () => asCallback$3,
  chunks: () => chunks$2,
  chunksOverlapping: () => chunksOverlapping,
  concat: () => concat$2,
  dropWhile: () => dropWhile$2,
  equals: () => equals$2,
  every: () => every$2,
  fill: () => fill$2,
  filter: () => filter$3,
  find: () => find$2,
  first: () => first,
  flatten: () => flatten$2,
  forEach: () => forEach$2,
  fromArray: () => fromArray$2,
  fromIterable: () => fromIterable$2,
  last: () => last$2,
  map: () => map$2,
  max: () => max$4,
  min: () => min$4,
  next: () => next,
  reduce: () => reduce$3,
  repeat: () => repeat$1,
  slice: () => slice$2,
  some: () => some$3,
  toArray: () => toArray$2,
  unique: () => unique$2,
  uniqueByValue: () => uniqueByValue$2,
  until: () => until$2,
  yieldNumber: () => yieldNumber,
  zip: () => zip$2
});
function* uniqueByValue$2(input, toString3 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for (const v of input) {
    const key = toString3(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
function asCallback$3(input, callback, onDone) {
  for (const value2 of input) callback(value2);
  if (onDone) onDone();
}
function yieldNumber(generator, defaultValue) {
  return () => {
    const v = generator.next().value;
    if (v === void 0) return defaultValue;
    return v;
  };
}
function first(it) {
  for (const value2 of it) return value2;
}
function last$2(it) {
  let returnValue;
  for (const value2 of it) returnValue = value2;
  return returnValue;
}
function* chunksOverlapping(it, size) {
  if (size <= 1) throw new Error(`Size should be at least 2`);
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [buffer.at(-1)];
    }
  }
  if (buffer.length <= 1) return;
  if (buffer.length > 0) yield buffer;
}
function* chunks$2(it, size) {
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
}
function* concat$2(...its) {
  for (const it of its) yield* it;
}
function* dropWhile$2(it, f) {
  for (const v of it) if (!f(v)) yield v;
}
var until$2 = (it, callback) => {
  for (const _ of it) {
    const value2 = callback();
    if (typeof value2 === `boolean` && !value2) break;
  }
};
var next = (it) => {
  return () => {
    const r = it.next();
    if (r.done) return;
    return r.value;
  };
};
function equals$2(it1, it2, equality) {
  while (true) {
    const index1 = it1.next(), index2 = it2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
function every$2(it, f) {
  for (const v of it) {
    const result = f(v);
    if (!result) return false;
  }
  return true;
}
function* fill$2(it, v) {
  for (const _ of it) yield v;
}
function forEach$2(iterator, fn) {
  for (const v of iterator) {
    const result = fn(v);
    if (typeof result === `boolean` && !result) break;
  }
}
function* filter$3(it, f) {
  for (const v of it) {
    if (!f(v)) continue;
    yield v;
  }
}
function find$2(it, f) {
  for (const v of it) if (f(v)) return v;
}
function* flatten$2(it) {
  for (const v of it) if (typeof v === `object`) {
    if (Array.isArray(v)) for (const vv of v) yield vv;
    else if (isIterable(v)) for (const vv of v) yield vv;
  } else yield v;
}
function* map$2(it, f) {
  for (const v of it) yield f(v);
}
function* max$4(it, gt = (a, b) => a > b) {
  let max$5;
  for (const v of it) {
    if (max$5 === void 0) {
      max$5 = v;
      yield max$5;
      continue;
    }
    if (gt(v, max$5)) {
      max$5 = v;
      yield max$5;
    }
  }
  return max$5;
}
function* min$4(it, gt = (a, b) => a > b) {
  let min$5;
  for (const v of it) {
    if (min$5 === void 0) {
      min$5 = v;
      yield min$5;
    }
    if (gt(min$5, v)) {
      min$5 = v;
      yield min$5;
    }
  }
}
function some$3(it, f) {
  for (const v of it) if (f(v)) return true;
  return false;
}
function* repeat$1(genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count3 = repeats;
  while (true) {
    for (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count3--;
      if (count3 === 0) break;
    }
    if (signal?.aborted) break;
  }
}
function* unique$2(iterable$1) {
  const buffer = [];
  let itera = [];
  itera = Array.isArray(iterable$1) ? iterable$1 : [iterable$1];
  for (const it of itera) for (const v of it) {
    if (buffer.includes(v)) continue;
    buffer.push(v);
    yield v;
  }
}
function* zip$2(...its) {
  const iits = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const vs = iits.map((it) => it.next());
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}
function* fromIterable$2(iterable$1) {
  for (const v of iterable$1) yield v;
}
function toArray$2(it, options = {}) {
  const result = [];
  const started = Date.now();
  const whileFunction = options.while;
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  for (const v of it) {
    if (whileFunction) {
      if (!whileFunction(result.length)) break;
    }
    if (result.length >= maxItems) break;
    if (Date.now() - started > maxElapsed) break;
    result.push(v);
  }
  return result;
}
function* fromArray$2(array$1) {
  for (const v of array$1) yield v;
}
var MapOfSimple = class {
  #store = /* @__PURE__ */ new Map();
  /**
  * Gets a copy of the underlying array storing values at `key`, or an empty array if
  * key does not exist
  * @param key
  * @returns
  */
  get(key) {
    const arr = this.#store.get(key);
    if (!arr) return [];
    return [...arr];
  }
  /**
  * Returns the number of values stored under `key`
  * @param key
  * @returns
  */
  size(key) {
    const arr = this.#store.get(key);
    if (!arr) return 0;
    return arr.length;
  }
  /**
  * Iterate over all values contained under `key`
  * @param key
  * @returns
  */
  *iterateKey(key) {
    const arr = this.#store.get(key);
    if (!arr) return;
    yield* arr.values();
  }
  /**
  * Iterate all values, regardless of key
  */
  *iterateValues() {
    for (const key of this.#store.keys()) yield* this.iterateKey(key);
  }
  /**
  * Iterate all keys
  */
  *iterateKeys() {
    yield* this.#store.keys();
  }
  addKeyedValues(key, ...values2) {
    let arr = this.#store.get(key);
    if (!arr) {
      arr = [];
      this.#store.set(key, arr);
    }
    arr.push(...values2);
  }
  deleteKeyValue(key, value2) {
    const arr = this.#store.get(key);
    if (!arr) return false;
    const arrCopy = arr.filter((v) => v !== value2);
    if (arrCopy.length === arr.length) return false;
    this.#store.set(key, arrCopy);
    return true;
  }
  clear() {
    this.#store.clear();
  }
};
var SimpleEventEmitter = class {
  #listeners = new MapOfSimple();
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
  fireEvent(type, args) {
    if (this.#disposed) throw new Error(`Disposed`);
    for (const l of this.#listeners.iterateKey(type)) l(args, this);
  }
  /**
  * Adds event listener.
  *
  * @throws Error if emitter is disposed
  * @typeParam K - Events
  * @param name Event name
  * @param listener Event handler
  */
  addEventListener(name, listener) {
    if (this.#disposed) throw new Error(`Disposed`);
    this.#listeners.addKeyedValues(name, listener);
  }
  /**
  * Remove event listener
  *
  * @param listener
  */
  removeEventListener(type, listener) {
    if (this.#disposed) return;
    this.#listeners.deleteKeyValue(type, listener);
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
var src_exports$12 = {};
__export2(src_exports$12, { SimpleEventEmitter: () => SimpleEventEmitter });
var async_exports = {};
__export2(async_exports, {
  asCallback: () => asCallback$2,
  chunks: () => chunks$1,
  concat: () => concat$1,
  dropWhile: () => dropWhile$1,
  equals: () => equals$1,
  every: () => every$1,
  fill: () => fill$1,
  filter: () => filter$2,
  find: () => find$1,
  flatten: () => flatten$1,
  forEach: () => forEach$1,
  fromArray: () => fromArray$1,
  fromIterable: () => fromIterable$1,
  last: () => last$1,
  map: () => map$1,
  max: () => max$3,
  min: () => min$3,
  nextWithTimeout: () => nextWithTimeout,
  reduce: () => reduce$2,
  repeat: () => repeat,
  slice: () => slice$1,
  some: () => some$2,
  toArray: () => toArray$1,
  unique: () => unique$1,
  uniqueByValue: () => uniqueByValue$1,
  until: () => until$1,
  withDelay: () => withDelay,
  zip: () => zip$1
});
async function* fromArray$1(array$1, interval2 = 1) {
  for (const v of array$1) {
    yield v;
    await sleep(interval2);
  }
}
async function* fromIterable$1(iterable$1, interval2 = 1) {
  for await (const v of iterable$1) {
    yield v;
    await sleep(interval2);
  }
}
async function* chunks$1(it, size) {
  let buffer = [];
  for await (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
}
async function* concat$1(...its) {
  for await (const it of its) yield* it;
}
async function* dropWhile$1(it, f) {
  for await (const v of it) if (!f(v)) yield v;
}
var until$1 = async (it, callback) => {
  for await (const _ of it) {
    const value2 = await callback();
    if (typeof value2 === `boolean` && !value2) break;
  }
};
var repeat = async function* (genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count3 = repeats;
  while (true) {
    for await (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count3--;
      if (count3 === 0) break;
    }
    if (signal?.aborted) break;
  }
};
async function equals$1(it1, it2, equality) {
  const iit1 = it1[Symbol.asyncIterator]();
  const iit2 = it2[Symbol.asyncIterator]();
  while (true) {
    const index1 = await iit1.next();
    const index2 = await iit2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
async function every$1(it, f) {
  for await (const v of it) {
    const result = await f(v);
    if (!result) return false;
  }
  return true;
}
async function* fill$1(it, v) {
  for await (const _ of it) yield v;
}
async function* filter$2(it, f) {
  for await (const v of it) {
    if (!await f(v)) continue;
    yield v;
  }
}
async function find$1(it, f) {
  for await (const v of it) if (await f(v)) return v;
}
async function* flatten$1(it) {
  for await (const v of it) if (typeof v === `object`) {
    if (Array.isArray(v)) for (const vv of v) yield vv;
    else if (isAsyncIterable(v)) for await (const vv of v) yield vv;
    else if (isIterable(v)) for (const vv of v) yield vv;
  } else yield v;
}
var forEach$1 = async function(iterator, fn, options = {}) {
  const interval2 = options.interval;
  if (Array.isArray(iterator)) for (const x of iterator) {
    const r = await fn(x);
    if (typeof r === `boolean` && !r) break;
    if (interval2) await sleep(interval2);
  }
  else for await (const x of iterator) {
    const r = await fn(x);
    if (typeof r === `boolean` && !r) break;
    if (interval2) await sleep(interval2);
  }
};
async function last$1(it, opts = {}) {
  const abort = opts.abort;
  let returnValue;
  for await (const value2 of it) {
    if (abort?.aborted) return void 0;
    returnValue = value2;
  }
  return returnValue;
}
async function* map$1(it, f) {
  for await (const v of it) yield f(v);
}
async function* max$3(it, gt = (a, b) => a > b) {
  let max$5;
  for await (const v of it) {
    if (max$5 === void 0) {
      max$5 = v;
      yield max$5;
      continue;
    }
    if (gt(v, max$5)) {
      max$5 = v;
      yield v;
    }
  }
}
async function* min$3(it, gt = (a, b) => a > b) {
  let min$5;
  for await (const v of it) {
    if (min$5 === void 0) {
      min$5 = v;
      yield min$5;
      continue;
    }
    if (gt(min$5, v)) {
      min$5 = v;
      yield v;
    }
  }
  return min$5;
}
async function reduce$2(it, f, start) {
  for await (const v of it) start = f(start, v);
  return start;
}
async function asCallback$2(input, callback, onDone) {
  for await (const value2 of input) callback(value2);
  if (onDone) onDone();
}
async function* slice$1(it, start = 0, end = Number.POSITIVE_INFINITY) {
  console.log(`Async slice start: ${start}`);
  const iit = it[Symbol.asyncIterator]();
  if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
  for (; start > 0; start--, end--) await iit.next();
  for await (const v of it) if (end-- > 0) yield v;
  else break;
}
async function* withDelay(it, delay$1) {
  for (const v of it) {
    await sleep(delay$1);
    yield v;
  }
}
async function nextWithTimeout(it, options) {
  const ms = intervalToMs(options, 1e3);
  const value2 = await Promise.race([(async () => {
    await sleep({
      millis: ms,
      signal: options.signal
    });
    return void 0;
  })(), (async () => {
    return await it.next();
  })()]);
  if (value2 === void 0) throw new Error(`Timeout`);
  return value2;
}
async function some$2(it, f) {
  for await (const v of it) if (await f(v)) return true;
  return false;
}
async function toArray$1(it, options = {}) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  const started = Date.now();
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const whileFunction = options.while;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  while (result.length < maxItems && Date.now() - started < maxElapsed) {
    if (whileFunction) {
      if (!whileFunction(result.length)) break;
    }
    const r = await iterator.next();
    if (r.done) break;
    result.push(r.value);
  }
  return result;
}
async function* unique$1(iterable$1) {
  const buffer = [];
  const itera = Array.isArray(iterable$1) ? iterable$1 : [iterable$1];
  for await (const it of itera) for await (const v of it) {
    if (buffer.includes(v)) continue;
    buffer.push(v);
    yield v;
  }
}
async function* uniqueByValue$1(input, toString3 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for await (const v of input) {
    const key = toString3(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
async function* zip$1(...its) {
  const iits = its.map((it) => it[Symbol.asyncIterator]());
  while (true) {
    const vs = await Promise.all(iits.map((it) => it.next()));
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}
function isGenFactoryNoInput(c) {
  if (!(`_type` in c)) return false;
  if (c._type === `GenFactoryNoInput`) return true;
  return false;
}
function* primitiveToGenerator(value2) {
  yield value2;
}
async function* primitiveToAsyncGenerator(value2) {
  yield value2;
  await sleep(1);
}
function resolveToGen(input) {
  if (Array.isArray(input)) {
    const a = input.values();
    a._name = `arrayInput`;
    return a;
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) return primitiveToGenerator(input);
  else if (typeof input === `function`) return input();
  return input;
}
function resolveToAsyncGen(input) {
  if (input === void 0) return;
  if (Array.isArray(input)) return fromArray$1(input);
  else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) return primitiveToAsyncGenerator(input);
  else if (typeof input === `function`) return input();
  else if (isAsyncIterable(input)) return input;
  return fromIterable$1(input);
}
function resolveEl(elOrQuery) {
  if (typeof elOrQuery === `string`) {
    const el = document.querySelector(elOrQuery);
    if (!el) throw new Error(`Element not found '${elOrQuery}'`);
    return el;
  }
  return elOrQuery;
}
var dom_exports = {};
__export2(dom_exports, {
  perValue: () => perValue,
  query: () => query
});
var createMap = (key) => {
  const keyFunction = key ?? ((value2) => value2);
  const map$3 = /* @__PURE__ */ new Map();
  return {
    has(key$1) {
      return map$3.has(keyFunction(key$1));
    },
    get(key$1) {
      return map$3.get(keyFunction(key$1));
    },
    set(key$1, value2) {
      map$3.set(keyFunction(key$1), value2);
    },
    entries() {
      return map$3.entries();
    },
    delete(key$1) {
      map$3.delete(key$1);
    }
  };
};
function perValue(options = {}) {
  const byReference = options.byReference;
  const tagName = options.tagName ?? `div`;
  if (byReference && options.key) throw new Error(`byReference and key options are mutually exclusive`);
  const keyFunction = byReference ? void 0 : options.key ?? toStringDefault;
  const map$3 = createMap(keyFunction);
  const parentElementOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElementOrQuery);
  const usedElements = /* @__PURE__ */ new Set();
  async function* perValue$1(input) {
    for await (const value2 of resolveToGen(input)) {
      let el = map$3.get(value2);
      if (!el) {
        el = document.createElement(tagName);
        map$3.set(value2, el);
        if (options.beforeInsert) options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert) options.afterInsert(el);
      }
      usedElements.add(el);
      yield {
        el,
        value: value2
      };
    }
    for (const [id, el] of map$3.entries()) {
      if (usedElements.has(el)) continue;
      if (options.beforeRemove) options.beforeRemove(el);
      el.remove();
      map$3.delete(id);
    }
  }
  perValue$1._name = `dom.perValue`;
  return perValue$1;
}
function query(options = {}) {
  const baseElement = options.baseElement ?? document;
  async function* query$1(input) {
    const gen = resolveToGen(input);
    for await (const value2 of gen) for (const element of baseElement.querySelectorAll(value2)) yield element;
  }
  query$1._name = `dom.query`;
  return query$1;
}
var links_exports = {};
__export2(links_exports, {
  average: () => average$1,
  chunk: () => chunk,
  debounce: () => debounce,
  delay: () => delay,
  drop: () => drop,
  duration: () => duration,
  filter: () => filter$1,
  max: () => max$2,
  min: () => min$2,
  rank: () => rank$1,
  rankArray: () => rankArray,
  reduce: () => reduce$1,
  sum: () => sum$1,
  take: () => take,
  tally: () => tally$1,
  transform: () => transform
});
function transform(transformer) {
  async function* transform$1(input) {
    input = resolveToGen(input);
    for await (const value2 of input) yield transformer(value2);
  }
  transform$1._name = `transform`;
  return transform$1;
}
function take(limit) {
  async function* take$1(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value2 of input) {
      if (++yielded > limit) break;
      yield value2;
    }
  }
  take$1._name = `take`;
  return take$1;
}
function reduce$1(reducer) {
  async function* reduce$4(input) {
    input = resolveToGen(input);
    for await (const value2 of input) yield reducer(value2);
  }
  reduce$4._name = `reduce`;
  return reduce$4;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration$1(input) {
    input = resolveToGen(input);
    const elapsed$1 = elapsedSince();
    for await (const value2 of input) {
      if (elapsed$1() > durationMs) break;
      yield value2;
    }
  }
  duration$1._name = `duration`;
  return duration$1;
}
function delay(options) {
  const before = intervalToMs(options.before, 0);
  const after = intervalToMs(options.after, 0);
  async function* delay$1(input) {
    input = resolveToGen(input);
    for await (const value2 of input) {
      if (before > 0) await sleep(before);
      yield value2;
      if (after > 0) await sleep(after);
    }
  }
  delay$1._name = `delay`;
  return delay$1;
}
function debounce(rate2) {
  const rateMs = intervalToMs(rate2, 0);
  async function* debounce$1(input) {
    input = resolveToGen(input);
    let elapsed = elapsedSince();
    for await (const value2 of input) {
      if (elapsed() < rateMs) continue;
      yield value2;
      elapsed = elapsedSince();
    }
  }
  debounce$1._name = `debounce`;
  return debounce$1;
}
function tally$1(countArrayItems = true) {
  async function* tally$2(input) {
    input = resolveToGen(input);
    const p = tally(countArrayItems);
    for await (const v of input) yield p(v);
  }
  tally$2._name = `tally`;
  return tally$2;
}
function min$2() {
  async function* min$5(input) {
    input = resolveToGen(input);
    const p = min();
    for await (const value2 of input) {
      const x = p(value2);
      if (x === void 0) continue;
      yield x;
    }
  }
  min$5._name = `min`;
  return min$5;
}
function max$2() {
  async function* max$5(input) {
    input = resolveToGen(input);
    const p = max();
    for await (const value2 of input) {
      const x = p(value2);
      if (x === void 0) continue;
      yield x;
    }
  }
  max$5._name = `max`;
  return max$5;
}
function rank$1(r, options = {}) {
  async function* rank$2(input) {
    input = resolveToGen(input);
    const p = rank(r, options);
    for await (const value2 of input) {
      const x = p(value2);
      if (x === void 0) continue;
      yield x;
    }
  }
  rank$2._name = `rank`;
  return rank$2;
}
function rankArray(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  const withinArrays = options.withinArrays ?? false;
  async function* rankArray$1(input) {
    input = resolveToGen(input);
    let best;
    for await (const value2 of input) {
      let emit = false;
      if (withinArrays) best = void 0;
      for (const subValue of value2) {
        if (includeType && typeof subValue !== includeType) continue;
        if (best === void 0) {
          best = subValue;
          emit = true;
        } else {
          const result = r(subValue, best);
          if (result == `a`) {
            best = subValue;
            emit = true;
          } else if (result === `eq` && emitEqualRanked) emit = true;
          else if (emitRepeatHighest) emit = true;
        }
      }
      if (emit && best) yield best;
    }
  }
  rankArray$1._name = `rankArray`;
  return rankArray$1;
}
function average$1() {
  async function* average$2(input) {
    input = resolveToGen(input);
    const p = average();
    for await (const value2 of input) {
      const x = p(value2);
      if (x === void 0) continue;
      yield x;
    }
  }
  average$2._name = `average`;
  return average$2;
}
function sum$1() {
  async function* total2(input) {
    input = resolveToGen(input);
    const p = sum();
    for await (const value2 of input) {
      const x = p(value2);
      if (x === void 0) continue;
      yield x;
    }
  }
  total2._name = `total`;
  return total2;
}
function chunk(size, returnRemainders = true) {
  resultThrow(integerTest(size, `aboveZero`, `size`));
  async function* chunk$1(input) {
    input = resolveToGen(input);
    let buffer = [];
    for await (const value2 of input) {
      buffer.push(value2);
      if (buffer.length >= size) {
        yield buffer;
        buffer = [];
      }
    }
    if (returnRemainders && buffer.length > 0) yield buffer;
  }
  chunk$1._name = `chunk`;
  return chunk$1;
}
function filter$1(predicate) {
  async function* filter$4(input) {
    input = resolveToGen(input);
    for await (const value2 of input) if (predicate(value2)) yield value2;
  }
  filter$4._name = `filter`;
  return filter$4;
}
function drop(predicate) {
  async function* drop$1(input) {
    input = resolveToGen(input);
    for await (const value2 of input) if (!predicate(value2)) yield value2;
  }
  drop$1._name = `drop`;
  return drop$1;
}
function array2(it, delay$1 = 5) {
  async function* fromArray$3() {
    for (const v of it) {
      await sleep(delay$1);
      yield v;
    }
  }
  fromArray$3._name = `fromArray`;
  fromArray$3._type = `GenFactoryNoInput`;
  return fromArray$3;
}
function event(target, name) {
  async function* event$1() {
    while (true) yield await promiseFromEvent(target, name);
  }
  event$1._name = `event`;
  event$1._type = `GenFactoryNoInput`;
  return event$1;
}
function func(callback) {
  async function* fromFunction$1() {
    while (true) {
      const v = await callback();
      if (typeof v === `undefined`) break;
      yield v;
    }
  }
  fromFunction$1._name = `fromFunction`;
  fromFunction$1._type = `GenFactoryNoInput`;
  return fromFunction$1;
}
function iterable(it) {
  async function* fromIterable$3() {
    for await (const v of it) yield v;
  }
  fromIterable$3._name = `fromIterable`;
  fromIterable$3._type = `GenFactoryNoInput`;
  return fromIterable$3;
}
function timestamp(options) {
  const intervalMs = intervalToMs(options.interval, 0);
  const asClockTime = options.asClockTime ?? false;
  const loops = options.loops ?? Number.MAX_SAFE_INTEGER;
  let looped = 0;
  const durationTime = intervalToMs(options.elapsed, Number.MAX_SAFE_INTEGER);
  async function* ts() {
    const elapsed = elapsedSince();
    while (looped < loops && elapsed() < durationTime) {
      yield asClockTime ? Date.now() : elapsed();
      const expectedTimeDiff = looped * intervalMs - elapsed();
      await sleep(Math.max(0, intervalMs + expectedTimeDiff));
      looped++;
    }
  }
  ts._name = `timestamp`;
  ts._type = `GenFactoryNoInput`;
  return ts;
}
var from_exports = {};
__export2(from_exports, {
  array: () => array2,
  event: () => event,
  func: () => func,
  iterable: () => iterable,
  timestamp: () => timestamp
});
async function addToArray(array$1, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value2 of outputType) array$1.push(value2);
}
async function asArray(valueToWrap, options = {}) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return toArray$1(outputType, options);
}
async function asCallback$1(valueToWrap, callback, onDone) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value2 of outputType) callback(value2);
  if (onDone) onDone();
}
function asPromise(valueToWrap) {
  let lastValue;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  async function asPromise$1() {
    const v = await outputType.next();
    if (v.done) return;
    lastValue = v.value;
    return lastValue;
  }
  return asPromise$1;
}
function asValue(valueToWrap, initialValue) {
  let lastValue = initialValue;
  let awaiting = false;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  function asValue$1() {
    if (!awaiting) {
      awaiting = true;
      outputType.next().then((v) => {
        lastValue = v.value;
        awaiting = false;
      }).catch((error) => {
        awaiting = false;
        throw error;
      });
    }
    return lastValue;
  }
  return asValue$1;
}
async function* combineLatestToArray(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const afterEmit = options.afterEmit ?? `last`;
  const inputs = sources.map((source, index) => ({
    waiting: void 0,
    index,
    gen: resolveToGen(source),
    done: false,
    lastValue: void 0
  }));
  const isDone2 = () => !inputs.some((v) => !v.done);
  const isWaiting = () => inputs.some((v) => v.waiting !== void 0);
  const allEmpty = (d) => !d.some((v) => v !== void 0);
  let lastEmitted = [];
  while (true) {
    const promises = [];
    for (const input of inputs) {
      if (input.done) continue;
      if (input.waiting !== void 0) {
        promises.push(input.waiting);
        continue;
      }
      const p = Promise.resolve((async () => {
        if (input.done) return input;
        const v = await input.gen.next();
        input.waiting = void 0;
        if (v.done) {
          input.done = true;
          if (finalValue === `undefined`) input.lastValue = void 0;
        } else input.lastValue = v.value;
        return input;
      })());
      input.waiting = p;
      promises.push(p);
    }
    const won = await Promise.race(promises);
    if (`done` in won) {
      if (won.done && onSourceDone === `break`) break;
    } else throw new Error(`Missing 'done' property`);
    const d = inputs.map((v) => v.lastValue);
    if (d.length === 0) return;
    const dataEmpty = allEmpty(d);
    if (dataEmpty && !isWaiting()) return;
    if (!isEqual(lastEmitted, d) && !dataEmpty) {
      lastEmitted = d;
      yield d;
    }
    if (afterEmit === `undefined`) for (const input of inputs) {
      if (input.waiting !== void 0) continue;
      input.lastValue = void 0;
    }
    if (isDone2()) break;
  }
}
async function* combineLatestToObject(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const afterEmit = options.afterEmit ?? `last`;
  const states = /* @__PURE__ */ new Map();
  for (const [key, value2] of Object.entries(sources)) states.set(key, {
    gen: resolveToGen(value2),
    done: false,
    lastValue: void 0,
    waiting: void 0,
    key
  });
  const isDone2 = () => !some(states, (v) => !v.done);
  const isWaiting = () => some(states, (v) => v.waiting !== void 0);
  const allEmpty = (d) => {
    for (const v of Object.values(d)) if (v !== void 0) return false;
    return true;
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) r[key] = state.lastValue;
    return r;
  };
  let lastEmitted;
  while (true) {
    const promises = [];
    for (const input of states.values()) {
      if (input.done) continue;
      if (input.waiting !== void 0) {
        promises.push(input.waiting);
        continue;
      }
      const p = Promise.resolve((async () => {
        if (input.done) return input;
        const v = await input.gen.next();
        input.waiting = void 0;
        if (v.done) {
          input.done = true;
          if (finalValue === `undefined`) input.lastValue = void 0;
        } else input.lastValue = v.value;
        return input;
      })());
      input.waiting = p;
      promises.push(p);
    }
    const won = await Promise.race(promises);
    if (`done` in won) {
      if (won.done && onSourceDone === `break`) break;
    } else throw new Error(`Result missing 'done' property`);
    const d = getData();
    const dataEmpty = allEmpty(d);
    if (dataEmpty && !isWaiting()) return;
    if (!isEqualValueIgnoreOrder(lastEmitted, d) && !dataEmpty) {
      lastEmitted = d;
      yield d;
    }
    if (afterEmit === `undefined`) for (const input of states.values()) {
      if (input.waiting !== void 0) continue;
      input.lastValue = void 0;
    }
    if (isDone2()) break;
  }
}
var getLinkName = (c) => {
  return c._name ?? c.name;
};
function lazy() {
  const chained = [];
  let dataToUse;
  const asGenerator = (data) => {
    if (data === void 0) data = dataToUse;
    let d = resolveToAsyncGen(data);
    for (const c of chained) if (d === void 0) if (isGenFactoryNoInput(c)) d = c();
    else throw new Error(`Function '${getLinkName(c)}' requires input. Provide it to the function, or call 'input' earlier.`);
    else d = c(d);
    return d;
  };
  const w = {
    rankArray: (r, options) => {
      chained.push(rankArray(r, options));
      return w;
    },
    rank: (r, options) => {
      chained.push(rank$1(r, options));
      return w;
    },
    transform: (transformer) => {
      chained.push(transform(transformer));
      return w;
    },
    reduce: (reducer) => {
      chained.push(reduce$1(reducer));
      return w;
    },
    drop: (predicate) => {
      chained.push(drop(predicate));
      return w;
    },
    delay: (options) => {
      chained.push(delay(options));
      return w;
    },
    duration: (elapsed) => {
      chained.push(duration(elapsed));
      return w;
    },
    debounce: (rate2) => {
      chained.push(debounce(rate2));
      return w;
    },
    fromFunction: (callback) => {
      chained.push(func(callback));
      return w;
    },
    take: (limit) => {
      chained.push(take(limit));
      return w;
    },
    chunk: (size, returnRemainders = true) => {
      chained.push(chunk(size, returnRemainders));
      return w;
    },
    filter: (predicate) => {
      chained.push(filter$1((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min$2());
      return w;
    },
    max: () => {
      chained.push(max$2());
      return w;
    },
    average: () => {
      chained.push(average$1());
      return w;
    },
    sum: () => {
      chained.push(sum$1());
      return w;
    },
    tally: (countArrayItems) => {
      chained.push(tally$1(countArrayItems));
      return w;
    },
    input(data) {
      dataToUse = data;
      return w;
    },
    asGenerator,
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) if (d === void 0 && isGenFactoryNoInput(c)) d = c();
      else if (d === void 0) throw new Error(`Function '${getLinkName(c)}' needs input. Pass in data calling 'asAsync', or call 'input' earlier`);
      else d = c(d);
      return w;
    },
    asArray: async (data) => {
      const g = asGenerator(data);
      return await toArray$1(g);
    },
    firstOutput: async (data) => {
      const g = asGenerator(data);
      const v = await g.next();
      return v.value;
    },
    lastOutput: async (data) => {
      const g = asGenerator(data);
      let lastValue;
      for await (const v of g) lastValue = v;
      return lastValue;
    }
  };
  return w;
}
var QueueMutable = class {
  #store = [];
  enqueue(data) {
    this.#store.push(data);
  }
  dequeue() {
    return this.#store.shift();
  }
};
async function* mergeFlat(...sources) {
  const sourcesInput = sources.map((source) => resolveToAsyncGen(source));
  const buffer = new QueueMutable();
  let completed = 0;
  const schedule = async (source) => {
    if (source === void 0) {
      completed++;
      return;
    }
    const x = await source.next();
    if (x.done) completed++;
    else {
      buffer.enqueue(x.value);
      setTimeout(() => schedule(source), 1);
    }
  };
  for (const source of sourcesInput) setTimeout(() => schedule(source), 1);
  const loopSpeed = 10;
  let loopFactor = 1;
  while (completed < sourcesInput.length) {
    const d = buffer.dequeue();
    if (d === void 0) loopFactor = Math.min(loopFactor + 1, 10);
    else {
      yield d;
      loopFactor = 1;
    }
    await sleep(loopSpeed * loopFactor);
  }
}
async function* runN(...functions) {
  let input;
  for (const fnOrData of functions) input = typeof fnOrData === `function` ? fnOrData(input ?? []) : resolveToGen(fnOrData);
  if (input === void 0) return;
  for await (const v of input) yield v;
}
async function* run(gen, l0, l1, l2, l3, l4, l5) {
  let input;
  const functions = arguments;
  for (const fnOrData of functions) if (typeof fnOrData === `function`) input = fnOrData(input ?? []);
  else input = resolveToGen(fnOrData);
  if (input === void 0) return;
  for await (const v of input) yield v;
}
function prepare(...functions) {
  const r = (source) => {
    return runN(source, ...functions);
  };
  return r;
}
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
}
async function* syncToArray(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const maximumWaitMs = intervalToMs(options.maximumWait, 2e3);
  const finalValue = options.finalValue ?? `undefined`;
  const inputs = sources.map((source) => ({
    seq: 0,
    lastValue: void 0,
    gen: resolveToGen(source),
    done: false
  }));
  const nextWithTimeoutOpts = { millis: maximumWaitMs };
  let seq = 0;
  const isAllDone = () => !inputs.some((v) => !v.done);
  let go = true;
  while (go) {
    seq++;
    for (const input of inputs) {
      if (input.done) {
        input.seq = seq;
        continue;
      }
      const v = await nextWithTimeout(input.gen, nextWithTimeoutOpts);
      if (v.done) {
        input.done = true;
        input.seq = seq;
        if (finalValue === `undefined`) input.lastValue = void 0;
        if (onSourceDone === `break`) return;
      } else {
        input.lastValue = v.value;
        input.seq = seq;
      }
    }
    if (go) {
      const d = inputs.filter((v) => v.seq === seq).map((v) => v.lastValue);
      if (d.length === 0) return;
      if (!d.some((v) => typeof v !== `undefined`)) return;
      yield d;
    }
    if (isAllDone()) go = false;
  }
}
var chain_exports = {};
__export2(chain_exports, {
  Dom: () => dom_exports,
  From: () => from_exports,
  Links: () => links_exports,
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback$1,
  asPromise: () => asPromise,
  asValue: () => asValue,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  isGenFactoryNoInput: () => isGenFactoryNoInput,
  lazy: () => lazy,
  mergeFlat: () => mergeFlat,
  prepare: () => prepare,
  resolveToAsyncGen: () => resolveToAsyncGen,
  resolveToGen: () => resolveToGen,
  run: () => run,
  runN: () => runN,
  single: () => single,
  syncToArray: () => syncToArray
});
var maxScore = (iterable$1, scorer) => {
  let highestValue;
  let highestScore = Number.MIN_SAFE_INTEGER;
  for (const value2 of iterable$1) {
    const score = scorer(value2);
    if (score >= highestScore) {
      highestScore = score;
      highestValue = value2;
    }
  }
  return highestValue;
};
var minScore = (iterable$1, scorer) => {
  let lowestValue;
  let lowestScore = Number.MAX_SAFE_INTEGER;
  for (const value2 of iterable$1) {
    const score = scorer(value2);
    if (score <= lowestScore) {
      lowestScore = score;
      lowestValue = value2;
    }
  }
  return lowestValue;
};
var hasEqualValuesShallow = (iterableA, iterableB, eq) => {
  const returnValue = compareIterableValuesShallow(iterableA, iterableB, eq);
  return returnValue.a.length === 0 && returnValue.b.length === 0;
};
var iteratorController = (options) => {
  const delayMs = intervalToMs(options.delay, 10);
  let gen;
  const onValue = options.onValue;
  let state = `stopped`;
  const loop = continuously(async () => {
    if (gen) {
      const r = await gen.next();
      if (r.done) {
        state = `stopped`;
        return false;
      }
      const r2 = onValue(r.value);
      if (typeof r2 === `boolean`) {
        if (!r2) state = `stopped`;
        return r2;
      }
      return true;
    } else {
      state = `stopped`;
      return false;
    }
  }, delayMs);
  const cancel = () => {
    if (state === `stopped`) return;
    gen = void 0;
    loop.cancel();
    state = `stopped`;
  };
  const pause = () => {
    if (state === `paused`) return;
    loop.cancel();
    state = `paused`;
  };
  const start = () => {
    if (state === `running`) return;
    if (!gen) remake();
    state = `running`;
    loop.start();
  };
  const remake = () => {
    if (options.iterator) gen = options.iterator();
    else throw new Error(`No source iterator`);
  };
  const restart = () => {
    remake();
    start();
  };
  return {
    start,
    cancel,
    restart,
    pause,
    get state() {
      return state;
    }
  };
};
var fromEvent = (eventSource, eventType) => {
  const pullQueue = [];
  const pushQueue = [];
  let done = false;
  const pushValue = (args) => {
    if (pullQueue.length > 0) {
      const resolver = pullQueue.shift();
      resolver(...args);
    } else pushQueue.push(args);
  };
  const pullValue = () => new Promise((resolve2) => {
    if (pushQueue.length > 0) {
      const arguments_ = pushQueue.shift();
      resolve2(...arguments_);
    } else pullQueue.push(resolve2);
  });
  const handler = (...arguments_) => {
    pushValue(arguments_);
  };
  eventSource.addEventListener(eventType, handler);
  const r = {
    next: async () => {
      if (done) return {
        done: true,
        value: void 0
      };
      return {
        done: false,
        value: await pullValue()
      };
    },
    return: async () => {
      done = true;
      eventSource.removeEventListener(eventType, handler);
      return {
        done: true,
        value: void 0
      };
    },
    throw: async (error) => {
      done = true;
      return {
        done: true,
        value: Promise.reject(new Error(error))
      };
    }
  };
  return r;
};
var numbersCompute = (data, options = {}) => {
  if (typeof data === `undefined`) throw new Error(`Param 'data' is undefined`);
  if (Array.isArray(data)) return numberArrayCompute(data, options);
  if (isIterable(data)) return numbersComputeIterable(data, options);
  throw new Error(`Param 'data' is neither an array nor iterable`);
};
function numbersComputeIterable(data, options = {}) {
  let total2 = 0;
  const nonNumbers = options.nonNumbers ?? `ignore`;
  let min$5 = Number.MAX_SAFE_INTEGER;
  let max$5 = Number.MIN_SAFE_INTEGER;
  let count3 = 0;
  for (let v of data) {
    if (typeof v !== `number` || Number.isNaN(v)) {
      if (nonNumbers === `throw`) throw new TypeError(`Data contains something not a number. Got type '${typeof v}'`);
      if (nonNumbers === `nan`) v = NaN;
      if (nonNumbers === `ignore`) continue;
    }
    total2 += v;
    count3++;
    min$5 = Math.min(min$5, v);
    max$5 = Math.max(max$5, v);
  }
  return {
    avg: total2 / count3,
    total: total2,
    max: max$5,
    min: min$5,
    count: count3
  };
}
function computeAverage(data, options = {}) {
  let count3 = 0;
  let total2 = 0;
  const nonNumbers = options.nonNumbers ?? `ignore`;
  for (let d of data) {
    if (typeof d !== `number` || Number.isNaN(d)) {
      if (nonNumbers === `throw`) throw new TypeError(`Data contains something not a number. Got type '${typeof d}'`);
      if (nonNumbers === `nan`) d = NaN;
      if (nonNumbers === `ignore`) continue;
    }
    total2 += d;
    count3++;
  }
  return total2 / count3;
}
var src_exports3 = {};
__export2(src_exports3, {
  Async: () => async_exports,
  Chains: () => chain_exports,
  Sync: () => sync_exports,
  asCallback: () => asCallback,
  chunks: () => chunks2,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  computeAverage: () => computeAverage,
  concat: () => concat,
  dropWhile: () => dropWhile,
  equals: () => equals,
  every: () => every,
  fill: () => fill,
  filter: () => filter,
  find: () => find,
  flatten: () => flatten2,
  forEach: () => forEach,
  fromArray: () => fromArray,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  fromFunctionAwaited: () => fromFunctionAwaited,
  fromIterable: () => fromIterable2,
  hasEqualValuesShallow: () => hasEqualValuesShallow,
  isAsyncIterable: () => isAsyncIterable,
  isIterable: () => isIterable,
  iteratorController: () => iteratorController,
  last: () => last,
  map: () => map,
  max: () => max$1,
  maxScore: () => maxScore,
  min: () => min$1,
  minScore: () => minScore,
  numbersCompute: () => numbersCompute,
  reduce: () => reduce,
  slice: () => slice,
  some: () => some$1,
  toArray: () => toArray2,
  unique: () => unique2,
  uniqueByValue: () => uniqueByValue,
  until: () => until2,
  zip: () => zip2
});
function min$1(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? min$3(it, gt) : min$4(it, gt);
}
function max$1(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? max$3(it, gt) : max$4(it, gt);
}
function dropWhile(it, f) {
  return isAsyncIterable(it) ? dropWhile$1(it, f) : dropWhile$2(it, f);
}
function until2(it, callback) {
  if (isAsyncIterable(it)) return until$1(it, callback);
  else until$2(it, callback);
}
function chunks2(it, size) {
  return isAsyncIterable(it) ? chunks$1(it, size) : chunks$2(it, size);
}
function filter(it, f) {
  return isAsyncIterable(it) ? filter$2(it, f) : filter$3(it, f);
}
function fill(it, v) {
  return isAsyncIterable(it) ? fill$1(it, v) : fill$2(it, v);
}
function concat(...its) {
  return isAsyncIterable(its[0]) ? concat$1(...its) : concat$2(...its);
}
function find(it, f) {
  return isAsyncIterable(it) ? find$1(it, f) : find$2(it, f);
}
function forEach(it, fn, options = {}) {
  if (isAsyncIterable(it)) return forEach$1(it, fn, options);
  else forEach$2(it, fn);
}
function map(it, f) {
  return isAsyncIterable(it) ? map$1(it, f) : map$2(it, f);
}
function fromArray(array$1, interval2) {
  return interval2 === void 0 ? fromArray$2(array$1) : fromArray$1(array$1, interval2);
}
function flatten2(it) {
  return isAsyncIterable(it) ? flatten$1(it) : flatten$2(it);
}
function some$1(it, f) {
  return isAsyncIterable(it) ? some$2(it, f) : some$3(it, f);
}
function last(it) {
  return isAsyncIterable(it) ? last$1(it) : last$2(it);
}
function reduce(it, f, start) {
  return isAsyncIterable(it) ? reduce$2(it, f, start) : reduce$3(it, f, start);
}
function slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  return isAsyncIterable(it) ? slice$1(it, start, end) : slice$2(it, start, end);
}
function unique2(iterable$1) {
  if (Array.isArray(iterable$1)) {
    if (iterable$1.length === 0) return fromArray$2([]);
    return isAsyncIterable(iterable$1[0]) ? unique$1(iterable$1) : unique$2(iterable$1);
  } else if (isAsyncIterable(iterable$1)) return unique$1(iterable$1);
  else return unique$2(iterable$1);
}
function* uniqueByValue(input, toString3 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  yield* isAsyncIterable(input) ? uniqueByValue$1(input, toString3, seen) : uniqueByValue$2(input, toString3, seen);
}
function toArray2(it, options = {}) {
  return isAsyncIterable(it) ? toArray$1(it, options) : toArray$2(it, options);
}
function every(it, f) {
  return isAsyncIterable(it) ? every$1(it, f) : every$2(it, f);
}
function equals(it1, it2, equality) {
  const as = isAsyncIterable(it1) && isAsyncIterable(it2);
  return as ? equals$1(it1, it2, equality) : equals$2(it1, it2, equality);
}
function zip2(...its) {
  if (its.length === 0) return fromArray$2([]);
  return isAsyncIterable(its[0]) ? zip$1(...its) : zip$2(...its);
}
function fromIterable2(iterable$1, interval2) {
  if (isAsyncIterable(iterable$1) || interval2 !== void 0) return fromIterable$1(iterable$1, interval2);
  return fromIterable$2(iterable$1);
}
function* fromFunction(callback) {
  while (true) {
    const v = callback();
    yield v;
  }
}
async function* fromFunctionAwaited(callback) {
  while (true) {
    const v = await callback();
    yield v;
  }
}
function asCallback(input, callback, onDone) {
  if (isAsyncIterable(input)) return asCallback$2(input, callback);
  else {
    asCallback$3(input, callback);
    return;
  }
}

// node_modules/ixfx/bundle/key-value-JSby0EXT.js
var sorterByValueIndex = (index, reverse2 = false) => {
  return (values2) => {
    const s = values2.toSorted((a, b) => {
      return defaultComparer(a[index], b[index]);
    });
    if (reverse2) return s.reverse();
    return s;
  };
};
var keyValueSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`:
      return sorterByValueIndex(1, false);
    case `value-reverse`:
      return sorterByValueIndex(1, true);
    case `key`:
      return sorterByValueIndex(0, false);
    case `key-reverse`:
      return sorterByValueIndex(0, true);
    default:
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
  }
};

// node_modules/ixfx/bundle/resolve-core-CZPH91No.js
var isReactive = (rx) => {
  if (typeof rx !== `object`) return false;
  if (rx === null) return false;
  return `on` in rx && `onValue` in rx;
};
var hasLast = (rx) => {
  if (!isReactive(rx)) return false;
  if (`last` in rx) {
    const v = rx.last();
    if (v !== void 0) return true;
  }
  return false;
};
var getOrGenerateSync2 = (map2, fn) => (key, args) => {
  let value2 = map2.get(key);
  if (value2 !== void 0) return value2;
  value2 = fn(key, args);
  map2.set(key, value2);
  return value2;
};
var logger = (prefix, kind = `log`, colourKey) => (m) => {
  if (m === void 0) m = `(undefined)`;
  else if (typeof m === `object`) m = JSON.stringify(m);
  const colour = colourKey ?? prefix;
  switch (kind) {
    case `log`: {
      console.log(`%c${prefix} ${m}`, `color: ${logColours(colour)}`);
      break;
    }
    case `warn`: {
      console.warn(prefix, m);
      break;
    }
    case `error`: {
      console.error(prefix, m);
      break;
    }
  }
};
var logSet = (prefix, verbose = true, colourKey) => {
  if (verbose) return {
    log: logger(prefix, `log`, colourKey),
    warn: logger(prefix, `warn`, colourKey),
    error: logger(prefix, `error`, colourKey)
  };
  return {
    log: (_) => {
    },
    warn: logger(prefix, `warn`, colourKey),
    error: logger(prefix, `error`, colourKey)
  };
};
var resolveLogOption = (l, defaults = {}) => {
  if (l === void 0 || typeof l === `boolean` && !l) return (_) => {
  };
  const defaultCat = defaults.category ?? ``;
  const defaultKind = defaults.kind ?? void 0;
  if (typeof l === `boolean`) return (messageOrString) => {
    const m = typeof messageOrString === `string` ? { msg: messageOrString } : messageOrString;
    const kind = m.kind ?? defaultKind;
    const category = m.category ?? defaultCat;
    let message = m.msg;
    if (category) message = `[${category}] ${message}`;
    switch (kind) {
      case `error`: {
        console.error(message);
        break;
      }
      case `warn`: {
        console.warn(message);
        break;
      }
      case `info`: {
        console.info(message);
        break;
      }
      default:
        console.log(message);
    }
  };
  return l;
};
var logColourCount = 0;
var logColours = getOrGenerateSync2(/* @__PURE__ */ new Map(), () => {
  const hue = ++logColourCount * 137.508;
  return `hsl(${hue},50%,75%)`;
});
var fpsCounter = (autoDisplay = true, computeAfterFrames = 500) => {
  let count3 = 0;
  let lastFps = 0;
  let countStart = performance.now();
  return () => {
    if (count3++ >= computeAfterFrames) {
      const elapsed = performance.now() - countStart;
      countStart = performance.now();
      count3 = 0;
      lastFps = Math.floor(computeAfterFrames / elapsed * 1e3);
      if (autoDisplay) console.log(`fps: ${lastFps}`);
    }
    return lastFps;
  };
};
var getErrorMessage2 = (ex) => {
  if (typeof ex === `string`) return ex;
  if (ex instanceof Error) return ex.message;
  return ex;
};
var src_exports4 = {};
__export2(src_exports4, {
  fpsCounter: () => fpsCounter,
  getErrorMessage: () => getErrorMessage2,
  logColours: () => logColours,
  logSet: () => logSet,
  logger: () => logger,
  resolveLogOption: () => resolveLogOption
});
async function resolve(resolvable, ...args) {
  if (typeof resolvable === `object`) if (`next` in resolvable) {
    const tag = resolvable[Symbol.toStringTag];
    if (tag === `Generator` || tag == `Array Iterator`) {
      const v = resolvable.next();
      if (`done` in v && `value` in v) return v.value;
      return v;
    } else if (tag === `AsyncGenerator`) {
      const v = await resolvable.next();
      if (`done` in v && `value` in v) return v.value;
      return v;
    } else throw new Error(`Object has 'next' prop, but does not have 'AsyncGenerator', 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
  } else if (isReactive(resolvable)) {
    if (hasLast(resolvable)) return resolvable.last();
    throw new Error(`Reactive does not have last value`);
  } else return resolvable;
  else if (typeof resolvable === `function`) {
    const v = await resolvable(...args);
    return v;
  } else return resolvable;
}
function resolveSync(resolvable, ...args) {
  if (typeof resolvable === `object`) if (`next` in resolvable) {
    const tag = resolvable[Symbol.toStringTag];
    if (tag === `Generator` || tag == `Array Iterator`) {
      const v = resolvable.next();
      if (`done` in v && `value` in v) return v.value;
      return v;
    } else if (tag === `AsyncGenerator`) throw new Error(`resolveSync cannot work with an async generator`);
    else throw new Error(`Object has 'next' prop, but does not have 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
  } else if (isReactive(resolvable)) {
    if (hasLast(resolvable)) return resolvable.last();
    throw new Error(`Reactive does not have last value`);
  } else return resolvable;
  else if (typeof resolvable === `function`) return resolvable(...args);
  else return resolvable;
}

// node_modules/ixfx/bundle/src-BP8ZzJBi.js
var CircularArray = class CircularArray2 extends Array {
  #capacity;
  #pointer;
  constructor(capacity = 0) {
    super();
    resultThrow(integerTest(capacity, `positive`, `capacity`));
    this.#capacity = capacity;
    this.#pointer = 0;
  }
  /**
  * Add to array
  * @param value Thing to add
  * @returns
  */
  add(value$1) {
    const ca = CircularArray2.from(this);
    ca[this.#pointer] = value$1;
    ca.#capacity = this.#capacity;
    if (this.#capacity > 0) ca.#pointer = this.#pointer + 1 === this.#capacity ? 0 : this.#pointer + 1;
    else ca.#pointer = this.#pointer + 1;
    return ca;
  }
  get pointer() {
    return this.#pointer;
  }
  get isFull() {
    if (this.#capacity === 0) return false;
    return this.length === this.#capacity;
  }
};
var debug = (opts, message) => {
  opts.debug && console.log(`queue:${message}`);
};
var trimQueue = (opts, queue, toAdd) => {
  const potentialLength = queue.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  switch (policy) {
    case `additions`: {
      if (queue.length === 0) return toAdd.slice(0, toAdd.length - toRemove);
      if (queue.length === opts.capacity) return queue;
      else return [...queue, ...toAdd.slice(0, toRemove - 1)];
    }
    case `newer`:
      if (toRemove >= queue.length) {
        if (queue.length === 0) return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
        return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      } else {
        const countToAdd = Math.max(1, toAdd.length - queue.length);
        const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
        const toKeep = queue.slice(0, Math.min(queue.length, capacity - 1));
        const t2 = [...toKeep, ...toAddFinal];
        return t2;
      }
    case `older`:
      return [...queue, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown overflow policy ${policy}`);
  }
};
var enqueue = (opts, queue, ...toAdd) => {
  if (opts === void 0) throw new Error(`opts parameter undefined`);
  const potentialLength = queue.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize) throw new Error(`Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`);
  if (!opts.capacity && toReturn.length !== potentialLength) throw new Error(`Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`);
  return toReturn;
};
var dequeue = (opts, queue) => {
  if (queue.length === 0) throw new Error(`Queue is empty`);
  return queue.slice(1);
};
var peek = (opts, queue) => queue[0];
var isEmpty = (opts, queue) => queue.length === 0;
var isFull = (opts, queue) => {
  if (opts.capacity) return queue.length >= opts.capacity;
  return false;
};
var QueueMutable2 = class extends SimpleEventEmitter {
  options;
  data;
  eq;
  constructor(opts = {}, data = []) {
    super();
    if (opts === void 0) throw new Error(`opts parameter undefined`);
    this.options = opts;
    this.data = data;
    this.eq = opts.eq ?? isEqualDefault;
  }
  clear() {
    const copy = [...this.data];
    this.data = [];
    this.fireEvent(`removed`, {
      finalData: this.data,
      removed: copy
    });
    this.onClear();
  }
  /**
  * Called when all data is cleared
  */
  onClear() {
  }
  at(index) {
    if (index >= this.data.length) throw new Error(`Index outside bounds of queue`);
    const v = this.data.at(index);
    if (v === void 0) throw new Error(`Index appears to be outside range of queue`);
    return v;
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.options, this.data, ...toAdd);
    const length2 = this.data.length;
    this.onEnqueue(this.data, toAdd);
    return length2;
  }
  onEnqueue(result, attemptedToAdd) {
    this.fireEvent(`enqueue`, {
      added: attemptedToAdd,
      finalData: result
    });
  }
  dequeue() {
    const v = peek(this.options, this.data);
    if (v === void 0) return;
    this.data = dequeue(this.options, this.data);
    this.fireEvent(`dequeue`, {
      removed: v,
      finalData: this.data
    });
    this.onRemoved([v], this.data);
    return v;
  }
  onRemoved(removed, finalData) {
    this.fireEvent(`removed`, {
      removed,
      finalData
    });
  }
  /**
  * Removes values that match `predicate`.
  * @param predicate
  * @returns Returns number of items removed.
  */
  removeWhere(predicate) {
    const countPre = this.data.length;
    const toRemove = this.data.filter((v) => predicate(v));
    if (toRemove.length === 0) return 0;
    this.data = this.data.filter((element) => !predicate(element));
    this.onRemoved(toRemove, this.data);
    return countPre - this.data.length;
  }
  /**
  * Return a copy of the array
  * @returns
  */
  toArray() {
    return [...this.data];
  }
  get isEmpty() {
    return isEmpty(this.options, this.data);
  }
  get isFull() {
    return isFull(this.options, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek(this.options, this.data);
  }
};
function mutable$1(options = {}, ...startingItems) {
  return new QueueMutable2({ ...options }, [...startingItems]);
}
var trimStack = (opts, stack, toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug) console.log(`Stack.push: stackLen: ${stack.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
  switch (policy) {
    case `additions`: {
      if (opts.debug) console.log(`Stack.push:DiscardAdditions: stackLen: ${stack.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
      if (stack.length === opts.capacity) return stack;
      else return [...stack, ...toAdd.slice(0, toAdd.length - toRemove)];
    }
    case `newer`:
      if (toRemove >= stack.length) return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
      else {
        if (opts.debug) console.log(` from orig: ${JSON.stringify(stack.slice(0, stack.length - toRemove))}`);
        return [...stack.slice(0, stack.length - toRemove), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
      }
    case `older`:
      return [...stack, ...toAdd].slice(toRemove);
    default:
      throw new Error(`Unknown discard policy ${policy}`);
  }
};
var push = (opts, stack, ...toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack, toAdd) : [...stack, ...toAdd];
  return toReturn;
};
var pop = (opts, stack) => {
  if (stack.length === 0) throw new Error(`Stack is empty`);
  return stack.slice(0, -1);
};
var peek$1 = (opts, stack) => stack.at(-1);
var isEmpty$1 = (opts, stack) => stack.length === 0;
var isFull$1 = (opts, stack) => {
  if (opts.capacity) return stack.length >= opts.capacity;
  return false;
};
var StackMutable = class {
  opts;
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  /**
  * Push data onto the stack.
  * If `toAdd` is empty, nothing happens
  * @param toAdd Data to add
  * @returns Length of stack
  */
  push(...toAdd) {
    if (toAdd.length === 0) return this.data.length;
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  pop() {
    const v = peek$1(this.opts, this.data);
    this.data = pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty$1(this.opts, this.data);
  }
  get isFull() {
    return isFull$1(this.opts, this.data);
  }
  get peek() {
    return peek$1(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var mutable$3 = (opts = {}, ...startingItems) => new StackMutable({ ...opts }, [...startingItems]);
var compare = (a, b, eq = isEqualValueIgnoreOrder, parent) => {
  const valueEqual = valueOrIdentityEqual(a, b, eq);
  const childrenCompare = compareChildren(a, b, eq);
  const diff = {
    valueChanged: !valueEqual,
    a,
    b,
    added: childrenCompare.added,
    removed: childrenCompare.removed,
    childChanged: false
  };
  const diffNode = {
    value: diff,
    childrenStore: [],
    parent
  };
  const childrenDiff = childrenCompare.identical.map((c) => compare(c[0], c[1], eq, diffNode));
  const someChildChange = hasChange(diff) || childrenDiff.some((v) => hasChange(v.value));
  setChildren(diffNode, childrenDiff);
  diffNode.toString = () => toString$1(diffNode, 0);
  diffNode.value.childChanged = someChildChange;
  throwTreeTest(diffNode);
  return diffNode;
};
var hasChange = (vv) => {
  if (vv === void 0) return false;
  if (vv.valueChanged) return true;
  if (vv.childChanged) return true;
  if (vv.added.length > 0) return true;
  if (vv.removed.length > 0) return true;
  return false;
};
var compareChildren = (a, b, eq = isEqualValueIgnoreOrder) => {
  const childrenOfA = [...a.children()];
  const childrenOfB = [...b.children()];
  const identical = [];
  const removed = [];
  for (const childA of childrenOfA) {
    let foundIndex = -1;
    for (const [index, childOfB] of childrenOfB.entries()) {
      const d = valueOrIdentityEqual(childA, childOfB, eq);
      if (d) {
        identical.push([childA, childOfB]);
        foundIndex = index;
        break;
      }
    }
    if (foundIndex === -1) removed.push(childA);
    else childrenOfB.splice(foundIndex, 1);
  }
  const added = [...childrenOfB];
  return {
    added,
    identical,
    removed
  };
};
var valueOrIdentityEqual = (a, b, eq) => {
  if (a.getIdentity() === b.getIdentity()) return true;
  if (eq(a.getValue(), b.getValue())) return true;
  return false;
};
var toStringSingle = (n) => {
  return JSON.stringify(n.getValue());
};
var toString$1 = (n, indent = 0) => {
  if (n === void 0) return `(undefined)`;
  let t2 = toStringDiff(n.value, indent);
  for (const c of n.childrenStore) t2 += toString$1(c, indent + 2);
  return t2;
};
var toStringDiff = (n, indent) => {
  const spaces = ` `.repeat(indent);
  if (n === void 0) return `${spaces}(undefined)`;
  const t2 = [];
  t2.push(`a: ${toStringSingle(n.a)} b: ${toStringSingle(n.b)}`);
  if (n.valueChanged) t2.push(`Value changed. Child changed: ${n.childChanged}`);
  else t2.push(`Value unchanged. Child changed: ${n.childChanged}`);
  if (n.added.length > 0) {
    t2.push(`Added:`);
    for (const c of n.added) t2.push(` - ` + toStringSingle(c));
  }
  if (n.removed.length > 0) {
    t2.push(`Removed: ${n.removed.length}`);
    for (const c of n.removed) t2.push(` - ` + toStringSingle(c));
  }
  t2.push(`----
`);
  return t2.map((line) => spaces + line).join(`
`);
};
var tree_mutable_exports = {};
__export2(tree_mutable_exports, {
  add: () => add$1,
  addValue: () => addValue$1,
  asDynamicTraversable: () => asDynamicTraversable$1,
  breadthFirst: () => breadthFirst$1,
  children: () => children$1,
  childrenLength: () => childrenLength$1,
  childrenValues: () => childrenValues,
  compare: () => compare$1,
  computeMaxDepth: () => computeMaxDepth,
  createNode: () => createNode,
  depthFirst: () => depthFirst$2,
  findAnyChildByValue: () => findAnyChildByValue$1,
  findChildByValue: () => findChildByValue$1,
  findParentsValue: () => findParentsValue,
  followValue: () => followValue$1,
  fromPlainObject: () => fromPlainObject,
  getRoot: () => getRoot,
  hasAnyChild: () => hasAnyChild$1,
  hasAnyParent: () => hasAnyParent$1,
  hasChild: () => hasChild$1,
  hasParent: () => hasParent$1,
  nodeDepth: () => nodeDepth,
  parents: () => parents$1,
  parentsValues: () => parentsValues,
  queryByValue: () => queryByValue,
  queryParentsValue: () => queryParentsValue,
  remove: () => remove2,
  root: () => root,
  rootWrapped: () => rootWrapped,
  setChildren: () => setChildren,
  stripParentage: () => stripParentage,
  throwTreeTest: () => throwTreeTest,
  toStringDeep: () => toStringDeep$2,
  treeTest: () => treeTest,
  value: () => value,
  wrap: () => wrap2
});
var compare$1 = (a, b, eq) => {
  return compare(asDynamicTraversable$1(a), asDynamicTraversable$1(b), eq);
};
var stripParentage = (node) => {
  const n = {
    value: node.value,
    childrenStore: node.childrenStore.map((c) => stripParentage(c))
  };
  return n;
};
var unwrapped = (node) => `wraps` in node ? node.wraps : node;
var wrapped = (node) => `wraps` in node ? node : wrap2(node);
var wrap2 = (n) => {
  return {
    *children() {
      for (const c of n.childrenStore) yield wrap2(c);
    },
    getValue: () => n.value,
    getIdentity: () => n,
    *queryValue(value$1) {
      for (const v of queryByValue(value$1, unwrapped(n))) yield wrap2(v);
    },
    *queryParentsValue(child, value$1, eq) {
      for (const v of queryParentsValue(unwrapped(child), value$1, eq)) yield wrap2(v);
    },
    *parentsValues(child) {
      yield* parentsValues(unwrapped(child));
    },
    findParentsValue(child, value$1, eq) {
      const n$1 = findParentsValue(child, value$1, eq);
      if (n$1 !== void 0) return wrap2(n$1);
    },
    getParent: () => n.parent === void 0 ? void 0 : wrap2(n.parent),
    hasParent: (parent) => {
      return hasParent$1(n, unwrapped(parent));
    },
    hasAnyParent: (parent) => {
      return hasAnyParent$1(n, unwrapped(parent));
    },
    hasChild: (child) => {
      return hasChild$1(unwrapped(child), n);
    },
    hasAnyChild: (child) => {
      return hasAnyChild$1(unwrapped(child), n);
    },
    remove: () => {
      remove2(n);
    },
    addValue: (value$1) => {
      const nodeValue = addValue$1(value$1, n);
      return wrap2(nodeValue);
    },
    add: (child) => {
      add$1(unwrapped(child), n);
      return wrapped(child);
    },
    wraps: n
  };
};
var remove2 = (child) => {
  const p = child.parent;
  if (p === void 0) return;
  child.parent = void 0;
  p.childrenStore = without(p.childrenStore, child);
};
function* depthFirst$2(node) {
  if (!root) return;
  const stack = new StackMutable();
  stack.push(...node.childrenStore);
  let entry = stack.pop();
  while (entry) {
    yield entry;
    if (entry) stack.push(...entry.childrenStore);
    if (stack.isEmpty) break;
    entry = stack.pop();
  }
}
function* breadthFirst$1(node) {
  if (!node) return;
  const queue = new QueueMutable2();
  queue.enqueue(...node.childrenStore);
  let entry = queue.dequeue();
  while (entry) {
    yield entry;
    if (entry) queue.enqueue(...entry.childrenStore);
    if (queue.isEmpty) break;
    entry = queue.dequeue();
  }
}
function treeTest(root$1, seen = []) {
  if (root$1.parent === root$1) return [
    false,
    `Root has itself as parent`,
    root$1
  ];
  if (seen.includes(root$1)) return [
    false,
    `Same node instance is appearing further in tree`,
    root$1
  ];
  seen.push(root$1);
  if (containsDuplicateInstances(root$1.childrenStore)) return [
    false,
    `Children list contains duplicates`,
    root$1
  ];
  for (const c of root$1.childrenStore) {
    if (c.parent !== root$1) return [
      false,
      `Member of childrenStore does not have .parent set`,
      c
    ];
    if (hasAnyChild$1(root$1, c)) return [
      false,
      `Child has parent as its own child`,
      c
    ];
    const v = treeTest(c, seen);
    if (!v[0]) return v;
  }
  return [
    true,
    ``,
    root$1
  ];
}
function throwTreeTest(root$1) {
  const v = treeTest(root$1);
  if (v[0]) return;
  throw new Error(`${v[1]} Node: ${toStringAbbreviate(v[2].value, 30)}`, { cause: v[2] });
}
function* children$1(root$1) {
  for (const c of root$1.childrenStore) yield c;
}
function* childrenValues(root$1) {
  for (const c of root$1.childrenStore) if (typeof c.value !== `undefined`) yield c.value;
}
function* parents$1(root$1) {
  let p = root$1.parent;
  while (p) {
    yield p;
    p = p.parent;
  }
}
function nodeDepth(node) {
  const p = [...parents$1(node)];
  return p.length;
}
var hasChild$1 = (child, parent) => {
  for (const c of parent.childrenStore) if (c === child) return true;
  return false;
};
var findChildByValue$1 = (value$1, parent, eq = isEqualDefault) => {
  for (const c of parent.childrenStore) if (eq(value$1, c.value)) return c;
};
function* queryByValue(value$1, parent, eq = isEqualDefault) {
  for (const c of parent.childrenStore) if (eq(value$1, c.value)) yield c;
}
var hasAnyChild$1 = (prospectiveChild, parent) => {
  for (const c of breadthFirst$1(parent)) if (c === prospectiveChild) return true;
  return false;
};
var findAnyChildByValue$1 = (value$1, parent, eq = isEqualDefault) => {
  for (const c of breadthFirst$1(parent)) if (eq(c.value, value$1)) return c;
};
var getRoot = (node) => {
  if (node.parent) return getRoot(node.parent);
  return node;
};
var hasAnyParent$1 = (child, prospectiveParent) => {
  for (const p of parents$1(child)) if (p === prospectiveParent) return true;
  return false;
};
function* parentsValues(child) {
  for (const p of parents$1(child)) if (typeof p.value !== `undefined`) yield p.value;
  return false;
}
function* queryParentsValue(child, value$1, eq = isEqualDefault) {
  for (const p of parents$1(child)) if (typeof p.value !== `undefined`) {
    if (eq(p.value, value$1)) yield p;
  }
  return false;
}
function findParentsValue(child, value$1, eq = isEqualDefault) {
  for (const p of queryParentsValue(child, value$1, eq)) return p;
}
var hasParent$1 = (child, prospectiveParent) => {
  return child.parent === prospectiveParent;
};
var computeMaxDepth = (node) => {
  return computeMaxDepthImpl(node, 0);
};
var computeMaxDepthImpl = (node, startingDepth = 0) => {
  let depth = startingDepth;
  for (const c of node.childrenStore) depth = Math.max(depth, computeMaxDepthImpl(c, startingDepth + 1));
  return depth;
};
var add$1 = (child, parent) => {
  throwAttemptedChild(child, parent);
  const p = child.parent;
  parent.childrenStore = [...parent.childrenStore, child];
  child.parent = parent;
  if (p) p.childrenStore = without(p.childrenStore, child);
};
var addValue$1 = (value$1, parent) => {
  return createNode(value$1, parent);
};
var root = (value$1) => {
  return createNode(value$1);
};
var fromPlainObject = (value$1, label = ``, parent, seen = []) => {
  const entries$1 = Object.entries(value$1);
  parent = parent === void 0 ? root() : addValue$1({
    label,
    value: value$1
  }, parent);
  for (const entry of entries$1) {
    const value$2 = entry[1];
    if (seen.includes(value$2)) continue;
    seen.push(value$2);
    if (typeof entry[1] === `object`) fromPlainObject(value$2, entry[0], parent, seen);
    else addValue$1({
      label: entry[0],
      value: value$2
    }, parent);
  }
  return parent;
};
var rootWrapped = (value$1) => {
  return wrap2(createNode(value$1));
};
var createNode = (value$1, parent) => {
  const n = {
    childrenStore: [],
    parent,
    value: value$1
  };
  if (parent !== void 0) parent.childrenStore = [...parent.childrenStore, n];
  return n;
};
var childrenLength$1 = (node) => {
  return node.childrenStore.length;
};
var value = (node) => {
  return node.value;
};
var asDynamicTraversable$1 = (node) => {
  const t2 = {
    *children() {
      for (const c of node.childrenStore) yield asDynamicTraversable$1(c);
    },
    getParent() {
      if (node.parent === void 0) return;
      return asDynamicTraversable$1(node.parent);
    },
    getValue() {
      return node.value;
    },
    getIdentity() {
      return node;
    }
  };
  return t2;
};
var throwAttemptedChild = (c, parent) => {
  if (parent === c) throw new Error(`Cannot add self as child`);
  if (c.parent === parent) return;
  if (hasAnyParent$1(parent, c)) throw new Error(`Child contains parent (1)`, { cause: c });
  if (hasAnyParent$1(c, parent)) throw new Error(`Parent already contains child`, { cause: c });
  if (hasAnyChild$1(parent, c)) throw new Error(`Child contains parent (2)`, { cause: c });
};
var setChildren = (parent, children$2) => {
  for (const c of children$2) throwAttemptedChild(c, parent);
  parent.childrenStore = [...children$2];
  for (const c of children$2) c.parent = parent;
};
var toStringDeep$2 = (node, indent = 0) => {
  const t2 = `${`  `.repeat(indent)} + ${node.value ? JSON.stringify(node.value) : `-`}`;
  return node.childrenStore.length > 0 ? t2 + `
` + node.childrenStore.map((d) => toStringDeep$2(d, indent + 1)).join(`
`) : t2;
};
function* followValue$1(root$1, continuePredicate, depth = 1) {
  for (const c of root$1.childrenStore) {
    const value$1 = c.value;
    if (value$1 === void 0) continue;
    if (continuePredicate(value$1, depth)) {
      yield c.value;
      yield* followValue$1(c, continuePredicate, depth + 1);
    }
  }
}
var traverse_object_exports = {};
__export2(traverse_object_exports, {
  asDynamicTraversable: () => asDynamicTraversable,
  children: () => children,
  create: () => create$3,
  createSimplified: () => createSimplified,
  createWrapped: () => createWrapped,
  depthFirst: () => depthFirst$1,
  getByPath: () => getByPath,
  prettyPrint: () => prettyPrint,
  prettyPrintEntries: () => prettyPrintEntries,
  toStringDeep: () => toStringDeep$1,
  traceByPath: () => traceByPath
});
function prettyPrintEntries(entries$1) {
  if (entries$1.length === 0) return `(empty)`;
  let t2 = ``;
  for (const [index, entry] of entries$1.entries()) {
    t2 += `  `.repeat(index);
    t2 += entry.name + ` = ` + JSON.stringify(entry.leafValue) + `
`;
  }
  return t2;
}
var prettyPrint = (node, indent = 0, options = {}) => {
  resultThrow(nullUndefTest(node, `node`));
  const defaultName = options.name ?? `node`;
  const entry = getNamedEntry(node, defaultName);
  const t2 = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.leafValue)}`;
  const childrenAsArray = [...children(node, options)];
  return childrenAsArray.length > 0 ? t2 + `
` + childrenAsArray.map((d) => prettyPrint(d.leafValue, indent + 1, {
    ...options,
    name: d.name
  })).join(`
`) : t2;
};
var toStringDeep$1 = (node, indent = 0) => {
  let t2 = ` `.repeat(indent) + ` ${node.value?.name}`;
  if (node.value !== void 0) {
    if (`sourceValue` in node.value && `leafValue` in node.value) {
      let sourceValue = toStringAbbreviate(node.value.sourceValue, 20);
      const leafValue = toStringAbbreviate(node.value.leafValue, 20);
      sourceValue = sourceValue === leafValue ? `` : `source: ` + sourceValue;
      t2 += ` = ${leafValue} ${sourceValue}`;
    } else if (`sourceValue` in node.value && node.value.sourceValue !== void 0) t2 += ` = ${node.value.sourceValue}`;
    if (`ancestors` in node.value) t2 += ` (ancestors: ${node.value.ancestors.join(`, `)})`;
  }
  t2 += `
`;
  for (const c of node.childrenStore) t2 += toStringDeep$1(c, indent + 1);
  return t2;
};
function* children(node, options = {}) {
  resultThrow(nullUndefTest(node, `node`));
  const filteringOption = options.filter ?? `none`;
  const filterByValue = (v) => {
    if (filteringOption === `none`) return [true, isPrimitive(v)];
    else if (filteringOption === `leaves` && isPrimitive(v)) return [true, true];
    else if (filteringOption === `branches` && !isPrimitive(v)) return [true, false];
    return [false, isPrimitive(v)];
  };
  if (Array.isArray(node)) for (const [index, element] of node.entries()) {
    const f = filterByValue(element);
    if (f[0]) yield {
      name: index.toString(),
      _kind: `entry`,
      sourceValue: element,
      leafValue: f[1] ? element : void 0
    };
  }
  else if (typeof node === `object`) {
    const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
    for (const [name, value$1] of entriesIter) {
      const [filter2, isPrimitive$1] = filterByValue(value$1);
      if (filter2) yield {
        name,
        _kind: `entry`,
        sourceValue: value$1,
        leafValue: isPrimitive$1 ? value$1 : void 0
      };
    }
  }
}
function* depthFirst$1(node, options = {}, ancestors = []) {
  for (const c of children(node, options)) {
    yield {
      ...c,
      ancestors: [...ancestors],
      _kind: `entry-ancestors`
    };
    yield* depthFirst$1(c.sourceValue, options, [...ancestors, c.name]);
  }
}
function childByName(name, node) {
  for (const d of children(node)) if (d.name === name) return d;
}
function getByPath(path, node, options = {}) {
  const v = last$2(traceByPath(path, node, options));
  if (!v) throw new Error(`Could not trace path: ${path} `);
  return v;
}
function* traceByPath(path, node, options = {}) {
  resultThrow(nullUndefTest(path, `path`), nullUndefTest(node, `node`));
  const separator = options.separator ?? `.`;
  const pathSplit = path.split(separator);
  const ancestors = [];
  for (const p of pathSplit) {
    const entry = childByName(p, node);
    if (!entry) {
      yield {
        name: p,
        sourceValue: void 0,
        leafValue: void 0,
        ancestors,
        _kind: `entry-ancestors`
      };
      return;
    }
    node = entry.sourceValue;
    yield {
      ...entry,
      ancestors: [...ancestors],
      _kind: `entry-ancestors`
    };
    ancestors.push(p);
  }
}
var asDynamicTraversable = (node, options = {}, ancestors = [], parent) => {
  const name = options.name ?? `object`;
  const t2 = {
    *children() {
      for (const { name: childName, sourceValue, leafValue } of children(node, options)) yield asDynamicTraversable(sourceValue, {
        ...options,
        name: childName
      }, [...ancestors, name], t2);
    },
    getParent() {
      return parent;
    },
    getValue() {
      return {
        name,
        sourceValue: node,
        ancestors,
        _kind: `entry-static`
      };
    },
    getIdentity() {
      return node;
    }
  };
  return t2;
};
var createWrapped = (node, options) => {
  return wrap2(create$3(node, options));
};
var create$3 = (node, options = {}) => {
  const valuesAtLeaves = options.valuesAtLeaves ?? false;
  const valueFor = valuesAtLeaves ? (v) => {
    if (isPrimitive(v)) return v;
  } : (v) => v;
  return createImpl(node, valueFor(node), options, []);
};
var createImpl = (sourceValue, leafValue, options = {}, ancestors) => {
  const defaultName = options.name ?? `object_ci`;
  const r = root({
    name: defaultName,
    sourceValue: leafValue,
    ancestors: [...ancestors],
    _kind: `entry-static`
  });
  ancestors = [...ancestors, defaultName];
  for (const c of children(sourceValue, options)) {
    const v = options.valuesAtLeaves ? c.leafValue : c.sourceValue;
    add$1(createImpl(c.sourceValue, v, {
      ...options,
      name: c.name
    }, ancestors), r);
  }
  return r;
};
var createSimplified = (node, options = {}) => {
  return stripParentage(create$3(node, options));
};
function getNamedEntry(node, defaultName = ``) {
  if (`name` in node && `leafValue` in node && `sourceValue` in node) return {
    name: node.name,
    _kind: `entry`,
    leafValue: node.leafValue,
    sourceValue: node.sourceValue
  };
  if (`name` in node) return {
    name: node.name,
    leafValue: node,
    sourceValue: node,
    _kind: `entry`
  };
  return {
    name: defaultName,
    leafValue: node,
    sourceValue: node,
    _kind: `entry`
  };
}
var pathed_exports = {};
__export2(pathed_exports, {
  addValueByPath: () => addValueByPath,
  childrenLengthByPath: () => childrenLengthByPath,
  clearValuesByPath: () => clearValuesByPath,
  create: () => create$2,
  removeByPath: () => removeByPath,
  valueByPath: () => valueByPath,
  valuesByPath: () => valuesByPath
});
var create$2 = (pathOpts = {}) => {
  let root$1;
  const add$2 = (value$1, path) => {
    const n = addValueByPath(value$1, path, root$1, pathOpts);
    if (root$1 === void 0) root$1 = getRoot(n);
  };
  const prettyPrint$1 = () => {
    if (root$1 === void 0) return `(empty)`;
    return toStringDeep$2(root$1);
  };
  const getValue = (path) => {
    if (root$1 === void 0) return;
    return valueByPath(path, root$1, pathOpts);
  };
  const remove$1 = (path) => {
    if (root$1 === void 0) return false;
    return removeByPath(path, root$1, pathOpts);
  };
  const hasPath = (path) => {
    if (root$1 === void 0) return false;
    const c = findChildByPath(path, root$1, pathOpts);
    return c !== void 0;
  };
  const getNode = (path) => {
    if (root$1 === void 0) return;
    const c = findChildByPath(path, root$1, pathOpts);
    return c;
  };
  const childrenLength$2 = (path) => {
    if (root$1 === void 0) return 0;
    const c = findChildByPath(path, root$1, pathOpts);
    if (c === void 0) return 0;
    return c.childrenStore.length;
  };
  const getValues = (path) => {
    if (root$1 === void 0) return [];
    return valuesByPath(path, root$1, pathOpts);
  };
  const getRoot$1 = () => {
    return root$1;
  };
  const clearValues = (path) => {
    if (root$1 === void 0) return false;
    return clearValuesByPath(path, root$1, pathOpts);
  };
  return {
    getRoot: getRoot$1,
    add: add$2,
    prettyPrint: prettyPrint$1,
    remove: remove$1,
    getValue,
    getValues,
    hasPath,
    childrenLength: childrenLength$2,
    getNode,
    clearValues
  };
};
var addValueByPath = (value$1, path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const duplicatePath = pathOpts.duplicates ?? `overwrite`;
  const split = path.split(separator);
  let count3 = 0;
  for (const p of split) {
    const lastEntry = count3 === split.length - 1;
    const found = findChildByLabel(p, node);
    if (found === void 0) {
      const labelled = {
        value: lastEntry ? value$1 : void 0,
        label: p
      };
      node = createNode(labelled, node);
    } else {
      node = found;
      if (lastEntry) switch (duplicatePath) {
        case `ignore`:
          break;
        case `allow`: {
          const existing = getValuesFromNode(node);
          node.value = {
            values: [...existing, value$1],
            label: p
          };
          break;
        }
        case `overwrite`: {
          node.value = {
            value: value$1,
            label: p
          };
          break;
        }
      }
      else node = found;
    }
    count3++;
  }
  if (node === void 0) throw new Error(`Could not create tree`);
  return node;
};
var removeByPath = (path, root$1, pathOpts = {}) => {
  if (root$1 === void 0) return false;
  const c = findChildByPath(path, root$1, pathOpts);
  if (c === void 0) return false;
  remove2(c);
  return true;
};
var clearValuesByPath = (path, root$1, pathOpts = {}) => {
  if (root$1 === void 0) return false;
  const c = findChildByPath(path, root$1, pathOpts);
  if (c === void 0) return false;
  c.value = {
    label: c.value?.label ?? ``,
    value: void 0
  };
  return true;
};
var childrenLengthByPath = (path, node, pathOpts = {}) => {
  if (node === void 0) return 0;
  const c = findChildByPath(path, node, pathOpts);
  if (c === void 0) return 0;
  return c.childrenStore.length;
};
var findChildByLabel = (label, node) => {
  if (node === void 0) return void 0;
  if (label === void 0) throw new Error(`Parameter 'label' cannot be undefined`);
  if (node.value?.label === label) return node;
  for (const c of node.childrenStore) if (c.value?.label === label) return c;
};
var valueByPath = (path, node, pathOpts = {}) => {
  const values2 = valuesByPath(path, node, pathOpts);
  if (values2.length === 0) return void 0;
  if (values2.length > 1) throw new Error(`Multiple values at path. Use getValues instead`);
  return values2[0];
};
var getValuesFromNode = (c) => {
  if (c.value === void 0) return [];
  if (`values` in c.value) return c.value.values;
  if (`value` in c.value) {
    if (c.value.value === void 0) return [];
    return [c.value.value];
  }
  return [];
};
var findChildByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) return;
  }
  return c;
};
var valuesByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) return [];
  }
  return getValuesFromNode(c);
};
var traversable_tree_exports = {};
__export2(traversable_tree_exports, {
  breadthFirst: () => breadthFirst,
  childrenLength: () => childrenLength,
  couldAddChild: () => couldAddChild,
  depthFirst: () => depthFirst,
  find: () => find2,
  findAnyChildByValue: () => findAnyChildByValue,
  findAnyParentByValue: () => findAnyParentByValue,
  findByValue: () => findByValue,
  findChildByValue: () => findChildByValue,
  findParentByValue: () => findParentByValue,
  followValue: () => followValue,
  hasAnyChild: () => hasAnyChild,
  hasAnyChildValue: () => hasAnyChildValue,
  hasAnyParent: () => hasAnyParent,
  hasAnyParentValue: () => hasAnyParentValue,
  hasChild: () => hasChild,
  hasChildValue: () => hasChildValue,
  hasParent: () => hasParent,
  hasParentValue: () => hasParentValue,
  parents: () => parents,
  siblings: () => siblings,
  toString: () => toString,
  toStringDeep: () => toStringDeep
});
var childrenLength = (tree) => {
  return [...tree.children()].length;
};
var hasAnyParent = (child, possibleParent, eq) => {
  return hasParent(child, possibleParent, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyParentValue = (child, possibleParentValue, eq) => {
  if (typeof child === `undefined`) throw new TypeError(`Param 'child' is undefined`);
  return hasParentValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var findAnyParentByValue = (child, possibleParentValue, eq) => {
  return findParentByValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasParent = (child, possibleParent, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  const isChildTrav = isTraversable(child);
  const isParentTrav = isTraversable(possibleParent);
  const p = isChildTrav ? child.getParent() : child.parent;
  if (typeof p === `undefined`) return false;
  if (eq(p, possibleParent)) return true;
  const pId = isChildTrav ? p.getIdentity() : p.value;
  const ppId = isParentTrav ? possibleParent.getIdentity() : possibleParent.value;
  if (eq(pId, ppId)) return true;
  return hasParent(p, possibleParent, eq, maxDepth - 1);
};
var hasParentValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (child === void 0) throw new Error(`Param 'child' is undefined`);
  if (maxDepth < 0) return false;
  const p = `getParent` in child ? child.getParent() : child.parent;
  if (p === void 0) return false;
  const value$1 = `getValue` in p ? p.getValue() : p.value;
  if (eq(value$1, possibleParentValue)) return true;
  return hasParentValue(p, possibleParentValue, eq, maxDepth - 1);
};
var findParentByValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return;
  const p = `getParent` in child ? child.getParent() : child.parent;
  if (p === void 0) return;
  const value$1 = `getValue` in p ? p.getValue() : p.value;
  if (eq(value$1, possibleParentValue)) return p;
  return findParentByValue(p, possibleParentValue, eq, maxDepth - 1);
};
var couldAddChild = (parent, prospectiveChild, eq = isEqualDefault) => {
  if (eq(parent, prospectiveChild)) throw new Error(`Child equals parent`);
  if (hasAnyChild(parent, prospectiveChild, eq)) throw new Error(`Circular. Parent already has child`);
  if (hasAnyChild(prospectiveChild, parent, eq)) throw new Error(`Prospective child has parent as child relation`);
};
var hasAnyChild = (parent, possibleChild, eq = isEqualDefault) => {
  return hasChild(parent, possibleChild, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyChildValue = (parent, possibleChildValue, eq = isEqualDefault) => {
  return hasChildValue(parent, possibleChildValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasChild = (parent, possibleChild, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent, possibleChild)) return true;
  const pId = `getIdentity` in parent ? parent.getIdentity() : parent.value;
  const pcId = `getIdentity` in possibleChild ? possibleChild.getIdentity() : possibleChild.value;
  if (eq(pId, pcId)) return true;
  for (const c of breadthFirst(parent, maxDepth)) {
    const cId = `getIdentity` in c ? c.getIdentity() : c.value;
    if (eq(c, possibleChild)) return true;
    if (eq(cId, pcId)) return true;
  }
  return false;
};
var hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent.getValue(), possibleValue)) return true;
  for (const c of breadthFirst(parent, maxDepth)) {
    const v = c.getValue();
    if (eq(v, possibleValue)) return true;
  }
  return false;
};
function* siblings(node) {
  const p = node.getParent();
  if (p === void 0) return;
  for (const s of p.children()) {
    if (s === node) continue;
    yield s;
  }
}
function* parents(node) {
  if (isTraversable(node)) {
    let p = node.getParent();
    while (p !== void 0) {
      yield p;
      p = p.getParent();
    }
  } else {
    let p = node.parent;
    while (p !== void 0) {
      yield p;
      p = p.parent;
    }
  }
}
function findAnyChildByValue(parent, possibleValue, eq = isEqualDefault) {
  return findChildByValue(parent, possibleValue, eq, Number.MAX_SAFE_INTEGER);
}
function findChildByValue(parent, possibleValue, eq = isEqualDefault, maxDepth = 0) {
  if (maxDepth < 0) return;
  const isTraver = isTraversable(parent);
  if (isTraver) {
    if (eq(parent.getValue(), possibleValue)) return parent;
  } else if (eq(parent.value, possibleValue)) return parent;
  for (const d of breadthFirst(parent, maxDepth)) if (isTraver) {
    if (eq(d.getValue(), possibleValue)) return d;
  } else if (eq(d.value, possibleValue)) return d;
  return;
}
function* depthFirst(root$1) {
  if (!root$1) return;
  const stack = new StackMutable();
  let entry = root$1;
  while (entry) {
    const entries$1 = isTraversable(entry) ? [...entry.children()] : [...entry.childrenStore];
    stack.push(...entries$1);
    if (stack.isEmpty) break;
    entry = stack.pop();
    if (entry) yield entry;
  }
}
function* breadthFirst(root$1, depth = Number.MAX_SAFE_INTEGER) {
  if (!root$1) return;
  const isTrav = isTraversable(root$1);
  const queue = isTrav ? new QueueMutable2() : new QueueMutable2();
  let entry = root$1;
  while (entry) {
    if (depth < 0) return;
    if (entry !== void 0) {
      const kids = `childrenStore` in entry ? entry.childrenStore : entry.children();
      for (const c of kids) {
        yield c;
        queue.enqueue(c);
      }
    }
    entry = queue.dequeue();
    depth--;
  }
}
function find2(root$1, predicate, order = `breadth`) {
  if (predicate(root$1)) return root$1;
  const iter = order === `breadth` ? breadthFirst : depthFirst;
  for (const c of iter(root$1)) if (predicate(c)) return c;
}
function findByValue(root$1, predicate, order = `breadth`) {
  if (predicate(root$1.getValue())) return root$1;
  const iter = order === `breadth` ? breadthFirst : depthFirst;
  for (const c of iter(root$1)) if (predicate(c.getValue())) return c;
}
function* followValue(root$1, continuePredicate, depth = 1) {
  for (const c of root$1.children()) if (continuePredicate(c.getValue(), depth)) {
    yield c.getValue();
    yield* followValue(c, continuePredicate, depth + 1);
  }
}
function toStringDeep(node, depth = 0) {
  if (node === void 0) return `(undefined)`;
  if (node === null) return `(null)`;
  const v = node.getValue();
  let type = typeof v;
  if (Array.isArray(v)) type = `array`;
  let t2 = `  `.repeat(depth) + `value: ${JSON.stringify(v)} (${type})
`;
  for (const n of node.children()) t2 += toStringDeep(n, depth + 1);
  return t2;
}
function toString(...nodes) {
  let t2 = ``;
  for (const node of nodes) {
    const v = node.getValue();
    const vString = toStringAbbreviate(v);
    const children$2 = [...node.children()];
    const parent = node.getParent();
    let type = typeof v;
    if (Array.isArray(v)) type = `array`;
    t2 += `value: ${vString} (${type}) kids: ${children$2.length} parented: ${parent ? `y` : `n`}
`;
  }
  return t2;
}
var tree_exports = {};
__export2(tree_exports, {
  FromObject: () => traverse_object_exports,
  Mutable: () => tree_mutable_exports,
  Pathed: () => pathed_exports,
  Traverse: () => traversable_tree_exports,
  compare: () => compare,
  isTraversable: () => isTraversable,
  isTreeNode: () => isTreeNode,
  toTraversable: () => toTraversable
});
var toTraversable = (node) => {
  if (isTraversable(node)) return node;
  if (isTreeNode(node)) return asDynamicTraversable$1(node);
  if (typeof node === `object`) return asDynamicTraversable(node);
  throw new Error(`Parameter 'node' not convertible`);
};
var isTreeNode = (node) => {
  if (`parent` in node && `childrenStore` in node && `value` in node) {
    if (Array.isArray(node.childrenStore)) return true;
  }
  return false;
};
var isTraversable = (node) => {
  return `children` in node && `getParent` in node && `getValue` in node && `getIdentity` in node;
};
var StackImmutable = class StackImmutable2 {
  opts;
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new StackImmutable2(this.opts, push(this.opts, this.data, ...toAdd));
  }
  pop() {
    return new StackImmutable2(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty$1(this.opts, this.data);
  }
  get isFull() {
    return isFull$1(this.opts, this.data);
  }
  get peek() {
    return peek$1(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var immutable$3 = (options = {}, ...startingItems) => new StackImmutable({ ...options }, [...startingItems]);
var stack_exports = {};
__export2(stack_exports, {
  StackImmutable: () => StackImmutable,
  StackMutable: () => StackMutable,
  immutable: () => immutable$3,
  isEmpty: () => isEmpty$1,
  isFull: () => isFull$1,
  mutable: () => mutable$3,
  peek: () => peek$1,
  pop: () => pop,
  push: () => push,
  trimStack: () => trimStack
});
var mutable$2 = (keyString) => new SetStringMutable(keyString);
var SetStringMutable = class extends SimpleEventEmitter {
  store = /* @__PURE__ */ new Map();
  keyString;
  /**
  * Constructor
  * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
  */
  constructor(keyString) {
    super();
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
  add(...values2) {
    let somethingAdded = false;
    for (const value$1 of values2) {
      const isUpdated = this.has(value$1);
      this.store.set(this.keyString(value$1), value$1);
      super.fireEvent(`add`, {
        value: value$1,
        updated: isUpdated
      });
      if (!isUpdated) somethingAdded = true;
    }
    return somethingAdded;
  }
  /**
  * Returns values from set as an iterable
  * @returns
  */
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
var SetStringImmutable = class SetStringImmutable2 {
  store;
  keyString;
  constructor(keyString, map$12) {
    this.store = map$12 ?? /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  get size() {
    return this.store.size;
  }
  add(...values2) {
    const s = new Map(this.store);
    for (const v of values2) {
      const key = this.keyString(v);
      s.set(key, v);
    }
    return new SetStringImmutable2(this.keyString, s);
  }
  delete(v) {
    const s = new Map(this.store);
    const key = this.keyString(v);
    if (s.delete(key)) return new SetStringImmutable2(this.keyString, s);
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
var immutable$2 = (keyString = toStringDefault) => new SetStringImmutable(keyString);
var MassiveSet = class MassiveSet2 {
  #depth;
  #maxDepth;
  children = /* @__PURE__ */ new Map();
  values = [];
  constructor(maxDepth = 1, depth = 0) {
    this.#depth = depth;
    this.#maxDepth = maxDepth;
  }
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
    for (const c of this.children.values()) t2 += c.sizeChildrenDeep();
    return t2;
  }
  /**
  * Returns the total number of values stored in the set
  */
  size() {
    let x = this.values.length;
    for (const set$12 of this.children.values()) x += set$12.size();
    return x;
  }
  add(value$1) {
    if (typeof value$1 !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value$1}`);
    if (value$1.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value$1, true);
    if (destination === this) {
      if (!this.hasLocal(value$1)) this.values.push(value$1);
      return;
    }
    if (!destination) throw new Error(`Could not create child set for: ${value$1}`);
    destination.add(value$1);
  }
  remove(value$1) {
    if (typeof value$1 !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value$1}`);
    if (value$1.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value$1, false);
    if (destination === void 0) return false;
    if (destination === this) {
      if (this.hasLocal(value$1)) {
        this.values = this.values.filter((v) => v !== value$1);
        return true;
      }
      return false;
    }
    return destination.remove(value$1);
  }
  debugDump() {
    const r = this.#dumpToArray();
    for (const rr of r) console.log(rr);
  }
  #dumpToArray(depth = 0) {
    const r = [];
    r.push(`Depth: ${this.#depth} Max: ${this.#maxDepth}`);
    for (const [key, value$1] of this.children.entries()) {
      const dumped = value$1.#dumpToArray(depth + 1);
      r.push(` key: ${key}`);
      for (const d of dumped) r.push(` `.repeat(depth + 1) + d);
    }
    r.push(`Values: (${this.values.length})`);
    for (const v of this.values) r.push(` ${v}`);
    return r.map((line) => ` `.repeat(depth) + line);
  }
  #getChild(value$1, create$4) {
    if (value$1 === void 0) throw new Error(`Param 'value' undefined`);
    if (this.#depth === this.#maxDepth) return this;
    if (value$1.length <= this.#depth) return this;
    const k = value$1[this.#depth];
    if (k === void 0) throw new Error(`Logic error. Depth: ${this.#depth} Len: ${value$1.length}`);
    let child = this.children.get(k);
    if (child === void 0 && create$4) {
      child = new MassiveSet2(this.#maxDepth, this.#depth + 1);
      this.children.set(k, child);
    }
    return child;
  }
  /**
  * Returns _true_ if `value` stored on this node
  * @param value
  * @returns
  */
  hasLocal(value$1) {
    for (const v of this.values) if (v === value$1) return true;
    return false;
  }
  has(value$1) {
    if (typeof value$1 !== `string`) return false;
    const destination = this.#getChild(value$1, false);
    if (destination === void 0) return false;
    if (destination === this) return this.hasLocal(value$1);
    return destination.has(value$1);
  }
};
var set_exports = {};
__export2(set_exports, {
  MassiveSet: () => MassiveSet,
  SetStringImmutable: () => SetStringImmutable,
  SetStringMutable: () => SetStringMutable,
  immutable: () => immutable$2,
  mutable: () => mutable$2
});
var PriorityMutable = class extends QueueMutable2 {
  constructor(opts = {}) {
    if (opts.eq === void 0) opts = {
      ...opts,
      eq: (a, b) => {
        return isEqualDefault(a.item, b.item);
      }
    };
    super(opts);
  }
  /**
  * Adds an item with a given priority
  * @param item Item
  * @param priority Priority (higher numeric value means higher priority)
  */
  enqueueWithPriority(item, priority$1) {
    resultThrow(numberTest(priority$1, `positive`));
    super.enqueue({
      item,
      priority: priority$1
    });
  }
  changePriority(item, priority$1, addIfMissing = false, eq) {
    if (item === void 0) throw new Error(`Item cannot be undefined`);
    let toDelete;
    for (const d of this.data) if (eq) {
      if (eq(d.item, item)) {
        toDelete = d;
        break;
      }
    } else if (this.eq(d, {
      item,
      priority: 0
    })) {
      toDelete = d;
      break;
    }
    if (toDelete === void 0 && !addIfMissing) throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
    if (toDelete !== void 0) this.removeWhere((item$1) => toDelete === item$1);
    this.enqueueWithPriority(item, priority$1);
  }
  dequeueMax() {
    const m = last(max$1(this.data, (a, b) => a.priority >= b.priority));
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  dequeueMin() {
    const m = last(max$1(this.data, (a, b) => a.priority >= b.priority));
    if (m === void 0) return;
    this.removeWhere((item) => item.item === m);
    return m.item;
  }
  peekMax() {
    const m = last(max$1(this.data, (a, b) => a.priority >= b.priority));
    if (m === void 0) return;
    return m.item;
  }
  peekMin() {
    const m = last(min$1(this.data, (a, b) => a.priority >= b.priority));
    if (m === void 0) return;
    return m.item;
  }
};
function priority(opts = {}) {
  return new PriorityMutable(opts);
}
var QueueImmutable = class QueueImmutable2 {
  opts;
  #data;
  /**
  * Creates an instance of Queue.
  * @param {QueueOpts} opts Options foor queue
  * @param {V[]} data Initial data. Index 0 is front of queue
  */
  constructor(opts = {}, data = []) {
    if (opts === void 0) throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.#data = data;
  }
  forEach(fn) {
    for (let index = this.#data.length - 1; index >= 0; index--) fn(this.#data[index]);
  }
  forEachFromFront(fn) {
    this.#data.forEach((item) => {
      fn(item);
    });
  }
  enqueue(...toAdd) {
    return new QueueImmutable2(this.opts, enqueue(this.opts, this.#data, ...toAdd));
  }
  dequeue() {
    return new QueueImmutable2(this.opts, dequeue(this.opts, this.#data));
  }
  get isEmpty() {
    return isEmpty(this.opts, this.#data);
  }
  get isFull() {
    return isFull(this.opts, this.#data);
  }
  get length() {
    return this.#data.length;
  }
  get peek() {
    return peek(this.opts, this.#data);
  }
  toArray() {
    return [...this.#data];
  }
};
var immutable$1 = (options = {}, ...startingItems) => {
  options = { ...options };
  return new QueueImmutable(options, [...startingItems]);
};
var queue_exports = {};
__export2(queue_exports, {
  PriorityMutable: () => PriorityMutable,
  QueueImmutable: () => QueueImmutable,
  QueueMutable: () => QueueMutable2,
  debug: () => debug,
  dequeue: () => dequeue,
  enqueue: () => enqueue,
  immutable: () => immutable$1,
  isEmpty: () => isEmpty,
  isFull: () => isFull,
  mutable: () => mutable$1,
  peek: () => peek,
  priority: () => priority,
  trimQueue: () => trimQueue
});
var create$1 = (options = {}) => new ExpiringMap(options);
var ExpiringMap = class extends SimpleEventEmitter {
  capacity;
  store;
  evictPolicy;
  autoDeleteElapsedMs;
  autoDeletePolicy;
  autoDeleteTimer;
  disposed = false;
  constructor(opts = {}) {
    super();
    this.capacity = opts.capacity ?? -1;
    resultThrow(integerTest(this.capacity, `nonZero`, `capacity`));
    this.store = /* @__PURE__ */ new Map();
    if (opts.evictPolicy && this.capacity <= 0) throw new Error(`evictPolicy is set, but no capacity limit is set`);
    this.evictPolicy = opts.evictPolicy ?? `none`;
    this.autoDeleteElapsedMs = opts.autoDeleteElapsedMs ?? -1;
    this.autoDeletePolicy = opts.autoDeletePolicy ?? `none`;
    if (this.autoDeleteElapsedMs > 0) this.autoDeleteTimer = setInterval(() => {
      this.#maintain();
    }, Math.max(1e3, this.autoDeleteElapsedMs * 2));
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.autoDeleteTimer) {
      clearInterval(this.autoDeleteTimer);
      this.autoDeleteTimer = void 0;
    }
  }
  /**
  * Returns the number of keys being stored.
  */
  get keyLength() {
    return this.store.size;
  }
  *entries() {
    for (const entry of this.store.entries()) yield [entry[0], entry[1].value];
  }
  *values() {
    for (const v of this.store.values()) yield v.value;
  }
  *keys() {
    yield* this.store.keys();
  }
  /**
  * Returns the elapsed time since `key`
  * was set. Returns _undefined_ if `key`
  * does not exist
  */
  elapsedSet(key) {
    const v = this.store.get(key);
    if (typeof v === `undefined`) return;
    return Date.now() - v.lastSet;
  }
  /**
  * Returns the elapsed time since `key`
  * was accessed. Returns _undefined_ if `key`
  * does not exist
  */
  elapsedGet(key) {
    const v = this.store.get(key);
    if (typeof v === `undefined`) return;
    return Date.now() - v.lastGet;
  }
  /**
  * Returns true if `key` is stored.
  * Does not affect the key's last access time.
  * @param key
  * @returns
  */
  has(key) {
    return this.store.has(key);
  }
  /**
  * Gets an item from the map by key, returning
  * undefined if not present
  * @param key Key
  * @returns Value, or undefined
  */
  get(key) {
    const v = this.store.get(key);
    if (v) {
      if (this.autoDeletePolicy === `either` || this.autoDeletePolicy === `get`) this.store.set(key, {
        ...v,
        lastGet: performance.now()
      });
      return v.value;
    }
  }
  /**
  * Deletes the value under `key`, if present.
  *
  * Returns _true_ if something was removed.
  * @param key
  * @returns
  */
  delete(key) {
    const value$1 = this.store.get(key);
    if (!value$1) return false;
    const d = this.store.delete(key);
    this.fireEvent(`removed`, {
      key,
      value: value$1.value
    });
    return d;
  }
  /**
  * Clears the contents of the map.
  * Note: does not fire `removed` event
  */
  clear() {
    this.store.clear();
  }
  /**
  * Updates the lastSet/lastGet time for a value
  * under `k`.
  *
  * Returns false if key was not found
  * @param key
  * @returns
  */
  touch(key) {
    const v = this.store.get(key);
    if (!v) return false;
    this.store.set(key, {
      ...v,
      lastSet: Date.now(),
      lastGet: Date.now()
    });
    return true;
  }
  findEvicteeKey() {
    if (this.evictPolicy === `none`) return;
    let sortBy = ``;
    if (this.evictPolicy === `oldestGet`) sortBy = `lastGet`;
    else if (this.evictPolicy === `oldestSet`) sortBy = `lastSet`;
    else throw new Error(`Unknown eviction policy ${this.evictPolicy}`);
    const sorted = sortByValueProperty(this.store, sortBy);
    return sorted[0][0];
  }
  #maintain() {
    if (this.autoDeletePolicy === `none`) return;
    this.deleteWithElapsed(this.autoDeleteElapsedMs, this.autoDeletePolicy);
  }
  /**
  * Deletes all values where elapsed time has past
  * for get/set or either.
  * ```js
  * // Delete all keys (and associated values) not accessed for a minute
  * em.deleteWithElapsed({mins:1}, `get`);
  * // Delete things that were set 1s ago
  * em.deleteWithElapsed(1000, `set`);
  * ```
  *
  * @param interval Interval
  * @param property Basis for deletion 'get','set' or 'either'
  * @returns Items removed
  */
  deleteWithElapsed(interval2, property) {
    const entries$1 = [...this.store.entries()];
    const prune = [];
    const intervalMs = intervalToMs(interval2, 1e3);
    const now = performance.now();
    for (const entry of entries$1) {
      const elapsedGet = now - entry[1].lastGet;
      const elapsedSet = now - entry[1].lastSet;
      const elapsed = property === `get` ? elapsedGet : property === `set` ? elapsedSet : Math.max(elapsedGet, elapsedSet);
      if (elapsed >= intervalMs) prune.push([entry[0], entry[1].value]);
    }
    for (const entry of prune) {
      this.store.delete(entry[0]);
      const eventArguments = {
        key: entry[0],
        value: entry[1]
      };
      this.fireEvent(`expired`, eventArguments);
      this.fireEvent(`removed`, eventArguments);
    }
    return prune;
  }
  /**
  * Sets the `key` to be `value`.
  *
  * If the key already exists, it is updated.
  *
  * If the map is full, according to its capacity,
  * another value is selected for removal.
  * @param key
  * @param value
  * @returns
  */
  set(key, value$1) {
    const existing = this.store.get(key);
    if (existing) {
      this.store.set(key, {
        ...existing,
        lastSet: performance.now()
      });
      return;
    }
    if (this.keyLength === this.capacity && this.capacity > 0) {
      const key$1 = this.findEvicteeKey();
      if (!key$1) throw new Error(`ExpiringMap full (capacity: ${this.capacity})`);
      const existing$1 = this.store.get(key$1);
      this.store.delete(key$1);
      if (existing$1) {
        const eventArguments = {
          key: key$1,
          value: existing$1.value
        };
        this.fireEvent(`expired`, eventArguments);
        this.fireEvent(`removed`, eventArguments);
      }
    }
    this.store.set(key, {
      lastGet: 0,
      lastSet: performance.now(),
      value: value$1
    });
    this.fireEvent(`newKey`, {
      key,
      value: value$1
    });
  }
};
var firstEntry = (map$12, predicate) => {
  for (const e of map$12.entries()) {
    const value$1 = e[1];
    for (const subValue of value$1) if (predicate(subValue, e[0])) return e;
  }
};
var lengthMax = (map$12) => {
  let largest = ["", 0];
  for (const e of map$12.keysAndCounts()) if (e[1] > largest[1]) largest = e;
  return largest[1];
};
var firstEntryByValue = (map$12, value$1, isEqual3 = isEqualDefault) => {
  for (const e of map$12.entries()) {
    const value_ = e[1];
    for (const subValue of value_) if (isEqual3(subValue, value$1)) return e;
  }
};
var MapOfSimpleBase = class {
  map;
  groupBy;
  valueEq;
  /**
  * Constructor
  * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
  * @param valueEq Compare values. By default uses JS logic for equality
  */
  constructor(groupBy2 = defaultKeyer, valueEq = isEqualDefault, initial = []) {
    this.groupBy = groupBy2;
    this.valueEq = valueEq;
    this.map = new Map(initial);
  }
  /**
  * Returns _true_ if `key` exists
  * @param key
  * @returns
  */
  has(key) {
    return this.map.has(key);
  }
  /**
  * Returns _true_ if `value` exists under `key`.
  * @param key Key
  * @param value Value to seek under `key`
  * @returns _True_ if `value` exists under `key`.
  */
  hasKeyValue(key, value$1) {
    const values2 = this.map.get(key);
    if (!values2) return false;
    for (const v of values2) if (this.valueEq(v, value$1)) return true;
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
  * Return number of values stored under `key`.
  * Returns 0 if `key` is not found.
  * @param key
  * @returns
  */
  count(key) {
    const values2 = this.map.get(key);
    if (!values2) return 0;
    return values2.length;
  }
  /**
  * Returns first key that contains `value`
  * @param value
  * @param eq
  * @returns
  */
  firstKeyByValue(value$1, eq = isEqualDefault) {
    const entry = firstEntryByValue(this, value$1, eq);
    if (entry) return entry[0];
  }
  /**
  * Iterate over all entries
  */
  *entriesFlat() {
    for (const key of this.map.keys()) for (const value$1 of this.map.get(key)) yield [key, value$1];
  }
  /**
  * Iterate over keys and array of values for that key
  */
  *entries() {
    for (const [k, v] of this.map.entries()) yield [k, [...v]];
  }
  /**
  * Get all values under `key`
  * @param key
  * @returns
  */
  *get(key) {
    const m = this.map.get(key);
    if (!m) return;
    yield* m.values();
  }
  /**
  * Iterate over all keys
  */
  *keys() {
    yield* this.map.keys();
  }
  /**
  * Iterate over all values (regardless of key).
  * Use {@link values} to iterate over a set of values per key
  */
  *valuesFlat() {
    for (const entries$1 of this.map) yield* entries$1[1];
  }
  /**
  * Yields the values for each key in sequence, returning an array.
  * Use {@link valuesFlat} to iterate over all keys regardless of key.
  */
  *values() {
    for (const entries$1 of this.map) yield entries$1[1];
  }
  /**
  * Iterate over keys and length of values stored under keys
  */
  *keysAndCounts() {
    for (const entries$1 of this.map) yield [entries$1[0], entries$1[1].length];
  }
  /**
  * Returns the count of keys.
  */
  get lengthKeys() {
    return this.map.size;
  }
  /**
  * _True_ if empty
  */
  get isEmpty() {
    return this.map.size === 0;
  }
};
var MapOfSimpleMutable = class extends MapOfSimpleBase {
  addKeyedValues(key, ...values2) {
    const existing = this.map.get(key);
    if (existing === void 0) this.map.set(key, values2);
    else this.map.set(key, [...existing, ...values2]);
  }
  /**
  * Set `values` to `key`.
  * Previous data stored under `key` is thrown away.
  * @param key
  * @param values
  */
  setValues(key, values2) {
    this.map.set(key, values2);
  }
  /**
  * Adds a value, automatically extracting a key via the
  * `groupBy` function assigned in the constructor options.
  * @param values Adds several values
  */
  addValue(...values2) {
    for (const v of values2) {
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
  deleteKeyValue(key, value$1) {
    const existing = this.map.get(key);
    if (existing === void 0) return false;
    const without$1 = existing.filter((existingValue) => !this.valueEq(existingValue, value$1));
    this.map.set(key, without$1);
    return without$1.length < existing.length;
  }
  /**
  * Deletes `value` regardless of key.
  *
  * Uses the constructor-defined equality function.
  * @param value Value to delete
  * @returns
  */
  deleteByValue(value$1) {
    let del$1 = false;
    const entries$1 = [...this.map.entries()];
    for (const keyEntries of entries$1) for (const values2 of keyEntries[1]) if (this.valueEq(values2, value$1)) {
      del$1 = true;
      this.deleteKeyValue(keyEntries[0], value$1);
    }
    return del$1;
  }
  /**
  * Deletes all values under `key`,
  * @param key
  * @returns _True_ if `key` was found and values stored
  */
  delete(key) {
    const values2 = this.map.get(key);
    if (!values2) return false;
    if (values2.length === 0) return false;
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
var ofSimpleMutable = (groupBy2 = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimpleMutable(groupBy2, valueEq);
var addArray = (map$12, data) => {
  const x = new Map(map$12.entries());
  for (const d of data) {
    if (d[0] === void 0) throw new Error(`key cannot be undefined`);
    if (d[1] === void 0) throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  }
  return x;
};
var addObjects = (map$12, data) => {
  const x = new Map(map$12.entries());
  for (const d of data) {
    if (d.key === void 0) throw new Error(`key cannot be undefined`);
    if (d.value === void 0) throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  }
  return x;
};
var has = (map$12, key) => map$12.has(key);
var add = (map$12, ...data) => {
  if (map$12 === void 0) throw new Error(`map parameter is undefined`);
  if (data === void 0) throw new Error(`data parameter i.s undefined`);
  if (data.length === 0) return map$12;
  const firstRecord = data[0];
  const isObject = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObject ? addObjects(map$12, data) : addArray(map$12, data);
};
var set = (map$12, key, value$1) => {
  const x = new Map(map$12.entries());
  x.set(key, value$1);
  return x;
};
var del = (map$12, key) => {
  const x = new Map(map$12.entries());
  x.delete(key);
  return x;
};
var immutable2 = (dataOrMap) => {
  if (dataOrMap === void 0) return immutable2([]);
  if (Array.isArray(dataOrMap)) return immutable2(add(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add(data, ...itemsToAdd);
      return immutable2(s);
    },
    set: (key, value$1) => {
      const s = set(data, key, value$1);
      return immutable2(s);
    },
    get: (key) => data.get(key),
    delete: (key) => immutable2(del(data, key)),
    clear: () => immutable2(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    values: () => data.values(),
    isEmpty: () => data.size === 0
  };
};
var mutable = (...data) => {
  let m = add(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data$1) => {
      m = add(m, ...data$1);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add(/* @__PURE__ */ new Map());
    },
    set: (key, value$1) => {
      m = set(m, key, value$1);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    values: () => m.values(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};
var MapOfMutableImpl = class extends SimpleEventEmitter {
  #map = /* @__PURE__ */ new Map();
  groupBy;
  type;
  constructor(type, opts = {}) {
    super();
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  /**
  * Returns the type name. For in-built implementations, it will be one of: array, set or circular
  */
  get typeName() {
    return this.type.name;
  }
  /**
  * Returns the number of keys
  */
  get lengthKeys() {
    return this.#map.size;
  }
  /**
  * Returns the length of the longest child list
  */
  get lengthMax() {
    let m = 0;
    for (const v of this.#map.values()) m = Math.max(m, this.type.count(v));
    return m;
  }
  debugString() {
    const keys = [...this.#map.keys()];
    let r = `Keys: ${keys.join(`, `)}\r
`;
    for (const k of keys) {
      const v = this.#map.get(k);
      if (v === void 0) r += ` - ${k} (undefined)\r
`;
      else {
        const asArray2 = this.type.toArray(v);
        if (asArray2 !== void 0) r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(asArray2)}\r
`;
      }
    }
    return r;
  }
  get isEmpty() {
    return this.#map.size === 0;
  }
  clear() {
    this.#map.clear();
    super.fireEvent(`clear`, true);
  }
  addKeyedValues(key, ...values2) {
    const set$12 = this.#map.get(key);
    if (set$12 === void 0) {
      this.#map.set(key, this.type.addKeyedValues(void 0, values2));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values: values2 });
    } else {
      this.#map.set(key, this.type.addKeyedValues(set$12, values2));
      super.fireEvent(`addedValues`, { values: values2 });
    }
  }
  set(key, values2) {
    this.addKeyedValues(key, ...values2);
    return this;
  }
  addValue(...values2) {
    for (const v of values2) this.addKeyedValues(this.groupBy(v), v);
  }
  hasKeyValue(key, value$1, eq) {
    const m = this.#map.get(key);
    if (m === void 0) return false;
    return this.type.has(m, value$1, eq);
  }
  has(key) {
    return this.#map.has(key);
  }
  deleteKeyValue(key, value$1) {
    const a = this.#map.get(key);
    if (a === void 0) return false;
    return this.deleteKeyValueFromMap(a, key, value$1);
  }
  deleteKeyValueFromMap(map$12, key, value$1) {
    const preCount = this.type.count(map$12);
    const filtered = this.type.without(map$12, value$1);
    const postCount = filtered.length;
    this.#map.set(key, this.type.addKeyedValues(void 0, filtered));
    return preCount > postCount;
  }
  deleteByValue(value$1) {
    let something = false;
    [...this.#map.keys()].filter((key) => {
      const a = this.#map.get(key);
      if (!a) throw new Error(`Bug: map could not be accessed`);
      if (this.deleteKeyValueFromMap(a, key, value$1)) {
        something = true;
        if (this.count(key) === 0) this.delete(key);
      }
    });
    return something;
  }
  delete(key) {
    const a = this.#map.get(key);
    if (a === void 0) return false;
    this.#map.delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  firstKeyByValue(value$1, eq = isEqualDefault) {
    const keys = [...this.#map.keys()];
    const found = keys.find((key) => {
      const a = this.#map.get(key);
      if (a === void 0) throw new Error(`Bug: map could not be accessed`);
      const r = this.type.has(a, value$1, eq);
      return r;
    });
    return found;
  }
  count(key) {
    const entry = this.#map.get(key);
    if (entry === void 0) return 0;
    return this.type.count(entry);
  }
  /**
  * Iterates over values stored under `key`
  * An empty array is returned if there are no values
  */
  *get(key) {
    const m = this.#map.get(key);
    if (m === void 0) return;
    yield* this.type.iterable(m);
  }
  /**
  * Iterate over the values stored under `key`.
  * If key does not exist, iteration is essentially a no-op
  * @param key
  * @returns
  */
  *valuesFor(key) {
    const m = this.#map.get(key);
    if (m === void 0) return;
    yield* this.type.iterable(m);
  }
  getSource(key) {
    return this.#map.get(key);
  }
  *keys() {
    yield* this.#map.keys();
  }
  *entriesFlat() {
    for (const entry of this.#map.entries()) for (const v of this.type.iterable(entry[1])) yield [entry[0], v];
  }
  *valuesFlat() {
    for (const entry of this.#map.entries()) yield* this.type.iterable(entry[1]);
  }
  *entries() {
    for (const [k, v] of this.#map.entries()) {
      const temporary = [...this.type.iterable(v)];
      yield [k, temporary];
    }
  }
  *keysAndCounts() {
    for (const key of this.keys()) yield [key, this.count(key)];
  }
  merge(other) {
    for (const key of other.keys()) {
      const data = other.get(key);
      this.addKeyedValues(key, ...data);
    }
  }
  get size() {
    return this.#map.size;
  }
  get [Symbol.toStringTag]() {
    return this.#map[Symbol.toStringTag];
  }
};
var ofSetMutable = (options) => {
  const hash = options?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t2 = {
    get name() {
      return `set`;
    },
    iterable: (source) => source.values(),
    addKeyedValues: (dest, values2) => addValue(dest, hash, `skip`, ...values2),
    count: (source) => source.size,
    find: (source, predicate) => findValue(source, predicate),
    filter: (source, predicate) => filterValues(source, predicate),
    toArray: (source) => toArray(source),
    has: (source, value$1) => hasAnyValue(source, value$1, comparer),
    without: (source, value$1) => without(toArray(source), value$1, comparer)
  };
  const m = new MapOfMutableImpl(t2, options);
  return m;
};
var ofCircularMutable = (options) => {
  const comparer = isEqualDefault;
  const t2 = {
    get name() {
      return `circular`;
    },
    addKeyedValues: (destination, values2) => {
      let ca = destination ?? new CircularArray(options.capacity);
      for (const v of values2) ca = ca.add(v);
      return ca;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    iterable: (source) => source.values(),
    has: (source, value$1) => source.find((v) => comparer(v, value$1)) !== void 0,
    without: (source, value$1) => source.filter((v) => !comparer(v, value$1))
  };
  return new MapOfMutableImpl(t2, options);
};
var NumberMap = class extends Map {
  defaultValue;
  constructor(defaultValue = 0) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    const v = super.get(key);
    if (v === void 0) return this.defaultValue;
    return v;
  }
  reset(key) {
    super.set(key, this.defaultValue);
    return this.defaultValue;
  }
  multiply(key, amount) {
    const v = super.get(key);
    let value$1 = v ?? this.defaultValue;
    value$1 *= amount;
    super.set(key, value$1);
    return value$1;
  }
  add(key, amount = 1) {
    const v = super.get(key);
    let value$1 = v ?? this.defaultValue;
    value$1 += amount;
    super.set(key, value$1);
    return value$1;
  }
  subtract(key, amount = 1) {
    const v = super.get(key);
    let value$1 = v ?? this.defaultValue;
    value$1 -= amount;
    super.set(key, value$1);
    return value$1;
  }
};
var ofArrayMutable = (options = {}) => {
  const convertToString = options.convertToString;
  const toStringFunction = typeof convertToString === `undefined` ? isEqualDefault : (a, b) => convertToString(a) === convertToString(b);
  const comparer = options.comparer ?? toStringFunction;
  const t2 = {
    get name() {
      return `array`;
    },
    addKeyedValues: (destination, values2) => {
      if (destination === void 0) return [...values2];
      return [...destination, ...values2];
    },
    iterable: (source) => source.values(),
    count: (source) => source.length,
    find: (source, predicate) => source.find((f) => predicate(f)),
    filter: (source, predicate) => source.filter((f) => predicate(f)),
    toArray: (source) => source,
    has: (source, value$1) => source.some((v) => comparer(v, value$1)),
    without: (source, value$1) => source.filter((v) => !comparer(v, value$1))
  };
  const m = new MapOfMutableImpl(t2, options);
  return m;
};
var MapOfSimple2 = class MapOfSimple3 extends MapOfSimpleBase {
  addKeyedValues(key, ...values2) {
    return this.addBatch([[key, values2]]);
  }
  addValue(...values2) {
    const asEntries = values2.map((v) => [this.groupBy(v), v]);
    return this.addBatch(asEntries);
  }
  addBatch(entries$1) {
    const temporary = new Map([...this.map.entries()].map((e) => [e[0], [...e[1]]]));
    for (const [key, list] of entries$1) {
      const existingList = temporary.get(key);
      if (typeof existingList === `undefined`) temporary.set(key, list);
      else existingList.push(...list);
    }
    return new MapOfSimple3(this.groupBy, this.valueEq, [...temporary.entries()]);
  }
  clear() {
    return new MapOfSimple3(this.groupBy, this.valueEq);
  }
  deleteKeyValue(_key, _value) {
    throw new Error(`Method not implemented.`);
  }
  deleteByValue(value$1, eq) {
    const entries$1 = [...this.map.entries()];
    const eqFunction = eq ?? this.valueEq;
    const x = entries$1.map((entry) => {
      const key = entry[0];
      const values2 = entry[1].filter((vv) => !eqFunction(vv, value$1));
      return [key, values2];
    });
    return new MapOfSimple3(this.groupBy, this.valueEq, x);
  }
  delete(key) {
    const entries$1 = [...this.map.entries()].filter((e) => e[0] !== key);
    return new MapOfSimple3(this.groupBy, this.valueEq, entries$1);
  }
};
var ofSimple = (groupBy2 = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimple2(groupBy2, valueEq);
var map_exports = {};
__export2(map_exports, {
  ExpiringMap: () => ExpiringMap,
  MapOfMutableImpl: () => MapOfMutableImpl,
  MapOfSimple: () => MapOfSimple2,
  MapOfSimpleMutable: () => MapOfSimpleMutable,
  NumberMap: () => NumberMap,
  addObjectEntriesMutate: () => addObjectEntriesMutate,
  addValue: () => addValue,
  addValueMutate: () => addValueMutate,
  addValueMutator: () => addValueMutator,
  deleteByValueCompareMutate: () => deleteByValueCompareMutate,
  expiringMap: () => create$1,
  filterValues: () => filterValues,
  findBySomeKey: () => findBySomeKey,
  findEntryByPredicate: () => findEntryByPredicate,
  findEntryByValue: () => findEntryByValue,
  findValue: () => findValue,
  firstEntry: () => firstEntry,
  firstEntryByValue: () => firstEntryByValue,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  immutable: () => immutable2,
  lengthMax: () => lengthMax,
  mapOfSimpleMutable: () => ofSimpleMutable,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  mutable: () => mutable,
  ofArrayMutable: () => ofArrayMutable,
  ofCircularMutable: () => ofCircularMutable,
  ofSetMutable: () => ofSetMutable,
  ofSimple: () => ofSimple,
  ofSimpleMutable: () => ofSimpleMutable,
  some: () => some,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});
var Table = class {
  rows = [];
  rowLabels = [];
  colLabels = [];
  /**
  * Keep track of widest row
  */
  columnMaxLength = 0;
  /**
  * Gets the label for a given column index,
  * returning _undefined_ if not found.
  *
  * Case-sensitive
  * @param label Label to seek
  * @returns Index of column, or _undefined_ if not found
  */
  getColumnLabelIndex(label) {
    for (const [index, l] of this.colLabels.entries()) if (l === label) return index;
  }
  /**
  * Gets the label for a given row index,
  * returning _undefined_ if not found.
  *
  * Case-sensitive
  * @param label Label to seek
  * @returns Index of row, or _undefined_ if not found
  */
  getRowLabelIndex(label) {
    for (const [index, l] of this.rowLabels.entries()) if (l === label) return index;
  }
  /**
  * Dumps the values of the table to the console
  */
  print() {
    console.table([...this.rowsWithLabelsObject()]);
  }
  /**
  * Return a copy of table as nested array
  *
  * ```js
  * const t = new Table();
  * // add stuff
  * // ...
  * const m = t.asArray();
  * for (const row of m) {
  *  for (const colValue of row) {
  *    // iterate over all column values for this row
  *  }
  * }
  * ```
  *
  * Alternative: get value at row Y and column X
  * ```js
  * const value = m[y][x];
  * ```
  * @returns
  */
  asArray() {
    const r = [];
    for (const row of this.rows) if (row === void 0) r.push([]);
    else r.push([...row]);
    return r;
  }
  /**
  * Return the number of rows
  */
  get rowCount() {
    return this.rows.length;
  }
  /**
  * Return the maximum number of columns in any row
  */
  get columnCount() {
    return this.columnMaxLength;
  }
  /**
  * Iterates over the table row-wise, in object format.
  * @see {@link rowsWithLabelsArray} to get rows in array format
  */
  *rowsWithLabelsObject() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsObject(index);
      yield labelledRow;
    }
  }
  /**
  * Iterates over each row, including the labels if available
  * @see {@link rowsWithLabelsObject} to get rows in object format
  */
  *rowsWithLabelsArray() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsArray(index);
      yield labelledRow;
    }
  }
  /**
  * Assign labels to columns
  * @param labels
  */
  labelColumns(...labels) {
    this.colLabels = labels;
  }
  /**
  * Assign label to a specific column
  * First column has an index of 0
  * @param columnIndex
  * @param label
  */
  labelColumn(columnIndex, label) {
    this.colLabels[columnIndex] = label;
  }
  /**
  * Label rows
  * @param labels Labels
  */
  labelRows(...labels) {
    this.rowLabels = labels;
  }
  /**
  * Assign label to a specific row
  * First row has an index of 0
  * @param rowIndex
  * @param label
  */
  labelRow(rowIndex, label) {
    this.rowLabels[rowIndex] = label;
  }
  /**
  * Adds a new row
  * @param data Columns
  */
  appendRow(...data) {
    this.columnMaxLength = Math.max(this.columnMaxLength, data.length);
    this.rows.push(data);
    return data;
  }
  /**
  * Gets a row along with labels, as an array
  * @param rowIndex
  * @returns
  */
  getRowWithLabelsArray(rowIndex) {
    const row = this.rows.at(rowIndex);
    if (row === void 0) return void 0;
    return row.map((value$1, index) => [this.colLabels.at(index), value$1]);
  }
  /**
  * Return a row of objects. Keys use the column labels.
  *
  * ```js
  * const row = table.getRowWithLabelsObject(10);
  * // eg:
  * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
  * ```
  * @param rowIndex
  * @returns
  */
  getRowWithLabelsObject(rowIndex) {
    const row = this.rows.at(rowIndex);
    if (row === void 0) return void 0;
    const object = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object[label] = row[index];
    }
    return object;
  }
  /**
  * Gets or creates a row at given position
  * @param row Index or label of row
  * @returns
  */
  #getOrCreateRawRow(row) {
    const index = typeof row === `number` ? row : this.getRowLabelIndex(row);
    if (index === void 0) return {
      success: false,
      error: `row-label-notfound`
    };
    if (index < 0) return {
      success: false,
      error: `row-index-invalid`
    };
    if (index < this.rows.length) return {
      success: true,
      value: this.rows[index]
    };
    const newRow = [];
    this.rows[index] = newRow;
    return {
      success: true,
      value: newRow
    };
  }
  /**
  * Gets a copy of values at given row, specified by index or label
  * @param row
  * @returns Returns row or throws an error if label or index not found
  */
  row(row) {
    const r = this.#getRowRaw(row);
    if (resultIsError(r)) throw new Error(r.error);
    return [...r.value];
  }
  /**
  * Set the value of row,columm.
  * Row is created if it doesn't exist, with the other column values being _undefined_
  * @param row Index or label
  * @param column Column
  * @param value Value to set at row,column
  */
  set(row, column, value$1) {
    const result = this.#getOrCreateRawRow(row);
    if (resultIsError(result)) throw new Error(result.error);
    const r = result.value;
    const columnIndex = typeof column === `number` ? column : this.getColumnLabelIndex(column);
    if (typeof columnIndex === `undefined`) throw new Error(`Column label '${column}' not found or is invalid`);
    if (columnIndex < 0) throw new Error(`Column index invalid (less than zero)`);
    r[columnIndex] = value$1;
  }
  /**
  * Gets the value at a specified row and column.
  * Throws an error if coordinates are out of range or missing.
  * @param row Row index or label
  * @param column Column index or label
  * @returns
  */
  get(row, column) {
    const rowR = this.#getRowRaw(row);
    if (resultIsError(rowR)) throw new Error(rowR.error);
    const colR = this.#getColumnRaw(rowR.value, column);
    if (resultIsError(colR)) throw new Error(colR.error);
    return colR.value.value;
  }
  #getRowRaw(row) {
    let index = 0;
    if (typeof row === `number`) index = row;
    else {
      index = this.getRowLabelIndex(row);
      if (typeof index !== `number`) return {
        error: `row-label-notfound`,
        success: false
      };
    }
    if (typeof index !== `number`) return {
      error: `row-invalid`,
      success: false
    };
    if (index < 0 || index >= this.rows.length) return {
      error: `row-index-out-of-range`,
      success: false
    };
    return {
      success: true,
      value: this.rows[index]
    };
  }
  #getColumnRaw(row, column) {
    const colIndex = typeof column === `number` ? column : this.getColumnLabelIndex(column);
    if (typeof colIndex !== `number`) return {
      success: false,
      error: `col-label-notfound`
    };
    if (colIndex < 0 || colIndex >= row.length) return {
      success: false,
      error: `col-index-out-of-range`
    };
    return {
      success: true,
      value: {
        index: colIndex,
        value: row[colIndex]
      }
    };
  }
  /**
  * Set all the columns of a row to a specified value.
  *
  * By default, sets the number of columns corresponding to
  * the table's maximum column length. To set an arbitrary
  * length of the row, use `length`
  * @param row Index or label of row
  * @param length How wide the row is. If unset, uses the current maximum width of rows.
  * @param value Value to set
  */
  setRow(row, value$1, length2) {
    const rowResult = this.#getOrCreateRawRow(row);
    if (resultIsError(rowResult)) throw new Error(rowResult.error);
    const r = rowResult.value;
    const width = typeof length2 === `number` ? length2 : this.columnMaxLength;
    for (let columnNumber = 0; columnNumber < width; columnNumber++) r[columnNumber] = value$1;
    return r;
  }
};
var directed_graph_exports = {};
__export2(directed_graph_exports, {
  adjacentVertices: () => adjacentVertices$1,
  areAdjacent: () => areAdjacent,
  bfs: () => bfs,
  clone: () => clone,
  connect: () => connect$1,
  connectTo: () => connectTo$1,
  connectWithEdges: () => connectWithEdges$1,
  createVertex: () => createVertex$1,
  dfs: () => dfs,
  disconnect: () => disconnect,
  distance: () => distance,
  distanceDefault: () => distanceDefault,
  dumpGraph: () => dumpGraph$1,
  edges: () => edges,
  get: () => get,
  getCycles: () => getCycles,
  getOrCreate: () => getOrCreate$1,
  getOrFail: () => getOrFail,
  graph: () => graph$1,
  graphFromVertices: () => graphFromVertices,
  hasKey: () => hasKey,
  hasNoOuts: () => hasNoOuts,
  hasOnlyOuts: () => hasOnlyOuts,
  hasOut: () => hasOut,
  isAcyclic: () => isAcyclic,
  pathDijkstra: () => pathDijkstra,
  toAdjacencyMatrix: () => toAdjacencyMatrix$1,
  topologicalSort: () => topologicalSort,
  transitiveReduction: () => transitiveReduction,
  updateGraphVertex: () => updateGraphVertex$1,
  vertexHasOut: () => vertexHasOut,
  vertices: () => vertices
});
var createVertex$1 = (id) => {
  return {
    id,
    out: []
  };
};
function hasKey(graph$2, key) {
  resultThrow(graphTest(graph$2));
  return graph$2.vertices.has(key);
}
function get(graph$2, key) {
  resultThrow(graphTest(graph$2));
  resultThrow(stringTest(key, `non-empty`, `key`));
  return graph$2.vertices.get(key);
}
function toAdjacencyMatrix$1(graph$2) {
  resultThrow(graphTest(graph$2));
  const v = [...graph$2.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, false, v.length);
    const ii = v[i];
    for (const [j, jj] of v.entries()) if (ii.out.some((o) => o.id === jj.id)) table.set(i, j, true);
  }
  return table;
}
var dumpGraph$1 = (graph$2) => {
  const lines = debugGraphToArray$1(graph$2);
  return lines.join(`
`);
};
var debugGraphToArray$1 = (graph$2) => {
  const r = [];
  const vertices$1 = `vertices` in graph$2 ? graph$2.vertices.values() : graph$2;
  for (const v of vertices$1) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line) => ` ${line}`));
  }
  return r;
};
var distance = (graph$2, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function* edges(graph$2) {
  resultThrow(graphTest(graph$2));
  const vertices$1 = [...graph$2.vertices.values()];
  for (const vertex of vertices$1) for (const edge of vertex.out) yield edge;
}
function* vertices(graph$2) {
  resultThrow(graphTest(graph$2));
  const vertices$1 = [...graph$2.vertices.values()];
  for (const vertex of vertices$1) yield vertex;
}
function graphTest(g, parameterName = `graph`) {
  if (g === void 0) return {
    success: false,
    error: `Param '${parameterName}' is undefined. Expected Graph`
  };
  if (g === null) return {
    success: false,
    error: `Param '${parameterName}' is null. Expected Graph`
  };
  if (typeof g === `object`) {
    if (!(`vertices` in g)) return {
      success: false,
      error: `Param '${parameterName}.vertices' does not exist. Is it a Graph type?`
    };
  } else return {
    success: false,
    error: `Param '${parameterName} is type '${typeof g}'. Expected an object Graph`
  };
  return {
    success: true,
    value: g
  };
}
function* adjacentVertices$1(graph$2, context) {
  resultThrow(graphTest(graph$2));
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph$2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph$2.vertices.get(edge.id);
    if (edgeV === void 0) throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0) return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph$2, vertex) => {
  resultThrow(graphTest(graph$2));
  const context = typeof vertex === `string` ? graph$2.vertices.get(vertex) : vertex;
  if (context === void 0) return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph$2, vertex, ...outIdOrVertex) => {
  resultThrow(graphTest(graph$2));
  const context = resolveVertex$1(graph$2, vertex);
  const outs = outIdOrVertex.map((o) => resolveVertex$1(graph$2, o));
  if (outs.length !== context.out.length) return false;
  for (const out of outs) if (!hasOut(graph$2, context, out)) return false;
  return true;
};
var hasOut = (graph$2, vertex, outIdOrVertex) => {
  resultThrow(graphTest(graph$2));
  const context = resolveVertex$1(graph$2, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate$1 = (graph$2, id) => {
  resultThrow(graphTest(graph$2));
  const v = graph$2.vertices.get(id);
  if (v !== void 0) return {
    graph: graph$2,
    vertex: v
  };
  const vv = createVertex$1(id);
  const gg = updateGraphVertex$1(graph$2, vv);
  return {
    graph: gg,
    vertex: vv
  };
};
var getOrFail = (graph$2, id) => {
  resultThrow(graphTest(graph$2));
  const v = graph$2.vertices.get(id);
  if (v === void 0) throw new Error(`Vertex '${id}' not found in graph`);
  return v;
};
var updateGraphVertex$1 = (graph$2, vertex) => {
  resultThrow(graphTest(graph$2));
  const gr = {
    ...graph$2,
    vertices: graph$2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph$2, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function disconnect(graph$2, from2, to$1) {
  resultThrow(graphTest(graph$2));
  const fromV = resolveVertex$1(graph$2, from2);
  const toV = resolveVertex$1(graph$2, to$1);
  return hasOut(graph$2, fromV, toV) ? updateGraphVertex$1(graph$2, {
    ...fromV,
    out: fromV.out.filter((t2) => t2.id !== toV.id)
  }) : graph$2;
}
function connectTo$1(graph$2, from2, to$1, weight2) {
  resultThrow(graphTest(graph$2));
  const fromResult = getOrCreate$1(graph$2, from2);
  graph$2 = fromResult.graph;
  const toResult = getOrCreate$1(graph$2, to$1);
  graph$2 = toResult.graph;
  const edge = {
    id: to$1,
    weight: weight2
  };
  if (!hasOut(graph$2, fromResult.vertex, toResult.vertex)) graph$2 = updateGraphVertex$1(graph$2, {
    ...fromResult.vertex,
    out: [...fromResult.vertex.out, edge]
  });
  return {
    graph: graph$2,
    edge
  };
}
function connect$1(graph$2, options) {
  if (typeof graph$2 !== `object`) throw new TypeError(`Param 'graph' is expected to be a DirectedGraph object. Got: ${typeof graph$2}`);
  if (typeof options !== `object`) throw new TypeError(`Param 'options' is expected to be ConnectOptions object. Got: ${typeof options}`);
  const result = connectWithEdges$1(graph$2, options);
  return result.graph;
}
function connectWithEdges$1(graph$2, options) {
  resultThrow(graphTest(graph$2));
  const { to: to$1, weight: weight2, from: from2 } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to$1) ? to$1 : [to$1];
  const edges$12 = [];
  for (const toSingle of toList) {
    const result = connectTo$1(graph$2, from2, toSingle, weight2);
    graph$2 = result.graph;
    edges$12.push(result.edge);
  }
  if (!bidi) return {
    graph: graph$2,
    edges: edges$12
  };
  for (const toSingle of toList) {
    const result = connectTo$1(graph$2, toSingle, from2, weight2);
    graph$2 = result.graph;
    edges$12.push(result.edge);
  }
  return {
    graph: graph$2,
    edges: edges$12
  };
}
var debugDumpVertex = (v) => {
  const r = [v.id];
  const stringForEdge$1 = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) r.push(` -> ${stringForEdge$1(edge)}`);
  if (v.out.length === 0) r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph$2, a, b) {
  resultThrow(graphTest(graph$2));
  if (hasOut(graph$2, a, b.id)) return true;
  if (hasOut(graph$2, b, a.id)) return true;
}
function resolveVertex$1(graph$2, idOrVertex) {
  resultThrow(graphTest(graph$2));
  if (idOrVertex === void 0) throw new Error(`Param 'idOrVertex' is undefined. Expected string or Vertex`);
  const v = typeof idOrVertex === `string` ? graph$2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph$2, startIdOrVertex, targetIdOrVertex) {
  resultThrow(graphTest(graph$2));
  const start = resolveVertex$1(graph$2, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex$1(graph$2, targetIdOrVertex);
  const queue = new QueueMutable2();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v) return;
    for (const edge of adjacentVertices$1(graph$2, v)) if (!seen.has(edge.id)) {
      seen.add(edge.id);
      queue.enqueue(resolveVertex$1(graph$2, edge.id));
    }
  }
}
function* dfs(graph$2, startIdOrVertex) {
  resultThrow(graphTest(graph$2));
  const source = resolveVertex$1(graph$2, startIdOrVertex);
  const s = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s.push(source);
  while (!s.isEmpty) {
    const v = s.pop();
    if (v === void 0) continue;
    if (!seen.has(v.id)) {
      seen.add(v.id);
      yield v;
      for (const edge of v.out) {
        const destination = graph$2.vertices.get(edge.id);
        if (destination) s.push(destination);
      }
    }
  }
}
var pathDijkstra = (graph$2, sourceOrId) => {
  resultThrow(graphTest(graph$2));
  const source = typeof sourceOrId === `string` ? graph$2.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0) throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices$1 = [...graph$2.vertices.values()];
  for (const v of vertices$1) {
    if (v.id !== source.id) {
      distances.set(v.id, Number.MAX_SAFE_INTEGER);
      previous.set(v.id, null);
    }
    pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u = pq.dequeueMin();
    if (u === void 0) throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph$2.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance(graph$2, neighbour);
      if (alt < distances.get(neighbour.id)) {
        distances.set(neighbour.id, alt);
        previous.set(neighbour.id, vertexU);
        pq.changePriority(neighbour.id, alt, true);
      }
    }
  }
  const pathTo = (id) => {
    const path = [];
    while (true) {
      if (id === source.id) break;
      const v = previous.get(id);
      if (v === void 0 || v === null) throw new Error(`Id not present: ${id}`);
      path.push({
        id,
        weight: distances.get(id)
      });
      id = v.id;
    }
    return path;
  };
  return {
    distances,
    previous,
    pathTo
  };
};
var clone = (graph$2) => {
  resultThrow(graphTest(graph$2));
  const g = { vertices: immutable2([...graph$2.vertices.entries()]) };
  return g;
};
var graph$1 = (...initialConnections) => {
  let g = { vertices: immutable2() };
  for (const ic of initialConnections) g = connect$1(g, ic);
  return g;
};
function isAcyclic(graph$2) {
  resultThrow(graphTest(graph$2));
  const cycles = getCycles(graph$2);
  return cycles.length === 0;
}
function topologicalSort(graph$2) {
  resultThrow(graphTest(graph$2));
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph$2)) indegrees.add(edge.id, 1);
  const queue = new QueueMutable2();
  let vertexCount = 0;
  for (const vertex of vertices(graph$2)) {
    if (indegrees.get(vertex.id) === 0) queue.enqueue(vertex);
    vertexCount++;
  }
  const topOrder = [];
  while (!queue.isEmpty) {
    const u = queue.dequeue();
    topOrder.push(u);
    for (const neighbour of u.out) {
      const result = indegrees.subtract(neighbour.id, 1);
      if (result === 0) queue.enqueue(graph$2.vertices.get(neighbour.id));
    }
  }
  if (topOrder.length !== vertexCount) throw new Error(`Graph contains cycles`);
  return graphFromVertices(topOrder);
}
function graphFromVertices(vertices$1) {
  const keyValues = map$2(vertices$1, (f) => {
    return [f.id, f];
  });
  const m = immutable2([...keyValues]);
  return { vertices: m };
}
function getCycles(graph$2) {
  resultThrow(graphTest(graph$2));
  let index = 0;
  const stack = new StackMutable();
  const vertices$1 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph$2.vertices.values()) vertices$1.set(v.id, {
    ...v,
    lowlink: NaN,
    index: NaN,
    onStack: false
  });
  const strongConnect = (vertex) => {
    vertex.index = index;
    vertex.lowlink = index;
    index++;
    stack.push(vertex);
    vertex.onStack = true;
    for (const edge of vertex.out) {
      const edgeV = vertices$1.get(edge.id);
      if (Number.isNaN(edgeV.index)) {
        strongConnect(edgeV);
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      } else if (edgeV.onStack) vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
    }
    if (vertex.lowlink === vertex.index) {
      const stronglyConnected = [];
      let w;
      while (vertex !== w) {
        w = stack.pop();
        w.onStack = false;
        stronglyConnected.push({
          id: w.id,
          out: w.out
        });
      }
      if (stronglyConnected.length > 1) scc.push(stronglyConnected);
    }
  };
  for (const v of vertices$1.values()) if (Number.isNaN(v.index)) strongConnect(v);
  return scc;
}
function transitiveReduction(graph$2) {
  resultThrow(graphTest(graph$2));
  for (const u of vertices(graph$2)) for (const v of adjacentVertices$1(graph$2, u)) for (const v1 of dfs(graph$2, v)) {
    if (v.id === v1.id) continue;
    if (hasOut(graph$2, u, v1)) {
      const g = disconnect(graph$2, u, v1);
      return transitiveReduction(g);
    }
  }
  return graph$2;
}
var undirected_graph_exports = {};
__export2(undirected_graph_exports, {
  adjacentVertices: () => adjacentVertices,
  connect: () => connect,
  connectTo: () => connectTo,
  connectWithEdges: () => connectWithEdges,
  createVertex: () => createVertex,
  dumpGraph: () => dumpGraph,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate,
  graph: () => graph,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  updateGraphVertex: () => updateGraphVertex
});
var createVertex = (id) => {
  return { id };
};
var updateGraphVertex = (graph$2, vertex) => {
  const gr = {
    ...graph$2,
    vertices: graph$2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate = (graph$2, id) => {
  const v = graph$2.vertices.get(id);
  if (v !== void 0) return {
    graph: graph$2,
    vertex: v
  };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph$2, vv);
  return {
    graph: gg,
    vertex: vv
  };
};
function resolveVertex(graph$2, idOrVertex) {
  if (idOrVertex === void 0) throw new Error(`Param 'idOrVertex' is undefined. Expected string or Vertex`);
  if (graph$2 === void 0) throw new Error(`Param 'graph' is undefined. Expected Graph`);
  const v = typeof idOrVertex === `string` ? graph$2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph$2, a, b) => {
  const edge = getConnection(graph$2, a, b);
  return edge !== void 0;
};
var getConnection = (graph$2, a, b) => {
  if (a === void 0) throw new Error(`Param 'a' is undefined. Expected string or Vertex`);
  if (b === void 0) throw new Error(`Param 'b' is undefined. Expected string or Vertex`);
  if (graph$2 === void 0) throw new Error(`Param 'graph' is undefined. Expected Graph`);
  const aa = resolveVertex(graph$2, a);
  const bb = resolveVertex(graph$2, b);
  for (const edge of graph$2.edges) {
    if (edge.a == aa.id && edge.b === bb.id) return edge;
    if (edge.a == bb.id && edge.b === aa.id) return edge;
  }
  return;
};
function connectTo(graph$2, a, b, weight2) {
  const aResult = getOrCreate(graph$2, a);
  graph$2 = aResult.graph;
  const bResult = getOrCreate(graph$2, b);
  graph$2 = bResult.graph;
  let edge = getConnection(graph$2, a, b);
  if (edge !== void 0) return {
    graph: graph$2,
    edge
  };
  edge = {
    a,
    b,
    weight: weight2
  };
  const graphChanged = {
    ...graph$2,
    edges: [...graph$2.edges, edge]
  };
  return {
    graph: graphChanged,
    edge
  };
}
function connect(graph$2, options) {
  const result = connectWithEdges(graph$2, options);
  return result.graph;
}
function connectWithEdges(graph$2, options) {
  const { a, weight: weight2, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  const edges$12 = [];
  for (const destination of destinations) {
    const result = connectTo(graph$2, a, destination, weight2);
    graph$2 = result.graph;
    edges$12.push(result.edge);
  }
  return {
    graph: graph$2,
    edges: edges$12
  };
}
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable2(),
    edges: []
  };
  for (const ic of initialConnections) g = connect(g, ic);
  return g;
};
function toAdjacencyMatrix(graph$2) {
  const v = [...graph$2.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, false, v.length);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      const connected = hasConnection(graph$2, ii, jj);
      if (connected) table.set(i, j, true);
    }
  }
  return table;
}
var dumpGraph = (graph$2) => {
  const lines = debugGraphToArray(graph$2);
  return lines.join(`
`);
};
var debugGraphToArray = (graph$2) => {
  const r = [];
  r.push(`Vertices: ${[...graph$2.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph$2.edges) r.push(stringForEdge(edge));
  return r;
};
var stringForEdge = (edge) => {
  const weight2 = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight2}`;
};
function* adjacentVertices(graph$2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph$2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph$2.edges) if (edge.a === context) yield resolveVertex(graph$2, edge.b);
  else if (edge.b === context) yield resolveVertex(graph$2, edge.a);
}
function* edgesForVertex(graph$2, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph$2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph$2.edges) if (edge.a === context) yield edge;
  else if (edge.b === context) yield edge;
}
var graph_exports = {};
__export2(graph_exports, {
  Directed: () => directed_graph_exports,
  Undirected: () => undirected_graph_exports
});
var src_exports$2 = {};
__export2(src_exports$2, {
  CircularArray: () => CircularArray,
  ExpiringMap: () => ExpiringMap,
  Graphs: () => graph_exports,
  MapOfSimpleMutable: () => MapOfSimpleMutable,
  Maps: () => map_exports,
  QueueImmutable: () => QueueImmutable,
  QueueMutable: () => QueueMutable2,
  Queues: () => queue_exports,
  SetStringImmutable: () => SetStringImmutable,
  SetStringMutable: () => SetStringMutable,
  Sets: () => set_exports,
  StackImmutable: () => StackImmutable,
  StackMutable: () => StackMutable,
  Stacks: () => stack_exports,
  Table: () => Table,
  Trees: () => tree_exports
});
var getName = (t2, defaultValue = ``) => {
  if (typeof t2 === `object` && `name` in t2 && t2.name !== void 0) return t2.name;
  return defaultValue;
};
function* iterateBreadth(t2, pathPrefix) {
  if (typeof pathPrefix === `undefined`) pathPrefix = getName(t2);
  for (const [index, n] of entries(t2)) yield [n, pathPrefix];
  for (const [index, n] of entries(t2)) {
    const name = getName(n, `?`);
    const prefix = pathPrefix.length > 0 ? pathPrefix + `.` + name : name;
    yield* iterateBreadth(n, prefix);
  }
}
function* iterateDepth(t2, pathPrefix) {
  if (typeof pathPrefix === `undefined`) pathPrefix = getName(t2);
  for (const [index, n] of entries(t2)) {
    yield [n, pathPrefix];
    const name = getName(n, `?`);
    const prefix = pathPrefix.length > 0 ? pathPrefix + `.` + name : name;
    yield* iterateBreadth(n, prefix);
  }
}
function isSeqNode(n) {
  return n.seq !== void 0;
}
function isSelNode(n) {
  return n.sel !== void 0;
}
function* entries(n) {
  if (isSeqNode(n)) yield* n.seq.entries();
  else if (isSelNode(n)) yield* n.sel.entries();
  else if (typeof n === `string`) {
  } else throw new TypeError(`Unexpected shape of node. seq/sel missing`);
}
var delay2 = async (callback, optsOrMillis) => {
  const opts = typeof optsOrMillis === `number` ? { millis: optsOrMillis } : optsOrMillis;
  const delayWhen = opts.delay ?? `before`;
  if (delayWhen === `before` || delayWhen === `both`) await sleep(opts);
  const r = Promise.resolve(await callback());
  if (delayWhen === `after` || delayWhen === `both`) await sleep(opts);
  return r;
};
async function* delayAnimationLoop() {
  let resolve$1;
  let p = new Promise((r) => resolve$1 = r);
  let timer = 0;
  const callback = () => {
    if (resolve$1) resolve$1();
    p = new Promise((r) => resolve$1 = r);
  };
  try {
    while (true) {
      timer = globalThis.requestAnimationFrame(callback);
      const _ = await p;
      yield _;
    }
  } finally {
    if (resolve$1) resolve$1();
    globalThis.cancelAnimationFrame(timer);
  }
}
async function* delayLoop(timeout$1) {
  const timeoutMs = intervalToMs(timeout$1);
  if (typeof timeoutMs === `undefined`) throw new Error(`timeout is undefined`);
  if (timeoutMs < 0) throw new Error(`Timeout is less than zero`);
  if (timeoutMs === 0) return yield* delayAnimationLoop();
  let resolve$1;
  let p = new Promise((r) => resolve$1 = r);
  let timer;
  const callback = () => {
    if (resolve$1) resolve$1();
    p = new Promise((r) => resolve$1 = r);
  };
  try {
    while (true) {
      timer = globalThis.setTimeout(callback, timeoutMs);
      const _ = await p;
      yield _;
    }
  } finally {
    if (resolve$1) resolve$1();
    if (timer !== void 0) globalThis.clearTimeout(timer);
    timer = void 0;
  }
}
var timeout = (callback, interval2) => {
  if (callback === void 0) throw new Error(`callback parameter is undefined`);
  const intervalMs = intervalToMs(interval2);
  resultThrow(integerTest(intervalMs, `aboveZero`, `interval`));
  let timer;
  let startedAt = 0;
  let startCount = 0;
  let startCountTotal = 0;
  let state = `idle`;
  const clear = () => {
    startedAt = 0;
    globalThis.clearTimeout(timer);
    state = `idle`;
  };
  const start = async (altInterval = interval2, args) => {
    const p = new Promise((resolve$1, reject) => {
      startedAt = performance.now();
      const altTimeoutMs = intervalToMs(altInterval);
      const it = integerTest(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
      if (resultIsError(it)) {
        reject(resultToError(it));
        return;
      }
      switch (state) {
        case `scheduled`: {
          cancel();
          break;
        }
        case `running`:
          break;
      }
      state = `scheduled`;
      timer = globalThis.setTimeout(async () => {
        if (state !== `scheduled`) {
          console.warn(`Timeout skipping execution since state is not 'scheduled'`);
          clear();
          return;
        }
        const args_ = args ?? [];
        startCount++;
        startCountTotal++;
        state = `running`;
        await callback(performance.now() - startedAt, ...args_);
        state = `idle`;
        clear();
        resolve$1();
      }, altTimeoutMs);
    });
    return p;
  };
  const cancel = () => {
    if (state === `idle`) return;
    clear();
  };
  return {
    start,
    cancel,
    get runState() {
      return state;
    },
    get startCount() {
      return startCount;
    },
    get startCountTotal() {
      return startCountTotal;
    }
  };
};
var debounce2 = (callback, interval2) => {
  const t2 = timeout(callback, interval2);
  return (...args) => {
    t2.start(void 0, args);
  };
};
var DispatchList = class {
  #handlers;
  #counter = 0;
  #id = Math.floor(Math.random() * 100);
  constructor() {
    this.#handlers = [];
  }
  /**
  * Returns _true_ if list is empty
  * @returns
  */
  isEmpty() {
    return this.#handlers.length === 0;
  }
  /**
  * Adds a handler. You get back an id which can be used
  * to remove the handler later.
  *
  * Handlers can be added with 'once' flag set to _true_. This will
  * automatically remove them after the first value is sent to them.
  * @param handler
  * @param options
  * @returns
  */
  add(handler, options = {}) {
    this.#counter++;
    const once = options.once ?? false;
    const wrap$12 = {
      id: `${this.#id} - ${this.#counter}`,
      handler,
      once
    };
    this.#handlers.push(wrap$12);
    return wrap$12.id;
  }
  /**
  * Remove a handler by its id.
  * @param id
  * @returns _True_ if handler was removed, _false_ if not found.
  */
  remove(id) {
    const length2 = this.#handlers.length;
    this.#handlers = this.#handlers.filter((handler) => handler.id !== id);
    return this.#handlers.length !== length2;
  }
  /**
  * Emit a value to all handlers
  * @param value
  */
  notify(value$1) {
    for (const handler of this.#handlers) {
      handler.handler(value$1);
      if (handler.once) this.remove(handler.id);
    }
  }
  /**
  * Remove all handlers
  */
  clear() {
    this.#handlers = [];
  }
};
var everyNth = (nth, callback) => {
  resultThrow(integerTest(nth, `positive`, `nth`));
  let counter = 0;
  return (data) => {
    counter++;
    if (counter === nth) {
      counter = 0;
      if (callback) callback(data);
      return true;
    }
    return false;
  };
};
var run2 = async (expressions, opts = {}, args) => {
  const results = [];
  const compareFunction = opts.rank ?? defaultComparer;
  let expressionsArray = Array.isArray(expressions) ? expressions : [expressions];
  if (opts.shuffle) expressionsArray = shuffle(expressionsArray);
  for (let index = 0; index < expressionsArray.length; index++) {
    const exp = expressionsArray[index];
    let r;
    if (typeof exp === "function") r = await exp(args);
    else r = exp;
    if (r !== void 0) {
      results.push(r);
      results.sort(compareFunction);
    }
    if (typeof opts.stop !== "undefined") {
      if (opts.stop(r, results)) break;
    }
  }
  if (opts.filter) return results.filter(opts.filter);
  return results;
};
var runSingle = async (expressions, opts = {}, args) => {
  const results = await run2(expressions, opts, args);
  if (!results) return;
  if (results.length === 0) return;
  const at = opts.at ?? -1;
  return results.at(at);
};
var eventRace = (target, eventNames, options = {}) => {
  const intervalMs = options.timeoutMs ?? 601e3;
  const signal = options.signal;
  let triggered = false;
  let disposed = false;
  let timeout$1;
  const promise = new Promise((resolve$1, reject) => {
    const onEvent = (event2) => {
      if (`type` in event2) if (eventNames.includes(event2.type)) {
        triggered = true;
        resolve$1(event2);
        dispose();
      } else console.warn(`eventRace: Got event '${event2.type}' that is not in race list`);
      else {
        console.warn(`eventRace: Event data does not have expected 'type' field`);
        console.log(event2);
      }
    };
    for (const name of eventNames) target.addEventListener(name, onEvent);
    const dispose = () => {
      if (disposed) return;
      if (timeout$1 !== void 0) clearTimeout(timeout$1);
      timeout$1 = void 0;
      disposed = true;
      for (const name of eventNames) target.removeEventListener(name, onEvent);
    };
    timeout$1 = setTimeout(() => {
      if (triggered || disposed) return;
      dispose();
      reject(/* @__PURE__ */ new Error(`eventRace: Events not fired within interval. Events: ${JSON.stringify(eventNames)} Interval: ${intervalMs}`));
    }, intervalMs);
    signal?.addEventListener(`abort`, () => {
      if (triggered || disposed) return;
      dispose();
      reject(/* @__PURE__ */ new Error(`Abort signal received ${signal.reason}`));
    });
  });
  return promise;
};
var movingAverageTimed = (options) => {
  const average3 = movingAverageLight();
  const rm = rateMinimum({
    ...options,
    whatToCall: (distance$12) => {
      average3(distance$12);
    },
    fallback() {
      return options.default ?? 0;
    }
  });
  return (v) => {
    rm(v);
    return average3();
  };
};
var PoolUser = class extends SimpleEventEmitter {
  key;
  resource;
  _lastUpdate;
  _pool;
  _state;
  _userExpireAfterMs;
  /**
  * Constructor
  * @param key User key
  * @param resource Resource being used
  */
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  /**
  * Returns a human readable debug string
  * @returns
  */
  toString() {
    if (this.isDisposed) return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
  * Resets countdown for instance expiry.
  * Throws an error if instance is disposed.
  */
  keepAlive() {
    if (this._state === `disposed`) throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
  * @internal
  * @param reason
  * @returns
  */
  _dispose(reason, data) {
    if (this._state === `disposed`) return;
    const resource = this.resource;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, {
      data,
      reason
    });
    super.clearEventListeners();
  }
  /**
  * Release this instance
  * @param reason
  */
  release(reason) {
    if (this.isDisposed) throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, {
      data,
      reason
    });
    this._dispose(`release-${reason}`, data);
  }
  get data() {
    if (this.isDisposed) throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
  * Returns true if this instance has expired.
  * Expiry counts if elapsed time is greater than `userExpireAfterMs`
  */
  get isExpired() {
    if (this._userExpireAfterMs > 0) return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    return false;
  }
  /**
  * Returns elapsed time since last 'update'
  */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
  * Returns true if instance is disposed
  */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
  * Returns true if instance is neither disposed nor expired
  */
  get isValid() {
    if (this.isDisposed || this.isExpired) return false;
    if (this.resource.isDisposed) return false;
    return true;
  }
};
var Resource = class {
  pool;
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
  * Constructor.
  * @param pool Pool
  * @param data Data
  */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0) throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  /**
  * Gets data associated with resource.
  * Throws an error if disposed
  */
  get data() {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
  * Changes the data associated with this resource.
  * Throws an error if disposed or `data` is undefined.
  * @param data
  */
  updateData(data) {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
  * Returns a human-readable debug string for resource
  * @returns
  */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
  * Assigns a user to this resource.
  * @internal
  * @param user
  */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing) throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
  * Releases a user from this resource
  * @internal
  * @param user
  */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
  * Returns true if resource can have additional users allocated
  */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
  * Returns number of uses of the resource
  */
  get usersCount() {
    return this.#users.length;
  }
  /**
  * Returns true if automatic expiry is enabled, and that interval
  * has elapsed since the users list has changed for this resource
  */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0) return false;
    if (this.#users.length > 0) return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
  * Returns true if instance is disposed
  */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
  * Disposes the resource.
  * If it is already disposed, it does nothing.
  * @param reason
  * @returns
  */
  dispose(reason) {
    if (this.#state === `disposed`) return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) u._dispose(`resource-${reason}`, data);
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource) this.pool.freeResource(data);
  }
};
var Pool = class {
  _resources;
  _users;
  capacity;
  userExpireAfterMs;
  resourcesWithoutUserExpireAfterMs;
  capacityPerResource;
  fullPolicy;
  generateResource;
  freeResource;
  log = logSet(`Pool`);
  /**
  * Constructor.
  *
  * By default, no capacity limit, one user per resource
  * @param options Pool options
  */
  constructor(options = {}) {
    this.capacity = options.capacity ?? -1;
    this.fullPolicy = options.fullPolicy ?? `error`;
    this.capacityPerResource = options.capacityPerResource ?? 1;
    this.userExpireAfterMs = options.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = options.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = options.generate;
    this.freeResource = options.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, options.debug ?? false);
    const timer = Math.max(this.userExpireAfterMs, this.resourcesWithoutUserExpireAfterMs);
    if (timer > 0) setInterval(() => {
      this.maintain();
    }, timer * 1.1);
  }
  /**
  * Returns a debug string of Pool state
  * @returns
  */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r$1) => r$1.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) r += `	k: ${k} v: ${v.toString()}\r
`;
    return r;
  }
  /**
  * Sorts users by longest elapsed time since update
  * @returns
  */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa < bb) return 1;
      return -1;
    });
  }
  /**
  * Returns resources sorted with least used first
  * @returns
  */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount) return 0;
      if (a.usersCount < b.usersCount) return -1;
      return 1;
    });
  }
  /**
  * Adds a shared resource to the pool
  * @throws Error if the capacity limit is reached or resource is null
  * @param resource
  * @returns
  */
  addResource(resource) {
    if (resource === void 0) throw new Error(`Cannot add undefined resource`);
    if (resource === null) throw new TypeError(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) throw new Error(`Capacity limit (${this.capacity}) reached. Cannot add more.`);
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi3 = new Resource(this, resource);
    this._resources.push(pi3);
    return pi3;
  }
  /**
  * Performs maintenance, removing disposed/expired resources & users.
  * This is called automatically when using a resource.
  */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) if (p.isDisposed) {
      this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
      nuke.push(p);
    } else if (p.isExpiredFromUsers) {
      this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
      nuke.push(p);
    }
    if (nuke.length > 0) {
      for (const resource of nuke) resource.dispose(`diposed/expired`);
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) if (!user.isValid) {
      this.log.log(`Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`);
      userKeysToRemove.push(key);
      user._dispose(`invalid`, user.data);
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) this.log.log(`End: resource len: ${this._resources.length} users: ${this.usersLength}`);
  }
  /**
  * Iterate over resources in the pool.
  * To iterate over the data associated with each resource, use
  * `values`.
  */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) yield r;
  }
  /**
  * Iterate over resource values in the pool.
  * to iterate over the resources, use `resources`.
  *
  * Note that values may be returned even though there is no
  * active user.
  */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) yield r.data;
  }
  /**
  * Unassociate a key with a pool item
  * @param userKey
  */
  release(userKey, reason) {
    const pi3 = this._users.get(userKey);
    if (!pi3) return;
    pi3.release(reason ?? `Pool.release`);
  }
  /**
  * @internal
  * @param user
  */
  _release(user) {
    this._users.delete(user.key);
  }
  /**
  * @internal
  * @param resource
  * @param _
  */
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
  * Returns true if `v` has an associted resource in the pool
  * @param resource
  * @returns
  */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
  * Returns true if a given `userKey` is in use.
  * @param userKey
  * @returns
  */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
  * @internal
  * @param key
  * @param resource
  * @returns
  */
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
  * Allocates a resource for `userKey`
  * @internal
  * @param userKey
  * @returns
  */
  #allocateResource(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(`capacity: ${this.capacity} resources: ${this._resources.length}`);
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
  * Return the number of users
  */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
  * 'Uses' a resource, returning the value
  * @param userKey
  * @returns
  */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
  * Gets a pool item based on a 'user' key.
  *
  * The same key should return the same pool item,
  * for as long as it still exists.
  *
  * If a 'user' already has a resource, it will 'keep alive' their use.
  * If a 'user' does not already have resource
  *  - if there is capacity, a resource is allocated to user
  *  - if pool is full
  *    - fullPolicy = 'error': an error is thrown
  *    - fullPolicy = 'evictOldestUser': evicts an older user
  *    - Throw error
  * @param userKey
  * @throws Error If all resources are used and fullPolicy = 'error'
  * @returns
  */
  use(userKey) {
    const pi3 = this._users.get(userKey);
    if (pi3) {
      pi3.keepAlive();
      return pi3;
    }
    this.maintain();
    const match = this.#allocateResource(userKey);
    if (match) return match;
    if (this.fullPolicy === `error`) throw new Error(`Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`);
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this.#allocateResource(userKey);
        if (match2) return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (options = {}) => new Pool(options);
function promiseWithResolvers() {
  let resolve$1;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve$1 = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve: resolve$1,
    reject
  };
}
var rateMinimum = (options) => {
  let disposed = false;
  const t2 = timeout(() => {
    if (disposed) return;
    t2.start();
    options.whatToCall(options.fallback());
  }, options.interval);
  if (options.abort) options.abort.addEventListener(`abort`, (_) => {
    disposed = true;
    t2.cancel();
  });
  t2.start();
  return (args) => {
    if (disposed) throw new Error(`AbortSignal has been fired`);
    t2.start();
    options.whatToCall(args);
  };
};
async function* repeat2(produce, opts) {
  const signal = opts.signal ?? void 0;
  const delayWhen = opts.delayWhen ?? `before`;
  const count3 = opts.count ?? void 0;
  const allowUndefined = opts.allowUndefined ?? false;
  const minIntervalMs = opts.delayMinimum ? intervalToMs(opts.delayMinimum) : void 0;
  const whileFunction = opts.while;
  let cancelled = false;
  let sleepMs = intervalToMs(opts.delay, intervalToMs(opts.delayMinimum, 0));
  let started = performance.now();
  const doDelay = async () => {
    const elapsed = performance.now() - started;
    if (typeof minIntervalMs !== `undefined`) sleepMs = Math.max(0, minIntervalMs - elapsed);
    if (sleepMs) await sleep({
      millis: sleepMs,
      signal
    });
    started = performance.now();
    if (signal?.aborted) throw new Error(`Signal aborted ${signal.reason}`);
  };
  if (Array.isArray(produce)) produce = produce.values();
  if (opts.onStart) opts.onStart();
  let errored = true;
  let loopedTimes = 0;
  try {
    while (!cancelled) {
      loopedTimes++;
      if (delayWhen === `before` || delayWhen === `both`) await doDelay();
      const result = await resolve(produce);
      if (typeof result === `undefined` && !allowUndefined) cancelled = true;
      else {
        yield result;
        if (delayWhen === `after` || delayWhen === `both`) await doDelay();
        if (count3 !== void 0 && loopedTimes >= count3) cancelled = true;
      }
      if (whileFunction) {
        if (!whileFunction(loopedTimes)) cancelled = true;
      }
    }
    errored = false;
  } finally {
    cancelled = true;
    if (opts.onComplete) opts.onComplete(errored);
  }
}
function* repeatSync(produce, opts) {
  const signal = opts.signal ?? void 0;
  const count3 = opts.count ?? void 0;
  const allowUndefined = opts.allowUndefined ?? false;
  let cancelled = false;
  if (Array.isArray(produce)) produce = produce.values();
  if (opts.onStart) opts.onStart();
  let errored = true;
  let loopedTimes = 0;
  try {
    while (!cancelled) {
      loopedTimes++;
      const result = resolveSync(produce);
      if (typeof result === `undefined` && !allowUndefined) cancelled = true;
      else {
        yield result;
        if (count3 !== void 0 && loopedTimes >= count3) cancelled = true;
        if (signal?.aborted) cancelled = true;
      }
    }
    errored = false;
  } finally {
    cancelled = true;
    if (opts.onComplete) opts.onComplete(errored);
  }
}
var RequestResponseMatch = class extends SimpleEventEmitter {
  timeoutMs;
  whenUnmatchedResponse;
  keyRequest;
  keyResponse;
  #outgoing = /* @__PURE__ */ new Map();
  #maintainLoop;
  constructor(options = {}) {
    super();
    if (typeof window === `undefined`) globalThis.window = {
      setTimeout,
      clearTimeout
    };
    this.timeoutMs = options.timeoutMs ?? 1e3;
    this.whenUnmatchedResponse = options.whenUnmatchedResponse ?? `throw`;
    this.#maintainLoop = continuously(() => this.#maintain(), this.timeoutMs * 2);
    if (options.key) {
      if (options.keyRequest) throw new Error(`Cannot set 'keyRequest' when 'key' is set `);
      if (options.keyResponse) throw new Error(`Cannot set 'keyResponse' when 'key' is set `);
      this.keyRequest = options.key;
      this.keyResponse = options.key;
    } else {
      if (!options.keyRequest || !options.keyResponse) throw new Error(`Expects 'keyRequest' & 'keyResponse' fields to be set if 'key' is not set`);
      this.keyRequest = options.keyRequest;
      this.keyResponse = options.keyResponse;
    }
  }
  #maintain() {
    const values2 = [...this.#outgoing.values()];
    const now = Date.now();
    for (const v of values2) if (v.expiresAt <= now) {
      if (v.promiseReject) v.promiseReject(`Request timeout`);
      const callback = v.callback;
      if (callback) setTimeout(() => {
        callback(true, `Request timeout`);
      }, 1);
      this.fireEvent(`completed`, {
        request: v.req,
        response: `Request timeout`,
        success: false
      });
      this.#outgoing.delete(v.id);
    }
    this.debugDump();
    return this.#outgoing.size > 0;
  }
  debugDump() {
    const values2 = [...this.#outgoing.values()];
    const now = Date.now();
    for (const v of values2) {
      const expire = now - v.expiresAt;
      console.log(`${v.id} Expires in: ${Math.floor(expire / 1e3).toString()}s`);
    }
  }
  /**
  * Makes a request.
  * If `callback` is set, it's equivalent to calling `requestCallback`.
  * If `callback` is not set, a promise is returned
  * @param request
  * @param callback
  * @returns
  */
  request(request, callback) {
    if (callback !== void 0) {
      this.#requestCallback(request, callback);
      return;
    }
    return this.#requestAwait(request);
  }
  /**
  * Make a request and don't wait for the outcome.
  * @param request
  */
  requestAndForget(request) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const r = {
      expiresAt: Date.now() + this.timeoutMs,
      id,
      req: request
    };
    this.#outgoing.set(id, r);
    this.#maintainLoop.start();
  }
  /**
  * Make a request, returning a Promise for the outcome.
  * Errors will throw an exception.
  * @param request
  * @returns
  */
  #requestAwait(request) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const p = new Promise((resolve$1, reject) => {
      const r = {
        expiresAt: Date.now() + this.timeoutMs,
        id,
        req: request,
        promiseResolve: resolve$1,
        promiseReject: reject
      };
      this.#outgoing.set(id, r);
      this.#maintainLoop.start();
    });
    return p;
  }
  /**
  * Make a request, and get notified of outcome with a callback
  * @param request
  * @param callback
  */
  #requestCallback(request, callback) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const r = {
      expiresAt: Date.now() + this.timeoutMs,
      id,
      req: request,
      callback
    };
    this.#outgoing.set(id, r);
    this.#maintainLoop.start();
  }
  /**
  * Response has been received
  * @param response Response
  * @returns _True_ if response matched a request
  */
  response(response, keepAlive) {
    const id = this.keyResponse(response);
    const request = this.#outgoing.get(id);
    if (!request) {
      if (this.whenUnmatchedResponse === `throw`) throw new Error(`Unmatched response with id: '${id}'`, { cause: response });
      return false;
    }
    if (keepAlive) request.expiresAt = Date.now() + this.timeoutMs;
    else this.#outgoing.delete(id);
    if (request.promiseResolve) request.promiseResolve(response);
    if (request.callback) request.callback(false, response);
    this.fireEvent(`match`, {
      request: request.req,
      response
    });
    if (!keepAlive) this.fireEvent(`completed`, {
      request: request.req,
      response,
      success: true
    });
    return true;
  }
};
function* backoffGenerator(options = {}) {
  const startAt = options.startAt ?? 1;
  let limitAttempts = options.limitAttempts ?? Number.MAX_SAFE_INTEGER;
  const limitValue = options.limitValue;
  const power = options.power ?? 1.1;
  let value$1 = startAt;
  resultThrow(integerTest(limitAttempts, `aboveZero`, `limitAttempts`), numberTest(startAt, ``, `startAt`), numberTest(limitAttempts, ``, `limitAttempts`), () => limitValue !== void 0 ? numberTest(limitValue, ``, `limitValue`) : void 0, numberTest(power, ``, `power`));
  while (limitAttempts > 0) {
    if (limitValue && value$1 >= limitValue) return;
    limitAttempts--;
    yield value$1;
    value$1 += Math.pow(value$1, power);
  }
}
var retryFunction = (callback, options = {}) => {
  const task = { async probe() {
    try {
      const v = await callback();
      if (v === void 0) return {
        value: options.taskValueFallback,
        error: `Fallback`,
        success: false
      };
      return {
        value: v,
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  } };
  return retryTask(task, options);
};
var retryTask = async (task, opts = {}) => {
  const signal = opts.abort;
  const log = resolveLogOption(opts.log);
  const predelayMs = opts.predelayMs ?? 0;
  const startedAt = elapsedSince();
  let attempts = 0;
  const initialValue = opts.startAt ?? 1e3;
  const limitAttempts = opts.limitAttempts ?? Number.MAX_SAFE_INTEGER;
  const backoffGen = backoffGenerator({
    ...opts,
    startAt: initialValue,
    limitAttempts
  });
  if (initialValue <= 0) throw new Error(`Param 'initialValue' must be above zero`);
  if (predelayMs > 0) try {
    await sleep({
      millis: predelayMs,
      signal
    });
  } catch (error) {
    return {
      success: false,
      attempts,
      value: opts.taskValueFallback,
      elapsed: startedAt(),
      message: getErrorMessage2(error)
    };
  }
  for (const t2 of backoffGen) {
    attempts++;
    const result = await task.probe(attempts);
    if (result.success) return {
      success: result.success,
      value: result.value,
      attempts,
      elapsed: startedAt()
    };
    log({ msg: `retry attempts: ${attempts.toString()} t: ${elapsedToHumanString(t2)}` });
    if (attempts >= limitAttempts) break;
    try {
      await sleep({
        millis: t2,
        signal
      });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.taskValueFallback,
        message: getErrorMessage2(error),
        elapsed: startedAt()
      };
    }
  }
  return {
    message: `Giving up after ${attempts.toString()} attempts.`,
    success: false,
    attempts,
    value: opts.taskValueFallback,
    elapsed: startedAt()
  };
};
var runOnce = (onRun) => {
  let run$1 = false;
  let success = false;
  return () => {
    if (run$1) return success;
    run$1 = true;
    success = onRun();
    return success;
  };
};
var SyncWait = class {
  #resolve;
  #reject;
  #promise;
  signal() {
    if (this.#resolve) {
      this.#resolve();
      this.#resolve = void 0;
    }
    this.#promise = Promise.resolve();
  }
  /**
  * Throw away any previous signalled state.
  * This will cause any currently waiters to throw
  */
  flush() {
    if (this.#reject) {
      this.#reject(`Flushed`);
      this.#reject = void 0;
    }
    this.#resolve = void 0;
    this.#promise = void 0;
  }
  #initPromise() {
    const p = new Promise((resolve$1, reject) => {
      this.#resolve = resolve$1;
      this.#reject = reject;
    });
    this.#promise = p;
    return p;
  }
  /**
  * Call with `await` to wait until .signal() happens.
  * If a wait period is specified, an exception is thrown if signal does not happen within this time.
  * @param maximumWaitMs
  */
  async forSignal(maximumWaitMs) {
    let p = this.#promise;
    p ??= this.#initPromise();
    if (maximumWaitMs) {
      const reject = this.#reject;
      setTimeout(() => {
        if (reject) reject(`Timeout elapsed ${maximumWaitMs.toString()}`);
      }, maximumWaitMs);
    }
    await p;
    this.#promise = void 0;
    this.#resolve = void 0;
    this.#reject = void 0;
  }
  /**
  * An alternative to {@link forSignal}, returning _true_
  * if signalled, or _false_ if wait period was exceeded
  *
  * ```js
  * const s = await sw.didSignal(5000);
  * ```
  * @param maximumWaitMs
  * @returns
  */
  async didSignal(maximumWaitMs) {
    try {
      await this.forSignal(maximumWaitMs);
      return true;
    } catch {
      return false;
    }
  }
};
var TaskQueueMutable = class TaskQueueMutable2 extends SimpleEventEmitter {
  static shared = new TaskQueueMutable2();
  _loop;
  _queue;
  constructor() {
    super();
    this._queue = mutable$1();
    this._loop = continuously(() => {
      return this.processQueue();
    }, 100);
  }
  /**
  * Adds a task. This triggers processing loop if not already started.
  *
  * ```js
  * queue.add(async () => {
  *  await sleep(1000);
  * });
  * ```
  * @param task Task to run
  */
  enqueue(task) {
    const length2 = this._queue.enqueue(task);
    if (this._loop.runState === `idle`) {
      this.fireEvent(`started`, {});
      this._loop.start();
    }
    return length2;
  }
  dequeue() {
    return this._queue.dequeue();
  }
  async processQueue() {
    const task = this._queue.dequeue();
    if (task === void 0) {
      this.fireEvent(`empty`, {});
      return false;
    }
    try {
      await task();
    } catch (error) {
      console.error(error);
    }
  }
  /**
  * Clears all tasks, and stops any scheduled processing.
  * Currently running tasks will continue.
  * @returns
  */
  clear() {
    if (this._queue.length === 0) return;
    this._queue.clear();
    this._loop.cancel();
    this.fireEvent(`empty`, {});
  }
  /**
  * Returns true if queue is empty
  */
  get isEmpty() {
    return this._queue.isEmpty;
  }
  /**
  * Number of items in queue
  */
  get length() {
    return this._queue.length;
  }
};
var throttle = (callback, intervalMinMs) => {
  let trigger = 0;
  return async (...args) => {
    const elapsed = performance.now() - trigger;
    if (elapsed >= intervalMinMs) {
      const r = callback(elapsed, ...args);
      if (typeof r === `object`) await r;
      trigger = performance.now();
    }
  };
};
function hasElapsed(elapsed) {
  const t2 = relative(intervalToMs(elapsed, 0), {
    timer: elapsedMillisecondsAbsolute(),
    clampValue: true
  });
  return () => t2.isDone;
}
function ofTotal(duration2, opts = {}) {
  const totalMs = intervalToMs(duration2);
  if (!totalMs) throw new Error(`Param 'duration' not valid`);
  const timerOpts = {
    ...opts,
    timer: elapsedMillisecondsAbsolute()
  };
  let t2;
  return () => {
    t2 ??= relative(totalMs, timerOpts);
    return t2.elapsed;
  };
}
function ofTotalTicks(totalTicks, opts = {}) {
  const timerOpts = {
    ...opts,
    timer: elapsedTicksAbsolute()
  };
  let t2;
  return () => {
    t2 ??= relative(totalTicks, timerOpts);
    return t2.elapsed;
  };
}
var timerAlwaysDone = () => ({
  elapsed: 1,
  isDone: true,
  reset() {
  },
  mod(amt) {
  }
});
var timerNeverDone = () => ({
  elapsed: 0,
  isDone: false,
  reset() {
  },
  mod() {
  }
});
var relative = (total2, options = {}) => {
  if (!Number.isFinite(total2)) return timerAlwaysDone();
  else if (Number.isNaN(total2)) return timerNeverDone();
  const clampValue = options.clampValue ?? false;
  const wrapValue = options.wrapValue ?? false;
  if (clampValue && wrapValue) throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let modulationAmount = 1;
  const timer = options.timer ?? elapsedMillisecondsAbsolute();
  let lastValue = 0;
  const computeElapsed = (value$1) => {
    lastValue = value$1;
    let v = value$1 / (total2 * modulationAmount);
    if (clampValue) v = clamp(v);
    else if (wrapValue && v >= 1) v = v % 1;
    return v;
  };
  return {
    mod(amt) {
      modulationAmount = amt;
    },
    get isDone() {
      return computeElapsed(lastValue) >= 1;
    },
    get elapsed() {
      return computeElapsed(timer.elapsed);
    },
    reset: () => {
      timer.reset();
    }
  };
};
var frequencyTimer = (frequency2, options = {}) => {
  const timer = options.timer ?? elapsedMillisecondsAbsolute();
  const cyclesPerSecond = frequency2 / 1e3;
  let modulationAmount = 1;
  const computeElapsed = () => {
    const v = timer.elapsed * (cyclesPerSecond * modulationAmount);
    const f = v - Math.floor(v);
    if (f < 0) throw new Error(`Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`);
    if (f > 1) throw new Error(`Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`);
    return f;
  };
  return {
    mod: (amt) => {
      modulationAmount = amt;
    },
    reset: () => {
      timer.reset();
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    }
  };
};
var elapsedMillisecondsAbsolute = () => {
  let start = performance.now();
  return {
    reset: () => {
      start = performance.now();
    },
    get elapsed() {
      return performance.now() - start;
    }
  };
};
var elapsedTicksAbsolute = () => {
  let start = 0;
  return {
    reset: () => {
      start = 0;
    },
    get peek() {
      return start;
    },
    get elapsed() {
      return ++start;
    }
  };
};
var timerWithFunction = (fn, timer) => {
  if (typeof fn !== `function`) throw new Error(`Param 'fn' should be a function. Got: ${typeof fn}`);
  let startCount = 1;
  return {
    get elapsed() {
      return timer.elapsed;
    },
    get isDone() {
      return timer.isDone;
    },
    get runState() {
      if (timer.isDone) return `idle`;
      return `scheduled`;
    },
    get startCount() {
      return startCount;
    },
    get startCountTotal() {
      return startCount;
    },
    compute: () => {
      const elapsed = timer.elapsed;
      return fn(elapsed);
    },
    reset: () => {
      timer.reset();
      startCount++;
    }
  };
};
var updateOutdated = (fn, interval2, updateFail = `slow`) => {
  let lastRun = 0;
  let lastValue;
  let intervalMsCurrent = intervalToMs(interval2, 1e3);
  return () => new Promise(async (resolve$1, reject) => {
    const elapsed = performance.now() - lastRun;
    if (lastValue === void 0 || elapsed > intervalMsCurrent) try {
      lastRun = performance.now();
      lastValue = await fn(elapsed);
      intervalMsCurrent = intervalToMs(interval2, 1e3);
    } catch (error) {
      if (updateFail === `fast`) {
        lastValue = void 0;
        lastRun = 0;
      } else if (updateFail === `backoff`) intervalMsCurrent = Math.floor(intervalMsCurrent * 1.2);
      reject(error);
      return;
    }
    resolve$1(lastValue);
  });
};
var WaitForValue = class {
  #promise;
  #resolve;
  #written = false;
  constructor() {
    const { promise, resolve: resolve$1 } = promiseWithResolvers();
    this.#promise = promise;
    this.#resolve = resolve$1;
  }
  /**
  * Gets the promise
  * ```js
  * const wv = new WaitForValue();
  *
  * await wv.get();
  * ```
  * @returns
  */
  get() {
    return this.#promise;
  }
  /**
  * Adds a value, triggering promise resolution.
  *
  * Throws an exception if queue has already been used. Use {@link isUsed} to check.
  * @param value
  */
  add(value$1) {
    if (this.#written) throw new Error(`QueueSingleUse has already been used`);
    this.#written = true;
    this.#resolve(value$1);
  }
  /**
  * Returns _true_ if a value has been added
  * and therefore no more values can be written
  */
  get isUsed() {
    return this.#written;
  }
};
var singleItem = () => new WaitForValue();
var waitFor = (timeoutMs, onAborted, onComplete) => {
  let t2;
  let success = false;
  const done = (error) => {
    if (t2 !== void 0) {
      window.clearTimeout(t2);
      t2 = void 0;
    }
    if (error) onAborted(error);
    else success = true;
    if (onComplete !== void 0) onComplete(success);
  };
  t2 = globalThis.setTimeout(() => {
    t2 = void 0;
    try {
      onAborted(`Timeout after ${timeoutMs}ms`);
    } finally {
      if (onComplete !== void 0) onComplete(success);
    }
  }, timeoutMs);
  return done;
};
var cloneState = (toClone) => {
  return Object.freeze({
    value: toClone.value,
    visited: [...toClone.visited],
    machine: toClone.machine
  });
};
var init = (stateMachine, initialState) => {
  const [machine, machineValidationError] = validateMachine(stateMachine);
  if (!machine) throw new Error(machineValidationError);
  const state = initialState ?? Object.keys(machine.states)[0];
  if (typeof machine.states[state] === `undefined`) throw new TypeError(`Initial state ('${state}') not found`);
  const transitions = validateAndNormaliseTransitions(machine.states);
  if (transitions === void 0) throw new Error(`Could not normalise transitions`);
  return Object.freeze({
    value: state,
    visited: [],
    machine: Object.freeze(Object.fromEntries(transitions))
  });
};
var reset = (sm) => {
  return init(sm.machine);
};
var validateMachine = (smOrTransitions) => {
  if (typeof smOrTransitions === `undefined`) return [void 0, `Parameter undefined`];
  if (smOrTransitions === null) return [void 0, `Parameter null`];
  if (`states` in smOrTransitions) return [smOrTransitions, ``];
  if (typeof smOrTransitions === `object`) return [{ states: smOrTransitions }, ``];
  return [void 0, `Unexpected type: ${typeof smOrTransitions}. Expected object`];
};
var isDone = (sm) => {
  return possible(sm).length === 0;
};
var possibleTargets = (sm) => {
  validateMachineState(sm);
  const fromS = sm.machine[sm.value];
  if (fromS.length === 1 && fromS[0].state === null) return [];
  return fromS;
};
var possible = (sm) => {
  const targets = possibleTargets(sm);
  return targets.map((v) => v.state);
};
var normaliseTargets = (targets) => {
  const normaliseSingleTarget = (target) => {
    if (target === null) return { state: null };
    if (typeof target === `string`) return { state: target };
    else if (typeof target === `object` && `state` in target) {
      const targetState = target.state;
      if (typeof targetState !== `string`) throw new TypeError(`Target 'state' field is not a string. Got: ${typeof targetState}`);
      if (`preconditions` in target) return {
        state: targetState,
        preconditions: target.preconditions
      };
      return { state: targetState };
    } else throw new Error(`Unexpected type: ${typeof target}. Expected string or object with 'state' field.`);
  };
  if (Array.isArray(targets)) {
    let containsNull = false;
    const mapResults = targets.map((t2) => {
      const r = normaliseSingleTarget(t2);
      if (!r) throw new Error(`Invalid target`);
      containsNull = containsNull || r.state === null;
      return r;
    });
    if (containsNull && mapResults.length > 1) throw new Error(`Cannot have null as an possible state`);
    return mapResults;
  } else {
    const target = normaliseSingleTarget(targets);
    if (!target) return;
    return [target];
  }
};
var validateAndNormaliseTransitions = (d) => {
  const returnMap = /* @__PURE__ */ new Map();
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    if (typeof topLevelState === `undefined`) throw new TypeError(`Top-level undefined state`);
    if (typeof topLevelTargets === `undefined`) throw new TypeError(`Undefined target state for ${topLevelState}`);
    if (returnMap.has(topLevelState)) throw new Error(`State defined twice: ${topLevelState}`);
    if (topLevelState.includes(` `)) throw new Error(`State names cannot contain spaces`);
    returnMap.set(topLevelState, []);
  }
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    const targets = normaliseTargets(topLevelTargets);
    if (targets === void 0) throw new Error(`Could not normalise target`);
    if (targets !== null) {
      const seenStates = /* @__PURE__ */ new Set();
      for (const target of targets) {
        if (seenStates.has(target.state)) throw new Error(`Target state '${target.state}' already exists for '${topLevelState}'`);
        seenStates.add(target.state);
        if (target.state === null) continue;
        if (!returnMap.has(target.state)) throw new Error(`Target state '${target.state}' is not defined as a top-level state. Defined under: '${topLevelState}'`);
      }
      returnMap.set(topLevelState, targets);
    }
  }
  return returnMap;
};
var validateMachineState = (state) => {
  if (typeof state === `undefined`) throw new TypeError(`Param 'state' is undefined`);
  if (typeof state.value !== `string`) throw new TypeError(`Existing state is not a string`);
};
var to = (sm, toState) => {
  validateMachineState(sm);
  validateTransition(sm, toState);
  return Object.freeze({
    value: toState,
    machine: sm.machine,
    visited: unique([sm.visited, [sm.value]])
  });
};
var next2 = (sm) => {
  const first2 = possibleTargets(sm).at(0);
  if (!first2 || first2.state === null) throw new Error(`Not possible to move to a next state from '${sm.value}`);
  return to(sm, first2.state);
};
var isValidTransition = (sm, toState) => {
  try {
    validateTransition(sm, toState);
    return true;
  } catch {
    return false;
  }
};
var validateTransition = (sm, toState) => {
  if (toState === null) throw new Error(`Cannot transition to null state`);
  if (typeof toState === `undefined`) throw new Error(`Cannot transition to undefined state`);
  if (typeof toState !== `string`) throw new TypeError(`Parameter 'toState' should be a string. Got: ${typeof toState}`);
  const p = possible(sm);
  if (p.length === 0) throw new Error(`Machine is in terminal state`);
  if (!p.includes(toState)) throw new Error(`Target state '${toState}' not available at current state '${sm.value}'. Possible states: ${p.join(`, `)}`);
};
var fromList = (...states) => {
  const t2 = {};
  if (!Array.isArray(states)) throw new Error(`Expected array of strings`);
  if (states.length <= 2) throw new Error(`Expects at least two states`);
  for (let index = 0; index < states.length; index++) {
    const s = states[index];
    if (typeof s !== `string`) throw new TypeError(`Expected array of strings. Got type '${typeof s}' at index ${index.toString()}`);
    t2[s] = index === states.length - 1 ? null : states[index + 1];
  }
  return t2;
};
var fromListBidirectional = (...states) => {
  const t2 = {};
  if (!Array.isArray(states)) throw new Error(`Expected array of strings`);
  if (states.length < 2) throw new Error(`Expects at least two states`);
  for (const [index, s] of states.entries()) {
    if (typeof s !== `string`) throw new TypeError(`Expected array of strings. Got type '${typeof s}' at index ${index.toString()}`);
    t2[s] = [];
  }
  for (let index = 0; index < states.length; index++) {
    const v = t2[states[index]];
    if (index === states.length - 1) if (states.length > 1) v.push(states[index - 1]);
    else t2[states[index]] = null;
    else {
      v.push(states[index + 1]);
      if (index > 0) v.push(states[index - 1]);
    }
  }
  return t2;
};
async function driver(machine, handlersOrOpts) {
  const opts = Array.isArray(handlersOrOpts) ? { handlers: handlersOrOpts } : handlersOrOpts;
  const debug$1 = resolveLogOption(opts.debug, { category: `StateMachineDriver` });
  const byState = /* @__PURE__ */ new Map();
  for (const h of opts.handlers) {
    const ifBlock = Array.isArray(h.if) ? h.if : [h.if];
    for (const state of ifBlock) {
      if (typeof state !== `string`) throw new TypeError(`Expected single or array of strings for the 'if' field. Got: '${typeof state}'.`);
      if (byState.has(state)) throw new Error(`Multiple handlers defined for state '${state}'. There should be at most one.`);
      byState.set(state, h);
    }
  }
  const runOpts = {
    rank: (a, b) => {
      return defaultComparer(a.score ?? 0, b.score ?? 0);
    },
    shuffle: opts.shuffleHandlers ?? false
  };
  let sm = init(machine);
  for (const [ifState] of byState) if (typeof sm.machine[ifState] === `undefined` && ifState !== `__fallback`) throw new Error(`StateMachineDriver handler references a state ('${ifState}') which is not defined on the machine. Therefore this handler will never run.'`);
  const run$1 = async () => {
    debug$1(`Run. State: ${sm.value}`);
    const state = sm.value;
    let handler = byState.get(state);
    if (handler === void 0) {
      debug$1(`  No handler for state '${state}', trying __fallback`);
      handler = byState.get(`__fallback`);
    }
    if (handler === void 0) {
      debug$1(`  No __fallback handler`);
      return;
    }
    const runOptionsForHandler = handler.resultChoice === `first` ? {
      ...runOpts,
      stop: (latest) => {
        if (!latest) return false;
        if (`reset` in latest) return true;
        if (`next` in latest && latest.next !== void 0) return true;
        return false;
      }
    } : runOpts;
    const results = await run2(handler.then, runOptionsForHandler, sm);
    debug$1(`  In state '${sm.value}' results: ${results.length}. Choice: ${handler.resultChoice}`);
    let r;
    switch (handler.resultChoice ?? `highest`) {
      case `highest`: {
        r = results.at(-1);
        break;
      }
      case `first`: {
        r = results[0];
        break;
      }
      case `lowest`: {
        r = results.at(0);
        break;
      }
      case `random`: {
        r = randomElement(results);
        break;
      }
      default:
        throw new Error(`Unknown 'resultChoice' option: ${handler.resultChoice}. Expected highest, first, lowest or random`);
    }
    debug$1(`  Chosen result: ${JSON.stringify(r)}`);
    if (r?.reset) sm = reset(sm);
    else if (r && r.next) if (typeof r.next === `boolean`) sm = next2(sm);
    else {
      debug$1(JSON.stringify(results));
      sm = to(sm, r.next);
    }
    return sm;
  };
  return {
    reset: () => {
      sm = reset(sm);
    },
    getValue: () => sm.value,
    run: run$1,
    to: (state) => {
      sm = to(sm, state);
      return sm;
    }
  };
}
var StateMachineWithEvents = class extends SimpleEventEmitter {
  #sm;
  #smInitial;
  #debug;
  #isDoneNeedsFiring = false;
  #isDone = false;
  #changedAt = elapsedInfinity();
  /**
  * Create a state machine with initial state, description and options
  * @param m Machine description
  * @param opts Options for machine (defaults to `{debug:false}`)
  */
  constructor(m, opts = {}) {
    super();
    this.#debug = opts.debug ?? false;
    this.#sm = init(m, opts.initial);
    this.#smInitial = cloneState(this.#sm);
  }
  #setIsDone(v) {
    if (this.#isDone === v) return;
    this.#isDone = v;
    if (v) {
      this.#isDoneNeedsFiring = true;
      setTimeout(() => {
        if (!this.#isDoneNeedsFiring) return;
        this.#isDoneNeedsFiring = false;
        this.fireEvent(`stop`, { state: this.#sm.value });
      }, 2);
    } else this.#isDoneNeedsFiring = false;
  }
  /**
  * Return a list of possible states from current state.
  *
  * If list is empty, no states are possible. Otherwise lists
  * possible states, including 'null' for terminal
  */
  get statesPossible() {
    return possible(this.#sm);
  }
  /**
  * Return a list of all defined states
  */
  get statesDefined() {
    return Object.keys(this.#sm.machine);
  }
  /**
  * Moves to the next state if possible. If multiple states are possible, it will use the first.
  * If machine is finalised, no error is thrown and null is returned.
  *
  * @returns {(string|null)} Returns new state, or null if machine is finalised
  */
  next() {
    const p = possible(this.#sm);
    if (p.length === 0) return null;
    this.state = p[0];
    return p[0];
  }
  /**
  * Returns _true_ if state machine is in its final state
  *
  * @returns
  */
  get isDone() {
    return isDone(this.#sm);
  }
  /**
  * Resets machine to initial state
  */
  reset() {
    this.#setIsDone(false);
    this.#sm = cloneState(this.#smInitial);
    this.#changedAt = elapsedSince();
  }
  /**
  * Throws if it's not valid to transition to `newState`
  * @param newState
  * @returns
  */
  validateTransition(newState) {
    validateTransition(this.#sm, newState);
  }
  /**
  * Returns _true_ if `newState` is valid transition from current state.
  * Use {@link validateTransition} if you want an explanation for the _false_ results.
  * @param newState
  * @returns
  */
  isValid(newState) {
    return isValidTransition(this.#sm, newState);
  }
  /**
  * Gets or sets state. Throws an error if an invalid transition is attempted.
  * Use `isValid()` to check validity without changing.
  *
  * If `newState` is the same as current state, the request is ignored silently.
  */
  set state(newState) {
    const priorState = this.#sm.value;
    if (newState === this.#sm.value) return;
    this.#sm = to(this.#sm, newState);
    if (this.#debug) console.log(`StateMachine: ${priorState} -> ${newState}`);
    this.#changedAt = elapsedSince();
    setTimeout(() => {
      this.fireEvent(`change`, {
        newState,
        priorState
      });
    }, 1);
    if (isDone(this.#sm)) this.#setIsDone(true);
  }
  get state() {
    return this.#sm.value;
  }
  /**
  * Returns timestamp when state was last changed.
  * See also `elapsed`
  */
  get changedAt() {
    return this.#changedAt();
  }
  /**
  * Returns milliseconds elapsed since last state change.
  * See also `changedAt`
  */
  get elapsed() {
    return this.#changedAt();
  }
};
var state_machine_exports = {};
__export2(state_machine_exports, {
  StateMachineWithEvents: () => StateMachineWithEvents,
  cloneState: () => cloneState,
  driver: () => driver,
  fromList: () => fromList,
  fromListBidirectional: () => fromListBidirectional,
  init: () => init,
  isDone: () => isDone,
  isValidTransition: () => isValidTransition,
  next: () => next2,
  normaliseTargets: () => normaliseTargets,
  possible: () => possible,
  possibleTargets: () => possibleTargets,
  reset: () => reset,
  to: () => to,
  validateMachine: () => validateMachine,
  validateTransition: () => validateTransition
});
var src_exports5 = {};
__export2(src_exports5, {
  DispatchList: () => DispatchList,
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  RequestResponseMatch: () => RequestResponseMatch,
  Resource: () => Resource,
  StateMachine: () => state_machine_exports,
  SyncWait: () => SyncWait,
  TaskQueueMutable: () => TaskQueueMutable,
  WaitForValue: () => WaitForValue,
  backoffGenerator: () => backoffGenerator,
  continuously: () => continuously,
  create: () => create,
  debounce: () => debounce2,
  delay: () => delay2,
  delayLoop: () => delayLoop,
  elapsedMillisecondsAbsolute: () => elapsedMillisecondsAbsolute,
  elapsedTicksAbsolute: () => elapsedTicksAbsolute,
  eventRace: () => eventRace,
  everyNth: () => everyNth,
  frequencyTimer: () => frequencyTimer,
  hasElapsed: () => hasElapsed,
  iterateBreadth: () => iterateBreadth,
  iterateDepth: () => iterateDepth,
  movingAverageTimed: () => movingAverageTimed,
  ofTotal: () => ofTotal,
  ofTotalTicks: () => ofTotalTicks,
  promiseWithResolvers: () => promiseWithResolvers,
  rateMinimum: () => rateMinimum,
  relative: () => relative,
  repeat: () => repeat2,
  repeatSync: () => repeatSync,
  retryFunction: () => retryFunction,
  retryTask: () => retryTask,
  run: () => run2,
  runOnce: () => runOnce,
  runSingle: () => runSingle,
  singleItem: () => singleItem,
  sleep: () => sleep,
  throttle: () => throttle,
  timeout: () => timeout,
  timerAlwaysDone: () => timerAlwaysDone,
  timerNeverDone: () => timerNeverDone,
  timerWithFunction: () => timerWithFunction,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});

// node_modules/ixfx/bundle/bezier-DxzJ_wRN.js
var weightedIndex = (weightings, rand = Math.random) => {
  const precompute = [];
  let total2 = 0;
  for (let index = 0; index < weightings.length; index++) {
    total2 += weightings[index];
    precompute[index] = total2;
  }
  if (total2 !== 1) throw new Error(`Weightings should add up to 1. Got: ${total2}`);
  return () => {
    const v = rand();
    for (let index = 0; index < precompute.length; index++) if (v <= precompute[index]) return index;
    throw new Error(`Bug: weightedIndex could not select index`);
  };
};
var randomIndex2 = (array4, rand = Math.random) => Math.floor(rand() * array4.length);
function randomPluck(array4, options = {}) {
  if (typeof array4 === `undefined`) throw new Error(`Param 'array' is undefined`);
  if (!Array.isArray(array4)) throw new Error(`Param 'array' is not an array`);
  const mutate = options.mutate ?? false;
  const rand = options.source ?? Math.random;
  if (array4.length === 0) {
    if (mutate) return void 0;
    return {
      value: void 0,
      remainder: []
    };
  }
  const index = randomIndex2(array4, rand);
  if (mutate) {
    const v = array4[index];
    array4.splice(index, 1);
    return v;
  } else {
    const inputCopy = [...array4];
    inputCopy.splice(index, 1);
    return {
      value: array4[index],
      remainder: inputCopy
    };
  }
}
var randomElement2 = (array4, rand = Math.random) => {
  resultThrow(arrayTest(array4, `array`));
  return array4[Math.floor(rand() * array4.length)];
};
var randomElementWeightedSource = (array4, weightings, randomSource = Math.random) => {
  if (array4.length !== weightings.length) throw new Error(`Lengths of 'array' and 'weightings' should be the same.`);
  const r = weightedIndex(weightings, randomSource);
  return () => {
    const index = r();
    return array4[index];
  };
};
var shuffle2 = (dataToShuffle, rand = Math.random) => {
  const array4 = [...dataToShuffle];
  for (let index = array4.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array4[index], array4[index_]] = [array4[index_], array4[index]];
  }
  return array4;
};
var chance = (p, a, b, randomSource) => {
  const source = randomSource ?? Math.random;
  const resolve2 = (x) => {
    if (typeof x === `function`) return x();
    return x;
  };
  const pp = resolve2(p);
  resultThrow(numberTest(pp, `percentage`, `p`));
  if (source() <= pp) return resolve2(b);
  else return resolve2(a);
};
var bipolarSource = (maxOrOptions) => {
  const source = floatSource(maxOrOptions);
  return () => source() * 2 - 1;
};
var bipolar = (maxOrOptions) => {
  const source = bipolarSource(maxOrOptions);
  return source();
};
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max$12 = options.max ?? 1;
  let min$12 = options.min ?? 0;
  const source = options.source ?? Math.random;
  resultThrow(numberTest(min$12, ``, `min`), numberTest(max$12, ``, `max`));
  if (!options.min && max$12 < 0) {
    min$12 = max$12;
    max$12 = 0;
  }
  if (min$12 > max$12) throw new Error(`Min is greater than max. Min: ${min$12.toString()} max: ${max$12.toString()}`);
  return () => source() * (max$12 - min$12) + min$12;
};
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();
var calculateNonZero = (source = Math.random) => {
  let v = 0;
  while (v === 0) v = source();
  return v;
};
var gaussian = (skew = 1) => gaussianSource(skew)();
var gaussianSource = (skew = 1) => {
  const min$12 = 0;
  const max$12 = 1;
  const compute = () => {
    const u = calculateNonZero();
    const v = calculateNonZero();
    let result = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    result = result / 10 + 0.5;
    if (result > 1 || result < 0) result = compute();
    else {
      result = Math.pow(result, skew);
      result *= max$12 - min$12;
      result += min$12;
    }
    return result;
  };
  return compute;
};
var shortGuid = (options = {}) => {
  const source = options.source ?? Math.random;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};
function* count2(amount, offset2 = 0) {
  resultThrow(integerTest(amount, ``, `amount`), integerTest(offset2, ``, `offset`));
  if (amount === 0) return;
  let index = 0;
  do
    yield amount < 0 ? -index + offset2 : index + offset2;
  while (index++ < Math.abs(amount) - 1);
}
var integerSource = (maxOrOptions) => {
  if (typeof maxOrOptions === `undefined`) throw new TypeError(`maxOrOptions is undefined`);
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max$12 = Math.floor(options.max ?? 100);
  let min$12 = Math.floor(options.min ?? 0);
  if (!options.min && max$12 < 0) {
    max$12 = 1;
    min$12 = options.max ?? 0;
  }
  const randomSource = options.source ?? Math.random;
  if (min$12 > max$12) throw new Error(`Min value is greater than max (min: ${min$12.toString()} max: ${max$12.toString()})`);
  resultThrow(numberTest(min$12, ``, `min`), numberTest(max$12, ``, `max`));
  if (max$12 === min$12) throw new Error(`Max and min values cannot be the same (${max$12.toString()})`);
  const amt = Math.abs(max$12 - min$12);
  return () => Math.floor(randomSource() * amt) + min$12;
};
var integer = (maxOrOptions) => integerSource(maxOrOptions)();
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min$12 = options.min ?? 0;
  const max$12 = options.max ?? 100;
  const source = options.source ?? Math.random;
  const loop = options.loop ?? false;
  resultThrow(integerTest(min$12, ``, `min`), integerTest(max$12, ``, `max`));
  if (min$12 > max$12) throw new Error(`Min value is greater than max. Min: ${min$12.toString()} Max: ${max$12.toString()}`);
  const origRange = [...count2(max$12 - min$12, min$12)];
  let numberRange = shuffle2(origRange);
  let index = 0;
  while (true) {
    if (index === numberRange.length) if (loop) numberRange = shuffle2(origRange, source);
    else return;
    yield numberRange[index++];
  }
}
function mersenneTwister(seed) {
  if (!seed) seed = Math.random() * 4294967295;
  let mt = new Array(624);
  mt[0] = seed >>> 0;
  const n1 = 1812433253;
  for (let mti$1 = 1; mti$1 < 624; mti$1++) {
    const n2 = mt[mti$1 - 1] ^ mt[mti$1 - 1] >>> 30;
    mt[mti$1] = ((n1 & 4294901760) * n2 >>> 0) + ((n1 & 65535) * n2 >>> 0) + mti$1 >>> 0;
  }
  let mti = 624;
  const randomUint32 = () => {
    let y;
    if (mti >= 624) {
      for (let i = 0; i < 227; i++) {
        y = (mt[i] & 2147483648 | mt[i + 1] & 2147483647) >>> 0;
        mt[i] = (mt[i + 397] ^ y >>> 1 ^ (y & 1 ? 2567483615 : 0)) >>> 0;
      }
      for (let i = 227; i < 623; i++) {
        y = (mt[i] & 2147483648 | mt[i + 1] & 2147483647) >>> 0;
        mt[i] = (mt[i - 227] ^ y >>> 1 ^ (y & 1 ? 2567483615 : 0)) >>> 0;
      }
      y = (mt[623] & 2147483648 | mt[0] & 2147483647) >>> 0;
      mt[623] = (mt[396] ^ y >>> 1 ^ (y & 1 ? 2567483615 : 0)) >>> 0;
      mti = 0;
    }
    y = mt[mti++];
    y = (y ^ y >>> 11) >>> 0;
    y = (y ^ y << 7 & 2636928640) >>> 0;
    y = (y ^ y << 15 & 4022730752) >>> 0;
    y = (y ^ y >>> 18) >>> 0;
    return y;
  };
  const float$1 = () => randomUint32() / 4294967296;
  const integer$1 = (maxExclusive, minInclusive = 0) => {
    if (maxExclusive < 1) throw new Error("Upper bound must be greater than or equal to 1");
    if (maxExclusive > 4294967296) throw new Error("Upper bound must not be greater than 4294967296");
    if (maxExclusive === 1) return 0;
    let range = maxExclusive - minInclusive;
    const bitsNeeded = Math.ceil(Math.log2(range)), bitMask = (1 << bitsNeeded) - 1;
    while (true) {
      const int = randomUint32() & bitMask;
      if (int < range) return minInclusive + int;
    }
  };
  return {
    integer: integer$1,
    float: float$1
  };
}
var string = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? Math.random;
  const length2 = options.length ?? 5;
  let returnValue = ``;
  while (returnValue.length < length2) returnValue += calculate().toString(36).slice(2);
  return returnValue.substring(0, length2);
};
var minutesMsSource = (maxMinutesOrOptions) => {
  const options = typeof maxMinutesOrOptions === `number` ? { max: maxMinutesOrOptions } : maxMinutesOrOptions;
  const min$12 = (options.min ?? 0) * 60 * 1e3;
  const max$12 = (options.max ?? 5) * 60 * 1e3;
  return integerSource({
    ...options,
    max: max$12,
    min: min$12
  });
};
var minutesMs = (maxMinutesOrOptions) => minutesMsSource(maxMinutesOrOptions)();
var secondsMsSource = (maxSecondsOrOptions) => {
  const options = typeof maxSecondsOrOptions === `number` ? { max: maxSecondsOrOptions } : maxSecondsOrOptions;
  const min$12 = (options.min ?? 0) * 1e3;
  const max$12 = (options.max ?? 5) * 1e3;
  return () => integer({
    ...options,
    max: max$12,
    min: min$12
  });
};
var secondsMs = (maxSecondsOrOptions) => secondsMsSource(maxSecondsOrOptions)();
function clamp2(v, min$12 = 0, max$12 = 1) {
  if (v < min$12) return min$12;
  if (v > max$12) return max$12;
  return v;
}
var weightedIntegerSource = (options) => {
  const source = options.source ?? Math.random;
  if (typeof options.easingFunction === `undefined`) throw new Error(`Param 'easingFunction' is undefined`);
  const max$12 = options.max ?? 1;
  const min$12 = options.min ?? 0;
  if (max$12 === min$12) throw new Error(`Param 'max' is the same as  'min'`);
  if (max$12 < min$12) throw new Error(`Param 'max' should be greater than  'min'`);
  const compute = () => {
    const r = clamp2(options.easingFunction(source()));
    return Math.floor(r * (max$12 - min$12)) + min$12;
  };
  return compute;
};
var weightedInteger = (options) => weightedIntegerSource(options)();
var weighted = (options) => weightedSource(options)();
var weightedSource = (options) => {
  const source = options.source ?? Math.random;
  if (typeof options.easing !== `undefined`) throw new Error(`Param 'easingName' unavailable. Use @ixfx/modulation.weighted instead.`);
  if (typeof options.easingFunction === `undefined`) throw new Error(`Param 'easingFunction' is undefined`);
  return () => options.easingFunction(source());
};
var src_exports$13 = {};
__export2(src_exports$13, {
  bipolar: () => bipolar,
  bipolarSource: () => bipolarSource,
  calculateNonZero: () => calculateNonZero,
  chance: () => chance,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian,
  gaussianSource: () => gaussianSource,
  integer: () => integer,
  integerSource: () => integerSource,
  integerUniqueGen: () => integerUniqueGen,
  mersenneTwister: () => mersenneTwister,
  minutesMs: () => minutesMs,
  minutesMsSource: () => minutesMsSource,
  randomElement: () => randomElement2,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex2,
  randomPluck: () => randomPluck,
  secondsMs: () => secondsMs,
  secondsMsSource: () => secondsMsSource,
  shortGuid: () => shortGuid,
  shuffle: () => shuffle2,
  string: () => string,
  weighted: () => weighted,
  weightedIndex: () => weightedIndex,
  weightedInteger: () => weightedInteger,
  weightedIntegerSource: () => weightedIntegerSource,
  weightedSource: () => weightedSource
});
function handleChangeResult(monitor, onChanged, onNotChanged) {
  return (v) => {
    const r = monitor(v);
    if (r.changed) onChanged(v, r.changes, r.total);
    else if (typeof onNotChanged !== `undefined`) onNotChanged(v, r.identicalRun, r.total);
  };
}
function trackNumberChange(options = {}) {
  const nanHandling = options.nanHandling ?? `error`;
  const includeFirstValueInCount = options.includeFirstValueInCount ?? false;
  let lastValue = options.initial;
  let changes = 0;
  let total2 = 0;
  let identicalRun = 0;
  return (v) => {
    if (typeof v !== `number`) throw new TypeError(`Parameter should be number. Got type: ${typeof v}`);
    if (Number.isNaN(v)) switch (nanHandling) {
      case `error`:
        throw new Error(`Parameter is NaN`);
      case `skip`:
        return {
          changed: false,
          changes,
          total: total2,
          identicalRun
        };
    }
    total2++;
    let eq = lastValue === v;
    if (Number.isNaN(lastValue) && Number.isNaN(v)) eq = true;
    if (!eq) {
      identicalRun = 0;
      if (lastValue !== void 0 || includeFirstValueInCount) changes++;
      lastValue = v;
      return {
        changed: true,
        changes,
        total: total2,
        identicalRun
      };
    } else identicalRun++;
    return {
      changed: false,
      changes,
      total: total2,
      identicalRun
    };
  };
}
function trackBooleanChange(options = {}) {
  const includeFirstValueInCount = options.includeFirstValueInCount ?? false;
  let lastValue = options.initial;
  let changes = 0;
  let total2 = 0;
  let identicalRun = 0;
  return (v) => {
    if (typeof v !== `boolean`) throw new TypeError(`Parameter should be boolean. Got type: ${typeof v}`);
    total2++;
    if (lastValue !== v) {
      identicalRun = 0;
      if (lastValue !== void 0 || includeFirstValueInCount) changes++;
      lastValue = v;
      return {
        changed: true,
        changes,
        total: total2,
        identicalRun
      };
    } else identicalRun++;
    return {
      changed: false,
      changes,
      total: total2,
      identicalRun
    };
  };
}
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
    if (typeof keyString === `undefined`) keyString = (a) => {
      if (a === void 0) throw new Error(`Cannot create key for undefined`);
      return typeof a === `string` ? a : JSON.stringify(a);
    };
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
    let t$1 = ``;
    for (const [key, count$1] of this.#store.entries()) t$1 += `${key}: ${count$1.toString()}, `;
    if (t$1.endsWith(`, `)) return t$1.slice(0, Math.max(0, t$1.length - 2));
    return t$1;
  }
  /**
  *
  * @param value Value to count
  * @returns Frequency of value, or _undefined_ if it does not exist
  */
  frequencyOf(value2) {
    if (typeof value2 === `string`) return this.#store.get(value2);
    const key = this.#keyString(value2);
    return this.#store.get(key);
  }
  /**
  *
  * @param value Value to count
  * @returns Relative frequency of `value`, or _undefined_ if it does not exist
  */
  relativeFrequencyOf(value2) {
    let freq;
    if (typeof value2 === `string`) freq = this.#store.get(value2);
    else {
      const key = this.#keyString(value2);
      freq = this.#store.get(key);
    }
    if (freq === void 0) return;
    const mma = this.computeValues();
    return freq / mma.total;
  }
  /**
  * Returns copy of entries as an array
  * @returns Copy of entries as an array
  */
  entries() {
    return [...this.#store.entries()];
  }
  /**
  * Calculate min,max,avg,total & count from values
  * @returns Returns `{min,max,avg,total}`
  */
  computeValues() {
    const valuesAsNumbers = [...this.values()];
    return numberArrayCompute(valuesAsNumbers);
  }
  /**
  * Return entries sorted
  * @param sortStyle Sorting style (default: _value_, ie. count)
  * @returns Sorted array of [key,frequency]
  */
  entriesSorted(sortStyle = `value`) {
    const s = keyValueSorter(sortStyle);
    return s(this.entries());
  }
  /**
  * Add one or more values, firing _change_ event.
  * @param values Values to add. Fires _change_ event after adding item(s)
  */
  add(...values2) {
    if (typeof values2 === `undefined`) throw new Error(`Param 'values' undefined`);
    const keys = values2.map((v) => this.#keyString(v));
    for (const key of keys) {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    }
    this.fireEvent(`change`, { context: this });
  }
};
var frequency = (keyString) => new FrequencyTracker(keyString);
var TrackerBase = class {
  /**
  * @ignore
  */
  seenCount;
  /**
  * @ignore
  */
  storeIntermediate;
  /**
  * @ignore
  */
  resetAfterSamples;
  /**
  * @ignore
  */
  sampleLimit;
  id;
  debug;
  constructor(opts = {}) {
    this.id = opts.id ?? `tracker`;
    this.debug = opts.debug ?? false;
    this.sampleLimit = opts.sampleLimit ?? -1;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
    this.seenCount = 0;
    if (this.debug) console.log(`TrackerBase: sampleLimit: ${this.sampleLimit} resetAfter: ${this.resetAfterSamples} store: ${this.storeIntermediate}`);
  }
  /**
  * Reset tracker
  */
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  /**
  * Adds a value, returning computed result.
  *
  * At this point, we check if the buffer is larger than `resetAfterSamples`. If so, `reset()` is called.
  * If not, we check `sampleLimit`. If the buffer is twice as large as sample limit, `trimStore()` is
  * called to take it down to sample limit, and `onTrimmed()` is called.
  * @param p
  * @returns
  */
  seen(...p) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) this.reset();
    else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
      this.seenCount = this.trimStore(this.sampleLimit);
      this.onTrimmed(`resize`);
    }
    this.seenCount += p.length;
    const t$1 = this.filterData(p);
    return this.computeResults(t$1);
  }
};
var PrimitiveTracker = class extends TrackerBase {
  values;
  timestamps;
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
  onTrimmed(reason) {
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
  /**
  * Returns the time, in milliseconds, covering the initial and last values.
  * Returns NaN if either of these is missing.
  */
  get timespan() {
    const oldest = this.timestamps.at(0);
    const newest = this.timestamps.at(-1);
    if (oldest === void 0) return NaN;
    if (newest === void 0) return NaN;
    return newest - oldest;
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
    const last2 = {
      value: lastValue,
      at: performance.now()
    };
    const values2 = rawValues.map((value2) => ({
      at: performance.now(),
      value: value2
    }));
    if (this.storeIntermediate) {
      this.values.push(...rawValues);
      this.timestamps.push(...values2.map((v) => v.at));
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
    return values2;
  }
};
var NumberTracker = class extends PrimitiveTracker {
  #total = 0;
  #min = Number.MAX_SAFE_INTEGER;
  #max = Number.MIN_SAFE_INTEGER;
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
    this.#min = Number.MAX_SAFE_INTEGER;
    this.#max = Number.MIN_SAFE_INTEGER;
    this.#total = 0;
    super.onReset();
  }
  /**
  * When trimmed, recomputes to set total/min/max to be based on
  * current values.
  * @param reason
  */
  onTrimmed(reason) {
    this.#min = minFast(this.values);
    this.#max = maxFast(this.values);
    this.#total = totalFast(this.values);
  }
  computeResults(values2) {
    if (values2.some((v) => Number.isNaN(v))) throw new Error(`Cannot add NaN`);
    const numbers = values2.map((value2) => value2.value);
    this.#total = numbers.reduce((accumulator, v) => accumulator + v, this.#total);
    this.#min = Math.min(...numbers, this.#min);
    this.#max = Math.max(...numbers, this.#max);
    return {
      max: this.#max,
      min: this.#min,
      total: this.#total,
      avg: this.avg
    };
  }
  getMinMaxAvg() {
    return {
      min: this.#min,
      max: this.#max,
      avg: this.avg
    };
  }
  get max() {
    return this.#max;
  }
  get total() {
    return this.#total;
  }
  get min() {
    return this.#min;
  }
  get avg() {
    return this.#total / this.seenCount;
  }
};
var number = (opts = {}) => new NumberTracker(opts);
var IntervalTracker = class extends NumberTracker {
  lastMark = 0;
  mark() {
    if (this.lastMark > 0) this.seen(performance.now() - this.lastMark);
    this.lastMark = performance.now();
  }
};
var interval = (options) => new IntervalTracker(options);
var RateTracker = class {
  #events = [];
  #fromTime;
  #resetAfterSamples;
  #sampleLimit;
  #resetTimer;
  constructor(opts = {}) {
    this.#resetAfterSamples = opts.resetAfterSamples ?? Number.MAX_SAFE_INTEGER;
    this.#sampleLimit = opts.sampleLimit ?? Number.MAX_SAFE_INTEGER;
    if (opts.timeoutInterval) this.#resetTimer = timeout(() => {
      this.reset();
    }, opts.timeoutInterval);
    this.#fromTime = performance.now();
  }
  /**
  * Mark that an event has happened
  */
  mark() {
    if (this.#events.length >= this.#resetAfterSamples) this.reset();
    else if (this.#events.length >= this.#sampleLimit) {
      this.#events = this.#events.slice(1);
      this.#fromTime = this.#events[0];
    }
    this.#events.push(performance.now());
    if (this.#resetTimer) this.#resetTimer.start();
  }
  /**
  * Compute {min,max,avg} for the interval _between_ events.
  * @returns
  */
  computeIntervals() {
    const intervals = [];
    let min$12 = Number.MAX_SAFE_INTEGER;
    let max$12 = Number.MIN_SAFE_INTEGER;
    let total2 = 0;
    let count$1 = 0;
    let start = 0;
    for (const event2 of this.#events) {
      if (count$1 > 0) {
        const index = event2 - start;
        min$12 = Math.min(index, min$12);
        max$12 = Math.max(index, max$12);
        total2 += index;
        intervals.push(index);
      }
      start = event2;
      count$1++;
    }
    const avg = total2 / count$1;
    return {
      min: min$12,
      max: max$12,
      avg
    };
  }
  /**
  * Returns the time period (in milliseconds) that encompasses
  * the data set. Eg, a result of 1000 means there's data that
  * covers a one second period.
  */
  get elapsed() {
    return performance.now() - this.#fromTime;
  }
  /**
  * Resets the tracker.
  */
  reset() {
    this.#events = [];
    this.#fromTime = performance.now();
  }
  /**
  * Get the number of events per second
  */
  get perSecond() {
    return this.#events.length / (this.elapsed / 1e3);
  }
  /**
  * Get the number of events per minute
  */
  get perMinute() {
    return this.#events.length / (this.elapsed / 1e3 / 60);
  }
};
var rate = (opts = {}) => new RateTracker(opts);
var ObjectTracker = class extends TrackerBase {
  values;
  constructor(opts = {}) {
    super(opts);
    this.values = [];
  }
  onTrimmed(reason) {
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
  filterData(p) {
    const ts = p.map((v) => `at` in v ? v : {
      ...v,
      at: Date.now()
    });
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
  * Returns the oldest value in the buffer
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
  /**
  * Returns the time, in milliseconds, covering the initial and last values.
  * Returns NaN if either of these is missing.
  */
  get timespan() {
    const oldest = this.initial;
    const newest = this.last;
    if (!oldest) return NaN;
    if (!newest) return NaN;
    return newest.at - oldest.at;
  }
};
var TrackedValueMap = class {
  store;
  gog;
  constructor(creator) {
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerateSync(this.store, creator);
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
  seen(id, ...values2) {
    const trackedValue = this.getTrackedValue(id, ...values2);
    const result = trackedValue.seen(...values2);
    return result;
  }
  /**
  * Creates or returns a TrackedValue instance for `id`.
  * @param id
  * @param values
  * @returns
  */
  getTrackedValue(id, ...values2) {
    if (id === null) throw new Error(`id parameter cannot be null`);
    if (id === void 0) throw new Error(`id parameter cannot be undefined`);
    const trackedValue = this.gog(id, values2[0]);
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
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa > bb) return -1;
      return 1;
    });
    for (const t$1 of tp) yield t$1;
  }
  /**
  * Iterates underlying values, ordered by age (oldest first)
  * First the named values are sorted by their `elapsed` value, and then
  * we return the last value for that group.
  */
  *valuesByAge() {
    for (const tb of this.trackedByAge()) yield tb.last;
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
    for (const p of this.store.values()) yield p.last;
  }
  /**
  * Enumerate starting values
  */
  *initialValues() {
    for (const p of this.store.values()) yield p.initial;
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
var src_exports6 = {};
__export2(src_exports6, {
  FrequencyTracker: () => FrequencyTracker,
  IntervalTracker: () => IntervalTracker,
  NumberTracker: () => NumberTracker,
  ObjectTracker: () => ObjectTracker,
  PrimitiveTracker: () => PrimitiveTracker,
  RateTracker: () => RateTracker,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  frequency: () => frequency,
  handleChangeResult: () => handleChangeResult,
  interval: () => interval,
  number: () => number,
  rate: () => rate,
  trackBooleanChange: () => trackBooleanChange,
  trackNumberChange: () => trackNumberChange
});
var { abs: abs$1, cos: cos$1, sin: sin$1, acos: acos$1, atan2, sqrt: sqrt$1, pow } = Math;
function crt(v) {
  return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi$1 = Math.PI;
var tau = 2 * pi$1;
var quart = pi$1 / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = {
  x: 0,
  y: 0,
  z: 0
};
var utils = {
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
  arcfn: function(t$1, derivativeFn) {
    const d = derivativeFn(t$1);
    let l = d.x * d.x + d.y * d.y;
    if (typeof d.z !== "undefined") l += d.z * d.z;
    return sqrt$1(l);
  },
  compute: function(t$1, points, _3d) {
    if (t$1 === 0) {
      points[0].t = 0;
      return points[0];
    }
    const order = points.length - 1;
    if (t$1 === 1) {
      points[order].t = 1;
      return points[order];
    }
    const mt = 1 - t$1;
    let p = points;
    if (order === 0) {
      points[0].t = t$1;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p[0].x + t$1 * p[1].x,
        y: mt * p[0].y + t$1 * p[1].y,
        t: t$1
      };
      if (_3d) ret.z = mt * p[0].z + t$1 * p[1].z;
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t2 = t$1 * t$1, a, b, c, d = 0;
      if (order === 2) {
        p = [
          p[0],
          p[1],
          p[2],
          ZERO
        ];
        a = mt2;
        b = mt * t$1 * 2;
        c = t2;
      } else if (order === 3) {
        a = mt2 * mt;
        b = mt2 * t$1 * 3;
        c = mt * t2 * 3;
        d = t$1 * t2;
      }
      const ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
        t: t$1
      };
      if (_3d) ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t$1,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t$1
        };
        if (typeof dCpts[i].z !== "undefined") dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t$1;
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t$1;
    return dCpts[0];
  },
  computeWithRatios: function(t$1, points, ratios, _3d) {
    const mt = 1 - t$1, r = ratios, p = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
    f1 *= mt;
    f2 *= t$1;
    if (p.length === 2) {
      d = f1 + f2;
      return {
        x: (f1 * p[0].x + f2 * p[1].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
        t: t$1
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t$1 * t$1;
    if (p.length === 3) {
      d = f1 + f2 + f3;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
        t: t$1
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t$1 * t$1 * t$1;
    if (p.length === 4) {
      d = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
        t: t$1
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
      const list = [];
      for (let j = 0, dpt; j < c; j++) {
        dpt = {
          x: c * (p[j + 1].x - p[j].x),
          y: c * (p[j + 1].y - p[j].y)
        };
        if (_3d) dpt.z = c * (p[j + 1].z - p[j].z);
        list.push(dpt);
      }
      dpoints.push(list);
      p = list;
    }
    return dpoints;
  },
  between: function(v, m, M) {
    return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
  },
  approximately: function(a, b, precision) {
    return abs$1(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum3 = 0;
    for (let i = 0, t$1; i < len; i++) {
      t$1 = z * utils.Tvalues[i] + z;
      sum3 += utils.Cvalues[i] * utils.arcfn(t$1, derivativeFn);
    }
    return z * sum3;
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
    if (v1.z !== void 0 && v2.z !== void 0) ret.z = v1.z + r * (v2.z - v1.z);
    return ret;
  },
  pointToString: function(p) {
    let s = p.x + "/" + p.y;
    if (typeof p.z !== "undefined") s += "/" + p.z;
    return s;
  },
  pointsToString: function(points) {
    return "[" + points.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot);
  },
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt$1(dx * dx + dy * dy);
  },
  closest: function(LUT, point2) {
    let mdist = pow(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point2, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return {
      mdist,
      mpos
    };
  },
  abcratio: function(t$1, n) {
    if (n !== 2 && n !== 3) return false;
    if (typeof t$1 === "undefined") t$1 = 0.5;
    else if (t$1 === 0 || t$1 === 1) return t$1;
    const bottom = pow(t$1, n) + pow(1 - t$1, n), top = bottom - 1;
    return abs$1(top / bottom);
  },
  projectionratio: function(t$1, n) {
    if (n !== 2 && n !== 3) return false;
    if (typeof t$1 === "undefined") t$1 = 0.5;
    else if (t$1 === 0 || t$1 === 1) return t$1;
    const top = pow(1 - t$1, n), bottom = pow(t$1, n) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d == 0) return false;
    return {
      x: nx / d,
      y: ny / d
    };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p2.x, p2.y);
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox2 = s.bbox();
      if (mx > bbox2.x.min) mx = bbox2.x.min;
      if (my > bbox2.y.min) my = bbox2.y.min;
      if (MX < bbox2.x.max) MX = bbox2.x.max;
      if (MY < bbox2.y.max) MY = bbox2.y.max;
    });
    return {
      x: {
        min: mx,
        mid: (mx + MX) / 2,
        max: MX,
        size: MX - mx
      },
      y: {
        min: my,
        mid: (my + MY) / 2,
        max: MY,
        size: MY - my
      }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox2)) return [];
    const intersections2 = [];
    const a1 = [
      s1.startcap,
      s1.forward,
      s1.back,
      s1.endcap
    ];
    const a2 = [
      s2.startcap,
      s2.forward,
      s2.back,
      s2.endcap
    ];
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
      bbox: utils.findbbox([
        start,
        forward,
        back,
        end
      ])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list) return {
      min: 0,
      max: 0
    };
    let min$12 = nMax, max$12 = nMin, t$1, c;
    if (list.indexOf(0) === -1) list = [0].concat(list);
    if (list.indexOf(1) === -1) list.push(1);
    for (let i = 0, len = list.length; i < len; i++) {
      t$1 = list[i];
      c = curve.get(t$1);
      if (c[d] < min$12) min$12 = c[d];
      if (c[d] > max$12) max$12 = c[d];
    }
    return {
      min: min$12,
      mid: (min$12 + max$12) / 2,
      max: max$12,
      size: max$12 - min$12
    };
  },
  align: function(points, line) {
    const tx = line.p1.x, ty = line.p1.y, a = -atan2(line.p2.y - ty, line.p2.x - tx), d = function(v) {
      return {
        x: (v.x - tx) * cos$1(a) - (v.y - ty) * sin$1(a),
        y: (v.x - tx) * sin$1(a) + (v.y - ty) * cos$1(a)
      };
    };
    return points.map(d);
  },
  roots: function(points, line) {
    line = line || {
      p1: {
        x: 0,
        y: 0
      },
      p2: {
        x: 1,
        y: 0
      }
    };
    const order = points.length - 1;
    const aligned = utils.align(points, line);
    const reduce3 = function(t$1) {
      return 0 <= t$1 && t$1 <= 1;
    };
    if (order === 2) {
      const a$1 = aligned[0].y, b$1 = aligned[1].y, c$1 = aligned[2].y, d$1 = a$1 - 2 * b$1 + c$1;
      if (d$1 !== 0) {
        const m1 = -sqrt$1(b$1 * b$1 - a$1 * c$1), m2 = -a$1 + b$1, v1$1 = -(m1 + m2) / d$1, v2 = -(-m1 + m2) / d$1;
        return [v1$1, v2].filter(reduce3);
      } else if (b$1 !== c$1 && d$1 === 0) return [(2 * b$1 - c$1) / (2 * b$1 - 2 * c$1)].filter(reduce3);
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
    if (utils.approximately(d, 0)) {
      if (utils.approximately(a, 0)) {
        if (utils.approximately(b, 0)) return [];
        return [-c / b].filter(reduce3);
      }
      const q$1 = sqrt$1(b * b - 4 * a * c), a2 = 2 * a;
      return [(q$1 - b) / a2, (-b - q$1) / a2].filter(reduce3);
    }
    a /= d;
    b /= d;
    c /= d;
    const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p / 3, mp33 = mp3 * mp3 * mp3, r = sqrt$1(mp33), t$1 = -q / (2 * r), cosphi = t$1 < -1 ? -1 : t$1 > 1 ? 1 : t$1, phi = acos$1(cosphi), crtr = crt(r), t1 = 2 * crtr;
      x1 = t1 * cos$1(phi / 3) - a / 3;
      x2 = t1 * cos$1((phi + tau) / 3) - a / 3;
      x3 = t1 * cos$1((phi + 2 * tau) / 3) - a / 3;
      return [
        x1,
        x2,
        x3
      ].filter(reduce3);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce3);
    } else {
      const sd = sqrt$1(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce3);
    }
  },
  droots: function(p) {
    if (p.length === 3) {
      const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
      if (d !== 0) {
        const m1 = -sqrt$1(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
        return [v1, v2];
      } else if (b !== c && d === 0) return [(2 * b - c) / (2 * (b - c))];
      return [];
    }
    if (p.length === 2) {
      const a = p[0], b = p[1];
      if (a !== b) return [a / (a - b)];
      return [];
    }
    return [];
  },
  curvature: function(t$1, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d = utils.compute(t$1, d1);
    const dd = utils.compute(t$1, d2);
    const qdsum = d.x * d.x + d.y * d.y;
    if (_3d) {
      num = sqrt$1(pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2));
      dnm = pow(qdsum + d.z * d.z, 3 / 2);
    } else {
      num = d.x * dd.y - d.y * dd.x;
      dnm = pow(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) return {
      k: 0,
      r: 0
    };
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t$1 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t$1 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs$1(nk - k) + abs$1(k - pk)) / 2;
    }
    return {
      k,
      r,
      dk,
      adk
    };
  },
  inflections: function(points) {
    if (points.length < 4) return [];
    const p = utils.align(points, {
      p1: points[0],
      p2: points.slice(-1)[0]
    }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t$1 = -v3 / v2;
        if (0 <= t$1 && t$1 <= 1) return [t$1];
      }
      return [];
    }
    const d2 = 2 * v1;
    if (utils.approximately(d2, 0)) return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0) return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t$1, d; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t$1 = b2[dim].mid;
      d = (b1[dim].size + b2[dim].size) / 2;
      if (abs$1(l - t$1) >= d) return false;
    }
    return true;
  },
  expandbox: function(bbox2, _bbox) {
    if (_bbox.x.min < bbox2.x.min) bbox2.x.min = _bbox.x.min;
    if (_bbox.y.min < bbox2.y.min) bbox2.y.min = _bbox.y.min;
    if (_bbox.z && _bbox.z.min < bbox2.z.min) bbox2.z.min = _bbox.z.min;
    if (_bbox.x.max > bbox2.x.max) bbox2.x.max = _bbox.x.max;
    if (_bbox.y.max > bbox2.y.max) bbox2.y.max = _bbox.y.max;
    if (_bbox.z && _bbox.z.max > bbox2.z.max) bbox2.z.max = _bbox.z.max;
    bbox2.x.mid = (bbox2.x.min + bbox2.x.max) / 2;
    bbox2.y.mid = (bbox2.y.min + bbox2.y.max) / 2;
    if (bbox2.z) bbox2.z.mid = (bbox2.z.min + bbox2.z.max) / 2;
    bbox2.x.size = bbox2.x.max - bbox2.x.min;
    bbox2.y.size = bbox2.y.max - bbox2.y.min;
    if (bbox2.z) bbox2.z.size = bbox2.z.max - bbox2.z.min;
  },
  pairiteration: function(c1, c2, curveIntersectionThreshold) {
    const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) return [(r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r];
    let cc1 = c1.split(0.5), cc2 = c2.split(0.5), pairs = [
      {
        left: cc1.left,
        right: cc2.left
      },
      {
        left: cc1.left,
        right: cc2.right
      },
      {
        left: cc1.right,
        right: cc2.right
      },
      {
        left: cc1.right,
        right: cc2.left
      }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0) return results;
    pairs.forEach(function(pair) {
      results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos$1(quart) - dy1 * sin$1(quart), dy1p = dx1 * sin$1(quart) + dy1 * cos$1(quart), dx2p = dx2 * cos$1(quart) - dy2 * sin$1(quart), dy2p = dx2 * sin$1(quart) + dy2 * cos$1(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
    let s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
    if (s < e) {
      if (s > m || m > e) s += tau;
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else if (e < m && m < s) {
      _ = e;
      e = s;
      s = _;
    } else e += tau;
    arc.s = s;
    arc.e = e;
    arc.r = r;
    return arc;
  },
  numberSort: function(a, b) {
    return a - b;
  }
};
var PolyBezier = class PolyBezier2 {
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
    }).reduce(function(a, b) {
      return a + b;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c = this.curves;
    var bbox2 = c[0].bbox();
    for (var i = 1; i < c.length; i++) utils.expandbox(bbox2, c[i].bbox());
    return bbox2;
  }
  offset(d) {
    const offset2 = [];
    this.curves.forEach(function(v) {
      offset2.push(...v.offset(d));
    });
    return new PolyBezier2(offset2);
  }
};
var { abs, min: min3, max: max3, cos, sin, acos, sqrt } = Math;
var pi = Math.PI;
var Bezier = class Bezier2 {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point$1) {
        [
          "x",
          "y",
          "z"
        ].forEach(function(d) {
          if (typeof point$1[d] !== "undefined") newargs.push(point$1[d]);
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        higher = true;
      }
    } else if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
      if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point2 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) point2.z = args[idx + 2];
      points.push(point2);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d) dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, {
      p1: points[0],
      p2: points[order]
    });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t$1, p) => t$1 + abs(p.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t$1) {
    if (typeof t$1 === "undefined") t$1 = 0.5;
    if (t$1 === 0) return new Bezier2(p2, p2, p3);
    if (t$1 === 1) return new Bezier2(p1, p2, p2);
    const abc = Bezier2.getABC(2, p1, p2, p3, t$1);
    return new Bezier2(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B, E, t$1, d1) {
    if (typeof t$1 === "undefined") t$1 = 0.5;
    const abc = Bezier2.getABC(3, S, B, E, t$1);
    if (typeof d1 === "undefined") d1 = utils.dist(B, abc.C);
    const d2 = d1 * (1 - t$1) / t$1;
    const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = {
      x: B.x - bx1,
      y: B.y - by1
    }, e2 = {
      x: B.x + bx2,
      y: B.y + by2
    }, A = abc.A, v1 = {
      x: A.x + (e1.x - A.x) / (1 - t$1),
      y: A.y + (e1.y - A.y) / (1 - t$1)
    }, v2 = {
      x: A.x + (e2.x - A.x) / t$1,
      y: A.y + (e2.y - A.y) / t$1
    }, nc1 = {
      x: S.x + (v1.x - S.x) / t$1,
      y: S.y + (v1.y - S.y) / t$1
    }, nc2 = {
      x: E.x + (v2.x - E.x) / (1 - t$1),
      y: E.y + (v2.y - E.y) / (1 - t$1)
    };
    return new Bezier2(S, nc1, nc2, E);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return Bezier2.getUtils();
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
    const p = this.points, x = p[0].x, y = p[0].y, s = [
      "M",
      x,
      y,
      this.order === 2 ? "Q" : "C"
    ];
    for (let i = 1, last2 = p.length; i < last2; i++) {
      s.push(p[i].x);
      s.push(p[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) throw new Error("incorrect number of ratio values");
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
    return this.points.map(function(c, pos) {
      return "" + pos + c.x + c.y + (c.z ? c.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points = this.points;
    const angle = utils.angle(points[0], points[this.order], points[1]);
    this.clockwise = angle > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S, B, E, t$1 = 0.5) {
    const u = utils.projectionratio(t$1, order), um = 1 - u, C = {
      x: u * S.x + um * E.x,
      y: u * S.y + um * E.y
    }, s = utils.abcratio(t$1, order), A = {
      x: B.x + (B.x - C.x) / s,
      y: B.y + (B.y - C.y) / s
    };
    return {
      A,
      B,
      C,
      S,
      E
    };
  }
  getABC(t$1, B) {
    B = B || this.get(t$1);
    let S = this.points[0];
    let E = this.points[this.order];
    return Bezier2.getABC(this.order, S, B, E, t$1);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps + 1) return this._lut;
    this._lut = [];
    steps++;
    this._lut = [];
    for (let i = 0, p, t$1; i < steps; i++) {
      t$1 = i / (steps - 1);
      p = this.compute(t$1);
      p.t = t$1;
      this._lut.push(p);
    }
    return this._lut;
  }
  on(point2, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t$1 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point2) < error) {
        hits.push(c);
        t$1 += i / lut.length;
      }
    }
    if (!hits.length) return false;
    return t /= hits.length;
  }
  project(point2) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point2), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t$1 = t1, ft = t$1, p;
    mdist += 1;
    for (let d; t$1 < t2 + step; t$1 += step) {
      p = this.compute(t$1);
      d = utils.dist(point2, p);
      if (d < mdist) {
        mdist = d;
        ft = t$1;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.compute(ft);
    p.t = ft;
    p.d = mdist;
    return p;
  }
  get(t$1) {
    return this.compute(t$1);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t$1) {
    if (this.ratios) return utils.computeWithRatios(t$1, this.points, this.ratios, this._3d);
    return utils.compute(t$1, this.points, this._3d, this.ratios);
  }
  raise() {
    const p = this.points, np = [p[0]], k = p.length;
    for (let i = 1, pi$2, pim; i < k; i++) {
      pi$2 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi$2.x + i / k * pim.x,
        y: (k - i) / k * pi$2.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new Bezier2(np);
  }
  derivative(t$1) {
    return utils.compute(t$1, this.dpoints[0], this._3d);
  }
  dderivative(t$1) {
    return utils.compute(t$1, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new Bezier2(utils.align(p, {
      p1: p[0],
      p2: p[p.length - 1]
    }));
  }
  curvature(t$1) {
    return utils.curvature(t$1, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t$1) {
    return this._3d ? this.__normal3(t$1) : this.__normal2(t$1);
  }
  __normal2(t$1) {
    const d = this.derivative(t$1);
    const q = sqrt(d.x * d.x + d.y * d.y);
    return {
      t: t$1,
      x: -d.y / q,
      y: d.x / q
    };
  }
  __normal3(t$1) {
    const r1 = this.derivative(t$1), r2 = this.derivative(t$1 + 0.01), q1 = sqrt(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m = sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
    c.x /= m;
    c.y /= m;
    c.z /= m;
    const R = [
      c.x * c.x,
      c.x * c.y - c.z,
      c.x * c.z + c.y,
      c.x * c.y + c.z,
      c.y * c.y,
      c.y * c.z - c.x,
      c.x * c.z - c.y,
      c.y * c.z + c.x,
      c.z * c.z
    ];
    const n = {
      t: t$1,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n;
  }
  hull(t$1) {
    let p = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p[0];
    q[idx++] = p[1];
    q[idx++] = p[2];
    if (this.order === 3) q[idx++] = p[3];
    while (p.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p.length - 1; i < l; i++) {
        pt = utils.lerp(t$1, p[i], p[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p = _p;
    }
    return q;
  }
  split(t1, t2) {
    if (t1 === 0 && !!t2) return this.split(t2).left;
    if (t2 === 1) return this.split(t1).right;
    const q = this.hull(t1);
    const result = {
      left: this.order === 2 ? new Bezier2([
        q[0],
        q[3],
        q[5]
      ]) : new Bezier2([
        q[0],
        q[4],
        q[7],
        q[9]
      ]),
      right: this.order === 2 ? new Bezier2([
        q[5],
        q[4],
        q[2]
      ]) : new Bezier2([
        q[9],
        q[8],
        q[6],
        q[3]
      ]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t2) return result;
    t2 = utils.map(t2, t1, 1, 0, 1);
    return result.right.split(t2).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(function(dim) {
      let mfn = function(v) {
        return v[dim];
      };
      let p = this.dpoints[0].map(mfn);
      result[dim] = utils.droots(p);
      if (this.order === 3) {
        p = this.dpoints[1].map(mfn);
        result[dim] = result[dim].concat(utils.droots(p));
      }
      result[dim] = result[dim].filter(function(t$1) {
        return t$1 >= 0 && t$1 <= 1;
      });
      roots = roots.concat(result[dim].sort(utils.numberSort));
    }.bind(this));
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(function(d) {
      result[d] = utils.getminmax(this, d, extrema[d]);
    }.bind(this));
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t$1, d) {
    if (typeof d !== "undefined") {
      const c = this.get(t$1), n = this.normal(t$1);
      const ret = {
        c,
        n,
        x: c.x + n.x * d,
        y: c.y + n.y * d
      };
      if (this._3d) ret.z = c.z + n.z * d;
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p) {
        const ret = {
          x: p.x + t$1 * nv.x,
          y: p.y + t$1 * nv.y
        };
        if (p.z && nv.z) ret.z = p.z + t$1 * nv.z;
        return ret;
      });
      return [new Bezier2(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) return s.offset(t$1)[0];
      return s.scale(t$1);
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
    if (this._3d) s += n1.z * n2.z;
    return abs(acos(s)) < pi / 3;
  }
  reduce() {
    let i, t1 = 0, t2 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) extrema = [0].concat(extrema);
    if (extrema.indexOf(1) === -1) extrema.push(1);
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
      while (t2 <= 1) for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
        segment = p1.split(t1, t2);
        if (!segment.simple()) {
          t2 -= step;
          if (abs(t1 - t2) < step) return [];
          segment = p1.split(t1, t2);
          segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
          segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
          pass2.push(segment);
          t1 = t2;
          break;
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
    let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new Bezier2(this.points.map((p, i) => ({
      x: p.x + v.x * d[i],
      y: p.y + v.y * d[i]
    })));
  }
  scale(d) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d === "function") distanceFn = d;
    if (distanceFn && order === 2) return this.raise().scale(distanceFn);
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) return this.translate(this.normal(0), distanceFn ? distanceFn(0) : d, distanceFn ? distanceFn(1) : d);
    const r1 = distanceFn ? distanceFn(0) : d;
    const r2 = distanceFn ? distanceFn(1) : d;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) throw new Error("cannot scale this curve. Try reducing it first.");
    [0, 1].forEach(function(t$1) {
      const p = np[t$1 * order] = utils.copy(points[t$1 * order]);
      p.x += (t$1 ? r2 : r1) * v[t$1].n.x;
      p.y += (t$1 ? r2 : r1) * v[t$1].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t$1) => {
        if (order === 2 && !!t$1) return;
        const p = np[t$1 * order];
        const d$1 = this.derivative(t$1);
        const p2 = {
          x: p.x + d$1.x,
          y: p.y + d$1.y
        };
        np[t$1 + 1] = utils.lli4(p, p2, o, points[t$1 + 1]);
      });
      return new Bezier2(np);
    }
    [0, 1].forEach(function(t$1) {
      if (order === 2 && !!t$1) return;
      var p = points[t$1 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t$1 + 1) / order) : d;
      if (distanceFn && !clockwise) rc = -rc;
      var m = sqrt(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t$1 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new Bezier2(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n = this.normal(0);
      const start = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = {
        x: start.x + n.x * d1,
        y: start.y + n.y * d1
      };
      e = {
        x: end.x + n.x * d3,
        y: end.y + n.y * d3
      };
      mid = {
        x: (s.x + e.x) / 2,
        y: (s.y + e.y) / 2
      };
      const fline = [
        s,
        mid,
        e
      ];
      s = {
        x: start.x - n.x * d2,
        y: start.y - n.y * d2
      };
      e = {
        x: end.x - n.x * d4,
        y: end.y - n.y * d4
      };
      mid = {
        x: (s.x + e.x) / 2,
        y: (s.y + e.y) / 2
      };
      const bline = [
        e,
        mid,
        s
      ];
      const ls$1 = utils.makeline(bline[2], fline[0]);
      const le$1 = utils.makeline(fline[2], bline[0]);
      const segments$1 = [
        ls$1,
        new Bezier2(fline),
        le$1,
        new Bezier2(bline)
      ];
      return new PolyBezier(segments$1);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen$1, alen$1, slen) {
      return function(v) {
        const f1 = alen$1 / tlen$1, f2 = (alen$1 + slen) / tlen$1, d = e - s;
        return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
        bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p = s.points;
      if (p[3]) s.points = [
        p[3],
        p[2],
        p[1],
        p[0]
      ];
      else s.points = [
        p[2],
        p[1],
        p[0]
      ];
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
      const shape = utils.makeshape(outline[i], outline[len - i], curveIntersectionThreshold);
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve) return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) return this.lineIntersects(curve);
    if (curve instanceof Bezier2) curve = curve.reduce();
    return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
  }
  lineIntersects(line) {
    const mx = min3(line.p1.x, line.p2.x), my = min3(line.p1.y, line.p2.y), MX = max3(line.p1.x, line.p2.x), MY = max3(line.p1.y, line.p2.y);
    return utils.roots(this.points, line).filter((t$1) => {
      var p = this.get(t$1);
      return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
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
  curveintersects(c1, c2, curveIntersectionThreshold) {
    const pairs = [];
    c1.forEach(function(l) {
      c2.forEach(function(r) {
        if (l.overlaps(r)) pairs.push({
          left: l,
          right: r
        });
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
      if (result.length > 0) intersections2 = intersections2.concat(result);
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
    return abs(d1 - ref) + abs(d2 - ref);
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
              let d = {
                x: arc.x + arc.r * cos(arc.e),
                y: arc.y + arc.r * sin(arc.e)
              };
              arc.e += utils.angle({
                x: arc.x,
                y: arc.y
              }, d, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else t_e = t_m;
      } while (!done && safety++ < 100);
      if (safety >= 100) break;
      prev_arc = prev_arc ? prev_arc : arc;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};

// node_modules/ixfx/bundle/geometry.js
var piPi2 = Math.PI * 2;
function degreeToRadian(angleInDegrees) {
  return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
function radianInvert(angleInRadians) {
  return (angleInRadians + Math.PI) % (2 * Math.PI);
}
function radianToDegree(angleInRadians) {
  return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
var radiansSum = (start, amount, clockwise = true) => {
  if (clockwise) {
    let x = start + amount;
    if (x >= piPi2) x = x % piPi2;
    return x;
  } else {
    const x = start - amount;
    if (x < 0) return piPi2 + x;
    return x;
  }
};
var radianArc = (start, end, clockwise = true) => {
  let s = start;
  if (end < s) {
    s = 0;
    end = piPi2 - start + end;
  }
  let d = end - s;
  if (clockwise) d = piPi2 - d;
  if (d >= piPi2) return d % piPi2;
  return d;
};
var isNull = (p) => {
  if (isPoint3d(p)) {
    if (p.z !== null) return false;
  }
  return p.x === null && p.y === null;
};
var isNaN$1 = (p) => {
  if (isPoint3d(p)) {
    if (!Number.isNaN(p.z)) return false;
  }
  return Number.isNaN(p.x) || Number.isNaN(p.y);
};
function test(p, name = `Point`, extraInfo = ``) {
  if (p === void 0) return errorResult(`'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`, extraInfo);
  if (p === null) return errorResult(`'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`, extraInfo);
  if (typeof p !== `object`) return errorResult(`'${name}' is type '${typeof p}'. Expected object.`, extraInfo);
  if (p.x === void 0) return errorResult(`'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`, extraInfo);
  if (p.y === void 0) return errorResult(`'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`, extraInfo);
  if (typeof p.x !== `number`) return errorResult(`'${name}.x' must be a number. Got ${typeof p.x}`, extraInfo);
  if (typeof p.y !== `number`) return errorResult(`'${name}.y' must be a number. Got ${typeof p.y}`, extraInfo);
  if (p.z !== void 0) {
    if (typeof p.z !== `number`) return errorResult(`${name}.z must be a number. Got: ${typeof p.z}`, extraInfo);
    if (Number.isNaN(p.z)) return errorResult(`'${name}.z' is NaN. Got: ${JSON.stringify(p)}`, extraInfo);
  }
  if (p.x === null) return errorResult(`'${name}.x' is null`, extraInfo);
  if (p.y === null) return errorResult(`'${name}.y' is null`, extraInfo);
  if (Number.isNaN(p.x)) return errorResult(`'${name}.x' is NaN`, extraInfo);
  if (Number.isNaN(p.y)) return errorResult(`'${name}.y' is NaN`, extraInfo);
  return {
    success: true,
    value: p
  };
}
function guard$1(p, name = `Point`, info) {
  resultThrow(test(p, name, info));
}
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard$1(pt, name);
  resultThrow(numberTest(pt.x, `nonZero`, `${name}.x`), numberTest(pt.y, `nonZero`, `${name}.y`), () => {
    if (typeof pt.z !== `undefined`) return numberTest(pt.z, `nonZero`, `${name}.z`);
  });
  return true;
};
function isPoint(p) {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  return true;
}
var isPoint3d = (p) => {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  if (p.z === void 0) return false;
  return true;
};
var isEmpty2 = (p) => {
  if (isPoint3d(p)) {
    if (p.z !== 0) return false;
  }
  return p.x === 0 && p.y === 0;
};
var isPlaceholder = (p) => {
  if (isPoint3d(p)) {
    if (!Number.isNaN(p.z)) return false;
  }
  return Number.isNaN(p.x) && Number.isNaN(p.y);
};
function getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6) {
  if (isPoint3d(a1) && isPoint3d(ab2)) return [a1, ab2];
  if (isPoint(a1) && isPoint(ab2)) return [a1, ab2];
  if (isPoint3d(a1)) {
    const b$1 = {
      x: ab2,
      y: ab3,
      z: ab4
    };
    if (!isPoint3d(b$1)) throw new Error(`Expected x, y & z parameters`);
    return [a1, b$1];
  }
  if (isPoint(a1)) {
    const b$1 = {
      x: ab2,
      y: ab3
    };
    if (!isPoint(b$1)) throw new Error(`Expected x & y parameters`);
    return [a1, b$1];
  }
  if (typeof ab5 !== `undefined` && typeof ab4 !== `undefined`) {
    const a$1 = {
      x: a1,
      y: ab2,
      z: ab3
    };
    const b$1 = {
      x: ab4,
      y: ab5,
      z: ab6
    };
    if (!isPoint3d(a$1)) throw new Error(`Expected x,y,z for first point`);
    if (!isPoint3d(b$1)) throw new Error(`Expected x,y,z for second point`);
    return [a$1, b$1];
  }
  const a = {
    x: a1,
    y: ab2
  };
  const b = {
    x: ab3,
    y: ab4
  };
  if (!isPoint(a)) throw new Error(`Expected x,y for first point`);
  if (!isPoint(b)) throw new Error(`Expected x,y for second point`);
  return [a, b];
}
function getPointParameter(a, b, c) {
  if (a === void 0) return {
    x: 0,
    y: 0
  };
  if (Array.isArray(a)) {
    if (a.length === 0) return Object.freeze({
      x: 0,
      y: 0
    });
    if (a.length === 1) return Object.freeze({
      x: a[0],
      y: 0
    });
    if (a.length === 2) return Object.freeze({
      x: a[0],
      y: a[1]
    });
    if (a.length === 3) return Object.freeze({
      x: a[0],
      y: a[1],
      z: a[2]
    });
    throw new Error(`Expected array to be 1-3 elements in length. Got ${a.length}.`);
  }
  if (isPoint(a)) return a;
  else if (typeof a !== `number` || typeof b !== `number`) throw new TypeError(`Expected point or x,y as parameters. Got: a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  if (typeof c === `number`) return Object.freeze({
    x: a,
    y: b,
    z: c
  });
  return Object.freeze({
    x: a,
    y: b
  });
}
function distance2(a, xOrB, y, z) {
  const pt = getPointParameter(xOrB, y, z);
  guard$1(pt, `b`);
  guard$1(a, `a`);
  return isPoint3d(pt) && isPoint3d(a) ? Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z) : Math.hypot(pt.x - a.x, pt.y - a.y);
}
function distance2d(a, xOrB, y) {
  const pt = getPointParameter(xOrB, y);
  guard$1(pt, `b`);
  guard$1(a, `a`);
  return Math.hypot(pt.x - a.x, pt.y - a.y);
}
function findMinimum(comparer, ...points) {
  if (points.length === 0) throw new Error(`No points provided`);
  let min4 = points[0];
  for (const p of points) if (isPoint3d(min4) && isPoint3d(p)) min4 = comparer(min4, p);
  else min4 = comparer(min4, p);
  return min4;
}
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y) throw new Error(`topLeft.y greater than bottomRight.y`);
  if (topLeft.y > bottomLeft.y) throw new Error(`topLeft.y greater than bottomLeft.y`);
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
var bbox$1 = (...points) => {
  const leftMost = findMinimum((a, b) => {
    return a.x < b.x ? a : b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    return a.x > b.x ? a : b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    return a.y < b.y ? a : b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    return a.y > b.y ? a : b;
  }, ...points);
  const topLeft = {
    x: leftMost.x,
    y: topMost.y
  };
  const topRight = {
    x: rightMost.x,
    y: topMost.y
  };
  const bottomRight = {
    x: rightMost.x,
    y: bottomMost.y
  };
  const bottomLeft = {
    x: leftMost.x,
    y: bottomMost.y
  };
  return maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};
var bbox3d = (...points) => {
  const box = bbox$1(...points);
  const zMin = findMinimum((a, b) => {
    return a.z < b.z ? a : b;
  }, ...points);
  const zMax = findMinimum((a, b) => {
    return a.z > b.z ? a : b;
  }, ...points);
  return {
    ...box,
    z: zMin.z,
    depth: zMax.z - zMin.z
  };
};
var isPolarCoord = (p) => {
  if (p.distance === void 0) return false;
  if (p.angleRadian === void 0) return false;
  return true;
};
var guard$6 = (p, name = `Point`) => {
  if (p === void 0) throw new Error(`'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (p === null) throw new Error(`'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (p.angleRadian === void 0) throw new Error(`'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (p.distance === void 0) throw new Error(`'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
  if (typeof p.angleRadian !== `number`) throw new TypeError(`'${name}.angleRadian' must be a number. Got ${p.angleRadian}`);
  if (typeof p.distance !== `number`) throw new TypeError(`'${name}.distance' must be a number. Got ${p.distance}`);
  if (p.angleRadian === null) throw new Error(`'${name}.angleRadian' is null`);
  if (p.distance === null) throw new Error(`'${name}.distance' is null`);
  if (Number.isNaN(p.angleRadian)) throw new TypeError(`'${name}.angleRadian' is NaN`);
  if (Number.isNaN(p.distance)) throw new Error(`'${name}.distance' is NaN`);
};
var rotate$3 = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var invert$1 = (p) => {
  guard$6(p, `c`);
  return Object.freeze({
    ...p,
    angleRadian: p.angleRadian - Math.PI
  });
};
var isOpposite = (a, b) => {
  guard$6(a, `a`);
  guard$6(b, `b`);
  if (a.distance !== b.distance) return false;
  return a.angleRadian === -b.angleRadian;
};
var isParallel = (a, b) => {
  guard$6(a, `a`);
  guard$6(b, `b`);
  return a.angleRadian === b.angleRadian;
};
var isAntiParallel = (a, b) => {
  guard$6(a, `a`);
  guard$6(b, `b`);
  return a.angleRadian === -b.angleRadian;
};
var rotateDegrees = (c, amountDeg) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});
function subtract$2(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard$1(ptA, `a`);
  guard$1(ptB, `b`);
  const pt = {
    x: ptA.x - ptB.x,
    y: ptA.y - ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) - (ptB.z ?? 0);
  return Object.freeze(pt);
}
var Empty = {
  x: 0,
  y: 0
};
var Unit = {
  x: 1,
  y: 1
};
var Empty3d = {
  x: 0,
  y: 0,
  z: 0
};
var Unit3d = {
  x: 1,
  y: 1,
  z: 1
};
var toLine$1 = (c, start) => {
  const b = toCartesian(c, start);
  return {
    a: start,
    b
  };
};
var toCartesian = (a, b, c) => {
  if (isPolarCoord(a)) {
    if (typeof b === `undefined`) b = Empty;
    if (isPoint(b)) return polarToCartesian(a.distance, a.angleRadian, b);
    throw new Error(`Expecting (Coord, Point). Second parameter is not a point`);
  } else if (typeof a === `object`) throw new TypeError(`First param is an object, but not a Coord: ${JSON.stringify(a)}`);
  else if (typeof a === `number` && typeof b === `number`) {
    if (typeof c === `undefined`) c = Empty;
    if (!isPoint(c)) throw new Error(`Expecting (number, number, Point). Point param wrong type`);
    return polarToCartesian(a, b, c);
  } else throw new TypeError(`Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(a)}`);
};
var fromCartesian = (point$1, origin) => {
  if (typeof point$1 === `undefined`) throw new Error(`Param 'point' missing. Expecting a Point`);
  if (typeof origin === `undefined`) throw new Error(`Param 'origin' missing. Expecting a Point`);
  point$1 = subtract$2(point$1, origin);
  const angle = Math.atan2(point$1.y, point$1.x);
  const distance$2 = Math.hypot(point$1.x, point$1.y);
  const polar = {
    ...point$1,
    angleRadian: angle,
    distance: distance$2
  };
  delete polar.x;
  delete polar.y;
  return Object.freeze(polar);
};
var polarToCartesian = (distance$2, angleRadians, origin = Empty) => {
  guard$1(origin);
  return Object.freeze({
    x: origin.x + distance$2 * Math.cos(angleRadians),
    y: origin.y + distance$2 * Math.sin(angleRadians)
  });
};
var toString$5 = (p, digits) => {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  const angleDeg = radianToDegree(p.angleRadian);
  const d = digits ? p.distance.toFixed(digits) : p.distance;
  const a = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d},${a})`;
};
var toPoint = (v, origin = Empty) => {
  guard$6(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};
var normalise$2 = (c) => {
  if (c.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c,
    distance: 1
  });
};
var clampMagnitude$2 = (v, max4 = 1, min4 = 0) => {
  let mag = v.distance;
  if (mag > max4) mag = max4;
  if (mag < min4) mag = min4;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var dotProduct$3 = (a, b) => {
  guard$6(a, `a`);
  guard$6(b, `b`);
  return a.distance * b.distance * Math.cos(b.angleRadian - a.angleRadian);
};
var multiply$4 = (v, amt) => {
  guard$6(v);
  resultThrow(numberTest(amt, ``, `amt`));
  return Object.freeze({
    ...v,
    distance: v.distance * amt
  });
};
var divide$4 = (v, amt) => {
  guard$6(v);
  resultThrow(numberTest(amt, ``, `amt`));
  return Object.freeze({
    ...v,
    distance: v.distance / amt
  });
};
var Placeholder$3 = Object.freeze({
  x: NaN,
  y: NaN
});
var Placeholder3d = Object.freeze({
  x: NaN,
  y: NaN,
  z: NaN
});
var angleRadian = (a, b, c) => {
  guard$1(a, `a`);
  if (b === void 0) return Math.atan2(a.y, a.x);
  guard$1(b, `b`);
  if (c === void 0) return Math.atan2(b.y - a.y, b.x - a.x);
  guard$1(c, `c`);
  return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};
var angleRadianCircle = (a, b, c) => {
  const angle = angleRadian(a, b, c);
  if (angle < 0) return angle + piPi2;
  return angle;
};
var angleRadianThreePoint = (a, b, c) => {
  const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
  const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
};
var toIntegerValues = (pt, rounder = Math.round) => {
  guard$1(pt, `pt`);
  return Object.freeze({
    x: rounder(pt.x),
    y: rounder(pt.y)
  });
};
var to2d = (pt) => {
  guard$1(pt, `pt`);
  let copy = { ...pt };
  delete copy.z;
  return Object.freeze(copy);
};
var to3d = (pt, z = 0) => {
  guard$1(pt, `pt`);
  return Object.freeze({
    ...pt,
    z
  });
};
function toString$2(p, digits) {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  guard$1(p, `pt`);
  const x = digits ? p.x.toFixed(digits) : p.x;
  const y = digits ? p.y.toFixed(digits) : p.y;
  if (p.z === void 0) return `(${x},${y})`;
  else {
    const z = digits ? p.z.toFixed(digits) : p.z;
    return `(${x},${y},${z})`;
  }
}
var ray_exports = {};
__export2(ray_exports, {
  fromLine: () => fromLine,
  toCartesian: () => toCartesian$2,
  toString: () => toString$4
});
var toCartesian$2 = (ray, origin) => {
  const o = getOrigin(ray, origin);
  const a = toCartesian(ray.offset, ray.angleRadian, o);
  const b = toCartesian(ray.offset + ray.length, ray.angleRadian, o);
  return {
    a,
    b
  };
};
var getOrigin = (ray, origin) => {
  if (origin !== void 0) return origin;
  if (ray.origin !== void 0) return ray.origin;
  return {
    x: 0,
    y: 0
  };
};
var toString$4 = (ray) => {
  let basic = `PolarRay(angle: ${ray.angleRadian} offset: ${ray.offset} len: ${ray.length}`;
  if (ray.origin) basic += ` origin: ${toString$2(ray.origin)}`;
  basic += `)`;
  return basic;
};
var fromLine = (line, origin) => {
  const o = origin ?? line.a;
  return {
    angleRadian: angleRadian(line.b, o),
    offset: distance2(line.a, o),
    length: distance2(line.b, line.a),
    origin: o
  };
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a = smoothness * step++;
    yield {
      distance: zoom * a,
      angleRadian: a,
      step
    };
  }
}
var spiralRaw = (step, smoothness, zoom) => {
  const a = smoothness * step;
  return Object.freeze({
    distance: zoom * a,
    angleRadian: a
  });
};
var polar_exports = {};
__export2(polar_exports, {
  Ray: () => ray_exports,
  clampMagnitude: () => clampMagnitude$2,
  divide: () => divide$4,
  dotProduct: () => dotProduct$3,
  fromCartesian: () => fromCartesian,
  guard: () => guard$6,
  invert: () => invert$1,
  isAntiParallel: () => isAntiParallel,
  isOpposite: () => isOpposite,
  isParallel: () => isParallel,
  isPolarCoord: () => isPolarCoord,
  multiply: () => multiply$4,
  normalise: () => normalise$2,
  rotate: () => rotate$3,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian,
  toLine: () => toLine$1,
  toPoint: () => toPoint,
  toString: () => toString$5
});
var fromPoints$2 = (a, b) => {
  guard$1(a, `a`);
  guard$1(b, `b`);
  a = Object.freeze({ ...a });
  b = Object.freeze({ ...b });
  return Object.freeze({
    a,
    b
  });
};
var arc_exports = {};
__export2(arc_exports, {
  angularSize: () => angularSize,
  bbox: () => bbox$5,
  distanceCenter: () => distanceCenter$1,
  fromCircle: () => fromCircle,
  fromCircleAmount: () => fromCircleAmount,
  fromDegrees: () => fromDegrees$1,
  getStartEnd: () => getStartEnd,
  guard: () => guard$5,
  interpolate: () => interpolate$4,
  isArc: () => isArc,
  isEqual: () => isEqual$6,
  isPositioned: () => isPositioned$2,
  length: () => length$3,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath$3,
  toSvg: () => toSvg$1
});
var isArc = (p) => typeof p.startRadian !== `undefined` && typeof p.endRadian !== `undefined` && typeof p.clockwise !== `undefined`;
var isPositioned$2 = (p) => typeof p.x !== `undefined` && typeof p.y !== `undefined`;
function fromDegrees$1(radius, startDegrees, endDegrees, clockwise, origin) {
  const a = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees),
    clockwise
  };
  if (isPoint(origin)) {
    guard$1(origin);
    const ap = {
      ...a,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else return Object.freeze(a);
}
var toLine = (arc) => fromPoints$2(point(arc, arc.startRadian), point(arc, arc.endRadian));
var getStartEnd = (arc, origin) => {
  guard$5(arc);
  const start = point(arc, arc.startRadian, origin);
  const end = point(arc, arc.endRadian, origin);
  return [start, end];
};
var point = (arc, angleRadian$2, origin) => {
  if (typeof origin === `undefined`) origin = isPositioned$2(arc) ? arc : {
    x: 0,
    y: 0
  };
  return {
    x: Math.cos(angleRadian$2) * arc.radius + origin.x,
    y: Math.sin(angleRadian$2) * arc.radius + origin.y
  };
};
var guard$5 = (arc) => {
  if (typeof arc === `undefined`) throw new TypeError(`Arc is undefined`);
  if (isPositioned$2(arc)) guard$1(arc, `arc`);
  if (typeof arc.radius === `undefined`) throw new TypeError(`Arc radius is undefined (${JSON.stringify(arc)})`);
  if (typeof arc.radius !== `number`) throw new TypeError(`Radius must be a number`);
  if (Number.isNaN(arc.radius)) throw new TypeError(`Radius is NaN`);
  if (arc.radius <= 0) throw new TypeError(`Radius must be greater than zero`);
  if (typeof arc.startRadian === `undefined`) throw new TypeError(`Arc is missing 'startRadian' field`);
  if (typeof arc.endRadian === `undefined`) throw new TypeError(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc.endRadian)) throw new TypeError(`Arc endRadian is NaN`);
  if (Number.isNaN(arc.startRadian)) throw new TypeError(`Arc endRadian is NaN`);
  if (typeof arc.clockwise === `undefined`) throw new TypeError(`Arc is missing 'clockwise field`);
  if (arc.startRadian >= arc.endRadian) throw new TypeError(`startRadian is expected to be les than endRadian`);
};
var interpolate$4 = (amount, arc, allowOverflow, origin) => {
  guard$5(arc);
  const overflowOk = allowOverflow ?? false;
  if (!overflowOk) {
    if (amount < 0) throw new Error(`Param 'amount' is under zero, and overflow is not allowed`);
    if (amount > 1) throw new Error(`Param 'amount' is above 1 and overflow is not allowed`);
  }
  const span = angularSize(arc);
  const rel = span * amount;
  const angle = radiansSum(arc.startRadian, rel, arc.clockwise);
  return point(arc, angle, origin);
};
var angularSize = (arc) => radianArc(arc.startRadian, arc.endRadian, arc.clockwise);
var toPath$3 = (arc) => {
  guard$5(arc);
  return Object.freeze({
    ...arc,
    nearest: (_point) => {
      throw new Error(`not implemented`);
    },
    interpolate: (amount) => interpolate$4(amount, arc),
    bbox: () => bbox$5(arc),
    length: () => length$3(arc),
    toSvgString: () => toSvg$1(arc),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `arc`
  });
};
var fromCircle = (circle, startRadian, endRadian, clockwise = true) => {
  const a = Object.freeze({
    ...circle,
    endRadian,
    startRadian,
    clockwise
  });
  return a;
};
var fromCircleAmount = (circle, startRadian, sizeRadian, clockwise = true) => {
  const endRadian = radiansSum(startRadian, sizeRadian, clockwise);
  return fromCircle(circle, startRadian, endRadian);
};
var length$3 = (arc) => piPi2 * arc.radius * ((arc.startRadian - arc.endRadian) / piPi2);
var bbox$5 = (arc) => {
  if (isPositioned$2(arc)) {
    const middle = interpolate$4(0.5, arc);
    const asLine = toLine(arc);
    return bbox$1(middle, asLine.a, asLine.b);
  } else return {
    width: arc.radius * 2,
    height: arc.radius * 2
  };
};
var toSvg$1 = (a, b, c, d, e) => {
  if (isArc(a)) if (isPositioned$2(a)) if (isPoint(b)) return toSvgFull$1(b, a.radius, a.startRadian, a.endRadian, c);
  else return toSvgFull$1(a, a.radius, a.startRadian, a.endRadian, b);
  else return isPoint(b) ? toSvgFull$1(b, a.radius, a.startRadian, a.endRadian, c) : toSvgFull$1({
    x: 0,
    y: 0
  }, a.radius, a.startRadian, a.endRadian);
  else {
    if (c === void 0) throw new Error(`startAngle undefined`);
    if (d === void 0) throw new Error(`endAngle undefined`);
    if (isPoint(a)) if (typeof b === `number` && typeof c === `number` && typeof d === `number`) return toSvgFull$1(a, b, c, d, e);
    else throw new TypeError(`Expected (point, number, number, number). Missing a number param.`);
    else throw new Error(`Expected (point, number, number, number). Missing first point.`);
  }
};
var toSvgFull$1 = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`) opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start = toCartesian(radius, endRadian - 0.01, origin);
  const end = toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle) d.push(`z`);
  return d;
};
var distanceCenter$1 = (a, b) => distance2(a, b);
var isEqual$6 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (a.endRadian !== b.endRadian) return false;
  if (a.startRadian !== b.startRadian) return false;
  if (a.clockwise !== b.clockwise) return false;
  if (isPositioned$2(a) && isPositioned$2(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
  } else if (!isPositioned$2(a) && !isPositioned$2(b)) {
  } else return false;
  return true;
};
var isLine = (p) => {
  if (p === void 0) return false;
  if (p.a === void 0) return false;
  if (p.b === void 0) return false;
  if (!isPoint(p.a)) return false;
  if (!isPoint(p.b)) return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p)) return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var guard$3 = (line, name = `line`) => {
  if (line === void 0) throw new Error(`${name} undefined`);
  if (line.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`);
  if (line.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`);
};
var getPointParameter$1 = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard$1(a, `a`);
  guard$1(a, `b`);
  return [a, b];
};
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum$4 = aOrLine.reduce((accumulator, v) => length(v) + accumulator, 0);
    return sum$4;
  }
  if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
  const [a, b] = getPointParameter$1(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else return Math.hypot(x, y);
}
function reverse(line) {
  guard$3(line, `line`);
  return {
    a: line.b,
    b: line.a
  };
}
function interpolate$1(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow) resultThrow(percentTest(amount, `amount`));
  else resultThrow(numberTest(amount, ``, `amount`));
  const [a, b] = getPointParameter$1(aOrLine, pointBOrAllowOverflow);
  const d = length(a, b);
  const d2 = d * (1 - amount);
  if (d === 0 && d2 === 0) return Object.freeze({ ...b });
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({
    ...b,
    x,
    y
  });
}
function pointAtDistance(line, distance$2, fromA$2 = true) {
  if (!fromA$2) line = reverse(line);
  const dx = line.b.x - line.a.x;
  const dy = line.b.y - line.a.y;
  const theta = Math.atan2(dy, dx);
  const xp = distance$2 * Math.cos(theta);
  const yp = distance$2 * Math.sin(theta);
  return {
    x: xp + line.a.x,
    y: yp + line.a.y
  };
}
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0) throw new Error(`${name} is undefined`);
  if (Number.isNaN(d)) throw new Error(`${name} is NaN`);
  if (d < 0) throw new Error(`${name} cannot be negative`);
};
var guard$2 = (rect, name = `rect`) => {
  if (rect === void 0) throw new Error(`{$name} undefined`);
  if (isPositioned(rect)) guard$1(rect, name);
  guardDim(rect.width, name + `.width`);
  guardDim(rect.height, name + `.height`);
};
var getRectPositioned = (rect, origin) => {
  guard$2(rect);
  if (isPositioned(rect) && origin === void 0) return rect;
  if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
  return Object.freeze({
    ...rect,
    ...origin
  });
};
var guardPositioned = (rect, name = `rect`) => {
  if (!isPositioned(rect)) throw new Error(`Expected ${name} to have x,y`);
  guard$2(rect, name);
};
var isEmpty$3 = (rect) => rect.width === 0 && rect.height === 0;
var isPlaceholder$3 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
var isPositioned = (rect) => rect.x !== void 0 && rect.y !== void 0;
var isRect = (rect) => {
  if (rect === void 0) return false;
  if (rect.width === void 0) return false;
  if (rect.height === void 0) return false;
  return true;
};
var isRectPositioned = (rect) => isRect(rect) && isPositioned(rect);
var fromTopLeft = (origin, width, height$3) => {
  guardDim(width, `width`);
  guardDim(height$3, `height`);
  guard$1(origin, `origin`);
  return {
    x: origin.x,
    y: origin.y,
    width,
    height: height$3
  };
};
var isQuadraticBezier = (path) => path.quadratic !== void 0;
var isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;
var bezier_exports = {};
__export2(bezier_exports, {
  cubic: () => cubic,
  interpolator: () => interpolator,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath$2
});
var quadraticSimple = (start, end, bend = 0) => {
  if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
  if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
  const middle = interpolate$1(0.5, start, end);
  let target = middle;
  if (end.y < start.y) target = bend > 0 ? {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y)
  } : {
    x: Math.max(start.x, end.x),
    y: Math.max(start.y, end.y)
  };
  else target = bend > 0 ? {
    x: Math.max(start.x, end.x),
    y: Math.min(start.y, end.y)
  } : {
    x: Math.min(start.x, end.x),
    y: Math.max(start.y, end.y)
  };
  const handle = interpolate$1(Math.abs(bend), middle, target);
  return quadratic(start, end, handle);
};
var interpolator = (q) => {
  const bzr = isCubicBezier(q) ? new Bezier(q.a.x, q.a.y, q.cubic1.x, q.cubic1.y, q.cubic2.x, q.cubic2.y, q.b.x, q.b.y) : new Bezier(q.a, q.quadratic, q.b);
  return (amount) => bzr.compute(amount);
};
var quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath$2 = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) return cubicToPath(cubicOrQuadratic);
  else if (isQuadraticBezier(cubicOrQuadratic)) return quadratictoPath(cubicOrQuadratic);
  else throw new Error(`Unknown bezier type`);
};
var cubic = (start, end, cubic1, cubic2) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic$1) => {
  const { a, cubic1, cubic2, b } = cubic$1;
  const bzr = new Bezier(a, cubic1, cubic2, b);
  return Object.freeze({
    ...cubic$1,
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
      return fromTopLeft({
        x: x.min,
        y: y.min
      }, xSize, ySize);
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
  const { a, b, quadratic: quadratic$1 } = quadraticBezier;
  const bzr = new Bezier(a, quadratic$1, b);
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
      return fromTopLeft({
        x: x.min,
        y: y.min
      }, xSize, ySize);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic$1),
    kind: `bezier/quadratic`
  });
};
var guard$4 = (circle, parameterName = `circle`) => {
  if (isCirclePositioned(circle)) guard$1(circle, `circle`);
  if (Number.isNaN(circle.radius)) throw new Error(`${parameterName}.radius is NaN`);
  if (circle.radius <= 0) throw new Error(`${parameterName}.radius must be greater than zero`);
};
var guardPositioned$1 = (circle, parameterName = `circle`) => {
  if (!isCirclePositioned(circle)) throw new Error(`Expected a positioned circle with x,y`);
  guard$4(circle, parameterName);
};
var isNaN = (a) => {
  if (Number.isNaN(a.radius)) return true;
  if (isCirclePositioned(a)) {
    if (Number.isNaN(a.x)) return true;
    if (Number.isNaN(a.y)) return true;
  }
  return false;
};
var isPositioned$1 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned$1(p);
var area$5 = (circle) => {
  guard$4(circle);
  return Math.PI * circle.radius * circle.radius;
};
var fromCenter$2 = (origin, width, height$3) => {
  guard$1(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height$3, `height`);
  const halfW = width / 2;
  const halfH = height$3 / 2;
  return {
    x: origin.x - halfW,
    y: origin.y - halfH,
    width,
    height: height$3
  };
};
var bbox$4 = (circle) => {
  return isCirclePositioned(circle) ? fromCenter$2(circle, circle.radius * 2, circle.radius * 2) : {
    width: circle.radius * 2,
    height: circle.radius * 2,
    x: 0,
    y: 0
  };
};
var center = (circle) => {
  return isCirclePositioned(circle) ? Object.freeze({
    x: circle.x,
    y: circle.y
  }) : Object.freeze({
    x: circle.radius,
    y: circle.radius
  });
};
var distanceCenter = (a, b) => {
  guardPositioned$1(a, `a`);
  if (isCirclePositioned(b)) guardPositioned$1(b, `b`);
  return distance2(a, b);
};
var distanceFromExterior$1 = (a, b) => {
  guardPositioned$1(a, `a`);
  if (isCirclePositioned(b)) return Math.max(0, distanceCenter(a, b) - a.radius - b.radius);
  else if (isPoint(b)) {
    const distribution = distance2(a, b);
    if (distribution < a.radius) return 0;
    return distribution;
  } else throw new Error(`Second parameter invalid type`);
};
function* exteriorIntegerPoints(circle) {
  const { x, y, radius } = circle;
  let xx = radius;
  let yy = 0;
  let radiusError = 1 - x;
  while (xx >= yy) {
    yield {
      x: xx + x,
      y: yy + y
    };
    yield {
      x: yy + x,
      y: xx + y
    };
    yield {
      x: -xx + x,
      y: yy + y
    };
    yield {
      x: -yy + x,
      y: xx + y
    };
    yield {
      x: -xx + x,
      y: -yy + y
    };
    yield {
      x: -yy + x,
      y: -xx + y
    };
    yield {
      x: xx + x,
      y: -yy + y
    };
    yield {
      x: yy + x,
      y: -xx + y
    };
    yy++;
    if (radiusError < 0) radiusError += 2 * yy + 1;
    else {
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
  for (let x = xMin; x < xMax; x++) for (let y = yMin; y < yMax; y++) {
    const r = Math.abs(distance2(circle, x, y));
    if (r <= circle.radius) yield {
      x,
      y
    };
  }
}
var piPi$5 = Math.PI * 2;
var nearest$1 = (circle, point$1) => {
  const n = (a) => {
    const l = Math.sqrt(Math.pow(point$1.x - a.x, 2) + Math.pow(point$1.y - a.y, 2));
    const x = a.x + a.radius * ((point$1.x - a.x) / l);
    const y = a.y + a.radius * ((point$1.y - a.y) / l);
    return {
      x,
      y
    };
  };
  if (Array.isArray(circle)) {
    const pts = circle.map((l) => n(l));
    const dists = pts.map((p) => distance2(p, point$1));
    return Object.freeze(pts[minIndex(...dists)]);
  } else return Object.freeze(n(circle));
};
var pointOnPerimeter = (circle, angleRadian$2, origin) => {
  if (origin === void 0) origin = isCirclePositioned(circle) ? circle : {
    x: 0,
    y: 0
  };
  return {
    x: Math.cos(-angleRadian$2) * circle.radius + origin.x,
    y: Math.sin(-angleRadian$2) * circle.radius + origin.y
  };
};
var circumference = (circle) => {
  guard$4(circle);
  return piPi$5 * circle.radius;
};
var length$2 = (circle) => circumference(circle);
var piPi$4 = Math.PI * 2;
var interpolate$3 = (circle, t2) => pointOnPerimeter(circle, t2 * piPi$4);
var isEqual$5 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (isCirclePositioned(a) && isCirclePositioned(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
    return true;
  } else if (!isCirclePositioned(a) && !isCirclePositioned(b)) {
  } else return false;
  return false;
};
function sum$12(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard$1(ptA, `a`);
  guard$1(ptB, `b`);
  const pt = {
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) + (ptB.z ?? 0);
  return Object.freeze(pt);
}
var intersectionLine = (circle, line) => {
  const v1 = {
    x: line.b.x - line.a.x,
    y: line.b.y - line.a.y
  };
  const v2 = {
    x: line.a.x - circle.x,
    y: line.a.y - circle.y
  };
  const b = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
  if (Number.isNaN(d)) return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const returnValue = [];
  if (u1 <= 1 && u1 >= 0) returnValue.push({
    x: line.a.x + v1.x * u1,
    y: line.a.y + v1.y * u1
  });
  if (u2 <= 1 && u2 >= 0) returnValue.push({
    x: line.a.x + v1.x * u2,
    y: line.a.y + v1.y * u2
  });
  return returnValue;
};
var intersections = (a, b) => {
  const vector = subtract$2(b, a);
  const centerD = Math.hypot(vector.y, vector.x);
  if (centerD > a.radius + b.radius) return [];
  if (centerD < Math.abs(a.radius - b.radius)) return [];
  if (isEqual$5(a, b)) return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid$2 = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection2 = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [sum$12(centroid$2, intersection2), subtract$2(centroid$2, intersection2)];
};
var circleRect = (a, b) => {
  const deltaX = a.x - Math.max(b.x, Math.min(a.x, b.x + b.width));
  const deltaY = a.y - Math.max(b.y, Math.min(a.y, b.y + b.height));
  return deltaX * deltaX + deltaY * deltaY < a.radius * a.radius;
};
var circleCircle = (a, b) => intersections(a, b).length === 2;
var isContainedBy = (a, b, c) => {
  const d = distanceCenter(a, b);
  if (isCircle(b)) return d < Math.abs(a.radius - b.radius);
  else if (isPoint(b)) if (c === void 0) return d <= a.radius;
  else return d < Math.abs(a.radius - c);
  else throw new Error(`b parameter is expected to be CirclePositioned or Point`);
};
var isEqual2 = (...p) => {
  if (p === void 0) throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2) return true;
  for (let index = 1; index < p.length; index++) {
    if (p[index].x !== p[0].x) return false;
    if (p[index].y !== p[0].y) return false;
  }
  return true;
};
var isIntersecting = (a, b, c) => {
  if (isEqual2(a, b)) return true;
  if (isContainedBy(a, b, c)) return true;
  if (isCircle(b)) return circleCircle(a, b);
  else if (isRectPositioned(b)) return circleRect(a, b);
  else if (isPoint(b) && c !== void 0) return circleCircle(a, {
    ...b,
    radius: c
  });
  return false;
};
function multiply$2(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard$1(ptA, `a`);
  guard$1(ptB, `b`);
  const pt = {
    x: ptA.x * ptB.x,
    y: ptA.y * ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) * (ptB.z ?? 0);
  return Object.freeze(pt);
}
var multiplyScalar$1 = (pt, v) => {
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
function multiplyScalar$2(a, value2) {
  if (isCirclePositioned(a)) {
    const pt = multiplyScalar$1(a, value2);
    return Object.freeze({
      ...a,
      ...pt,
      radius: a.radius * value2
    });
  } else return Object.freeze({
    ...a,
    radius: a.radius * value2
  });
}
var piPi$3 = Math.PI * 2;
var randomPoint$1 = (within, opts = {}) => {
  const offset$1 = isCirclePositioned(within) ? within : {
    x: 0,
    y: 0
  };
  const strategy = opts.strategy ?? `uniform`;
  const margin = opts.margin ?? 0;
  const radius = within.radius - margin;
  const rand = opts.randomSource ?? Math.random;
  switch (strategy) {
    case `naive`:
      return sum$12(offset$1, toCartesian(rand() * radius, rand() * piPi$3));
    case `uniform`:
      return sum$12(offset$1, toCartesian(Math.sqrt(rand()) * radius, rand() * piPi$3));
    default:
      throw new Error(`Unknown strategy '${strategy}'. Expects 'uniform' or 'naive'`);
  }
};
var toSvg = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) return toSvgFull(a.radius, origin, sweep);
    if (isCirclePositioned(a)) return toSvgFull(a.radius, a, sweep);
    else throw new Error(`origin parameter needed for non-positioned circle`);
  } else if (origin === void 0) throw new Error(`origin parameter needed`);
  else return toSvgFull(a, origin, sweep);
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
var toPath$1 = (circle) => {
  guard$4(circle);
  return {
    ...circle,
    nearest: (point$1) => nearest$1(circle, point$1),
    interpolate: (t2) => interpolate$3(circle, t2),
    bbox: () => bbox$4(circle),
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
  const pt = getPointParameter(defaultPositionOrX, y);
  return Object.freeze({
    ...circle,
    ...pt
  });
};
var circle_exports = {};
__export2(circle_exports, {
  area: () => area$5,
  bbox: () => bbox$4,
  center: () => center,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter,
  distanceFromExterior: () => distanceFromExterior$1,
  exteriorIntegerPoints: () => exteriorIntegerPoints,
  guard: () => guard$4,
  guardPositioned: () => guardPositioned$1,
  interiorIntegerPoints: () => interiorIntegerPoints,
  interpolate: () => interpolate$3,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEqual: () => isEqual$5,
  isIntersecting: () => isIntersecting,
  isNaN: () => isNaN,
  isPositioned: () => isPositioned$1,
  length: () => length$2,
  multiplyScalar: () => multiplyScalar$2,
  nearest: () => nearest$1,
  pointOnPerimeter: () => pointOnPerimeter,
  randomPoint: () => randomPoint$1,
  toPath: () => toPath$1,
  toPositioned: () => toPositioned,
  toSvg: () => toSvg
});
var inside = (grid, cell) => {
  if (cell.x < 0 || cell.y < 0) return false;
  if (cell.x >= grid.cols || cell.y >= grid.rows) return false;
  return true;
};
var isCell = (cell) => {
  if (cell === void 0) return false;
  return `x` in cell && `y` in cell;
};
var guardCell = (cell, parameterName = `Param`, grid) => {
  if (cell === void 0) throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
  if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
  if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
  if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
  if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
  if (!Number.isInteger(cell.x)) throw new TypeError(parameterName + `.x is non-integer`);
  if (!Number.isInteger(cell.y)) throw new TypeError(parameterName + `.y is non-integer`);
  if (grid !== void 0 && !inside(grid, cell)) throw new Error(`${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid.cols}, ${grid.rows}`);
};
var guardGrid = (grid, parameterName = `Param`) => {
  if (grid === void 0) throw new Error(`${parameterName} is undefined. Expecting grid.`);
  if (!(`rows` in grid)) throw new Error(`${parameterName}.rows is undefined`);
  if (!(`cols` in grid)) throw new Error(`${parameterName}.cols is undefined`);
  if (!Number.isInteger(grid.rows)) throw new TypeError(`${parameterName}.rows is not an integer`);
  if (!Number.isInteger(grid.cols)) throw new TypeError(`${parameterName}.cols is not an integer`);
};
var applyBounds = function(grid, cell, wrap$4 = `undefined`) {
  guardGrid(grid, `grid`);
  guardCell(cell, `cell`);
  let x = cell.x;
  let y = cell.y;
  switch (wrap$4) {
    case `wrap`: {
      x = x % grid.cols;
      y = y % grid.rows;
      if (x < 0) x = grid.cols + x;
      else if (x >= grid.cols) x -= grid.cols;
      if (y < 0) y = grid.rows + y;
      else if (y >= grid.rows) y -= grid.rows;
      x = Math.abs(x);
      y = Math.abs(y);
      break;
    }
    case `stop`: {
      x = clampIndex(x, grid.cols);
      y = clampIndex(y, grid.rows);
      break;
    }
    case `undefined`: {
      if (x < 0 || y < 0) return;
      if (x >= grid.cols || y >= grid.rows) return;
      break;
    }
    case `unbounded`:
      break;
    default:
      throw new Error(`Unknown BoundsLogic '${wrap$4}'. Expected: wrap, stop, undefined or unbounded`);
  }
  return Object.freeze({
    x,
    y
  });
};
var array_1d_exports = {};
__export2(array_1d_exports, {
  access: () => access$1,
  createArray: () => createArray,
  createMutable: () => createMutable,
  set: () => set$1,
  setMutate: () => setMutate$1,
  wrap: () => wrap$3,
  wrapMutable: () => wrapMutable$1
});
var access$1 = (array4, cols) => {
  const grid = gridFromArrayDimensions(array4, cols);
  const fn = (cell, wrap$4 = `undefined`) => accessWithGrid$1(grid, array4, cell, wrap$4);
  return fn;
};
var accessWithGrid$1 = (grid, array4, cell, wrap$4) => {
  const index = indexFromCell(grid, cell, wrap$4);
  if (index === void 0) return void 0;
  return array4[index];
};
var setMutate$1 = (array4, cols) => {
  const grid = gridFromArrayDimensions(array4, cols);
  return (value2, cell, wrap$4 = `undefined`) => setMutateWithGrid$1(grid, array4, value2, cell, wrap$4);
};
var setMutateWithGrid$1 = (grid, array4, value2, cell, wrap$4) => {
  const index = indexFromCell(grid, cell, wrap$4);
  if (index === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid.cols} rows: ${grid.rows}`);
  array4[index] = value2;
  return array4;
};
var set$1 = (array4, cols) => {
  const grid = gridFromArrayDimensions(array4, cols);
  return (value2, cell, wrap$4) => setWithGrid$1(grid, array4, value2, cell, wrap$4);
};
var setWithGrid$1 = (grid, array4, value2, cell, wrap$4) => {
  const index = indexFromCell(grid, cell, wrap$4);
  if (index === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid.cols} rows: ${grid.rows}`);
  const copy = [...array4];
  copy[index] = value2;
  array4 = copy;
  return copy;
};
var gridFromArrayDimensions = (array4, cols) => {
  const grid = {
    cols,
    rows: Math.ceil(array4.length / cols)
  };
  return grid;
};
var wrapMutable$1 = (array4, cols) => {
  const grid = gridFromArrayDimensions(array4, cols);
  return {
    ...grid,
    get: access$1(array4, cols),
    set: setMutate$1(array4, cols),
    get array() {
      return array4;
    }
  };
};
var wrap$3 = (array4, cols) => {
  const grid = gridFromArrayDimensions(array4, cols);
  return {
    ...grid,
    get: (cell, boundsLogic = `undefined`) => accessWithGrid$1(grid, array4, cell, boundsLogic),
    set: (value2, cell, boundsLogic = `undefined`) => {
      array4 = setWithGrid$1(grid, array4, value2, cell, boundsLogic);
      return wrap$3(array4, cols);
    },
    get array() {
      return array4;
    }
  };
};
var createArray = (initialValue, rowsOrGrid, columns$1) => {
  const rows$1 = typeof rowsOrGrid === `number` ? rowsOrGrid : rowsOrGrid.rows;
  const cols = typeof rowsOrGrid === `object` ? rowsOrGrid.cols : columns$1;
  if (!cols) throw new Error(`Parameter 'columns' missing`);
  resultThrow(integerTest(rows$1, `aboveZero`, `rows`), integerTest(cols, `aboveZero`, `cols`));
  const t2 = [];
  const total2 = rows$1 * cols;
  for (let index = 0; index < total2; index++) t2[index] = initialValue;
  return t2;
};
var createMutable = (initialValue, rowsOrGrid, columns$1) => {
  const rows$1 = typeof rowsOrGrid === `number` ? rowsOrGrid : rowsOrGrid.rows;
  const cols = typeof rowsOrGrid === `object` ? rowsOrGrid.cols : columns$1;
  if (!cols) throw new Error(`Parameter 'columns' missing`);
  const array4 = createArray(initialValue, rows$1, cols);
  return wrapMutable$1(array4, cols);
};
var array_2d_exports = {};
__export2(array_2d_exports, {
  access: () => access,
  create: () => create$12,
  set: () => set2,
  setMutate: () => setMutate,
  wrap: () => wrap$2,
  wrapMutable: () => wrapMutable
});
var create$12 = (array4) => {
  let colLen = NaN;
  for (const row of array4) if (Number.isNaN(colLen)) colLen = row.length;
  else if (colLen !== row.length) throw new Error(`Array does not have uniform column length`);
  return {
    rows: array4.length,
    cols: colLen
  };
};
var setMutate = (array4) => {
  const grid = create$12(array4);
  return (value2, cell, wrap$4 = `undefined`) => setMutateWithGrid(grid, array4, value2, cell, wrap$4);
};
var setMutateWithGrid = (grid, array4, value2, cell, bounds) => {
  let boundCell = applyBounds(grid, cell, bounds);
  if (boundCell === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid.cols} rows: ${grid.rows}`);
  array4[boundCell.y][boundCell.x] = value2;
  return array4;
};
var access = (array4) => {
  const grid = create$12(array4);
  const fn = (cell, wrap$4 = `undefined`) => accessWithGrid(grid, array4, cell, wrap$4);
  return fn;
};
var accessWithGrid = (grid, array4, cell, wrap$4) => {
  let boundCell = applyBounds(grid, cell, wrap$4);
  if (boundCell === void 0) return void 0;
  return array4[boundCell.y][boundCell.x];
};
var wrapMutable = (array4) => {
  const grid = create$12(array4);
  return {
    ...grid,
    get: access(array4),
    set: setMutate(array4),
    get array() {
      return array4;
    }
  };
};
var set2 = (array4) => {
  const grid = create$12(array4);
  return (value2, cell, wrap$4) => setWithGrid(grid, array4, value2, cell, wrap$4);
};
var setWithGrid = (grid, array4, value2, cell, wrap$4) => {
  let boundCell = applyBounds(grid, cell, wrap$4);
  if (boundCell === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid.cols} rows: ${grid.rows}`);
  let copyWhole = [...array4];
  let copyRow = [...copyWhole[boundCell.y]];
  copyRow[boundCell.x] = value2;
  copyWhole[boundCell.y] = copyRow;
  array4 = copyWhole;
  return copyWhole;
};
var wrap$2 = (array4) => {
  const grid = create$12(array4);
  return {
    ...grid,
    get: (cell, boundsLogic = `undefined`) => accessWithGrid(grid, array4, cell, boundsLogic),
    set: (value2, cell, boundsLogic = `undefined`) => {
      array4 = setWithGrid(grid, array4, value2, cell, boundsLogic);
      return wrap$2(array4);
    },
    get array() {
      return array4;
    }
  };
};
function* values(grid, iter) {
  for (const d of iter) if (Array.isArray(d)) yield d.map((v) => grid.get(v, `undefined`));
  else yield grid.get(d, `undefined`);
}
function* cells(grid, start, wrap$4 = true) {
  if (!start) start = {
    x: 0,
    y: 0
  };
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  let { x, y } = start;
  let canMove = true;
  do {
    yield {
      x,
      y
    };
    x++;
    if (x === grid.cols) {
      y++;
      x = 0;
    }
    if (y === grid.rows) if (wrap$4) {
      y = 0;
      x = 0;
    } else canMove = false;
    if (x === start.x && y === start.y) canMove = false;
  } while (canMove);
}
function* cellValues(grid, start, wrap$4 = true) {
  yield* values(grid, cells(grid, start, wrap$4));
}
function* cellsAndValues(grid, start, wrap$4 = true) {
  for (const cell of cells(grid, start, wrap$4)) yield {
    cell,
    value: grid.get(cell)
  };
}
var as_exports = {};
__export2(as_exports, {
  columns: () => columns,
  rows: () => rows
});
var rows = function* (grid, start) {
  if (!start) start = {
    x: 0,
    y: 0
  };
  let row = start.y;
  let rowCells = [];
  for (const c of cells(grid, start)) if (c.y === row) rowCells.push(c);
  else {
    yield rowCells;
    rowCells = [c];
    row = c.y;
  }
  if (rowCells.length > 0) yield rowCells;
};
function* columns(grid, start) {
  if (!start) start = {
    x: 0,
    y: 0
  };
  for (let x = start.x; x < grid.cols; x++) {
    let colCells = [];
    for (let y = start.y; y < grid.rows; y++) colCells.push({
      x,
      y
    });
    yield colCells;
  }
}
var offset = function(grid, start, vector, bounds = `undefined`) {
  return applyBounds(grid, {
    x: start.x + vector.x,
    y: start.y + vector.y
  }, bounds);
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
var offsetCardinals = (grid, start, steps, bounds = `stop`) => {
  guardGrid(grid, `grid`);
  guardCell(start, `start`);
  resultThrow(integerTest(steps, `aboveZero`, `steps`));
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells$1 = directions.map((d, index) => offset(grid, start, vectors[index], bounds));
  return zipKeyValue(directions, cells$1);
};
var getVectorFromCardinal = (cardinal$1, multiplier = 1) => {
  let v;
  switch (cardinal$1) {
    case `n`: {
      v = {
        x: 0,
        y: -1 * multiplier
      };
      break;
    }
    case `ne`: {
      v = {
        x: 1 * multiplier,
        y: -1 * multiplier
      };
      break;
    }
    case `e`: {
      v = {
        x: 1 * multiplier,
        y: 0
      };
      break;
    }
    case `se`: {
      v = {
        x: 1 * multiplier,
        y: 1 * multiplier
      };
      break;
    }
    case `s`: {
      v = {
        x: 0,
        y: 1 * multiplier
      };
      break;
    }
    case `sw`: {
      v = {
        x: -1 * multiplier,
        y: 1 * multiplier
      };
      break;
    }
    case `w`: {
      v = {
        x: -1 * multiplier,
        y: 0
      };
      break;
    }
    case `nw`: {
      v = {
        x: -1 * multiplier,
        y: -1 * multiplier
      };
      break;
    }
    default:
      v = {
        x: 0,
        y: 0
      };
  }
  return Object.freeze(v);
};
var enumerators_exports = {};
__export2(enumerators_exports, {
  cellValues: () => cellValues,
  cells: () => cells,
  cellsAndValues: () => cellsAndValues
});
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
  const cells$1 = [];
  while (true) {
    cells$1.push(Object.freeze({
      x: startX,
      y: startY
    }));
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
  return cells$1;
};
var simpleLine = function(start, end, endInclusive = false) {
  const cells$1 = [];
  if (start.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start.y; y < lastY; y++) cells$1.push({
      x: start.x,
      y
    });
  } else if (start.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start.x; x < lastX; x++) cells$1.push({
      x,
      y: start.y
    });
  } else throw new Error(`Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`);
  return cells$1;
};
var indexFromCell = (grid, cell, wrap$4) => {
  guardGrid(grid, `grid`);
  if (cell.x < 0) switch (wrap$4) {
    case `stop`: {
      cell = {
        ...cell,
        x: 0
      };
      break;
    }
    case `unbounded`:
      throw new Error(`unbounded not supported`);
    case `undefined`:
      return void 0;
    case `wrap`: {
      cell = offset(grid, {
        x: 0,
        y: cell.y
      }, {
        x: cell.x,
        y: 0
      }, `wrap`);
      break;
    }
  }
  if (cell.y < 0) switch (wrap$4) {
    case `stop`: {
      cell = {
        ...cell,
        y: 0
      };
      break;
    }
    case `unbounded`:
      throw new Error(`unbounded not supported`);
    case `undefined`:
      return void 0;
    case `wrap`: {
      cell = {
        ...cell,
        y: grid.rows + cell.y
      };
      break;
    }
  }
  if (cell.x >= grid.cols) switch (wrap$4) {
    case `stop`: {
      cell = {
        ...cell,
        x: grid.cols - 1
      };
      break;
    }
    case `unbounded`:
      throw new Error(`unbounded not supported`);
    case `undefined`:
      return void 0;
    case `wrap`: {
      cell = {
        ...cell,
        x: cell.x % grid.cols
      };
      break;
    }
  }
  if (cell.y >= grid.rows) switch (wrap$4) {
    case `stop`: {
      cell = {
        ...cell,
        y: grid.rows - 1
      };
      break;
    }
    case `unbounded`:
      throw new Error(`unbounded not supported`);
    case `undefined`:
      return void 0;
    case `wrap`: {
      cell = {
        ...cell,
        y: cell.y % grid.rows
      };
      break;
    }
  }
  const index = cell.y * grid.cols + cell.x;
  return index;
};
var cellFromIndex = (colsOrGrid, index) => {
  let cols = 0;
  cols = typeof colsOrGrid === `number` ? colsOrGrid : colsOrGrid.cols;
  resultThrow(integerTest(cols, `aboveZero`, `colsOrGrid`));
  return {
    x: index % cols,
    y: Math.floor(index / cols)
  };
};
var isEqual$4 = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  if (`rows` in a && `cols` in a) if (`rows` in b && `cols` in b) {
    if (a.rows !== b.rows || a.cols !== b.cols) return false;
  } else return false;
  if (`size` in a) if (`size` in b) {
    if (a.size !== b.size) return false;
  } else return false;
  return true;
};
var cellEquals = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  return a.x === b.x && a.y === b.y;
};
var randomNeighbour = (nbos) => randomElement2(nbos);
var isNeighbour = (n) => {
  if (n === void 0) return false;
  if (n[1] === void 0) return false;
  return true;
};
var neighbourList = (grid, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid, cell, bounds, directions);
  const entries2 = Object.entries(cellNeighbours);
  return entries2.filter((n) => isNeighbour(n));
};
var neighbours = (grid, cell, bounds = `undefined`, directions) => {
  const directories = directions ?? allDirections;
  const points = directories.map((c) => offset(grid, cell, getVectorFromCardinal(c), bounds));
  return zipKeyValue(directories, points);
};
var toArray2d = (grid, initialValue) => {
  const returnValue = [];
  for (let row = 0; row < grid.rows; row++) {
    returnValue[row] = Array.from({ length: grid.cols });
    if (initialValue) for (let col = 0; col < grid.cols; col++) returnValue[row][col] = initialValue;
  }
  return returnValue;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
function* asRectangles(grid) {
  for (const c of cells(grid)) yield rectangleForCell(grid, c);
}
var cellAtPoint = (grid, position) => {
  const size = grid.size;
  resultThrow(numberTest(size, `positive`, `grid.size`));
  if (position.x < 0 || position.y < 0) return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid.cols) return;
  if (y >= grid.rows) return;
  return {
    x,
    y
  };
};
var rectangleForCell = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = fromTopLeft({
    x,
    y
  }, size, size);
  return r;
};
var cellMiddle = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({
    x: x + size / 2,
    y: y + size / 2
  });
};
var breadthLogic = () => {
  return { select: (nbos) => nbos[0] };
};
var neighboursLogic = () => {
  return {
    select: (neighbours$1) => {
      return neighbours$1.at(0);
    },
    getNeighbours: (grid, cell) => {
      return neighbourList(grid, cell, allDirections, `undefined`);
    }
  };
};
var columnLogic = (opts = {}) => {
  const reversed = opts.reversed ?? false;
  return {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
    getNeighbours: (grid, cell) => {
      if (reversed) if (cell.y > 0) cell = {
        x: cell.x,
        y: cell.y - 1
      };
      else if (cell.x === 0) cell = {
        x: grid.cols - 1,
        y: grid.rows - 1
      };
      else cell = {
        x: cell.x - 1,
        y: grid.rows - 1
      };
      else if (cell.y < grid.rows - 1) cell = {
        x: cell.x,
        y: cell.y + 1
      };
      else if (cell.x < grid.cols - 1) cell = {
        x: cell.x + 1,
        y: 0
      };
      else cell = {
        x: 0,
        y: 0
      };
      return [[reversed ? `n` : `s`, cell]];
    }
  };
};
var depthLogic = () => {
  return { select: (nbos) => nbos.at(-1) };
};
var randomLogic = () => {
  return {
    getNeighbours: (grid, cell) => {
      const t2 = [];
      for (const c of cells(grid, cell)) t2.push([`n`, c]);
      return t2;
    },
    select: randomNeighbour
  };
};
var randomContiguousLogic = () => {
  return { select: randomNeighbour };
};
var rowLogic = (opts = {}) => {
  const reversed = opts.reversed ?? false;
  return {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`)),
    getNeighbours: (grid, cell) => {
      if (reversed) if (cell.x > 0) cell = {
        x: cell.x - 1,
        y: cell.y
      };
      else if (cell.y > 0) cell = {
        x: grid.cols - 1,
        y: cell.y - 1
      };
      else cell = {
        x: grid.cols - 1,
        y: grid.rows - 1
      };
      else if (cell.x < grid.rows - 1) cell = {
        x: cell.x + 1,
        y: cell.y
      };
      else if (cell.y < grid.rows - 1) cell = {
        x: 0,
        y: cell.y + 1
      };
      else cell = {
        x: 0,
        y: 0
      };
      return [[reversed ? `w` : `e`, cell]];
    }
  };
};
function* visitByNeighbours(logic, grid, opts = {}) {
  guardGrid(grid, `grid`);
  const start = opts.start ?? {
    x: 0,
    y: 0
  };
  guardCell(start, `opts.start`, grid);
  const v = opts.visited ?? mutable$2(cellKeyString);
  const possibleNeighbours = logic.getNeighbours ?? ((g, c) => neighbourList(g, c, crossDirections, `undefined`));
  let cellQueue = [start];
  let moveQueue = [];
  let current = void 0;
  while (cellQueue.length > 0) {
    if (current === void 0) {
      const nv = cellQueue.pop();
      if (nv === void 0) break;
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid, current).filter((step) => {
        if (step[1] === void 0) return false;
        return !v.has(step[1]);
      });
      if (nextSteps.length === 0) {
        if (current !== void 0) cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
      } else for (const n of nextSteps) {
        if (n === void 0) continue;
        if (n[1] === void 0) continue;
        moveQueue.push(n);
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) current = void 0;
    else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
}
var stepper = (grid, createVisitor, start = {
  x: 0,
  y: 0
}, resolution = 1) => {
  guardGrid(grid, `grid`);
  guardCell(start, `start`);
  resultThrow(integerTest(resolution, ``, `resolution`));
  const steps = [];
  let count3 = 0;
  let position = 0;
  for (const c of createVisitor(grid, {
    start,
    boundsWrap: `undefined`
  })) {
    count3++;
    if (count3 % resolution !== 0) continue;
    steps.push(c);
  }
  return (step, fromStart = false) => {
    resultThrow(integerTest(step, ``, `step`));
    if (fromStart) position = step;
    else position += step;
    return steps.at(position % steps.length);
  };
};
var visitors_exports = {};
__export2(visitors_exports, {
  breadthLogic: () => breadthLogic,
  columnLogic: () => columnLogic,
  create: () => create2,
  depthLogic: () => depthLogic,
  neighboursLogic: () => neighboursLogic,
  randomContiguousLogic: () => randomContiguousLogic,
  randomLogic: () => randomLogic,
  rowLogic: () => rowLogic,
  stepper: () => stepper,
  visitByNeighbours: () => visitByNeighbours,
  withLogic: () => withLogic
});
var create2 = (type, opts = {}) => {
  switch (type) {
    case `random-contiguous`:
      return withLogic(randomContiguousLogic(), opts);
    case `random`:
      return withLogic(randomLogic(), opts);
    case `depth`:
      return withLogic(depthLogic(), opts);
    case `breadth`:
      return withLogic(breadthLogic(), opts);
    case `neighbours`:
      return withLogic(neighboursLogic(), opts);
    case `row`:
      return withLogic(rowLogic(opts), opts);
    case `column`:
      return withLogic(columnLogic(opts), opts);
    default:
      throw new TypeError(`Param 'type' unknown. Value: ${type}`);
  }
};
var withLogic = (logic, options = {}) => {
  return (grid, optionsOverride = {}) => {
    return visitByNeighbours(logic, grid, {
      ...options,
      ...optionsOverride
    });
  };
};
var grid_exports = {};
__export2(grid_exports, {
  Array1d: () => array_1d_exports,
  Array2d: () => array_2d_exports,
  As: () => as_exports,
  By: () => enumerators_exports,
  Visit: () => visitors_exports,
  allDirections: () => allDirections,
  applyBounds: () => applyBounds,
  asRectangles: () => asRectangles,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellFromIndex: () => cellFromIndex,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  guardGrid: () => guardGrid,
  indexFromCell: () => indexFromCell,
  inside: () => inside,
  isCell: () => isCell,
  isEqual: () => isEqual$4,
  neighbourList: () => neighbourList,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  randomNeighbour: () => randomNeighbour,
  rectangleForCell: () => rectangleForCell,
  simpleLine: () => simpleLine,
  toArray2d: () => toArray2d,
  values: () => values
});
function normaliseByRect(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) resultThrow(numberTest(b, `positive`, `width`), numberTest(c, `positive`, `height`));
    else {
      if (!isRect(b)) throw new Error(`Expected second parameter to be a rect`);
      c = b.height;
      b = b.width;
    }
    return Object.freeze({
      x: a.x / b,
      y: a.y / c
    });
  } else {
    resultThrow(numberTest(a, `positive`, `x`));
    if (typeof b !== `number`) throw new TypeError(`Expecting second parameter to be a number (width)`);
    if (typeof c !== `number`) throw new TypeError(`Expecting third parameter to be a number (height)`);
    resultThrow(numberTest(b, `positive`, `y`));
    resultThrow(numberTest(c, `positive`, `width`));
    if (d === void 0) throw new Error(`Expected height parameter`);
    resultThrow(numberTest(d, `positive`, `height`));
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
var nearest = (line, point$1) => {
  const n = (line$1) => {
    const { a, b } = line$1;
    const atob = {
      x: b.x - a.x,
      y: b.y - a.y
    };
    const atop = {
      x: point$1.x - a.x,
      y: point$1.y - a.y
    };
    const length$4 = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    const t2 = Math.min(1, Math.max(0, dot / length$4));
    dot = (b.x - a.x) * (point$1.y - a.y) - (b.y - a.y) * (point$1.x - a.x);
    return {
      x: a.x + atob.x * t2,
      y: a.y + atob.y * t2
    };
  };
  if (Array.isArray(line)) {
    const pts = line.map((l) => n(l));
    const dists = pts.map((p) => distance2(p, point$1));
    return Object.freeze(pts[minIndex(...dists)]);
  } else return Object.freeze(n(line));
};
var distanceSingleLine = (line, point$1) => {
  guard$3(line, `line`);
  guard$1(point$1, `point`);
  if (length(line) === 0) return length(line.a, point$1);
  const near = nearest(line, point$1);
  return length(near, point$1);
};
var directionVector = (line) => ({
  x: line.b.x - line.a.x,
  y: line.b.y - line.a.y
});
var directionVectorNormalised = (line) => {
  const l = length(line);
  const v = directionVector(line);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var parallel = (line, distance$2) => {
  const dv = directionVector(line);
  const dvn = directionVectorNormalised(line);
  const a = {
    x: line.a.x - dvn.y * distance$2,
    y: line.a.y + dvn.x * distance$2
  };
  return {
    a,
    b: {
      x: a.x + dv.x,
      y: a.y + dv.y
    }
  };
};
var perpendicularPoint = (line, distance$2, amount = 0) => {
  const origin = interpolate$1(amount, line);
  const dvn = directionVectorNormalised(line);
  return {
    x: origin.x - dvn.y * distance$2,
    y: origin.y + dvn.x * distance$2
  };
};
var bbox$3 = (line) => bbox$1(line.a, line.b);
function divide$2(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard$1(ptA, `a`);
  guard$1(ptB, `b`);
  if (ptB.x === 0) throw new TypeError("Cannot divide by zero (b.x is 0)");
  if (ptB.y === 0) throw new TypeError("Cannot divide by zero (b.y is 0)");
  const pt = {
    x: ptA.x / ptB.x,
    y: ptA.y / ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) {
    if (ptB.z === 0) throw new TypeError("Cannot divide by zero (b.z is 0)");
    pt.z = (ptA.z ?? 0) / (ptB.z ?? 0);
  }
  return Object.freeze(pt);
}
function divider(a, b, c) {
  const divisor = getPointParameter(a, b, c);
  guardNonZeroPoint(divisor, `divisor`);
  return (aa, bb, cc) => {
    const dividend = getPointParameter(aa, bb, cc);
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
var divide$1 = (line, point$1) => Object.freeze({
  ...line,
  a: divide$2(line.a, point$1),
  b: divide$2(line.b, point$1)
});
var fromNumbers$2 = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
  const a = {
    x: x1,
    y: y1
  };
  const b = {
    x: x2,
    y: y2
  };
  return fromPoints$2(a, b);
};
var fromFlatArray$1 = (array4) => {
  if (!Array.isArray(array4)) throw new Error(`arr parameter is not an array`);
  if (array4.length !== 4) throw new Error(`array is expected to have length four`);
  return fromNumbers$2(array4[0], array4[1], array4[2], array4[3]);
};
var fromPivot = (origin = {
  x: 0.5,
  y: 0.5
}, length$4 = 1, angleRadian$2 = 0, balance = 0.5) => {
  const left = length$4 * balance;
  const right = length$4 * (1 - balance);
  const a = toCartesian(left, radianInvert(angleRadian$2), origin);
  const b = toCartesian(right, angleRadian$2, origin);
  return Object.freeze({
    a,
    b
  });
};
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointParameter$1(aOrLine, pointB);
  return interpolate$1(0.5, a, b);
};
var relativePosition$1 = (line, pt) => {
  const fromStart = distance2(line.a, pt);
  const total2 = length(line);
  return fromStart / total2;
};
var sum$2 = (line, point$1) => Object.freeze({
  ...line,
  a: sum$12(line.a, point$1),
  b: sum$12(line.b, point$1)
});
function abs2(pt) {
  if (isPoint3d(pt)) return Object.freeze({
    ...pt,
    x: Math.abs(pt.x),
    y: Math.abs(pt.y),
    z: Math.abs(pt.z)
  });
  else if (isPoint(pt)) return Object.freeze({
    ...pt,
    x: Math.abs(pt.x),
    y: Math.abs(pt.y)
  });
  else throw new TypeError(`Param 'pt' is not a point`);
}
function apply$2(pt, fn) {
  guard$1(pt, `pt`);
  if (isPoint3d(pt)) return Object.freeze({
    ...pt,
    x: fn(pt.x, `x`),
    y: fn(pt.y, `y`),
    z: fn(pt.z, `z`)
  });
  return Object.freeze({
    ...pt,
    x: fn(pt.x, `x`),
    y: fn(pt.y, `y`)
  });
}
function averager(kind, opts = {}) {
  let x;
  let y;
  let z;
  switch (kind) {
    case `moving-average-light`: {
      const scaling = opts.scaling ?? 3;
      x = movingAverageLight(scaling);
      y = movingAverageLight(scaling);
      z = movingAverageLight(scaling);
      break;
    }
    default:
      throw new Error(`Unknown averaging kind '${kind}'. Expected: 'moving-average-light'`);
  }
  return (point$1) => {
    const ax = x(point$1.x);
    const ay = y(point$1.y);
    if (isPoint3d(point$1)) {
      const az = z(point$1.z);
      return Object.freeze({
        x: ax,
        y: ay,
        z: az
      });
    } else return Object.freeze({
      x: ax,
      y: ay
    });
  };
}
var centroid$1 = (...points) => {
  if (!Array.isArray(points)) throw new Error(`Expected list of points`);
  const sum$4 = points.reduce((previous, p) => {
    if (p === void 0) return previous;
    if (Array.isArray(p)) throw new TypeError(`'points' list contains an array. Did you mean: centroid(...myPoints)?`);
    if (!isPoint(p)) throw new Error(`'points' contains something which is not a point: ${JSON.stringify(p)}`);
    return {
      x: previous.x + p.x,
      y: previous.y + p.y
    };
  }, {
    x: 0,
    y: 0
  });
  return Object.freeze({
    x: sum$4.x / points.length,
    y: sum$4.y / points.length
  });
};
function clamp$12(a, min4 = 0, max4 = 1) {
  if (isPoint3d(a)) return Object.freeze({
    x: clamp(a.x, min4, max4),
    y: clamp(a.y, min4, max4),
    z: clamp(a.z, min4, max4)
  });
  else return Object.freeze({
    x: clamp(a.x, min4, max4),
    y: clamp(a.y, min4, max4)
  });
}
var compare2 = (a, b) => {
  if (a.x < b.x && a.y < b.y) return -2;
  if (a.x > b.x && a.y > b.y) return 2;
  if (a.x < b.x || a.y < b.y) return -1;
  if (a.x > b.x || a.y > b.y) return 1;
  if (a.x === b.x && a.x === b.y) return 0;
  return NaN;
};
var compareByX = (a, b) => {
  if (a.x === b.x) return 0;
  if (a.x < b.x) return -1;
  return 1;
};
var compareByY = (a, b) => {
  if (a.y === b.y) return 0;
  if (a.y < b.y) return -1;
  return 1;
};
var compareByZ = (a, b) => {
  if (a.z === b.z) return 0;
  if (a.z < b.z) return -1;
  return 1;
};
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1) return sorted;
  const x = (points) => {
    const v = [];
    for (const p of points) {
      while (v.length >= 2) {
        const q = v.at(-1);
        const r = v.at(-2);
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) v.pop();
        else break;
      }
      v.push(p);
    }
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual2(lower[0], upper[0])) return upper;
  return [...upper, ...lower];
};
function intersectsPoint(rect, a, b) {
  guard$2(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0) throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
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
var isIntersecting$1 = (a, b) => {
  if (!isRectPositioned(a)) throw new Error(`a parameter should be RectPositioned`);
  if (isCirclePositioned(b)) return circleRect(b, a);
  else if (isPoint(b)) return intersectsPoint(a, b);
  throw new Error(`Unknown shape for b: ${JSON.stringify(b)}`);
};
var center$1 = (rect, origin) => {
  guard$2(rect);
  if (origin === void 0 && isPoint(rect)) origin = rect;
  else if (origin === void 0) origin = {
    x: 0,
    y: 0
  };
  const r = getRectPositioned(rect, origin);
  return Object.freeze({
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  });
};
var distanceFromExterior = (rect, pt) => {
  guardPositioned(rect, `rect`);
  guard$1(pt, `pt`);
  if (intersectsPoint(rect, pt)) return 0;
  const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
  const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
  return Math.hypot(dx, dy);
};
var distanceFromCenter = (rect, pt) => distance2(center$1(rect), pt);
var distanceToCenter = (a, shape) => {
  if (isRectPositioned(shape)) return distanceFromExterior(shape, a);
  if (isCirclePositioned(shape)) return distanceFromExterior$1(shape, a);
  if (isPoint(shape)) return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var distanceToExterior = (a, shape) => {
  if (isRectPositioned(shape)) return distanceFromExterior(shape, a);
  if (isCirclePositioned(shape)) return distanceFromExterior$1(shape, a);
  if (isPoint(shape)) return distance2(a, shape);
  throw new Error(`Unknown shape`);
};
var toArray$12 = (p) => [p.x, p.y];
var dotProduct$1 = (...pts) => {
  const a = pts.map((p) => toArray$12(p));
  return dotProduct(a);
};
function from(xOrArray, y, z) {
  if (Array.isArray(xOrArray)) if (xOrArray.length === 3) return Object.freeze({
    x: xOrArray[0],
    y: xOrArray[1],
    z: xOrArray[2]
  });
  else if (xOrArray.length === 2) return Object.freeze({
    x: xOrArray[0],
    y: xOrArray[1]
  });
  else throw new Error(`Expected array of length two or three, got ${xOrArray.length}`);
  else {
    if (xOrArray === void 0) throw new Error(`Requires an array of [x,y] or x,y parameters at least`);
    else if (Number.isNaN(xOrArray)) throw new Error(`x is NaN`);
    if (y === void 0) throw new Error(`Param 'y' is missing`);
    else if (Number.isNaN(y)) throw new Error(`y is NaN`);
    if (z === void 0) return Object.freeze({
      x: xOrArray,
      y
    });
    else return Object.freeze({
      x: xOrArray,
      y,
      z
    });
  }
}
var fromString = (string_) => {
  if (typeof string_ !== `string`) throw new TypeError(`Param 'str' ought to be a string. Got: ${typeof string_}`);
  const comma = string_.indexOf(`,`);
  const x = Number.parseFloat(string_.substring(0, comma));
  const nextComma = string_.indexOf(",", comma + 1);
  if (nextComma > 0) {
    const y = Number.parseFloat(string_.substring(comma + 1, nextComma - comma + 2));
    const z = Number.parseFloat(string_.substring(nextComma + 1));
    return {
      x,
      y,
      z
    };
  } else {
    const y = Number.parseFloat(string_.substring(comma + 1));
    return {
      x,
      y
    };
  }
};
var fromNumbers = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) for (const coord of coords) {
    if (!(coord.length % 2 === 0)) throw new Error(`coords array should be even-numbered`);
    pts.push(Object.freeze({
      x: coord[0],
      y: coord[1]
    }));
  }
  else {
    if (coords.length % 2 !== 0) throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    for (let index = 0; index < coords.length; index += 2) pts.push(Object.freeze({
      x: coords[index],
      y: coords[index + 1]
    }));
  }
  return pts;
};
var interpolate$2 = (amount, a, b, allowOverflow = false) => interpolate$1(amount, a, b, allowOverflow);
var invert = (pt, what = `both`) => {
  switch (what) {
    case `both`:
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
    case `x`:
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    case `y`:
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    case `z`:
      if (isPoint3d(pt)) return Object.freeze({
        ...pt,
        z: pt.z * -1
      });
      else throw new Error(`pt parameter is missing z`);
    default:
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
  }
};
var clampMagnitude = (pt, max4 = 1, min4 = 0) => {
  const length$4 = distance2(pt);
  let ratio = 1;
  if (length$4 > max4) ratio = max4 / length$4;
  else if (length$4 < min4) ratio = min4 / length$4;
  return ratio === 1 ? pt : multiply$2(pt, ratio, ratio);
};
var leftmost = (...points) => findMinimum((a, b) => a.x <= b.x ? a : b, ...points);
var rightmost = (...points) => findMinimum((a, b) => a.x >= b.x ? a : b, ...points);
var length$1 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0) throw new Error(`Expected y`);
  return Math.hypot(ptOrX, y);
};
var normalise = (ptOrX, y) => {
  const pt = getPointParameter(ptOrX, y);
  const l = length$1(pt);
  if (l === 0) return Empty;
  return Object.freeze({
    ...pt,
    x: pt.x / l,
    y: pt.y / l
  });
};
var pipelineApply = (point$1, ...pipelineFns) => pipeline(...pipelineFns)(point$1);
var pipeline = (...pipeline$1) => (pt) => pipeline$1.reduce((previous, current) => current(previous), pt);
var vector_exports = {};
__export2(vector_exports, {
  clampMagnitude: () => clampMagnitude$1,
  divide: () => divide$3,
  dotProduct: () => dotProduct$2,
  fromLineCartesian: () => fromLineCartesian,
  fromLinePolar: () => fromLinePolar,
  fromPointPolar: () => fromPointPolar,
  fromRadians: () => fromRadians,
  multiply: () => multiply$3,
  normalise: () => normalise$1,
  quadrantOffsetAngle: () => quadrantOffsetAngle,
  subtract: () => subtract$3,
  sum: () => sum$3,
  toCartesian: () => toCartesian$1,
  toPolar: () => toPolar,
  toRadians: () => toRadians,
  toString: () => toString$3
});
var EmptyCartesian = Object.freeze({
  x: 0,
  y: 0
});
var piPi$2 = Math.PI * 2;
var pi$12 = Math.PI;
var fromRadians = (radians) => {
  return Object.freeze({
    x: Math.cos(radians),
    y: Math.sin(radians)
  });
};
var toRadians = (point$1) => {
  return Math.atan2(point$1.y, point$1.x);
};
var fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian) => {
  pt = subtract$2(pt, origin);
  let direction = Math.atan2(pt.y, pt.x);
  if (angleNormalisation === `unipolar` && direction < 0) direction += piPi$2;
  else if (angleNormalisation === `bipolar`) {
    if (direction > pi$12) direction -= piPi$2;
    else if (direction <= -pi$12) direction += piPi$2;
  }
  return Object.freeze({
    distance: distance2(pt),
    angleRadian: direction
  });
};
var fromLineCartesian = (line) => subtract$2(line.b, line.a);
var fromLinePolar = (line) => {
  guard$3(line, `line`);
  const pt = subtract$2(line.b, line.a);
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
var normalise$1 = (v) => {
  if (isPolar(v)) return normalise$2(v);
  else if (isCartesian(v)) return normalise(v);
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var quadrantOffsetAngle = (p) => {
  if (p.x >= 0 && p.y >= 0) return 0;
  if (p.x < 0 && p.y >= 0) return pi$12;
  if (p.x < 0 && p.y < 0) return pi$12;
  return piPi$2;
};
var toPolar = (v, origin = Empty) => {
  if (isPolar(v)) return v;
  else if (isCartesian(v)) return fromCartesian(v, origin);
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toCartesian$1 = (v) => {
  if (isPolar(v)) return toPoint(v);
  else if (isCartesian(v)) return v;
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toString$3 = (v, digits) => {
  if (isPolar(v)) return toString$5(v, digits);
  else if (isCartesian(v)) return toString$2(v, digits);
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var dotProduct$2 = (a, b) => {
  if (isPolar(a) && isPolar(b)) return dotProduct$3(a, b);
  else if (isCartesian(a) && isCartesian(b)) return dotProduct$1(a, b);
  throw new Error(`Expected two polar/Cartesian vectors.`);
};
var clampMagnitude$1 = (v, max4 = 1, min4 = 0) => {
  if (isPolar(v)) return clampMagnitude$2(v, max4, min4);
  else if (isCartesian(v)) return clampMagnitude(v, max4, min4);
  throw new Error(`Expected either polar or Cartesian vector`);
};
var sum$3 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian$1(a);
  b = toCartesian$1(b);
  const c = sum$12(a, b);
  return polar ? toPolar(c) : c;
};
var subtract$3 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian$1(a);
  b = toCartesian$1(b);
  const c = subtract$2(a, b);
  return polar ? toPolar(c) : c;
};
var multiply$3 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian$1(a);
  b = toCartesian$1(b);
  const c = multiply$2(a, b);
  return polar ? toPolar(c) : c;
};
var divide$3 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian$1(a);
  b = toCartesian$1(b);
  const c = divide$2(a, b);
  return polar ? toPolar(c) : c;
};
var joinPointsToLines = (...points) => {
  const lines = [];
  let start = points[0];
  for (let index = 1; index < points.length; index++) {
    lines.push(fromPoints$2(start, points[index]));
    start = points[index];
  }
  return lines;
};
var relation = (a, b) => {
  const start = getPointParameter(a, b);
  let totalX = 0;
  let totalY = 0;
  let count3 = 0;
  let lastUpdate = performance.now();
  let lastPoint = start;
  const update = (aa, bb) => {
    const p = getPointParameter(aa, bb);
    totalX += p.x;
    totalY += p.y;
    count3++;
    const distanceFromStart = distance2(p, start);
    const distanceFromLast = distance2(p, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p;
    return Object.freeze({
      angle: angleRadian(p, start),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid$1(p, start),
      average: {
        x: totalX / count3,
        y: totalY / count3
      }
    });
  };
  return update;
};
var PointTracker = class extends ObjectTracker {
  initialRelation;
  markRelation;
  lastResult;
  constructor(opts = {}) {
    super(opts);
  }
  /**
  * Notification that buffer has been knocked down to `sampleLimit`.
  * 
  * This will reset the `initialRelation`, which will use the new oldest value.
  */
  onTrimmed(_reason) {
    this.initialRelation = void 0;
  }
  /**
  * @ignore
  */
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
    this.markRelation = void 0;
  }
  /**
  * Makes a 'mark' in the tracker, allowing you to compare values
  * to this point.
  */
  mark() {
    this.markRelation = relation(this.last);
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
    if (this.initialRelation === void 0 && this.initial) this.initialRelation = relation(this.initial);
    else if (this.initialRelation === void 0) throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
    const initialRel = this.initialRelation(currentLast);
    const markRel = this.markRelation !== void 0 ? this.markRelation(currentLast) : void 0;
    const speed = previousLast === void 0 ? 0 : length(previousLast, currentLast) / (currentLast.at - previousLast.at);
    const lastRel = {
      ...lastRelation(currentLast),
      speed
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      fromMark: markRel,
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
    return fromLinePolar(this.lineStartEnd);
  }
  /**
  * Returns a vector of the initial/last points of the tracker.
  * Returns as a Cartesian coordinate
  */
  get vectorCartesian() {
    return fromLineCartesian(this.lineStartEnd);
  }
  /**
  * Returns a line from initial point to last point.
  *
  * If there are less than two points, Lines.Empty is returned
  */
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial) return Empty$3;
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
  * not the accumulated length. Use {@link length} for that.
  * @returns Distance
  */
  distanceFromStart() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? distance2(initial, this.last) : 0;
  }
  /**
  * Returns the speed (over milliseconds) based on accumulated travel distance.
  * 
  * If there's no initial point, 0 is returned.
  * @returns 
  */
  speedFromStart() {
    const d = this.length;
    const t2 = this.timespan;
    if (Number.isNaN(t2)) return 0;
    if (d === 0) return 0;
    return Math.abs(d) / t2;
  }
  /**
  * Difference between last point and the initial point, calculated
  * as a simple subtraction of x,y & z.
  *
  * `Points.Placeholder` is returned if there's only one point so far.
  */
  difference() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? subtract$2(this.last, initial) : Placeholder$3;
  }
  /**
  * Returns angle (in radians) from latest point to the initial point
  * If there are less than two points, undefined is return.
  * @returns Angle in radians
  */
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) return angleRadian(initial, this.last);
  }
  /**
  * Returns the total distance from accumulated points.
  * Returns 0 if points were not saved, or there's only one
  */
  get length() {
    if (this.values.length === 1) return 0;
    const l = this.line;
    return length(l);
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
  * Returns the last z coord (or _undefined_ if not available)
  */
  get z() {
    return this.last.z;
  }
};
var PointsTracker = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0) throw new Error(`Requires start point`);
      const p = new PointTracker({
        ...opts,
        id: key
      });
      p.seen(start);
      return p;
    });
  }
  get(id) {
    const v = super.get(id);
    return v;
  }
};
var UserPointerTracker = class extends PointTracker {
  /**
  * Adds a PointerEvent along with its
  * coalesced events, if available.
  * @param p 
  * @returns 
  */
  seenEvent(p) {
    if (`getCoalescedEvents` in p) {
      const events = p.getCoalescedEvents();
      const asPoints$1 = events.map((event2) => ({
        x: event2.clientX,
        y: event2.clientY
      }));
      return this.seen(...asPoints$1);
    } else return this.seen({
      x: p.clientX,
      y: p.clientY
    });
  }
};
var UserPointersTracker = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0) throw new Error(`Requires start point`);
      const p = new UserPointerTracker({
        ...opts,
        id: key
      });
      p.seen(start);
      return p;
    });
  }
  get(id) {
    const v = super.get(id);
    return v;
  }
  /**
  * Track a PointerEvent
  * @param event
  */
  seenEvent(event2) {
    if (`getCoalescedEvents` in event2) {
      const events = event2.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else return Promise.all([super.seen(event2.pointerId.toString(), event2)]);
  }
};
var progressBetween = (position, waypointA, waypointB) => {
  const a = subtract$2(position, waypointA);
  const b = subtract$2(waypointB, waypointA);
  return isPoint3d(a) && isPoint3d(b) ? (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z) : (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
};
var project = (origin, distance$2, angle) => {
  const x = Math.cos(angle) * distance$2 + origin.x;
  const y = Math.sin(angle) * distance$2 + origin.y;
  return {
    x,
    y
  };
};
function quantiseEvery$1(pt, snap, middleRoundsUp = true) {
  guard$1(pt, `pt`);
  guard$1(snap, `snap`);
  if (isPoint3d(pt)) {
    if (!isPoint3d(snap)) throw new TypeError(`Param 'snap' is missing 'z' field`);
    return Object.freeze({
      x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
      y: quantiseEvery(pt.y, snap.y, middleRoundsUp),
      z: quantiseEvery(pt.z, snap.z, middleRoundsUp)
    });
  }
  return Object.freeze({
    x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
    y: quantiseEvery(pt.y, snap.y, middleRoundsUp)
  });
}
var random$2 = (rando) => {
  if (typeof rando === `undefined`) rando = Math.random;
  return Object.freeze({
    x: rando(),
    y: rando()
  });
};
var random3d = (rando) => {
  if (typeof rando === `undefined`) rando = Math.random;
  return Object.freeze({
    x: rando(),
    y: rando(),
    z: rando()
  });
};
var reduce2 = (pts, fn, initial) => {
  if (initial === void 0) initial = {
    x: 0,
    y: 0
  };
  let accumulator = initial;
  for (const p of pts) accumulator = fn(p, accumulator);
  return accumulator;
};
function rotate(pt, amountRadian, origin) {
  if (typeof origin === `undefined`) origin = {
    x: 0,
    y: 0
  };
  guard$1(origin, `origin`);
  resultThrow(numberTest(amountRadian, ``, `amountRadian`));
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0) return pt;
  if (!arrayInput) pt = [pt];
  const ptAr = pt;
  for (const [index, p] of ptAr.entries()) guard$1(p, `pt[${index}]`);
  const asPolar = ptAr.map((p) => fromCartesian(p, origin));
  const rotated = asPolar.map((p) => rotate$3(p, amountRadian));
  const asCartesisan = rotated.map((p) => toCartesian(p, origin));
  return arrayInput ? asCartesisan : asCartesisan[0];
}
var rotatePointArray = (v, amountRadian) => {
  const mat = [[Math.cos(amountRadian), -Math.sin(amountRadian)], [Math.sin(amountRadian), Math.cos(amountRadian)]];
  const result = [];
  for (const [index, element] of v.entries()) result[index] = [mat[0][0] * element[0] + mat[0][1] * element[1], mat[1][0] * element[0] + mat[1][1] * element[1]];
  return result;
};
var round$1 = (ptOrX, yOrDigits, digits) => {
  const pt = getPointParameter(ptOrX, yOrDigits);
  digits = digits ?? yOrDigits;
  digits = digits ?? 2;
  return Object.freeze({
    ...pt,
    x: round2(digits, pt.x),
    y: round2(digits, pt.y)
  });
};
var withinRange$1 = (a, b, maxRange) => {
  guard$1(a, `a`);
  guard$1(b, `b`);
  if (typeof maxRange === `number`) {
    resultThrow(numberTest(maxRange, `positive`, `maxRange`));
    maxRange = {
      x: maxRange,
      y: maxRange
    };
  } else guard$1(maxRange, `maxRange`);
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};
var wrap$1 = (pt, ptMax, ptMin) => {
  if (ptMax === void 0) ptMax = {
    x: 1,
    y: 1
  };
  if (ptMin === void 0) ptMin = {
    x: 0,
    y: 0
  };
  guard$1(pt, `pt`);
  guard$1(ptMax, `ptMax`);
  guard$1(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap(pt.x, ptMin.x, ptMax.x),
    y: wrap(pt.y, ptMin.y, ptMax.y)
  });
};
var point_exports = {};
__export2(point_exports, {
  Empty: () => Empty,
  Empty3d: () => Empty3d,
  Placeholder: () => Placeholder$3,
  Placeholder3d: () => Placeholder3d,
  PointTracker: () => PointTracker,
  PointsTracker: () => PointsTracker,
  Unit: () => Unit,
  Unit3d: () => Unit3d,
  UserPointerTracker: () => UserPointerTracker,
  UserPointersTracker: () => UserPointersTracker,
  abs: () => abs2,
  angleRadian: () => angleRadian,
  angleRadianCircle: () => angleRadianCircle,
  angleRadianThreePoint: () => angleRadianThreePoint,
  apply: () => apply$2,
  averager: () => averager,
  bbox: () => bbox$1,
  bbox3d: () => bbox3d,
  centroid: () => centroid$1,
  clamp: () => clamp$12,
  clampMagnitude: () => clampMagnitude,
  compare: () => compare2,
  compareByX: () => compareByX,
  compareByY: () => compareByY,
  compareByZ: () => compareByZ,
  convexHull: () => convexHull,
  distance: () => distance2,
  distance2d: () => distance2d,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide$2,
  divider: () => divider,
  dotProduct: () => dotProduct$1,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers,
  fromString: () => fromString,
  getPointParameter: () => getPointParameter,
  getTwoPointParameters: () => getTwoPointParameters,
  guard: () => guard$1,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate$2,
  invert: () => invert,
  isEmpty: () => isEmpty2,
  isEqual: () => isEqual2,
  isNaN: () => isNaN$1,
  isNull: () => isNull,
  isPlaceholder: () => isPlaceholder,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  leftmost: () => leftmost,
  multiply: () => multiply$2,
  multiplyScalar: () => multiplyScalar$1,
  normalise: () => normalise,
  normaliseByRect: () => normaliseByRect,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  progressBetween: () => progressBetween,
  project: () => project,
  quantiseEvery: () => quantiseEvery$1,
  random: () => random$2,
  random3d: () => random3d,
  reduce: () => reduce2,
  relation: () => relation,
  rightmost: () => rightmost,
  rotate: () => rotate,
  rotatePointArray: () => rotatePointArray,
  round: () => round$1,
  subtract: () => subtract$2,
  sum: () => sum$12,
  test: () => test,
  to2d: () => to2d,
  to3d: () => to3d,
  toArray: () => toArray$12,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString$2,
  withinRange: () => withinRange$1,
  wrap: () => wrap$1
});
var rotate$2 = (line, amountRadian, origin) => {
  if (typeof amountRadian === `undefined` || amountRadian === 0) return line;
  if (typeof origin === `undefined`) origin = 0.5;
  if (typeof origin === `number`) origin = interpolate$1(origin, line.a, line.b);
  return Object.freeze({
    ...line,
    a: rotate(line.a, amountRadian, origin),
    b: rotate(line.b, amountRadian, origin)
  });
};
var isEqual$3 = (a, b) => isEqual2(a.a, b.a) && isEqual2(a.b, b.b);
var multiply$1 = (line, point$1) => Object.freeze({
  ...line,
  a: multiply$2(line.a, point$1),
  b: multiply$2(line.b, point$1)
});
var subtract$1 = (line, point$1) => Object.freeze({
  ...line,
  a: subtract$2(line.a, point$1),
  b: subtract$2(line.b, point$1)
});
function toString$12(a, b) {
  if (isLine(a)) {
    guard$3(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0) throw new Error(`Expect second point if first is a point`);
  return toString$2(a) + `-` + toString$2(b);
}
var toPath = (line) => {
  const { a, b } = line;
  return Object.freeze({
    ...line,
    length: () => length(a, b),
    interpolate: (amount) => interpolate$1(amount, a, b),
    relativePosition: (point$1) => relativePosition$1(line, point$1),
    bbox: () => bbox$3(line),
    toString: () => toString$12(a, b),
    toFlatArray: () => toFlatArray$1(a, b),
    toSvgString: () => toSvgString$1(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate$2(line, amountRadian, origin)),
    nearest: (point$1) => nearest(line, point$1),
    sum: (point$1) => toPath(sum$2(line, point$1)),
    divide: (point$1) => toPath(divide$1(line, point$1)),
    multiply: (point$1) => toPath(multiply$1(line, point$1)),
    subtract: (point$1) => toPath(subtract$1(line, point$1)),
    midpoint: () => midpoint(a, b),
    distanceToPoint: (point$1) => distanceSingleLine(line, point$1),
    parallel: (distance$2) => parallel(line, distance$2),
    perpendicularPoint: (distance$2, amount) => perpendicularPoint(line, distance$2, amount),
    slope: () => slope(line),
    withinRange: (point$1, maxRange) => withinRange(line, point$1, maxRange),
    isEqual: (otherLine) => isEqual$3(line, otherLine),
    apply: (fn) => toPath(apply$1(line, fn)),
    kind: `line`
  });
};
var fromPointsToPath = (a, b) => toPath(fromPoints$2(a, b));
var line_exports = {};
__export2(line_exports, {
  Empty: () => Empty$3,
  Placeholder: () => Placeholder$2,
  angleRadian: () => angleRadian$1,
  apply: () => apply$1,
  asPoints: () => asPoints,
  bbox: () => bbox$3,
  distance: () => distance$1,
  distanceSingleLine: () => distanceSingleLine,
  divide: () => divide$1,
  extendFromA: () => extendFromA,
  fromFlatArray: () => fromFlatArray$1,
  fromNumbers: () => fromNumbers$2,
  fromPivot: () => fromPivot,
  fromPoints: () => fromPoints$2,
  fromPointsToPath: () => fromPointsToPath,
  getPointParameter: () => getPointParameter$1,
  guard: () => guard$3,
  interpolate: () => interpolate$1,
  isEmpty: () => isEmpty$2,
  isEqual: () => isEqual$3,
  isLine: () => isLine,
  isPlaceholder: () => isPlaceholder$2,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length,
  midpoint: () => midpoint,
  multiply: () => multiply$1,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect$1,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  pointAtDistance: () => pointAtDistance,
  pointAtX: () => pointAtX,
  pointsOf: () => pointsOf,
  relativePosition: () => relativePosition$1,
  reverse: () => reverse,
  rotate: () => rotate$2,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract$1,
  sum: () => sum$2,
  toFlatArray: () => toFlatArray$1,
  toPath: () => toPath,
  toString: () => toString$12,
  toSvgString: () => toSvgString$1,
  withinRange: () => withinRange
});
var Empty$3 = Object.freeze({
  a: Object.freeze({
    x: 0,
    y: 0
  }),
  b: Object.freeze({
    x: 0,
    y: 0
  })
});
var Placeholder$2 = Object.freeze({
  a: Object.freeze({
    x: NaN,
    y: NaN
  }),
  b: Object.freeze({
    x: NaN,
    y: NaN
  })
});
var isEmpty$2 = (l) => isEmpty2(l.a) && isEmpty2(l.b);
var isPlaceholder$2 = (l) => isPlaceholder(l.a) && isPlaceholder(l.b);
var apply$1 = (line, fn) => Object.freeze({
  ...line,
  a: fn(line.a),
  b: fn(line.b)
});
var angleRadian$1 = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var normaliseByRect$1 = (line, width, height$3) => Object.freeze({
  ...line,
  a: normaliseByRect(line.a, width, height$3),
  b: normaliseByRect(line.b, width, height$3)
});
var withinRange = (line, point$1, maxRange) => {
  const calculatedDistance = distance$1(line, point$1);
  return calculatedDistance <= maxRange;
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b parameter required`);
  }
  if (b === void 0) throw new TypeError(`Second point missing`);
  else return (b.y - a.y) / (b.x - a.x);
};
var scaleFromMidpoint = (line, factor) => {
  const a = interpolate$1(factor / 2, line);
  const b = interpolate$1(0.5 + factor / 2, line);
  return {
    a,
    b
  };
};
var pointAtX = (line, x) => {
  const y = line.a.y + (x - line.a.x) * slope(line);
  return Object.freeze({
    x,
    y
  });
};
var extendFromA = (line, distance$2) => {
  const calculatedLength = length(line);
  return Object.freeze({
    ...line,
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / calculatedLength * distance$2,
      y: line.b.y + (line.b.y - line.a.y) / calculatedLength * distance$2
    })
  });
};
function* pointsOf(line) {
  const { a, b } = line;
  let x0 = Math.floor(a.x);
  let y0 = Math.floor(a.y);
  const x1 = Math.floor(b.x);
  const y1 = Math.floor(b.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield {
      x: x0,
      y: y0
    };
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
var distance$1 = (line, point$1) => {
  if (Array.isArray(line)) {
    const distances = line.map((l) => distanceSingleLine(l, point$1));
    return minFast(distances);
  } else return distanceSingleLine(line, point$1);
};
var toFlatArray$1 = (a, b) => {
  if (isLine(a)) return [
    a.a.x,
    a.a.y,
    a.b.x,
    a.b.y
  ];
  else if (isPoint(a) && isPoint(b)) return [
    a.x,
    a.y,
    b.x,
    b.y
  ];
  else throw new Error(`Expected single line parameter, or a and b points`);
};
function* asPoints(lines) {
  for (const l of lines) {
    yield l.a;
    yield l.b;
  }
}
var toSvgString$1 = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];
var corners$1 = (rect, origin) => {
  const r = getRectPositioned(rect, origin);
  return [
    {
      x: r.x,
      y: r.y
    },
    {
      x: r.x + r.width,
      y: r.y
    },
    {
      x: r.x + r.width,
      y: r.y + r.height
    },
    {
      x: r.x,
      y: r.y + r.height
    }
  ];
};
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
var compound_path_exports = {};
__export2(compound_path_exports, {
  bbox: () => bbox$2,
  computeDimensions: () => computeDimensions,
  distanceToPoint: () => distanceToPoint,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate2,
  relativePosition: () => relativePosition,
  setSegment: () => setSegment,
  toString: () => toString2,
  toSvgString: () => toSvgString
});
var setSegment = (compoundPath, index, path) => {
  const existing = [...compoundPath.segments];
  existing[index] = path;
  return fromPaths(...existing);
};
var interpolate2 = (paths, t2, useWidth, dimensions) => {
  if (dimensions === void 0) dimensions = computeDimensions(paths);
  const expected = t2 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (const [index, element] of l.entries()) if (soFar + element >= expected) {
    const relative2 = expected - soFar;
    let amt = relative2 / element;
    if (amt > 1) amt = 1;
    return paths[index].interpolate(amt);
  } else soFar += element;
  return {
    x: 0,
    y: 0
  };
};
var distanceToPoint = (paths, point$1) => {
  if (paths.length === 0) return 0;
  let distances = paths.map((p, index) => ({
    path: p,
    index,
    distance: p.distanceToPoint(point$1)
  }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length === 0) throw new Error(`Could not look up distances`);
  return distances[0].distance;
};
var relativePosition = (paths, point$1, intersectionThreshold, dimensions) => {
  if (dimensions === void 0) dimensions = computeDimensions(paths);
  let distances = paths.map((p, index) => ({
    path: p,
    index,
    distance: p.distanceToPoint(point$1)
  }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length < 0) throw new Error(`Point does not intersect with path`);
  const d = distances[0];
  if (d.distance > intersectionThreshold) throw new Error(`Point does not intersect with path. Minimum distance: ${d.distance}, threshold: ${intersectionThreshold}`);
  const relativePositionOnPath = d.path.relativePosition(point$1, intersectionThreshold);
  let accumulated = 0;
  for (let index = 0; index < d.index; index++) accumulated += dimensions.lengths[index];
  accumulated += dimensions.lengths[d.index] * relativePositionOnPath;
  const accumulatedRel = accumulated / dimensions.totalLength;
  console.log(`acc: ${accumulated} rel: ${accumulatedRel} on path: ${relativePositionOnPath} path: ${d.index}`);
  return accumulatedRel;
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths$2 = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (const length$4 of lengths$2) totalLength += length$4;
  for (const width of widths) totalWidth += width;
  return {
    totalLength,
    totalWidth,
    widths,
    lengths: lengths$2
  };
};
var bbox$2 = (paths) => {
  const boxes = paths.map((p) => p.bbox());
  const corners$2 = boxes.flatMap((b) => corners$1(b));
  return bbox$1(...corners$2);
};
var toString2 = (paths) => paths.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = getEnd(paths[0]);
  for (let index = 1; index < paths.length; index++) {
    const start = getStart(paths[index]);
    if (!isEqual2(start, lastPos)) throw new Error(`Path index ${index} does not start at prior path end. Start: ${start.x},${start.y} expected: ${lastPos.x},${lastPos.y}`);
    lastPos = getEnd(paths[index]);
  }
};
var toSvgString = (paths) => paths.flatMap((p) => p.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    interpolate: (t2, useWidth = false) => interpolate2(paths, t2, useWidth, dims),
    relativePosition: (point$1, intersectionThreshold) => relativePosition(paths, point$1, intersectionThreshold, dims),
    distanceToPoint: (point$1) => distanceToPoint(paths, point$1),
    bbox: () => bbox$2(paths),
    toString: () => toString2(paths),
    toSvgString: () => toSvgString(paths),
    kind: `compound`
  });
};
var path_exports = {};
__export2(path_exports, {
  bbox: () => bbox$2,
  computeDimensions: () => computeDimensions,
  distanceToPoint: () => distanceToPoint,
  fromPaths: () => fromPaths,
  getEnd: () => getEnd,
  getStart: () => getStart,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate2,
  relativePosition: () => relativePosition,
  setSegment: () => setSegment,
  toString: () => toString2,
  toSvgString: () => toSvgString
});
var area$4 = (rect) => {
  guard$2(rect);
  return rect.height * rect.width;
};
function applyFields(op, rectOrWidth, heightValue) {
  let width = typeof rectOrWidth === `number` ? rectOrWidth : rectOrWidth.width;
  let height$3 = typeof rectOrWidth === `number` ? heightValue : rectOrWidth.height;
  if (width === void 0) throw new Error(`Param 'width' undefined`);
  if (height$3 === void 0) throw new Error(`Param 'height' undefined`);
  width = op(width, `width`);
  height$3 = op(height$3, `height`);
  if (typeof rectOrWidth === `object`) if (isPositioned(rectOrWidth)) {
    const x = op(rectOrWidth.x, `x`);
    const y = op(rectOrWidth.y, `y`);
    return {
      ...rectOrWidth,
      width,
      height: height$3,
      x,
      y
    };
  } else return {
    ...rectOrWidth,
    width,
    height: height$3
  };
  return {
    width,
    height: height$3
  };
}
function applyMerge(op, a, b, c) {
  guard$2(a, `a`);
  if (isRect(b)) return isRectPositioned(a) ? Object.freeze({
    ...a,
    x: op(a.x, b.width),
    y: op(a.y, b.height),
    width: op(a.width, b.width),
    height: op(a.height, b.height)
  }) : Object.freeze({
    ...a,
    width: op(a.width, b.width),
    height: op(a.height, b.height)
  });
  else {
    if (typeof b !== `number`) throw new TypeError(`Expected second parameter of type Rect or number. Got ${JSON.stringify(b)}`);
    if (typeof c !== `number`) throw new Error(`Expected third param as height. Got ${JSON.stringify(c)}`);
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: op(a.x, b),
      y: op(a.y, c),
      width: op(a.width, b),
      height: op(a.height, c)
    }) : Object.freeze({
      ...a,
      width: op(a.width, b),
      height: op(a.height, c)
    });
  }
}
function applyScalar(op, rect, parameter) {
  return isPositioned(rect) ? Object.freeze({
    ...rect,
    x: op(rect.x, parameter),
    y: op(rect.y, parameter),
    width: op(rect.width, parameter),
    height: op(rect.height, parameter)
  }) : Object.freeze({
    ...rect,
    width: op(rect.width, parameter),
    height: op(rect.height, parameter)
  });
}
function applyDim(op, rect, parameter) {
  return Object.freeze({
    ...rect,
    width: op(rect.width, parameter),
    height: op(rect.height, parameter)
  });
}
var cardinal = (rect, card) => {
  const { x, y, width, height: height$3 } = rect;
  switch (card) {
    case `nw`:
      return Object.freeze({
        x,
        y
      });
    case `n`:
      return Object.freeze({
        x: x + width / 2,
        y
      });
    case `ne`:
      return Object.freeze({
        x: x + width,
        y
      });
    case `sw`:
      return Object.freeze({
        x,
        y: y + height$3
      });
    case `s`:
      return Object.freeze({
        x: x + width / 2,
        y: y + height$3
      });
    case `se`:
      return Object.freeze({
        x: x + width,
        y: y + height$3
      });
    case `w`:
      return Object.freeze({
        x,
        y: y + height$3 / 2
      });
    case `e`:
      return Object.freeze({
        x: x + width,
        y: y + height$3 / 2
      });
    case `center`:
      return Object.freeze({
        x: x + width / 2,
        y: y + height$3 / 2
      });
    default:
      throw new Error(`Unknown direction: ${card}`);
  }
};
var centerOrigin = (rectAbsolute) => {
  const c = center$1(rectAbsolute);
  const w = rectAbsolute.width / 2;
  const h = rectAbsolute.height / 2;
  const relativeToAbsolute = (point$1) => {
    return {
      ...point$1,
      x: point$1.x * w + c.x,
      y: point$1.y * h + c.y
    };
  };
  const absoluteToRelative = (point$1) => {
    return {
      ...point$1,
      x: (point$1.x - rectAbsolute.x) / w - 1,
      y: (point$1.y - rectAbsolute.y) / h - 1
    };
  };
  return {
    relativeToAbsolute,
    absoluteToRelative
  };
};
var divideOp = (a, b) => a / b;
function divide(a, b, c) {
  return applyMerge(divideOp, a, b, c);
}
function divideScalar(rect, amount) {
  return applyScalar(divideOp, rect, amount);
}
function divideDim(rect, amount) {
  return applyDim(divideOp, rect, amount);
}
var edges$1 = (rect, origin) => {
  const c = corners$1(rect, origin);
  return joinPointsToLines(...c, c[0]);
};
var getEdgeX = (rect, edge) => {
  guard$2(rect);
  switch (edge) {
    case `top`:
      return isPoint(rect) ? rect.x : 0;
    case `bottom`:
      return isPoint(rect) ? rect.x : 0;
    case `left`:
      return isPoint(rect) ? rect.y : 0;
    case `right`:
      return isPoint(rect) ? rect.x + rect.width : rect.width;
  }
};
var getEdgeY = (rect, edge) => {
  guard$2(rect);
  switch (edge) {
    case `top`:
      return isPoint(rect) ? rect.y : 0;
    case `bottom`:
      return isPoint(rect) ? rect.y + rect.height : rect.height;
    case `left`:
      return isPoint(rect) ? rect.y : 0;
    case `right`:
      return isPoint(rect) ? rect.y : 0;
  }
};
var Empty$2 = Object.freeze({
  width: 0,
  height: 0
});
var EmptyPositioned = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
var encompass = (rect, ...points) => {
  const x = points.map((p) => p.x);
  const y = points.map((p) => p.y);
  let minX = Math.min(...x, rect.x);
  let minY = Math.min(...y, rect.y);
  let maxX = Math.max(...x, rect.x + rect.width);
  let maxY = Math.max(...y, rect.y + rect.height);
  let rectW = Math.max(rect.width, maxX - minX);
  let rectH = Math.max(rect.height, maxY - minY);
  return Object.freeze({
    ...rect,
    x: minX,
    y: minY,
    width: rectW,
    height: rectH
  });
};
var fromElement = (el) => ({
  width: el.clientWidth,
  height: el.clientHeight
});
function fromNumbers$1(xOrWidth, yOrHeight, width, height$3) {
  if (width === void 0 || height$3 === void 0) {
    if (typeof xOrWidth !== `number`) throw new Error(`width is not an number`);
    if (typeof yOrHeight !== `number`) throw new TypeError(`height is not an number`);
    return Object.freeze({
      width: xOrWidth,
      height: yOrHeight
    });
  }
  if (typeof xOrWidth !== `number`) throw new Error(`x is not an number`);
  if (typeof yOrHeight !== `number`) throw new Error(`y is not an number`);
  if (typeof width !== `number`) throw new Error(`width is not an number`);
  if (typeof height$3 !== `number`) throw new Error(`height is not an number`);
  return Object.freeze({
    x: xOrWidth,
    y: yOrHeight,
    width,
    height: height$3
  });
}
function getRectPositionedParameter(a, b, c, d) {
  if (typeof a === `number`) if (typeof b === `number`) if (typeof c === `number` && typeof d === `number`) return {
    x: a,
    y: b,
    width: c,
    height: d
  };
  else if (isRect(c)) return {
    x: a,
    y: b,
    width: c.width,
    height: c.height
  };
  else throw new TypeError(`If params 'a' & 'b' are numbers, expect following parameters to be x,y or Rect`);
  else throw new TypeError(`If parameter 'a' is a number, expect following parameters to be: y,w,h`);
  else if (isRectPositioned(a)) return a;
  else if (isRect(a)) if (typeof b === `number` && typeof c === `number`) return {
    width: a.width,
    height: a.height,
    x: b,
    y: c
  };
  else if (isPoint(b)) return {
    width: a.width,
    height: a.height,
    x: b.x,
    y: b.y
  };
  else throw new TypeError(`If param 'a' is a Rect, expects following parameters to be x,y`);
  else if (isPoint(a)) if (typeof b === `number` && typeof c === `number`) return {
    x: a.x,
    y: a.y,
    width: b,
    height: c
  };
  else if (isRect(b)) return {
    x: a.x,
    y: a.y,
    width: b.width,
    height: b.height
  };
  else throw new TypeError(`If parameter 'a' is a Point, expect following params to be: Rect or width,height`);
  throw new TypeError(`Expect a first parameter to be x,RectPositioned,Rect or Point`);
}
var isEqualSize = (a, b) => {
  if (a === void 0) throw new Error(`a undefined`);
  if (b === void 0) throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
var isEqual$2 = (a, b) => {
  if (isPositioned(a) && isPositioned(b)) {
    if (!isEqual2(a, b)) return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned(a) && !isPositioned(b)) return a.width === b.width && a.height === b.height;
  else return false;
};
var lengths$1 = (rect) => {
  guardPositioned(rect, `rect`);
  return edges$1(rect).map((l) => length(l));
};
var multiplyOp = (a, b) => a * b;
function multiply(a, b, c) {
  return applyMerge(multiplyOp, a, b, c);
}
function multiplyScalar(rect, amount) {
  return applyScalar(multiplyOp, rect, amount);
}
function multiplyDim(rect, amount) {
  return applyDim(multiplyOp, rect, amount);
}
var nearestInternal = (rect, p) => {
  let { x, y } = p;
  if (x < rect.x) x = rect.x;
  else if (x > rect.x + rect.width) x = rect.x + rect.width;
  if (y < rect.y) y = rect.y;
  else if (y > rect.y + rect.height) y = rect.y + rect.height;
  return Object.freeze({
    ...p,
    x,
    y
  });
};
var Placeholder = Object.freeze({
  width: NaN,
  height: NaN
});
var PlaceholderPositioned = Object.freeze({
  x: NaN,
  y: NaN,
  width: NaN,
  height: NaN
});
var perimeter$4 = (rect) => {
  guard$2(rect);
  return rect.height + rect.height + rect.width + rect.width;
};
var dividerByLargestDimension = (rect) => {
  const largest = Math.max(rect.width, rect.height);
  return (value2) => {
    if (typeof value2 === `number`) return value2 / largest;
    else if (isPoint3d(value2)) return Object.freeze({
      ...value2,
      x: value2.x / largest,
      y: value2.y / largest,
      z: value2.x / largest
    });
    else if (isPoint(value2)) return Object.freeze({
      ...value2,
      x: value2.x / largest,
      y: value2.y / largest
    });
    else throw new Error(`Param 'value' is neither number nor Point`);
  };
};
var random$1 = (rando) => {
  rando ??= Math.random;
  return Object.freeze({
    x: rando(),
    y: rando(),
    width: rando(),
    height: rando()
  });
};
var randomPoint$2 = (within, options = {}) => {
  const rand = options.randomSource ?? Math.random;
  const margin = options.margin ?? {
    x: 0,
    y: 0
  };
  const x = rand() * (within.width - margin.x - margin.x);
  const y = rand() * (within.height - margin.y - margin.y);
  const pos = {
    x: x + margin.x,
    y: y + margin.y
  };
  return isPositioned(within) ? sum$12(pos, within) : Object.freeze(pos);
};
var subtractOp = (a, b) => a - b;
function subtract(a, b, c) {
  return applyMerge(subtractOp, a, b, c);
}
function subtractSize(a, b, c) {
  const w = typeof b === `number` ? b : b.width;
  const h = typeof b === `number` ? c : b.height;
  if (h === void 0) throw new Error(`Expected height as third parameter`);
  const r = {
    ...a,
    width: a.width - w,
    height: a.height - h
  };
  return r;
}
function subtractOffset(a, b) {
  let x = 0;
  let y = 0;
  if (isPositioned(a)) {
    x = a.x;
    y = a.y;
  }
  let xB = 0;
  let yB = 0;
  if (isPositioned(b)) {
    xB = b.x;
    yB = b.y;
  }
  return Object.freeze({
    ...a,
    x: x - xB,
    y: y - yB,
    width: a.width - b.width,
    height: a.height - b.height
  });
}
var sumOp = (a, b) => a + b;
function sum2(a, b, c) {
  return applyMerge(sumOp, a, b, c);
}
function sumOffset(a, b) {
  let x = 0;
  let y = 0;
  if (isPositioned(a)) {
    x = a.x;
    y = a.y;
  }
  let xB = 0;
  let yB = 0;
  if (isPositioned(b)) {
    xB = b.x;
    yB = b.y;
  }
  return Object.freeze({
    ...a,
    x: x + xB,
    y: y + yB,
    width: a.width + b.width,
    height: a.height + b.height
  });
}
function toArray3(rect) {
  if (isPositioned(rect)) return [
    rect.x,
    rect.y,
    rect.width,
    rect.height
  ];
  else if (isRect(rect)) return [rect.width, rect.height];
  else throw new Error(`Param 'rect' is not a rectangle. Got: ${JSON.stringify(rect)}`);
}
var rect_exports = {};
__export2(rect_exports, {
  Empty: () => Empty$2,
  EmptyPositioned: () => EmptyPositioned,
  Placeholder: () => Placeholder,
  PlaceholderPositioned: () => PlaceholderPositioned,
  applyDim: () => applyDim,
  applyFields: () => applyFields,
  applyMerge: () => applyMerge,
  applyScalar: () => applyScalar,
  area: () => area$4,
  cardinal: () => cardinal,
  center: () => center$1,
  centerOrigin: () => centerOrigin,
  corners: () => corners$1,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior,
  divide: () => divide,
  divideDim: () => divideDim,
  divideScalar: () => divideScalar,
  dividerByLargestDimension: () => dividerByLargestDimension,
  edges: () => edges$1,
  encompass: () => encompass,
  fromCenter: () => fromCenter$2,
  fromElement: () => fromElement,
  fromNumbers: () => fromNumbers$1,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  getRectPositioned: () => getRectPositioned,
  getRectPositionedParameter: () => getRectPositionedParameter,
  guard: () => guard$2,
  guardDim: () => guardDim,
  guardPositioned: () => guardPositioned,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty$3,
  isEqual: () => isEqual$2,
  isEqualSize: () => isEqualSize,
  isIntersecting: () => isIntersecting$1,
  isPlaceholder: () => isPlaceholder$3,
  isPositioned: () => isPositioned,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths$1,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply,
  multiplyDim: () => multiplyDim,
  multiplyScalar: () => multiplyScalar,
  nearestInternal: () => nearestInternal,
  perimeter: () => perimeter$4,
  random: () => random$1,
  randomPoint: () => randomPoint$2,
  subtract: () => subtract,
  subtractOffset: () => subtractOffset,
  subtractSize: () => subtractSize,
  sum: () => sum2,
  sumOffset: () => sumOffset,
  toArray: () => toArray3
});
var Empty$1 = Object.freeze({
  a: {
    x: 0,
    y: 0
  },
  b: {
    x: 0,
    y: 0
  },
  c: {
    x: 0,
    y: 0
  }
});
var Placeholder$1 = Object.freeze({
  a: {
    x: NaN,
    y: NaN
  },
  b: {
    x: NaN,
    y: NaN
  },
  c: {
    x: NaN,
    y: NaN
  }
});
var equilateralFromVertex = (origin, length$4 = 10, angleRadian$2 = Math.PI / 2) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const a = project(origin, length$4, Math.PI - -angleRadian$2 / 2);
  const c = project(origin, length$4, Math.PI - angleRadian$2 / 2);
  return {
    a,
    b: origin,
    c
  };
};
var arrow = (origin, from$1, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian$2 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from$1 === `tip`) {
    tri = equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = corners$1(fromTopLeft({
      x: tri.a.x - tailLength,
      y: origin.y - tailThickness / 2
    }, tailLength, tailThickness));
  } else if (from$1 === `middle`) {
    const midX = tailLength + arrowSize / 2;
    const midY = tailThickness / 2;
    tri = equilateralFromVertex({
      x: origin.x + arrowSize * 1.2,
      y: origin.y
    }, arrowSize, triAngle);
    tailPoints = corners$1(fromTopLeft({
      x: origin.x - midX,
      y: origin.y - midY
    }, tailLength + arrowSize, tailThickness));
  } else {
    tailPoints = corners$1(fromTopLeft({
      x: origin.x,
      y: origin.y - tailThickness / 2
    }, tailLength, tailThickness));
    tri = equilateralFromVertex({
      x: origin.x + tailLength + arrowSize * 0.7,
      y: origin.y
    }, arrowSize, triAngle);
  }
  const arrow$1 = rotate([
    tailPoints[0],
    tailPoints[1],
    tri.a,
    tri.b,
    tri.c,
    tailPoints[2],
    tailPoints[3]
  ], angleRadian$2, origin);
  return arrow$1;
};
var guard = (t2, name = `t`) => {
  if (t2 === void 0) throw new Error(`{$name} undefined`);
  guard$1(t2.a, name + `.a`);
  guard$1(t2.b, name + `.b`);
  guard$1(t2.c, name + `.c`);
};
var isTriangle = (p) => {
  if (p === void 0) return false;
  const tri = p;
  if (!isPoint(tri.a)) return false;
  if (!isPoint(tri.b)) return false;
  if (!isPoint(tri.c)) return false;
  return true;
};
var isEmpty$12 = (t2) => isEmpty2(t2.a) && isEmpty2(t2.b) && isEmpty2(t2.c);
var isPlaceholder$1 = (t2) => isPlaceholder(t2.a) && isPlaceholder(t2.b) && isPlaceholder(t2.c);
var isEqual$1 = (a, b) => isEqual2(a.a, b.a) && isEqual2(a.b, b.b) && isEqual2(a.c, b.c);
var centroid = (t2) => {
  guard(t2);
  const total2 = reduce2([
    t2.a,
    t2.b,
    t2.c
  ], (p, accumulator) => ({
    x: p.x + accumulator.x,
    y: p.y + accumulator.y
  }));
  const div = {
    x: total2.x / 3,
    y: total2.y / 3
  };
  return div;
};
var randomPoint = (shape, opts = {}) => {
  if (isCirclePositioned(shape)) return randomPoint$1(shape, opts);
  else if (isRectPositioned(shape)) return randomPoint$2(shape, opts);
  throw new Error(`Unknown shape. Only CirclePositioned and RectPositioned are supported.`);
};
var center$2 = (shape) => {
  if (shape === void 0) return Object.freeze({
    x: 0.5,
    y: 0.5
  });
  else if (isRect(shape)) return center$1(shape);
  else if (isTriangle(shape)) return centroid(shape);
  else if (isCircle(shape)) return center(shape);
  else throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
};
var isIntersecting$2 = (a, b) => {
  if (isCirclePositioned(a)) return isIntersecting(a, b);
  else if (isRectPositioned(a)) return isIntersecting$1(a, b);
  throw new Error(`a or b are unknown shapes. a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
};
var starburst = (outerRadius, points = 5, innerRadius, origin = Empty, opts) => {
  resultThrow(integerTest(points, `positive`, `points`));
  const angle = Math.PI * 2 / points;
  const angleHalf = angle / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0) innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let index = 0; index < points; index++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (index + 1 < points) pts.push(right);
    a += angle;
  }
  return pts;
};
var shape_exports = {};
__export2(shape_exports, {
  arrow: () => arrow,
  center: () => center$2,
  isIntersecting: () => isIntersecting$2,
  randomPoint: () => randomPoint,
  starburst: () => starburst
});
var waypoint_exports = {};
__export2(waypoint_exports, {
  fromPoints: () => fromPoints$1,
  init: () => init2
});
var fromPoints$1 = (waypoints, opts = {}) => {
  const lines = joinPointsToLines(...waypoints);
  return init2(lines.map((l) => toPath(l)), opts);
};
var init2 = (paths, opts = {}) => {
  const maxDistanceFromLine = opts.maxDistanceFromLine ?? 0.1;
  const checkUnordered = (pt) => {
    const results = paths.map((p, index) => {
      const nearest$2 = p.nearest(pt);
      const distance$2 = distance2(pt, nearest$2);
      const positionRelative = p.relativePosition(nearest$2, maxDistanceFromLine);
      return {
        positionRelative,
        path: p,
        index,
        nearest: nearest$2,
        distance: distance$2,
        rank: Number.MAX_SAFE_INTEGER
      };
    });
    const filtered = results.filter((v) => v.distance <= maxDistanceFromLine);
    const sorted = sortByNumericProperty(filtered, `distance`);
    for (let rank2 = 0; rank2 < sorted.length; rank2++) sorted[rank2].rank = rank2;
    return sorted;
  };
  return checkUnordered;
};
var circle_packing_exports = {};
__export2(circle_packing_exports, { random: () => random });
var random = (circles, container, opts = {}) => {
  if (!Array.isArray(circles)) throw new Error(`Parameter 'circles' is not an array`);
  const attempts = opts.attempts ?? 2e3;
  const sorted = sortByNumericProperty(circles, `radius`);
  const positionedCircles = [];
  const willHit = (b, radius) => positionedCircles.some((v) => isIntersecting(v, b, radius));
  while (sorted.length > 0) {
    const circle = sorted.pop();
    if (!circle) break;
    const randomPointOpts = {
      ...opts,
      margin: {
        x: circle.radius,
        y: circle.radius
      }
    };
    for (let index = 0; index < attempts; index++) {
      const position = randomPoint(container, randomPointOpts);
      if (!willHit(position, circle.radius)) {
        positionedCircles.push(Object.freeze({
          ...circle,
          ...position
        }));
        break;
      }
    }
  }
  return positionedCircles;
};
var layout_exports = {};
__export2(layout_exports, { CirclePacking: () => circle_packing_exports });
var ellipse_exports = {};
__export2(ellipse_exports, { fromDegrees: () => fromDegrees });
var fromDegrees = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});
var curve_simplification_exports = {};
__export2(curve_simplification_exports, {
  rdpPerpendicularDistance: () => rdpPerpendicularDistance,
  rdpShortestDistance: () => rdpShortestDistance
});
var rdpShortestDistance = (points, epsilon2 = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) return points;
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = distanceFromPointToLine(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpShortestDistance(l1, epsilon2);
    const r2 = rdpShortestDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else return [firstPoint, lastPoint];
};
var rdpPerpendicularDistance = (points, epsilon2 = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) return points;
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = findPerpendicularDistance(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpPerpendicularDistance(l1, epsilon2);
    const r2 = rdpPerpendicularDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else return [firstPoint, lastPoint];
};
function findPerpendicularDistance(p, p1, p2) {
  let result;
  let slope$1;
  let intercept;
  if (p1.x == p2.x) result = Math.abs(p.x - p1.x);
  else {
    slope$1 = (p2.y - p1.y) / (p2.x - p1.x);
    intercept = p1.y - slope$1 * p1.x;
    result = Math.abs(slope$1 * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope$1, 2) + 1);
  }
  return result;
}
var distanceFromPointToLine = (p, index, index_) => {
  const lineLength = distance2(index, index_);
  if (lineLength == 0) return distance2(p, index);
  const t2 = ((p.x - index.x) * (index_.x - index.x) + (p.y - index.y) * (index_.y - index.y)) / lineLength;
  if (t2 < 0) return distance2(p, index);
  if (t2 > 1) return distance2(p, index_);
  return distance2(p, {
    x: index.x + t2 * (index_.x - index.x),
    y: index.y + t2 * (index_.y - index.y)
  });
};
var quad_tree_exports = {};
__export2(quad_tree_exports, {
  Direction: () => Direction,
  QuadTreeNode: () => QuadTreeNode,
  quadTree: () => quadTree
});
var Direction = /* @__PURE__ */ function(Direction$1) {
  Direction$1[Direction$1["Nw"] = 0] = "Nw";
  Direction$1[Direction$1["Ne"] = 1] = "Ne";
  Direction$1[Direction$1["Sw"] = 2] = "Sw";
  Direction$1[Direction$1["Se"] = 3] = "Se";
  return Direction$1;
}({});
var quadTree = (bounds, initialData = [], opts = {}) => {
  const o = {
    maxItems: opts.maxItems ?? 4,
    maxLevels: opts.maxLevels ?? 4
  };
  const n = new QuadTreeNode(void 0, bounds, 0, o);
  for (const d of initialData) n.add(d);
  return n;
};
var QuadTreeNode = class QuadTreeNode2 {
  #items = [];
  #children = [];
  #parent;
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
  getLengthChildren() {
    return this.#children.length;
  }
  *parents() {
    let n = this;
    while (n.#parent !== void 0) {
      yield n.#parent;
      n = n.#parent;
    }
  }
  getParent() {
    return this.#parent;
  }
  /**
  * Iterates over immediate children
  */
  *children() {
    for (const c of this.#children) yield c;
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
  direction(d) {
    return this.#children[d];
  }
  /**
  * Add an item to the quadtree
  * @param p
  * @returns False if item is outside of boundary, True if item was added
  */
  add(p) {
    if (!isIntersecting$2(this.boundary, p)) return false;
    if (this.#children.length > 0) {
      for (const d of this.#children) d.add(p);
      return true;
    }
    this.#items.push(p);
    if (this.#items.length > this.opts.maxItems && this.level < this.opts.maxLevels) {
      if (this.#children.length === 0) this.#subdivide();
      for (const item of this.#items) for (const d of this.#children) d.add(item);
      this.#items = [];
    }
    return true;
  }
  /**
  * Returns true if point is inside node's boundary
  * @param p
  * @returns
  */
  couldHold(p) {
    return intersectsPoint(this.boundary, p);
  }
  #subdivide() {
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    const x = this.boundary.x;
    const y = this.boundary.y;
    const coords = fromNumbers(x + w, y, x, y, x, y + h, x + w, y + h);
    const rects = coords.map((p) => fromTopLeft(p, w, h));
    this.#children = rects.map((r) => new QuadTreeNode2(this, r, this.level + 1, this.opts));
  }
};
var surface_points_exports = {};
__export2(surface_points_exports, {
  circleRings: () => circleRings,
  circleVogelSpiral: () => circleVogelSpiral,
  sphereFibonacci: () => sphereFibonacci
});
var cos2 = Math.cos;
var sin2 = Math.sin;
var asin = Math.asin;
var sqrt2 = Math.sqrt;
var pow2 = Math.pow;
var pi2 = Math.PI;
var piPi$1 = Math.PI * 2;
var goldenAngle = pi2 * (3 - sqrt2(5));
var goldenSection = (1 + sqrt2(5)) / 2;
function* circleVogelSpiral(circle, opts = {}) {
  const maxPoints = opts.maxPoints ?? 5e3;
  const density = opts.density ?? 0.95;
  const rotationOffset = opts.rotation ?? 0;
  const c = toPositioned(circle ?? {
    radius: 1,
    x: 0,
    y: 0
  });
  const max4 = c.radius;
  let spacing = c.radius * scale(density, 0, 1, 0.3, 0.01);
  if (opts.spacing) spacing = opts.spacing;
  let radius = 0;
  let count3 = 0;
  let angle = 0;
  while (count3 < maxPoints && radius < max4) {
    radius = spacing * count3 ** 0.5;
    angle = rotationOffset + count3 * 2 * pi2 / goldenSection;
    yield Object.freeze({
      x: c.x + radius * cos2(angle),
      y: c.y + radius * sin2(angle)
    });
    count3++;
  }
}
function* circleRings(circle, opts = {}) {
  const rings = opts.rings ?? 5;
  const c = toPositioned(circle ?? {
    radius: 1,
    x: 0,
    y: 0
  });
  const ringR = 1 / rings;
  const rotationOffset = opts.rotation ?? 0;
  let ringCount = 1;
  yield Object.freeze({
    x: c.x,
    y: c.y
  });
  for (let r = ringR; r <= 1; r += ringR) {
    const n = Math.round(pi2 / asin(1 / (2 * ringCount)));
    for (const theta of linearSpace(0, piPi$1, n + 1)) yield Object.freeze({
      x: c.x + r * cos2(theta + rotationOffset) * c.radius,
      y: c.y + r * sin2(theta + rotationOffset) * c.radius
    });
    ringCount++;
  }
}
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
  const offset$1 = 2 / samples;
  const s = sphere ?? {
    x: 0,
    y: 0,
    z: 0,
    radius: 1
  };
  for (let index = 0; index < samples; index++) {
    const y = index * offset$1 - 1 + offset$1 / 2;
    const r = sqrt2(1 - pow2(y, 2));
    const a = (index + 1) % samples * goldenAngle + rotationRadians;
    const x = cos2(a) * r;
    const z = sin2(a) * r;
    yield Object.freeze({
      x: s.x + x * s.radius,
      y: s.y + y * s.radius,
      z: s.z + z * s.radius
    });
  }
}
var angles = (t2) => {
  guard(t2);
  return [
    angleRadian(t2.a, t2.b),
    angleRadian(t2.b, t2.c),
    angleRadian(t2.c, t2.a)
  ];
};
var anglesDegrees = (t2) => {
  guard(t2);
  return radianToDegree(angles(t2));
};
var edges2 = (t2) => {
  guard(t2);
  return joinPointsToLines(t2.a, t2.b, t2.c, t2.a);
};
var area$3 = (t2) => {
  guard(t2, `t`);
  const lengths$2 = edges2(t2).map((l) => length(l));
  const p = (lengths$2[0] + lengths$2[1] + lengths$2[2]) / 2;
  return Math.sqrt(p * (p - lengths$2[0]) * (p - lengths$2[1]) * (p - lengths$2[2]));
};
var barycentricCoord = (t2, a, b) => {
  const pt = getPointParameter(a, b);
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
  guard(t2);
  const { a, b, c } = t2;
  const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
  const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
  if (a.z && b.z && c.z) {
    const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
    return Object.freeze({
      x,
      y,
      z
    });
  } else return Object.freeze({
    x,
    y
  });
};
var bbox = (t2, inflation = 0) => {
  const { a, b, c } = t2;
  const xMin = Math.min(a.x, b.x, c.x) - inflation;
  const xMax = Math.max(a.x, b.x, c.x) + inflation;
  const yMin = Math.min(a.y, b.y, c.y) - inflation;
  const yMax = Math.max(a.y, b.y, c.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var corners = (t2) => {
  guard(t2);
  return [
    t2.a,
    t2.b,
    t2.c
  ];
};
var fromRadius = (origin, radius, opts = {}) => {
  resultThrow(numberTest(radius, `positive`, `radius`));
  guard$1(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles$1 = [
    initialAngleRadian,
    initialAngleRadian + piPi2 * 1 / 3,
    initialAngleRadian + piPi2 * 2 / 3
  ];
  const points = angles$1.map((a) => toCartesian(radius, a, origin));
  return fromPoints(points);
};
var fromFlatArray = (coords) => {
  if (!Array.isArray(coords)) throw new Error(`coords expected as array`);
  if (coords.length !== 6) throw new Error(`coords array expected with 6 elements. Got ${coords.length}`);
  return fromPoints(fromNumbers(...coords));
};
var fromPoints = (points) => {
  if (!Array.isArray(points)) throw new Error(`points expected as array`);
  if (points.length !== 3) throw new Error(`points array expected with 3 elements. Got ${points.length}`);
  const t2 = {
    a: points[0],
    b: points[1],
    c: points[2]
  };
  return t2;
};
var perimeter$3 = (t2) => {
  guard(t2);
  return edges2(t2).reduce((accumulator, v) => accumulator + length(v), 0);
};
var innerCircle = (t2) => {
  const c = centroid(t2);
  const p = perimeter$3(t2) / 2;
  const a = area$3(t2);
  const radius = a / p;
  return {
    radius,
    ...c
  };
};
var intersectsPoint$1 = (t2, a, b) => {
  const box = bbox(t2);
  const pt = getPointParameter(a, b);
  if (!intersectsPoint(box, pt)) return false;
  const bc = barycentricCoord(t2, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};
var lengths = (t2) => {
  guard(t2);
  return [
    distance2(t2.a, t2.b),
    distance2(t2.b, t2.c),
    distance2(t2.c, t2.a)
  ];
};
var isEquilateral = (t2) => {
  guard(t2);
  const [a, b, c] = lengths(t2);
  return a === b && b === c;
};
var isIsosceles = (t2) => {
  const [a, b, c] = lengths(t2);
  if (a === b) return true;
  if (b === c) return true;
  if (c === a) return true;
  return false;
};
var isRightAngle = (t2) => angles(t2).includes(Math.PI / 2);
var isOblique = (t2) => !isRightAngle(t2);
var isAcute = (t2) => !angles(t2).some((v) => v >= Math.PI / 2);
var isObtuse = (t2) => angles(t2).some((v) => v > Math.PI / 2);
var apply = (t2, fn) => Object.freeze({
  ...t2,
  a: fn(t2.a, `a`),
  b: fn(t2.b, `b`),
  c: fn(t2.c, `c`)
});
var outerCircle = (t2) => {
  const [a, b, c] = edges2(t2).map((l) => length(l));
  const cent = centroid(t2);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};
var rotate$1 = (triangle, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return triangle;
  if (origin === void 0) origin = centroid(triangle);
  return Object.freeze({
    ...triangle,
    a: rotate(triangle.a, amountRadian, origin),
    b: rotate(triangle.b, amountRadian, origin),
    c: rotate(triangle.c, amountRadian, origin)
  });
};
var rotateByVertex = (triangle, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle.a : vertex === `b` ? triangle.b : triangle.c;
  return Object.freeze({
    a: rotate(triangle.a, amountRadian, origin),
    b: rotate(triangle.b, amountRadian, origin),
    c: rotate(triangle.c, amountRadian, origin)
  });
};
var toFlatArray = (t2) => {
  guard(t2);
  return [
    t2.a.x,
    t2.a.y,
    t2.b.x,
    t2.b.y,
    t2.c.x,
    t2.c.y
  ];
};
var equilateral_exports = {};
__export2(equilateral_exports, {
  area: () => area$2,
  centerFromA: () => centerFromA,
  centerFromB: () => centerFromB,
  centerFromC: () => centerFromC,
  circumcircle: () => circumcircle$2,
  fromCenter: () => fromCenter$1,
  height: () => height$2,
  incircle: () => incircle$2,
  perimeter: () => perimeter$2
});
var pi4over3 = Math.PI * 4 / 3;
var pi2over3 = Math.PI * 2 / 3;
var resolveLength = (t2) => {
  if (typeof t2 === `number`) return t2;
  return t2.length;
};
var fromCenter$1 = (t2, origin, rotationRad) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const r = resolveLength(t2) / Math.sqrt(3);
  const rot = rotationRad ?? Math.PI * 1.5;
  const b = {
    x: r * Math.cos(rot) + origin.x,
    y: r * Math.sin(rot) + origin.y
  };
  const a = {
    x: r * Math.cos(rot + pi4over3) + origin.x,
    y: r * Math.sin(rot + pi4over3) + origin.y
  };
  const c = {
    x: r * Math.cos(rot + pi2over3) + origin.x,
    y: r * Math.sin(rot + pi2over3) + origin.y
  };
  return Object.freeze({
    a,
    b,
    c
  });
};
var centerFromA = (t2, ptA) => {
  if (!ptA) ptA = Object.freeze({
    x: 0,
    y: 0
  });
  const r = resolveLength(t2);
  const { radius } = incircle$2(t2);
  return {
    x: ptA.x + r / 2,
    y: ptA.y - radius
  };
};
var centerFromB = (t2, ptB) => {
  if (!ptB) ptB = Object.freeze({
    x: 0,
    y: 0
  });
  const { radius } = incircle$2(t2);
  return {
    x: ptB.x,
    y: ptB.y + radius * 2
  };
};
var centerFromC = (t2, ptC) => {
  if (!ptC) ptC = Object.freeze({
    x: 0,
    y: 0
  });
  const r = resolveLength(t2);
  const { radius } = incircle$2(t2);
  return {
    x: ptC.x - r / 2,
    y: ptC.y - radius
  };
};
var height$2 = (t2) => Math.sqrt(3) / 2 * resolveLength(t2);
var perimeter$2 = (t2) => resolveLength(t2) * 3;
var area$2 = (t2) => Math.pow(resolveLength(t2), 2) * Math.sqrt(3) / 4;
var circumcircle$2 = (t2) => ({ radius: Math.sqrt(3) / 3 * resolveLength(t2) });
var incircle$2 = (t2) => ({ radius: Math.sqrt(3) / 6 * resolveLength(t2) });
var right_exports = {};
__export2(right_exports, {
  adjacentFromHypotenuse: () => adjacentFromHypotenuse,
  adjacentFromOpposite: () => adjacentFromOpposite,
  angleAtPointA: () => angleAtPointA,
  angleAtPointB: () => angleAtPointB,
  area: () => area$1,
  circumcircle: () => circumcircle$1,
  fromA: () => fromA$1,
  fromB: () => fromB$1,
  fromC: () => fromC$1,
  height: () => height$1,
  hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
  hypotenuseFromOpposite: () => hypotenuseFromOpposite,
  hypotenuseSegments: () => hypotenuseSegments,
  incircle: () => incircle$1,
  medians: () => medians$1,
  oppositeFromAdjacent: () => oppositeFromAdjacent,
  oppositeFromHypotenuse: () => oppositeFromHypotenuse,
  perimeter: () => perimeter$1,
  resolveLengths: () => resolveLengths
});
var fromA$1 = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height$1(t2);
  const a = {
    x: origin.x,
    y: origin.y
  };
  const b = {
    x: origin.x + tt.hypotenuse,
    y: origin.y
  };
  const c = {
    x: origin.x + seg[1],
    y: origin.y - h
  };
  return {
    a,
    b,
    c
  };
};
var fromB$1 = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height$1(t2);
  const b = {
    x: origin.x,
    y: origin.y
  };
  const a = {
    x: origin.x - tt.hypotenuse,
    y: origin.y
  };
  const c = {
    x: origin.x - seg[0],
    y: origin.y - h
  };
  return {
    a,
    b,
    c
  };
};
var fromC$1 = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const seg = hypotenuseSegments(t2);
  const h = height$1(t2);
  const c = {
    x: origin.x,
    y: origin.y
  };
  const a = {
    x: origin.x - seg[1],
    y: origin.y + h
  };
  const b = {
    x: origin.x + seg[0],
    y: origin.y + h
  };
  return {
    a,
    b,
    c
  };
};
var resolveLengths = (t2) => {
  const a = t2.adjacent;
  const o = t2.opposite;
  const h = t2.hypotenuse;
  if (a !== void 0 && o !== void 0) return {
    ...t2,
    adjacent: a,
    opposite: o,
    hypotenuse: Math.hypot(a, o)
  };
  else if (a && h) return {
    ...t2,
    adjacent: a,
    hypotenuse: h,
    opposite: h * h - a * a
  };
  else if (o && h) return {
    ...t2,
    hypotenuse: h,
    opposite: o,
    adjacent: h * h - o * o
  };
  else if (t2.opposite && t2.hypotenuse && t2.adjacent) return t2;
  throw new Error(`Missing at least two edges`);
};
var height$1 = (t2) => {
  const tt = resolveLengths(t2);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return Math.sqrt(p * q);
};
var hypotenuseSegments = (t2) => {
  const tt = resolveLengths(t2);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return [p, q];
};
var perimeter$1 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.adjacent + tt.hypotenuse + tt.opposite;
};
var area$1 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.opposite * tt.adjacent / 2;
};
var angleAtPointA = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos((tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse));
};
var angleAtPointB = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos((tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse));
};
var medians$1 = (t2) => {
  const tt = resolveLengths(t2);
  const b = tt.adjacent * tt.adjacent;
  const c = tt.hypotenuse * tt.hypotenuse;
  const a = tt.opposite * tt.opposite;
  return [
    Math.sqrt(2 * (b + c) - a) / 2,
    Math.sqrt(2 * (c + a) - b) / 2,
    Math.sqrt(2 * (a + b) - c) / 2
  ];
};
var circumcircle$1 = (t2) => {
  const tt = resolveLengths(t2);
  return { radius: tt.hypotenuse / 2 };
};
var incircle$1 = (t2) => {
  const tt = resolveLengths(t2);
  return { radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2 };
};
var oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
var oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
var adjacentFromHypotenuse = (angleRadian$2, hypotenuse) => Math.cos(angleRadian$2) * hypotenuse;
var adjacentFromOpposite = (angleRadian$2, opposite) => opposite / Math.tan(angleRadian$2);
var hypotenuseFromOpposite = (angleRadian$2, opposite) => opposite / Math.sin(angleRadian$2);
var hypotenuseFromAdjacent = (angleRadian$2, adjacent) => adjacent / Math.cos(angleRadian$2);
var isosceles_exports = {};
__export2(isosceles_exports, {
  apexAngle: () => apexAngle,
  area: () => area,
  baseAngle: () => baseAngle,
  circumcircle: () => circumcircle,
  fromA: () => fromA,
  fromB: () => fromB,
  fromC: () => fromC,
  fromCenter: () => fromCenter,
  height: () => height,
  incircle: () => incircle,
  legHeights: () => legHeights,
  medians: () => medians,
  perimeter: () => perimeter
});
var baseAngle = (t2) => Math.acos(t2.base / (2 * t2.legs));
var apexAngle = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.acos((2 * aa - cc) / (2 * aa));
};
var height = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.sqrt((4 * aa - cc) / 4);
};
var legHeights = (t2) => {
  const b = baseAngle(t2);
  return t2.base * Math.sin(b);
};
var perimeter = (t2) => 2 * t2.legs + t2.base;
var area = (t2) => {
  const h = height(t2);
  return h * t2.base / 2;
};
var circumcircle = (t2) => {
  const h = height(t2);
  const hh = h * h;
  const cc = t2.base * t2.base;
  return { radius: (4 * hh + cc) / (8 * h) };
};
var incircle = (t2) => {
  const h = height(t2);
  return { radius: t2.base * h / (2 * t2.legs + t2.base) };
};
var medians = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  const medianAB = Math.sqrt(aa + 2 * cc) / 2;
  const medianC = Math.sqrt(4 * aa - cc) / 2;
  return [
    medianAB,
    medianAB,
    medianC
  ];
};
var fromCenter = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const h = height(t2);
  const incircleR = incircle(t2).radius;
  const verticalToApex = h - incircleR;
  const a = {
    x: origin.x - t2.base / 2,
    y: origin.y + incircleR
  };
  const b = {
    x: origin.x + t2.base / 2,
    y: origin.y + incircleR
  };
  const c = {
    x: origin.x,
    y: origin.y - verticalToApex
  };
  return {
    a,
    b,
    c
  };
};
var fromA = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const h = height(t2);
  const a = {
    x: origin.x,
    y: origin.y
  };
  const b = {
    x: origin.x + t2.base,
    y: origin.y
  };
  const c = {
    x: origin.x + t2.base / 2,
    y: origin.y - h
  };
  return {
    a,
    b,
    c
  };
};
var fromB = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const h = height(t2);
  const b = {
    x: origin.x,
    y: origin.y
  };
  const a = {
    x: origin.x - t2.base,
    y: origin.y
  };
  const c = {
    x: origin.x - t2.base / 2,
    y: origin.y - h
  };
  return {
    a,
    b,
    c
  };
};
var fromC = (t2, origin) => {
  if (!origin) origin = Object.freeze({
    x: 0,
    y: 0
  });
  const h = height(t2);
  const c = {
    x: origin.x,
    y: origin.y
  };
  const a = {
    x: origin.x - t2.base / 2,
    y: origin.y + h
  };
  const b = {
    x: origin.x + t2.base / 2,
    y: origin.y + h
  };
  return {
    a,
    b,
    c
  };
};
var triangle_exports = {};
__export2(triangle_exports, {
  Empty: () => Empty$1,
  Equilateral: () => equilateral_exports,
  Isosceles: () => isosceles_exports,
  Placeholder: () => Placeholder$1,
  Right: () => right_exports,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply,
  area: () => area$3,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox,
  centroid: () => centroid,
  corners: () => corners,
  edges: () => edges2,
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray,
  fromPoints: () => fromPoints,
  fromRadius: () => fromRadius,
  guard: () => guard,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint$1,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty$12,
  isEqual: () => isEqual$1,
  isEquilateral: () => isEquilateral,
  isIsosceles: () => isIsosceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder$1,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter$3,
  rotate: () => rotate$1,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray
});

// src/client/poses/landmarks.ts
var posePoints = ["nose", "left_eye_inner", "left_eye", "left_eye_outer", "right_eye_inner", "right_eye", "right_eye_outer", "left_ear", "right_ear", "mouth_left", "mouth_right", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_pinky", "right_pinky", "left_index", "right_index", "left_thumb", "right_thumb", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle", "left_heel", "right_heel", "left_foot_index", "right_foot_index"];
var footRightIndexes = [27, 29, 31];
var footLeftIndexes = [28, 30, 32];
var armRightIndexes = [12, 14, 16];
var armHandRightIndexes = [16, 18, 20, 22];
var armLeftIndexes = [11, 13, 15];
var armHandLeftIndexes = [15, 17, 19, 21];
var faceIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 9];
var torsoIndexes = [12, 11, 23, 24];
var legLeftIndexes = [23, 25, 27];
var legRightIndexes = [24, 26, 28];
var getLandmarkIndexByName = (name) => {
  for (let i = 0; i < posePoints.length; i++) {
    if (posePoints[i] === name) return i;
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
  const withCentroids = poses.map((p) => ({
    ...p,
    centroid: centroid2(p)
  }));
  withCentroids.sort((a, b) => a.centroid.x - b.centroid.x);
  return withCentroids;
};
var centroid2 = (pose) => point_exports.centroid(...pose.landmarks);
var centroidWorld = (pose) => point_exports.centroid(...pose.world);
var lineBetween = (pose, a, b) => {
  if (pose === void 0) throw new TypeError(`Param 'pose' is undefined. Expected PoseData`);
  if (a === void 0) throw new TypeError(`Param 'a' is undefined, expected landmark name or index.`);
  if (b === void 0) throw new TypeError(`Param 'b' is undefined, expected landmark name or index.`);
  const ptA = getLandmark(pose, a);
  const ptB = getLandmark(pose, b);
  if (ptA === void 0) return;
  if (ptB === void 0) return;
  return Object.freeze({
    a: ptA,
    b: ptB
  });
};
var roughCenter = (pose) => {
  if (pose === void 0) throw new Error(`Param 'pose' is undefined. Expected PoseData`);
  const a = lineBetween(pose, `left_shoulder`, `right_hip`);
  const b = lineBetween(pose, `right_shoulder`, `left_hip`);
  if (a === void 0) return;
  if (b === void 0) return;
  const halfA = line_exports.interpolate(0.5, a);
  const halfB = line_exports.interpolate(0.5, b);
  const sum3 = point_exports.sum(halfA, halfB);
  return point_exports.divide(sum3, 2, 2);
};

// node_modules/ixfx/bundle/arrays.js
var sortByNumericProperty2 = (data, propertyName) => [...data].sort((a, b) => {
  resultThrow(arrayTest(data, `data`));
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});

// node_modules/ixfx/bundle/numbers.js
var clamp3 = (value2, min$12 = 0, max$12 = 1) => {
  if (Number.isNaN(value2)) throw new Error(`Param 'value' is NaN`);
  if (Number.isNaN(min$12)) throw new Error(`Param 'min' is NaN`);
  if (Number.isNaN(max$12)) throw new Error(`Param 'max' is NaN`);
  if (value2 < min$12) return min$12;
  if (value2 > max$12) return max$12;
  return value2;
};
var clamper2 = (min$12 = 0, max$12 = 1) => {
  if (Number.isNaN(min$12)) throw new Error(`Param 'min' is NaN`);
  if (Number.isNaN(max$12)) throw new Error(`Param 'max' is NaN`);
  return (v) => {
    if (v > max$12) return max$12;
    if (v < min$12) return min$12;
    return v;
  };
};
var bipolar_exports2 = {};
__export2(bipolar_exports2, {
  clamp: () => clamp$13,
  fromScalar: () => fromScalar2,
  immutable: () => immutable3,
  scale: () => scale$2,
  scaleUnclamped: () => scaleUnclamped2,
  toScalar: () => toScalar2,
  towardZero: () => towardZero2
});
var immutable3 = (startingValueOrBipolar = 0) => {
  if (typeof startingValueOrBipolar === `undefined`) throw new Error(`Start value is undefined`);
  const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
  if (startingValue > 1) throw new Error(`Start value cannot be larger than 1`);
  if (startingValue < -1) throw new Error(`Start value cannot be smaller than -1`);
  if (Number.isNaN(startingValue)) throw new Error(`Start value is NaN`);
  const v = startingValue;
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === `number`) return v;
      else if (hint === `string`) return v.toString();
      return true;
    },
    value: v,
    towardZero: (amt) => {
      return immutable3(towardZero2(v, amt));
    },
    add: (amt) => {
      return immutable3(clamp$13(v + amt));
    },
    multiply: (amt) => {
      return immutable3(clamp$13(v * amt));
    },
    inverse: () => {
      return immutable3(-v);
    },
    interpolate: (amt, b) => {
      return immutable3(clamp$13(interpolate(amt, v, b)));
    },
    asScalar: (max$12 = 1, min$12 = 0) => {
      return toScalar2(v, max$12, min$12);
    }
  };
};
var toScalar2 = (bipolarValue, max$12 = 1, min$12 = 0) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Expected v to be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`Parameter is NaN`);
  return scale(bipolarValue, -1, 1, min$12, max$12);
};
var fromScalar2 = (scalarValue) => {
  resultThrow(numberTest(scalarValue, `percentage`, `v`));
  return scalarValue * 2 - 1;
};
var scale$2 = (inputValue, inMin, inMax) => {
  return clamp$13(scaler(inMin, inMax, -1, 1)(inputValue));
};
var scaleUnclamped2 = (inputValue, inMin, inMax) => {
  return scaler(inMin, inMax, -1, 1)(inputValue);
};
var clamp$13 = (bipolarValue) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Param 'bipolarValue' must be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`Param 'bipolarValue' is NaN`);
  if (bipolarValue > 1) return 1;
  if (bipolarValue < -1) return -1;
  return bipolarValue;
};
var towardZero2 = (bipolarValue, amount) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Parameter 'v' must be a number. Got: ${typeof bipolarValue}`);
  if (typeof amount !== `number`) throw new Error(`Parameter 'amt' must be a number. Got: ${typeof amount}`);
  if (amount < 0) throw new Error(`Parameter 'amt' must be positive`);
  if (bipolarValue < 0) {
    bipolarValue += amount;
    if (bipolarValue > 0) bipolarValue = 0;
  } else if (bipolarValue > 0) {
    bipolarValue -= amount;
    if (bipolarValue < 0) bipolarValue = 0;
  }
  return bipolarValue;
};
var piPi3 = Math.PI * 2;
var PiPi2 = Math.PI * 2;
var scale$12 = (v, inMin, inMax, outMin, outMax, easing) => scaler$1(inMin, inMax, outMin, outMax, easing)(v);
var scaler$1 = (inMin, inMax, outMin, outMax, easing, clamped) => {
  resultThrow(numberTest(inMin, `finite`, `inMin`), numberTest(inMax, `finite`, `inMax`));
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  const clampFunction = clamped ? clamper2(outMin, outMax) : void 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a = easing(a);
    const x = a * (oMax - oMin) + oMin;
    if (clampFunction) return clampFunction(x);
    return x;
  };
};
var numberArrayCompute2 = (data, opts = {}) => {
  if (data.length === 0) return {
    total: NaN,
    min: NaN,
    max: NaN,
    avg: NaN,
    count: NaN
  };
  const nonNumbers = opts.nonNumbers ?? `throw`;
  let total$1 = 0;
  let min$12 = Number.MAX_SAFE_INTEGER;
  let max$12 = Number.MIN_SAFE_INTEGER;
  let count$1 = 0;
  for (let index = 0; index < data.length; index++) {
    let value2 = data[index];
    if (typeof value2 !== `number`) {
      if (nonNumbers === `ignore`) continue;
      if (nonNumbers === `throw`) throw new Error(`Param 'data' contains a non-number at index: ${index.toString()}`);
      if (nonNumbers === `nan`) value2 = NaN;
    }
    if (Number.isNaN(value2)) continue;
    if (value2 !== void 0) {
      min$12 = Math.min(min$12, value2);
      max$12 = Math.max(max$12, value2);
      total$1 += value2;
      count$1++;
    }
  }
  return {
    total: total$1,
    max: max$12,
    min: min$12,
    count: count$1,
    avg: total$1 / count$1
  };
};
var normalise_exports2 = {};
__export2(normalise_exports2, {
  array: () => array3,
  arrayWithContext: () => arrayWithContext2,
  stream: () => stream2,
  streamWithContext: () => streamWithContext2
});
var streamWithContext2 = (minDefault, maxDefault) => {
  let min$12 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max$12 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  resultThrow(numberTest(min$12), numberTest(max$12));
  return {
    seen: (v) => {
      resultThrow(numberTest(v));
      min$12 = Math.min(min$12, v);
      max$12 = Math.max(max$12, v);
      return scale$12(v, min$12, max$12);
    },
    reset: (minDefault$1, maxDefault$1) => {
      min$12 = minDefault$1 ?? Number.MAX_SAFE_INTEGER;
      max$12 = maxDefault$1 ?? Number.MIN_SAFE_INTEGER;
    },
    get min() {
      return min$12;
    },
    get max() {
      return max$12;
    },
    get range() {
      return Math.abs(max$12 - min$12);
    }
  };
};
var stream2 = (minDefault, maxDefault) => {
  const c = streamWithContext2(minDefault, maxDefault);
  return c.seen;
};
var arrayWithContext2 = (values2, minForced, maxForced) => {
  if (!Array.isArray(values2)) throw new TypeError(`Param 'values' should be an array. Got: ${typeof values2}`);
  const mma = numberArrayCompute2(values2);
  const min$12 = minForced ?? mma.min;
  const max$12 = maxForced ?? mma.max;
  return {
    values: values2.map((v) => clamp3(scale$12(v, min$12, max$12))),
    original: values2,
    min: min$12,
    max: max$12,
    range: Math.abs(max$12 - min$12)
  };
};
var array3 = (values2, minForced, maxForced) => {
  const c = arrayWithContext2(values2, minForced, maxForced);
  return c.values;
};

// src/client/poses/pose-tracker.ts
var PoseTracker = class {
  #fromId;
  #poseId;
  #guid;
  #seen = 0;
  #boxNormalised;
  #boxWorld;
  #data;
  #normalisedLandmarks;
  #worldLandmarks;
  #hue;
  #zNormalisedRange = { count: 0, min: 0, max: 0, avg: 0, total: 0 };
  #zWorldRange = { count: 0, min: 0, max: 0, avg: 0, total: 0 };
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
      storeIntermediate: false,
      ...options
    };
    this.#normalisedLandmarks = new PointsTracker(opts);
    this.#worldLandmarks = new PointsTracker(opts);
  }
  /**
   * Reset stored data for the tracker
   */
  reset() {
    this.#normalisedLandmarks.reset();
    this.#worldLandmarks.reset();
  }
  /**
   * Returns a [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) for a given
   * normalised landmark by name or index.
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
      return this.#normalisedLandmarks.get(getLandmarkNameByIndex(nameOrIndex));
    } else {
      return this.#normalisedLandmarks.get(nameOrIndex);
    }
  }
  /**
  * Returns a [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) for a given
  * normalised landmark by name or index.
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
  worldLandmark(nameOrIndex) {
    if (nameOrIndex === void 0) throw new TypeError(`Param 'nameOrIndex' is undefined. Expected landmark name or numerical index`);
    if (typeof nameOrIndex === `number`) {
      return this.#worldLandmarks.get(getLandmarkNameByIndex(nameOrIndex));
    } else {
      return this.#worldLandmarks.get(nameOrIndex);
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
    const name = typeof nameOrIndex === `string` ? nameOrIndex : getLandmarkNameByIndex(nameOrIndex);
    const t2 = this.#normalisedLandmarks.get(name);
    if (t2 === void 0) throw new Error(`Point '${name}' is not tracked`);
    const pt = t2.last;
    if (pt === void 0) throw new Error(`No data for point '${name}'`);
    return pt;
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
  worldLandmarkValue(nameOrIndex) {
    if (nameOrIndex === void 0) throw new TypeError(`Param 'nameOrIndex' is undefined. Expected landmark name or numerical index`);
    const name = typeof nameOrIndex === `string` ? nameOrIndex : getLandmarkNameByIndex(nameOrIndex);
    const t2 = this.#worldLandmarks.get(name);
    if (t2 === void 0) throw new Error(`Point '${name}' is not tracked`);
    const pt = t2.last;
    if (pt === void 0) throw new Error(`No data for point '${name}'`);
    return pt;
  }
  /**
   * Update this pose with new information
   * @param pose 
   */
  seen(pose) {
    this.#seen = Date.now();
    this.#data = pose;
    let zNormalisedValues = [];
    let zWorldValues = [];
    for (let i = 0; i < pose.landmarks.length; i++) {
      const lm = pose.landmarks[i];
      zNormalisedValues.push(lm.z);
      const name = getLandmarkNameByIndex(i);
      this.#normalisedLandmarks.seen(name, lm);
    }
    for (let i = 0; i < pose.world.length; i++) {
      const lm = pose.landmarks[i];
      zWorldValues.push(lm.z);
      const name = getLandmarkNameByIndex(i);
      this.#worldLandmarks.seen(name, lm);
    }
    this.#zNormalisedRange = numberArrayCompute2(zNormalisedValues);
    this.#zWorldRange = numberArrayCompute2(zWorldValues);
  }
  /**
   * Returns all the [PointTrackers](https://api.ixfx.fun/_ixfx/geometry/PointTracker/) (ie. landmark) for this pose.
   * 
   * ```js
   * for (const pt of pose.landmarks()) {
   *  // Do something with 'pt' (which tracks one individual landmark)
   * }
   * ```
   * 
   * Or provide a list of landmark indexes or name:
   * ```js
   * // Get landmarks for right arm
   * for (const pt of pose.landmarks(11, 13, 15)) {
   * }
   * ```
   */
  *landmarks(...namesOrIds) {
    if (namesOrIds.length > 0) {
      for (const ni of namesOrIds) {
        const l = this.landmark(ni);
        if (l) yield l;
      }
    } else {
      yield* this.#worldLandmarks.store.values();
    }
  }
  *worldLandmarks(...namesOrIds) {
    if (namesOrIds.length > 0) {
      for (const ni of namesOrIds) {
        const l = this.worldLandmark(ni);
        if (l) yield l;
      }
    } else {
      yield* this.#worldLandmarks.store.values();
    }
  }
  /**
   * Returns the raw landmarks
   * 
   * ```js
   * for (const kp of pose.landmarkValues()) {
   *  // { x, y, z?, score, name }
   * }
   * ```
   */
  *landmarkValues(...namesOrIds) {
    if (namesOrIds.length > 0) {
      for (const ni of namesOrIds) {
        const pt = this.landmark(ni);
        if (pt) yield pt.last;
      }
    } else {
      for (const v of this.#normalisedLandmarks.store.values()) {
        yield v.last;
      }
    }
  }
  *worldLandmarkValues(...namesOrIds) {
    if (namesOrIds.length > 0) {
      for (const ni of namesOrIds) {
        const pt = this.landmark(ni);
        if (pt) yield pt.last;
      }
    } else {
      for (const v of this.#worldLandmarks.store.values()) {
        yield v.last;
      }
    }
  }
  /**
   * Returns the 2D centroid of all the pose points (uses normalised landmarks)
   * ```js
   * pose.centroid(); // { x, y }
   * ```
   * 
   * Or you can pass in the names/indexes of landmarks:
   * ```js
   * pose.centroid(`left_shoulder`, `right_shoulder`);
   * ```
   * 
   * Returns `{ x: 0.5, y: 0.5 }` is data is missing
   */
  centroid(...namesOrIds) {
    if (!this.#data) return { x: 0.5, y: 0.5 };
    if (namesOrIds.length === 0) {
      return centroid2(this.#data);
    } else {
      const pts = [...this.landmarkValues(...namesOrIds)];
      return point_exports.centroid(...pts);
    }
  }
  /**
   * Returns PointTrackers, sorted by their last X value
   * @param namesOrIds 
   * @returns 
   */
  getSortedByX(...namesOrIds) {
    const lm = [...this.landmarks(...namesOrIds)];
    if (lm.length === 0) throw new Error(`No landmarks found per filter`);
    return sortByNumericProperty2(lm, `x`);
  }
  /**
   * Gets the leftmost (by camera frame coords) of any of the listed landmarks
   * 
   * Eg get whichever wrist is the most left of the camera frame
   * ```js
   * pose.getLeftmost(`left_wrist`,`right_wrist`);
   * ```
   * @param namesOrIds 
   * @returns 
   */
  getLeftmost(...namesOrIds) {
    const s = this.getSortedByX(...namesOrIds);
    if (s.length === 0) throw new Error(`No landmarks found per filter`);
    return s[0];
  }
  /**
   * Gets the rightmost (by camera frame coords) of any of the listed landmarks
   * 
   * Eg get whichever wrist is the most right of the camera frame
   * ```js
   * pose.getRightmost(`left_wrist`,`right_wrist`);
   * ```
   * @param namesOrIds 
   * @returns 
   */
  getRightmost(...namesOrIds) {
    const s = this.getSortedByX(...namesOrIds);
    if (s.length === 0) throw new Error(`No landmarks found per filter`);
    return s[s.length - 1];
  }
  /**
   * Gets the highest (by camera frame coords) of any of the listed landmarks
   * 
   * Eg get whichever wrist is the highest in the camera frame
   * ```js
   * pose.getHighest(`left_wrist`,`right_wrist`);
   * ```
   * @param namesOrIds 
   * @returns 
   */
  getHighest(...namesOrIds) {
    const s = this.getSortedByY(...namesOrIds);
    if (s.length === 0) throw new Error(`No landmarks found per filter`);
    return s[0];
  }
  /**
   * Returns landmarks in order of distance from the given point.
   * 
   * The point should be the same coordinates as poses.
   * @param point Point to compare to
   * @param use2d If _true_, Z coordinate is ignored.
   */
  getByDistanceFromPoint(point2, use2d = true) {
    const withDistance = [...this.landmarks()].map((lm) => {
      return {
        distance: use2d ? point_exports.distance2d(lm.last, point2) : point_exports.distance(lm.last, point2),
        landmark: lm,
        raw: lm.last
      };
    });
    withDistance.sort((a, b) => {
      return a.distance - b.distance;
    });
    return withDistance;
  }
  /**
   * Returns the closest landmark to `point`
   * @param point 
   * @param use2d If _true_ only x,y coordinates are used for distance calculation
   * @returns 
   */
  getClosestLandmarkToPoint(point2, use2d) {
    const sorted = this.getByDistanceFromPoint(point2, use2d);
    if (sorted.length === 0) return;
    return sorted[0].landmark;
  }
  /**
   * Gets the lowest (by camera frame coords) of any of the listed landmarks
   * 
   * Eg get whichever wrist is the lowest in the camera frame
   * ```js
   * pose.getLowest(`left_wrist`,`right_wrist`);
   * ```
   * @param namesOrIds 
   * @returns 
   */
  getLowest(...namesOrIds) {
    const s = this.getSortedByX(...namesOrIds);
    if (s.length === 0) throw new Error(`No landmarks found per filter`);
    return s[s.length - 1];
  }
  /**
   * Gets the nearest (by camera frame coords) of any of the listed landmarks
   * 
   * Eg get whichever wrist is the nearest in the camera frame
   * ```js
   * pose.getNearest(`left_wrist`,`right_wrist`);
   * ```
   * @param namesOrIds 
   * @returns 
   */
  getNearest(...namesOrIds) {
    const s = this.getSortedByZ(...namesOrIds);
    if (s.length === 0) throw new Error(`No landmarks found per filter`);
    return s[0];
  }
  /**
   * Gets the furtherest (by camera frame coords) of any of the listed landmarks
   * 
   * Eg get whichever wrist is the furtherest in the camera frame
   * ```js
   * pose.getFurtherest(`left_wrist`,`right_wrist`);
   * ```
   * @param namesOrIds 
   * @returns 
   */
  getFurtherest(...namesOrIds) {
    const s = this.getSortedByZ(...namesOrIds);
    if (s.length === 0) throw new Error(`No landmarks found per filter`);
    return s[s.length - 1];
  }
  /**
   * Returns PointTrackers, sorted by their last Y value
   * @param namesOrIds 
   * @returns 
   */
  getSortedByY(...namesOrIds) {
    const lm = [...this.landmarks(...namesOrIds)];
    if (lm.length === 0) throw new Error(`No landmarks found per filter`);
    return sortByNumericProperty2(lm, `y`);
  }
  /**
   * Returns PointTrackers, sorted by their last Z value
   * @param namesOrIds 
   * @returns 
   */
  getSortedByZ(...namesOrIds) {
    const lm = [...this.landmarks(...namesOrIds)];
    if (lm.length === 0) throw new Error(`No landmarks found per filter`);
    return sortByNumericProperty2(lm, `z`);
  }
  /**
   * Gets the bounding box of the pose, computed using the normalised landmarks.
   * ```js
   * pose.box(); // { x, y, width, height }
   * ````
   * 
   * Returns an empty rectangle if there's no data.
   * 
   * You can also provide a list of landmark names/indexes to compute the bounding box
   * for just those:
   * 
   * ```js
   * // Get bounding box of torso
   * pose.box(`left_shoulder`, `right_shoulder`, `left_hip`, `right_`hip`);
   * ```
   * 
   * See also {@link boxWorld} for same behaviour but using world coordinates.
   */
  box(...namesOrIds) {
    if (!this.#data) return rect_exports.EmptyPositioned;
    if (namesOrIds.length === 0) {
      if (this.#boxNormalised) return this.#boxNormalised;
      this.#boxNormalised = point_exports.bbox(...this.#data.landmarks);
      return this.#boxNormalised;
    } else {
      return point_exports.bbox(...this.landmarkValues(...namesOrIds));
    }
  }
  boxWorld(...namesOrIds) {
    if (!this.#data) return rect_exports.EmptyPositioned;
    if (namesOrIds.length === 0) {
      if (this.#boxWorld) return this.#boxWorld;
      this.#boxWorld = point_exports.bbox(...this.#data.world);
      return this.#boxWorld;
    } else {
      return point_exports.bbox(...this.worldLandmarkValues(...namesOrIds));
    }
  }
  /**
   * Returns height of bounding box (normalised coordinates)
   */
  get height() {
    return this.box().height;
  }
  get heightWorld() {
    return this.boxWorld().height;
  }
  /**
   * Return width of bounding box (normalised coordinates)
   */
  get width() {
    return this.box().width;
  }
  get widthWorld() {
    return this.boxWorld().width;
  }
  /**
   * Returns the id of the sender
   */
  get peerId() {
    return this.#fromId;
  }
  /**
   * Returns the middle of the pose bounding box using normalised coordinates
   * ```js
   * pose.middle; // { x, y }
   * ```
   * @returns 
   */
  get middle() {
    const box = this.box();
    if (rect_exports.isEmpty(box)) return point_exports.Empty;
    return rect_exports.center(box);
  }
  get middleWorld() {
    const box = this.boxWorld();
    if (rect_exports.isEmpty(box)) return point_exports.Empty;
    return rect_exports.center(box);
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
   * Gets the min/max Z range of all landmarks (normalised)
   */
  get zRange() {
    return this.#zNormalisedRange;
  }
  /**
   * Gets the min/max Z range of all landmarks (world coordinates)
   */
  get zRangeWorld() {
    return this.#zWorldRange;
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
    trackers.sort((a, b) => a.elapsed - b.elapsed);
    yield* trackers.values();
  }
  /**
   * Enumerates PoseTrackers, sorting by the horizontal middle position.
   * Leftmost pose will be at position 0.
   */
  *getByHorizontal() {
    const trackers = [...this.#data.values()];
    trackers.sort((a, b) => a.middle.x - b.middle.x);
    yield* trackers;
  }
  /**
   * Returns poses in order of distance (as judged by their centroid property)
   * from the given point. Since centroid is 2D, distance is also calculated using x,y only.
   * 
   * The point should be the same coordinates as poses.
   * @param point Point to compare to 
   */
  getByDistanceFromPoint(point2) {
    const withDistance = [...this.#data.values()].map((pt) => {
      return {
        distance: point_exports.distance2d(pt.centroid(), point2),
        tracker: pt
      };
    });
    withDistance.sort((a, b) => {
      return a.distance - b.distance;
    });
    return withDistance;
  }
  /**
   * Returns the closest pose to `point`, as judged by its centroid property
   * @param point 
   * @returns 
   */
  getClosestPoseToPoint(point2) {
    const sorted = this.getByDistanceFromPoint(point2);
    if (sorted.length === 0) return;
    return sorted[0].tracker;
  }
  /**
   * Enumerates PoseTrackers, sorting by the vertical middle position.
   * Highest pose will be at position 0.
   */
  *getByVertical() {
    const trackers = [...this.#data.values()];
    trackers.sort((a, b) => a.middle.y - b.middle.y);
    yield* trackers;
  }
  /**
   * Enumerates PoseTrackers, sorting by the average Z value.
   * Closest pose will be at position 0.
   */
  *getByDistance() {
    const trackers = [...this.#data.values()];
    trackers.sort((a, b) => {
      const az = a.zRange ? a.zRange.avg : 0;
      const bz = b.zRange ? b.zRange.avg : 0;
      return az - bz;
    });
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
    const values2 = [...this.#data.values()];
    for (const tracker of values2) {
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
   * for (const n of poses.landmarkValues(`nose`)) {
   *  // Yields: { x, y, z?, score, name }
   * }
   * ```
   * 
   * @param namesOrIds Name or index of landmark to get data for
   */
  *landmarkValues(...namesOrIds) {
    for (const pose of this.get()) {
      yield* pose.landmarkValues(...namesOrIds);
    }
  }
  /**
   * Enumerates all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark id.
   * 
   * ```js
   * // Return all landmarks for all poses
   * for (const pt of poses.landmarks()) {
   * }
   * ```
   * 
   * eg. to get the PointTracker for 'nose' across all poses currently seen:
   * 
   * ```js
   * for (const pt of poses.landmarks(`nose`)) {
   *  // do something with tracker...
   * }
   * ```
   * 
   * @param namesOrIds List of indexes or landmark names to filter by
   */
  *landmarks(...namesOrIds) {
    for (const tracker of this.get()) {
      yield* tracker.landmarks(...namesOrIds);
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
    const values2 = [...this.#data.values()];
    for (const tracker of values2) {
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
    const set3 = /* @__PURE__ */ new Set();
    const values2 = [...this.#data.values()];
    for (const entry of values2) {
      set3.add(entry.fromId);
    }
    yield* set3.values();
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
   * @param guid Combined id of sender-poseid
   */
  getByGuid(guid) {
    if (!guid) return;
    return this.#data.get(guid);
  }
  /**
   * Returns _true_ if a PoseTracker for `guid` is found.
   * @param guid 
   */
  hasPoseGuid(guid) {
    if (!guid) return false;
    return this.#data.has(guid);
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
   * @param guid Combined sender-pose
   * @returns 
   */
  getRawPoseByGuid(guid) {
    return this.#data.get(guid)?.last;
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