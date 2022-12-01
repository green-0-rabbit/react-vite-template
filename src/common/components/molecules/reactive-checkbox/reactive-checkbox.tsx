/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, FC, useCallback, useEffect } from "react";
import { useController, Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { Checkbox, CheckboxProps } from "@mantine/core";
import { CheckCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLInputElement>;
}

const ReactiveCheckbox: FC<SmartInputType<CheckCustomProps>> = (props) => {
  const {
    methods,
    inputKey,
    helperId,
    errors,
    options,
    isParentList,
    customProps = { size: "xs", color: "primary", disabled: false }
  } = props;
  const { size, color, disabled, handleChange, label } = customProps;
  const { control } = methods;

  const checkboxProps: CheckboxProps = {
    id: inputKey,
    size,
    color,
    disabled,
    "aria-describedby": helperId,
    sx: {
      margin: "5px"
    }
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
      defaultValue={false}
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <Checkbox
          {...checkboxProps}
          onChange={(event) => {
            customHandlechange({ methods, event });
            onChange(event);
          }}
          checked={value}
          ref={ref}
          name={name}
          onBlur={onBlur}
          label={label}
        />
      )}
    />
  );
};
export default ReactiveCheckbox;
