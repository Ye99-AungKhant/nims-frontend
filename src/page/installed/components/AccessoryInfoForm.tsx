import {
  ActionIcon,
  MultiSelect,
  TextInput,
  useMantineTheme,
  Box,
  Loader,
} from "@mantine/core";
import { FormValues } from "../../../utils/types";
import {
  IconCalendarWeek,
  IconChevronDown,
  IconDeviceSim,
  IconPhoneFilled,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import FormTable from "../../../components/common/FormTable";
import { useCreateType } from "../../../hooks/useCreateType";
import { useUpdateType } from "../../../hooks/useUpdateType";
import { useDeleteType } from "../../../hooks/useDeleteType";
import { useGetTypes } from "../../../hooks/useGetTypes";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  isRowtable?: boolean;
  maxSize?: number; // Optional prop to set max size
}

interface Operators {
  type_id: string;
  qty: string;
  installed_date?: Date;
}
const AccessoryInfoForm = ({
  form,
  isRowtable = false,
  maxSize,
}: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: accessoryTypeData, isLoading: isTypeLoading } =
    useGetTypes("Accessory");
  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();
  const [oldAccessory, setOldAccessory] = useState<any[] | null>(null);
  const usedOldAccessoryIds = new Set<number>();

  const handleAccessoryQtyChange = (
    index: number,
    field: keyof Operators,
    value: any
  ) => {
    let updatedAccessory = [...form.values.accessory][index];
    if (!updatedAccessory) {
      updatedAccessory = { type_id: "", qty: "" };
    }
    updatedAccessory[field] = value;

    if (!isRowtable) {
      form.setFieldValue(`accessory.${index}`, updatedAccessory);
    } else {
      let replaecementAccessory = { is_replacement: true, ...updatedAccessory };
      form.setFieldValue(`accessory.${index}`, replaecementAccessory);
    }
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

    if (!isRowtable) {
      const newAccessories = selectedTypes
        .filter((typeId) => !existingTypeIds.includes(typeId))
        .map((typeId) => ({
          type_id: typeId,
          qty: "", // new item with empty qty
        }));

      form.setFieldValue("accessory", [
        ...updatedAccessories,
        ...newAccessories,
      ]);
    } else {
      const newAccessories = selectedTypes
        .filter((typeId) => !existingTypeIds.includes(typeId))
        .map((typeId) => {
          // Find the first unused old accessory not in selectedTypes
          const oldAccessoryItem = oldAccessory?.find((acc) => {
            const isNotSelected = !selectedTypes.includes(acc.type_id);
            const isNotUsed = !usedOldAccessoryIds.has(acc.id);
            return isNotSelected && isNotUsed;
          });

          if (oldAccessoryItem) {
            usedOldAccessoryIds.add(oldAccessoryItem.id);
          }

          return {
            type_id: typeId,
            qty: "",
            is_replacement: true,
            replaced_id: oldAccessoryItem?.id ?? null,
          };
        });

      form.setFieldValue("accessory", [
        ...updatedAccessories,
        ...newAccessories,
      ]);
    }
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
          maxValues={maxSize ? maxSize : undefined}
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          value={form.values.accessory
            .map((acc) => acc.type_id)
            .filter((accId) => accId !== "")}
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
          {...form.getInputProps(`accessory.${index}.qty`)}
          onChange={(e) =>
            handleAccessoryQtyChange(index, "qty", e.target.value)
          }
          // error={form.errors[`accessory.${index}.qty`]}
          // {...form.getInputProps(`accessory.${index}.qty`).onChange}
        />
      ),
    },
    {
      label: `${getShortName(index)} Installation Date`,
      input: (
        <DateInput
          leftSection={<IconCalendarWeek size={18} />}
          {...form.getInputProps(`accessory.${index}.installed_date`)}
          onChange={(date) =>
            handleAccessoryQtyChange(index, "installed_date", date)
          }
        />
      ),
    },
  ];

  useEffect(() => {
    const currentAccessories = form.values.accessory;
    setOldAccessory(currentAccessories || null);
  }, []);

  return (
    <>
      <FormTable rows={rows} mb={0} isRowtable={isRowtable} />
      {form.values.accessory.map((accessory, index) => (
        <FormTable
          rows={QtyRows(index)}
          key={index}
          mt={0}
          mb={0}
          isRowtable={isRowtable}
        />
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
