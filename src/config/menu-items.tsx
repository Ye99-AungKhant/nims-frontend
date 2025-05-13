import {
  IconBackhoe,
  IconCircleArrowDown,
  IconRouter,
  IconServer2,
  IconSmartHome,
  IconUserCog,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { ReactElement } from "react";

export const Routes = {
  ROOT: "/",
  LOGIN: {
    PATH: "login",
    FULL_PATH: "/login",
  },
  DASHBOARD: {
    PATH: "/",
    FULL_PATH: "/",
  },
  INSTALL: {
    PATH: "installed",
    FULL_PATH: "/installed",
  },
  CLIENT: {
    PATH: "client",
    FULL_PATH: "/client",
  },
  USER: {
    PATH: "user",
    FULL_PATH: "/user",
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
    title: "Dashboard",
    url: Routes.DASHBOARD.FULL_PATH,
    icon: <IconSmartHome stroke={5} width={20} height={20} />,
  },
  {
    id: "2",
    title: "Objects",
    icon: <IconCircleArrowDown />,
    children: [
      {
        id: "2.1",
        title: "Installed Objects",
        url: Routes.INSTALL.FULL_PATH,
        icon: <IconCircleArrowDown />,
      },
    ],
  },
  {
    id: "3",
    title: "Clients",
    url: Routes.CLIENT.FULL_PATH,
    icon: <IconUsersGroup stroke={3} />,
  },
  {
    id: "4",
    title: "Users",
    icon: <IconUsers />,
    children: [
      {
        id: "4.1",
        title: "List All Users",
        url: Routes.USER.FULL_PATH,
        icon: <IconUsers />,
      },
      {
        id: "4.2",
        title: "List All Roles",
        url: "/role",
        icon: <IconUserCog />,
      },
    ],
  },
  // {
  //   id: "2",
  //   title: "Vehicle",
  //   icon: <IconBackhoe />,
  //   children: [
  //     {
  //       id: "2.1",
  //       title: "List All Vehicles",
  //       url: "/vehicle",
  //       icon: <IconBackhoe />,
  //     },
  //     {
  //       id: "2.2",
  //       title: "Create New Vehicles",
  //       url: "/vehicle/create",
  //       icon: <IconBackhoe />,
  //     },
  //   ],
  // },
  // {
  //   id: "3",
  //   title: "Device",
  //   icon: <IconRouter />,
  //   children: [
  //     {
  //       id: "3.1",
  //       title: "List All Devices",
  //       url: "/device",
  //       icon: <IconRouter />,
  //     },
  //     {
  //       id: "3.2",
  //       title: "Create New Devices",
  //       url: "/device/create",
  //       icon: <IconRouter />,
  //     },
  //   ],
  // },
  // {
  //   id: "4",
  //   title: "Server",
  //   icon: <IconServer2 />,
  //   children: [
  //     {
  //       id: "4.1",
  //       title: "List All Servers",
  //       url: "/server",
  //       icon: <IconServer2 />,
  //     },
  //     {
  //       id: "4.2",
  //       title: "Create New Servers",
  //       url: "/server/create",
  //       icon: <IconServer2 />,
  //     },
  //   ],
  // },
] as const;
