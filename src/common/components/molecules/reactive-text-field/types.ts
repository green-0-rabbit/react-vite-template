/* eslint-disable import/no-cycle */
import { MantineSize } from "@mantine/core";
import { CommonProps } from "../types";

export type TextFieldCustomProps = {
  type?: "text" | "number";
  label?: string;
  size?: MantineSize;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
} & CommonProps<HTMLInputElement | HTMLTextAreaElement>;
