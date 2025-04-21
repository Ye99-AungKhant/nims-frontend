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
  IconUserPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../../utils/types";
import VehicleInfoForm from "./components/VehicleInfoForm";
import GPSInfoForm from "./components/GPSInfoForm";
import SimCardInfoForm from "./components/SimCardInfoForm";
import PeripheralInfoForm from "./components/PeripheralInfoForm";
import ServerInfoForm from "./components/ServerInfoForm";

const InstallationCreatePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("vehicleInfo");
  const navigate = useNavigate();
  const theme = useMantineTheme();

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
      operator: { operator: "", phone_no: "" },
      operators: [{ operator: "", phone_no: "" }],
      peripheral: [
        {
          sensor_type_id: "",
          brand_id: "",
          model_id: "",
          serial_no: "",
          qty: "",
          warranty_plan_id: "",
          warranty_expiry_date: new Date(),
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
          <Tabs value={activeTab} onChange={setActiveTab}>
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
                value="contactPersons"
                leftSection={<IconPaperclip size={20} />}
                style={
                  activeTab === "contactPersons"
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
            <TabsPanel value="serverInfo">
              <ServerInfoForm form={form} />
            </TabsPanel>
          </Tabs>
        </Box>
        <Box style={{ borderTop: "1px solid #dddddd" }} p="md">
          <Group justify="center">
            <Button
              onClick={() => {}}
              radius={"lg"}
              size="sm"
              bg={theme.colors.purple[1]}
              disabled={false}
              loading={false}
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
