import {
  Group,
  Pagination as Pg,
  Text,
  useMantineTheme,
  type PaginationProps,
} from "@mantine/core";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import { useMemo } from "react";

export function Pagination(props: PaginationProps) {
  const { getParam, setParams } = useParamsHelper();
  const value = parseInt(getParam("pageNumber") || "1", 10);
  const perPage = parseInt(getParam("pageSize") || "10", 10);
  const totalPage = useMemo(() => Math.ceil(props.total / 10), [props.total]);
  const theme = useMantineTheme();

  const from = (value - 1) * perPage + 1;
  const to = Math.min(value * perPage, props.total);

  const handleChange = (page: number) => {
    setParams({
      pageSize: "10",
      pageIndex: page,
      pageNumber: page,
    });
  };

  return (
    <Group justify="space-between" mt={20}>
      <Text color={theme.colors.purple[0]}>
        Showing {from} to {to} of {props.total} entries
      </Text>
      <Pg.Root
        {...props}
        total={totalPage}
        onChange={handleChange}
        value={value}
        color={theme.colors.primary[3]}
        radius={"lg"}
      >
        <Group gap={5} justify="center">
          <Pg.First />
          <Pg.Previous />
          <Pg.Items />
          <Pg.Next />
          <Pg.Last />
        </Group>
      </Pg.Root>
    </Group>
  );
}
