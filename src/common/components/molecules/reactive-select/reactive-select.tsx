/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, FC, useCallback } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { SelectProps, Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { SelectCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLSelectElement>;
}
const ReactiveSelect: FC<SmartInputType<SelectCustomProps>> = (props) => {
  const { methods, inputKey, helperId, errors, options, customProps } = props;
  const { size, color, disabled, handleChange, onDropdownOpen, label } =
    customProps;
  const selectOptions = customProps.options;
  const { control } = methods;
  const selectProps: SelectProps = {
    id: inputKey,
    size,
    color,
    disabled,
    "aria-describedby": helperId,
    error: Boolean(errors),
    data: selectOptions,
    sx: {
      width: "100%"
    },
    onDropdownOpen
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
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <Select
          {...selectProps}
          onChange={(event) => {
            customHandlechange({ methods, event: event as never });
            onChange(event);
          }}
          value={value}
          ref={ref}
          name={name}
          onBlur={onBlur}
          label={label}
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={40}
        />
      )}
    />
  );
};
export default ReactiveSelect;
