import { Select, SelectProps } from "@mantine/core";
import { useParamsHelper } from "../../hooks/useParamsHelper";
import { IconCaretDown } from "@tabler/icons-react";

const pageSize = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
];

export function PageSizeSelect(props: Omit<SelectProps, "data">) {
  const { setParams, getParam } = useParamsHelper();

  return (
    <Select
      defaultValue={getParam("pageSize") ?? "10"}
      variant="filled"
      //   styles={{ rightSection: { pointerEvents: "none" } }}
      rightSection={<IconCaretDown size="16px" />}
      size="xs"
      miw="70px"
      w="70px"
      data={pageSize}
      onChange={(value) => {
        setParams({
          pageIndex: "1",
          pageSize: value,
        });
      }}
      {...props}
    />
  );
}
