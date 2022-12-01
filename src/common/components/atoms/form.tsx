import styled from "@emotion/styled";
import { BoxProps, Box } from "@mantine/core";
import { FC } from "react";

type CustomBoxProps = BoxProps & React.ComponentPropsWithRef<"form">;

const UnstyledBox: FC<CustomBoxProps> = (props) => (
  <Box component="form" {...props} />
);

// const UnstyledDrawer = ({
//   drawerWidth,
//   ...props
// }: DrawerProps & { drawerWidth: number }) => <Drawer {...props} />;
const Form = styled(UnstyledBox)`
  display: flex;
  flex-direction: column;
`;
export default Form;
