/* eslint-disable react/function-component-definition */
import { FC } from "react";
import "twin.macro";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { Box } from "@mantine/core";
import Image from "../common/components/atoms/image";
// import { signIn } from './services'; // a faire

const imgUrl = new URL("../assets/images/buildings_grey.jpg", import.meta.url)
  .href;

const webpImgUrl = new URL(
  "../assets/images/buildings_grey.webp",
  import.meta.url
).href;

const BackgroundImage = styled(Box)`
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.main``;

const GradientMask = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AuthForm = styled.div``;

const AuthBackground: FC = () => (
  <Container tw="relative grid grid-cols-1 justify-center items-center h-screen lg:grid-cols-2">
    <AuthForm tw="relative z-20 h-full bg-white flex items-center py-8">
      <Outlet />
    </AuthForm>
    <BackgroundImage tw="hidden relative w-full h-full  bg-black lg:block ">
      <Image
        src={imgUrl}
        width={3001}
        height={1269}
        alt="Buildings grey"
        tw="object-cover w-full h-full"
        webpSrc={webpImgUrl}
      />
     <GradientMask tw=" absolute bg-black w-full h-full opacity-60 z-0" />
    </BackgroundImage>

  </Container>
);

export default AuthBackground;
