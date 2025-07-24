import { Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useParamsHelper } from "../../../hooks/useParamsHelper";

export const peripheralPageColumns: MRT_ColumnDef<any>[] = [
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
    header: "Serial No.",
    accessorKey: "gps_serial_no",
    size: 150,
    minSize: 150,
  },
  {
    header: "Type",
    accessorKey: "type_name",
  },
  {
    header: "QTY",
    accessorKey: "qty",
  },
  {
    header: "Peripheral Details",
    accessorKey: "peripheralDetails",
    size: 300,
    Cell: ({ cell }) => {
      const details = cell.getValue<any[]>() || [];
      if (!details.length) return <span>-</span>;
      const { getParam } = useParamsHelper();
      const filterType = getParam("filterType");
      const filterId = getParam("filterId");
      return (
        <Box>
          {details.map((item, idx) => {
            // Determine highlight for brand and model
            const highlightBrand =
              filterType === "brand" &&
              String(filterId) == String(item.brand_id);
            const highlightModel =
              filterType === "model" &&
              String(filterId) == String(item.model_id);

            return (
              <div
                key={idx}
                style={{
                  marginBottom: 4,
                  borderTop: `${
                    idx === 0 ? "" : "1px solid rgb(211, 206, 206)"
                  }`,
                  paddingBottom: 2,
                }}
              >
                <div
                  style={
                    highlightBrand ? { color: "#d7263d", fontWeight: 700 } : {}
                  }
                >
                  <b>Brand:</b> <span>{item.brand_name || "-"}</span>
                </div>
                <div
                  style={
                    highlightModel ? { color: "#d7263d", fontWeight: 700 } : {}
                  }
                >
                  <b>Model:</b> <span>{item.model_name || "-"}</span>
                </div>
                <div>
                  <b>Serial No.:</b> {item.serial_no || "-"}
                </div>
                <div>
                  <b>Warranty:</b> {item.warranty_plan?.name || "-"}
                </div>
              </div>
            );
          })}
        </Box>
      );
    },
  },
];
