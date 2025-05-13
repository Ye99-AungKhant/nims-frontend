import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useGetInstalled } from "./hooks/useGetInstalled";
import dayjs from "dayjs";
import {
  IconChevronDown,
  IconCircleArrowDown,
  IconEdit,
  IconEye,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";
import { InstalledObjectPageColumns } from "./components/InstalledObjectPageColumns";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { useState } from "react";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import PermissionGate from "../../components/middleware/PermissionGate";

export const InstalledPage = () => {
  const { data, isLoading } = useGetInstalled("");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [filterDatevalue, setFilterDatevalue] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const { setParams, getParam } = useParamsHelper();

  return (
    <PermissionGate page={"installed_objects"} scope={"view"}>
      <Box p="30px">
        <Paper shadow="xs">
          <Box style={{ borderBottom: "1px solid #dddddd" }}>
            <Flex justify={"space-between"} py="md" px={30}>
              <Group gap={0}>
                <IconCircleArrowDown size={24} />
                <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
                  Installed Objects
                </Text>
              </Group>
              <PermissionGate
                page={"installed_objects"}
                scope={"create"}
                errorProps={{ style: { display: "none" } }}
              >
                <Group justify="center">
                  <Button
                    onClick={() => navigate("create")}
                    leftSection={<IconPlus size={18} />}
                    variant="outline"
                    radius={"lg"}
                    size="xs"
                  >
                    New Installation
                  </Button>
                </Group>
              </PermissionGate>
            </Flex>
          </Box>
          <Flex
            justify="space-between"
            align="center"
            mb={0}
            px="30px"
            pt="30px"
          >
            <Group gap={"xs"}>
              <Text color={theme.colors.purple[0]} fz="md">
                Show
              </Text>
              <PageSizeSelect />
              <Text color={theme.colors.purple[0]} fz="md" mr={"md"}>
                entries
              </Text>
              <Select
                variant="default"
                size="sm"
                clearable
                placeholder="Filter by Date Type"
                data={[
                  { label: "Installed Date", value: "installed_date" },
                  { label: "Expiry Date", value: "expire_date" },
                ]}
                onChange={(value) => {
                  setParams({
                    filter_by: value,
                  });
                }}
                w={170}
              />
              <DatePickerInput
                type="range"
                placeholder="Filter by Date"
                value={filterDatevalue}
                onChange={(value: any) => {
                  const [fromDate, toDate] = value;
                  setParams({
                    fromDate: fromDate
                      ? dayjs(fromDate).format("YYYY-MM-DD")
                      : null,
                    toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
                  });
                  setFilterDatevalue(value);
                }}
                size="sm"
                valueFormat="DD-MM-YYYY"
                clearable
                allowSingleDateInRange
                miw={170}
                rightSection={
                  filterDatevalue[0] ? null : <IconChevronDown size={16} />
                }
              />
            </Group>

            <SearchInput size="sm" leftSection name={"search"} />
          </Flex>
          <Box p="30px" pt={"md"}>
            <DataTable
              columns={InstalledObjectPageColumns}
              data={data?.items || []}
              totalPage={data?.totalPage}
              totalCount={data?.totalCount}
              enableRowOrdering={false}
              isLoading={isLoading}
              enableRowActions
              renderRowActions={({ row }) => {
                return (
                  <Group gap={"xs"} justify="center">
                    <ActionIcon
                      color={theme.colors.chocolate[1]}
                      size={30}
                      radius="lg"
                      variant="outline"
                      onClick={() =>
                        navigate("detail", {
                          state: {
                            id: row.original.id,
                          },
                        })
                      }
                    >
                      <IconEye size={18} />
                    </ActionIcon>
                    <PermissionGate
                      page={"installed_objects"}
                      scope={"update"}
                      errorProps={{ style: { display: "none" } }}
                    >
                      <ActionIcon
                        color={theme.colors.purple[1]}
                        size={30}
                        radius="lg"
                        variant="outline"
                        onClick={() =>
                          navigate("create", { state: { id: row.original.id } })
                        }
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                    </PermissionGate>

                    {/* <PermissionGate
                      page={"delete_object"}
                      errorProps={{ style: { display: "none" } }}
                    >
                      <ActionIcon
                        color={theme.colors.chocolate[1]}
                        radius="lg"
                        variant="outline"
                        onClick={() => {}}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </PermissionGate> */}
                  </Group>
                );
              }}
            />
          </Box>
        </Paper>
      </Box>
    </PermissionGate>
  );
};
