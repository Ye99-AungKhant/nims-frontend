import { Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";

export const InstalledObjectPageColumns: MRT_ColumnDef<any>[] = [
  {
    header: "#",
    Header: ({ column }) => <Box pl={"xs"}>{column.columnDef.header}</Box>,
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
    header: "Phone No.",
    accessorKey: "phone_no",
  },
  {
    header: "Server",
    accessorKey: "server",
  },
  {
    header: "Installed Date",
    accessorKey: "installed_date",
  },
  {
    header: "Expiry Date",
    accessorKey: "expire_date",
    size: 130,
    Cell: ({ cell }) => (
      <span
        style={{
          backgroundColor: "#474747",
          color: "white",
          padding: "3px 10px",
          borderRadius: 20,
        }}
      >
        {cell.getValue<string>()}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 140,
    Cell: ({ cell }) => (
      <span
        style={{
          backgroundColor: `${
            cell.getValue<string>() === "Active"
              ? "#ABC37B"
              : cell.getValue<string>() === "ExpireSoon"
              ? "#cea836"
              : "#F15D60"
          } `,
          color: "white",
          padding: "3px 10px",
          borderRadius: 20,
        }}
      >
        {cell.getValue<string>() === "ExpireSoon"
          ? "Expire Soon"
          : cell.getValue<string>()}
      </span>
    ),
  },
];
