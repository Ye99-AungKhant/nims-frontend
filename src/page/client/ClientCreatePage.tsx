import React, { useState, useEffect } from "react";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Paper,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Button } from "@mantine/core";
import { Group } from "@mantine/core";
import { Text } from "@mantine/core";
import {
  IconUser,
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconZip,
  IconMap,
  IconRoadSign,
  IconAddressBook,
  IconUserPlus,
} from "@tabler/icons-react";
import { Tabs, TabsList, TabsPanel } from "@mantine/core";
import EditableForm from "./components/EditableForm"; // Assuming this is in the same directory
import {
  ClientContactPersonPayloadType,
  ClientPayloadType,
} from "../../utils/types"; // Adjust the path if necessary
import { useGetRoles } from "./hooks/useGetRoles"; // Adjust the path if necessary
import { useCreateClientWithContact } from "./hooks/useCreateClient"; // Adjust the path if necessary

// import { useUpdateClientWithContact } from "./hooks/useUpdateClient"; // Import hook for updating
import { useGetClientDetailWithContact } from "./hooks/useGetClientWithContact";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateClientWithContact } from "./hooks/useUpdateClientWithContact";
import { AddItemModal } from "../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useCreateRole } from "./hooks/useCreateRole";

interface ClientCreatePageProps {
  id?: string; // Optional ID for edit mode
}

const ClientCreatePage = () => {
  const theme = useMantineTheme();
  const param = useLocation();
  const id = param?.state?.id as ClientCreatePageProps;
  const [opened, { open, close }] = useDisclosure(false);
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
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const { data: roleData, isLoading: isRoleLoading } = useGetRoles();
  const {
    data: clientData,
    isLoading: isClientLoading,
    isSuccess: isClientSuccess,
  } = useGetClientDetailWithContact(id); // Use the new hook
  const { mutateAsync: createClient } = useCreateClientWithContact();
  const { mutateAsync: updateClient } = useUpdateClientWithContact(); // Use update mutation
  const { mutate: createRole } = useCreateRole();

  // Set edit mode if ID is provided
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [id]);

  // Populate form data when in edit mode and client data is available
  useEffect(() => {
    if (isEditMode && isClientSuccess && clientData?.items) {
      const client = clientData.items;
      const contacts = clientData.items.contact_person;
      setFormData({
        name: client.name,
        address: client.address,
        city: client.city,
        state: client.state,
        country: client.country,
        postal: client.postal,
      });
      setContactFormData(
        contacts.map((contact: any) => ({
          id: contact.id,
          contactName: contact.name,
          role_id: contact.role_id,
          phone: contact.phone,
          email: contact.email,
        }))
      );
    }
  }, [isEditMode, clientData, isClientSuccess]);

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
    if (isEditMode && id) {
      // Update existing client
      await updateClient(
        { id, data },
        {
          onSuccess: () => navigate("/client"),
        }
      );
    } else {
      // Create new client
      await createClient(data, {
        onSuccess: () => navigate("/client"),
      });
    }

    console.log(formData);
    console.log(contactFormData);
  };

  const handleContinue = (tab: string) => {
    setActiveTab(tab);
  };

  const title = isEditMode ? "Edit Client" : "New Client";

  // Show loading state
  if (isClientLoading || isRoleLoading) {
    return <Box p="md">Loading...</Box>; // Replace with a proper loading indicator
  }

  return (
    <Box px="md">
      <Paper shadow="sm" radius="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }} p="sm">
          <Text size="lg" fw={500}>
            {title}
          </Text>
        </Box>

        <Box p={"md"}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabsList>
              <Tabs.Tab
                value="basicInfo"
                leftSection={<IconAddressBook size={20} />}
                style={
                  activeTab === "basicInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Basic Info
              </Tabs.Tab>
              <Tabs.Tab
                value="address"
                leftSection={<IconMap size={20} />}
                style={
                  activeTab === "address"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Address
              </Tabs.Tab>
              <Tabs.Tab
                value="contactPersons"
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "contactPersons"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Contact Persons
              </Tabs.Tab>
            </TabsList>
            <TabsPanel value="basicInfo">
              <Grid>
                <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
                  <Flex gap={"xl"} direction={"column"} mt={30}>
                    <Text>Company Name *</Text>
                    <Text>Primary Contact *</Text>
                    <Text>Designation *</Text>
                    <Text>Email *</Text>
                    <Text>Phone *</Text>
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
                      value={contactFormData[0]?.contactName}
                      leftSection={<IconUser size={16} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "contactName", e.target.value)
                      }
                    />
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
                      value={String(contactFormData[0]?.role_id)}
                      leftSection={<IconUser size={16} />}
                      onChange={(value) =>
                        handleContactChange(0, "role_id", Number(value))
                      }
                      rightSectionPointerEvents="all"
                      rightSection={
                        <ActionIcon
                          size={42}
                          color={theme.colors.purple[1]}
                          style={{
                            margin: 0,
                            width: 70,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            fontSize: 12,
                          }}
                          onClick={open}
                        >
                          Add
                        </ActionIcon>
                      }
                    />
                    <TextInput
                      type="email"
                      value={contactFormData[0]?.email}
                      leftSection={<IconMail size={16} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "email", e.target.value)
                      }
                    />

                    <TextInput
                      type="number"
                      value={contactFormData[0]?.phone}
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
                  bg={theme.colors.purple[1]}
                >
                  Continue
                </Button>
              </Group>
            </TabsPanel>

            <TabsPanel value="address">
              <Grid>
                <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
                  <Flex gap={"xl"} direction={"column"} mt={30}>
                    <Text>Address *</Text>
                    <Text>City *</Text>
                    <Text>State *</Text>
                    <Text>Country *</Text>
                    <Text>Postal/ZIP Code *</Text>
                  </Flex>
                </Grid.Col>

                <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
                  <Flex gap={"md"} direction={"column"} mt={10}>
                    <TextInput
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                      leftSection={<IconMapPin size={16} />}
                      required
                    />
                    <TextInput
                      name="city"
                      value={formData?.city}
                      onChange={handleChange}
                      leftSection={<IconBuilding size={16} />}
                      required
                    />
                    <TextInput
                      name="state"
                      value={formData?.state}
                      onChange={handleChange}
                      leftSection={<IconMapPin size={16} />}
                      required
                    />
                    <TextInput
                      name="country"
                      value={formData?.country}
                      onChange={handleChange}
                      leftSection={<IconMap size={16} />}
                      required
                    />
                    <TextInput
                      name="postal"
                      value={formData?.postal}
                      onChange={handleChange}
                      leftSection={<IconZip size={16} />}
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
                  bg={theme.colors.purple[1]}
                >
                  Continue
                </Button>
              </Group>
            </TabsPanel>
            <TabsPanel value="contactPersons">
              {!isRoleLoading && (
                <EditableForm
                  handleSubmit={handleSubmit}
                  contactFormData={contactFormData}
                  setContactFormData={setContactFormData}
                  handleContactChange={handleContactChange}
                  role={roleData?.data}
                />
              )}
            </TabsPanel>
          </Tabs>
        </Box>
      </Paper>
      <AddItemModal opened={opened} close={close} mutationFn={createRole} />
    </Box>
  );
};

export default ClientCreatePage;
