import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  Select,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FormValues } from "../../../utils/types";
import {
  IconBuildings,
  IconCalendarWeek,
  IconChevronDown,
  IconLicense,
  IconSteeringWheelFilled,
  IconTruckFilled,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useGetClients } from "../../form/hooks/useGetClients";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetTypes } from "../../form/hooks/useGetTypes";
import { useCreateType } from "../../../hooks/useCreateType";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../form/hooks/useGetBrands";
import { useGetModels } from "../../form/hooks/useGetModels";
import FormTable from "../../../components/common/FormTable";
import { useUpdateType } from "../../../hooks/useUpdateType";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const VehicleInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data: clientData } = useGetClients();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: vehicleTypeData } = useGetTypes("Vehicle");
  const { data: vehicleBrandData } = useGetBrands(
    Number(form.values.vehicleType),
    "Vehicle"
  );
  const { data: vehicleModelData } = useGetModels(
    "Vehicle",
    Number(form.values.vehicleBrand)
  );
  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: createModel } = useCreateModel();

  console.log("clientData", form.values);
  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  const rows = [
    {
      label: "Company Name *",
      input: (
        <Select
          searchable
          comboboxProps={{ offset: 0 }}
          data={
            clientData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("client")}
          leftSection={<IconBuildings size={18} />}
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
                onClick={() => navigate("/client/create")}
              >
                Add
              </ActionIcon>
            </div>
          }
        />
      ),
    },
    {
      label: "Type *",
      input: (
        <Select
          searchable
          comboboxProps={{ offset: 0 }}
          data={
            vehicleTypeData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("vehicleType")}
          leftSection={<IconTruckFilled size={18} />}
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
                onClick={() => handleModal("Type")}
              >
                Add
              </ActionIcon>
            </div>
          }
        />
      ),
    },
    {
      label: "Plate No. *",
      input: (
        <TextInput
          {...form.getInputProps("vehiclePlateNo")}
          leftSection={<IconLicense size={16} />}
        />
      ),
    },
    {
      label: "Make *",
      input: (
        <Select
          searchable
          comboboxProps={{ offset: 0 }}
          data={
            vehicleBrandData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("vehicleBrand")}
          leftSection={<IconWorld size={18} />}
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
                onClick={() => handleModal("Brand")}
              >
                Add
              </ActionIcon>
            </div>
          }
        />
      ),
    },
    {
      label: "Model *",
      input: (
        <Select
          searchable
          comboboxProps={{ offset: 0 }}
          data={
            vehicleModelData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("vehicleModel")}
          leftSection={<IconSteeringWheelFilled size={18} />}
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
                onClick={() => handleModal("Model")}
              >
                Add
              </ActionIcon>
            </div>
          }
        />
      ),
    },
    {
      label: "Year *",
      input: (
        <TextInput
          {...form.getInputProps("vehicleYear")}
          leftSection={<IconCalendarWeek size={18} />}
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} />
      {modalType == "Type" && (
        <AddItemModal
          title="Vehicle Type"
          opened={opened}
          close={close}
          mutationFn={createType}
          updateMutationFn={updateType}
          type_group={"Vehicle"}
          dataList={vehicleTypeData?.data.data}
        />
      )}
      {modalType == "Brand" && (
        <AddItemModal
          title="Vehicle Brand"
          opened={opened}
          close={close}
          mutationFn={createBrand}
          updateMutationFn={updateBrand}
          type_group={"Vehicle"}
          selectItem={vehicleTypeData?.data.data}
          dataList={vehicleBrandData?.data.data}
        />
      )}
      {modalType == "Model" && (
        <AddItemModal
          title="Vehicle Model"
          opened={opened}
          close={close}
          mutationFn={createModel}
          updateMutationFn={updateType}
          type_group={"Vehicle"}
        />
      )}
    </>
  );
};

export default VehicleInfoForm;
