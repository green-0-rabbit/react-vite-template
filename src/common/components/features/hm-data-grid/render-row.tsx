/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@mantine/core";
import dayjs from "dayjs";
// import React from "react";
import type { RowType } from "./types";

type RenderRowType<TRowType extends RowType> = {
  [K in TRowType]: (value: any) => JSX.Element;
};

export const renderRows: RenderRowType<RowType> = {
  text: (value: any) => <>{String(value)}</>,

  checkbox: (value: boolean) => (
    <Checkbox color="secondary" defaultChecked={value} />
  ),

  date: (value: string) => <>{dayjs(value).format("DD/MM/YYYY")}</>
};
