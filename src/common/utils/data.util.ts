/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestedKeyOf } from "react-hm-dynamic-form";
import { createDefu, defu } from "defu";
import { Flatten } from "../types";

export const getValuePath = (paths: string[], obj: Record<string, any>) => {
  const keys = Object.keys(obj);
  if (keys.length) {
    const key = paths[0];
    const newVal = obj[key];
    const newPaths = paths.slice(1, paths.length);
    let tempVal: Record<string, any> | undefined;
    if (!newPaths.length && typeof newVal === "object") {
      return newVal;
    }
    if (
      typeof newVal === "object" &&
      newPaths.length &&
      !Array.isArray(newVal)
    ) {
      tempVal = getValuePath(newPaths, newVal) as Record<string, any>;
    }
    return tempVal;
  }

  return undefined;
};

export const flattenObj = <T extends Record<string, any>>(
  obj: T,
  parent?: string,
  res = {} as any,
  index = 0
): Flatten<T> => {
  // eslint-disable-next-line no-param-reassign
  index += 1;
  if (index > 5) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw "object is too deep, maximum authorized level is 6";
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(obj)) {
    const propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      flattenObj(obj[key], propName, res, index);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

// eslint-disable-next-line consistent-return
export const customMerging = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key])) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = value;

    return true;
  }
});

/**
 * Transform camelCase to kebab-case
 * @see https://stackoverflow.com/a/70226943
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#description
 *
 */
export const camelPascalToKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
