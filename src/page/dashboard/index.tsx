import useUserStore from "../../store/useUserStore";

import {
  Grid,
  Card,
  Text,
  Group,
  Title,
  RingProgress,
  Stack,
  ThemeIcon,
  Box,
  Paper,
  useMantineTheme,
  Select,
  Flex,
} from "@mantine/core";
import {
  IconBed,
  IconUsersGroup,
  IconCar,
  IconReceipt,
  IconDownload,
  IconCircleFilled,
  IconChevronDown,
  IconRouter,
  IconGitCompare,
  IconPaperclip,
  IconDeviceSim,
} from "@tabler/icons-react";
import { DonutChart } from "@mantine/charts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetDashboardData } from "./hooks/useGetDashboardData";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { YearPickerInput } from "@mantine/dates";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import AccessoryModal from "./components/AccessoryModal";
import { useDisclosure } from "@mantine/hooks";
import SimcardModal from "./components/SimcardModal";
import GPSModal from "./components/GPSModal";
import PeripheralModal from "./components/PeripheralModal";
import { getMonthRange } from "../../utils/helper";

export const DashboardPage = () => {
  // const { data } = useGetInstalled(true);
  const { user } = useUserStore();
  const theme = useMantineTheme();
  const { setParams, getParam } = useParamsHelper();
  const { data: DashboardData, isLoading } = useGetDashboardData();
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [serverChartData, setServerChartData] = useState<any[]>([]);
  const navigate = useNavigate();
  const currentYear = getParam("year");
  const [
    openedAccessoryModal,
    { open: openAccessoryModal, close: closeAccessoryModal },
  ] = useDisclosure(false);
  const [
    openedSimcardModal,
    { open: openSimcardModal, close: closeSimcardModal },
  ] = useDisclosure(false);
  const [openedGPSModal, { open: openGPSModal, close: closeGPSModal }] =
    useDisclosure(false);
  const [
    openedPeripheralModal,
    { open: openPeripheralModal, close: closePeripheralModal },
  ] = useDisclosure(false);

  const summaryData = [
    {
      icon: IconDownload,
      label: "Total Installed Objects",
      value: DashboardData?.totalObjects,
      color: theme.colors.purple[1],
      url: "/installed",
    },
    {
      icon: IconCircleFilled,
      label: "Active Objects",
      value: DashboardData?.totalActiveObjects,
      color: theme.colors.success[6],
      url: "/installed?filter_by=Active",
    },
    {
      icon: IconCircleFilled,
      label: "Expire Soon Objects",
      value: DashboardData?.totalExpireSoonObjects,
      color: theme.colors.warning[6],
      url: "/installed?filter_by=ExpireSoon",
    },
    {
      icon: IconCircleFilled,
      label: "Expired Objects",
      value: DashboardData?.totalExpiredObjects,
      color: theme.colors.error[6],
      url: "/installed?filter_by=Expired",
    },
    {
      icon: IconUsersGroup,
      label: "Total Clients",
      value: DashboardData?.totalClients,
      color: theme.colors.purple[1],
      url: "/client",
    },
    {
      icon: IconPaperclip,
      label: "Total Accessories",
      value: DashboardData?.accessoryCount,
      color: theme.colors.purple[1],
      url: "",
      onClick: openAccessoryModal,
    },
    {
      icon: IconDeviceSim,
      label: "Total SIM Cards",
      value: DashboardData?.simCardCount,
      color: theme.colors.purple[1],
      url: "",
      onClick: openSimcardModal,
    },
  ];

  const colors = [
    theme.colors.purple[1],
    theme.colors.warning[6],
    theme.colors.success[6],
    theme.colors.grape[6],
  ];

  // Prepare chart data

  const generateDefaultMonths = (year: string) => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = dayjs(`${year}-${i + 1}-01`);
      return {
        month: date.format("MMM YYYY"),
        Installed: 0,
        Expired: 0,
        Renewal: 0,
        Repair: 0,
        Replacement: 0,
      };
    });
  };

  useEffect(() => {
    // Prepare all months
    const defaultData = generateDefaultMonths(currentYear || "2025");

    // Merge API data with default months
    const merged = defaultData.map((monthData) => {
      const match = DashboardData?.monthlyData.find(
        (d: any) => d.month === monthData.month
      );
      return match ? match : monthData;
    });
    setBarChartData(merged);

    const donutChartData = DashboardData?.usedServer.map(
      (server: any, index: number) => ({
        name: server.domain_name,
        value: server.count,
        color: colors[index % colors.length], // Cycle through colors
      })
    );
    setServerChartData(donutChartData);
  }, [isLoading, currentYear]);

  const handleBarClick = (status: string, filterDate: string, data: any) => {
    const monthRange = getMonthRange(data.month);
    navigate(
      `/${status}?filter_by_date=${filterDate}&fromDate=${monthRange.start}&toDate=${monthRange.end}`
    );
  };

  return (
    <Box p="30px">
      <Stack>
        <Grid>
          {summaryData.map((item, index) => (
            <Grid.Col
              span={{ base: 6, md: 3 }}
              key={index}
              onClick={() => (item.url ? navigate(item.url) : item.onClick?.())}
              style={{ cursor: "pointer" }}
            >
              <Card radius="md" shadow="sm">
                <Group>
                  <ThemeIcon
                    size="lg"
                    radius="md"
                    variant="light"
                    color={item.color}
                  >
                    <item.icon />
                  </ThemeIcon>
                  <div>
                    <Text size="lg" fw={700}>
                      {item.value}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {item.label}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          ))}
          <Grid.Col
            span={{ base: 6, md: 3 }}
            style={{ cursor: "pointer" }}
            onClick={openGPSModal}
          >
            <Card radius="md" shadow="sm">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light">
                  <IconRouter />
                </ThemeIcon>

                <div>
                  <Text size="lg" fw={700}>
                    {DashboardData?.gpsBrandCount}
                  </Text>
                  <Text size="xs" c="dimmed">
                    GPS Brand
                  </Text>
                </div>
                <div>
                  <Text size="lg" fw={700}>
                    {DashboardData?.gpsModelCount}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Model
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col
            span={{ base: 6, md: 4 }}
            style={{ cursor: "pointer" }}
            onClick={openPeripheralModal}
          >
            <Card radius="md" shadow="sm">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light">
                  <IconGitCompare />
                </ThemeIcon>

                <div>
                  <Text size="lg" fw={700}>
                    {DashboardData?.peripheralCount?.type ?? 0}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Peripheral Type
                  </Text>
                </div>
                <div>
                  <Text size="lg" fw={700}>
                    {DashboardData?.peripheralCount?.brand ?? 0}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Brand
                  </Text>
                </div>
                <div>
                  <Text size="lg" fw={700}>
                    {DashboardData?.peripheralCount?.model ?? 0}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Model
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder radius="md">
              <Flex direction={"column"} align={"center"} gap={"lg"}>
                <Text size="xl" fw={"bold"}>
                  Installed objects by server
                </Text>
                <DonutChart
                  size={120}
                  thickness={20}
                  labelsType="value"
                  withLabels
                  data={serverChartData || []}
                />
              </Flex>
              <Group justify="center" mt="sm" gap="xs">
                {serverChartData &&
                  serverChartData?.map((item: any, index: number) => (
                    <Group key={index} gap={5}>
                      <IconCircleFilled size={16} color={item.color} />
                      <Text size="sm" c={item.color}>
                        {item.name}
                      </Text>
                    </Group>
                  ))}
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder radius="md">
              <Flex direction={"column"} align={"center"} gap={"lg"}>
                <Text size="xl" fw={"bold"}>
                  Total objects status by percentage
                </Text>
                <DonutChart
                  size={120}
                  thickness={20}
                  labelsType="percent"
                  withLabels
                  data={[
                    {
                      name: "Active",
                      value: DashboardData?.totalActiveObjects,
                      color: theme.colors.success[6],
                    },
                    {
                      name: "Expire Soon",
                      value: DashboardData?.totalExpireSoonObjects,
                      color: theme.colors.warning[6],
                    },
                    {
                      name: "Expired",
                      value: DashboardData?.totalExpiredObjects,
                      color: theme.colors.error[6],
                    },
                  ]}
                />
              </Flex>
              <Group justify="center" mt="sm" gap="xs">
                <Group gap={5}>
                  <IconCircleFilled size={16} color={theme.colors.success[6]} />
                  <Text size="sm" c={theme.colors.success[6]}>
                    Active
                  </Text>
                </Group>

                <Group gap={5}>
                  <IconCircleFilled size={16} color={theme.colors.warning[6]} />
                  <Text size="sm" c={theme.colors.warning[6]}>
                    ExpireSoon
                  </Text>
                </Group>

                <Group gap={5}>
                  <IconCircleFilled size={16} color={theme.colors.error[6]} />
                  <Text size="sm" c={theme.colors.error[6]}>
                    Expired
                  </Text>
                </Group>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 12, sm: 8 }}>
            <Paper withBorder p="md" radius="md">
              <Group justify="space-between" mb="md">
                <Text size="xl" fw={"bold"}>
                  Monthly Objects Trend
                </Text>

                <YearPickerInput
                  variant="unstyled"
                  defaultValue={new Date()}
                  leftSectionWidth={120}
                  leftSection={
                    <Flex gap={3}>
                      <Text>Show by year </Text>
                      <IconChevronDown size={18} style={{ marginTop: 5 }} />
                    </Flex>
                  }
                  leftSectionPointerEvents="none"
                  onChange={(value) => {
                    setParams({
                      year: dayjs(value).year(),
                    });
                  }}
                />
              </Group>
              {/* <BarChart
                h={250}
                data={barChartData}
                dataKey="month"
                withLegend
                legendProps={{ verticalAlign: "bottom" }}
                barProps={{ radius: [10, 10, 0, 0], barSize: 8 }}
                series={[
                  { name: "Installed", color: theme.colors.purple[1] },
                  { name: "Expired", color: theme.colors.error[6] },
                  { name: "Renewal", color: theme.colors.success[6] },
                  { name: "Repair", color: theme.colors.grape[6] },
                  { name: "Replacement", color: theme.colors.orange[6] },
                ]}
                onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  // If your chart library provides a way to get bar data from the event, use it here
                  // Example: const bar = getBarDataFromEvent(event);
                  // navigate(`/installed?month=${bar.month}`);
                }}
              /> */}
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="Installed"
                    fill="#7c3aed"
                    radius={[10, 10, 0, 0]}
                    barSize={8}
                    onClick={(data, index) => {
                      console.log("Installed bar data:", data);
                      handleBarClick("installed", "installed_date", data);
                    }}
                    cursor={"pointer"}
                  />
                  <Bar
                    dataKey="Expired"
                    fill="#f44336"
                    radius={[10, 10, 0, 0]}
                    barSize={8}
                    onClick={(data, index) => {
                      console.log("Expired bar data:", data);
                      handleBarClick("installed", "expire_date", data);
                    }}
                    cursor={"pointer"}
                  />
                  <Bar
                    dataKey="Renewal"
                    fill="#4caf50"
                    radius={[10, 10, 0, 0]}
                    barSize={8}
                    onClick={(data, index) => {
                      console.log("Renewal bar data:", data);
                      handleBarClick("installed", "renewal_date", data);
                    }}
                    cursor={"pointer"}
                  />

                  <Bar
                    dataKey="Repair"
                    fill="#9c27b0"
                    radius={[10, 10, 0, 0]}
                    barSize={8}
                    onClick={(data, index) => {
                      console.log("Repair bar data:", data);
                      handleBarClick(
                        "installed",
                        "repair_replacement_date",
                        data
                      );
                    }}
                    cursor={"pointer"}
                  />
                  <Bar
                    dataKey="Replacement"
                    fill="#ff9800"
                    radius={[10, 10, 0, 0]}
                    barSize={8}
                    onClick={(data, index) => {
                      console.log("Replacement bar data:", data);
                      handleBarClick(
                        "installed",
                        "repair_replacement_date",
                        data
                      );
                    }}
                    cursor={"pointer"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
      <AccessoryModal
        opened={openedAccessoryModal}
        onClose={closeAccessoryModal}
      />
      <SimcardModal opened={openedSimcardModal} onClose={closeSimcardModal} />
      <GPSModal opened={openedGPSModal} onClose={closeGPSModal} />
      <PeripheralModal
        opened={openedPeripheralModal}
        onClose={closePeripheralModal}
      />
    </Box>
  );
};
