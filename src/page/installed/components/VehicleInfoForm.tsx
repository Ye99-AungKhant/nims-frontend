import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  Select,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FormValues } from "../../../utils/types";
import {
  IconBuildings,
  IconCalendarWeek,
  IconChevronDown,
  IconEngine,
  IconLicense,
  IconSteeringWheelFilled,
  IconTruckFilled,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useGetClients } from "../../../hooks/useGetClients";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetTypes } from "../../../hooks/useGetTypes";
import { useCreateType } from "../../../hooks/useCreateType";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../../hooks/useGetBrands";
import { useGetModels } from "../../../hooks/useGetModels";
import FormTable from "../../../components/common/FormTable";
import { useUpdateType } from "../../../hooks/useUpdateType";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useUpdateModel } from "../../../hooks/useUpdateModel";
import { useDeleteType } from "../../../hooks/useDeleteType";
import { useDeleteModel } from "../../../hooks/useDeleteModel";
import { useDeleteBrand } from "../../../hooks/useDeleteBrand";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  isRowtable?: boolean;
}
const VehicleInfoForm = ({ form, isRowtable }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data: clientData, isLoading: isClientLoading } = useGetClients();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: vehicleTypeData, isLoading: isTypeLoading } =
    useGetTypes("Vehicle");
  const { data: vehicleBrandData, isLoading: isBrandLoading } = useGetBrands(
    "Vehicle",
    Number(form.values.vehicleType)
  );
  const { data: vehicleModelData, isLoading: isModelLoading } = useGetModels(
    "Vehicle",
    Number(form.values.vehicleBrand)
  );
  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();
  const { mutate: createModel } = useCreateModel();
  const { mutate: updateModel } = useUpdateModel();
  const { mutate: deleteModel } = useDeleteModel();

  console.log("clientData", form.values);
  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  form.watch("vehicleType", ({ value }) => {
    form.setValues({ vehicleBrand: undefined, vehicleModel: undefined });
  });

  const rows = [
    {
      label: `${isRowtable ? "" : "Company Name *"}`,
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
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
              {isClientLoading ? (
                <Box mr={20} mt={"xs"}>
                  <Loader size={"sm"} />
                </Box>
              ) : (
                <IconChevronDown size={16} style={{ marginRight: 20 }} />
              )}
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
          display={isRowtable ? "none" : "block"}
        />
      ),
    },
    {
      label: "Type",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
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
              {isTypeLoading ? (
                <Box mr={20} mt={"xs"}>
                  <Loader size={16} />
                </Box>
              ) : (
                <IconChevronDown size={16} style={{ marginRight: 20 }} />
              )}
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
      label: "Brand",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
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
              {isBrandLoading ? (
                <Box mr={20} mt={"xs"}>
                  <Loader size={16} />
                </Box>
              ) : (
                <IconChevronDown size={16} style={{ marginRight: 20 }} />
              )}
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
      label: "Model",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
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
              {isModelLoading ? (
                <Box mr={20} mt={"xs"}>
                  <Loader size={16} />
                </Box>
              ) : (
                <IconChevronDown size={16} style={{ marginRight: 20 }} />
              )}
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
      label: "Year",
      input: (
        <TextInput
          type="number"
          {...form.getInputProps("vehicleYear")}
          leftSection={<IconCalendarWeek size={18} />}
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
      label: "Odometer/Engine Hour",
      input: (
        <TextInput
          type="number"
          {...form.getInputProps("vehicleOdometer")}
          leftSection={<IconEngine size={16} />}
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} isRowtable={isRowtable} />
      {modalType == "Type" && (
        <AddItemModal
          title="Vehicle Type"
          opened={opened}
          close={close}
          mutationFn={createType}
          updateMutationFn={updateType}
          deleteMutationFn={deleteType}
          type_group={"Vehicle"}
          dataList={vehicleTypeData?.data.data}
        />
      )}
      {modalType == "Brand" && (
        <AddItemModal
          title="Vehicle Brand"
          opened={opened}
          close={close}
          isHaveType={true}
          mutationFn={createBrand}
          updateMutationFn={updateBrand}
          deleteMutationFn={deleteBrand}
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
          isHaveType={true}
          mutationFn={createModel}
          updateMutationFn={updateModel}
          deleteMutationFn={deleteModel}
          type_group={"Vehicle"}
          selectItem={vehicleBrandData?.data.data}
          dataList={vehicleModelData?.data.data}
        />
      )}
    </>
  );
};

export default VehicleInfoForm;
