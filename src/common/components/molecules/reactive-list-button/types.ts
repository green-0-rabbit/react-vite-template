import { ButtonProps, ButtonVariant } from "@mantine/core";
import { CSSProperties, ReactElement } from "react";

type ColorType = ButtonProps["color"];
type FontWeight = CSSProperties["fontWeight"];

export type MenuItemType = {
  name: string;
  fontWeight?: FontWeight;
  color?: ColorType;
  onClick?: () => void;
  // renderModal?: (params: ISmartButtonRenderModalParams) => ReactElement;
};

export type SmartButtonType<T extends string> = {
  [key in T]: (params: ISmartButton<ButtonType, any>) => ReactElement;
};

export type ButtonType = "button" | "select" | "refresh";

interface ISmartButtonRenderModalParams {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export interface ISmartButton<
  U extends ButtonType = "button",
  T extends Record<string, any> = Record<string, any>
> {
  name: string;
  type: U;
  customProps: T;
  color?: ColorType;
  customColor?: string;
  isDisable?: boolean;
  isHidden?: boolean;
  fontProps?: {
    fontWeight?: FontWeight;
    color?: string;
  };
  onClick?: () => void;
  renderModal?: (params: ISmartButtonRenderModalParams) => ReactElement;
}

export type ISmartButtonBase<T extends ButtonType> = Omit<
  ISmartButton<T>,
  "customProps"
>;

/**
 * CustomProps
 */
export interface ICustomReactiveSelectButton {
  items: MenuItemType[];
}

export interface ICustomReactiveButton {
  type: "submit" | "reset";
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export type RenderButtonType = ReturnType<
  <T extends ButtonType>(params: FieldMeta<T>) => typeof params
>;

type FieldMeta<T extends ButtonType> = T extends "button"
  ? ISmartButtonBase<T> & { customProps?: ICustomReactiveButton }
  : T extends "select"
  ? ISmartButton<T, ICustomReactiveSelectButton>
  : ISmartButtonBase<T>;
