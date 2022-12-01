/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import { Fragment, useCallback, useMemo } from "react";
import {
  DynamicFields,
  IFieldGroupMetaBase,
  ISmartField
} from "react-hm-dynamic-form";
import DropDown from "../drop-down";
import FormControl from "./form-control";
import FormFields from "./layout-with-list";
import { IFieldGroupMeta } from "./types/dynamic-form-with-list.type";
import RenderFields from "./render-fields";
import LayoutFlex from "./layout-flex";
import { IFieldGroupMetaFlex } from "./types";

interface IDynamicForm<T extends Record<string, any>> {
  methods: ISmartField<any, T>["methods"];
  errors: ISmartField<T>["errors"];
  fieldsGroupMeta: IFieldGroupMetaFlex<T>[];
}

type RenderGroupProps = Omit<IFieldGroupMeta<any>, "fieldsMeta">;

const ReactiveFormFlex = <T extends object>(props: IDynamicForm<T>) => {
  const { fieldsGroupMeta, methods, errors } = props;

  const MemoizedRenderLayout = useCallback(
    (group: RenderGroupProps) => <LayoutFlex />,
    []
  );

  return (
    <DynamicFields
      methods={methods}
      errors={errors}
      fieldsGroupMeta={fieldsGroupMeta as any}
      // renderGroup={MemoizedRenderGroup}
      renderLayout={MemoizedRenderLayout}
      renderFormControl={(controlProps) => <FormControl {...controlProps} />}
      renderFields={(props) => <RenderFields {...props} />}
    />
  );
};
export default ReactiveFormFlex;
