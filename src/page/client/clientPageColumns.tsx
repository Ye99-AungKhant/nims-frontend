import { MRT_ColumnDef } from "mantine-react-table";

export const clientPageColumns: MRT_ColumnDef<any>[] = [
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
  // {
  //   header: "Address",
  //   accessorKey: "address",
  //   size: 300,
  // },
  {
    header: "Primary Contact",
    accessorKey: "contact_name",
  },
  {
    header: "Designation",
    accessorKey: "role",
    size: 150,
    minSize: 150,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
];
