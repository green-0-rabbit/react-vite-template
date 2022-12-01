/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/require-default-props */
import { Button, ButtonProps, TextProps, Text } from "@mantine/core";
import { FC, Fragment, useState } from "react";
import { ICustomReactiveButton, ISmartButton } from "./types";

type CustomButtonProps = ButtonProps & React.ComponentPropsWithRef<"button">;

const ReactiveButton: FC<ISmartButton<any, ICustomReactiveButton>> = (
  props
) => {
  const {
    renderModal,
    name,
    color,
    isDisable = false,
    isHidden = false,
    fontProps,
    customColor,
    onClick,
    customProps = { type: "button", variant: "filled", fullWidth: false }
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const { type, variant, fullWidth } = customProps;

  const buttonProps: CustomButtonProps = {
    fullWidth,
    type,
    hidden: isHidden,
    variant,
    color,
    radius: 12,
    disabled: isDisable,
    onClick:
      type === "submit" || type === "reset" ? undefined : onClick || openModal
  };
  const typographyProps: TextProps = {
    weight: fontProps ? fontProps.fontWeight : undefined,
    color: fontProps ? fontProps.color : undefined
  };

  return (
    <Fragment>
      <Button {...buttonProps}>
        <Text {...typographyProps}>{name}</Text>
      </Button>
      {renderModal ? renderModal({ isModalOpen, onCloseModal }) : undefined}
    </Fragment>
  );
};

export default ReactiveButton;
