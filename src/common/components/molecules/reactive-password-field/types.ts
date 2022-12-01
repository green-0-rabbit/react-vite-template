// eslint-disable-next-line import/no-cycle
import { CommonProps } from "../types";

export type PasswordFieldCustomProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  label?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
} & CommonProps<HTMLInputElement | HTMLTextAreaElement>;
