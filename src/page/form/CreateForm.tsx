import React, { useState } from "react";
import {
  Container,
  TextInput,
  Button,
  Box,
  Group,
  Input,
  Center,
  Paper,
  Title,
  Text,
  Select,
  Divider,
  ActionIcon,
  Radio,
} from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useGetClients } from "./hooks/useGetClients";

export default function CreateForm() {
  const { data: clientData, isLoading, isError } = useGetClients();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [contactPersonCount, setContactPersonCount] = useState(1);
  const [simChecked, setSimChecked] = useState({ single: true, dual: false });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSimChecked = (checkedSim: string) => {
    if (checkedSim === "single")
      setSimChecked((prev) => ({ ...prev, single: !prev.single, dual: false }));
    else
      setSimChecked((prev) => ({
        ...prev,
        single: !prev.single,
        dual: !prev.dual,
      }));
  };

  return (
    <Box
      px={30}
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Paper shadow="xl" p="xl">
          <Text size="xl">Client Information</Text>
          <label>Company or Individual Name</label>
          <Select
            placeholder="Select Client"
            data={clientData?.data}
            value={""}
          />
          <ActionIcon
            onClick={() => setContactPersonCount(contactPersonCount + 1)}
          >
            <IconPlus />
          </ActionIcon>
          {[...Array(contactPersonCount)].map((_, index) => (
            <React.Fragment key={index}>
              <TextInput
                label={`Contact Person ${index + 1}  Name`}
                placeholder="Type here"
                mb="sm"
                withAsterisk
              />
              <TextInput
                label={`Contact Person ${index + 1} Role`}
                placeholder="Type here"
                mb="sm"
                withAsterisk
              />
              <TextInput
                label={`Contact Person ${index + 1} Phone No.`}
                placeholder="Type here"
                mb="sm"
                withAsterisk
              />
              <TextInput
                label={`Contact Person ${index + 1} Email`}
                placeholder="Type here"
                mb="sm"
                withAsterisk
              />
            </React.Fragment>
          ))}
          <TextInput
            label="Address"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">Vehicle Information</Text>
          <label>Type</label>
          <Select placeholder="Select Vehicle Type" data={[]} value={""} />

          <label>Vehicle Brand</label>
          <Select placeholder="Select Vehicle Brand" data={[]} value={""} />
          <TextInput
            label="Model"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Year"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Plate No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">Device Information</Text>
          <label>GPS DEVICE</label>
          <Select placeholder="Select Vehicle Type" data={[]} value={""} />

          <label>GPS Brand</label>
          <Select placeholder="Select GPS Brand" data={[]} value={""} />
          <TextInput
            label="Model"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="IMEI"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Serial No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Warranty"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">SIMCARD</Text>
          <Group>
            <Radio
              checked={simChecked.single}
              variant="outline"
              onChange={() => handleSimChecked("single")}
              label="Single"
            />
            <Radio
              checked={simChecked.dual}
              variant="outline"
              onChange={() => handleSimChecked("dual")}
              label="Dual"
            />
          </Group>
          {simChecked.single ? (
            <TextInput
              label="Phone No."
              placeholder="Type here"
              mb="sm"
              withAsterisk
            />
          ) : (
            <>
              <TextInput
                label="First Phone No."
                placeholder="Type here"
                mb="sm"
                withAsterisk
              />
              <TextInput
                label="Second Phone No."
                placeholder="Type here"
                mb="sm"
                withAsterisk
              />
            </>
          )}
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">PERIPHERALS</Text>
          <label>Sensor Type</label>
          <Select placeholder="Select Sensor Type" data={[]} value={""} />

          <label>Brand</label>
          <Select placeholder="Select Brand" data={[]} value={""} />
          <TextInput
            label="Model"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput label="QTY" placeholder="Type here" mb="sm" withAsterisk />
          <TextInput
            label="Serial No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Warranty"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />

          <DateInput
            label="Warranty Expiry Date"
            placeholder="Select warranty Expiry Date"
          />
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">ACCESSORIES</Text>
          <label>Accessories Type</label>
          <Select placeholder="Select Accessories Type" data={[]} value={""} />
          <TextInput
            label="Selected Type QTY"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">Server Information</Text>
          <label>Server Type</label>
          <Select placeholder="Select Server Type" data={[]} value={""} />

          <TextInput
            label="Domain"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <label>Installation Engineers</label>
          <Select placeholder="Select Engineers" data={[]} value={""} />

          <label>Installation Date</label>

          <TextInput
            label="Subscription Plan"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Invoice No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />
          <TextInput
            label="Object-Based Fee"
            placeholder="Type here"
            mb="sm"
            withAsterisk
          />

          <DateInput label="Expiry Date" placeholder="Select expiry Date" />
        </Paper>

        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
