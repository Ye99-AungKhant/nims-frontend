import {
  Box,
  Paper,
  Tabs,
  TabsList,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstallationCreatePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("basicInfo");
  const navigate = useNavigate();
  const theme = useMantineTheme();
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
                value="basicInfo"
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "basicInfo"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Basic Info
              </Tabs.Tab>
              <Tabs.Tab
                value="address"
                leftSection={<IconUserPlus size={20} />}
                style={
                  activeTab === "address"
                    ? { color: theme.colors.purple[0] }
                    : { color: "" }
                }
              >
                Address
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
                Contact Persons
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
                Contact Persons
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
                Contact Persons
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
                Contact Persons
              </Tabs.Tab>
            </TabsList>
          </Tabs>
        </Box>
      </Paper>
    </Box>
  );
};

export default InstallationCreatePage;
