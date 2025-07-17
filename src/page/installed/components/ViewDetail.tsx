import { Box, Divider, Group, Paper, Table, Text } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  isList?: boolean;
  title: string;
  data?: any;
  children?: ReactNode | ReactNode[];
  Icon: any;
}

const ViewDetail = ({ isList = false, title, data, children, Icon }: Props) => {
  return (
    <Paper shadow="sm" w={{ base: "100%", md: "31%" }} style={{ flex: 1 }}>
      <Group
        style={{ borderBottom: "1px solid #dddddd" }}
        py={{ base: 15, sm: "md" }}
        pl={{ base: 15, sm: 30 }}
        gap={0}
      >
        <Icon size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          {title}
        </Text>
      </Group>

      <Box px={{ base: 15, sm: 30 }} py={{ base: 20, sm: 30 }}>
        <Divider />
        {!isList && data && (
          <Table.ScrollContainer minWidth={"auto"}>
            <Table variant="vertical">
              <Table.Tbody>
                {data.map((item: any, index: number) => (
                  <Table.Tr h={50} key={index}>
                    <Table.Th
                      w={300}
                      style={{
                        color: "#684498",
                        backgroundColor: "#fff",
                      }}
                    >
                      {item.label}
                    </Table.Th>
                    <Table.Td
                      style={{
                        color: "#707070",
                      }}
                    >
                      {item.field || "-"}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
        {isList && children}
      </Box>
    </Paper>
  );
};

export default ViewDetail;
