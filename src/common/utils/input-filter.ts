/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import omitDeep from "omit-deep";
import { flattenObj } from "./data.util";

interface IMyConstructor<T extends Record<string, any>> {
  input: any;
  constructor: T;
}

export const inputFilter = <T extends Record<string, any>>(
  param: IMyConstructor<T>
): T => {
  const { input, constructor } = param;
  const flattenInput = flattenObj(input);
  const flattenConstructor = flattenObj(constructor);
  const inputkeys = Object.keys(flattenInput);
  const constructorkeys = Object.keys(flattenConstructor);
  const keys = inputkeys.filter((key) => !constructorkeys.includes(key));
  //   console.log(keys);
  const omittedData = omitDeep(flattenInput, keys) as T;
  //   console.log(omittedData);
  return omittedData;
};
