/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { MultiSelectCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLInputElement>;
}

const ReactiveMultiSelect: FC<SmartInputType<MultiSelectCustomProps>> = (
  props
) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const { methods, inputKey, helperId, options, customProps, errors } = props;
  const { control, getValues } = methods;
  const { selectType, color, handleChange: chandleChange, label } = customProps;
  const selectOptions = customProps.options;
  const values = getValues(inputKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (values) setPersonName(values);
  }, [values]);
  const handleChange = (val: string[]) => {
    setPersonName(val);
  };
  const customHandlechange = useCallback(
    (params: ICustomHandlechange) => {
      if (chandleChange) {
        chandleChange({ ...params });
      }
    },
    [chandleChange]
  );

  const selectProps: MultiSelectProps = {
    id: inputKey,
    multiple: true,
    "aria-describedby": helperId,
    error: Boolean(errors),
    color,
    data: selectOptions,
    sx: {
      width: "100%"
    }
  };
  return (
    <Controller
      control={control}
      name={inputKey}
      defaultValue={[""]}
      rules={{ ...options }}
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <MultiSelect
          {...selectProps}
          // label={label}
          value={value}
          ref={ref}
          name={name}
          onBlur={onBlur}
          onChange={(val: string[]) => {
            customHandlechange({ methods, event: val as never });
            handleChange(val);
            onChange(val);
          }}
          placeholder=""
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={40}
        />
      )}
    />
  );
};
export default ReactiveMultiSelect;
