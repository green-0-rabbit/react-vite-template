/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import "twin.macro";
import { FC, ReactElement } from "react";
import { camelPascalToKebabCase } from "src/common/utils";
import { Box, Modal, ModalProps } from "@mantine/core";
import { BackdropOpacityType } from "./types";

interface IDynamicModal {
  isModalOpen: boolean;
  onCloseModal: () => void;
  modalKey?: string;
  ariaTitle?: string;
  showTitle?: boolean;
  keepMounted?: boolean;
  backdropOpacity?: BackdropOpacityType;
  /**
   * A single child content element.
   * @see https://github.com/typescript-cheatsheets/react/issues/271#issuecomment-677644493
   */
  children: ReactElement;
}

const SmartModal: FC<IDynamicModal> = (props) => {
  const {
    isModalOpen,
    onCloseModal,
    backdropOpacity,
    keepMounted,
    modalKey,
    children
  } = props;

  const ariaLabelleBy = modalKey ? camelPascalToKebabCase(modalKey) : undefined;
  const modalProps: Omit<ModalProps, "children"> = {
    opened: isModalOpen,
    onClose: onCloseModal,
    // keepMounted,
    "aria-labelledby": ariaLabelleBy,
    id: modalKey,
    centered: true,
    sx: {
      opacity: backdropOpacity ? `${backdropOpacity} !important` : undefined,
      ".mantine-Modal-modal": {
        visibility: modalKey === "loading" ? "hidden" : "visible"
      }
    }
    // BackdropProps: {
    //   sx: {
    //     opacity: backdropOpacity ? `${backdropOpacity} !important` : undefined
    //   }
    // }
  };

  return <Modal {...modalProps}>{children}</Modal>;
};

export default SmartModal;
