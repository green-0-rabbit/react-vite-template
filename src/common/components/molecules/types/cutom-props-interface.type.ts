/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { InputType } from "react-hm-dynamic-form";
import { AutocompleteCustomProps } from "../reactive-autocomplete";
import { CheckCustomProps } from "../reactive-checkbox";
import { DatePickerCustomProps } from "../reactive-date-picker";
import { ListFieldCustomProps } from "../reactive-list-field";
import { MultiSelectCustomProps } from "../reactive-multi-select";
import { PasswordFieldCustomProps } from "../reactive-password-field";
import { RadioCustomProps } from "../reactive-radio-button";
import { RangeCustomProps } from "../reactive-range";
import { SelectCustomProps } from "../reactive-select";
import { SwitchCustomProps } from "../reactive-switch";
import { TextFieldCustomProps } from "../reactive-text-field";

export type CustomInputType = InputType | "datepicker" | "autocomplete";

type CustomPropsType = {
  [K in CustomInputType]: any;
};
export interface ICustomProps extends CustomPropsType {
  text: TextFieldCustomProps;
  datepicker: DatePickerCustomProps;
  checkCustomProps: CheckCustomProps;
  switch: SwitchCustomProps;
  checkbox: MultiSelectCustomProps;
  range: RangeCustomProps;
  radio: RadioCustomProps;
  select: SelectCustomProps;
  list: ListFieldCustomProps;
  password: PasswordFieldCustomProps;
  autocomplete: AutocompleteCustomProps;
}
