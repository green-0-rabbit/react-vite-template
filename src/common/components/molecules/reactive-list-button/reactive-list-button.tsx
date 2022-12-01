/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
import { Box } from "@mantine/core";
import { FC } from "react";
import DynamicButtons from "./dynamic-buttons";
import RenderButton from "./render-button";
import { ISmartButton, RenderButtonType } from "./types";

interface IReactiveListButton {
  actionsMeta: RenderButtonType[];
  position?: "start" | "center" | "end";
}

const ReactiveListButton: FC<IReactiveListButton> = (props) => {
  const { actionsMeta, position } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: position || "end"
      }}>
      <DynamicButtons
        actionsMeta={actionsMeta as ISmartButton[]}
        renderButtons={(props) => <RenderButton {...props} />}
      />
    </Box>
  );
};

export default ReactiveListButton;
