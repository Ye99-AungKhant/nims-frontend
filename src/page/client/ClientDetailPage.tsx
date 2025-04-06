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
  useMantineTheme,
  Flex,
} from "@mantine/core";
import {
  IconUser,
  IconUsers,
  IconEdit,
  IconTrash,
  IconAddressBook,
  IconUsersGroup,
} from "@tabler/icons-react";
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
      <Group style={{ borderBottom: "1px solid #dddddd" }} p="sm" gap={0}>
        <IconAddressBook size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          View Client
        </Text>
      </Group>

      <Table variant="vertical" withTableBorder highlightOnHover>
        <Table.Tbody>
          <Table.Tr h={50}>
            <Table.Th
              w={300}
              style={{ color: "#684498", backgroundColor: "#f0f0f0" }}
            >
              Company
            </Table.Th>
            <Table.Td
              style={{
                fontSize: 17,
                color: "#707070",
                backgroundColor: "#f0f0f0",
              }}
            >
              {data.name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "#684498", backgroundColor: "#fff" }}>
              Primary Contact
            </Table.Th>
            <Table.Td style={{ fontSize: 17, color: "#707070" }}>
              {data.contact_person[0]?.name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "#684498", backgroundColor: "#f0f0f0" }}>
              Designation
            </Table.Th>
            <Table.Td
              style={{
                fontSize: 17,
                color: "#707070",
                backgroundColor: "#f0f0f0",
              }}
            >
              {data.contact_person[0]?.role.name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple", backgroundColor: "#fff" }}>
              Email
            </Table.Th>
            <Table.Td style={{ fontSize: 17, color: "#707070" }}>
              {data.contact_person[0]?.email}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple", backgroundColor: "#f0f0f0" }}>
              Phone
            </Table.Th>
            <Table.Td
              style={{
                fontSize: 17,
                color: "#707070",
                backgroundColor: "#f0f0f0",
              }}
            >
              {data.contact_person[0]?.phone}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Address</Table.Th>
            <Table.Td style={{ fontSize: 17, color: "#707070" }}>
              {data.address}
            </Table.Td>
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
      <Group style={{ borderBottom: "1px solid #dddddd" }} p="sm" gap={0}>
        <IconUsersGroup size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          Contact Persons
        </Text>
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ color: "#474747" }}>Name</Table.Th>
            <Table.Th style={{ color: "#474747" }}>Phone</Table.Th>
            <Table.Th style={{ color: "#474747" }}>Email</Table.Th>
            <Table.Th style={{ color: "#474747" }}>Designation</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {contacts ? (
            contacts.map((person: any) => (
              <Table.Tr>
                <Table.Td style={{ color: "#474747" }}>{person.name}</Table.Td>
                <Table.Td style={{ color: "#474747" }}>{person.phone}</Table.Td>
                <Table.Td style={{ color: "#474747" }}>{person.email}</Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  {person.role.name}
                </Table.Td>
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
  const theme = useMantineTheme();
  const [menuBtn, setMenuBtn] = useState<string>("client");
  const param = useLocation();
  const { data: clientData, isLoading } = useGetClientDetailWithContact(
    param.state.id
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
        <Flex
          style={{ borderBottom: "1px solid #dddddd" }}
          p="sm"
          justify={"center"}
        >
          <Text size="lg" fw={500} color={theme.colors.purple[0]}>
            {clientData?.items.name}
          </Text>
        </Flex>
        <Stack p="md">
          <Group
            onClick={() => handleMenuBtn("client")}
            p={"xs"}
            gap={0}
            className={`menu-item ${menuBtn === "client" ? "active" : ""}`}
          >
            <IconAddressBook size={20} className="textIcon" />
            <Text className="text">Client</Text>
          </Group>
          <Group
            onClick={() => handleMenuBtn("contactPaerson")}
            p={"xs"}
            gap={0}
            className={`menu-item ${
              menuBtn === "contactPaerson" ? "active" : ""
            }`}
          >
            <IconUsersGroup size={20} className="textIcon" />
            <Text className="text">Contact Persons</Text>
          </Group>
          <Group
            onClick={() =>
              navigate("/client/create", { state: { id: param.state.id } })
            }
            p={"xs"}
            gap={0}
            className={`menu-item ${menuBtn === "edit" ? "active" : ""}`}
          >
            <IconEdit size={20} className="textIcon" />
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
