import { ReactElement } from "react";
import { PickObjectComponentParams } from "src/common/types";

/**
 * Modal component interface Base
 */
export interface IModalComponentBase<T = undefined> {
  onCloseModal: () => void;
  modalKey?: string;
  ["componentProps"]: T;
}

/**
 * Represent the smart modal interface base for all SmartModal
 */
export interface ISmartModalBase<T extends string, U extends object | undefined>
  extends Omit<IModalComponentBase<U>, "modalKey"> {
  modalKey: T;
  isModalOpen: boolean;
}

export type ModalComponentType = Record<
  string,
  ((...args: any) => JSX.Element) | (() => JSX.Element)
>;

/**
 * Reactive Modal props, used in ReactiveModal and [Features]Modal
 */
export type ReactiveModalProps<
  T extends string,
  U extends ModalComponentType
> = PickObjectComponentParams<U, T>["componentProps"] extends object
  ? ISmartModalBase<T, PickObjectComponentParams<U, T>["componentProps"]>
  : Omit<ISmartModalBase<T, any>, "componentProps" | "onCloseModal">;

export type SmartModalsType<T extends string> = {
  // eslint-disable-next-line prettier/prettier
  [key in T]: <K extends object>(params: K) => ReactElement;
};

export type BackdropOpacityType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
