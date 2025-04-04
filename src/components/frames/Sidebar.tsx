import { Box, Center, Image, NavLink, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainMenus, MenuItemType } from "../../config/menu-items";

const MenuItem: FC<MenuItemType> = ({ title, url, icon, children }) => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);

  const active = pathname === url;
  const theme = useMantineTheme();
  return (
    <NavLink
      to={{
        pathname: url,
      }}
      label={title}
      component={Link}
      leftSection={icon}
      py="xs"
      active={pathname === url}
      style={{
        textDecoration: "none",
        color: "#f1f1f1",
        fontSize: "16px",
        backgroundColor: active ? theme.colors.primary[3] : "transparent",
        borderRadius: "8px",
      }}
    >
      {children?.map((child) => (
        <MenuItem key={child.id} {...child} />
      ))}
    </NavLink>
  );
};

export const Sidebar = () => {
  return (
    <>
      <Box p="xs" bg={"#111827"}>
        <Center>
          <Image w={"100%"} h={50} src="/wimslogo.png" alt="profile-icon" />
        </Center>
      </Box>
      <Box p="sm">
        {MainMenus.map((menu) => (
          <MenuItem key={menu.id} {...menu} />
        ))}
      </Box>
    </>
  );
};
