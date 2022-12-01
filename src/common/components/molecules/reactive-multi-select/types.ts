// eslint-disable-next-line import/no-cycle
import { CommonProps } from "../types";

export type MultiSelectCustomProps = {
  options: string[];
  label?: string;
  selectType: "checkmarks" | "chip";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
} & CommonProps<HTMLInputElement | HTMLTextAreaElement>;
