/* eslint-disable import/no-cycle */
import { ChangeEvent } from "react";
import { PartialMethodsType } from "react-hm-dynamic-form";

export type CommonProps<
  T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> = {
  disabled?: boolean;
  hidden?: boolean;
  handleChange?: (params: {
    methods: PartialMethodsType["methods"];
    event: ChangeEvent<T> | any;
  }) => void;
};
