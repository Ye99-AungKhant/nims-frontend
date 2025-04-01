import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Paper,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
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
import EditableForm from "./components/EditableForm";
import {
  ClientContactPersonPayloadType,
  ClientPayloadType,
} from "../../utils/types";
import { useGetRoles } from "./hooks/useGetRoles";
import { useCreateClientWithContact } from "./hooks/useCreateClient";

const ClientCreatePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("basicInfo");
  const [formData, setFormData] = useState<ClientPayloadType>({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal: "",
  });
  const [contactFormData, setContactFormData] = useState<
    ClientContactPersonPayloadType[]
  >([
    {
      contactName: "",
      role_id: 1,
      phone: "",
      email: "",
    },
  ]);

  const { data: roleData } = useGetRoles();
  const { mutateAsync } = useCreateClientWithContact();
  // console.log(roleData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactChange = (
    index: number,
    field: keyof ClientContactPersonPayloadType,
    value: string | number
  ) => {
    const updatedPersons = [...contactFormData];
    updatedPersons[index] = { ...updatedPersons[index], [field]: value };
    setContactFormData(updatedPersons);
  };

  const handleSubmit = async () => {
    const data = { clientData: formData, contactPerson: contactFormData };
    await mutateAsync(data);

    console.log(formData);
    console.log(contactFormData);
  };

  const handleContinue = (tab: string) => {
    setActiveTab(tab);
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
          <Tabs value={activeTab} onChange={setActiveTab}>
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
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      leftSection={<IconBuilding size={16} />}
                      required
                    />
                    <TextInput
                      value={contactFormData[0].contactName}
                      leftSection={<IconUser size={16} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "contactName", e.target.value)
                      }
                    />
                    {/* <TextInput
                      name="designation"
                      value={contactFormData.role_id}
                      onChange={handleChange}
                      required
                    /> */}
                    <Select
                      searchable
                      comboboxProps={{
                        offset: 0,
                      }}
                      data={
                        roleData?.data?.map((data: any) => ({
                          value: String(data.id),
                          label: data.name,
                        })) || []
                      }
                      name="designation"
                      value={String(contactFormData[0].role_id)}
                      leftSection={<IconUser size={16} />}
                      onChange={(value) =>
                        handleContactChange(0, "role_id", Number(value))
                      }
                    />
                    <TextInput
                      type="email"
                      value={contactFormData[0].email}
                      leftSection={<IconMail size={16} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "email", e.target.value)
                      }
                    />

                    <TextInput
                      value={contactFormData[0].phone}
                      leftSection={<IconPhone size={16} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "phone", e.target.value)
                      }
                    />
                  </Flex>
                </Grid.Col>
              </Grid>
              <Group mt="md" justify="center">
                <Button
                  onClick={() => handleContinue("address")}
                  radius={"lg"}
                  size="sm"
                >
                  Continue
                </Button>
              </Group>
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
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                      leftSection={<IconBuilding size={16} />}
                      required
                    />
                    <TextInput
                      name="city"
                      value={formData?.city}
                      onChange={handleChange}
                      leftSection={<IconUser size={16} />}
                      required
                    />
                    <TextInput
                      name="state"
                      value={formData?.state}
                      onChange={handleChange}
                      leftSection={<IconUser size={16} />}
                      required
                    />
                    <TextInput
                      name="country"
                      value={formData?.country}
                      onChange={handleChange}
                      leftSection={<IconMail size={16} />}
                      required
                    />
                    <TextInput
                      name="postal"
                      value={formData?.postal}
                      onChange={handleChange}
                      leftSection={<IconPhone size={16} />}
                      required
                    />
                  </Flex>
                </Grid.Col>
              </Grid>
              <Group mt="md" justify="center">
                <Button
                  onClick={() => handleContinue("contactPersons")}
                  radius={"lg"}
                  size="sm"
                >
                  Continue
                </Button>
              </Group>
            </Tabs.Panel>
            <Tabs.Panel value="contactPersons">
              <EditableForm
                handleSubmit={handleSubmit}
                contactFormData={contactFormData}
                setContactFormData={setContactFormData}
                handleContactChange={handleContactChange}
                role={roleData?.data}
              />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Paper>
    </Box>
  );
};

export default ClientCreatePage;
