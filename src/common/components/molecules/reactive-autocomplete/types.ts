/* eslint-disable import/no-cycle */
import { AutocompleteItem } from "@mantine/core";
import { CommonProps } from "../types";

export type AutocompleteCustomProps = {
  type?: "text" | "number";
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  data: (string | AutocompleteItem)[];
} & CommonProps<HTMLInputElement | HTMLTextAreaElement>;
