import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Flex,
  Group,
  Popover,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconLogout } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./frames/Sidebar";
import { SearchInput } from "./common/SearchInput";
import { GlobalSearch } from "./common/GlobalSearch";
import { useAuthRoute } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  useAuthRoute();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const authUserRaw = localStorage.getItem("authUser");
  const authUser = authUserRaw ? JSON.parse(authUserRaw) : null;

  const username = authUser ? authUser.name : "a";

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <AppShell
      layout="alt"
      padding={0}
      styles={{
        main: {
          overflow: "hidden",
          position: "relative",
        },
      }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header h={70}>
        <Box py="md" px={30}>
          <Flex w="100%" justify="space-between" align="center">
            <Group>
              <ActionIcon
                radius={50}
                variant="outline"
                onClick={toggleDesktop}
                size={"lg"}
                style={{ borderColor: "gray" }}
                color="#707070"
              >
                {desktopOpened ? <IconArrowLeft /> : <IconArrowRight />}
              </ActionIcon>
              {/* <Burger onClick={toggleMobile} hiddenFrom="sm" /> */}
              <GlobalSearch />
            </Group>

            {username && (
              <Flex px="md" gap="sm" align="center">
                <Popover width={250} trapFocus position="bottom" shadow="md">
                  <Popover.Target>
                    <Box
                      className="cursor-pointer"
                      w="40px"
                      h="40px"
                      bg="indigo"
                      p="0"
                      style={{
                        borderRadius: "100%",
                      }}
                    >
                      <Flex w="100%" h="100%" align="center" justify="center">
                        <Text p="0" c="white">
                          {username
                            ?.split(" ")
                            ?.map((part: any) => part[0])
                            ?.join("")
                            .toUpperCase()}
                        </Text>
                      </Flex>
                    </Box>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Box py="sm">
                      <Flex gap="sm" align="center">
                        <Text size="sm" fw="bold">
                          Username:
                        </Text>
                        <Text size="sm">{username}</Text>
                      </Flex>
                    </Box>
                    <Button
                      w="100%"
                      color="red"
                      size="sm"
                      onClick={handleLogout}
                    >
                      <Flex align="center" gap="xs">
                        <IconLogout width={18} height={18} />
                        Logout
                      </Flex>
                    </Button>
                  </Popover.Dropdown>
                </Popover>
                <Text size="sm">{username}</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </AppShell.Header>
      <AppShell.Navbar bg={"#111827"} w={250} m={0}>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main
        pt={"70px"}
        style={{
          backgroundColor: theme.colors.silver[1],
          overflowX: "auto",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
