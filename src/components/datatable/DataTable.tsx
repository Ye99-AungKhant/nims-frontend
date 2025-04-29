import {
  type MRT_ColumnDef,
  useMantineReactTable,
  MantineReactTable,
  MRT_TableOptions,
} from "mantine-react-table";
import { Pagination } from "./Pagination";
import { useViewPort } from "../../hooks/ui/useViewPort";
import { Center, Text, useMantineTheme } from "@mantine/core";
import { useGetRouteParams } from "../../hooks/useGetRouteParams";

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

  const table = useMantineReactTable({
    columns,
    data,

    manualFiltering: true,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    manualPagination: true,
    enableSorting: false,

    initialState: {
      density: "md",
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    mantineTableContainerProps: {
      style: {
        maxHeight: "calc(100vh - 300px)",
      },
    },
    mantinePaperProps: {
      style: {
        height: "100%",
        // width: "100%",
        // overflowX: "auto",
      },
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
        backgroundColor: "white",
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
      showSkeletons: isLoading,
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
        header: "",
        size: 150,
      },
    },
    defaultColumn: {
      size: 10,
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      // withTableBorder: true,
    },
    renderEmptyRowsFallback: () => (
      <Center py="xl" style={{ backgroundColor: "#f0f0f0" }}>
        <Text color="dimmed" fw={500} size="lg">
          NO DATA FOUND!!!
        </Text>
      </Center>
    ),
    ...props,
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Pagination total={0} totalPage={totalPage} totalCount={totalCount} />
    </>
  );
}
