/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-one-expression-per-line */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Box, BoxProps, Modal, Text } from "@mantine/core";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "src/common/components/atoms";
import {
  IFieldGroupMetaFlex,
  ReactiveFormFlex,
  ReactiveListButton,
  RenderButtonType
} from "src/common/components/molecules";

const style: BoxProps["sx"] = {
  width: "100%",
  display: "flex",
  flexDirection: "column"
};

type Data = { id: string };
export interface IAdminDeleteCompanyModal {
  enityID: string;
  handleDelete: (id: string) => void;
}

const AdminDeleteCompanyModal: FC<IAdminDeleteCompanyModal> = (props) => {
  const { enityID, handleDelete } = props;

  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { id: "" }
  });
  const {
    formState: { errors }
  } = methods;
  const modal = useModal();
  const [isDisable, setIsDisable] = useState(true);

  const onSubmit = (param: Data) => {
    handleDelete(param.id);
  };

  const fieldsGroupMeta: IFieldGroupMetaFlex<Data>[] = [
    {
      groupName: "",
      fieldsMeta: [
        {
          inputKey: "id",
          label: "Company ID",
          inputType: "text",
          inputHelperText: "Enter the above company ID",
          customProps: {
            color: "secondary",
            handleChange: ({ event }) => {
              const { value } = event.target;
              if (value === enityID) {
                setIsDisable(false);
              } else {
                setIsDisable(true);
              }
            }
          }
        }
      ]
    }
  ];

  const actionsMeta: RenderButtonType[] = [
    {
      name: "Delete",
      type: "button",
      color: "red",
      isDisable,
      fontProps: {
        fontWeight: "medium"
      },
      onClick: handleSubmit(onSubmit)
    }
  ];

  return (
    // <ModalTemplate
    //   title="Delete Company"
    //   modalKey={modalKey}
    //   renderFooter={{ ...renderFooter() }}
    //   onCloseModal={onCloseModal}>
    <Modal
      opened={modal.visible}
      onClose={() => modal.remove()}
      title="Delete Company!">
      <Box sx={style}>
        <Form>
          <Text variant="text">
            This company will be irrevocably removed from the system. If you
            confirm the action, please enter the user ID
            <em style={{ fontWeight: "bold", color: "red" }}> {enityID} </em>in
            the input:
          </Text>

          <ReactiveFormFlex
            methods={methods as never}
            errors={errors}
            fieldsGroupMeta={fieldsGroupMeta}
          />
        </Form>
        <ReactiveListButton actionsMeta={actionsMeta} position="end" />
      </Box>
    </Modal>
  );
};

export default NiceModal.create(AdminDeleteCompanyModal);
