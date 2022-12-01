/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import React, { FC, Fragment } from "react";
import "twin.macro";
import { SmartInputType, PartialMethodsType } from "react-hm-dynamic-form";
import { Radio, RadioGroupProps, RadioProps } from "@mantine/core";
import { Controller } from "react-hook-form";
import { RadioCustomProps } from "./types";

const ReactiveRadioButton: FC<SmartInputType<RadioCustomProps>> = (props) => {
  const { methods, inputKey, helperId, errors, options, customProps } = props;
  const { values, direction, size, color, label } = customProps;
  const { control } = methods;

  const radiogroupsprops: Omit<RadioGroupProps, "children"> = {
    id: inputKey,
    orientation: direction,
    //  description:{helperId}
    sx: { width: "100%", height: "100%" }
  };
  const radioProps: Omit<RadioProps, "value"> = {
    id: inputKey,
    size,
    color
  };

  return (
    <Controller
      control={control}
      name={inputKey}
      defaultValue={0}
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <Radio.Group {...radiogroupsprops} label={label}>
          {values?.map((val) => (
            <Radio {...radioProps} key={value} value={val} label={val} />
          ))}
        </Radio.Group>
      )}
    />
  );
};
export default ReactiveRadioButton;
