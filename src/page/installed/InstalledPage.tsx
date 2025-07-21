import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Paper,
  Select,
  SimpleGrid,
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
                <Text size={"lg"} fw={600} c={"dark"}>
                  Installed Objects
                </Text>
              </Flex>
              <PermissionGate
                page={"installed_objects"}
                scope={"create"}
                errorProps={{ style: { display: "none" } }}
              >
                <Button
                  onClick={() => navigate("create")}
                  leftSection={<IconPlus size={16} />}
                  variant="outline"
                  radius={"lg"}
                  size="xs"
                  style={{
                    minWidth: 100,
                    fontSize: 13,
                    paddingLeft: 10,
                    paddingRight: 10,
                    whiteSpace: "nowrap",
                  }}
                >
                  New Installation
                </Button>
              </PermissionGate>
            </Flex>
          </Box>

          <Flex
            justify="space-between"
            align="start"
            mb={0}
            px={{ base: 8, sm: 30 }}
            pt={{ base: 8, sm: 30 }}
            wrap="wrap"
            gap="xs"
          >
            {/* Left Side: Filters */}
            <SimpleGrid
              cols={{ base: 2, md: 5 }}
              spacing="xs"
              style={{ flex: 1, minWidth: "300px" }}
            >
              <Flex align="center" gap={5}>
                <Text color={theme.colors.purple[0]} fz="md">
                  Show
                </Text>
                <PageSizeSelect />
                <Text color={theme.colors.purple[0]} fz="md">
                  entries
                </Text>
              </Flex>

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
                  setParams({ filter_by_date: value });
                }}
                w="100%"
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
                w="100%"
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
                  setParams({ filter_by: value });
                }}
                w="100%"
              />
            </SimpleGrid>

            {/* Right Side: Search */}
            <Box>
              <SearchInput size="sm" leftSection name="search" />
            </Box>
          </Flex>

          <Box py={"md"} px={{ base: 8, sm: 30 }}>
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
