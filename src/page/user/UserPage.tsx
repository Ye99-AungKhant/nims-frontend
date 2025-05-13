import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
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
      <Box p="30px">
        <Paper shadow="md">
          <Box style={{ borderBottom: "1px solid #dddddd" }}>
            <Flex justify={"space-between"} py="md" px={30}>
              <Group gap={0}>
                <IconUsers size={24} />
                <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
                  Users
                </Text>
              </Group>
              <Group justify="center">
                <Button
                  onClick={() => {}}
                  leftSection={<IconCloudDown size={18} />}
                  variant="outline"
                  radius={"lg"}
                  size="xs"
                >
                  Export
                </Button>

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
            align="center"
            mb={0}
            px="30px"
            pt="30px"
          >
            <Group gap={"xs"}>
              <Text color={theme.colors.purple[0]} fz="md">
                Show
              </Text>
              <PageSizeSelect />
              <Text color={theme.colors.purple[0]} fz="md">
                entries
              </Text>
            </Group>
            <SearchInput size="sm" leftSection name={"search"} />
          </Flex>
          <Box p="30px" pt={"md"}>
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
