/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import {
  ISmartModalBase,
  ModalComponentType,
  ReactiveModalProps
} from "./types";
import SmartModal from "./smart-modal";

/**
 * Reactive Modal props, used in ReactiveModal and [Features]Modal
 */
interface IReactiveModal<T extends string, U extends ModalComponentType>
  extends Omit<ISmartModalBase<T, any>, "componentProps" | "onCloseModal"> {
  componentProps?: ReactiveModalProps<T, U> | unknown;
  components: U;
  onCloseModal?: () => void;
}
const ReactiveModal = <T extends string, U extends ModalComponentType>(
  props: IReactiveModal<T, U>
) => {
  const { onCloseModal, modalKey, isModalOpen, componentProps, components } =
    props;
  const reactiveProps = {
    onCloseModal,
    modalKey,
    componentProps
  };
  const smartModalProps: Omit<Parameters<typeof SmartModal>[0], "children"> = {
    isModalOpen,
    onCloseModal: onCloseModal || (() => {}),
    modalKey
  };

  const component = components[modalKey];
  return (
    <SmartModal {...smartModalProps}>{component(reactiveProps)}</SmartModal>
  );
};
export default ReactiveModal;
