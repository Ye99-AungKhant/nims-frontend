import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import "../../../assets/styles/ultis.css";
import dayjs from "dayjs";
import { useGetGPSReplacementHistory } from "../../../hooks/repairReplacement/useGetGPSReplacementHistory";
import { useGetSIMCardReplacementHistory } from "../../../hooks/repairReplacement/useGetSIMCardReplacementHistory";
import { useGetPeripheralReplacementHistory } from "../../../hooks/repairReplacement/useGetPeripheralReplacementHistory";
import { useGetAccessoryReplacementHistory } from "../../../hooks/repairReplacement/useGetAccessoryReplacementHistory";
import { useGetFulltHistory } from "../../../hooks/repairReplacement/useGetFullHistory";
import { IconCalendarWeek, IconEdit, IconTrash } from "@tabler/icons-react";
import { useDeleteReplacement } from "../../../hooks/repairReplacement/useDeleteReplacement";
import GPSInfoForm from "./GPSInfoForm";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { useUpdateGPSReplacement } from "../../../hooks/repairReplacement/useUpdateGPSReplacement";
import PeripheralInfoForm from "./PeripheralInfoForm";
import { useUpdatePeripheralReplacement } from "../../../hooks/repairReplacement/useUpdatePeripheralReplacement";
import SimCardInfoForm from "./SimCardInfoForm";
import { useUpdateSimCardReplacement } from "../../../hooks/repairReplacement/useUpdateSimCardReplacement";
import AccessoryInfoForm from "./AccessoryInfoForm";
import { useUpdateAccessoryReplacement } from "../../../hooks/repairReplacement/useUpdateAccessoryReplacement";
import { useGetVehicleActivity } from "../../../hooks/useGetVehicleActivity";

export const clientData = (data: any) => [
  { label: "Company", field: data.name },
  { label: "Primary Contact", field: data.contact_person[0]?.name },
  { label: "Designation", field: data.contact_person[0]?.role?.name },
  { label: "Email", field: data.contact_person[0]?.email },
  { label: "Phone", field: data.contact_person[0]?.phone },
  { label: "Postal", field: data?.postal },
  { label: "City", field: data?.city },
  { label: "State", field: data?.state },
  { label: "Full Address", field: data?.address },
];

export const ContactPersonData = ({ data }: any) => {
  return (
    <Table striped highlightOnHover withRowBorders>
      <Table.Thead h={50}>
        <Table.Tr>
          <Table.Th style={{ color: "#474747" }}>Name</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Phone</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Email</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Designation</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length ? (
          data.map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td style={{ color: "#474747" }}>{item.name}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>
                {item.role?.name}
              </Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.email}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.phone}</Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Center py={"md"}>
                <Text color="dimmed">NO DATA FOUND!!!</Text>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export const VehicleData = ({ vehicleId }: any) => {
  const { data: vehicleActivity, isLoading } = useGetVehicleActivity(vehicleId);

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withRowBorders mb={"md"}>
          <Table.Thead h={50}>
            <Table.Tr>
              <Table.Th style={{ color: "#474747" }}>Type</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Brand</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Model</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Year</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Plate No.</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Odometer</Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Change Date
              </Table.Th>
              <Table.Th style={{ color: "#474747" }}>Reason</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!isLoading ? (
              vehicleActivity?.data?.map((item: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.type?.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.brand?.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.model?.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>{item.year}</Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.plate_number}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.odometer ?? "---"}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.changed_date
                      ? dayjs(item.changed_date).format("DD-MM-YYYY")
                      : vehicleActivity?.data[index - 1]?.changed_date
                      ? dayjs(
                          vehicleActivity?.data[index - 1]?.changed_date
                        ).format("DD-MM-YYYY")
                      : "---"}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#474747",
                    }}
                    maw={300}
                  >
                    <Tooltip
                      label={item.reason}
                      maw={400}
                      position="top-start"
                      withArrow
                      multiline
                      arrowOffset={30}
                      arrowSize={6}
                    >
                      <Text truncate="end">{item.reason ?? "---"}</Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: `${
                          item?.status ? "#239e57" : "#474747"
                        }`,
                        color: "white",
                        padding: "3px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {item?.status ? item.status : "Changed"}
                    </span>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={9}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export const GPSDeviceData = ({ data }: any) => {
  const { data: gpsReplacementHistory, isLoading } =
    useGetGPSReplacementHistory(data.id);
  const theme = useMantineTheme();
  const { mutate, isPending } = useDeleteReplacement();
  const { mutate: UpdateMutate, isPending: isUpdating } =
    useUpdateGPSReplacement();
  const [opened, { open, close }] = useDisclosure(false);

  const gspList = gpsReplacementHistory?.data?.data;

  const form = useForm<any>({
    initialValues: {
      id: "",
      gpsId: "",
      gpsBrand: "",
      gpsModel: "",
      imei: "",
      gpsSerial: "",
      warranty: "",
      reason: "",
      repair_replacement_date: "",
    },
  });

  const handleEdit = (replacementData: any) => {
    console.log(replacementData);

    form.setValues({
      id: replacementData.id,
      gpsId: replacementData.replacement_gps.id,
      gpsBrand: String(replacementData.replacement_gps.brand.id),
      gpsModel: String(replacementData.replacement_gps.model.id),
      imei: replacementData.replacement_gps.imei,
      gpsSerial: replacementData.replacement_gps.serial_no,
      warranty: String(replacementData.replacement_gps.warranty_plan.id),
      reason: replacementData.reason,
      repair_replacement_date: new Date(
        replacementData?.repair_replacement_date
      ),
    });
    open();
  };

  const handleSubmit = () => {
    UpdateMutate(form.values, {
      onSuccess: () => close(),
    });
  };

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withRowBorders mb={"md"}>
          <Table.Thead h={50}>
            <Table.Tr>
              <Table.Th style={{ color: "#474747" }}>Brand</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Model</Table.Th>
              <Table.Th style={{ color: "#474747" }}>IMEI/UID</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Serial No.</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Warranty</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Status</Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Replacement Date
              </Table.Th>
              <Table.Th style={{ color: "#474747" }}>Reason</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!isLoading ? (
              <>
                <Table.Tr>
                  <Table.Td style={{ color: "#474747" }}>
                    {gspList.brand.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {gspList.model.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {gspList.imei}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {gspList.serial_no}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {gspList.warranty_plan.name}
                  </Table.Td>
                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: `${
                          gspList.status === "Active" ? "#239e57" : "#474747"
                        }`,
                        color: "white",
                        padding: "3px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {gspList.status}
                    </span>
                  </Table.Td>
                </Table.Tr>
                {gspList.extra_gps_device.length > 0 &&
                  gspList.extra_gps_device.map((extraGps: any) => (
                    <Table.Tr>
                      <Table.Td style={{ color: "#474747" }}>
                        {extraGps.brand.name}
                      </Table.Td>
                      <Table.Td style={{ color: "#474747" }}>
                        {extraGps.model.name}
                      </Table.Td>
                      <Table.Td style={{ color: "#474747" }}>
                        {extraGps.imei}
                      </Table.Td>
                      <Table.Td style={{ color: "#474747" }}>
                        {extraGps.serial_no}
                      </Table.Td>
                      <Table.Td style={{ color: "#474747" }}>
                        {extraGps.warranty_plan.name}
                      </Table.Td>
                      <Table.Td>
                        <span
                          style={{
                            backgroundColor: "#474747",
                            color: "white",
                            padding: "3px 5px",
                            borderRadius: 20,
                          }}
                        >
                          Extra
                        </span>
                      </Table.Td>
                    </Table.Tr>
                  ))}

                {gspList.replacements.length != 0 &&
                  gspList.replacements.map(
                    (replacedList: any) =>
                      replacedList?.replacement_gps != null && (
                        <Table.Tr key={replacedList.id}>
                          <Table.Td style={{ color: "#474747" }}>
                            {replacedList?.replacement_gps?.brand?.name}
                          </Table.Td>
                          <Table.Td style={{ color: "#474747" }}>
                            {replacedList?.replacement_gps?.model?.name}
                          </Table.Td>
                          <Table.Td style={{ color: "#474747" }}>
                            {replacedList?.replacement_gps?.imei}
                          </Table.Td>
                          <Table.Td style={{ color: "#474747" }}>
                            {replacedList?.replacement_gps?.serial_no}
                          </Table.Td>
                          <Table.Td style={{ color: "#474747" }}>
                            {replacedList?.replacement_gps?.warranty_plan?.name}
                          </Table.Td>
                          <Table.Td>
                            <span
                              style={{
                                backgroundColor: `${
                                  replacedList?.replacement_gps?.status ===
                                  "Active"
                                    ? "#239e57"
                                    : "#474747"
                                }`,
                                color: "white",
                                padding: "1px 5px",
                                borderRadius: 20,
                              }}
                            >
                              {replacedList?.replacement_gps?.status}
                            </span>
                          </Table.Td>
                          <Table.Td style={{ color: "#474747" }}>
                            {dayjs(
                              replacedList?.repair_replacement_date
                            ).format("DD-MM-YYYY")}
                          </Table.Td>
                          <Table.Td
                            style={{
                              color: "#474747",
                            }}
                            maw={300}
                          >
                            <Tooltip
                              label={replacedList?.reason}
                              maw={400}
                              position="top-start"
                              withArrow
                              multiline
                              arrowOffset={30}
                              arrowSize={6}
                            >
                              <Text truncate="end">{replacedList?.reason}</Text>
                            </Tooltip>
                          </Table.Td>
                          <Table.Td>
                            <Group wrap="nowrap" gap={5}>
                              <ActionIcon
                                color={theme.colors.chocolate[1]}
                                radius="lg"
                                variant="outline"
                                onClick={() => mutate(replacedList.id)}
                              >
                                <IconTrash size={18} />
                              </ActionIcon>

                              <ActionIcon
                                color={theme.colors.chocolate[1]}
                                radius="lg"
                                variant="outline"
                                onClick={() => handleEdit(replacedList)}
                              >
                                <IconEdit size={18} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      )
                  )}
              </>
            ) : (
              <Table.Tr>
                <Table.Td colSpan={9}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={opened}
        onClose={close}
        title={"Edit GPS Device Replacement"}
      >
        <Box p={"lg"}>
          <GPSInfoForm form={form} isRowtable />
          <TextInput label={"Reason"} {...form.getInputProps("reason")} />
          <DateInput
            my={"md"}
            withAsterisk
            leftSection={<IconCalendarWeek size={18} />}
            label="Replacement Date"
            {...form.getInputProps("repair_replacement_date")}
          />
        </Box>
        <Divider />
        <Group m="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" color="gray">
            Close
          </Button>
          <Button
            radius={"lg"}
            size="sm"
            loading={isUpdating}
            type="submit"
            color={theme.colors.purple[1]}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export const SimCardData = ({ gpsDeviceId }: any) => {
  const { data: singleSIMCardReplacementHistory, isLoading } =
    useGetSIMCardReplacementHistory(gpsDeviceId);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useDeleteReplacement();
  const { mutate: UpdateMutate, isPending: isUpdating } =
    useUpdateSimCardReplacement();

  const form = useForm<any>({
    initialValues: {
      replacementId: "",
      replacement_component_id: "",
      operators: [{ operator: "", phone_no: "" }],
      reason: "",
      repair_replacement_date: "",
    },
  });

  const handleEdit = (replacementData: any) => {
    form.setValues({
      replacementId: replacementData.replacement_id,
      replacement_component_id: replacementData.replacement_component_id,
      operators: [
        {
          id: replacementData.id,
          operator: replacementData.operator,
          phone_no: replacementData.phone_no,
        },
      ],
      reason: replacementData.replacement_reason || "",
      repair_replacement_date: new Date(replacementData.replacement_date),
    });
    console.log(replacementData);

    open();
  };

  const handleSubmit = () => {
    UpdateMutate(form.values, {
      onSuccess: () => close(),
    });
  };

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withRowBorders mb={"md"}>
          <Table.Thead h={50}>
            <Table.Tr>
              <Table.Th style={{ color: "#474747" }}>Operator</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Phone No.</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Status</Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Replacement Date
              </Table.Th>
              <Table.Th style={{ color: "#474747" }}>Reason</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!isLoading ? (
              singleSIMCardReplacementHistory?.map((simData: any) => (
                <Table.Tr key={simData.id}>
                  <Table.Td style={{ color: "#474747" }}>
                    {simData.operator}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {simData.phone_no}
                  </Table.Td>
                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: `${
                          simData.status === "Active" ? "#239e57" : "#474747"
                        }`,
                        color: "white",
                        padding: "3px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {simData.status}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {dayjs(simData?.replacement_date).format("DD-MM-YYYY")}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#474747",
                    }}
                    maw={300}
                  >
                    <Tooltip
                      label={simData?.replacement_reason}
                      maw={400}
                      position="top-start"
                      withArrow
                      multiline
                      arrowOffset={30}
                      arrowSize={6}
                    >
                      <Text truncate="end">{simData?.replacement_reason}</Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>
                    {simData?.replacement_id && (
                      <Group wrap="nowrap" gap={5}>
                        <ActionIcon
                          color={theme.colors.chocolate[1]}
                          radius="lg"
                          variant="outline"
                          onClick={() => mutate(simData?.replacement_id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>

                        <ActionIcon
                          color={theme.colors.chocolate[1]}
                          radius="lg"
                          variant="outline"
                          onClick={() => handleEdit(simData)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                      </Group>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={opened}
        onClose={close}
        title={"Edit Sim Card Replacement"}
      >
        <Box p={"lg"}>
          <SimCardInfoForm form={form} isRowtable disableDual={true} />
          <TextInput label={"Reason"} {...form.getInputProps("reason")} />
          <DateInput
            my={"md"}
            withAsterisk
            leftSection={<IconCalendarWeek size={18} />}
            label="Replacement Date"
            {...form.getInputProps("repair_replacement_date")}
          />
        </Box>
        <Divider />
        <Group m="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" color="gray">
            Close
          </Button>
          <Button
            radius={"lg"}
            size="sm"
            loading={isUpdating}
            type="submit"
            color={theme.colors.purple[1]}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export const PeripheralData = ({ gpsDeviceId }: any) => {
  const { data: peripheralReplacementHistoryData, isLoading } =
    useGetPeripheralReplacementHistory(gpsDeviceId);
  const { mutate, isPending } = useDeleteReplacement();
  const { mutate: UpdateMutate, isPending: isUpdating } =
    useUpdatePeripheralReplacement();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<any>({
    initialValues: {
      replacementId: "",
      peripheral: [
        {
          sensor_type_id: "",
          qty: "",
          detail: [
            {
              id: "",
              brand_id: "",
              model_id: "",
              serial_no: "",
              warranty_plan_id: "",
            },
          ],
        },
      ],
      reason: "",
      repair_replacement_date: "",
    },
  });

  const handleEdit = (replacementData: any) => {
    const transformedPeripheral = replacementData.peripheralDetail.map(
      (d: any) => ({
        id: d.id,
        brand_id: String(d.brand_id) || "",
        model_id: String(d.model_id) || "",
        serial_no: d.serial_no || "",
        warranty_plan_id: String(d.warranty_plan_id) || "",
      })
    );

    form.setValues({
      replacementId: replacementData.replacement_id,
      replacement_component_id: replacementData.replacement_component_id,

      peripheral: [
        {
          id: replacementData.id,
          sensor_type_id: String(replacementData.type.id) || "",
          qty: String(replacementData.qty),
          detail: transformedPeripheral,
        },
      ],
      reason: replacementData.replacement_reason || "",
      repair_replacement_date: new Date(replacementData.replacement_date),
    });
    open();
  };

  const handleSubmit = () => {
    UpdateMutate(form.values, {
      onSuccess: () => close(),
    });
  };

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withRowBorders mb={"md"}>
          <Table.Thead h={50}>
            <Table.Tr>
              <Table.Th style={{ color: "#474747" }}>Type</Table.Th>
              <Table.Th style={{ color: "#474747" }}>QTY</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Brand</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Model</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Serial No.</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Warranty</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Status</Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Replacement Date
              </Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Installed Date
              </Table.Th>
              <Table.Th style={{ color: "#474747" }}>Reason</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!isLoading ? (
              peripheralReplacementHistoryData.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.type?.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>{item.qty}</Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.peripheralDetail.map((peri: any) => (
                      <span key={`detail-brand-${peri.id}`}>
                        {peri.brand.name}
                        <br />
                      </span>
                    ))}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.peripheralDetail.map((peri: any) => (
                      <span key={`detail-model-${peri.id}`}>
                        {peri.model.name}
                        <br />
                      </span>
                    ))}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.peripheralDetail.map((peri: any) => (
                      <span key={`detail-serial-${peri.id}`}>
                        {peri.serial_no}
                        <br />
                      </span>
                    ))}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.peripheralDetail.map((peri: any) => (
                      <span key={`detail-plan-${peri.id}`}>
                        {peri.warranty_plan.name}
                        <br />
                      </span>
                    ))}
                  </Table.Td>

                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: `${
                          item.status === "Active" ? "#239e57" : "#474747"
                        }`,
                        color: "white",
                        padding: "3px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {item.status}
                    </span>
                  </Table.Td>

                  <Table.Td style={{ color: "#474747" }}>
                    {item?.replacement_date
                      ? dayjs(item?.replacement_date).format("DD-MM-YYYY")
                      : "---"}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.installed_date
                      ? dayjs(item?.installed_date).format("DD-MM-YYYY")
                      : "---"}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#474747",
                    }}
                    maw={300}
                  >
                    <Tooltip
                      label={item?.replacement_reason}
                      maw={400}
                      position="top-start"
                      withArrow
                      multiline
                      arrowOffset={30}
                      arrowSize={6}
                    >
                      <Text truncate="end">{item?.replacement_reason}</Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>
                    {item?.replacement_id ? (
                      <Group wrap="nowrap" gap={5}>
                        <ActionIcon
                          color={theme.colors.chocolate[1]}
                          radius="lg"
                          variant="outline"
                          onClick={() => mutate(item?.replacement_id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>

                        <ActionIcon
                          color={theme.colors.chocolate[1]}
                          radius="lg"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                      </Group>
                    ) : (
                      <></>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={10}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={opened}
        onClose={close}
        title={"Edit Peripheral Replacement"}
      >
        <Box p={"lg"}>
          <PeripheralInfoForm form={form} isRowtable disableQty={true} />
          <TextInput label={"Reason"} {...form.getInputProps("reason")} />
          <DateInput
            my={"md"}
            withAsterisk
            leftSection={<IconCalendarWeek size={18} />}
            label="Replacement Date"
            {...form.getInputProps("repair_replacement_date")}
          />
        </Box>
        <Divider />
        <Group m="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" color="gray">
            Close
          </Button>
          <Button
            radius={"lg"}
            size="sm"
            loading={isUpdating}
            type="submit"
            color={theme.colors.purple[1]}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export const ServerData = ({ data }: any) => {
  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withRowBorders horizontalSpacing="lg">
        <Table.Thead h={50}>
          <Table.Tr>
            {[
              "Type",
              "Domain",
              "Object Base Fee",
              "Invoice No.",
              "Status",
              "Installed Date",
              "Renewal Date",
              "Expire Date ",
              "Subscription Plan",
            ].map((header) => (
              <Table.Th
                key={header}
                style={{
                  color: "#474747",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data ? (
            <>
              {/* List of server_activity rows */}
              {data.server_activity?.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.type.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.domain.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.object_base_fee}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.invoice_no}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    <span
                      style={{
                        backgroundColor:
                          item.status === "Active"
                            ? "#239e57"
                            : item.status === "ExpireSoon"
                            ? "#cea836"
                            : "#EC1F24",
                        color: "white",
                        padding: "1px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {item.status}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {dayjs(item.installed_date).format("DD-MM-YYYY")}
                  </Table.Td>
                  <Table.Td>
                    {item.renewal_date ? (
                      <span
                        style={{
                          backgroundColor: "#239e57",
                          color: "white",
                          padding: "0px 5px",
                          borderRadius: 20,
                          fontSize: 12,
                        }}
                      >
                        {dayjs(item.renewal_date).format("DD-MM-YYYY")}
                      </span>
                    ) : (
                      <Text ta="center">---</Text>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: "#474747",
                        color: "white",
                        padding: "0px 5px",
                        borderRadius: 20,
                        fontSize: 12,
                      }}
                    >
                      {dayjs(item.expire_date).format("DD-MM-YYYY")}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.warranty_plan.name}
                  </Table.Td>
                </Table.Tr>
              ))}

              {/* Single fallback row (summary row or current item) */}
              <Table.Tr>
                <Table.Td style={{ color: "#474747" }}>
                  {data.type.name}
                </Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  {data.domain.name}
                </Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  {data.object_base_fee}
                </Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  {data.invoice_no}
                </Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  <span
                    style={{
                      backgroundColor:
                        data.status === "Active"
                          ? "#239e57"
                          : data.status === "ExpireSoon"
                          ? "#cea836"
                          : "#EC1F24",
                      color: "white",
                      padding: "1px 5px",
                      borderRadius: 20,
                    }}
                  >
                    {data.status}
                  </span>
                </Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  {dayjs(data.installed_date).format("DD-MM-YYYY")}
                </Table.Td>
                <Table.Td>
                  {data.renewal_date ? (
                    <span
                      style={{
                        backgroundColor: "#239e57",
                        color: "white",
                        padding: "0px 5px",
                        borderRadius: 20,
                        fontSize: 12,
                      }}
                    >
                      {dayjs(data.renewal_date).format("DD-MM-YYYY")}
                    </span>
                  ) : (
                    <Text ta="center">---</Text>
                  )}
                </Table.Td>
                <Table.Td>
                  <span
                    style={{
                      backgroundColor: "#474747",
                      color: "white",
                      padding: "0px 5px",
                      borderRadius: 20,
                      fontSize: 12,
                    }}
                  >
                    {dayjs(data.expire_date).format("DD-MM-YYYY")}
                  </span>
                </Table.Td>
                <Table.Td style={{ color: "#474747" }}>
                  {data.warranty_plan.name}
                </Table.Td>
              </Table.Tr>
              {data.extra_server?.map((extraServer: any) => (
                <Table.Tr>
                  <Table.Td style={{ color: "#474747" }}>
                    {extraServer.type.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {extraServer.domain.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {data.object_base_fee}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {data.invoice_no}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    <span
                      style={{
                        backgroundColor:
                          data.status === "Active"
                            ? "#239e57"
                            : data.status === "ExpireSoon"
                            ? "#cea836"
                            : "#EC1F24",
                        color: "white",
                        padding: "1px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {data.status}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {dayjs(data.installed_date).format("DD-MM-YYYY")}
                  </Table.Td>
                  <Table.Td>
                    {data.renewal_date ? (
                      <span
                        style={{
                          backgroundColor: "#239e57",
                          color: "white",
                          padding: "0px 5px",
                          borderRadius: 20,
                          fontSize: 12,
                        }}
                      >
                        {dayjs(data.renewal_date).format("DD-MM-YYYY")}
                      </span>
                    ) : (
                      <Text ta="center">---</Text>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: "#474747",
                        color: "white",
                        padding: "0px 5px",
                        borderRadius: 20,
                        fontSize: 12,
                      }}
                    >
                      {dayjs(data.expire_date).format("DD-MM-YYYY")}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {data.warranty_plan.name}
                  </Table.Td>
                </Table.Tr>
              ))}
            </>
          ) : (
            <Table.Tr>
              <Table.Td colSpan={9}>
                <Center py="md">
                  <Text color="dimmed">NO DATA FOUND!!!</Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export const AccessoryData = ({ gpsDeviceId }: any) => {
  const { data: accessoryReplacementHistoryData, isLoading } =
    useGetAccessoryReplacementHistory(gpsDeviceId);
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending } = useDeleteReplacement();
  const { mutate: UpdateMutate, isPending: isUpdating } =
    useUpdateAccessoryReplacement();
  const theme = useMantineTheme();

  const form = useForm<any>({
    initialValues: {
      replacement_component_id: "",
      accessory: [{ type_id: "", qty: "" }],
      reason: "",
      repair_replacement_date: "",
    },
  });

  const handleEdit = (replacementData: any) => {
    form.setValues({
      replacementId: replacementData.replacement_id,
      replacement_component_id: replacementData.replacement_component_id,
      accessory: [
        {
          id: replacementData.id,
          type_id: String(replacementData.type_id),
          qty: replacementData.qty,
        },
      ],
      reason: replacementData.replacement_reason || "",
      repair_replacement_date: new Date(replacementData.replacement_date),
    });
    open();
  };

  const handleSubmit = () => {
    UpdateMutate(form.values, {
      onSuccess: () => close(),
    });
  };

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withRowBorders mb={"md"}>
          <Table.Thead h={50}>
            <Table.Tr>
              <Table.Th style={{ color: "#474747" }}>Type</Table.Th>
              <Table.Th style={{ color: "#474747" }}>QTY</Table.Th>
              <Table.Th style={{ color: "#474747" }}>Status</Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Replacement Date
              </Table.Th>
              <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
                Installed Date
              </Table.Th>
              <Table.Th style={{ color: "#474747" }}>Reason</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!isLoading ? (
              accessoryReplacementHistoryData?.map((item: any) => (
                <Table.Tr key={item?.id}>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.type?.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>{item?.qty}</Table.Td>
                  <Table.Td>
                    <span
                      style={{
                        backgroundColor: `${
                          item?.status === "Active" ? "#239e57" : "#474747"
                        }`,
                        color: "white",
                        padding: "3px 5px",
                        borderRadius: 20,
                      }}
                    >
                      {item?.status}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.replacement_date
                      ? dayjs(item?.replacement_date).format("DD-MM-YYYY")
                      : "---"}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.installed_date
                      ? dayjs(item?.installed_date).format("DD-MM-YYYY")
                      : "---"}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#474747",
                    }}
                    maw={300}
                  >
                    <Tooltip
                      label={item?.replacement_reason}
                      maw={400}
                      position="top-start"
                      withArrow
                      multiline
                      arrowOffset={30}
                      arrowSize={6}
                    >
                      <Text truncate="end">{item?.replacement_reason}</Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td>
                    {item?.replacement_id ? (
                      <Group wrap="nowrap" gap={5}>
                        <ActionIcon
                          color={theme.colors.chocolate[1]}
                          radius="lg"
                          variant="outline"
                          onClick={() => mutate(item?.replacement_id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>

                        <ActionIcon
                          color={theme.colors.chocolate[1]}
                          radius="lg"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                      </Group>
                    ) : (
                      <></>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={opened}
        onClose={close}
        title={"Edit Sim Card Replacement"}
      >
        <Box p={"lg"}>
          <AccessoryInfoForm form={form} isRowtable />
          <TextInput label={"Reason"} {...form.getInputProps("reason")} />
          <DateInput
            my={"md"}
            withAsterisk
            leftSection={<IconCalendarWeek size={18} />}
            label="Replacement Date"
            {...form.getInputProps("repair_replacement_date")}
          />
        </Box>
        <Divider />
        <Group m="md" gap="md" justify="right">
          <Button radius={"lg"} size="sm" color="gray">
            Close
          </Button>
          <Button
            radius={"lg"}
            size="sm"
            loading={isUpdating}
            type="submit"
            color={theme.colors.purple[1]}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export const HistoryData = ({ gpsDeviceId }: any) => {
  const { data: fullHistoryData, isLoading } = useGetFulltHistory(gpsDeviceId);
  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withRowBorders mb={"md"}>
        <Table.Thead h={50}>
          <Table.Tr>
            <Table.Th style={{ color: "#474747" }}>Status</Table.Th>
            <Table.Th style={{ color: "#474747" }}>Type</Table.Th>
            <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
              Repair/Replacement Date
            </Table.Th>
            <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
              User Fault
            </Table.Th>
            <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
              Invoice No.
            </Table.Th>
            <Table.Th style={{ color: "#474747", textWrap: "nowrap" }}>
              Engineer
            </Table.Th>
            <Table.Th style={{ color: "#474747" }}>Reason</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {!isLoading ? (
            <>
              {fullHistoryData.replacements.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td style={{ color: "#474747" }}>{item.type}</Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.replacement_device_type}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {dayjs(item?.repair_replacement_date).format("DD-MM-YYYY")}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.user_false ?? "---"}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.invoice_no ?? "---"}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747", textWrap: "nowrap" }}>
                    {item.install_engineer?.map((eng: any, index: number) => (
                      <span key={`eng-${index}`}>{eng.user?.name}, </span>
                    ))}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#474747",
                    }}
                    maw={300}
                  >
                    <Tooltip
                      label={item?.reason}
                      maw={400}
                      position="top-start"
                      withArrow
                      multiline
                      arrowOffset={30}
                      arrowSize={6}
                    >
                      <Text truncate="end">{item?.reason}</Text>
                    </Tooltip>
                  </Table.Td>
                </Table.Tr>
              ))}

              {fullHistoryData.vehicleChange.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td style={{ color: "#474747" }}>
                    Vehicle Changed
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item?.plate_number}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {dayjs(item?.changed_date).format("DD-MM-YYYY")}
                  </Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td style={{ color: "#474747" }}>
                    {item.invoice_no ?? "---"}
                  </Table.Td>
                  <Table.Td style={{ color: "#474747", textWrap: "nowrap" }}>
                    {item?.install_engineer?.map((eng: any, index: number) => (
                      <span key={`eng-${index}`}>{eng.user?.name}, </span>
                    ))}
                  </Table.Td>
                  <Table.Td
                    style={{
                      color: "#474747",
                    }}
                    maw={300}
                  >
                    <Tooltip
                      label={item?.reason}
                      maw={400}
                      position="top-start"
                      withArrow
                      multiline
                      arrowOffset={30}
                      arrowSize={6}
                    >
                      <Text truncate="end">{item?.reason}</Text>
                    </Tooltip>
                  </Table.Td>
                </Table.Tr>
              ))}
            </>
          ) : (
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Center py={"md"}>
                  <Text color="dimmed">NO DATA FOUND!!!</Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
