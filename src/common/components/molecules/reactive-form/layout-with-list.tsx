/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, BoxProps } from "@mantine/core";
import { BreakpointType, getBKValue } from "src/common/utils";
import { usePrevious } from "src/common/hooks";
import { ILayoutWithList, GroupLayoutType } from "./types";

type LayoutWithListProps = ILayoutWithList<any> & BoxProps;

interface ILayoutWithListProps extends LayoutWithListProps {
  currentBreakpoint: BreakpointType;
}

const checkLayout = (
  groupLayouts: GroupLayoutType<any, any>[],
  breakpoint: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenSelectors: any = {};
  groupLayouts.forEach((groupLayout) => {
    let { rowStart } = groupLayout;
    const colStart = groupLayout.columnStart;
    const { colSpan } = groupLayout;

    // check rowStart and columnStart limit related to group rowEnd and columnEnd
    for (const fieldGroup of groupLayout.fieldGroups) {
      const cssSelector = `& [data-field='${fieldGroup.inputKey}']`;
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const childrenSelector: BoxProps["sx"] = {
        gridRow: `${rowStart} / span ${fieldGroup.rowSpan} `,
        gridColumn:
          breakpoint === "sm"
            ? colStart === 2 && colSpan > 1
              ? `${colStart} / span 1`
              : colStart === 1 && colSpan > 2
              ? `${colStart} / span 2`
              : `${colStart} / span ${colSpan}`
            : `${colStart} / span ${colSpan}`
      };
      rowStart += fieldGroup.rowSpan;
      childrenSelectors[cssSelector] = childrenSelector;
    }
  });

  return childrenSelectors;
};

const LayoutWithList: FC<ILayoutWithListProps> = (props) => {
  const {
    children,
    columnGap = 25,
    rowGap = 0,
    groupLayouts,
    currentBreakpoint,
    ...rest
  } = props;
  let result: object = {};
  const previousBreakpoint = usePrevious(currentBreakpoint);

  if (groupLayouts) {
    result = checkLayout(groupLayouts, currentBreakpoint);
  }

  const fieldsProps: BoxProps = {
    sx: (theme) => ({
      display: "grid",
      // justifyItems:'center',
      // border:
      //   breakpoint === "lg"
      //     ? "3px solid pink"
      //     : breakpoint === "sm"
      //     ? "3px solid green"
      //     : "3px solid red",
      gridTemplateColumns: getBKValue({
        breakpoints: {
          base: "minmax(150px, 1fr)",
          sm: `repeat(2, minmax(100px, 1fr))`,
          lg: `repeat(3, minmax(100px, 1fr))`
        },
        currentBreakpoint,
        previousBreakpoint
      }),
      gridAutoRows: "minmax(40px, auto)",
      columnGap: `${columnGap}px`,
      rowGap: `${rowGap}px`,
      ...result
    })
  };

  return (
    <Box {...fieldsProps} {...rest}>
      {children}
    </Box>
  );
};
export default LayoutWithList;
/* test
import { groupLayoutGuard as gLGuard } from '../common/types';
const formFieldsProps: Parameters<typeof FormFields>[0] = {
  groupLayouts: gLGuard([
    {
      rowStart: 1,
      columnStart: 1,
      colSpan: 2,
      fieldGroups: [
        {
          rowSpan: 1,
          inputKey: 'field1.azer1'
        },
        {
          rowSpan: 1,
          inputKey: 'field2'
        }
      ]
    }
  ])
};

    <FormFields {...formFieldsProps}>
      <Box data-field="field1.azer1" tw="bg-red-300 p-2">
        Fields 1
      </Box>
      <Box data-field="field2" tw="bg-yellow-300 p-2">
        Fields 2
      </Box>
      <Box data-field="field3" tw="bg-green-300 p-2">
        Fields 3
      </Box>
      <Box data-field="field4" tw="bg-gray-300 p-2">
        Fields 4
      </Box>
      <Box data-field="field5" tw="bg-blue-300 p-2">
        Fields 5
      </Box>
    </FormFields>

*/
