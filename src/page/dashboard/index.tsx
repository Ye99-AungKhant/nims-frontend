import { useGetInstalled } from "../installed/hooks/useGetInstalled";
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
} from "@tabler/icons-react";
import { BarChart, DonutChart } from "@mantine/charts";
import { useGetDashboardData } from "./hooks/useGetDashboardData";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { YearPickerInput } from "@mantine/dates";
import { useParamsHelper } from "../../hooks/useParamsHelper";

export const DashboardPage = () => {
  // const { data } = useGetInstalled(true);
  const { user } = useUserStore();
  const theme = useMantineTheme();
  const { setParams, getParam } = useParamsHelper();
  const { data: DashboardData, isLoading } = useGetDashboardData();
  const [barCharData, setBarChartData] = useState<any[]>([]);
  const navigate = useNavigate();
  const currentYear = getParam("year");

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
  ];

  const generateDefaultMonths = (year: string) => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = dayjs(`${year}-${i + 1}-01`);
      return {
        month: date.format("MMM YYYY"),
        InstallObject: 0,
        ExpiredObject: 0,
        RenewalObject: 0,
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
  }, [isLoading, currentYear]);

  return (
    <Box p="30px">
      <Stack>
        <Grid>
          {summaryData.map((item, index) => (
            <Grid.Col
              span={{ base: 6, md: 3 }}
              key={index}
              onClick={() => navigate(item.url)}
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
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder radius="md">
              <Flex direction={"column"} align={"center"} gap={"lg"}>
                <Text size="xl" fw={"bold"}>
                  Something Data
                </Text>
                <RingProgress
                  size={120}
                  thickness={12}
                  label={<Text ta="center">28%</Text>}
                  sections={[
                    { value: 28, color: theme.colors.success[6] },
                    { value: 72, color: theme.colors.warning[6] },
                  ]}
                />
              </Flex>
              <Group justify="center" mt={90} gap="xs">
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
              <BarChart
                h={250}
                data={barCharData}
                dataKey="month"
                withLegend
                legendProps={{ verticalAlign: "bottom" }}
                barProps={{ radius: [10, 10, 0, 0], barSize: 8 }}
                series={[
                  { name: "InstallObject", color: theme.colors.purple[1] },
                  { name: "ExpiredObject", color: theme.colors.error[6] },
                  { name: "RenewalObject", color: theme.colors.success[6] },
                ]}
              />
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
};
