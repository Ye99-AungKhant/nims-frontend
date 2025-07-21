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
import useUserStore from "../store/useUserStore";

const RootLayout = () => {
  useAuthRoute();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const { user, clearUser } = useUserStore.getState();

  const username = user ? user.name : "a";

  const handleLogout = () => {
    clearUser();
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
      <AppShell.Header h={{ base: 60, sm: 70 }}>
        <Box py={{ base: 8, sm: "md" }} px={{ base: 12, sm: 30 }}>
          <Flex w="100%" align="center" justify="space-between" gap={16}>
            <Flex align="center" gap={12} style={{ flex: 1, minWidth: 0 }}>
              <ActionIcon
                radius={50}
                variant="outline"
                onClick={toggleDesktop}
                size={"lg"}
                style={{ borderColor: "gray" }}
                color="#707070"
                visibleFrom="sm"
              >
                {desktopOpened ? <IconArrowLeft /> : <IconArrowRight />}
              </ActionIcon>
              <ActionIcon
                radius={50}
                variant="outline"
                onClick={toggleMobile}
                size={"lg"}
                style={{ borderColor: "gray" }}
                color="#707070"
                hiddenFrom="sm"
              >
                {mobileOpened ? <IconArrowLeft /> : <IconArrowRight />}
              </ActionIcon>
              <GlobalSearch />
            </Flex>
            {username && (
              <Flex
                align="center"
                gap={8}
                px={{ base: 0, sm: "md" }}
                style={{ whiteSpace: "nowrap" }}
              >
                <Popover width={250} trapFocus position="bottom" shadow="md">
                  <Popover.Target>
                    <Box
                      className="cursor-pointer"
                      w={40}
                      h={40}
                      bg="indigo"
                      p={0}
                      style={{
                        borderRadius: "100%",
                      }}
                    >
                      <Flex w="100%" h="100%" align="center" justify="center">
                        <Text p={0} c="white" size="md">
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
                      <Box>
                        <Flex gap={"sm"} align="center">
                          <Text size="sm" fw="bold">
                            Username:
                          </Text>
                          <Text size="sm">{username}</Text>
                        </Flex>
                        <Flex gap={"sm"} align="center">
                          <Text size="sm" fw="bold">
                            Role:
                          </Text>
                          <Text size="sm">{user?.role.name}</Text>
                        </Flex>
                      </Box>
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
                <Text size="md">{username}</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </AppShell.Header>
      <AppShell.Navbar bg={"#111827"} w={250} m={0}>
        <Sidebar mobileToggle={toggleMobile} />
      </AppShell.Navbar>
      <AppShell.Main
        pt={{ base: "60px", sm: "70px" }}
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
