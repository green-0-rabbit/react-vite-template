/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-one-expression-per-line */
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ReactiveFormFlex,
  IFieldGroupMetaFlex,
  ReactiveListButton,
  IModalComponentBase,
  ModalTemplate,
  RenderButtonType
} from "src/common/components/molecules";
import { Form } from "src/common/components/atoms";
import { Box, BoxProps, Text } from "@mantine/core";

const style: BoxProps["sx"] = {
  width: "100%",
  display: "flex",
  flexDirection: "column"
};

type Data = { userId: string };
export interface IAdminDeleteUserModal {
  userId: string;
  handleDeleuser: (onCloseModal: () => void) => void;
}
export type AdminDeleteUserModalProps =
  IModalComponentBase<IAdminDeleteUserModal>;

const AdminDeleteUserModal: FC<AdminDeleteUserModalProps> = (props) => {
  const { onCloseModal, modalKey, componentProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userId, handleDeleuser } = componentProps!;
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { userId: "" }
  });
  const {
    formState: { errors }
  } = methods;
  const [isDisable, setIsDisable] = useState(true);

  const onSubmit = (data: Data) => {
    handleDeleuser(onCloseModal);
  };

  const fieldsGroupMeta: IFieldGroupMetaFlex<Data>[] = [
    {
      groupName: "",
      fieldsMeta: [
        {
          inputKey: "userId",
          label: "User ID",
          inputType: "text",
          inputHelperText: "Enter the above user ID",
          customProps: {
            color: "secondary",
            handleChange: ({ event }) => {
              const { value } = event.target;
              if (value === userId) {
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

  const renderFooter = () => {
    const actionsMeta: RenderButtonType[] = [
      {
        name: "Delete",
        type: "button",
        color: "error",
        isDisable,
        fontProps: {
          fontWeight: "medium"
        },
        onClick: handleSubmit(onSubmit)
      }
    ];
    return <ReactiveListButton actionsMeta={actionsMeta} position="end" />;
  };

  return (
    <ModalTemplate
      title="Delete User"
      modalKey={modalKey}
      renderFooter={{ ...renderFooter() }}
      onCloseModal={onCloseModal}>
      <Box sx={style}>
        <Form>
          <Text variant="text">
            This user will be irrevocably removed from the system. If you
            confirm the action, please enter the user ID
            <em style={{ fontWeight: "bold", color: "red" }}> {userId} </em>in
            the input:
          </Text>

          <ReactiveFormFlex
            methods={methods as never}
            errors={errors}
            fieldsGroupMeta={fieldsGroupMeta}
          />
        </Form>
      </Box>
    </ModalTemplate>
  );
};

export default AdminDeleteUserModal;
