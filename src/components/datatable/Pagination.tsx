import { Group, Pagination as Pg, type PaginationProps } from "@mantine/core";
import { useParamsHelper } from "../../hooks/useParamsHelper";

export function Pagination(props: PaginationProps) {
  const { getParam, setParams } = useParamsHelper();
  const value = parseInt(getParam("pageNumber") || "1", 10);

  const handleChange = (page: number) => {
    setParams({
      pageSize: "10",
      pageIndex: page,
      pageNumber: page,
    });
  };

  return (
    <Group justify="space-between" mt={20}>
      <span />
      <Pg {...props} onChange={handleChange} value={value} />
    </Group>
  );
}
