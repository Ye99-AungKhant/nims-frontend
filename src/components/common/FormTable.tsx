import { Box, Container, Table, Text } from "@mantine/core";
import React from "react";

interface Props {
  rows: any[];
  mt?: any;
  mb?: any;
  isRowtable?: boolean;
}
const FormTable = ({ rows, mt = 40, mb = 10, isRowtable = false }: Props) => {
  return (
    <Table
      withColumnBorders={false}
      withRowBorders={false}
      highlightOnHover={false}
      verticalSpacing="0"
      horizontalSpacing="0"
      striped={false}
      mt={isRowtable ? 0 : mt}
      mb={isRowtable ? 0 : mb}
    >
      <Table.Tbody>
        {rows.map((row, index) => {
          if (isRowtable) {
            return (
              <React.Fragment key={index}>
                <Table.Tr>
                  <Table.Td
                    style={{
                      border: "none",
                      paddingBottom: "5px",
                    }}
                  >
                    {row.label}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td
                    style={{
                      border: "none",
                      paddingBottom: "15px",
                    }}
                  >
                    {row.input}
                  </Table.Td>
                </Table.Tr>
              </React.Fragment>
            );
          } else {
            return (
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
                <Table.Td
                  style={{
                    border: "none",
                    paddingBottom: "30px",
                  }}
                >
                  {row.input}
                </Table.Td>
              </Table.Tr>
            );
          }
        })}
      </Table.Tbody>
    </Table>
  );
};

export default FormTable;
