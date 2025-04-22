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
import { useGetBrands } from "../../form/hooks/useGetBrands";
import { useGetModels } from "../../form/hooks/useGetModels";
import { DateInput } from "@mantine/dates";
import FormTable from "../../../components/common/FormTable";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "./../../../hooks/useDeleteBrand";
import { useUpdateModel } from "../../../hooks/useUpdateModel";
import { useDeleteModel } from "../../../hooks/useDeleteModel";
import { useGetWarrantyPlans } from "../../form/hooks/useGetWarrantyPlans";
import { useCreateWarrantyPlan } from "../../../hooks/useCreateWarrantyPlan";
import { useUpdateWarrantyPlan } from "./../../../hooks/useUpdateWarrantyPlan";
import { useDeleteWarrantyPlan } from "../../../hooks/useDeleteWarrantyPlan";
import WarrantyPlan from "../../../components/common/WarrantyPlan";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const GPSInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: brandData } = useGetBrands("GPS");
  const { data: modelData } = useGetModels("GPS", Number(form.values.gpsBrand));
  const { data: warrantyData } = useGetWarrantyPlans();

  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();
  const { mutate: createModel } = useCreateModel();
  const { mutate: updateModel } = useUpdateModel();
  const { mutate: deleteModel } = useDeleteModel();
  const { mutate: createWarrantyPlan } = useCreateWarrantyPlan();
  const { mutate: updateWarrantyPlan } = useUpdateWarrantyPlan();
  const { mutate: deleteWarrantyPlan } = useDeleteWarrantyPlan();

  console.log("clientData", form.values);
  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  const rows = [
    {
      label: "Brand *",
      input: (
        <Select
          searchable
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
                onClick={() => handleModal("Warranty")}
              >
                Add
              </ActionIcon>
            </div>
          }
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} />
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
