/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, FC, useCallback } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons";
import { PasswordFieldCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

const ReactivePasswordField: FC<SmartInputType<PasswordFieldCustomProps>> = (
  props
) => {
  const {
    methods,
    inputKey,
    helperId,
    errors,
    options,
    isParentList,
    customProps = { color: "primary" }
  } = props;
  const {
    size,
    color,
    disabled,
    handleChange: chandleChange,
    label
  } = customProps;
  const { control } = methods;

  const passwordFiedProps: PasswordInputProps = {
    id: inputKey,
    placeholder: errors && isParentList ? errors.message : undefined,
    error: Boolean(errors),
    size,
    color: errors ? "error" : color,
    disabled,
    "aria-describedby": helperId,
    sx: {
      width: "100%",
      borderStyle: isParentList && !errors ? "none" : undefined,
      backgroundColor: isParentList ? undefined : "#78838c12",
      maxHeight: isParentList ? "35px" : undefined,
      "::placeholder": isParentList
        ? {
            color: errors ? "red" : undefined
          }
        : undefined
    }
  };

  const customHandlechange = useCallback(
    (params: ICustomHandlechange) => {
      if (chandleChange) {
        chandleChange({ ...params });
      }
    },
    [chandleChange]
  );

  return (
    <Controller
      control={control}
      name={inputKey}
      defaultValue=""
      rules={{ ...options }}
      render={({ field: { onChange, ref, ...rest } }) => (
        <PasswordInput
          {...passwordFiedProps}
          onChange={(event) => {
            customHandlechange({ methods, event });
            onChange(event);
          }}
          ref={ref}
          {...rest}
          label={label}
          // defaultValue="secret"
          // eslint-disable-next-line react/no-unstable-nested-components
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />
      )}
    />
  );
};
export default ReactivePasswordField;
