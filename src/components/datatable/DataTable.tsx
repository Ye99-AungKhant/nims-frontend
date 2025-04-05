import {
  type MRT_ColumnDef,
  useMantineReactTable,
  MantineReactTable,
  MRT_TableOptions,
} from "mantine-react-table";
import { useMemo } from "react";
import { Pagination } from "./Pagination";
import { useViewPort } from "../../hooks/ui/useViewPort";
import { useMantineTheme } from "@mantine/core";
// import './DataTable.module.css'

interface TableProps<T extends Record<string, any>> {
  data: T[];
  total?: number;
  isLoading?: boolean;
  columns: MRT_ColumnDef<T>[];
}

export function DataTable<T extends Record<string, any> = object>({
  columns,
  data = [],
  total = 0,
  isLoading,
  ...props
}: TableProps<T> & MRT_TableOptions<T>) {
  const { isMobile } = useViewPort();
  const theme = useMantineTheme();
  const totalPage = useMemo(
    () => total / 10 + (total % 10 === 0 ? 0 : 1),
    [total]
  );

  const table = useMantineReactTable({
    columns,
    data,
    // manualFiltering: true,
    // ui
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableStickyHeader: false,
    enablePinning: true,
    initialState: {
      density: "md",
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    mantineTableContainerProps: {
      style: { maxHeight: "calc(100vh - 16rem)" },
    },
    mantinePaperProps: {
      style: { height: "100%", width: "100%", overflowX: "auto" },
    },
    mantineTableBodyCellProps: {
      style: {
        height: 60,
        color: theme.colors.chocolate[0],
      },
    },
    mantineTableHeadCellProps: {
      style: {
        whiteSpace: "nowrap",
        color: theme.colors.chocolate[0],
      },
    },
    // pagination
    rowCount: total,
    paginationDisplayMode: isMobile ? "default" : "pages",
    mantinePaginationProps: {
      showRowsPerPage: !isMobile,
      rowsPerPageOptions: ["10", "20", "50"],
      withEdges: false,
    },
    // table state
    state: { isLoading },
    enableRowNumbers: true,
    // row actions
    positionActionsColumn: "last",
    enableColumnPinning: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Actions", //change header text
        size: 200,
      },
    },
    defaultColumn: {
      size: 20,
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
    },
    ...props,
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Pagination total={totalPage} />
    </>
  );
}
