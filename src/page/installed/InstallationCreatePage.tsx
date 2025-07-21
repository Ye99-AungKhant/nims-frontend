import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Tabs,
  TabsList,
  TabsPanel,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCircleArrowDown,
  IconDeviceSim,
  IconDownload,
  IconGitCompare,
  IconPaperclip,
  IconRouter,
  IconServer2,
  IconTruckFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { FormValues } from "../../utils/types";
import VehicleInfoForm from "./components/VehicleInfoForm";
import GPSInfoForm from "./components/GPSInfoForm";
import SimCardInfoForm from "./components/SimCardInfoForm";
import PeripheralInfoForm from "./components/PeripheralInfoForm";
import ServerInfoForm from "./components/ServerInfoForm";
import AccessoryInfoForm from "./components/AccessoryInfoForm";
import {
  AccessorySchema,
  GpsSchema,
  InstallationEngineerSchema,
  OperatorSchema,
  PeripheralSchema,
  ServerSchema,
  VehicleSchema,
} from "./components/InstallValidation";
import { z } from "zod";
import { useCreateInstallObject } from "../../hooks/useCreatInstallObject";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetInstalledDetail } from "./hooks/useGetInstalled";
import { useUpdateInstalledObject } from "../../hooks/useUpdateInstalledObject";
import ImageInfo from "./components/ImageInfo";

const InstallationCreatePage = () => {
  const param = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("vehicleInfo");
  const [allowedTabs, setAllowedTabs] = useState(["vehicleInfo"]);
  const id = param?.state?.id;
  const { data: installedObject, isLoading } = useGetInstalledDetail(id);
  const { mutate, isPending } = useCreateInstallObject();
  const { mutate: updateObjectMutate, isPending: updateObjectIsLoading } =
    useUpdateInstalledObject();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  console.log("useParam", id);

  const form = useForm<FormValues>({
    initialValues: {
      client: "",
      vehicleType: "",
      vehicleBrand: "",
      vehicleModel: "",
      vehicleYear: "",
      vehiclePlateNo: "",
      vehicleOdometer: "",
      gpsBrand: "",
      gpsModel: "",
      imei: "",
      gpsSerial: "",
      warranty: "",
      extraGPS: [],
      operators: [{ operator: "", phone_no: "" }],
      peripheral: [
        {
          sensor_type_id: "",
          qty: "",
          installed_date: new Date(),
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
      accessory: [{ type_id: "", qty: "", installed_date: new Date() }],
      server: {
        type_id: "",
        domain: "",
        installed_date: new Date(),
        subscription_plan_id: "",
        expire_date: new Date(),
        invoice_no: "",
        object_base_fee: "",
      },
      installationEngineer: [{ user_id: "" }],
      installImage: [],
    },
  });

  const handleContinue = () => {
    let schema;

    if (activeTab === "vehicleInfo") {
      schema = VehicleSchema;
    } else if (activeTab === "gpsInfo") {
      schema = GpsSchema;
    } else if (activeTab === "simInfo") {
      schema = OperatorSchema;
    } else if (activeTab === "peripheralInfo") {
      schema = PeripheralSchema;
    } else if (activeTab === "accessoryInfo") {
      schema = AccessorySchema;
    } else if (activeTab === "serverInfo") {
      schema = z.object({
        server: ServerSchema,
        installationEngineer: InstallationEngineerSchema,
      });
    } else if (activeTab === "installImageInfo") {
    }

    if (!schema) return;

    const result = schema.safeParse(form.values);

    const fieldErrors: Record<string, string> = {};
    if (!result.success) {
      result.error.errors.forEach((error) => {
        const path = error.path.join(".");
        fieldErrors[path] = error.message;
      });

      form.setErrors(fieldErrors);
      return;
    }
    form.setErrors(fieldErrors);
    const tabOrder = [
      "vehicleInfo",
      "gpsInfo",
      "simInfo",
      "peripheralInfo",
      "accessoryInfo",
      "serverInfo",
      "installImageInfo",
    ];

    const currentIndex = tabOrder.indexOf(activeTab || "vehicleInfo");
    const nextTab = tabOrder[currentIndex + 1];

    if (nextTab) {
      // Grant access to next tab
      if (!allowedTabs.includes(nextTab)) {
        setAllowedTabs((prev) => [...prev, nextTab]);
      }
      setActiveTab(nextTab);
    }
  };

  const handleSubmit = () => {
    const newValues = { ...form.values };

    const formData = new FormData();

    // Append all installImage files (Blobs)
    form.values.installImage?.forEach((imgFile) => {
      console.log(imgFile);

      if (imgFile.file) {
        formData.append("installImage", imgFile.file, imgFile.file.name);
      }
    });

    if (
      newValues.peripheral.length === 1 &&
      newValues.peripheral[0].sensor_type_id === ""
    ) {
      newValues.peripheral = [];
    }

    formData.append("data", JSON.stringify(newValues));

    if (isEditMode) {
      updateObjectMutate(formData);
    } else {
      mutate(formData);
    }
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [id]);

  useEffect(() => {
    console.log("edit data", installedObject);
    if (id && installedObject) {
      const data = installedObject.items;
      const transformedActiveGPS = data?.device?.[data?.device?.length - 1];

      const transformedPeripheral = transformedActiveGPS?.peripheral?.map(
        (p: any) => ({
          id: p.id,
          sensor_type_id: String(p.sensor_type_id) || "",
          qty: String(p.qty) || "",
          installed_date: p.installed_date ? new Date(p.installed_date) : "",
          detail: p.peripheralDetail.map((d: any) => ({
            id: d.id,
            brand_id: String(d.brand_id) || "",
            model_id: String(d.model_id) || "",
            serial_no: d.serial_no || "",
            warranty_plan_id: String(d.warranty_plan_id) || "",
          })),
        })
      );

      const transformedAccessory = transformedActiveGPS?.accessory?.map(
        (acc: any) => ({
          id: acc.id,
          type_id: String(acc.type_id),
          qty: String(acc.qty),
          installed_date: acc.installed_date
            ? new Date(acc.installed_date)
            : "",
        })
      );

      const transformedInstallEng =
        data?.device[0]?.server[0]?.installation_engineer.map((eng: any) => ({
          id: eng.id,
          user_id: String(eng.user_id),
        }));

      form.setValues({
        client: String(data.client_id),
        vehicleId: data.id,
        vehicleType: String(data.type_id),
        vehicleBrand: String(data.brand_id),
        vehicleModel: String(data.model_id),
        vehicleYear: data.year ? String(data.year) : "",
        vehiclePlateNo: data.plate_number,
        vehicleOdometer: String(data?.odometer),
        gpsId: transformedActiveGPS?.id,
        gpsBrand: String(transformedActiveGPS?.brand_id),
        gpsModel: String(transformedActiveGPS?.model_id),
        imei: transformedActiveGPS?.imei,
        gpsSerial: transformedActiveGPS?.serial_no,
        warranty: String(transformedActiveGPS?.warranty_plan_id),
        operators: transformedActiveGPS?.simcard,
        peripheral: transformedPeripheral,
        accessory: transformedAccessory,
        server: {
          id: data?.device[0]?.server[0].id,
          type_id: String(data?.device[0]?.server[0].type_id),
          domain: [
            String(data?.device[0]?.server[0].domain_id),
            ...(data?.device[0]?.server[0]?.extra_server[0]?.domain_id != null
              ? [String(data?.device[0]?.server[0]?.extra_server[0]?.domain_id)]
              : []),
          ],
          installed_date:
            new Date(data?.device[0]?.server[0].installed_date) || new Date(),
          subscription_plan_id: String(
            data?.device[0]?.server[0].subscription_plan_id
          ),
          expire_date:
            new Date(data?.device[0]?.server[0].expire_date) || new Date(),
          invoice_no: data?.device[0]?.server[0].invoice_no,
          object_base_fee: String(data?.device[0]?.server[0].object_base_fee),
          extra_server_id: data?.device[0]?.server[0]?.extra_server[0]?.id,
        },
        installationEngineer: transformedInstallEng,
        installImage: data?.device[0]?.server[0].install_image,
      });
    }
  }, [id, isEditMode, isLoading]);

  return (
    <Box p={{ base: 8, sm: 30 }}>
      <Paper shadow="xs">
        <Box style={{ borderBottom: "1px solid #dddddd" }}>
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            py="md"
            px={{ base: 8, sm: 30 }}
            gap={8}
            wrap="wrap"
            style={{ flexWrap: "wrap" }}
          >
            <Flex align="center" gap={8} style={{ minWidth: 0 }}>
              <IconDownload size={22} />
              <Text size="lg" fw={600} c={"dark"}>
                {isEditMode ? "Edit" : "New"} Installation
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box p={{ base: 15, sm: 30 }}>
          <Tabs
            value={activeTab}
            onChange={(value) => {
              if (value && allowedTabs.includes(value)) {
                setActiveTab(value);
              }
            }}
          >
            <TabsList>
              <Tabs.Tab
                value="vehicleInfo"
                leftSection={<IconTruckFilled size={20} />}
                style={
                  activeTab === "vehicleInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Vehicle
              </Tabs.Tab>
              <Tabs.Tab
                value="gpsInfo"
                leftSection={<IconRouter size={20} />}
                style={
                  activeTab === "gpsInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                GPS Device
              </Tabs.Tab>
              <Tabs.Tab
                value="simInfo"
                leftSection={<IconDeviceSim size={20} />}
                style={
                  activeTab === "simInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                SIM Card
              </Tabs.Tab>
              <Tabs.Tab
                value="peripheralInfo"
                leftSection={<IconGitCompare size={20} />}
                style={
                  activeTab === "peripheralInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Peripheral
              </Tabs.Tab>
              <Tabs.Tab
                value="accessoryInfo"
                leftSection={<IconPaperclip size={20} />}
                style={
                  activeTab === "accessoryInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Accessories
              </Tabs.Tab>
              <Tabs.Tab
                value="serverInfo"
                leftSection={<IconServer2 size={20} />}
                style={
                  activeTab === "serverInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Server
              </Tabs.Tab>
              <Tabs.Tab
                value="installImageInfo"
                leftSection={<IconServer2 size={20} />}
                style={
                  activeTab === "installImageInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Photos
              </Tabs.Tab>
            </TabsList>

            <TabsPanel value="vehicleInfo">
              <VehicleInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="gpsInfo">
              <GPSInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="simInfo">
              <SimCardInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="peripheralInfo">
              <PeripheralInfoForm form={form} isEditMode={true} />
            </TabsPanel>
            <TabsPanel value="accessoryInfo">
              <AccessoryInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="serverInfo">
              <ServerInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="installImageInfo">
              <ImageInfo form={form} isEditMode={isEditMode} />
            </TabsPanel>
          </Tabs>
        </Box>
        <Box style={{ borderTop: "1px solid #dddddd" }} p="md">
          <Group justify="center">
            <Button
              onClick={
                activeTab !== "installImageInfo" ? handleContinue : handleSubmit
              }
              radius={"lg"}
              size="sm"
              bg={theme.colors.purple[1]}
              disabled={false}
              loading={isPending || updateObjectIsLoading}
              fw={500}
            >
              {activeTab !== "installImageInfo" ? "Continue" : "Save"}
            </Button>
          </Group>
        </Box>
      </Paper>
    </Box>
  );
};

export default InstallationCreatePage;
