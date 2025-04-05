import {
  ActionIcon,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Select,
  Table,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ListTable } from "./components/ListTable";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useGetClientsWithContact } from "./hooks/useGetClientWithContact";
import {
  IconCloudDown,
  IconEdit,
  IconEye,
  IconMail,
  IconMailFilled,
  IconPhoto,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { ContactPersonForm } from "./components/ContactPersonForm";
import { useCreateContact } from "./hooks/useCreateContact";
import { useDeleteContact } from "./hooks/useDeleteContact";
import { DataTable } from "../../components/datatable/DataTable";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import { useDeleteClientWithContact } from "./hooks/useDeleteClientWithContact";
import { clientPageColumns } from "./clientPageColumns";

interface ContactPerson {
  id: number;
  name: string;
  role: any;
  phone: string;
  email: string;
}

export const ClientPage = () => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: clientData, isLoading } = useGetClientsWithContact();
  const [searchFilter, SetSearchFilter] = useState<any[]>();
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<number>();
  const [deleteClient, setDeleteClient] = useState<number>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editValues, setEditValues] = useState<ContactPerson | null>(null);
  const { mutate: createMutate } = useCreateContact();
  const { mutate: deleteMutate } = useDeleteContact();
  const { mutate: deleteClientWithContactMutate } =
    useDeleteClientWithContact();
  const { getParam } = useParamsHelper();
  const navigate = useNavigate();

  // console.log(searchFilter);

  const handleEditClick = (row: ContactPerson) => {
    setEditValues(row);
    setOpenEditModal(true);
  };

  const createContact = (params: any) => {
    console.log("create:", { ...params, client_id: selectedClient });
    createMutate(
      { ...params, client_id: selectedClient },
      {
        onSuccess: (res) => {
          setOpenCreateModal(false);
          setSelectedContacts((prev) => [...(prev || []), res?.data.data]);
        },
      }
    );
  };

  const deleteContact = (param: any) => {
    deleteMutate(param, {
      onSuccess: () => {
        setSelectedContacts((prev) => prev.filter((data) => data.id != param));
      },
    });
  };

  const deleteClientSelect = (id: any) => {
    setDeleteClient(id);
    open();
  };

  const deleteClientWithContact = () => {
    console.log(deleteClient);

    deleteClientWithContactMutate(deleteClient);
    close();
  };

  useEffect(() => {
    SetSearchFilter(clientData?.items);
  }, [clientData]);

  useEffect(() => {
    if (getParam("criteria")) {
      const filtered = searchFilter?.filter((client: any) =>
        client.client_name
          .toLowerCase()
          .includes(getParam("criteria")?.toLowerCase())
      );
      console.log(filtered);

      SetSearchFilter(filtered);
    } else {
      SetSearchFilter(clientData?.items);
    }
  }, [getParam("criteria")]);

  return (
    <Box px="md">
      <Paper shadow="xs">
        <Box style={{ borderBottom: "1px solid #dddddd" }}>
          <Flex justify={"space-between"} p="sm">
            <Text size="lg" fw={600} c="black">
              Clients
            </Text>
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
        <Flex justify="space-between" align="center" mb={0} px="md" pt={"md"}>
          <Group gap={"xs"}>
            <Text color={theme.colors.purple[0]} fz="md">
              Show
            </Text>
            <PageSizeSelect />
            <Text color={theme.colors.purple[0]} fz="md">
              entries
            </Text>
          </Group>
          <SearchInput size="sm" leftSection />
        </Flex>
        <Box p={"md"}>
          <DataTable
            columns={clientPageColumns}
            data={searchFilter || []}
            total={clientData?.totalCount}
            enableRowOrdering={false}
            isLoading={isLoading}
            enableRowActions
            renderRowActions={({ row }) => {
              return (
                <Group gap={"xs"}>
                  <ActionIcon
                    color={theme.colors.chocolate[1]}
                    size={30}
                    radius="lg"
                    variant="outline"
                    onClick={() =>
                      navigate("detail", {
                        state: {
                          data: row.original,
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
