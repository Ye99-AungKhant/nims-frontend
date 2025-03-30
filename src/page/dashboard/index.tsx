import { Box, Paper, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useGetInstalled } from "../installed/hooks/useGetInstalled";

export const DashboardPage = () => {
  const { data } = useGetInstalled(true);
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
      <Paper p="lg" shadow="xs">
        <Table
          verticalSpacing="md"
          striped
          highlightOnHover
          withColumnBorders
          withRowBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ fontSize: 18 }}>No.</Table.Th>
              <Table.Th style={{ fontSize: 18 }}>Client</Table.Th>
              <Table.Th style={{ fontSize: 18 }}>Plate No.</Table.Th>
              <Table.Th style={{ fontSize: 18 }}>IMEI No.</Table.Th>
              <Table.Th style={{ fontSize: 18 }}>Server</Table.Th>
              <Table.Th style={{ fontSize: 18 }}>Expire Date</Table.Th>
              <Table.Th style={{ fontSize: 18 }}>Invoice No.</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Box>
  );
};
