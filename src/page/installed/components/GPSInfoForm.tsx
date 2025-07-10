import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FormValues } from "../../../utils/types";
import {
  IconAlignBoxCenterMiddleFilled,
  IconChevronDown,
  IconShieldCheckFilled,
  IconSquareLetterBFilled,
  IconSquareLetterMFilled,
  IconUser,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../../hooks/useGetBrands";
import { useGetModels } from "../../../hooks/useGetModels";
import { Box, Loader } from "@mantine/core";
import FormTable from "../../../components/common/FormTable";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "./../../../hooks/useDeleteBrand";
import { useUpdateModel } from "../../../hooks/useUpdateModel";
import { useDeleteModel } from "../../../hooks/useDeleteModel";
import { useGetWarrantyPlans } from "../../../hooks/useGetWarrantyPlans";
import { useCreateWarrantyPlan } from "../../../hooks/useCreateWarrantyPlan";
import { useUpdateWarrantyPlan } from "./../../../hooks/useUpdateWarrantyPlan";
import { useDeleteWarrantyPlan } from "../../../hooks/useDeleteWarrantyPlan";
import WarrantyPlan from "../../../components/common/WarrantyPlan";
import { useGetBrandAll } from "../../../hooks/useGetBrandAll";
import { useGetModelAll } from "../../../hooks/useGetModelAll";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  isRowtable?: boolean;
}
const GPSInfoForm = ({ form, isRowtable = false }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  // Remove extraGPSCount state, use form.values.extraGPS instead
  const { data: brandData, isLoading: isBrandLoading } = useGetBrands("GPS");
  const { data: modelData, isLoading: isModelLoading } = useGetModels(
    "GPS",
    Number(form.values.gpsBrand)
  );

  const { allPeriModel: getAllModelData, isLoading: isGPSAllModelLoading } =
    useGetModelAll("GPS", form);
  const { data: warrantyData, isLoading: isWarrantyLoading } =
    useGetWarrantyPlans();

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

  // Add Extra GPS handler
  const handleAddExtraGPS = () => {
    const newExtra = {
      gpsBrand: "",
      gpsModel: "",
      imei: "",
      gpsSerial: "",
      warranty: "",
    };
    form.setFieldValue("extraGPS", [...(form.values.extraGPS || []), newExtra]);
  };

  // Delete Extra GPS handler
  const handleDeleteExtraGPS = (index: number) => {
    const updated = [...(form.values.extraGPS || [])];
    updated.splice(index, 1);
    form.setFieldValue("extraGPS", updated);
  };

  const rows = [
    {
      label: "Brand *",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            brandData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("gpsBrand")}
          leftSection={<IconSquareLetterBFilled size={18} />}
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
          // loading={isBrandLoading}
        />
      ),
    },
    {
      label: "Model *",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            modelData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("gpsModel")}
          leftSection={<IconSquareLetterMFilled size={18} />}
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
          // loading={isModelLoading}
        />
      ),
    },
    {
      label: "IMEI/UID *",
      input: (
        <TextInput
          leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
          {...form.getInputProps("imei")}
        />
      ),
    },
    {
      label: "Serial *",
      input: (
        <TextInput
          leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
          {...form.getInputProps("gpsSerial")}
        />
      ),
    },
    {
      label: "Warranty *",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            warrantyData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps("warranty")}
          leftSection={<IconShieldCheckFilled size={18} />}
          rightSectionPointerEvents="all"
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isWarrantyLoading ? (
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
                onClick={() => handleModal("Warranty")}
              >
                Add
              </ActionIcon>
            </div>
          }
          // loading={isWarrantyLoading}
        />
      ),
    },
  ];

  const extraGPSRows = (index: number) => [
    {
      label: "Brand *",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            brandData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps(`extraGPS.${index}.gpsBrand`)}
          leftSection={<IconSquareLetterBFilled size={18} />}
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
          // loading={isBrandLoading}
        />
      ),
    },
    {
      label: "Model *",
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            getAllModelData
              ?.filter(
                (model: any) =>
                  model.brand_id ===
                  Number(form.values?.extraGPS?.[index]?.gpsBrand)
              )
              .map((data: any) => ({
                value: String(data.id),
                label: data.name,
                brand_id: String(data.brand_id),
              })) || []
          }
          {...form.getInputProps(`extraGPS.${index}.gpsModel`)}
          leftSection={<IconSquareLetterMFilled size={18} />}
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
          // loading={isModelLoading}
        />
      ),
    },
    {
      label: "IMEI/UID *",
      input: (
        <TextInput
          leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
          {...form.getInputProps(`extraGPS.${index}.imei`)}
        />
      ),
    },
    {
      label: "Serial *",
      input: (
        <TextInput
          leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
          {...form.getInputProps(`extraGPS.${index}.gpsSerial`)}
        />
      ),
    },
    {
      label: "Warranty *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            warrantyData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          {...form.getInputProps(`extraGPS.${index}.warranty`)}
          leftSection={<IconShieldCheckFilled size={18} />}
          rightSectionPointerEvents="all"
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isWarrantyLoading ? (
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
                onClick={() => handleModal("Warranty")}
              >
                Add
              </ActionIcon>
            </div>
          }
          // loading={isWarrantyLoading}
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} isRowtable={isRowtable} />
      {(form.values.extraGPS || []).map((_, idx) => (
        <div key={idx} style={{ position: "relative", marginBottom: 16 }}>
          <FormTable rows={extraGPSRows(idx)} isRowtable={isRowtable} />
          <Button
            color="red"
            size="xs"
            variant="light"
            style={{ position: "absolute", bottom: 0, left: 0, zIndex: 2 }}
            onClick={() => handleDeleteExtraGPS(idx)}
          >
            Delete
          </Button>
        </div>
      ))}
      {/* <Group my="md">
        <Button
          onClick={handleAddExtraGPS}
          bg={theme.colors.purple[1]}
          radius={"lg"}
          size="sm"
        >
          Add Extra GPS
        </Button>
      </Group> */}

      {modalType == "Brand" && (
        <AddItemModal
          title="GPS Brand"
          opened={opened}
          close={close}
          mutationFn={createBrand}
          updateMutationFn={updateBrand}
          deleteMutationFn={deleteBrand}
          selectItem={brandData?.data.data}
          dataList={brandData?.data.data}
          type_group={"GPS"}
        />
      )}
      {modalType == "Model" && (
        <AddItemModal
          title="GPS Model"
          opened={opened}
          close={close}
          isHaveType={true}
          mutationFn={createModel}
          updateMutationFn={updateModel}
          deleteMutationFn={deleteModel}
          selectItem={brandData?.data.data}
          dataList={modelData?.data.data}
          type_group={"GPS"}
        />
      )}
      {modalType == "Warranty" && (
        <WarrantyPlan
          title="GPS Warranty"
          opened={opened}
          close={close}
          type_group={"GPS"}
        />
      )}
    </>
  );
};

export default GPSInfoForm;
