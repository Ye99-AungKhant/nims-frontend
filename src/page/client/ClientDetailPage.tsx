import {
  Card,
  Text,
  Group,
  Stack,
  Divider,
  Box,
  Paper,
  Table,
} from "@mantine/core";
import { IconUser, IconUsers, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetClientWithContact } from "./hooks/useGetClientWithContact";
import "../../assets/styles/ultis.css";

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
              {data.contact_person[0].name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Designation</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0].role.name}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Email</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0].email}
            </Table.Td>
          </Table.Tr>

          <Table.Tr h={50}>
            <Table.Th style={{ color: "purple" }}>Phone</Table.Th>
            <Table.Td style={{ fontSize: 17 }}>
              {data.contact_person[0].phone}
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
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data ? (
            data.map((person: any) => (
              <Table.Tr>
                <Table.Td style={{ fontSize: 17 }}>{person.name}</Table.Td>
                <Table.Td style={{ fontSize: 17 }}>{person.phone}</Table.Td>
                <Table.Td style={{ fontSize: 17 }}>{person.email}</Table.Td>
                <Table.Td style={{ fontSize: 17 }}>{person.role.name}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td>No Data Found!</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

export default function ClientDetailPage() {
  const [menuBtn, setMenuBtn] = useState<string>("client");
  const param = useLocation();
  const { data: clientData, isLoading } = useGetClientWithContact(
    param.state.data.id
  );
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
            onClick={() => handleMenuBtn("edit")}
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
