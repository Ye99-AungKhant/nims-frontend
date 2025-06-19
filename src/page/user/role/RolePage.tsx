import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconUserShield } from "@tabler/icons-react";
import { PageSizeSelect } from "../../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../../components/common/SearchInput";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../components/datatable/DataTable";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useGetAuthAccessRole } from "../../../hooks/useGetAuthAccessRole";
import PermissionGate from "../../../components/middleware/PermissionGate";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useCreateRole } from "../../client/hooks/useCreateRole";

const rolePageColumns: MRT_ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
];

const RolePage = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [name, setName] = useState<string>();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createRole, isPending: createRoleLoading } = useCreateRole();

  const { data, isLoading } = useGetAuthAccessRole();

  const handleCreateRole = () => {
    if (!name) return;
    const data = { name, canLogin: true };
    createRole(data, {
      onSuccess: () => {
        close();
        setName("");
      },
    });
  };
  return (
    <PermissionGate page={"roles"} scope={"view"}>
      <Box p="30px">
        <Paper shadow="md">
          <Box style={{ borderBottom: "1px solid #dddddd" }}>
            <Flex justify={"space-between"} py="md" px={30}>
              <Group gap={0}>
                <IconUserShield size={24} />
                <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
                  Roles
                </Text>
              </Group>
              <Group justify="center">
                <PermissionGate
                  page={"roles"}
                  scope={"create"}
                  errorProps={{ style: { display: "none" } }}
                >
                  <Button
                    onClick={open}
                    leftSection={<IconPlus size={18} />}
                    variant="outline"
                    radius={"lg"}
                    size="xs"
                  >
                    New Role
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
              columns={rolePageColumns}
              data={data?.items || []}
              totalPage={data?.totalPage}
              totalCount={data?.totalCount}
              enableRowOrdering={false}
              isLoading={isLoading}
              mantineTableBodyRowProps={({ row }) => {
                const isSuperAdmin = row.original.name === "Super Admin";

                return {
                  onClick: isSuperAdmin
                    ? undefined
                    : () => {
                        navigate("detail", {
                          state: { roleData: row.original },
                        });
                      },
                  style: {
                    cursor: isSuperAdmin ? "default" : "pointer",
                  },
                };
              }}
            />
          </Box>
        </Paper>

        <Modal
          opened={opened}
          onClose={close}
          centered={false}
          title={"Role"}
          size={"lg"}
        >
          <Box px={20}>
            <TextInput
              label={`Add New Role`}
              withAsterisk
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Divider my={"md"} color="#dddddd" />
          <Group gap="md" justify="right" pb={"md"} mr={"md"}>
            <Button radius={"lg"} size="sm" onClick={close} color="gray">
              Cancel
            </Button>
            <Button
              radius={"lg"}
              size="sm"
              color={theme.colors.purple[1]}
              onClick={handleCreateRole}
              loading={createRoleLoading}
            >
              Save
            </Button>
          </Group>
        </Modal>
      </Box>
    </PermissionGate>
  );
};

export default RolePage;
