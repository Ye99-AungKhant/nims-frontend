import React, { useState } from "react";
import { Box, Flex, Grid, Paper, SimpleGrid, TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { Group } from "@mantine/core";
import { Card } from "@mantine/core";
import { Text } from "@mantine/core";
import {
  IconUser,
  IconBuilding,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
Card;
import { Tabs, TabsList } from "@mantine/core";

const ClientCreatePage = () => {
  const [formData, setFormData] = useState({
    companyName: "Super Light Logistics & Distribution", // Default Value
    primaryContact: "Ko Aung Nyein Chan", // Default Value
    designation: "Fleet Manager", // Default Value
    email: "aungnyeinchan@superlightsc.com", // Default Value
    phone: "09443006446", // Default Value
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // In a real application, you would send this data to a server
    console.log(formData);
    alert(JSON.stringify(formData, null, 2)); // simple feedback
  };

  return (
    <Box px="md">
      <Paper shadow="sm" radius="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }} p="sm">
          <Text size="lg" fw={500}>
            New Client
          </Text>
        </Box>

        <Box p={"md"}>
          <Tabs defaultValue="basicInfo">
            <TabsList>
              <Tabs.Tab value="basicInfo">Basic Info</Tabs.Tab>
              <Tabs.Tab value="address">Address</Tabs.Tab>
              <Tabs.Tab value="contactPersons">Contact Persons</Tabs.Tab>
            </TabsList>
            <Tabs.Panel value="basicInfo">
              <Grid>
                <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
                  <Flex gap={"xl"} direction={"column"} mt={30}>
                    <Text>Company Name</Text>
                    <Text>Primary Contact</Text>
                    <Text>Designation</Text>
                    <Text>Email</Text>
                    <Text>Phone</Text>
                  </Flex>
                </Grid.Col>

                <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
                  <Flex gap={"md"} direction={"column"} mt={10}>
                    <TextInput
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      leftSection={<IconBuilding size={16} />}
                      required
                    />
                    <TextInput
                      name="primaryContact"
                      value={formData.primaryContact}
                      onChange={handleChange}
                      leftSection={<IconUser size={16} />}
                      required
                    />
                    <TextInput
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      leftSection={<IconUser size={16} />}
                      required
                    />
                    <TextInput
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      leftSection={<IconMail size={16} />}
                      required
                    />
                    <TextInput
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      leftSection={<IconPhone size={16} />}
                      required
                    />
                  </Flex>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="address">
              <Grid>
                <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
                  <Flex gap={"xl"} direction={"column"} mt={30}>
                    <Text>Address</Text>
                    <Text>City</Text>
                    <Text>State</Text>
                    <Text>Country</Text>
                    <Text>Postal/ZIP Code</Text>
                  </Flex>
                </Grid.Col>

                <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
                  <Flex gap={"md"} direction={"column"} mt={10}>
                    <TextInput
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      leftSection={<IconBuilding size={16} />}
                      required
                    />
                    <TextInput
                      name="primaryContact"
                      value={formData.primaryContact}
                      onChange={handleChange}
                      leftSection={<IconUser size={16} />}
                      required
                    />
                    <TextInput
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      leftSection={<IconUser size={16} />}
                      required
                    />
                    <TextInput
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      leftSection={<IconMail size={16} />}
                      required
                    />
                    <TextInput
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      leftSection={<IconPhone size={16} />}
                      required
                    />
                  </Flex>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
            <Tabs.Panel value="contactPersons">
              <Text>Contact Persons information will go here.</Text>
            </Tabs.Panel>
          </Tabs>

          <Group mt="md">
            <Button onClick={handleSubmit}>Save</Button>
          </Group>
        </Box>
      </Paper>
    </Box>
  );
};

export default ClientCreatePage;
