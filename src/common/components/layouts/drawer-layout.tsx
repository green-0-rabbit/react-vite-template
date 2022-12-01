import { FC, useState } from "react";
import { NavBarItems } from "../molecules";
import { Box, List, Navbar, ScrollArea, Title } from "@mantine/core";
import { IModuleLink } from "./interface";
import "twin.macro";

const DrawerLayout: FC<{ modules: IModuleLink[] }> = ({ modules }) => {
  const [open, setOpen] = useState(true);
  const menu = (modules: IModuleLink[]) =>
    modules
      .filter((item) => !item.navBottom && item.to && !item.isAdminModule)
      .sort((a, b) => a.label.localeCompare(b.label));
  const bottomMenu = (modules: IModuleLink[]) =>
    modules
      .filter((item) => item.isAdminModule)
      .sort((a, b) => a.label.localeCompare(b.label));
  return (
    <Navbar
      width={{
        base: 52,
        sm: 52,
        lg: 52
      }}
      sx={{ overflow: "visible" }}
      pl={4}
      tw="border-none">
      <Navbar.Section
        grow
        mt="md"
        //  component={ScrollArea}
      >
        <Title
          order={6}
          sx={{
            opacity: open ? 0.75 : 0,
            fontSize: "13px",
            fontWeight: 600
            // paddingBottom: "10px"
          }}>
          {/* MODULES */}
        </Title>
        <List
          sx={{
            justifyContent: open ? "initial" : "center",
            px: 2.2,
            marginTop: 4
          }}>
          <NavBarItems
            data={menu(modules).map((item) => ({
              label: item.label,
              icon: item.icon,
              color: item.color ?? "",
              to: item.to!
            }))}
          />
        </List>
      </Navbar.Section>
      <Navbar.Section mb="xs">
        <Title
          order={6}
          sx={{
            opacity: open ? 0.75 : 0,
            fontSize: "13px",
            fontWeight: 600
            // paddingBottom: "12px"
          }}>
          {/* ADMINISTRATION */}
        </Title>
        <List
          sx={{
            marginTop: 4,
            overflow: "auto",
            justifyContent: open ? "initial" : "center"
          }}>
          <NavBarItems
            data={bottomMenu(modules).map((item) => ({
              label: item.label,
              icon: item.icon,
              color: item.color ?? "",
              to: item.to!
            }))}
          />
        </List>
      </Navbar.Section>
    </Navbar>
  );
};

export default DrawerLayout;
