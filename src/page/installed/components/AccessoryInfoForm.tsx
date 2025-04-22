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
  IconPlus,
  IconSquareLetterMFilled,
  IconUser,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../../hooks/useGetBrands";
import FormTable from "../../../components/common/FormTable";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "../../../hooks/useDeleteBrand";
import { useCreateType } from "../../../hooks/useCreateType";
import { useUpdateType } from "../../../hooks/useUpdateType";
import { useDeleteType } from "../../../hooks/useDeleteType";
import { useGetTypes } from "../../../hooks/useGetTypes";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}

interface Operators {
  type_id: string;
  qty: string;
}
const AccessoryInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [simMode, setSimMode] = useState<string | null>("Single");
  const { data: accessoryTypeData } = useGetTypes("Accessory");
  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();

  const handleAccessoryChange = (
    index: number,
    field: keyof Operators,
    value: any
  ) => {
    const updatedAccessory = [...form.values.accessory];
    if (!updatedAccessory[index]) {
      updatedAccessory[index] = { type_id: "", qty: "" };
    }
    updatedAccessory[index][field] = value;
    form.setFieldValue("accessory", updatedAccessory);
  };

  console.log("clientData", form.values);

  const addNewAccessory = () => {
    form.setFieldValue("accessory", [
      ...form.values.accessory,
      { type_id: "", qty: "" },
    ]);
  };

  const rows = (index: number) => [
    {
      label: "Accessory Type *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            accessoryTypeData?.data.data.map((data: any) => ({
              value: data.name,
              label: data.name,
            })) || []
          }
          onChange={(value) => handleAccessoryChange(index, "type_id", value)}
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
      label: "Accessory QTY *",
      input: (
        <TextInput
          type="number"
          leftSection={<IconPhoneFilled size={18} />}
          onChange={(e) => handleAccessoryChange(index, "qty", e.target.value)}
        />
      ),
    },
  ];

  const rowData = form.values.accessory.map((acc, index) => [...rows(index)]);
  console.log(rowData);

  return (
    <>
      {rowData.map((accesoryData) => (
        <FormTable rows={accesoryData} />
      ))}

      {/* <Button
        size="xs"
        onClick={addNewAccessory}
        my="xs"
        bg={theme.colors.success[5]}
        radius={"lg"}
      >
        <IconPlus size={18} />
        Add New Accessory
      </Button> */}
      <AddItemModal
        title="Accessory"
        opened={opened}
        close={close}
        mutationFn={createType}
        updateMutationFn={updateType}
        deleteMutationFn={deleteType}
        selectItem={accessoryTypeData?.data.data}
        dataList={accessoryTypeData?.data.data}
        type_group={"Accessory"}
      />
    </>
  );
};

export default AccessoryInfoForm;
