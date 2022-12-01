import React, { FC } from "react";
import { IconRefresh } from "@tabler/icons";
import { Button } from "@mantine/core";
import { ISmartButtonBase } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RefreshButton: FC<ISmartButtonBase<any>> = (props) => {
  const { onClick, color } = props;
  return (
    <Button
      aria-label="refresh"
      variant="light"
      color={color}
      sx={{ mx: 1, borderRadius: 12 }}
      onClick={onClick}>
      <IconRefresh />
    </Button>
  );
};

export default RefreshButton;
