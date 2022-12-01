/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-fragments */
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  ButtonProps,
  TextProps,
  Text,
  Box,
  Menu,
  MenuProps
} from "@mantine/core";
import { FC, Fragment, useCallback, useState } from "react";
import {
  ICustomReactiveSelectButton,
  ISmartButton,
  MenuItemType
} from "./types";

type CustomButtonProps = ButtonProps & React.ComponentPropsWithRef<"button">;

const ReactiveSelectButton: FC<
  ISmartButton<any, ICustomReactiveSelectButton>
> = (props) => {
  const {
    name,
    color,
    fontProps,
    customColor,
    customProps: { items }
  } = props;

  const [opened, handlers] = useDisclosure(false);

  const buttonProps: ButtonProps = {
    variant: "filled",
    color: color || undefined,
    sx: {
      // @override
      minWidth: "5px",

      backgroundColor: customColor ?? ""
    }
    // onClick: handleClick
  };

  const textProps: TextProps = {
    sx: {
      weight: fontProps ? fontProps.fontWeight : undefined,
      color: fontProps ? fontProps.color : undefined
    }
  };

  const menuProps: MenuProps = {
    // id: "long-menu",
    opened,
    // anchorEl,
    children: undefined
    // onClose: handleClose
  };
  const typographyprops = (item: MenuItemType): TextProps => ({
    // fontSize: "small",
    // size: "sm",
    weight: item.fontWeight ? item.fontWeight : "",
    color: item.color ? item.color : "",
    sx: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  });

  const memoizedRenderItem = useCallback(
    (items: MenuItemType[]) =>
      items.map((item) => {
        const { onClick } = item;
        return (
          <Menu.Item
            key={item.name.replaceAll(" ", "")}
            onClick={() => {
              if (onClick) {
                onClick();

                // setAnchorEl(null);
              }
            }}>
            <Text {...typographyprops(item)}>{item.name}</Text>
          </Menu.Item>
        );
      }),
    []
  );
  const arrowprops = {
    fontSize: "small",
    sx: {
      width: "10px",
      height: "10px"
    }
  };

  return (
    <Box>
      <Menu
        opened={opened}
        onOpen={handlers.open}
        onClose={handlers.close}
        {...menuProps}>
        <Menu.Target>
          <Button {...buttonProps}>
            {name ? (
              <Fragment>
                <Text {...textProps}>{name}</Text>
                <Box
                  color={fontProps?.color}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "5px"
                  }}>
                  <IconChevronUp {...arrowprops} />
                  <IconChevronDown {...arrowprops} />
                </Box>
              </Fragment>
            ) : (
              <Text {...textProps}>...</Text>
            )}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>{memoizedRenderItem(items)}</Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default ReactiveSelectButton;
