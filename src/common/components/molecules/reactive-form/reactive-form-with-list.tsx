/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-fragments */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";
import { DynamicFields, ISmartField } from "react-hm-dynamic-form";
import { Skeleton, Stack, useMantineTheme } from "@mantine/core";
import useDimensions from "react-cool-dimensions";
import { ResizeObserver } from "@juggle/resize-observer";
import { BreakpointType } from "src/common/utils";
import DropDown from "../drop-down";
import FormControl from "./form-control";
import LayoutWithList from "./layout-with-list";
import { IFieldGroupMeta } from "./types/dynamic-form-with-list.type";
import RenderFields from "./render-fields";
import RenderFieldList from "./render-field-list";

interface IDynamicForm<T extends object> {
  methods: ISmartField<any, T>["methods"];
  errors: ISmartField<T>["errors"];
  fieldsGroupMeta: IFieldGroupMeta<T>[];
  data?: T;
}

type RenderGroupProps = Omit<IFieldGroupMeta<any>, "fieldsMeta">;

const ReactiveFormWithList = <T extends object>(props: IDynamicForm<T>) => {
  const theme = useMantineTheme();
  const { observe, currentBreakpoint } = useDimensions({
    useBorderBoxSize: true,
    polyfill: ResizeObserver,
    breakpoints: { ...theme?.breakpoints, base: 0 },
    updateOnBreakpointChange: true
  });

  const { fieldsGroupMeta, methods, errors, data } = props;
  const MemoizedRenderGroup = useCallback(
    // @see https://codepen.io/ariperkkio/pen/vYLodLB?editors=1010
    (group: RenderGroupProps) => (
      <DropDown
        style={{ marginBlock: "10px" }}
        title={group.groupName}
        fixed={group.isfixed}
        defaultExpanded={group.defaultExpanded}
      />
    ),
    []
  );
  const MemoizedRenderLayout = useCallback(
    (group: RenderGroupProps) => (
      <LayoutWithList
        currentBreakpoint={currentBreakpoint as BreakpointType}
        {...group}
      />
    ),
    [currentBreakpoint]
  );

  return (
    <div style={{ width: "100%" }} ref={observe}>
      {data ? (
        <DynamicFields
          methods={methods}
          errors={errors}
          fieldsGroupMeta={fieldsGroupMeta as any}
          // renderGroup={MemoizedRenderGroup}
          renderLayout={MemoizedRenderLayout}
          renderFormControl={(controlProps) => (
            <FormControl {...controlProps} />
          )}
          renderFields={(props) => <RenderFields {...props} />}
          renderFieldList={(params) => <RenderFieldList {...params} />}
          useFieldArray={useFieldArray}
          currentBreakpoint={currentBreakpoint}
        />
      ) : (
        <Stack spacing={1}>
          <Skeleton
            width="auto"
            height={200}
            sx={{
              margin: "5px",
              borderRadius: "10px"
            }}
          />
          <Skeleton
            width="auto"
            height={200}
            sx={{
              margin: "5px",
              borderRadius: "10px"
            }}
          />
        </Stack>
      )}
    </div>
  );
};
export default ReactiveFormWithList;
