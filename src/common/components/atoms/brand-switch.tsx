/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { Switch, SwitchProps } from "@mantine/core";
import { FC } from "react";

const brandColor = "#5D8EED";

const CustomSwitch = styled(Switch)`
  & .mantine-Switch-input {
    color: ${brandColor};
    outline: none;
    &:hover {
      background-color: #4574D0;
    }
  }
`;

interface ISwitch extends SwitchProps {
  props?: { x: any };
}
const BrandSwitch: FC<ISwitch> = ({ ...props }) => <CustomSwitch {...props} />;
export default BrandSwitch;
