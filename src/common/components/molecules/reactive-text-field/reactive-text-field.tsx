/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, ChangeEventHandler, FC, memo, useCallback } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { TextInput, TextInputProps } from "@mantine/core";
import { TextFieldCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

const ReactiveTextField: FC<SmartInputType<TextFieldCustomProps>> = (props) => {
  const {
    methods,
    inputKey,
    helperId,
    errors,
    options,
    isParentList,
    customProps = { type: "text", color: "primary" }
  } = props;
  const { type, size, color, disabled, hidden, handleChange, label } =
    customProps;
  const { control } = methods;
  const fieldProps: TextInputProps = {
    id: inputKey,
    "aria-describedby": helperId,
    size,
    disabled,
    sx: {
      width: "100%",
      display: hidden ? "none" : undefined,
      borderStyle: isParentList && !errors ? "none" : undefined,
      background: isParentList ? undefined : "#78838c12",
      maxHeight: isParentList ? "35px" : undefined,
      "::placeholder": isParentList
        ? {
            color: errors ? "red" : undefined
          }
        : undefined
    },
    color: errors ? "error" : color,
    type,
    placeholder: errors && isParentList ? errors.message : undefined,
    error: Boolean(errors)
  };
  const customHandlechange = useCallback(
    (params: ICustomHandlechange) => {
      if (handleChange) {
        handleChange({ ...params });
      }
    },
    [handleChange]
  );

  return (
    <Controller
      control={control}
      name={inputKey}
      defaultValue=""
      rules={{ ...options }}
      render={({ field: { onChange, ref, ...rest } }) => (
        <TextInput
          {...fieldProps}
          onChange={(event) => {
            customHandlechange({ methods, event });
            onChange(event);
          }}
          ref={ref}
          {...rest}
          label={label}
        />
      )}
    />
  );
};
export default ReactiveTextField;
