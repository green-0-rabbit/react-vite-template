/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { Outlet } from "react-router-dom";
import "twin.macro";

// ##
import styled from "@emotion/styled";
import { AppShell, Box, ScrollArea } from "@mantine/core";
import { IModuleLink } from "./interface";
import DrawerLayout from "./drawer-layout";
import AppBarLayout from "./app-bar-layout";

const Root = styled("div")``;
const RootContent = styled("div")`
  background-color: #f4f4f4;
  border-radius: 30px;
  /* height: 100vh; */
  /* overflow: hidden; */
`;
// ###
interface ILayout {
  modules: IModuleLink[];
}

const Layout: FC<ILayout> = (props) => {
  const { modules } = props;
  // const theme = useTheme();
  // const mediaQuerySM = useMediaQuery("(min-width: 900px)");
  // // (theme) => theme.breakpoints.up("sm")

  // // ###

  // const [open, setOpen] = useState(false);
  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpen(newOpen);
  // };
  return (
    <Root {...props}>
      <AppShell
        padding="xs"
        navbar={<DrawerLayout modules={modules} />}
        header={<AppBarLayout />}>
        <RootContent tw="sticky">
          <Box
            component={ScrollArea}
            scrollbarSize={8.6}
            tw="h-[100vh] px-4 pt-4 pb-20">
            <Outlet />
          </Box>
        </RootContent>
      </AppShell>
    </Root>
  );
};

export default Layout;
