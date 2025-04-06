import {
  IconArrowBarToDown,
  IconBackhoe,
  IconBusFilled,
  IconCircleArrowDown,
  IconCpu,
  IconExchange,
  IconHomeFilled,
  IconRouter,
  IconServer2,
  IconSmartHome,
  IconTruck,
  IconTruckDelivery,
  IconTruckFilled,
  IconUserPlus,
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
    id: "6",
    title: "Dashboard",
    url: Routes.DASHBOARD.FULL_PATH,
    icon: <IconSmartHome stroke={5} width={20} height={20} />,
  },
  {
    id: "5",
    title: "Installed",
    icon: <IconCircleArrowDown />,
    children: [
      {
        id: "5.1",
        title: "List All Installed",
        url: Routes.INSTALL.FULL_PATH,
        icon: <IconCircleArrowDown />,
      },
      {
        id: "5.2",
        title: "Create New Installation",
        url: `${Routes.INSTALL.FULL_PATH}/create`,
        icon: <IconCircleArrowDown />,
      },
    ],
  },
  {
    id: "1",
    title: "Clients",
    url: Routes.CLIENT.FULL_PATH,
    icon: <IconUsersGroup stroke={3} />,
  },
  {
    id: "2",
    title: "Vehicle",
    icon: <IconBackhoe />,
    children: [
      {
        id: "2.1",
        title: "List All Vehicles",
        url: "/vehicle",
        icon: <IconBackhoe />,
      },
      {
        id: "2.2",
        title: "Create New Vehicles",
        url: "/vehicle/create",
        icon: <IconBackhoe />,
      },
    ],
  },
  {
    id: "3",
    title: "Device",
    icon: <IconRouter />,
    children: [
      {
        id: "3.1",
        title: "List All Devices",
        url: "",
        icon: <IconRouter />,
      },
      {
        id: "3.2",
        title: "Create New Devices",
        url: Routes.DASHBOARD.FULL_PATH,
        icon: <IconRouter />,
      },
    ],
  },
  {
    id: "4",
    title: "Server",
    icon: <IconServer2 />,
    children: [
      {
        id: "4.1",
        title: "List All Servers",
        url: "",
        icon: <IconServer2 />,
      },
      {
        id: "4.2",
        title: "Create New Servers",
        url: Routes.DASHBOARD.FULL_PATH,
        icon: <IconServer2 />,
      },
    ],
  },
] as const;
