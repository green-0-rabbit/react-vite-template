import { FC } from "react";
import "twin.macro";
import {
  ActionIcon,
  Box,
  Group,
  Header,
  Input,
  Menu,
  Text,
  TextProps
} from "@mantine/core";
import { IconUserCircle, IconSearch, IconBell } from "@tabler/icons";

import { useNavigate } from "react-router-dom";
import { useService } from "react-service-locator";
import { AuthService } from "src/auth/auth.service";
import { BrandLogo } from "../atoms";
import { AuthStore } from "src/auth/auth.store";

interface IMenuItem {
  label: string;
  fontWeight?: "light" | "regular" | "medium" | "bold";
  color?: string;
  handleClick: () => void;
}

const AppBarLayout: FC<{ theme?: any }> = (props) => {
  // const { theme } = props;
  const navigate = useNavigate();
  const authStore = useService(AuthStore);

  const typographyprops = (item: any): TextProps => ({
    sx: {
      fontSize: "small",
      borderRadius: "50px",
      fontWeight: item.fontWeight ? item.fontWeight : ""
    },
    // variant: "subtitle1",
    color: item.color ? item.color : ""
  });
  const menuItem: IMenuItem[] = [
    {
      label: "Profile",
      handleClick: () => {
        navigate(`user`);
      }
    },
    {
      label: "Logout",
      fontWeight: "bold",
      handleClick: () => {
        authStore.signOut();
      }
    }
  ];
  return (
    <Header height={60} tw="border-none">
      <Group sx={{ height: "100%" }} align="center" px={20} position="apart">
        <BrandLogo size={46} />
        <Box tw="w-1/3">
          <Input
            variant="filled"
            size="md"
            radius="lg"
            icon={<IconSearch size={22} />}
            placeholder="Search..."
            sx={{ display: "flex" }}
          />
        </Box>
        <Box tw="flex items-center space-x-2">
          <ActionIcon variant="transparent">
            <IconBell color="#979797" />
          </ActionIcon>
          <Menu id="account-menu" position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent" tw="capitalize text-blue-600">
                <IconUserCircle size={30} color="#979797" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown tw="border-none rounded-[14px] shadow-[2px 2px 20px #ececec]">
              {menuItem.map((item) => (
                <Menu.Item
                  key={item.label}
                  onClick={() => {
                    item.handleClick();
                  }}
                  tw="rounded-[8px]">
                  <Text {...typographyprops(item)}>{item.label}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Group>
    </Header>
  );
};

export default AppBarLayout;
