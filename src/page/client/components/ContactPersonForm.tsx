import { Box, Button, Paper, Select, TextInput } from "@mantine/core";
import { useGetRoles } from "../hooks/useGetRoles";
import { useState } from "react";

export const ContactPersonForm = ({
  initialValues,
  handleSubmit,
}: {
  initialValues?: { name: string; role_id: any; phone: string; email: string };
  handleSubmit: (values: any) => void;
}) => {
  const { data: roleData } = useGetRoles();
  const [formValues, setFormValues] = useState(
    initialValues || {
      name: "",
      role_id: "",
      phone: "",
      email: "",
    }
  );

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  console.log(formValues);

  return (
    <>
      <TextInput
        label="Name"
        placeholder="Enter name"
        value={formValues.name}
        onChange={(e) => handleChange("name", e.target.value)}
        withAsterisk
      />
      <Select
        label="Role"
        placeholder="Enter role"
        searchable
        comboboxProps={{ offset: 0 }}
        data={
          roleData?.data?.map((data: any) => ({
            value: String(data.id),
            label: data.name,
          })) || []
        }
        value={formValues.role_id}
        defaultValue={formValues.role_id}
        onChange={(value) => handleChange("role_id", value as string)}
        withAsterisk
      />
      <TextInput
        label="Phone No."
        placeholder="Enter phone number"
        value={formValues.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        withAsterisk
      />
      <TextInput
        label="Email"
        placeholder="Enter email"
        value={formValues.email}
        onChange={(e) => handleChange("email", e.target.value)}
        withAsterisk
      />
      <Button mt="md" onClick={() => handleSubmit(formValues)}>
        Save
      </Button>
    </>
  );
};
