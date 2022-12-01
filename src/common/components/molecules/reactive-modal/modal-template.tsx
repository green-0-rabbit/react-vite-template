/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import "twin.macro";
import { FC, ReactElement } from "react";
import {
  ActionIcon,
  Box,
  Divider,
  Text,
  TextProps,
  Title,
  TitleProps
} from "@mantine/core";
import { camelPascalToKebabCase } from "src/common/utils";
import styled from "@emotion/styled";

const CustomTitle = styled((props: TitleProps & { id: string | undefined }) => (
  <Title order={2} {...props} />
))({});
const Footer = styled("footer")({
  display: "flex",
  alignContent: "center",
  marginTop: "6px"
});

const Header = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});
const Content = styled(Box)({
  marginTop: "12px !important",
  marginBottom: "12px !important",
  width: "100%"
});
const Main = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "white",
  maxWidth: "500px",
  borderRadius: "12px",
  marginLeft: "auto",
  marginRight: "auto",
  "& :nth-of-type(n + 1)": {
    marginBottom: "2px"
  }
});

interface IDynamicModal {
  title: string;
  renderFooter: ReactElement;
  modalKey?: string;
  onCloseModal: () => void;
  /**
   * A single child content element.
   * @see https://github.com/typescript-cheatsheets/react/issues/271#issuecomment-677644493
   */
  children: ReactElement;
}

const ModalTemplate: FC<IDynamicModal> = (props) => {
  const { modalKey, title, children, renderFooter, onCloseModal } = props;
  const ariaId = modalKey ? camelPascalToKebabCase(modalKey) : undefined;

  return (
    <Main>
      <Header>
        <CustomTitle id={ariaId}>{title}</CustomTitle>
      </Header>
      <Divider />
      <Content>{children}</Content>
      <Divider />
      <Footer>{renderFooter}</Footer>
    </Main>
  );
};

export default ModalTemplate;
