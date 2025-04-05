import {
  Group,
  Pagination as Pg,
  Text,
  useMantineTheme,
  type PaginationProps,
} from "@mantine/core";
import { useParamsHelper } from "../../hooks/useParamsHelper";

export function Pagination(props: PaginationProps) {
  const { getParam, setParams } = useParamsHelper();
  const value = parseInt(getParam("pageNumber") || "1", 10);
  const theme = useMantineTheme();

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
        Showing 1 to 3 of {props.total} entries
      </Text>
      <Pg.Root
        {...props}
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
