/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, ChangeEventHandler, FC, memo, useCallback } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import { DatePickerCustomProps } from "./types";
import "dayjs/locale/en";
import "dayjs/locale/fr";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: Date | null;
}

const ReactiveDatePicker: FC<SmartInputType<DatePickerCustomProps>> = (
  props
) => {
  const {
    methods,
    inputKey,
    helperId,
    errors,
    options,
    isParentList,
    customProps = { type: "text", size: "sm", color: "primary" }
  } = props;
  const { type, size, color, disabled, handleChange, label } = customProps;
  const { control } = methods;
  const fieldProps: DatePickerProps = {
    id: inputKey,
    "aria-describedby": helperId,
    size,
    disabled,
    locale: "en",
    clearable: false,
    sx: {
      width: "100%",
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
        handleChange({ ...params } as any);
      }
    },
    [handleChange]
  );
  return (
    <Controller
      control={control}
      name={inputKey}
      defaultValue={new Date("2022-07-12T23:00:00.000Z")}
      rules={{ ...options }}
      render={({ field: { onChange, ref, value, ...rest } }) => (
        <DatePicker
          {...fieldProps}
          onChange={(event) => {
            customHandlechange({ methods, event });
            onChange(event);
          }}
          ref={ref}
          value={new Date(value)}
          {...rest}
          label={label}
        />
      )}
    />
  );
};
export default ReactiveDatePicker;
