import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Flex,
  Group,
  Popover,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconLogout } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./frames/Sidebar";
import { SearchInput } from "./common/SearchInput";

const RootLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const username = "Ye";
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
        <Box p="md">
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
              <SearchInput
                size="sm"
                radius={"xl"}
                placeholder="Search client name or company..."
                w={210}
              />
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
                          {username[0]?.toUpperCase()}
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
                    <Button w="100%" color="red" size="sm">
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
      <AppShell.Navbar bg={"#1F2937"} w={250}>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main
        pt="100px"
        style={{
          backgroundColor: "var(--mantine-color-gray-0)",
          overflowX: "auto",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
