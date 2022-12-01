/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import { FC } from "react";
import SelectButton from "./reactive-select-button";
import ReactiveButton from "./reactive-button";
import RefreshButton from "./refresh-button";
import { ButtonType, ISmartButton, SmartButtonType } from "./types";

type ISmartButtonAny = ISmartButton<ButtonType, any>;

const buttons: SmartButtonType<ButtonType> = {
  button: (buttonProps: ISmartButtonAny) => <ReactiveButton {...buttonProps} />,
  refresh: (buttonProps: ISmartButtonAny) => <RefreshButton {...buttonProps} />,
  select: (buttonProps: ISmartButtonAny) => <SelectButton {...buttonProps} />
};

type IRenderButton = ISmartButton<ButtonType, any>;

const RenderButton: FC<IRenderButton> = (props) => {
  const { type } = props;

  const component = buttons[type];
  return component({ ...props });
};

export default RenderButton;
