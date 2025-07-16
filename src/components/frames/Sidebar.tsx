import {
  Box,
  Center,
  Flex,
  Image,
  NavLink,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainMenus, MenuItemType } from "../../config/menu-items";
import { environment } from "../../config/enviroment/environment";

interface SidebarProps {
  mobileToggle?: () => void;
}
const MenuItem: FC<
  MenuItemType & { isChild?: boolean; mobileToggle?: () => void }
> = ({ title, url, icon, children, isChild = false, mobileToggle }) => {
  const { pathname } = useLocation();
  let isActive = pathname === url || pathname.startsWith(url + "/");

  const theme = useMantineTheme();
  return (
    <NavLink
      to={{
        pathname: url,
      }}
      onClick={() => {
        if (mobileToggle && !children?.length) mobileToggle();
      }}
      label={title}
      component={Link}
      leftSection={icon}
      py="xs"
      childrenOffset={0}
      style={{
        textDecoration: "none",
        color: "#f1f1f1",
        fontSize: "16px",
        backgroundColor: isActive
          ? theme.colors.primary[3]
          : isChild
          ? "#111827"
          : "#1F2937",
        marginBottom: 1,
        paddingLeft: isChild ? 25 : "",
      }}
    >
      {children?.map((child) => (
        <MenuItem
          key={child.id}
          {...child}
          isChild={true}
          mobileToggle={mobileToggle}
        />
      ))}
    </NavLink>
  );
};

export const Sidebar = ({ mobileToggle }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        p={"xs"}
        bg={"#111827"}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
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
          <MenuItem key={menu.id} {...menu} mobileToggle={mobileToggle} />
        ))}
      </Box>
      <Text m={"md"} c={"gray.5"}>
        v {environment.App_Version}
      </Text>
    </>
  );
};
