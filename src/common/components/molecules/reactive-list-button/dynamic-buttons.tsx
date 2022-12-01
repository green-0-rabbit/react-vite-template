/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
import { CSSProperties, FC, Fragment, ReactElement } from "react";
import { ISmartButton } from "./types";

interface IDynamicButtons {
  actionsMeta: ISmartButton[];
  renderButtons: (actionMeta: ISmartButton) => ReactElement<any>;
}
const DynamicButtons: FC<IDynamicButtons> = (props) => {
  const { actionsMeta, renderButtons } = props;
  const contentStyle: CSSProperties = {
    marginInline: "5px",
    width: actionsMeta.length === 1 ? "100%" : "",
    display: "flex",
    justifyContent: actionsMeta.length === 1 ? "end" : ""
  };
  return (
    <Fragment>
      {actionsMeta.map((actionMeta) => (
        <div style={contentStyle} key={actionMeta.name.replaceAll(" ", "")}>
          {renderButtons(actionMeta)}
        </div>
      ))}
    </Fragment>
  );
};

export default DynamicButtons;
