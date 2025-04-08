import {
  Box,
  Paper,
  Tabs,
  TabsList,
  TabsPanel,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../../utils/types";
import VehicleInfoForm from "./components/VehicleInfoForm";
import GPSInfoForm from "./components/GPSInfoForm";
import SimCardInfoForm from "./components/SimCardInfoForm";

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
    <Box px="md">
      <Paper shadow="sm" radius="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }} p="sm">
          <Text size="lg" fw={500}>
            {"New Installation"}
          </Text>
        </Box>
        <Box p={"md"}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabsList>
              <Tabs.Tab
                value="vehicleInfo"
                leftSection={<IconUserPlus size={20} />}
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
                leftSection={<IconUserPlus size={20} />}
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
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "simInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                SIM Card
              </Tabs.Tab>
              <Tabs.Tab
                value="contactPersons"
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "contactPersons"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Peripheral
              </Tabs.Tab>
              <Tabs.Tab
                value="contactPersons"
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "contactPersons"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Accessories
              </Tabs.Tab>
              <Tabs.Tab
                value="contactPersons"
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "contactPersons"
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
          </Tabs>
        </Box>
      </Paper>
    </Box>
  );
};

export default InstallationCreatePage;
