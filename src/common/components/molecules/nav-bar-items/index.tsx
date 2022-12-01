/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
import {
  Box,
  ColorInputProps,
  Divider,
  Group,
  MantineColor,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  UnstyledButtonProps
} from "@mantine/core";
import "twin.macro";

import NavBarLink from "./nav-bar-link";

interface ICustomButton {
  icon: React.ReactNode;
  color: MantineColor;
  label: string;
  to: string;
}
const CustomButton: FC<ICustomButton> = (props) => {
  const { icon, color, label, to } = props;
  const [isActive, setIsActive] = useState(false);
  const buttonSxProps: UnstyledButtonProps["sx"] = (theme) => ({
    display: "block",
    // width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.lg,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor: isActive
      ? theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.blue[0]
      : undefined,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    },
    "&:focus": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.blue[1]
    }
  });

  const handleIsactive = (active: boolean) => {
    setIsActive(active);
  };
  return (
    <NavBarLink to={to} handleIsActive={handleIsactive}>
      <Tooltip
        label={label}
        position="right"
        radius="md"
        color={color}
        transition="pop"
        transitionDuration={100}>
        <UnstyledButton sx={buttonSxProps} tw="flex justify-between">
          <Group>
            <ThemeIcon color={color} variant="light">
              {icon}
            </ThemeIcon>
            {/* <Text size="sm" tw="hidden">
              {label}
            </Text> */}
          </Group>
        </UnstyledButton>
      </Tooltip>
    </NavBarLink>
  );
};

interface INavBarItems {
  data: ICustomButton[];
}
const NavBarItems: FC<INavBarItems> = (props) => {
  const { data } = props;
  return (
    <Box>
      {data.map((button) => (
        <CustomButton
          key={button.label}
          icon={button.icon}
          color={button.color}
          label={button.label}
          to={button.to}
        />
      ))}
    </Box>
  );
};
export default NavBarItems;
