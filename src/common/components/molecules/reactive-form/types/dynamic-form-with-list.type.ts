/* eslint-disable import/extensions */
import { NestedKeyOf, IFieldGroupMetaBase } from "react-hm-dynamic-form";
import { CustomInputType, DataType, FieldMeta } from "../../types";

type ColumnRange = 1 | 2;
type RowRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type ColSpanGuard<T> = T extends 1 ? 1 | 2 | 3 : T extends 2 ? 1 | 2 : never;

export type GroupLayoutType<T extends ColumnRange, U extends DataType> = {
  rowStart: RowRange;
  colSpan: ColSpanGuard<T>;
  columnStart: T;
  fieldGroups: {
    rowSpan: RowRange;
    inputKey: NestedKeyOf<U>;
  }[];
};

type GroupLayoutGuard<U extends DataType> = <T extends ColumnRange>(
  params: GroupLayoutType<T, U>[]
) => typeof params;

export const groupLayoutGuard = <T extends ColumnRange, U extends DataType>(
  params: GroupLayoutType<T, U>[]
) => params;

export interface ILayoutWithList<U extends DataType> {
  isfixed?: boolean;
  defaultExpanded?: boolean;
  columnGap?: number;
  rowGap?: number;
  groupLayouts?: ReturnType<GroupLayoutGuard<U>>;
}

export interface IFieldGroupMeta<T extends DataType>
  extends Omit<IFieldGroupMetaBase<T>, "fieldsMeta">,
    ILayoutWithList<T> {
  fieldsMeta: ReturnType<
    <U extends CustomInputType>(params: FieldMeta<T, U>[]) => typeof params
  >;
}

/**
 *  used in jsx
 */
// export type FielMetaProps = IFieldGroupMeta<never>["fieldsMeta"][0];
