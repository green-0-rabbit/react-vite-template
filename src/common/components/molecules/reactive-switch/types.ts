import { CommonProps } from "../types";

export type SwitchCustomProps = {
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
} & CommonProps<HTMLInputElement>;
