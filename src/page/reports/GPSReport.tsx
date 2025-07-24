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
import { useGetGPSRP } from "./hooks/useGetGPSRP";
import { gpsRPPageColumns } from "./components/gpsRPPageColumns";
import { useGetBrands } from "../../hooks/useGetBrands";
import { useGetModels } from "../../hooks/useGetModels";

export const GPSReport = () => {
  const { data, isLoading } = useGetGPSRP();
  const { data: clients } = useGetClients();
  const { data: brandData, isLoading: isBrandLoading } = useGetBrands("GPS");
  const { data: modelData, isLoading: isModelLoading } = useGetModels("GPS");
  const { mutate, isPending } = useExportClientInstalledObj();
  const theme = useMantineTheme();
  const { setParams } = useParamsHelper();

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
                  GPS Devices Report
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
                  placeholder="Filter by Brand"
                  data={
                    brandData?.data?.data.map((brand: any) => ({
                      label: brand.name,
                      value: String(brand.id),
                    })) || []
                  }
                  onChange={(value) => {
                    setParams({ filterType: "brand", filterId: value });
                  }}
                  w="100%"
                />
              </Grid.Col>
              <Grid.Col span="auto">
                <Select
                  variant="default"
                  size="sm"
                  clearable
                  placeholder="Filter by Model"
                  data={
                    modelData?.data?.data.map((model: any) => ({
                      label: model.name,
                      value: String(model.id),
                    })) || []
                  }
                  onChange={(value) => {
                    setParams({ filterType: "model", filterId: value });
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
                title="Search plate no., imei or serial no."
              />
            </Box>
          </Flex>

          <Box py={"md"} px={{ base: 8, sm: 30 }}>
            <DataTable
              columns={gpsRPPageColumns}
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
