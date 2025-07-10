import {
  ActionIcon,
  Box,
  Loader,
  MultiSelect,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FormValues, Peripheral, PeripheralDetail } from "../../../utils/types";
import {
  IconAlignBoxCenterMiddleFilled,
  IconCalendarWeek,
  IconChevronDown,
  IconListNumbers,
  IconShieldCheckFilled,
  IconSquareLetterBFilled,
  IconSquareLetterMFilled,
  IconSquareLetterTFilled,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetTypes } from "../../../hooks/useGetTypes";
import { useCreateType } from "../../../hooks/useCreateType";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import FormTable from "../../../components/common/FormTable";
import { useGetWarrantyPlans } from "../../../hooks/useGetWarrantyPlans";
import { useUpdateType } from "../../../hooks/useUpdateType";
import { useDeleteType } from "../../../hooks/useDeleteType";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "../../../hooks/useDeleteBrand";
import { useUpdateModel } from "../../../hooks/useUpdateModel";
import { useDeleteModel } from "../../../hooks/useDeleteModel";
import WarrantyPlan from "../../../components/common/WarrantyPlan";
import { useGetBrandAll } from "../../../hooks/useGetBrandAll";
import { useGetModelAll } from "../../../hooks/useGetModelAll";
import { DateInput } from "@mantine/dates";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  isEditMode?: boolean;
  isRowtable?: boolean;
  disableQty?: boolean; // Optional prop to disable qty input
}
const PeripheralInfoForm = ({
  form,
  isRowtable = false,
  disableQty = false,
}: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: typeData, isLoading: isTypeLoading } = useGetTypes("Sensor");
  const { allPeriBrand: getAllBrandData, isLoading: isBrandLoading } =
    useGetBrandAll("Sensor", form);
  const { allPeriModel: getAllModelData, isLoading: isModelLoading } =
    useGetModelAll("Sensor", form);
  const { data: warrantyData, isLoading: isWarrantyLoading } =
    useGetWarrantyPlans();
  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();
  const { mutate: createModel } = useCreateModel();
  const { mutate: updateModel } = useUpdateModel();
  const { mutate: deleteModel } = useDeleteModel();

  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  const addNewPeripheralDetail = (peripheralIndex: number, newQty: number) => {
    const currentPeripherals = form.values.peripheral;
    const targetPeripheral = currentPeripherals[peripheralIndex];

    if (!targetPeripheral) return; // Safety check

    const currentDetails = targetPeripheral.detail || [];
    const currentLength = currentDetails.length;
    const numericQty = Number(newQty); // Ensure qty is a number

    if (isNaN(numericQty) || numericQty < 0) return; // Handle invalid qty input

    let updatedDetails: PeripheralDetail[];

    if (numericQty > currentLength) {
      // Add new detail entries
      const itemsToAdd = numericQty - currentLength;
      // Use Array.from to createnew* distinct objects for each entry
      const addedDetails = Array.from(
        { length: itemsToAdd },
        (): PeripheralDetail => ({
          brand_id: "",
          model_id: "",
          serial_no: "",
          warranty_plan_id: "",
        })
      );
      updatedDetails = [...currentDetails, ...addedDetails];
    } else if (numericQty < currentLength) {
      currentDetails.pop();
      updatedDetails = currentDetails;
    } else {
      // No change in quantity needed
      updatedDetails = currentDetails;
    }

    // Create the updated peripherals array immutably
    const updatedPeripherals = currentPeripherals.map((peri, pIndex) => {
      if (pIndex === peripheralIndex) {
        // Return a new object for the updated peripheral
        return {
          ...peri,
          // Update qty (ensure it's stored as expected - string or number)
          qty: String(newQty),
          detail: updatedDetails,
        };
      }
      // Return original object for others
      return peri;
    });

    form.setFieldValue("peripheral", updatedPeripherals);
  };

  const handlePeripheralChange = (selectedTypes: string[]) => {
    const existingPeripherals = form.values.peripheral || [];

    const updatedPeripherals = selectedTypes.map((typeId) => {
      // Check if this typeId already exists in peripheral
      const existing = existingPeripherals.find(
        (p) => p.sensor_type_id === typeId
      );

      if (existing) {
        return existing; // Reuse the existing peripheral
      }

      // Create a new peripheral entry if not existing
      return {
        is_replacement: true,
        sensor_type_id: typeId,
        qty: "",
        detail: [
          {
            brand_id: "",
            model_id: "",
            serial_no: "",
            warranty_plan_id: "",
          },
        ],
      };
    });

    form.setFieldValue("peripheral", updatedPeripherals);
  };

  const handleFieldChange = (
    peripheralIndex: number,
    field: keyof Peripheral,
    value: any,
    detailFieldIndex?: number,
    detailField?: keyof PeripheralDetail
  ) => {
    const currentPeripherals = form.values.peripheral;

    // --- Update top-level fields (sensor_type_id, qty) ---
    if (field === "sensor_type_id" || field === "qty") {
      const updatedPeripherals = currentPeripherals.map((peri, pIndex) => {
        if (pIndex === peripheralIndex) {
          return {
            ...peri,
            [field]: value, // Update the specific field
          };
        }
        return peri;
      });
      form.setFieldValue("peripheral", updatedPeripherals);

      // If qty changed, adjust the detail array size
      if (field === "qty") {
        addNewPeripheralDetail(peripheralIndex, Number(value));
      }

      // --- Update nested 'detail' fields ---
    } else if (field === "detail") {
      if (detailField === undefined || detailFieldIndex === undefined) {
        console.error(
          "Missing detailFieldIndex or detailField for detail_field update"
        );
        return;
      }

      const updatedPeripherals = currentPeripherals.map((peri, pIndex) => {
        if (pIndex === peripheralIndex) {
          // Create a new detail array by mapping over the old one
          const updatedDetail = peri.detail.map((detailItem, dIndex) => {
            if (dIndex === detailFieldIndex) {
              // Create a new detailItem object with the updated field
              return {
                ...detailItem,
                [detailField]: value,
              };
            }
            // Return the original detailItem object if it's not the one being updated
            return detailItem;
          });
          // Return a new peripheral object with the updated detail array
          return {
            is_replacement: true,
            ...peri,
            detail: updatedDetail,
          };
        }
        // Return the original peripheral object if it's not the one being updated
        return peri;
      });

      form.setFieldValue("peripheral", updatedPeripherals);
    }
  };

  const getShortName = (indexNum: number, detailIndex: number) => {
    return Number(form.values.peripheral[indexNum].qty) > 1 ||
      form.values.peripheral.length > 1
      ? typeData?.data?.data
          .find(
            (typeItem: any) =>
              typeItem.id ===
              Number(form.values.peripheral[indexNum].sensor_type_id)
          )
          ?.name?.split(" ")
          ?.map((part: any) => part[0])
          ?.join("")
          .toUpperCase() +
          " " +
          (detailIndex + 1)
      : "";
  };

  const inputList = (indexNum: number, index: number) => [
    {
      label: `${getShortName(indexNum, index)} Brand`,
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            getAllBrandData
              .filter(
                (brand: any) =>
                  brand.type_id ===
                  Number(form.values.peripheral[indexNum].sensor_type_id)
              )
              .map((data: any) => ({
                value: String(data.id),
                label: data.name,
                type_id: String(data.type_id),
              })) || []
          }
          value={form.values.peripheral[indexNum].detail[index]?.brand_id}
          onChange={(value: any) => {
            handleFieldChange(indexNum, "detail", value, index, "brand_id");
            const modelPath = `peripheral.${indexNum}.detail.${index}.model_id`;
            form.setFieldValue(modelPath, null);
          }}
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
      label: `${getShortName(indexNum, index)} Model`,
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={
            getAllModelData
              .filter(
                (model: any) =>
                  model.brand_id ===
                  Number(
                    form.values.peripheral[indexNum].detail[index].brand_id
                  )
              )
              .map((data: any) => ({
                value: String(data.id),
                label: data.name,
                brand_id: String(data.brand_id),
              })) || []
          }
          value={form.values.peripheral[indexNum].detail[index]?.model_id}
          onChange={(value: any) =>
            handleFieldChange(indexNum, "detail", value, index, "model_id")
          }
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
      label: `${getShortName(indexNum, index)} Serial`,
      input: (
        <TextInput
          leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
          value={form.values.peripheral[indexNum].detail[index]?.serial_no}
          onChange={(e) =>
            handleFieldChange(
              indexNum,
              "detail",
              e.target.value,
              index,
              "serial_no"
            )
          }
        />
      ),
    },
    {
      label: `${getShortName(indexNum, index)} Warranty`,
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
          value={
            form.values.peripheral[indexNum].detail[index]?.warranty_plan_id
          }
          onChange={(value: any) =>
            handleFieldChange(
              indexNum,
              "detail",
              value,
              index,
              "warranty_plan_id"
            )
          }
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
        />
      ),
    },
  ];

  const rows = [
    {
      label: "Sensor Type",
      input: (
        <MultiSelect
          searchable
          // maxValues={isRowtable ? 1 : undefined}
          comboboxProps={{
            offset: 0,
          }}
          data={
            typeData?.data?.data.map((data: any) => ({
              value: String(data.id),
              label: data.name,
            })) || []
          }
          value={form.values.peripheral
            .map((peri) => peri.sensor_type_id)
            .filter((peri) => peri !== "")}
          onChange={handlePeripheralChange}
          leftSection={<IconSquareLetterTFilled size={18} />}
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
  ];

  const qtyRow = (index: number) => [
    {
      label: `${
        form.values.peripheral.length > 1
          ? typeData?.data?.data
              .find(
                (typeItem: any) =>
                  typeItem.id ===
                  Number(form.values.peripheral[index].sensor_type_id)
              )
              ?.name?.split(" ")
              ?.map((part: any) => part[0])
              ?.join("")
              .toUpperCase()
          : ""
      } QTY`,
      input: (
        <Select
          searchable
          nothingFoundMessage="Nothing found..."
          comboboxProps={{
            offset: 0,
          }}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          onChange={(value: any) => handleFieldChange(index, "qty", value)}
          value={form.values.peripheral[index]?.qty}
          leftSection={<IconListNumbers size={18} />}
          rightSection={<IconChevronDown size={16} />}
        />
      ),
    },
    {
      label: `${
        form.values.peripheral.length > 1
          ? typeData?.data?.data
              .find(
                (typeItem: any) =>
                  typeItem.id ===
                  Number(form.values.peripheral[index].sensor_type_id)
              )
              ?.name?.split(" ")
              ?.map((part: any) => part[0])
              ?.join("")
              .toUpperCase()
          : ""
      } Installation Date`,
      input: (
        <DateInput
          leftSection={<IconCalendarWeek size={18} />}
          {...form.getInputProps(`peripheral.${index}.installed_date`)}
          // onChange={(date) => handleFieldChange(index, "installed_date", date)}
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} mb={0} isRowtable={isRowtable} />
      {form.values.peripheral.map((peri, indexNum) => (
        <React.Fragment key={indexNum}>
          {!disableQty && (
            <FormTable
              rows={qtyRow(indexNum)}
              mt={0}
              mb={0}
              isRowtable={isRowtable}
            />
          )}
          {Array.from({ length: Number(peri.qty) }, (_, index) => (
            <FormTable
              rows={inputList(indexNum, index)}
              mt={0}
              mb={10}
              key={`${indexNum}-${index}`}
              isRowtable={isRowtable}
            />
          ))}
        </React.Fragment>
      ))}
      {modalType == "Type" && (
        <AddItemModal
          title="Peripheral Type"
          opened={opened}
          close={close}
          mutationFn={createType}
          updateMutationFn={updateType}
          deleteMutationFn={deleteType}
          type_group={"Sensor"}
          dataList={typeData?.data.data}
        />
      )}
      {modalType == "Brand" && (
        <AddItemModal
          title="Peripheral Brand"
          opened={opened}
          close={close}
          isHaveType={true}
          mutationFn={createBrand}
          updateMutationFn={updateBrand}
          deleteMutationFn={deleteBrand}
          selectItem={typeData?.data.data}
          dataList={getAllBrandData}
          type_group={"Sensor"}
        />
      )}
      {modalType == "Model" && (
        <AddItemModal
          title="Peripheral Model"
          opened={opened}
          close={close}
          isHaveType={true}
          type_group={"Sensor"}
          mutationFn={createModel}
          updateMutationFn={updateModel}
          deleteMutationFn={deleteModel}
          selectItem={getAllBrandData}
          dataList={getAllModelData}
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

export default PeripheralInfoForm;
