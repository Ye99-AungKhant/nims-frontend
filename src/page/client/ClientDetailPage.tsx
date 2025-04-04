import {
  Card,
  Text,
  Group,
  Stack,
  Divider,
  Box,
  Paper,
  Table,
  ActionIcon,
  Modal,
  Center,
  Button,
} from "@mantine/core";
import { IconUser, IconUsers, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetClientDetailWithContact } from "./hooks/useGetClientWithContact";
import "../../assets/styles/ultis.css";
import { useDeleteContact } from "./hooks/useDeleteContact";
import { useDisclosure } from "@mantine/hooks";

export function ViewClient({ data }: any) {
  console.log("data", data);

  return (
    <Paper shadow="sm" style={{ flex: 1 }}>
      <Box style={{ borderBottom: "1px solid #dddddd" }} p="sm">
        <Text size="lg" fw={700}>
          View Client
        </Text>
      </Box>

      <Table variant="vertical" layout="fixed" withTableBorder highlightOnHover>
        <Table.Tbody>
          <Table.Tr h={50}>
            <Table.Th w={160} style={{ color: "purple" }}>
              Company
            </Table.Th>
            <Table.Td style={{ fontSize: 17 }}>{data.name}</Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Primary Contact</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0]?.name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Designation</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0]?.role.name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Email</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0]?.email}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Phone</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0]?.phone}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Address</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>{data.address}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

export function ContactPerson({ data }: any) {
  console.log("con", data);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteClient, setDeleteClient] = useState<number>();
  const { mutate: deleteMutate } = useDeleteContact();
  const [contacts, setContacts] = useState<any[]>(data);

  const deleteClientSelect = (id: any) => {
    setDeleteClient(id);
    open();
  };

  const deleteContact = () => {
    close();
    deleteMutate(deleteClient, {
      onSuccess: () => {
        setContacts((prev) => prev?.filter((data) => data.id != deleteClient));
      },
    });
  };

  return (
    <Paper shadow="sm" style={{ flex: 1 }}>
      <Box style={{ borderBottom: "1px solid #dddddd" }} p="sm">
        <Text size="lg" fw={700}>
          Contact Person
        </Text>
      </Box>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Designation</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {contacts ? (
            contacts.map((person: any) => (
              <Table.Tr>
                <Table.Td style={{ fontSize: 17 }}>{person.name}</Table.Td>
                <Table.Td style={{ fontSize: 17 }}>{person.phone}</Table.Td>
                <Table.Td style={{ fontSize: 17 }}>{person.email}</Table.Td>
                <Table.Td style={{ fontSize: 17 }}>{person.role.name}</Table.Td>
                <Table.Td>
                  <ActionIcon
                    color="red"
                    radius="lg"
                    variant="outline"
                    onClick={() => deleteClientSelect(person.id)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td>No Data Found!</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text size="xl" fw={700} c={"dark"}>
            Confirm Delete Contact Person
          </Text>
        }
        centered={false}
      >
        <Center>Are you sure you want to delete?</Center>
        <Group mt="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" onClick={deleteContact}>
            Delete
          </Button>
          <Button radius={"lg"} size="sm" onClick={close} color="gray">
            Cancel
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
}

export default function ClientDetailPage() {
  const [menuBtn, setMenuBtn] = useState<string>("client");
  const param = useLocation();
  const { data: clientData, isLoading } = useGetClientDetailWithContact(
    param.state.data.id
  );
  const navigate = useNavigate();
  console.log(clientData?.items);

  const handleMenuBtn = (name: string) => {
    setMenuBtn(name);
  };

  return (
    <Box style={{ display: "flex", gap: "20px" }} px="md">
      {/* Left Card */}
      <Paper shadow="sm" radius="md" style={{ width: 300 }}>
        <Box style={{ borderBottom: "1px solid #dddddd" }} p="sm">
          <Text size="lg" fw={500} color="purple">
            {clientData?.items.name}
          </Text>
        </Box>
        <Stack p="md">
          <Group
            onClick={() => handleMenuBtn("client")}
            p={"xs"}
            className={`menu-item ${menuBtn === "client" ? "active" : ""}`}
          >
            <IconUser size={16} />
            <Text className="text">Client</Text>
          </Group>
          <Group
            onClick={() => handleMenuBtn("contactPaerson")}
            p={"xs"}
            className={`menu-item ${
              menuBtn === "contactPaerson" ? "active" : ""
            }`}
          >
            <IconUsers size={16} />
            <Text className="text">Contact Persons</Text>
          </Group>
          <Group
            onClick={() =>
              navigate("/client/create", { state: { id: param.state.data.id } })
            }
            p={"xs"}
            className={`menu-item ${menuBtn === "edit" ? "active" : ""}`}
          >
            <IconEdit size={16} />
            <Text className="text">Edit</Text>
          </Group>
        </Stack>
      </Paper>

      {/* Right Card */}
      {!isLoading && menuBtn == "client" ? (
        <ViewClient data={clientData?.items} />
      ) : menuBtn == "contactPaerson" ? (
        <ContactPerson data={clientData?.items.contact_person} />
      ) : (
        <></>
      )}
    </Box>
  );
}
