import { CommonProps } from "../types";

export type RadioCustomProps = {
  values: Array<string>;
  direction: "horizontal" | "vertical" | undefined;
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
