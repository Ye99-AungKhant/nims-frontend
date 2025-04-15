import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
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
    <Box p="30px">
      <Paper shadow="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }}>
          <Flex justify={"space-between"} py="sm" px={30}>
            <Group gap={0}>
              <IconAddressBook size={24} />
              <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
                Clients
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
              <Button
                onClick={() => navigate("create")}
                leftSection={<IconPlus size={18} />}
                variant="outline"
                radius={"lg"}
                size="xs"
              >
                New Client
              </Button>
            </Group>
          </Flex>
        </Box>
        <Flex justify="space-between" align="center" mb={0} px="30px" pt="30px">
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
                  <ActionIcon
                    color={theme.colors.chocolate[1]}
                    radius="lg"
                    variant="outline"
                    onClick={() => deleteClientSelect(row.original.id)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
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
        <Center>Are you sure you want to delete?</Center>
        <Group mt="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" onClick={deleteClientWithContact}>
            Delete
          </Button>
          <Button radius={"lg"} size="sm" onClick={close} color="gray">
            Cancel
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};
