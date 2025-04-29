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
  LoadingOverlay,
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
import { PageLoading } from "../../components/common/PageLoading";

export function ViewClient({ data }: any) {
  console.log("data", data);

  return (
    <Paper shadow="sm" style={{ flex: 1 }}>
      <Group
        style={{ borderBottom: "1px solid #dddddd", paddingLeft: "25px" }}
        py="md"
        gap={0}
      >
        <IconAddressBook size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          View Client
        </Text>
      </Group>

      <Box px={30} mt={30} pb={10}>
        <Divider />
        {data && (
          <Table variant="vertical">
            <Table.Tbody>
              <Table.Tr h={50}>
                <Table.Th
                  w={300}
                  style={{
                    color: "#684498",
                    backgroundColor: "#fff",
                  }}
                >
                  Company
                </Table.Th>
                <Table.Td
                  style={{
                    color: "#707070",
                  }}
                >
                  {data.name}
                </Table.Td>
              </Table.Tr>

              <Table.Tr h={50}>
                <Table.Th
                  style={{
                    color: "#684498",
                    backgroundColor: "#fff",
                  }}
                >
                  Primary Contact
                </Table.Th>
                <Table.Td style={{ color: "#707070" }}>
                  {data.contact_person[0]?.name}
                </Table.Td>
              </Table.Tr>

              <Table.Tr h={50}>
                <Table.Th
                  style={{
                    color: "#684498",
                    backgroundColor: "#fff",
                  }}
                >
                  Designation
                </Table.Th>
                <Table.Td
                  style={{
                    color: "#707070",
                  }}
                >
                  {data.contact_person[0]?.role.name}
                </Table.Td>
              </Table.Tr>

              <Table.Tr h={50}>
                <Table.Th
                  style={{
                    color: "#684498",
                    backgroundColor: "#fff",
                  }}
                >
                  Email
                </Table.Th>
                <Table.Td style={{ color: "#707070" }}>
                  {data.contact_person[0]?.email}
                </Table.Td>
              </Table.Tr>

              <Table.Tr h={50}>
                <Table.Th
                  style={{
                    color: "#684498",
                    backgroundColor: "#fff",
                  }}
                >
                  Phone
                </Table.Th>
                <Table.Td
                  style={{
                    color: "#707070",
                  }}
                >
                  {data.contact_person[0]?.phone}
                </Table.Td>
              </Table.Tr>

              <Table.Tr h={50}>
                <Table.Th
                  style={{
                    color: "#684498",
                    backgroundColor: "#fff",
                  }}
                >
                  Address
                </Table.Th>
                <Table.Td
                  style={{
                    color: "#707070",
                  }}
                >
                  {data.address}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        )}
      </Box>
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
      <Group
        style={{ borderBottom: "1px solid #dddddd", paddingLeft: "25px" }}
        py="md"
        gap={0}
      >
        <IconUsersGroup size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          Contact Persons
        </Text>
      </Group>
      <Box px={30} pt={30}>
        <Divider />
        <Table striped highlightOnHover withRowBorders>
          <Table.Thead h={50}>
            <Table.Tr>
              <Table.Th style={{ color: "#474747" }}>Name</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Phone</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Email</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Designation</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {contacts.length ? (
              contacts.map((person: any) => (
                <Table.Tr key={person.id}>
                  <Table.Td style={{ color: "#474747" }}>
                    {person.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {person.phone}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {person.email}
                  </Table.Td>
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
                <Table.Td colSpan={5}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
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
        <Center>Are you sure you want to delete this record?</Center>
        <Group m="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" onClick={deleteContact}>
            Yes, Delete it!
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

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Box style={{ display: "flex", gap: "30px" }} p="30px">
      {/* Left Card */}

      {!isLoading && (
        <Paper shadow="sm" style={{ width: "31%" }}>
          <Flex
            p="lg"
            pb={0}
            justify={"center"}
            align="center"
            direction={"column"}
          >
            <Box
              className="cursor-pointer"
              w="64px"
              h="64px"
              bg="indigo"
              style={{
                borderRadius: "100%",
              }}
            >
              <Flex w="100%" h="100%" align="center" justify="center">
                <Text p="0" c="white" fw={500} size="30">
                  {clientData?.items?.name
                    ?.split(" ")
                    ?.map((part: any) => part[0])
                    ?.join("")
                    .toUpperCase()}
                </Text>
              </Flex>
            </Box>
            <Text size="lg" fw={500} color={theme.colors.purple[0]} mt={5}>
              {clientData?.items?.name}
            </Text>
          </Flex>
          <Box p="30px">
            <Group
              onClick={() => handleMenuBtn("client")}
              p={"xs"}
              gap={0}
              className={`menu-item ${menuBtn === "client" ? "active" : ""}`}
              style={{
                borderTop: "1px solid #dddddd",
                borderBottom: "1px solid #dddddd",
              }}
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
              style={{
                borderBottom: "1px solid #dddddd",
              }}
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
              style={{
                borderBottom: "1px solid #dddddd",
              }}
            >
              <IconEdit size={20} className="textIcon" />
              <Text className="text">Edit</Text>
            </Group>
          </Box>
        </Paper>
      )}

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
