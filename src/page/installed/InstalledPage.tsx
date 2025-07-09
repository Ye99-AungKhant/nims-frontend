import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Menu,
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
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconEye,
  IconMenu,
  IconPlus,
  IconRefresh,
  IconTool,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";
import { InstalledObjectPageColumns } from "./components/InstalledObjectPageColumns";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import PermissionGate from "../../components/middleware/PermissionGate";
import { useDisclosure } from "@mantine/hooks";
import RenewalConfirmModal from "../../components/common/RenewalConfirmModal";
import RepairReplacement from "./components/RepairReplacement";

export const InstalledPage = () => {
  const { data, isLoading } = useGetInstalled("");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [filterDatevalue, setFilterDatevalue] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const { setParams, getParam } = useParamsHelper();
  const [opened, { open: openRenewal, close: closeRenewal }] =
    useDisclosure(false);
  const [openedRepair, { open: openRepair, close: closeRepair }] =
    useDisclosure(false);
  const [renewalData, SetRenewalData] = useState();
  const [repairId, setRepairId] = useState({
    id: 0,
    serverId: 0,
  });

  const handleRenewalModelOpen = (serverData: any) => {
    SetRenewalData(serverData);
    openRenewal();
  };

  const handleRepairReplacementModelOpen = (id: number, serverId: number) => {
    setRepairId({ id, serverId });
    openRepair();
  };

  const handleOnSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <PermissionGate page={"installed_objects"} scope={"view"}>
      <Box p="30px">
        <Paper shadow="xs">
          <Box style={{ borderBottom: "1px solid #dddddd" }}>
            <Flex justify={"space-between"} py="md" px={30}>
              <Group gap={0}>
                <IconDownload size={24} />
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
                    filter_by_date: value,
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
              <Select
                variant="default"
                size="sm"
                clearable
                placeholder="Filter by Status"
                data={[
                  { label: "Active", value: "Active" },
                  { label: "Expire Soon", value: "ExpireSoon" },
                  { label: "Expired", value: "Expired" },
                ]}
                onChange={(value) => {
                  setParams({
                    filter_by: value,
                  });
                }}
                w={170}
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
              isDotMenu={true}
              enableRowActions
              renderRowActions={({ row }) => {
                return (
                  <Menu shadow="md" offset={1}>
                    <Menu.Target>
                      <ActionIcon
                        variant="subtle"
                        color={theme.colors.chocolate[1]}
                      >
                        <IconDotsVertical />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <PermissionGate
                        page={"installed_objects"}
                        scope={"view"}
                        errorProps={{ style: { display: "none" } }}
                      >
                        <Menu.Item
                          onClick={() =>
                            navigate("detail", {
                              state: {
                                id: row.original.id,
                              },
                            })
                          }
                          color={theme.colors.chocolate[1]}
                        >
                          <IconEye size={18} />
                        </Menu.Item>
                      </PermissionGate>

                      <PermissionGate
                        page={"installed_objects"}
                        scope={"update"}
                        errorProps={{ style: { display: "none" } }}
                      >
                        <Menu.Item
                          onClick={() =>
                            navigate("create", {
                              state: { id: row.original.id },
                            })
                          }
                          color={theme.colors.purple[1]}
                        >
                          <IconEdit size={18} />
                        </Menu.Item>
                      </PermissionGate>

                      {row.original.status !== "Active" && (
                        <PermissionGate
                          page={"installed_objects"}
                          scope={"renewal"}
                          errorProps={{ style: { display: "none" } }}
                        >
                          <Menu.Item
                            onClick={() => handleRenewalModelOpen(row.original)}
                            color={"green"}
                          >
                            <IconRefresh size={18} />
                          </Menu.Item>
                        </PermissionGate>
                      )}

                      <PermissionGate
                        page={"installed_objects"}
                        scope={"repair"}
                        errorProps={{ style: { display: "none" } }}
                      >
                        <Menu.Item
                          onClick={() =>
                            handleRepairReplacementModelOpen(
                              row.original.id,
                              row.original.server_id
                            )
                          }
                          color={"orange"}
                        >
                          <IconTool size={18} />
                        </Menu.Item>
                      </PermissionGate>
                    </Menu.Dropdown>
                  </Menu>
                );
              }}
            />
          </Box>

          {opened && (
            <RenewalConfirmModal
              openedMainModel={opened}
              onClose={closeRenewal}
              onClick={handleOnSubmit}
              title={"Confirm Renewal Object"}
              description={"Are you sure you want to renew this object?"}
              data={renewalData}
              isloading={false}
            />
          )}

          {openedRepair && (
            <RepairReplacement
              opened={openedRepair}
              onClose={closeRepair}
              onClick={handleOnSubmit}
              title={"Confirm Renewal Object"}
              description={"Are you sure you want to renew this object?"}
              ids={repairId}
              isloading={false}
            />
          )}
        </Paper>
      </Box>
    </PermissionGate>
  );
};
