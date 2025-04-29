import { Table } from "@mantine/core";

interface Props {
  rows: any[];
  mt?: any;
  mb?: any;
}
const FormTable = ({ rows, mt = 40, mb = 10 }: Props) => {
  return (
    <Table
      withColumnBorders={false}
      withRowBorders={false}
      highlightOnHover={false}
      verticalSpacing="0"
      striped={false}
      mt={mt}
      mb={mb}
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
