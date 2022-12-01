import { CommonProps } from "../types";

type MarksProps = {
  value: number;
  label: string;
};

export type RangeCustomProps = {
  min: number;
  max: number;
  step?: number;
  label?: string;
  marks?: boolean | MarksProps[];
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  color?: "primary" | "secondary" | undefined;
} & CommonProps<HTMLInputElement>;
