import { Box, Paper, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useGetInstalled } from "../installed/hooks/useGetInstalled";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useUserStore from "../../store/useUserStore";

type Person = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

export const DashboardPage = () => {
  const { data } = useGetInstalled(true);
  const { user } = useUserStore();

  console.log("expiry object", data?.items, user);

  // const rows = data?.items.map((row: any, index: number) => (
  //   <Table.Tr key={index}>
  //     <Table.Td style={{ fontSize: 17 }}>{index + 1}</Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>{row.client.name}</Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>{row.plate_number}</Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>{row.device[0]?.imei}</Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {row.device[0]?.server[0]?.domain}
  //     </Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {row.device[0]?.server[0]?.expire_date
  //         ? dayjs(row.device[0].server[0].expire_date).format("MMM-DD-YYYY")
  //         : ""}
  //     </Table.Td>
  //     <Table.Td style={{ fontSize: 17 }}>
  //       {row.device[0]?.server[0]?.invoice_no}
  //     </Table.Td>
  //   </Table.Tr>
  // ));

  return (
    <Box px={10} pb={30}>
      <Paper p="lg" shadow="xs"></Paper>
    </Box>
  );
};
