// eslint-disable-next-line import/no-cycle
import { CommonProps } from "../types";

export type SelectCustomProps = {
  options: Array<string>;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  onDropdownOpen?: () => void;
} & CommonProps<HTMLSelectElement>;
