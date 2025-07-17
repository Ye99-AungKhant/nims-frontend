import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCloudDown,
  IconEdit,
  IconEye,
  IconPlus,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";
import { userPageColumns } from "./userPageColumns";
import PermissionGate from "../../components/middleware/PermissionGate";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteUserByAdmin } from "../../hooks/useDeleteUserByAdmin";

const UserPage = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteUser, setDeleteUser] = useState<number | string>(0);

  const { data, isLoading } = useGetAllUsers();
  const { mutate, isPending } = useDeleteUserByAdmin();

  const deleteUserSelect = (id: any) => {
    setDeleteUser(id);
    open();
  };

  return (
    <PermissionGate page={"users"} scope={"view"}>
      <Box p={{ base: 8, sm: 30 }}>
        <Paper shadow="xs">
          <Box style={{ borderBottom: "1px solid #dddddd" }}>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              py="md"
              px={{ base: 8, sm: 30 }}
              gap={8}
              wrap="wrap"
              style={{ flexWrap: "wrap" }}
            >
              <Flex align="center" gap={8} style={{ minWidth: 0 }}>
                <IconUsers size={24} />
                <Text size="lg" fw={600} c={"dark"}>
                  Users
                </Text>
              </Flex>
              <Group justify="center">
                {/* <Button
                  onClick={() => {}}
                  leftSection={<IconCloudDown size={18} />}
                  variant="outline"
                  radius={"lg"}
                  size="xs"
                >
                  Export
                </Button> */}

                <PermissionGate
                  page={"users"}
                  scope={"create"}
                  errorProps={{ style: { display: "none" } }}
                >
                  <Button
                    onClick={() => navigate("create")}
                    leftSection={<IconPlus size={18} />}
                    variant="outline"
                    radius={"lg"}
                    size="xs"
                  >
                    New User
                  </Button>
                </PermissionGate>
              </Group>
            </Flex>
          </Box>
          <Flex
            justify="space-between"
            align="start"
            mb={0}
            px={{ base: 8, sm: 30 }}
            pt={{ base: 8, sm: 30 }}
            wrap="wrap"
            gap={"xs"}
          >
            <SimpleGrid
              cols={{ base: 2, sm: 2, md: 6 }}
              spacing="lg"
              style={{ flex: 1, minWidth: "300px" }}
            >
              <Flex align="center" gap={5}>
                <Text color={theme.colors.purple[0]} fz="md">
                  Show
                </Text>
                <PageSizeSelect />
                <Text color={theme.colors.purple[0]} fz="md">
                  entries
                </Text>
              </Flex>
            </SimpleGrid>
            <SearchInput size="sm" leftSection name={"search"} />
          </Flex>
          <Box py={"md"} px={{ base: 8, sm: 30 }}>
            <DataTable
              columns={userPageColumns}
              data={data?.items || []}
              totalPage={data?.totalPage}
              totalCount={data?.totalCount}
              enableRowOrdering={false}
              isLoading={isLoading}
              enableRowActions
              renderRowActions={({ row }) => {
                return (
                  <Group gap={"xs"} justify="center">
                    {/* <ActionIcon
                      color={theme.colors.chocolate[1]}
                      size={30}
                      radius="lg"
                      variant="outline"
                      onClick={() =>
                        navigate("detail", {
                          state: {
                            id: row.original.id,
                          },
                        })
                      }
                    >
                      <IconEye size={18} />
                    </ActionIcon> */}

                    <PermissionGate
                      page={"users"}
                      scope={"update"}
                      errorProps={{ style: { display: "none" } }}
                    >
                      <ActionIcon
                        color={theme.colors.purple[1]}
                        size={30}
                        radius="lg"
                        variant="outline"
                        onClick={() =>
                          navigate("create", { state: { data: row.original } })
                        }
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                    </PermissionGate>

                    <PermissionGate
                      page={"users"}
                      scope={"delete"}
                      errorProps={{ style: { display: "none" } }}
                    >
                      <ActionIcon
                        color={theme.colors.chocolate[1]}
                        radius="lg"
                        variant="outline"
                        onClick={() => deleteUserSelect(row.original.id)}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </PermissionGate>
                  </Group>
                );
              }}
            />
          </Box>
        </Paper>
        <DeleteConfirmModal
          opened={opened}
          mutationFn={mutate}
          isloading={isPending}
          onClose={close}
          title={"User"}
          id={deleteUser}
        />
      </Box>
    </PermissionGate>
  );
};

export default UserPage;
