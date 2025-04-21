import React, { useState, useEffect } from "react";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Paper,
  Select,
  Table,
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
import FormTable from "../../components/common/FormTable";
import { useUpdateRole } from "./hooks/useUpdateRole";

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
  const { mutateAsync: createClient, isPending: isPendingCreate } =
    useCreateClientWithContact();
  const { mutateAsync: updateClient, isPending: isPendingUpdate } =
    useUpdateClientWithContact(); // Use update mutation
  const { mutate: createRole } = useCreateRole();
  const { mutate: updateRole } = useUpdateRole();
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

  const handleContinue = () => {
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
      setActiveTab((prev) =>
        prev == "basicInfo" ? "address" : "contactPersons"
      );
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

  const baseInfoRows = [
    {
      label: "Company Name *",
      input: (
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          leftSection={<IconBuilding size={18} />}
          error={formErrors?.name?.[0]}
        />
      ),
    },
    {
      label: "Primary Contact *",
      input: (
        <TextInput
          value={contactFormData[0]?.contactName}
          leftSection={<IconUser size={18} />}
          onChange={(e) =>
            handleContactChange(0, "contactName", e.target.value)
          }
          error={formErrors?.contactName?.[0]}
        />
      ),
    },
    {
      label: "Designation *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            roleData?.data
              ?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              }))
              .filter((role: any) => role.label !== "Admin") || []
          }
          value={String(contactFormData[0]?.role_id)}
          leftSection={<IconUser size={18} />}
          onChange={(value) => handleContactChange(0, "role_id", Number(value))}
          error={formErrors?.role_id?.[0]}
          rightSectionPointerEvents="all"
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconChevronDown size={16} style={{ marginRight: 20 }} />
              <ActionIcon
                color={theme.colors.purple[1]}
                style={{
                  height: 42,
                  width: 60,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  fontSize: " var(--mantine-font-size-sm)",
                }}
                fw={500}
                onClick={open}
              >
                Add
              </ActionIcon>
            </div>
          }
        />
      ),
    },
    {
      label: "Email *",
      input: (
        <TextInput
          type="email"
          value={contactFormData[0]?.email}
          leftSection={<IconMail size={18} />}
          required
          onChange={(e) => handleContactChange(0, "email", e.target.value)}
          error={formErrors?.email?.[0]}
        />
      ),
    },
    {
      label: "Phone *",
      input: (
        <TextInput
          type="number"
          value={contactFormData[0]?.phone}
          leftSection={<IconPhone size={18} />}
          required
          onChange={(e) => handleContactChange(0, "phone", e.target.value)}
          error={formErrors?.phone?.[0]}
        />
      ),
    },
  ];

  const addressRows = [
    {
      label: "Address *",
      input: (
        <TextInput
          name="address"
          value={formData?.address}
          onChange={handleChange}
          leftSection={<IconMapPin size={18} />}
          error={formErrors?.address?.[0]}
        />
      ),
    },
    {
      label: "City*",
      input: (
        <TextInput
          name="city"
          value={formData?.city}
          onChange={handleChange}
          leftSection={<IconBuilding size={18} />}
          error={formErrors?.city?.[0]}
        />
      ),
    },
    {
      label: "State *",
      input: (
        <TextInput
          name="state"
          value={formData?.state}
          onChange={handleChange}
          leftSection={<IconMapPin size={18} />}
          error={formErrors?.state?.[0]}
        />
      ),
    },
    {
      label: "Country *",
      input: (
        <TextInput
          name="country"
          value={formData?.country}
          onChange={handleChange}
          leftSection={<IconMap size={18} />}
          error={formErrors?.country?.[0]}
        />
      ),
    },
    {
      label: "Postal/ZIP Code *",
      input: (
        <TextInput
          name="postal"
          value={formData?.postal}
          onChange={handleChange}
          leftSection={<IconZip size={18} />}
          error={formErrors?.postal?.[0]}
        />
      ),
    },
  ];

  return (
    <Box p="30px">
      <Paper shadow="sm" radius="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }} py="md" px={30}>
          <Group gap={0} h={36}>
            <IconAddressBook size={24} />
            <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
              {title}
            </Text>
          </Group>
        </Box>

        <Box px={"30px"} pt={"30px"}>
          <Tabs value={activeTab} onChange={() => {}}>
            <TabsList mb={20}>
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
              <FormTable rows={baseInfoRows} />
            </TabsPanel>

            <TabsPanel value="address">
              <FormTable rows={addressRows} />
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

        <Box style={{ borderTop: "1px solid #dddddd" }} p="md">
          <Group justify="center">
            <Button
              onClick={
                activeTab !== "contactPersons" ? handleContinue : handleSubmit
              }
              radius={"lg"}
              size="sm"
              bg={theme.colors.purple[1]}
              disabled={contactFormData.length == 0}
              loading={isPendingCreate || isPendingUpdate}
              fw={500}
            >
              {activeTab !== "contactPersons" ? "Continue" : "Save"}
            </Button>
          </Group>
        </Box>
      </Paper>
      <AddItemModal
        title="Designation"
        opened={opened}
        close={close}
        mutationFn={createRole}
        updateMutationFn={updateRole}
        deleteMutationFn={() => {}}
        dataList={roleData?.data.filter((role: any) => role.name !== "Admin")}
      />
    </Box>
  );
};

export default ClientCreatePage;
