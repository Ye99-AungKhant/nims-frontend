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
  MultiSelect,
  LoadingOverlay,
} from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useGetClients } from "../../hooks/useGetClients";
import { ClientType } from "../../utils/types";
import { useGetTypes } from "../../hooks/useGetTypes";
import { useGetBrands } from "../../hooks/useGetBrands";
import { useGetModels } from "../../hooks/useGetModels";
import { useGetWarrantyPlans } from "../../hooks/useGetWarrantyPlans";
import { operatorData } from "../../config/operator";
import { useForm } from "@mantine/form";
import { useGetInstallationEngineers } from "../../hooks/useGetInstallationEngineer";
import { useGetRoles } from "../../hooks/useGetRoles";
import { useCreateFormSubmit } from "./hooks/useCreateFormSubmit";
import { useNavigate } from "react-router-dom";

interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface Operators {
  operator: string;
  phone_no: string;
}

interface Peripheral {
  sensor_type_id: string;
  brand_id: string;
  model_id: string;
  serial_no: string;
  qty: string;
  warranty_plan_id: string;
  warranty_expiry_date: Date;
}

interface Accessory {
  type_id: string;
  qty: string;
}

interface Server {
  type_id: string;
  domain: String;
  installed_date: Date;
  subscription_plan_id: string;
  expire_date: Date;
  invoice_no: String;
  object_base_fee: string;
}

interface InstallationEng {
  user_id: string;
}

interface FormValue {
  peripheral: Peripheral[];
  accessory: Accessory[];
  installationEngineer: InstallationEng[];
  operators: Operators[];
}

export default function CreateForm() {
  const form = useForm({
    initialValues: {
      client: "",
      contactPerson: [{ name: "", role: "", phone: "", email: "" }],
      vehicleType: "",
      vehicleBrand: "",
      vehicleModel: "",
      vehicleYear: "",
      vehiclePlateNo: "",
      gpsBrand: "",
      gpsModel: "",
      imei: "",
      gpsSerial: "",
      warranty: "",
      operator: { operator: "", phone_no: "" },
      operators: [{ operator: "", phone_no: "" }],
      peripheral: [
        {
          sensor_type_id: "",
          brand_id: "",
          model_id: "",
          serial_no: "",
          qty: "",
          warranty_plan_id: "",
          warranty_expiry_date: new Date(),
        },
      ],
      accessory: [{ type_id: "", qty: "" }],
      server: {
        type_id: "",
        domain: "",
        installed_date: new Date(),
        subscription_plan_id: "",
        expire_date: new Date(),
        invoice_no: "",
        object_base_fee: "",
      },
      installationEngineer: [{ user_id: "" }],
    },
  });

  const { data: clientData } = useGetClients();
  const { data: vehicleTypeData } = useGetTypes("Vehicle");
  const { data: vehicleBrandData } = useGetBrands("Vehicle");
  const { data: vehicleModelData } = useGetModels(
    "Vehicle",
    Number(form.values.vehicleBrand)
  );
  const { data: gpsBrandData } = useGetBrands("GPS");
  const { data: gpsModelData } = useGetModels(
    "GPS",
    Number(form.values.gpsBrand)
  );
  const { data: warrantyData } = useGetWarrantyPlans();
  const { data: peripheralTypeData } = useGetTypes("Sensor");
  const { data: peripheralsBrandData } = useGetBrands("Sensor");
  const { data: peripheralsModelData } = useGetModels("Sensor");
  const { data: accessoryTypeData } = useGetTypes("Accessory");
  const { data: serverTypeData } = useGetTypes("Server");
  const { data: installationEngineerData } = useGetInstallationEngineers();
  const { data: roleData } = useGetRoles();
  const { mutate, isPending } = useCreateFormSubmit();
  const [simChecked, setSimChecked] = useState({ single: true, dual: false });
  const navigate = useNavigate();

  const handleSimChecked = (checkedSim: string) => {
    if (checkedSim === "single") {
      setSimChecked((prev) => ({ ...prev, single: !prev.single, dual: false }));
      form.setFieldValue("operators", []);
    } else {
      setSimChecked((prev) => ({
        ...prev,
        single: !prev.single,
        dual: !prev.dual,
      }));
      form.setFieldValue("operator", { operator: "", phone_no: "" });
    }
  };

  const getTypeName = (data: any, typeId: string) => {
    return data?.data?.data.find((t: any) => t.id === Number(typeId))?.name;
  };

  const addContactPerson = () => {
    form.setFieldValue("contactPerson", [
      ...form.values.contactPerson,
      { name: "", role: "", phone: "", email: "" },
    ]);
  };

  // Update a specific contact person's field
  const handleContactChange = (
    index: number,
    field: keyof ContactPerson,
    value: string
  ) => {
    const updatedContacts = [...form.values.contactPerson];
    updatedContacts[index][field] = value;
    form.setFieldValue("contactPerson", updatedContacts);
  };

  // Remove a contact person
  const removeContactPerson = (index: number) => {
    const updatedContacts = form.values.contactPerson.filter(
      (_, i) => i !== index
    );
    form.setFieldValue("contactPerson", updatedContacts);
  };

  const handleOperatorChange = (field: string, value: string) => {
    form.setFieldValue("operator", {
      ...form.values.operator,
      [field]: value,
    });
  };

  const handleDualPhoneNumberChange = (index: number, value: string) => {
    const updatedOperators = [...form.values.operators];
    if (updatedOperators[index]) {
      updatedOperators[index].phone_no = value;
      form.setFieldValue("operators", updatedOperators);
    }
  };

  const handleDualOperatorChange = (selectedOperators: string[]) => {
    const updatedOperators = selectedOperators.map((operator, index) => ({
      operator,
      phone_no: form.values.operators[index]?.phone_no || "",
    }));

    form.setFieldValue("operators", updatedOperators);
  };

  const handlePeripheralChange = (selectedTypes: string[]) => {
    const updatedPeripherals = selectedTypes.map((typeId, index) => ({
      sensor_type_id: typeId,
      brand_id: form.values.peripheral[index]?.brand_id || "",
      model_id: form.values.peripheral[index]?.model_id || "",
      serial_no: form.values.peripheral[index]?.serial_no || "",
      qty: form.values.peripheral[index]?.qty || "",
      warranty_plan_id: form.values.peripheral[index]?.warranty_plan_id || "",
      warranty_expiry_date:
        form.values.peripheral[index]?.warranty_expiry_date || "",
    }));

    form.setFieldValue("peripheral", updatedPeripherals);
  };

  // ✅ Function to update individual field values for a specific peripheral
  const handleFieldChange = (
    index: number,
    field: keyof Peripheral,
    value: any
  ) => {
    const updatedPeripherals = [...form.values.peripheral];
    updatedPeripherals[index][field] = value;
    form.setFieldValue("peripheral", updatedPeripherals);
  };

  const handleAccessoryQtyChange = (index: number, value: string) => {
    const updatedAccessory = [...form.values.accessory];
    if (updatedAccessory[index]) {
      updatedAccessory[index].qty = value;
      form.setFieldValue("accessory", updatedAccessory);
    }
  };

  const handleAccessoryTypeChange = (selectedAccessory: string[]) => {
    const updatedAccessory = selectedAccessory.map((type_id, index) => ({
      type_id,
      qty: form.values.accessory[index]?.qty || "",
    }));

    form.setFieldValue("accessory", updatedAccessory);
  };

  const handleServerChange = (field: string, value: string | any) => {
    form.setFieldValue("server", {
      ...form.values.server,
      [field]: value,
    });
  };

  const handleInstallionEngChange = (selectedEng: string[]) => {
    const updatedEng = selectedEng.map((user_id, index) => ({
      user_id,
    }));

    form.setFieldValue("installationEngineer", updatedEng);
  };

  // console.log("installationEngineer", form.values.installationEngineer);

  const handleFormSubmit = (values: typeof form.values) => {
    const { operator, operators, ...rest } = values;
    const modifiedValues = simChecked.single
      ? { ...rest, operators: undefined, operator }
      : { ...rest, operator: undefined, operators };

    mutate(modifiedValues);
    console.log(modifiedValues);
  };

  return (
    <Box
      pos="relative"
      px={30}
      pb={30}
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />

      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Paper shadow="xl" p="xl">
          <Text size="xl">Client Information</Text>
          <Select
            label="Client Company or Individual Name"
            placeholder="Select Client"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              clientData?.data.data.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("client")}
          />
          <ActionIcon
            onClick={addContactPerson}
            style={{ position: "absolute", left: 18 }}
            size={24}
          >
            <IconPlus />
          </ActionIcon>

          {form.values.contactPerson.map((contact, index) => (
            <React.Fragment key={index}>
              <TextInput
                label={`Contact Person ${index + 1} Name`}
                placeholder="Enter name"
                withAsterisk
                value={contact.name}
                onChange={(e) =>
                  handleContactChange(index, "name", e.target.value)
                }
              />
              <Select
                label={`Contact Person ${index + 1} Role`}
                placeholder="Enter role"
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
                value={contact.role}
                onChange={(value: any) =>
                  handleContactChange(index, "role", value)
                }
              />
              <TextInput
                label={`Contact Person ${index + 1} Phone No.`}
                placeholder="Enter phone number"
                withAsterisk
                value={contact.phone}
                onChange={(e) =>
                  handleContactChange(index, "phone", e.target.value)
                }
              />
              <TextInput
                label={`Contact Person ${index + 1} Email.`}
                placeholder="Enter email"
                withAsterisk
                value={contact.email}
                onChange={(e) =>
                  handleContactChange(index, "email", e.target.value)
                }
              />
              <ActionIcon
                onClick={() => removeContactPerson(index)}
                style={{ position: "absolute", left: 18 }}
                color="red"
                size={24}
              >
                <IconTrash />
              </ActionIcon>
            </React.Fragment>
          ))}
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">Vehicle Information</Text>
          <Select
            label="Type"
            placeholder="Select Vehicle Type"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              vehicleTypeData?.data?.data.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("vehicleType")}
          />

          <Select
            label="Vehicle Brand"
            placeholder="Select Vehicle Brand"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              vehicleBrandData?.data?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("vehicleBrand")}
          />

          <Select
            label="Vehicle Model"
            placeholder="Select Model Brand"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              vehicleModelData?.data?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("vehicleModel")}
          />
          <TextInput
            label="Year"
            placeholder="Type here"
            mb="sm"
            withAsterisk
            {...form.getInputProps("vehicleYear")}
          />
          <TextInput
            label="Plate No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
            {...form.getInputProps("vehiclePlateNo")}
          />
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">Device Information</Text>

          <Select
            label="GPS Brand"
            placeholder="Select GPS Brand"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              gpsBrandData?.data?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("gpsBrand")}
          />

          <Select
            label="GPS Model"
            placeholder="Select GPS Model"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              gpsModelData?.data?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("gpsModel")}
          />
          <TextInput
            label="IMEI"
            placeholder="Type here"
            mb="sm"
            withAsterisk
            {...form.getInputProps("imei")}
          />
          <TextInput
            label="Serial No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
            {...form.getInputProps("gpsSerial")}
          />

          <Select
            label="Warranty"
            placeholder="Select Warranty Plan"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              warrantyData?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...form.getInputProps("warranty")}
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
            <>
              <Select
                placeholder="Select Operator"
                searchable
                comboboxProps={{
                  offset: 0,
                }}
                data={operatorData}
                value={form.values.operator.operator}
                onChange={(value) =>
                  handleOperatorChange("operator", value || "")
                }
              />
              <TextInput
                label="Phone No."
                placeholder="Type here"
                mb="sm"
                withAsterisk
                onChange={(e) =>
                  handleOperatorChange("phone_no", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <MultiSelect
                placeholder="Select Operator"
                searchable
                data={operatorData}
                maxValues={2}
                value={form.values.operators
                  .map((op) => op.operator)
                  .filter((op) => op !== "")}
                onChange={handleDualOperatorChange}
              />

              {form.values.operators.map((op, index) => (
                <TextInput
                  key={index}
                  label={`Phone No. ${index + 1}`}
                  placeholder="Type here"
                  mb="sm"
                  withAsterisk
                  value={op.phone_no}
                  onChange={(e) =>
                    handleDualPhoneNumberChange(index, e.target.value)
                  }
                />
              ))}
            </>
          )}
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">PERIPHERALS</Text>
          <MultiSelect
            label="Peripheral Type"
            placeholder="Select Peripheral Type"
            searchable
            data={
              peripheralTypeData?.data?.data.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            value={form.values.peripheral
              .map((peri) => peri.sensor_type_id)
              .filter((peri) => peri !== "")}
            onChange={handlePeripheralChange} // ✅ Handles MultiSelect change
          />

          {form.values.peripheral.map((peri, index) => (
            <React.Fragment key={index}>
              <Select
                label={`Brand for ${getTypeName(
                  peripheralTypeData,
                  peri.sensor_type_id
                )}`}
                placeholder="Select Brand"
                searchable
                comboboxProps={{
                  offset: 0,
                }}
                data={
                  peripheralsBrandData?.data?.data?.map((data: any) => ({
                    value: String(data.id),
                    label: data.name,
                  })) || []
                }
                value={peri.brand_id}
                onChange={(value: any) =>
                  handleFieldChange(index, "brand_id", value)
                }
              />

              <Select
                label={`Model for ${getTypeName(
                  peripheralTypeData,
                  peri.sensor_type_id
                )}`}
                placeholder="Select Model"
                searchable
                comboboxProps={{
                  offset: 0,
                }}
                data={
                  peripheralsModelData?.data?.data?.map((data: any) => ({
                    value: String(data.id),
                    label: data.name,
                  })) || []
                }
                value={peri.model_id}
                onChange={(value: any) =>
                  handleFieldChange(index, "model_id", value)
                }
              />

              <TextInput
                label={`QTY for ${getTypeName(
                  peripheralTypeData,
                  peri.sensor_type_id
                )}`}
                placeholder="Type here"
                mb="sm"
                withAsterisk
                value={peri.qty}
                onChange={(e) =>
                  handleFieldChange(index, "qty", e.target.value)
                }
              />

              <TextInput
                label={`Serial No. for ${getTypeName(
                  peripheralTypeData,
                  peri.sensor_type_id
                )}`}
                placeholder="Type here"
                mb="sm"
                withAsterisk
                value={peri.serial_no}
                onChange={(e) =>
                  handleFieldChange(index, "serial_no", e.target.value)
                }
              />

              <Select
                label={`Warranty for ${getTypeName(
                  peripheralTypeData,
                  peri.sensor_type_id
                )}`}
                placeholder="Select Warranty Plan"
                searchable
                comboboxProps={{
                  offset: 0,
                }}
                data={
                  warrantyData?.data?.map((data: any) => ({
                    value: String(data.id),
                    label: data.name,
                  })) || []
                }
                value={peri.warranty_plan_id}
                onChange={(value) =>
                  handleFieldChange(index, "warranty_plan_id", value)
                }
              />

              <DateInput
                label={`Warranty Expiry Date for ${getTypeName(
                  peripheralTypeData,
                  peri.sensor_type_id
                )}`}
                placeholder="Select warranty Expiry Date"
                value={peri.warranty_expiry_date}
                onChange={(date) =>
                  handleFieldChange(index, "warranty_expiry_date", date || "")
                }
              />
            </React.Fragment>
          ))}
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">ACCESSORIES</Text>
          <MultiSelect
            label="Accessories Type"
            placeholder="Select Accessories Type"
            searchable
            data={
              accessoryTypeData?.data?.data.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            value={form.values.accessory
              .map((acc) => acc.type_id)
              .filter((acc) => acc !== "")}
            onChange={(value) => handleAccessoryTypeChange(value)}
          />
          {form.values.accessory.map((accessory, index) => (
            <TextInput
              key={index}
              label={`QTY for ${getTypeName(
                accessoryTypeData,
                accessory.type_id
              )}`}
              placeholder="Type here"
              mb="sm"
              withAsterisk
              value={accessory.qty}
              onChange={(e) => handleAccessoryQtyChange(index, e.target.value)}
            />
          ))}
        </Paper>

        <Paper shadow="xl" p="xl" mt={10}>
          <Text size="xl">Server Information</Text>
          <Select
            label="Server Type"
            placeholder="Select Server Type"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              serverTypeData?.data?.data.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            value={form.values.server.type_id}
            onChange={(value: any) => handleServerChange("type_id", value)}
          />

          <TextInput
            label="Domain"
            placeholder="Type here"
            mb="sm"
            withAsterisk
            value={form.values.server.domain}
            onChange={(e) => handleServerChange("domain", e.target.value)}
          />

          <MultiSelect
            label="Installation Engineers"
            placeholder="Select Engineers"
            searchable
            data={
              installationEngineerData?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            value={form.values.installationEngineer
              .map((eng) => eng.user_id)
              .filter((eng) => eng !== "")}
            onChange={(value) => handleInstallionEngChange(value)}
          />

          <DateInput
            label="Installation Date"
            placeholder="Select Installation Date"
            value={form.values.server.installed_date}
            onChange={(date) =>
              handleServerChange("installed_date", date || "")
            }
          />

          <Select
            label="Subscription Plan"
            placeholder="Select Subscription Plan"
            searchable
            comboboxProps={{
              offset: 0,
            }}
            data={
              warrantyData?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            value={form.values.server.subscription_plan_id}
            onChange={(value: any) =>
              handleServerChange("subscription_plan_id", value)
            }
          />

          <TextInput
            label="Invoice No."
            placeholder="Type here"
            mb="sm"
            withAsterisk
            value={form.values.server.invoice_no}
            onChange={(e) => handleServerChange("invoice_no", e.target.value)}
          />
          <TextInput
            label="Object-Based Fee"
            placeholder="Type here"
            mb="sm"
            withAsterisk
            value={form.values.server.object_base_fee}
            onChange={(e) =>
              handleServerChange("object_base_fee", e.target.value)
            }
          />

          <DateInput
            label="Expiry Date"
            placeholder="Select expiry Date"
            value={form.values.server.expire_date}
            onChange={(date) => handleServerChange("expire_date", date || "")}
          />
        </Paper>

        <Group m="md">
          <Button type="submit" size="sm">
            Create
          </Button>
          <Button color="gray" size="sm" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </Group>
      </form>
    </Box>
  );
}
