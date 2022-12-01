/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Drawer,
  ScrollArea,
  DrawerProps,
  useMantineTheme
} from "@mantine/core";

import { FC } from "react";

import { useNavigate } from "react-router-dom";

import "twin.macro";

const DrawerBrand: FC = ({ ...props }) => {
  const { children } = props;
  const navigate = useNavigate();
  const theme = useMantineTheme();
  return (
    <>
      <Drawer
        opened
        onClose={() => navigate(-1)}
        // title="Register"
        padding="md"
        size="45%"
        overlayBlur={2}
        overlayOpacity={0.55}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        styles={() => ({
          root: {
            ".mantine-Drawer-drawer": {
              borderRadius: "20px 0px 0px 20px"
            }
          }
        })}>
        <ScrollArea style={{ height: "100%" }} tw="pb-6">
          {children}
        </ScrollArea>
      </Drawer>
    </>
  );
};

export default DrawerBrand;

// const UnstyledDrawer = ({
//   drawerWidth,
//   ...props
// }: DrawerProps & { drawerWidth: number }) => <Drawer {...props} />;

// const DrawerBrand = styled(UnstyledDrawer)`
//   width: ${(props) => props.drawerWidth}px;
//   & .MuiDrawer-paper {
//     width: ${(props) => props.drawerWidth}px;
//   }
// `;

// export default DrawerBrand;
