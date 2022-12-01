import styled from "@emotion/styled";
import {
  Box,
  BoxProps,
  createPolymorphicComponent,
  LoadingOverlay,
  Portal,
  useMantineTheme
} from "@mantine/core";
import Lottie from "lottie-react";
import { FC, useEffect } from "react";
import loadingAnimation from "./loading-animation.json";

const options = {
  animationData: loadingAnimation,
  loop: true
};

interface IBrandLogo {
  visible: boolean;
}
const LoadingComponent: FC<IBrandLogo> = (props) => {
  const { visible } = props;
  const theme = useMantineTheme();
  const container = document.createElement("div");
  const containerId = "#hm-overlay"
  container.id = containerId;

  useEffect(() => {
    if (visible) {
       document.body.appendChild(container);
       return;
    }
    document.getElementById(containerId)?.remove()
  }, [visible]);

  return (
    <>
      {visible && (
        <Portal target={container}>
          {/* //     <Box sx={{ width: "300px", height: "300px", position: "relative" }}> */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "fixed",
              top: 0,
              zIndex: 200
            }}>
            <LoadingOverlay
              visible={visible}
              overlayBlur={2}
              loader={<Lottie {...options} />}
            />
          </Box>
        </Portal>
      )}
    </>
  );
};
export default LoadingComponent;
