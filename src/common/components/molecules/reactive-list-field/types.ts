/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import {
  InputType,
  FormFieldOption,
  IFieldListMetaBase
} from "react-hm-dynamic-form";
import { ICustomProps } from "../types";

type ListInputType = Exclude<InputType, "list">;

interface IFieldMeta<U extends ListInputType> extends IFieldListMetaBase<U> {
  options?: FormFieldOption;
}

/**
 *  display customProps accordingly of inputType value
 */
type ConditionalProp<T extends ListInputType> = T extends "text"
  ? ICustomProps["textFieldCustomProps"]
  : T extends "checkbox"
  ? ICustomProps["checkCustomProps"]
  : T extends "radio"
  ? ICustomProps["radioCustomProps"]
  : T extends "select"
  ? ICustomProps["selectCustomProps"]
  : T extends "switch"
  ? ICustomProps["switchCustomProps"]
  : T extends "range"
  ? ICustomProps["rangeCustomProps"]
  : T extends "multiSelect"
  ? ICustomProps["multiSelectCustomProps"]
  : never;

type CustomProps<U extends ListInputType> = {
  customProps: ConditionalProp<U>;
};

/**
 *  required customProps only when inputType is not text | checkbox | switch
 */
type FieldMeta<U extends ListInputType> = U extends
  | "text"
  | "checkbox"
  | "switch"
  ? Partial<CustomProps<U>> & IFieldMeta<U>
  : CustomProps<U> & IFieldMeta<U>;

export type ListFieldCustomProps = {
  fieldsMeta: ReturnType<
    <U extends ListInputType>(params: FieldMeta<U>[]) => typeof params
  >;
  defaultValue?: Record<string, any>;
  size?: "small" | "medium" | undefined;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

/**
 *  used in jsx ListField
 */
export type ListFieldMetaProps = Omit<
  ListFieldCustomProps["fieldsMeta"][0],
  "customProps"
> & { customProps?: any };
// ####  ListField #####
