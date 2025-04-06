import { Box, Center, Image, NavLink, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainMenus, MenuItemType } from "../../config/menu-items";

const MenuItem: FC<MenuItemType & { isChild?: boolean }> = ({
  title,
  url,
  icon,
  children,
  isChild = false,
}) => {
  const { pathname } = useLocation();

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
      childrenOffset={0}
      style={{
        textDecoration: "none",
        color: "#f1f1f1",
        fontSize: "16px",
        backgroundColor: active
          ? theme.colors.primary[3]
          : isChild
          ? "#111827"
          : "#1F2937",
        marginBottom: 1,
        paddingLeft: isChild ? 25 : "",
      }}
    >
      {children?.map((child) => (
        <MenuItem key={child.id} {...child} isChild={true} />
      ))}
    </NavLink>
  );
};

export const Sidebar = () => {
  return (
    <>
      <Box p={"xs"} bg={"#111827"}>
        <Center>
          <Image w={"100%"} h={50} src="/wimslogo.png" alt="profile-icon" />
        </Center>
      </Box>
      <Box
        style={{
          height: "100vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 20,
        }}
      >
        {MainMenus.map((menu) => (
          <MenuItem key={menu.id} {...menu} />
        ))}
      </Box>
    </>
  );
};
