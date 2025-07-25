import {
  Box,
  Button,
  Flex,
  Grid,
  Paper,
  Select,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAddressBook,
  IconCircleArrowDown,
  IconCloudDown,
  IconPlus,
} from "@tabler/icons-react";
import { useGetInstalled } from "../installed/hooks/useGetInstalled";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import PermissionGate from "../../components/middleware/PermissionGate";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";
import { InstalledObjectPageColumns } from "../installed/components/InstalledObjectPageColumns";
import { useGetClients } from "../../hooks/useGetClients";
import { useExportClientInstalledObj } from "../../hooks/dataExport/useExportClientInstalledObj";

export const ClientReport = () => {
  const { data, isLoading } = useGetInstalled("");
  const { data: clients } = useGetClients();
  const { mutate, isPending } = useExportClientInstalledObj();
  const theme = useMantineTheme();
  const { getParam, setParams } = useParamsHelper();

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
                <IconAddressBook size={24} />
                <Text size={"lg"} fw={600} c={"dark"}>
                  Clients Report
                </Text>
              </Flex>
              <Button
                onClick={() => mutate()}
                leftSection={<IconCloudDown size={18} />}
                variant="outline"
                radius={"lg"}
                size="xs"
                loading={isPending}
              >
                Export
              </Button>
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
            <Grid>
              <Grid.Col span="auto">
                <Flex align="center" gap={5}>
                  <Text color={theme.colors.purple[0]} fz="md">
                    Show
                  </Text>
                  <PageSizeSelect />
                  <Text color={theme.colors.purple[0]} fz="md">
                    entries
                  </Text>
                </Flex>
              </Grid.Col>

              <Grid.Col span={5}>
                <Select
                  variant="default"
                  searchable
                  size="sm"
                  clearable
                  placeholder="Filter by Client"
                  value={getParam("client_id")}
                  data={
                    clients?.data.data.map((client: any) => ({
                      label: client.name,
                      value: String(client.id),
                    })) || []
                  }
                  onChange={(value) => {
                    setParams({ client_id: value });
                  }}
                  nothingFoundMessage="No clients found"
                  w="100%"
                />
              </Grid.Col>

              <Grid.Col span="auto">
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
              </Grid.Col>
            </Grid>

            {/* Right Side: Search */}
            <Box>
              <SearchInput
                size="sm"
                leftSection
                name="search"
                title="Search Plate No., IMEI or Phone No."
              />
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
            />
          </Box>
        </Paper>
      </Box>
    </PermissionGate>
  );
};
