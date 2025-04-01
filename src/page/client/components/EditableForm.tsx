import React from "react";
import { ActionIcon, Button, Input, Select, Table } from "@mantine/core";
import { Box, Stack, Group } from "@mantine/core";
import { IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { ClientContactPersonPayloadType } from "../../../utils/types";

interface Person {
  name: string;
  mobileNumber: string;
  emailAddress: string;
  designation: string;
}

interface Props {
  handleSubmit: () => void;
  contactFormData: ClientContactPersonPayloadType[];
  setContactFormData: React.Dispatch<
    React.SetStateAction<ClientContactPersonPayloadType[]>
  >;
  handleContactChange: (
    index: number,
    field: keyof ClientContactPersonPayloadType,
    value: string | number
  ) => void;
  role: [];
}

const EditableForm = ({
  handleSubmit,
  contactFormData,
  setContactFormData,
  handleContactChange,
  role,
}: Props) => {
  const handleAddPerson = () => {
    setContactFormData([
      ...contactFormData,
      { contactName: "", phone: "", email: "", role_id: 0 },
    ]);
  };

  const handleDeletePerson = (index: number) => {
    const updatedPersons = contactFormData.filter((_, i) => i !== index);
    setContactFormData(updatedPersons);
  };

  return (
    <Box p={"md"}>
      <Stack gap="md">
        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Mobile Number</Table.Th>
              <Table.Th>Email Address</Table.Th>
              <Table.Th>Designation</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {contactFormData.map((person, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.contactName}
                    onChange={(e) =>
                      handleContactChange(index, "contactName", e.target.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.phone}
                    onChange={(e) =>
                      handleContactChange(index, "phone", e.target.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.email}
                    onChange={(e) =>
                      handleContactChange(index, "email", e.target.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Select
                    searchable
                    comboboxProps={{
                      offset: 0,
                    }}
                    data={
                      role.map((data: any) => ({
                        value: String(data.id),
                        label: data.name,
                      })) || []
                    }
                    value={String(person.role_id)}
                    leftSection={<IconUser size={16} />}
                    onChange={(value) =>
                      handleContactChange(index, "role_id", Number(value))
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    size={30}
                    variant="subtle"
                    onClick={() => handleDeletePerson(index)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>

      <Group mt="md" gap="md">
        <Button size="xs" onClick={handleAddPerson}>
          <IconPlus size={18} />
          Add Person
        </Button>
        <Button onClick={handleSubmit} radius={"lg"} size="sm">
          Save
        </Button>
      </Group>
    </Box>
  );
};

export default EditableForm;
