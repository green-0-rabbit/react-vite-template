import styled from "@emotion/styled";
import { Box, Title } from "@mantine/core";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "twin.macro";
import { Form as BaseForm } from "../common/components/atoms";
import BrandLogo from "../common/components/atoms/brand-logo";
import { IVerificationCodeInput } from "./types";
// eslint-disable-next-line import/order
import { useService } from "react-service-locator";
import {
  IFieldGroupMetaFlex,
  ReactiveFormFlex,
  ReactiveListButton,
  RenderButtonType
} from "src/common/components/molecules";
import { AuthStore } from "./auth.store";

const Form = styled(BaseForm)`
  min-width: 100%;
`;
type Data = IVerificationCodeInput;

const VerificationCode: FC = () => {
  const authStore = useService(AuthStore);
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {
    formState: { errors }
  } = methods;

  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.tempUsername) {
      navigate("../");
    }
  }, []);

  const fieldsGroupMeta: IFieldGroupMetaFlex<Data>[] = [
    {
      groupName: "",
      fieldsMeta: [
        {
          inputKey: "confirmationCode",
          label: "Code",
          inputType: "text",
          options: {
            required: { value: true, message: "the field is required" }
          },
          customProps: {
            type: "number"
          }
        },
        {
          inputKey: "newPassword",
          label: "Password",
          inputType: "password",
          options: {
            required: { value: true, message: "the field is required" }
          }
        }
      ]
    }
  ];
  const buttonsHeadMeta: RenderButtonType[] = [
    {
      name: "Confirm",
      type: "button",
      color: "secondary",
      customColor: "",
      customProps: { type: "submit", variant: "outline", fullWidth: true }
    }
  ];
  return (
    <Form
      tw=" px-8 space-y-6 sm:px-20"
      onSubmit={handleSubmit(authStore.forgotPasswordSubmit)}>
      <Box tw="mt-8">
        <BrandLogo tw="mx-auto" size={150} />
      </Box>
      <Box tw="text-center !mt-2 ">
        <Title
          // fontFamily="TwCenMT-Regular"
          tw=" font-normal text-gray-500"
          order={3}>
          Verification code
        </Title>
      </Box>
      <ReactiveFormFlex
        methods={methods}
        errors={errors}
        fieldsGroupMeta={fieldsGroupMeta}
      />
      <Box tw="w-full mx-auto max-w-sm">
        <ReactiveListButton actionsMeta={buttonsHeadMeta} tw="mb-8" />
      </Box>
    </Form>
  );
};
export default VerificationCode;
