import {
  ActionIcon,
  Box,
  Button,
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
import { clientPageColumns } from "./clientPageColumns";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";

interface ContactPerson {
  id: number;
  name: string;
  role: any;
  phone: string;
  email: string;
}

export const ClientPage = () => {
  const [open, setOpen] = useState(false);
  const { data: clientData, isLoading } = useGetClientsWithContact();
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<number>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editValues, setEditValues] = useState<ContactPerson | null>(null);
  const { mutate: createMutate } = useCreateContact();
  const { mutate: deleteMutate } = useDeleteContact();
  const navigate = useNavigate();

  const openModal = (client: any) => {
    setSelectedContacts(client.contact_person);
    setSelectedClient(client.id);
    setOpen(true);
  };

  console.log("clientData", clientData);

  // const rows = clientData?.data?.data?.map((element: any, index: number) => (
  //   <Table.Tr
  //     key={index}
  //     onClick={() => openModal(element)}
  //     style={{ cursor: "pointer" }}
  //   >
  //     <Table.Td style={{ fontSize: 17 }}>{element.name}</Table.Td>
  //     <Table.Td style={{ fontSize: 17, width: 300 }}>
  //       {element.address}
  //     </Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {element.contact_person[0].name}
  //     </Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {element.contact_person[0].role.name}
  //     </Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {element.contact_person[0].email}
  //     </Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {element.contact_person[0].phone}
  //     </Table.Td>
  //     <Table.Td>
  //       <Group gap={0}>
  //         <ActionIcon color="yellow" size={30} radius="lg" variant="outline">
  //           <IconEdit size={18} />
  //         </ActionIcon>
  //         <ActionIcon color="red" radius="lg" variant="outline">
  //           <IconTrash size={18} />
  //         </ActionIcon>
  //       </Group>
  //     </Table.Td>
  //   </Table.Tr>
  // ));

  const handleEditClick = (row: ContactPerson) => {
    setEditValues(row);
    setOpenEditModal(true);
  };

  const updateContact = () => {};

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
        <Modal
          opened={open}
          onClose={() => setOpen(false)}
          title="Contact Person"
          size={"70%"}
          centered
        >
          <Group>
            <ActionIcon size={20} onClick={() => setOpenCreateModal(true)}>
              <IconPlus size={16} />
            </ActionIcon>
            <Text size="lg" c={"black"}>
              New Contact
            </Text>
          </Group>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ fontSize: 18 }}>Name</Table.Th>
                <Table.Th style={{ fontSize: 18 }}>Role</Table.Th>
                <Table.Th style={{ fontSize: 18 }}>Phone No.</Table.Th>
                <Table.Th style={{ fontSize: 18 }}>Email</Table.Th>
                <Table.Th style={{ fontSize: 18 }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {selectedContacts.map((contact) => (
                <Table.Tr>
                  <Table.Td style={{ fontSize: 17 }}>{contact.name}</Table.Td>
                  <Table.Td style={{ fontSize: 17 }}>
                    {contact.role.name}
                  </Table.Td>
                  <Table.Td style={{ fontSize: 17 }}>{contact.phone}</Table.Td>
                  <Table.Td style={{ fontSize: 17 }}>{contact.email}</Table.Td>
                  <Table.Td>
                    <Group gap={0}>
                      <ActionIcon
                        color="yellow"
                        size={30}
                        radius={0}
                        style={{
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                        onClick={() => handleEditClick(contact)}
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        radius={0}
                        size={30}
                        style={{
                          borderTopRightRadius: 6,
                          borderBottomRightRadius: 6,
                        }}
                        onClick={() => deleteContact(contact.id)}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Modal>
        <Flex justify="space-between" align="center" mb={0} px="md" pt={"md"}>
          <Group gap={"xs"}>
            <Text color="greyscale.6" fz="12px">
              Show
            </Text>
            <PageSizeSelect />
            <Text color="greyscale.6" fz="12px">
              entries
            </Text>
          </Group>
          <SearchInput size="sm" />
        </Flex>
        <Box p={"md"}>
          <DataTable
            columns={clientPageColumns}
            data={clientData?.items}
            total={10}
            enableRowOrdering={false}
            isLoading={isLoading}
            enableRowActions
            renderRowActions={({ row }) => {
              return (
                <Group gap={"xs"}>
                  <ActionIcon
                    // color="yellow"
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
                    color="yellow"
                    size={30}
                    radius="lg"
                    variant="outline"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon color="red" radius="lg" variant="outline">
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              );
            }}
          />
        </Box>
      </Paper>

      <Modal
        opened={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit"
      >
        <ContactPersonForm
          initialValues={{
            name: editValues?.name || "",
            role_id: String(editValues?.role.id) || "",
            phone: editValues?.phone || "",
            email: editValues?.email || "",
          }}
          handleSubmit={(values) => {
            console.log("Updating:", values);
            setOpenEditModal(false);
          }}
        />
      </Modal>

      <Modal
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="New Contact"
      >
        <ContactPersonForm
          handleSubmit={(values) => {
            createContact(values);
            setOpenEditModal(false);
          }}
        />
      </Modal>
    </Box>
  );
};
