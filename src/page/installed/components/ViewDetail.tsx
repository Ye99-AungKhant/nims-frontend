import { Box, Divider, Group, Paper, Table, Text } from "@mantine/core";
import { IconAddressBook } from "@tabler/icons-react";

interface Props {
  isList?: boolean;
  title: string;
  data: any;
}

const ViewDetail = ({ isList = false, title, data }: Props) => {
  console.log(data);

  return (
    <Paper shadow="sm" style={{ flex: 1 }}>
      <Group
        style={{ borderBottom: "1px solid #dddddd", paddingLeft: "25px" }}
        py="md"
        gap={0}
      >
        <IconAddressBook size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          {title}
        </Text>
      </Group>

      <Box px={30} mt={30} pb={10}>
        <Divider />
        {!isList && data && (
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
                    {item.field}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
        {isList && data}
      </Box>
    </Paper>
  );
};

export default ViewDetail;
