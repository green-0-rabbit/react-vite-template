/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import { ChangeEvent, FC, useCallback } from "react";
import { Controller } from "react-hook-form";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { Slider, SliderProps } from "@mantine/core";
import { RangeCustomProps } from "./types";

interface ICustomHandlechange {
  methods: PartialMethodsType["methods"];
  event: ChangeEvent<HTMLInputElement>;
}

const ReactiveRange: FC<SmartInputType<RangeCustomProps>> = (props) => {
  const { methods, inputKey, helperId, errors, options, customProps } = props;
  const { min, max, step, size, color, disabled, handleChange, label } =
    customProps;
  const { control } = methods;
  const marks = [
    {
      value: min,
      label: `${min}`
    },
    {
      value: max,
      label: `${max}`
    }
  ];

  const sliderProps: SliderProps = {
    id: inputKey,
    max,
    min,
    step,
    marks,
    size,
    color,
    disabled,
    "aria-describedby": helperId,
    sx: {
      width: "100%"
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
      defaultValue={0}
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <Slider
          {...sliderProps}
          onChange={(event) => {
            customHandlechange({ methods, event: event as never });
            onChange(event);
          }}
          value={value}
          ref={ref}
          name={name}
          onBlur={onBlur}
        />
      )}
    />
  );
};
export default ReactiveRange;
