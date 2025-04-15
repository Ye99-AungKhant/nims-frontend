import { Table } from "@mantine/core";

interface Props {
  rows: any[];
}
const FormTable = ({ rows }: Props) => {
  return (
    <Table
      withColumnBorders={false}
      withRowBorders={false}
      highlightOnHover={false}
      verticalSpacing="0"
      striped={false}
      mt={40}
      mb={10}
    >
      <Table.Tbody>
        {rows.map((row, index) => (
          <Table.Tr key={index} style={{ borderBottom: "none" }}>
            <Table.Td
              style={{
                border: "none",
                width: 250,
                paddingBottom: "30px",
              }}
            >
              {row.label}
            </Table.Td>
            <Table.Td style={{ border: "none", paddingBottom: "30px" }}>
              {row.input}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default FormTable;
