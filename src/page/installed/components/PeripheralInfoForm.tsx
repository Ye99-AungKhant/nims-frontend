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
import React, { useEffect, useState } from "react";
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
  IconUser,
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
  isEditMode,
  isRowtable = false,
  disableQty = false,
}: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState(0);
  const [selectedTypeId, setSelectedTypeId] = useState(0);
  const [periTypeQTY, setPeriTypeQTY] = useState([
    {
      type: "",
      typeName: "",
    },
  ]);
  const { data: typeData } = useGetTypes("Sensor");
  const { data: brandData } = useGetBrands("Sensor", selectedTypeId);
  // const { data: modelData } = useGetModels("Sensor", selectedBrandId);
  const getAllBrandData = useGetBrandAll("Sensor", form);
  const getAllModelData = useGetModelAll("Sensor", form);
  const { data: warrantyData } = useGetWarrantyPlans();
  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();
  const { mutate: createModel } = useCreateModel();
  const { mutate: updateModel } = useUpdateModel();
  const { mutate: deleteModel } = useDeleteModel();

  const [storeBrandData, setStoreBrandData] = useState<any[]>([]);
  const [storeModelData, setStoreModelData] = useState<any[]>([]);

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

    const updatedPeripherals = selectedTypes.map((typeId, index) => {
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

    selectedTypes.forEach((typeId) => {
      setSelectedTypeId(Number(typeId));
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
        // Optionally update selectedTypeIdForFetching if needed when qty changes (though unlikely)
        // setSelectedTypeIdForFetching(Number(updatedPeripherals[peripheralIndex].sensor_type_id));
      }
      // If sensor_type_id changed, update the ID used for fetching brands/models
      if (field === "sensor_type_id") {
        setSelectedTypeId(Number(value));
        // Clear dependent fields when type changes?
        // Consider resetting brand/model/serial/warranty for the affected peripheral
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

      // Update the brand ID used for fetching models if the brand_id changed
      if (detailField === "brand_id") {
        setSelectedBrandId(Number(value));
      }
      // Potentially update type ID for fetching if relevant (though usually set by sensor_type_id change)
      // if (detailField === 'brand_id' || detailField === 'model_id') {
      //     setSelectedTypeIdForFetching(Number(currentPeripherals[peripheralIndex].sensor_type_id));
      // }
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
      label: `${getShortName(indexNum, index)} Model`,
      input: (
        <Select
          searchable
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

  const rows = [
    {
      label: "Sensor Type",
      input: (
        <MultiSelect
          searchable
          maxValues={isRowtable ? 1 : undefined}
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
          comboboxProps={{
            offset: 0,
          }}
          data={["1", "2", "3", "4"]}
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
          onChange={(date) => handleFieldChange(index, "installed_date", date)}
        />
      ),
    },
  ];

  // useEffect(() => {
  //   form.values.peripheral.map((p) => {
  //     setSelectedTypeId(Number(p.sensor_type_id));
  //   });
  // }, [form.values.peripheral.length]);

  // useEffect(() => {
  //   if (brandData?.data?.data?.length) {
  //     setStoreBrandData((prev) => {
  //       const currentBrandIds = new Set(prev.map((item) => item.id));
  //       const newData = brandData.data.data.filter(
  //         (newItem: any) => !currentBrandIds.has(newItem.id)
  //       );
  //       return [...prev, ...newData];
  //     });
  //   }
  // }, [selectedTypeId, brandData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const brandResponses = await Promise.all(getAllBrandData);
  //       const modelResponses = await Promise.all(getAllModelData);

  //       console.log("hehe", brandResponses, modelResponses);

  //       const allPeriBrand = brandResponses
  //         .map((allBrand) => ({
  //           ...allBrand.data?.data.data,
  //         }))
  //         .flatMap((item) => Object.values(item));

  //       setStoreBrandData((prev) => {
  //         const currentBrandIds = new Set(prev.map((item) => item.id));
  //         const newData = allPeriBrand.filter(
  //           (newItem: any) => !currentBrandIds.has(newItem.id)
  //         );
  //         return [...prev, ...newData];
  //       });

  //       console.log("getAllBrandData", allPeriBrand);
  //     } catch (error) {
  //       console.error("Failed to fetch brand/model data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [form.values.peripheral, isEditMode]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (selectedBrandId) {
  //         const modelResponses = await Promise.all(getAllModelData);
  //         const allPeriModel = modelResponses
  //           .map((allModel) => ({
  //             ...allModel.data?.data.data,
  //           }))
  //           .flatMap((item) => Object.values(item));

  //         console.log("lee", modelResponses, allPeriModel);

  //         setStoreModelData((prev) => {
  //           const currentModelIds = new Set(prev.map((item) => item.id));
  //           const newData = allPeriModel.filter(
  //             (newItem: any) => !currentModelIds.has(newItem.id)
  //           );
  //           return [...prev, ...newData];
  //         });
  //         console.log("getAllModelData", allPeriModel);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch brand/model data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [form.values.peripheral, isEditMode, selectedBrandId]);

  // useEffect(() => {
  //   // const allBrandReady = getAllBrandData.every((q) => q.isSuccess);
  //   // const allModelReady = getAllModelData.every((q) => q.isSuccess);

  //   // console.log("heee", allBrandReady, allModelReady);

  //   // if (!allBrandReady || !allModelReady) return; // wait until all done

  //   const allPeriBrand = getAllBrandData
  //     .map((q) => q.data?.data?.data)
  //     .flatMap((obj) => Object.values(obj || {}));

  //   setStoreBrandData((prev) => {
  //     const currentBrandIds = new Set(prev.map((item) => item.id));
  //     const newData = allPeriBrand.filter(
  //       (item: any) => !currentBrandIds.has(item.id)
  //     );
  //     return [...prev, ...newData];
  //   });

  //   // const allPeriModel = getAllModelData
  //   //   .map((q) => q?.data?.data?.data)
  //   //   .flatMap((obj) => Object.values(obj || {}));

  //   // console.log("allPeriModel", getAllModelData);

  //   // setStoreModelData((prev) => {
  //   //   const currentModelIds = new Set(prev.map((item) => item.id));
  //   //   const newData = getAllModelData.filter(
  //   //     (item: any) => !currentModelIds.has(item.id)
  //   //   );
  //   //   return [...prev, ...newData];
  //   // });
  //   // console.log("selectedBrandId", selectedBrandId);
  // }, [form.values.peripheral, selectedBrandId, selectedTypeId]);

  // console.log("storeBrandData", storeBrandData);
  // console.log("storeModelData", storeModelData);

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
