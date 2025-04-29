import {
  Box,
  Button,
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
  IconGitCompare,
  IconPaperclip,
  IconRouter,
  IconServer2,
  IconTruckFilled,
} from "@tabler/icons-react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const InstallationCreatePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("vehicleInfo");
  const [allowedTabs, setAllowedTabs] = useState(["vehicleInfo"]);
  const { mutate, isPending } = useCreateInstallObject();
  const theme = useMantineTheme();
  const navigate = useNavigate();

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
      console.log("fieldErrors", fieldErrors);

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

    if (
      newValues.peripheral.length === 1 &&
      newValues.peripheral[0].sensor_type_id === ""
    ) {
      newValues.peripheral = [];
    }

    mutate(newValues, {
      onSuccess: () => navigate("/installed"),
    });
  };

  return (
    <Box p={30}>
      <Paper shadow="sm" radius="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }} py="md" px={30}>
          <Group gap={0} h={36}>
            <IconCircleArrowDown size={24} />
            <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
              New Installation
            </Text>
          </Group>
        </Box>
        <Box px={"30px"} pt={"30px"}>
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
                Vehicle Info
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
                Server Info
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
              <PeripheralInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="accessoryInfo">
              <AccessoryInfoForm form={form} />
            </TabsPanel>
            <TabsPanel value="serverInfo">
              <ServerInfoForm form={form} />
            </TabsPanel>
          </Tabs>
        </Box>
        <Box style={{ borderTop: "1px solid #dddddd" }} p="md">
          <Group justify="center">
            <Button
              onClick={
                activeTab !== "serverInfo" ? handleContinue : handleSubmit
              }
              radius={"lg"}
              size="sm"
              bg={theme.colors.purple[1]}
              disabled={false}
              loading={isPending}
              fw={500}
            >
              {activeTab !== "serverInfo" ? "Continue" : "Save"}
            </Button>
          </Group>
        </Box>
      </Paper>
    </Box>
  );
};

export default InstallationCreatePage;
