import { Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import dayjs from "dayjs";

export const serverRPPageColumns: MRT_ColumnDef<any>[] = [
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
      <span style={{ color: "#684498" }}>{cell.getValue<string>()}</span>
    ),
  },
  {
    header: "Plate No.",
    accessorKey: "vehicle_plate_number",
    size: 150,
    minSize: 150,
  },
  {
    header: "IMEI",
    accessorKey: "device_imei",
    size: 150,
    minSize: 150,
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Domain",
    accessorKey: "domain",
  },
  {
    header: "Installed Date",
    accessorKey: "installed_date",
    Cell: ({ cell }) =>
      cell.getValue()
        ? dayjs(cell.getValue<string>()).format("DD-MM-YYYY")
        : "-",
  },
  {
    header: "Renewal Date",
    accessorKey: "renewal_date",
    Cell: ({ cell }) =>
      cell.getValue()
        ? dayjs(cell.getValue<string>()).format("DD-MM-YYYY")
        : "-",
  },
  {
    header: "Expire Date",
    accessorKey: "expire_date",
    Cell: ({ cell }) =>
      cell.getValue()
        ? dayjs(cell.getValue<string>()).format("DD-MM-YYYY")
        : "-",
  },
  {
    header: "Invoice No.",
    accessorKey: "invoice_no",
  },
  {
    header: "Base Fee",
    accessorKey: "object_base_fee",
  },
  {
    header: "Status",
    accessorKey: "server_status",
    size: 140,
    Cell: ({ cell }) => (
      <span
        style={{
          backgroundColor: `${
            cell.getValue<string>() === "Active"
              ? "#239e57"
              : cell.getValue<string>() === "ExpireSoon"
              ? "#cea836"
              : "#EC1F24"
          } `,
          color: "white",
          padding: "1px 6px",
          borderRadius: 20,
        }}
      >
        {cell.getValue<string>() === "ExpireSoon"
          ? "Expire Soon"
          : cell.getValue<string>()}
      </span>
    ),
  },
  {
    header: "Secondary Server",
    accessorKey: "extra_server",
    Cell: ({ cell }) => {
      const value = cell.getValue<any[]>();
      if (!value || value.length === 0) return "-";
      return value.map((item) => `${item.type} (${item.domain})`).join(", ");
    },
  },
];
