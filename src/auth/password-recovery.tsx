import styled from "@emotion/styled";
import { Box, Title } from "@mantine/core";
import { FC } from "react";
import { fieldRegex } from "react-hm-dynamic-form";
import { useForm } from "react-hook-form";
import { useService } from "react-service-locator";
import "twin.macro";
import { Form as BaseForm } from "../common/components/atoms";
import BrandLogo from "../common/components/atoms/brand-logo";
import {
  IFieldGroupMetaFlex,
  ReactiveFormFlex,
  ReactiveListButton,
  RenderButtonType
} from "../common/components/molecules";
import { AuthStore } from "./auth.store";
import { IPasswordForget } from "./types";

const Form = styled(BaseForm)`
  min-width: 100%;
`;

type Data = IPasswordForget;
const defaultValues: Data = {
  userName: ""
};
const PasswordRecovery: FC = (_props) => {
  const authStore = useService(AuthStore);
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues
  });
  const {
    formState: { errors }
  } = methods;

  const fieldsGroupMeta: IFieldGroupMetaFlex<Data>[] = [
    {
      groupName: "",
      fieldsMeta: [
        {
          inputKey: "userName",
          label: "Username",
          inputType: "text",
          options: {
            required: { value: true, message: "the field is required" },
            pattern: {
              value: fieldRegex.email,
              message: "please provide a valid email"
            }
          }
        }
      ]
    }
  ];
  const buttonsHeadMeta: RenderButtonType[] = [
    {
      name: "Send token",
      type: "button",
      color: "secondary",
      customColor: "",
      customProps: { type: "submit", variant: "outline", fullWidth: true }
    }
  ];
  return (
    <Form tw=" px-8 space-y-6 sm:px-20" onSubmit={handleSubmit(authStore.forgotPassword)}>
      <Box tw="mt-8">
        <BrandLogo tw="mx-auto" size={150} />
      </Box>
      <Box tw="text-center !mt-2 ">
        <Title
          // fontFamily="TwCenMT-Regular"
          tw=" font-normal text-gray-500"
          order={3}>
          Password recovery
        </Title>
      </Box>
      <ReactiveFormFlex
        methods={methods}
        errors={errors}
        fieldsGroupMeta={fieldsGroupMeta}
      />
      <Box>
        <ReactiveListButton actionsMeta={buttonsHeadMeta} />
      </Box>
    </Form>
  );
};

export default PasswordRecovery;
