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
  IconChevronDown,
  IconDeviceSim,
  IconPhoneFilled,
  IconSquareLetterMFilled,
  IconUser,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../form/hooks/useGetBrands";
import FormTable from "../../../components/common/FormTable";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "../../../hooks/useDeleteBrand";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}

interface Operators {
  operator: string;
  phone_no: string;
}
const SimCardInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [simMode, setSimMode] = useState<string | null>("Single");
  const { data: brandData } = useGetBrands("Operator");
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();

  const handleDualPhoneNumberChange = (
    index: number,
    field: keyof Operators,
    value: any
  ) => {
    const updatedOperators = [...form.values.operators];
    if (!updatedOperators[index]) {
      updatedOperators[index] = { operator: "", phone_no: "" };
    }
    updatedOperators[index][field] = value;
    form.setFieldValue("operators", updatedOperators);
  };

  console.log("clientData", form.values);

  const rows = [
    {
      label: "Mode *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={[
            { label: "Single", value: "Single" },
            { label: "Dual", value: "Dual" },
          ]}
          onChange={(value) => setSimMode(value)}
          leftSection={<IconSquareLetterMFilled size={18} />}
          rightSection={
            <IconChevronDown size={16} style={{ marginRight: 20 }} />
          }
        />
      ),
    },
    {
      label: "First Operator *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            brandData?.data.data.map((data: any) => ({
              value: data.name,
              label: data.name,
            })) || []
          }
          onChange={(value) =>
            handleDualPhoneNumberChange(0, "operator", value)
          }
          leftSection={<IconDeviceSim size={18} />}
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
      label: "First Phone No. *",
      input: (
        <TextInput
          type="number"
          leftSection={<IconPhoneFilled size={18} />}
          onChange={(e) =>
            handleDualPhoneNumberChange(0, "phone_no", e.target.value)
          }
        />
      ),
    },
    {
      label: "Second Operator *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            brandData?.data.data.map((data: any) => ({
              value: data.name,
              label: data.name,
            })) || []
          }
          onChange={(value) =>
            handleDualPhoneNumberChange(1, "operator", value)
          }
          leftSection={<IconDeviceSim size={18} />}
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
                  fontSize: 12,
                }}
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
      label: "Second Phone No. *",
      input: (
        <TextInput
          type="number"
          leftSection={<IconPhoneFilled size={18} />}
          onChange={(e) =>
            handleDualPhoneNumberChange(1, "phone_no", e.target.value)
          }
        />
      ),
    },
  ];

  const rowFilter = simMode === "Dual" ? rows : rows.slice(0, rows.length - 2);

  return (
    <>
      <FormTable rows={rowFilter} />
      <AddItemModal
        title="Operator"
        opened={opened}
        close={close}
        mutationFn={createBrand}
        updateMutationFn={updateBrand}
        deleteMutationFn={deleteBrand}
        selectItem={brandData?.data.data}
        dataList={brandData?.data.data}
        type_group={"Operator"}
      />
    </>
  );
};

export default SimCardInfoForm;
