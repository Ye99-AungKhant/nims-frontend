import {
  Box,
  Paper,
  Flex,
  Text,
  SimpleGrid,
  useMantineTheme,
  Select,
} from "@mantine/core";
import PermissionGate from "../../components/middleware/PermissionGate";
import { IconDeviceSim } from "@tabler/icons-react";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";
import { SimCardRPPageColumns } from "./components/SimCardRPPageColumns";
import { useGetSimRP } from "./hooks/useGetSimRP";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import { useGetBrands } from "../../hooks/useGetBrands";
import { useGetAccessoryRP } from "./hooks/useGetAccessoryRP";
import { useGetTypes } from "../../hooks/useGetTypes";
import { accessoryRPPageColumns } from "./components/accessoryRPPageColumns";

export const AccessoryReport = () => {
  const { data, isLoading } = useGetAccessoryRP();
  const { data: typeData, isLoading: isTypeLoading } = useGetTypes("Accessory");

  const theme = useMantineTheme();
  const { setParams, getParam } = useParamsHelper();

  console.log("Accessory Report Data:", data);

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
                <IconDeviceSim size={22} />
                <Text size={"lg"} fw={600} c={"dark"}>
                  Accessories Report
                </Text>
              </Flex>
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
                placeholder="Filter by Type"
                value={getParam("type_id") || ""}
                data={
                  typeData?.data.data.map((data: any) => ({
                    label: data.name,
                    value: String(data.id),
                  })) || []
                }
                onChange={(value) => {
                  setParams({ type_id: value });
                }}
                w="100%"
              />
            </SimpleGrid>

            {/* Right Side: Search */}
            <Box>
              <SearchInput
                size="sm"
                leftSection
                name="search"
                title="Search Type, IMEI, Plate No. or Company"
              />
            </Box>
          </Flex>

          <Box py={"md"} px={{ base: 8, sm: 30 }}>
            <DataTable
              columns={accessoryRPPageColumns}
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
