import {
  IconAntennaBars5,
  IconDeviceSim,
  IconDownload,
  IconGitCompare,
  IconHome,
  IconPaperclip,
  IconReport,
  IconUsers,
  IconUsersGroup,
  IconUserShield,
  IconRouter,
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
  ROLE: {
    PATH: "role",
    FULL_PATH: "/role",
  },
  REPORT: {
    PATH: "report",
    CLIENT_PATH: "/report/clients",
    GPS_PATH: "/report/gps",
    SIM_PATH: "/report/simcard",
    PERIPHERALS_PATH: "/report/peripherals",
    ACCESSORIES_PATH: "/report/accessories",
  },
  LOG: {
    PATH: "log",
    FULL_PATH: "/log",
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
    icon: <IconHome />,
  },
  {
    id: "2",
    title: "Objects",
    icon: <IconDownload />,
    children: [
      {
        id: "2.1",
        title: "Installed Objects",
        url: Routes.INSTALL.FULL_PATH,
        icon: <IconDownload />,
      },
    ],
  },
  {
    id: "3",
    title: "Clients",
    url: Routes.CLIENT.FULL_PATH,
    icon: <IconUsersGroup />,
  },
  {
    id: "4",
    title: "Users",
    icon: <IconUsers />,
    children: [
      {
        id: "4.1",
        title: "Users",
        url: Routes.USER.FULL_PATH,
        icon: <IconUsers />,
      },
      {
        id: "4.2",
        title: "Roles",
        url: Routes.ROLE.FULL_PATH,
        icon: <IconUserShield />,
      },
    ],
  },
  {
    id: "5",
    title: "Reports",
    icon: <IconAntennaBars5 />,
    children: [
      {
        id: "5.1",
        title: "Clients Report",
        url: Routes.REPORT.CLIENT_PATH,
        icon: <IconUsersGroup />,
      },
      {
        id: "5.2",
        title: "GPS Devices Report",
        url: Routes.REPORT.GPS_PATH,
        icon: <IconRouter />,
      },
      {
        id: "5.3",
        title: "SIM Cards Report",
        url: Routes.REPORT.SIM_PATH,
        icon: <IconDeviceSim />,
      },
      {
        id: "5.4",
        title: "Peripherals Report",
        url: Routes.REPORT.PERIPHERALS_PATH,
        icon: <IconGitCompare />,
      },
      {
        id: "5.5",
        title: "Accessories Report",
        url: Routes.REPORT.ACCESSORIES_PATH,
        icon: <IconPaperclip />,
      },
    ],
  },
  {
    id: "6",
    title: "Logs",
    url: Routes.LOG.FULL_PATH,
    icon: <IconReport />,
  },
] as const;
