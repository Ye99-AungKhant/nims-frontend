import { Box, Paper, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useGetInstalled } from "../installed/hooks/useGetInstalled";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

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
  // const { data } = useGetInstalled(true);
  // console.log(data?.items);

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

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "id",
        enableColumnPinning: false, //disable column pinning for this column
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 300,
      },
      {
        accessorKey: "city", //this column gets pinned to the right by default because of the initial state,
        header: "City",
      },

      {
        accessorKey: "state", //this column gets pinned left by default because of the the initial state,
        header: "State",
      },
    ],
    []
  );

  const data = [
    {
      id: "1",
      firstName: "Dylan",
      middleName: "Sprouse",
      lastName: "Murray",
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
    },
    {
      id: "2",
      firstName: "Raquel",
      middleName: "Hakeem",
      lastName: "Kohler",
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
    },
    {
      id: "3",
      firstName: "Ervin",
      middleName: "Kris",
      lastName: "Reinger",
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
    {
      id: "4",
      firstName: "Brittany",
      middleName: "Kathryn",
      lastName: "McCullough",
      address: "722 Emie Stream",
      city: "Lincoln",
      state: "Nebraska",
    },
    {
      id: "5",
      firstName: "Branson",
      middleName: "John",
      lastName: "Frami",
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
  ];
  return (
    <Box px={10} pb={30}>
      <Paper p="lg" shadow="xs">
        <MantineReactTable
          columns={columns}
          data={data}
          enableColumnPinning
          initialState={{ columnPinning: { left: ["state"], right: ["city"] } }}
        />
      </Paper>
    </Box>
  );
};
