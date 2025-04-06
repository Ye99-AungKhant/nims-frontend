import {
  type MRT_ColumnDef,
  useMantineReactTable,
  MantineReactTable,
  MRT_TableOptions,
  MRT_PaginationState,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { Pagination } from "./Pagination";
import { useViewPort } from "../../hooks/ui/useViewPort";
import { useMantineTheme } from "@mantine/core";
import { useGetRouteParams } from "../../hooks/useGetRouteParams";
// import './DataTable.module.css'

interface TableProps<T extends Record<string, any>> {
  data: T[];
  totalPage?: number;
  totalCount?: number;
  isLoading?: boolean;
  columns: MRT_ColumnDef<T>[];
}

export function DataTable<T extends Record<string, any> = object>({
  columns,
  data = [],
  totalPage = 0,
  totalCount = 0,
  isLoading,
  ...props
}: TableProps<T> & MRT_TableOptions<T>) {
  const { isMobile } = useViewPort();
  const theme = useMantineTheme();
  const { pageIndex, pageSize } = useGetRouteParams();
  // const [pagination, setPagination] = useState<MRT_PaginationState>({
  //   pageIndex: pageIndex ? parseInt(pageIndex) : 0,
  //   pageSize: pageSize ? parseInt(pageSize) : 10,
  // });

  const table = useMantineReactTable({
    columns,
    data,
    // manualFiltering: true,
    // ui
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    manualPagination: true,
    enableSorting: false,
    enableStickyHeader: false,
    enablePinning: true,
    enableColumnResizing: true,
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
        color: theme.colors.chocolate[0],
      },
    },
    mantineTableHeadCellProps: {
      style: {
        whiteSpace: "nowrap",
        color: theme.colors.chocolate[0],
      },
    },
    mantineTableBodyRowProps: {
      style: {
        height: 10,
      },
    },
    // pagination
    rowCount: totalCount,
    paginationDisplayMode: isMobile ? "default" : "pages",
    mantinePaginationProps: {
      showRowsPerPage: !isMobile,
      rowsPerPageOptions: ["10", "20", "50"],
      withEdges: false,
    },
    // table state
    state: {
      isLoading,
      pagination: {
        pageIndex: pageIndex ? parseInt(pageIndex) : 1,
        pageSize: pageSize ? parseInt(pageSize) : 10,
      },
    },
    enableRowNumbers: false,
    // row actions
    positionActionsColumn: "last",
    enableColumnPinning: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Actions", //change header text
        size: 150,
      },
      "mrt-row-numbers": {
        maxSize: 10,
      },
    },
    defaultColumn: {
      size: 10,
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
      <Pagination total={0} totalPage={totalPage} totalCount={totalCount} />
    </>
  );
}
