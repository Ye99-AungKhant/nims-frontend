import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  MultiSelect,
  Radio,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendarWeek, IconChevronDown } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useGetInstallationEngineers } from "../../../hooks/useGetInstallationEngineer";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useCreateInstallationEngineer } from "../../../hooks/useCreateInstallEngineer";
import { useUpdateInstallEngineer } from "../../../hooks/useUpdateInstallEngineer";
import { useDeleteInstallEngineer } from "../../../hooks/useDeleteInstallEngineer";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import GPSInfoForm from "./GPSInfoForm";
import SimCardInfoForm from "./SimCardInfoForm";
import PeripheralInfoForm from "./PeripheralInfoForm";
import AccessoryInfoForm from "./AccessoryInfoForm";
import ImageDropZone from "../../../components/common/ImageDropZone";
import { useLocation } from "react-router-dom";
import { useGetInstalledDetail } from "../hooks/useGetInstalled";
import useUserStore from "../../../store/useUserStore";
import { useReplacement } from "../../../hooks/repairReplacement/useReplacement";
import { useCreateRepair } from "../../../hooks/repairReplacement/useCreateRepair";
import VehicleInfoForm from "./VehicleInfoForm";

interface Props {
  opened: boolean;
  onClose: () => void;
  onClick: any;
  title: string;
  description: string;
  isloading: boolean;
  id: any;
}

const RepairReplacement = ({
  opened,
  onClose,
  onClick,
  title,
  description,
  isloading,
  id,
}: Props) => {
  const param = useLocation();
  const { user } = useUserStore();
  const { data: installedObject, isLoading } = useGetInstalledDetail(id);
  const theme = useMantineTheme();
  const [openedInstallEng, { open: openInstallEng, close: closeInstallEng }] =
    useDisclosure(false);

  const [selectedRepairType, setSelectedRepairType] = useState("Replacement");
  const [selectedReplacementType, setSelectedReplacementType] =
    useState<string[]>();
  const { data: installationEngineerData } = useGetInstallationEngineers();
  const { mutate: createInstallationEngineer } =
    useCreateInstallationEngineer();

  const { mutate: updateInstallationEngineer } = useUpdateInstallEngineer();
  const { mutate: deleteInstallationEngineer } = useDeleteInstallEngineer();
  const { mutate, isPending } = useReplacement();
  const { mutate: RepairMutate, isPending: isRepaiLoading } = useCreateRepair();

  const form = useForm<any>({
    initialValues: {
      gpsBrand: "",
      gpsModel: "",
      imei: "",
      gpsSerial: "",
      warranty: "",
      repair_replacement_by_user_id: user?.id,
      repair_replacement_date: "",
      replacementType: [],
      reason: "",
      operators: [{ operator: "", phone_no: "" }],
      peripheral: [
        {
          sensor_type_id: "",
          qty: "",
          detail: [
            {
              brand_id: "",
              model_id: "",
              serial_no: "",
              warranty_plan_id: "",
            },
          ],
        },
      ],
      accessory: [{ type_id: "", qty: "" }],
      installImage: [],
      user_false: "",
    },
  });

  const vehicleForm = useForm<any>({
    initialValues: {
      id: "",
      vehicleType: "",
      vehicleBrand: "",
      vehicleModel: "",
      vehicleYear: "",
      vehiclePlateNo: "",
      vehicleOdometer: "",
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    // Append all installImage files (Blobs)
    form.values.installImage?.forEach((imgFile: any) => {
      if (imgFile.file) {
        formData.append("installImage", imgFile.file, imgFile.file.name);
      }
    });

    if (selectedRepairType === "Replacement") {
      const newData = {
        ...form.values,
        replacementType: selectedReplacementType,
        isRepair: false,
      };

      formData.append("data", JSON.stringify(newData));
      mutate(formData, {
        onSuccess: () => onClose(),
      });
    } else if (selectedRepairType === "Repair") {
      const repairData = {
        vehicleId: form.values.vehicleId,
        gpsId: form.values.gpsId,
        server: form.values.server,
        installationEngineer: form.values.installationEngineer,
        user_false: form.values.user_false,
        reason: form.values.reason,
        repair_replacement_by_user_id: user?.id,
        repair_replacement_date: form.values.repair_replacement_date,
        isRepair: true,
      };
      formData.append("data", JSON.stringify(repairData));
      console.log(repairData);

      RepairMutate(formData, {
        onSuccess: () => onClose(),
      });
    }
  };

  useEffect(() => {
    if (id && installedObject) {
      const data = installedObject.items;
      const transformedPeripheral = data?.device[0]?.peripheral?.map(
        (p: any) => ({
          id: p.id,
          sensor_type_id: String(p.sensor_type_id) || "",
          qty: String(p.qty) || "",
          detail: p.peripheralDetail.map((d: any) => ({
            brand_id: String(d.brand_id) || "",
            model_id: String(d.model_id) || "",
            serial_no: d.serial_no || "",
            warranty_plan_id: String(d.warranty_plan_id) || "",
          })),
        })
      );

      const transformedAccessory = data?.device[0]?.accessory?.map(
        (acc: any) => ({
          id: acc.id,
          type_id: String(acc.type_id),
          qty: String(acc.qty),
        })
      );

      const transformedInstallEng =
        data?.device[0]?.server[0]?.installation_engineer?.map((eng: any) => ({
          id: eng.id,
          user_id: String(eng.user_id),
        }));

      form.setValues({
        vehicleId: data.id,

        gpsId: data?.device[0]?.id,
        gpsBrand: String(data?.device[0]?.brand_id),
        gpsModel: String(data?.device[0]?.model_id),
        imei: data?.device[0]?.imei,
        gpsSerial: data?.device[0]?.serial_no,
        warranty: String(data?.device[0]?.warranty_plan_id),
        operators: data?.device[0]?.simcard,
        peripheral: transformedPeripheral,
        accessory: transformedAccessory,
        server: {
          id: data?.device[0]?.server[0].id,
        },
        installationEngineer: transformedInstallEng,
      });
    }
  }, [id, installedObject]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <Text size="xl" fw={700} c={"dark"}>
            Repair/Replacement
          </Text>
        }
        centered={false}
        size={"lg"}
      >
        <Box p={"lg"}>
          <Group py={"md"}>
            <Checkbox
              label="Repair"
              size="sm"
              radius={"sm"}
              checked={selectedRepairType === "Repair"}
              onChange={() => setSelectedRepairType("Repair")}
              color={theme.colors.purple[1]}
            />
            <Checkbox
              label="Replacement"
              size="sm"
              radius={"sm"}
              checked={selectedRepairType === "Replacement"}
              onChange={() => setSelectedRepairType("Replacement")}
              color={theme.colors.purple[1]}
            />
            <Checkbox
              label="Vehicle Change"
              size="sm"
              radius={"sm"}
              checked={selectedRepairType === "VehicleChange"}
              onChange={() => setSelectedRepairType("VehicleChange")}
              color={theme.colors.purple[1]}
            />
          </Group>
        </Box>

        {selectedRepairType !== "VehicleChange" ? (
          <Box p={"lg"}>
            <DateInput
              leftSection={<IconCalendarWeek size={18} />}
              label="Replacement Date"
              withAsterisk
              {...form.getInputProps("repair_replacement_date")}
            />

            <MultiSelect
              py={"sm"}
              label="Engineer"
              withAsterisk
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                installationEngineerData?.data?.data?.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
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
                    onClick={openInstallEng}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />

            {selectedRepairType == "Replacement" ? (
              <>
                <MultiSelect
                  label="Replacement Type"
                  withAsterisk
                  searchable
                  comboboxProps={{
                    offset: 0,
                  }}
                  value={selectedReplacementType}
                  data={[
                    { label: "GPS Device", value: "GPS_Device" },
                    { label: "SIM Card", value: "SIM" },
                    { label: "Peripheral", value: "Peripheral" },
                    { label: "Accessories", value: "Accessories" },
                  ]}
                  onChange={(value) => setSelectedReplacementType(value)}
                />

                {selectedReplacementType?.includes("GPS_Device") && (
                  <>
                    <Text fw={"bold"} mt={"md"}>
                      GPS Device
                    </Text>
                    <GPSInfoForm form={form} isRowtable />
                  </>
                )}
                {selectedReplacementType?.includes("SIM") && (
                  <>
                    <Text fw={"bold"} mt={"md"}>
                      SIM Card
                    </Text>
                    <SimCardInfoForm form={form} isRowtable />
                  </>
                )}
                {selectedReplacementType?.includes("Peripheral") && (
                  <>
                    <Text fw={"bold"} mt={"md"}>
                      Peripheral
                    </Text>
                    <PeripheralInfoForm form={form} isRowtable />
                  </>
                )}
                {selectedReplacementType?.includes("Accessories") && (
                  <>
                    <Text fw={"bold"} mt={"md"}>
                      Accessories
                    </Text>
                    <AccessoryInfoForm form={form} isRowtable />
                  </>
                )}
              </>
            ) : (
              <>
                <Text mt="md">
                  User Fault <span style={{ color: "red" }}>*</span>
                </Text>
                <Radio.Group
                  {...form.getInputProps("user_false")}
                  name="user_false"
                >
                  <Group mt="xs">
                    <Radio
                      value="Yes"
                      label="Yes"
                      size="sm"
                      color={theme.colors.purple[1]}
                    />
                    <Radio
                      value="No"
                      label="No"
                      size="sm"
                      color={theme.colors.purple[1]}
                    />
                  </Group>
                </Radio.Group>
              </>
            )}
            <TextInput
              label="Repair Reason"
              withAsterisk
              {...form.getInputProps("reason")}
            />
            <ImageDropZone
              setFieldValue={form.setFieldValue}
              data={form.values.installImage}
              isEditMode={false}
            />
          </Box>
        ) : (
          <Box p={"lg"}>
            <VehicleInfoForm form={vehicleForm} isRowtable />
          </Box>
        )}

        <Divider />
        <Group m="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" color="gray">
            Close
          </Button>
          <Button
            radius={"lg"}
            size="sm"
            loading={isPending || isRepaiLoading}
            type="submit"
            color={theme.colors.purple[1]}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Group>
      </Modal>

      <AddItemModal
        title="Installation Engineer"
        opened={openedInstallEng}
        close={closeInstallEng}
        mutationFn={createInstallationEngineer}
        updateMutationFn={updateInstallationEngineer}
        deleteMutationFn={deleteInstallationEngineer}
        dataList={installationEngineerData?.data?.data}
      />
    </>
  );
};

export default RepairReplacement;
