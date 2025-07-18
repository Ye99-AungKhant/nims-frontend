import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useGetClientsWithContact } from "./hooks/useGetClientWithContact";
import {
  IconAddressBook,
  IconCloudDown,
  IconEdit,
  IconEye,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { DataTable } from "../../components/datatable/DataTable";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { useDeleteClientWithContact } from "./hooks/useDeleteClientWithContact";
import { clientPageColumns } from "./clientPageColumns";
import PermissionGate from "../../components/middleware/PermissionGate";

export const ClientPage = () => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: clientData, isLoading } = useGetClientsWithContact();
  const [deleteClient, setDeleteClient] = useState<number>();
  const { mutate: deleteClientWithContactMutate } =
    useDeleteClientWithContact();
  const navigate = useNavigate();

  const deleteClientSelect = (id: any) => {
    setDeleteClient(id);
    open();
  };

  const deleteClientWithContact = () => {
    console.log(deleteClient);

    deleteClientWithContactMutate(deleteClient);
    close();
  };

  return (
    <PermissionGate page={"clients"} scope={"view"}>
      <Box p={{ base: 8, sm: 30 }}>
        <Paper shadow="xs">
          <Box style={{ borderBottom: "1px solid #dddddd" }}>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              py="md"
              px={{ base: 15, sm: 30 }}
              gap={8}
              wrap="wrap"
              style={{ flexWrap: "wrap" }}
            >
              <Flex align="center" gap={8} style={{ minWidth: 0 }}>
                <IconAddressBook size={24} />
                <Text size="lg" fw={600} c={"dark"}>
                  Clients
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
                  page={"clients"}
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
                    New Client
                  </Button>
                </PermissionGate>
              </Group>
            </Flex>
          </Box>
          <Flex
            justify="space-between"
            align="start"
            mb={0}
            px={{ base: 15, sm: 30 }}
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
              columns={clientPageColumns}
              data={clientData?.items || []}
              totalPage={clientData?.totalPage}
              totalCount={clientData?.totalCount}
              enableRowOrdering={false}
              isLoading={isLoading}
              enableRowActions
              renderRowActions={({ row }) => {
                return (
                  <Group gap={"xs"} justify="center">
                    <ActionIcon
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
                    </ActionIcon>

                    <PermissionGate
                      page={"clients"}
                      scope={"update"}
                      errorProps={{ style: { display: "none" } }}
                    >
                      <ActionIcon
                        color={theme.colors.purple[1]}
                        size={30}
                        radius="lg"
                        variant="outline"
                        onClick={() =>
                          navigate("create", { state: { id: row.original.id } })
                        }
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                    </PermissionGate>

                    <PermissionGate
                      page={"clients"}
                      scope={"delete"}
                      errorProps={{ style: { display: "none" } }}
                    >
                      <ActionIcon
                        color={theme.colors.chocolate[1]}
                        radius="lg"
                        variant="outline"
                        onClick={() => deleteClientSelect(row.original.id)}
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
        <Modal
          opened={opened}
          onClose={close}
          title={
            <Text size="xl" fw={700} c={"dark"}>
              Confirm Delete Client
            </Text>
          }
          centered={false}
        >
          <Center>Are you sure you want to delete this record?</Center>
          <Group m="md" gap="md" justify="right">
            <Button radius={"lg"} size="sm" onClick={deleteClientWithContact}>
              Yes, Delete it!
            </Button>
            <Button radius={"lg"} size="sm" onClick={close} color="gray">
              Cancel
            </Button>
          </Group>
        </Modal>
      </Box>
    </PermissionGate>
  );
};
