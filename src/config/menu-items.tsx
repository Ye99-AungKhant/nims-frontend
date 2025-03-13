import { IconArrowBarToDown, IconExchange } from "@tabler/icons-react";
import { ReactElement } from "react";

export const Routes = {
  ROOT: "/",
  LOGIN: {
    PATH: "login",
    FULL_PATH: "/login",
  },
  DASHBOARD: {
    PATH: "d",
    FULL_PATH: "/d",
  },
} as const;

export type MenuItemType = {
  id: string;
  title: string;
  children?: MenuItemType[];
  url?: string;
  icon: ReactElement;
};

export const MainMenus: MenuItemType[] = [
  {
    id: "1",
    title: "Installing",
    icon: <IconArrowBarToDown width={20} height={20} />,
    children: [
      {
        id: "2",
        title: "List All Installed",
        url: Routes.ROOT,
        icon: <IconArrowBarToDown width={20} height={20} />,
      },
      // {
      //   id: "3",
      //   title: "Create New Installation",
      //   url: Routes.DASHBOARD.FULL_PATH,
      //   icon: <IconArrowBarToDown width={20} height={20} />,
      // },
      // {
      //   id: "4",
      //   title: "Import Installation",
      //   url: Routes.DASHBOARD.FULL_PATH,
      //   icon: <IconArrowBarToDown width={20} height={20} />,
      // },
    ],
  },
] as const;
