import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  MultiSelect,
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

  const handleAccessoryQtyChange = (
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

  // console.log("clientData", form.values);

  const handleAccessoryTypeChange = (selectedTypes: string[]) => {
    const currentAccessories = form.values.accessory || [];

    // Keep only the accessories that are still selected
    const updatedAccessories = currentAccessories.filter((acc) =>
      selectedTypes.includes(acc.type_id)
    );

    // Find new selected types that are not yet in the form
    const existingTypeIds = updatedAccessories.map((acc) => acc.type_id);
    const newAccessories = selectedTypes
      .filter((typeId) => !existingTypeIds.includes(typeId))
      .map((typeId) => ({
        type_id: typeId,
        qty: "", // new item with empty qty
      }));

    form.setFieldValue("accessory", [...updatedAccessories, ...newAccessories]);
  };

  const getShortName = (index: number) => {
    return form.values.accessory.length > 1
      ? accessoryTypeData?.data?.data
          .find(
            (typeItem: any) =>
              typeItem.id === Number(form.values.accessory[index].type_id)
          )
          ?.name?.split(" ")
          ?.map((part: any) => part[0])
          ?.join("")
          .toUpperCase()
      : "";
  };

  const rows = [
    {
      label: "Accessory Type",
      input: (
        <MultiSelect
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            accessoryTypeData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          onChange={handleAccessoryTypeChange}
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
  ];

  const QtyRows = (index: number) => [
    {
      label: `${getShortName(index)} QTY`,
      input: (
        <TextInput
          type="number"
          leftSection={<IconPhoneFilled size={18} />}
          // value={form.values.accessory[index].qty}
          // onChange={(e) =>
          //   handleAccessoryQtyChange(index, "qty", e.target.value)
          // }
          // error={form.errors[`accessory.${index}.qty`]}
          {...form.getInputProps(`accessory.${index}.qty`)}
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} mb={0} />
      {form.values.accessory.map((accessory, index) => (
        <FormTable rows={QtyRows(index)} key={index} mt={0} mb={0} />
      ))}

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
