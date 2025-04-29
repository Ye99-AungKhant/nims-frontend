import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useGetInstalled } from "./hooks/useGetInstalled";
import dayjs from "dayjs";
import {
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

export const InstalledPage = () => {
  const { data, isLoading } = useGetInstalled("");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  console.log("installed", data?.items);

  return (
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
          </Flex>
        </Box>
        <Flex justify="space-between" align="center" mb={0} px="30px" pt="30px">
          <Group gap={"xs"}>
            <Text color={theme.colors.purple[0]} fz="md">
              Show
            </Text>
            <PageSizeSelect />
            <Text color={theme.colors.purple[0]} fz="md">
              entries
            </Text>
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
                    onClick={() => {}}
                  >
                    <IconEye size={18} />
                  </ActionIcon>
                  <ActionIcon
                    color={theme.colors.purple[1]}
                    size={30}
                    radius="lg"
                    variant="outline"
                    onClick={() => navigate("create", { state: { id: "" } })}
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    color={theme.colors.chocolate[1]}
                    radius="lg"
                    variant="outline"
                    onClick={() => {}}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              );
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
