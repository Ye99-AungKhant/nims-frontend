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
  IconChevronDown,
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
import { z } from "zod";

interface ClientCreatePageProps {
  id?: string; // Optional ID for edit mode
}

const addressFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postal: z.string().min(4, "Postal code must be at least 4 characters"),
});

const baseInfoFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  role_id: z.number(),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Phone number is invalid"),
  email: z.string().email("Invalid email"),
});

// Contact person schema
const contactPersonSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  role_id: z.number({ message: "Designation is required" }),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Phone number is invalid"),
  email: z.string().email("Invalid email"),
});

// If you want to allow multiple contacts
const contactFormSchema = z.array(contactPersonSchema);

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
  const [formErrors, setFormErrors] = useState<any>({});

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
      try {
        contactFormSchema.parse(contactFormData);
        setFormErrors({});

        // Create new client
        await createClient(data, {
          onSuccess: () => navigate("/client"),
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(error.flatten().fieldErrors);

          setFormErrors(error.flatten().fieldErrors);
        }
      }
    }

    // console.log(formData);
    // console.log(contactFormData);
  };

  const handleContinue = (tab: string) => {
    try {
      const data = {
        name: formData.name,
        contactName: contactFormData[0].contactName,
        role_id: contactFormData[0].role_id,
        phone: contactFormData[0].phone,
        email: contactFormData[0].email,
      };
      if (activeTab == "basicInfo") {
        baseInfoFormSchema.parse(data);
      } else {
        addressFormSchema.parse(formData);
      }

      setFormErrors({});
      // ✅ Data is valid
      console.log("All good! Submitting...");
      setActiveTab(tab);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.flatten().fieldErrors);

        setFormErrors(error.flatten().fieldErrors);
      }
    }
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
          <Tabs value={activeTab} onChange={() => {}}>
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
                      leftSection={<IconBuilding size={18} />}
                      error={formErrors?.name?.[0]}
                    />
                    <TextInput
                      value={contactFormData[0]?.contactName}
                      leftSection={<IconUser size={18} />}
                      onChange={(e) =>
                        handleContactChange(0, "contactName", e.target.value)
                      }
                      error={formErrors?.contactName?.[0]}
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
                      leftSection={<IconUser size={18} />}
                      onChange={(value) =>
                        handleContactChange(0, "role_id", Number(value))
                      }
                      error={formErrors?.role_id?.[0]}
                      rightSectionPointerEvents="all"
                      rightSection={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconChevronDown size={16} style={{ margin: 0 }} />
                          <ActionIcon
                            color={theme.colors.purple[1]}
                            style={{
                              height: 42,
                              width: 35,
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              fontSize: 12,
                            }}
                            onClick={open}
                          >
                            Add
                          </ActionIcon>
                        </div>
                      }
                    />
                    <TextInput
                      type="email"
                      value={contactFormData[0]?.email}
                      leftSection={<IconMail size={18} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "email", e.target.value)
                      }
                      error={formErrors?.email?.[0]}
                    />

                    <TextInput
                      type="number"
                      value={contactFormData[0]?.phone}
                      leftSection={<IconPhone size={18} />}
                      required
                      onChange={(e) =>
                        handleContactChange(0, "phone", e.target.value)
                      }
                      error={formErrors?.phone?.[0]}
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
                      leftSection={<IconMapPin size={18} />}
                      error={formErrors?.address?.[0]}
                    />
                    <TextInput
                      name="city"
                      value={formData?.city}
                      onChange={handleChange}
                      leftSection={<IconBuilding size={18} />}
                      error={formErrors?.city?.[0]}
                    />
                    <TextInput
                      name="state"
                      value={formData?.state}
                      onChange={handleChange}
                      leftSection={<IconMapPin size={18} />}
                      error={formErrors?.state?.[0]}
                    />
                    <TextInput
                      name="country"
                      value={formData?.country}
                      onChange={handleChange}
                      leftSection={<IconMap size={18} />}
                      error={formErrors?.country?.[0]}
                    />
                    <TextInput
                      name="postal"
                      value={formData?.postal}
                      onChange={handleChange}
                      leftSection={<IconZip size={18} />}
                      error={formErrors?.postal?.[0]}
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
                  error={formErrors}
                />
              )}
            </TabsPanel>
          </Tabs>
        </Box>
      </Paper>
      <AddItemModal
        title="Designation"
        opened={opened}
        close={close}
        mutationFn={createRole}
      />
    </Box>
  );
};

export default ClientCreatePage;
