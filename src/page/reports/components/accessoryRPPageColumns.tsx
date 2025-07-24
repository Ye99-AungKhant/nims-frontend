import { Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";

export const accessoryRPPageColumns: MRT_ColumnDef<any>[] = [
  {
    header: "#",
    Header: ({ column }) => (
      <Box pl={{ base: "xs", md: "lg" }}>{column.columnDef.header}</Box>
    ),
    Cell: ({ row, table }) =>
      row.index +
      1 +
      (table.getState().pagination.pageIndex - 1) *
        table.getState().pagination.pageSize,
    mantineTableBodyCellProps: {
      style: {
        textAlign: "center",
      },
    },
  },
  {
    header: "Company",
    accessorKey: "client_name",
    size: 200,
    Cell: ({ cell }) => (
      <span
        style={{
          color: "#684498",
        }}
      >
        {cell.getValue<string>()}
      </span>
    ),
  },
  {
    header: "Plate No.",
    accessorKey: "plate_number",
  },
  {
    header: "IMEI/UID",
    accessorKey: "imei",
    size: 150,
    minSize: 150,
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "QTY",
    accessorKey: "qty",
  },
];
