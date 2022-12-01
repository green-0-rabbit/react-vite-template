import { Box, Button, ButtonProps } from "@mantine/core";
import { FC } from "react";
import { DeepNonNullable, DynamicFields } from "react-hm-dynamic-form";
import { ReactiveListField } from "../reactive-list-field";

type TempType = Exclude<
  Parameters<typeof DynamicFields>[0]["renderFieldList"],
  undefined
>;

type RenderFieldListType = Parameters<TempType>["0"];
type CustomButtonProps = ButtonProps & React.ComponentPropsWithRef<"button">;

const RenderFieldList: FC<RenderFieldListType> = (props) => {
  const {
    fieldsMeta,
    methods,
    ids,
    defaultValue,
    hasErrors,
    listInputKey,
    renderSmartField,
    arrayMethods: arr
  } = props;
  return (
    <ReactiveListField
      fieldsMeta={fieldsMeta}
      ids={ids}
      defaultValue={defaultValue}
      row={({ id, fieldMeta, index }) => {
        const { inputKey: rowInputKey, ...rowRest } = fieldMeta;
        const fieldInputKey = `${listInputKey}.${index}.${rowInputKey}`;
        const partialError = hasErrors ? hasErrors[index] : undefined;
        let error;
        if (partialError && partialError[rowInputKey]) {
          error = partialError[rowInputKey];
        }
        const otherProps = {
          methods,
          isParentList: true,
          errors: error
        };
        const meta = {
          fieldMeta: {
            inputKey: fieldInputKey,
            ...rowRest
          }
        };

        const mergedProps = { ...meta, ...otherProps };
        return renderSmartField(mergedProps);
      }}
      renderAppend={() => {
        const addRowProps: CustomButtonProps = {
          // variant: "contained",
          onClick: defaultValue ? () => arr.append(defaultValue) : undefined
        };
        return (
          <Box>
            <Button {...addRowProps}>Add row</Button>
          </Box>
        );
      }}
      renderRemove={(rows) => {
        const removeRowProps = (indexes: number[]): CustomButtonProps => ({
          // variant: "contained",
          // color: "error",
          onClick: defaultValue ? () => arr.remove(indexes) : undefined
        });
        const indexes = rows.map((value, index) => index);
        return (
          <Box>
            <Button {...removeRowProps(indexes)}>Delete</Button>
          </Box>
        );
      }}
    />
  );
};

export default RenderFieldList;
