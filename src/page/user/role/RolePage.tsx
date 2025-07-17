import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  SimpleGrid,
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
                <IconUserShield size={24} />
                <Text size="lg" fw={600} c={"dark"}>
                  Roles
                </Text>
              </Flex>
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
