/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, FC, useCallback } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { Switch, SwitchProps } from "@mantine/core";
import { SwitchCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLInputElement>;
}
const ReactiveSwitch: FC<SmartInputType<SwitchCustomProps>> = (props) => {
  const {
    methods,
    inputKey,
    helperId,
    errors,
    options,
    customProps = { color: "primary", disabled: false }
  } = props;
  const { size, color, disabled, handleChange } = customProps;
  const { control } = methods;
  const switchProps: SwitchProps = {
    id: inputKey,
    size,
    color,
    disabled,
    "aria-describedby": helperId
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
      rules={{ ...options }}
      render={({ field: { onChange, value, ...rest } }) => (
        <Switch
          {...switchProps}
          onChange={(event) => {
            customHandlechange({ methods, event });
            onChange(event);
          }}
          checked={value}
          {...(rest as any)}
        />
      )}
    />
  );
};
export default ReactiveSwitch;
