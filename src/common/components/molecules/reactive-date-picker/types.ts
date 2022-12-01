/* eslint-disable import/no-cycle */
import { CommonProps } from "../types";

export type DatePickerCustomProps = {
  type?: "text" | "number";
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
} & CommonProps<HTMLInputElement | HTMLTextAreaElement>;
