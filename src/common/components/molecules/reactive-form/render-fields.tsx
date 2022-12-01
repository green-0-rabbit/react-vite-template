import { FC } from "react";
import { DynamicFields, SmartFieldType } from "react-hm-dynamic-form";
import { ReactiveCheckbox } from "../reactive-checkbox";
import { ReactiveMultiSelect } from "../reactive-multi-select";
import { ReactivePasswordField } from "../reactive-password-field";
import { ReactiveRadioButton } from "../reactive-radio-button";
import { ReactiveSelect } from "../reactive-select";
import { ReactiveSwitch } from "../reactive-switch";
import { ReactiveTextField } from "../reactive-text-field";
import { ReactiveRange } from "../reactive-range";
import { ReactiveDatePicker } from "../reactive-date-picker";
import { CustomInputType } from "../types";
import { ReactiveAutocomplete } from "../reactive-autocomplete";

type RenderFieldsType = Parameters<
  Parameters<typeof DynamicFields>["0"]["renderFields"]
>[0];

type InputProps = Omit<RenderFieldsType, "inputType">;

const fields: SmartFieldType<CustomInputType> = {
  text: (fieldProps: InputProps) => <ReactiveTextField {...fieldProps} />,
  password: (fieldProps: InputProps) => (
    <ReactivePasswordField {...fieldProps} />
  ),
  select: (fieldProps: InputProps) => <ReactiveSelect {...fieldProps} />,
  checkbox: (fieldProps: InputProps) => <ReactiveCheckbox {...fieldProps} />,
  range: (fieldProps: InputProps) => <ReactiveRange {...fieldProps} />,
  switch: (fieldProps: InputProps) => <ReactiveSwitch {...fieldProps} />,
  multiSelect: (fieldProps: InputProps) => (
    <ReactiveMultiSelect {...fieldProps} />
  ),
  radio: (fieldProps: InputProps) => <ReactiveRadioButton {...fieldProps} />,
  datepicker: (fieldProps: InputProps) => (
    <ReactiveDatePicker {...fieldProps} />
  ),
  autocomplete: (fieldProps: InputProps) => (
    <ReactiveAutocomplete {...fieldProps} />
  )
};

const RenderFields: FC<RenderFieldsType> = (props) => {
  const { inputType, ...inputProps } = props;

  const component = fields[inputType];
  return component(props);
};

export default RenderFields;
