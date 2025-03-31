import React, { useState } from "react";
import { ActionIcon, Button, Input, Table, Text } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Paper } from "@mantine/core";
import { Box, Stack, Group } from "@mantine/core";
import { IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";

interface Person {
  name: string;
  mobileNumber: string;
  emailAddress: string;
  designation: string;
}

const EditableForm = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: "", mobileNumber: "", emailAddress: "", designation: "" },
  ]);

  const handleAddPerson = () => {
    setPersons([
      ...persons,
      { name: "", mobileNumber: "", emailAddress: "", designation: "" },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: keyof Person,
    value: string
  ) => {
    const updatedPersons = [...persons];
    updatedPersons[index] = { ...updatedPersons[index], [field]: value };
    setPersons(updatedPersons);
  };

  const handleDeletePerson = (index: number) => {
    const updatedPersons = persons.filter((_, i) => i !== index);
    setPersons(updatedPersons);
  };

  const handleSave = () => {
    // In a real application, you would send this data to a server.
    console.log("Saving data:", persons);
    alert("Data Saved! (Check console for output)");
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
            {persons.map((person, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.mobileNumber}
                    onChange={(e) =>
                      handleInputChange(index, "mobileNumber", e.target.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.emailAddress}
                    onChange={(e) =>
                      handleInputChange(index, "emailAddress", e.target.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Input
                    variant="filled"
                    value={person.designation}
                    onChange={(e) =>
                      handleInputChange(index, "designation", e.target.value)
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
        {/* <Button onClick={handleSave}>
          <IconCheck />
          Save
        </Button> */}
      </Group>
    </Box>
  );
};

export default EditableForm;
