import React from "react";
import {
  ActionIcon,
  Button,
  Input,
  Select,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Box, Stack, Group } from "@mantine/core";
import { IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { ClientContactPersonPayloadType } from "../../../utils/types";

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
  error: any;
}

const EditableForm = ({
  handleSubmit,
  contactFormData,
  setContactFormData,
  handleContactChange,
  role,
  error,
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
  const theme = useMantineTheme();

  return (
    <Box p={"md"}>
      <Stack gap="md">
        {contactFormData.length == 0 && (
          <Text c={"red"}>
            Contact person have at least one. Please add a contact person!
          </Text>
        )}
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
            {contactFormData &&
              contactFormData.map((person, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Input
                      variant="filled"
                      value={person.contactName}
                      onChange={(e) =>
                        handleContactChange(
                          index,
                          "contactName",
                          e.target.value
                        )
                      }
                      error={error?.[index]?.[0]}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Input
                      type="number"
                      variant="filled"
                      value={person.phone}
                      onChange={(e) =>
                        handleContactChange(index, "phone", e.target.value)
                      }
                      error={error?.[index]?.[1]}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Input
                      variant="filled"
                      value={person.email}
                      onChange={(e) =>
                        handleContactChange(index, "email", e.target.value)
                      }
                      error={error?.[index]?.[2]}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Select
                      searchable
                      comboboxProps={{
                        offset: 0,
                      }}
                      data={
                        role
                          .map((data: any) => ({
                            value: String(data.id),
                            label: data.name,
                          }))
                          .filter((role: any) => role.label !== "Admin") || []
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

      <Button
        size="xs"
        onClick={handleAddPerson}
        mt="xs"
        bg={theme.colors.success[5]}
        radius={"lg"}
      >
        <IconPlus size={18} />
        Add Person
      </Button>
      <Group mt="md" justify="center">
        <Button
          onClick={handleSubmit}
          radius={"lg"}
          size="sm"
          bg={theme.colors.purple[1]}
          disabled={contactFormData.length == 0}
        >
          Save
        </Button>
      </Group>
    </Box>
  );
};

export default EditableForm;
