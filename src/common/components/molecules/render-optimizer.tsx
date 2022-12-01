import { useFormContext } from "react-hook-form";
import { FC, Fragment, useMemo } from "react";
import { IFieldGroupMeta } from "./reactive-form";

type FieldMeta = IFieldGroupMeta<never>["fieldsMeta"][0];
interface IRenderOptimizer {
  fieldMeta: FieldMeta;
  defaultValue: any;
  renderInput: (
    fieldMeta: FieldMeta,
    methods: ReturnType<typeof useFormContext>,
    defaultValue: any
  ) => React.ReactNode;
}
/**
 * Render optimizer for react-hook-form useFormContext it's optional but recommended
 *  @see https://github.com/facebook/react/issues/15156#issuecomment-474590693
 */
const RenderOptimizer: FC<IRenderOptimizer> = (props) => {
  const { fieldMeta, renderInput, defaultValue } = props;
  const { inputKey } = fieldMeta;
  const methods = useFormContext();
  const value = methods.getValues(inputKey);

  return useMemo(() => {
    const CustomChildren = renderInput(fieldMeta, methods, defaultValue);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{CustomChildren}</>;
  }, [value]);
};

export default RenderOptimizer;
