/* eslint-disable import/extensions */
import { IFieldGroupMetaBase } from "react-hm-dynamic-form";
import { CustomInputType, DataType, FieldMeta } from "../../types";

export interface IFieldGroupMetaFlex<T extends DataType>
  extends Omit<IFieldGroupMetaBase<T>, "fieldsMeta"> {
  fieldsMeta: ReturnType<
    <U extends CustomInputType>(params: FieldMeta<T, U>[]) => typeof params
  >;
}

/**
 *  used in jsx
 */
// export type FielMetaProps = IFieldGroupMeta<never>["fieldsMeta"][0];
