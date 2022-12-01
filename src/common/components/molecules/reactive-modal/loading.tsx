/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import { FC, Fragment, ReactElement, useEffect, useState } from "react";

interface IDynamicModal {
  renderModal?: (isModalOpen: boolean) => ReactElement;
  isLoading: boolean;
}

const Loading: FC<IDynamicModal> = (props) => {
  const { renderModal, isLoading } = props;
  const [isModalOpen, setIsModalOpen] = useState(isLoading);
  // const onCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    setIsModalOpen(isLoading);
  }, [isLoading]);

  return (
    <Fragment>{renderModal ? renderModal(isModalOpen) : undefined}</Fragment>
  );
};

export default Loading;
