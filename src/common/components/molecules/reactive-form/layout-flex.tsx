/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Box, BoxProps } from "@mantine/core";
import styled from "@emotion/styled";

const Fields = styled(Box)``;

const LayoutFlex: FC = (props) => {
  const { children, ...rest } = props;

  const fieldsProps: BoxProps = {
    sx: () => ({
      display: "flex",
      minWidth: "100%",
      flexDirection: "column",
      alignContent: "center"
    })
  };

  return (
    <Fields {...fieldsProps} {...rest}>
      {children}
    </Fields>
  );
};
export default LayoutFlex;
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
