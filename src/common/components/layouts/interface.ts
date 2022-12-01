import { MantineColor } from "@mantine/core";

export interface IModuleLink {
  label: string;
  icon: JSX.Element;
  color?: MantineColor;
  to?: string;
  isAdminModule: boolean;
  navBottom?: boolean;
  BottomProps?: {
    order: number;
  };
}
