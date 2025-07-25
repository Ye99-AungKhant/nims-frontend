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
import { IconAddressBook, IconCloudDown } from "@tabler/icons-react";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import PermissionGate from "../../components/middleware/PermissionGate";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";
import { useGetClients } from "../../hooks/useGetClients";
import { useExportClientInstalledObj } from "../../hooks/dataExport/useExportClientInstalledObj";
import { useGetTypes } from "../../hooks/useGetTypes";
import { useGetAllBrands } from "../../hooks/useGetAllBrands";
import { useGetServerRP } from "./hooks/useGetServerRP";
import { serverRPPageColumns } from "./components/serverRPPageColumns";

export const ServerReport = () => {
  const { data, isLoading } = useGetServerRP();
  const { data: clients } = useGetClients();
  const { data: typeData, isLoading: isTypeLoading } = useGetTypes("Server");
  const { data: brandData, isLoading: isBrandLoading } =
    useGetAllBrands("Server");
  const { mutate, isPending } = useExportClientInstalledObj();
  const theme = useMantineTheme();
  const { getParam, setParams } = useParamsHelper();

  console.log(data);

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
                  Servers Report
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
                  placeholder="Filter by Type"
                  value={
                    getParam("filterType") === "type"
                      ? getParam("filterId")
                      : ""
                  }
                  data={
                    typeData?.data?.data.map((type: any) => ({
                      label: type.name,
                      value: String(type.id),
                    })) || []
                  }
                  onChange={(value) => {
                    setParams({ filterType: "type", filterId: value });
                  }}
                  w="100%"
                />
              </Grid.Col>

              <Grid.Col span="auto">
                <Select
                  variant="default"
                  size="sm"
                  clearable
                  placeholder="Filter by Domain"
                  value={
                    getParam("filterType") === "domain"
                      ? getParam("filterId")
                      : ""
                  }
                  data={
                    brandData?.data?.data.map((brand: any) => ({
                      label: brand.name,
                      value: String(brand.id),
                    })) || []
                  }
                  onChange={(value) => {
                    setParams({ filterType: "domain", filterId: value });
                  }}
                  w="100%"
                />
              </Grid.Col>

              <Grid.Col span="auto">
                <Select
                  variant="default"
                  size="sm"
                  clearable
                  placeholder="Filter by Status"
                  value={getParam("filter_by")}
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
                title="Search Plate No., Invoice or IMEI"
              />
            </Box>
          </Flex>

          <Box py={"md"} px={{ base: 8, sm: 30 }}>
            <DataTable
              columns={serverRPPageColumns}
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
