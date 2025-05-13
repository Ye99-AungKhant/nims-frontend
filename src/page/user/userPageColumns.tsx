import { MRT_ColumnDef } from "mantine-react-table";

export const userPageColumns: MRT_ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
];
