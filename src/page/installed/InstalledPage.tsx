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
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect } from "../../components/datatable/PageSizeSelect";
import { SearchInput } from "../../components/common/SearchInput";
import { DataTable } from "../../components/datatable/DataTable";

export const InstalledPage = () => {
  const { data } = useGetInstalled("");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  console.log(data?.data.data);

  const rows = data?.data?.data?.map((row: any, index: number) => (
    <Table.Tr key={index}>
      <Table.Td style={{ fontSize: 17 }}>{index + 1}</Table.Td>
      <Table.Td style={{ fontSize: 17 }}>{row.client.name}</Table.Td>
      <Table.Td style={{ fontSize: 17 }}>{row.plate_number}</Table.Td>
      <Table.Td style={{ fontSize: 17 }}>{row.device[0]?.imei}</Table.Td>
      <Table.Td style={{ fontSize: 17 }}>
        {row.device[0]?.server[0]?.domain}
      </Table.Td>
      <Table.Td style={{ fontSize: 17 }}>
        {row.device[0]?.server[0]?.expire_date
          ? dayjs(row.device[0].server[0].expire_date).format("MMM-DD-YYYY")
          : ""}
      </Table.Td>
      <Table.Td style={{ fontSize: 17 }}>
        {row.device[0]?.server[0]?.invoice_no}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box px={10} pb={30}>
      <Paper shadow="xs">
        <Box style={{ borderBottom: "1px solid #dddddd" }}>
          <Flex justify={"space-between"} p="sm">
            <Text size="lg" fw={600} c="black">
              Installed Objects
            </Text>
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
        <Flex justify="space-between" align="center" mb={0} px="md" pt={"md"}>
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
        <Box p={"md"}>
          <DataTable
            columns={[]}
            data={[]}
            totalPage={0}
            totalCount={0}
            enableRowOrdering={false}
            isLoading={false}
            enableRowActions
            renderRowActions={({ row }) => {
              return (
                <Group gap={"xs"}>
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
