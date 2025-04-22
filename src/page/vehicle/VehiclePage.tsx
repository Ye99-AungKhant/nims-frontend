import { Box, Flex, Paper, Table } from "@mantine/core";
import React from "react";
import { useGetTypes } from "../../hooks/useGetTypes";
import { useGetBrands } from "../../hooks/useGetBrands";

export const VehiclePage = () => {
  const { data: typeData } = useGetTypes("Vehicle");
  const { data: brandData } = useGetBrands("Vehicle");

  const typeRows = typeData?.data?.data?.map((element: any, index: number) => (
    <Table.Tr key={index}>
      <Table.Td style={{ fontSize: 17 }}>{index + 1}</Table.Td>
      <Table.Td style={{ fontSize: 17 }}>{element.name}</Table.Td>
    </Table.Tr>
  ));

  const brandrows = brandData?.data?.data?.map(
    (element: any, index: number) => (
      <Table.Tr key={index}>
        <Table.Td style={{ fontSize: 17 }}>{index + 1}</Table.Td>
        <Table.Td style={{ fontSize: 17 }}>{element.name}</Table.Td>
      </Table.Tr>
    )
  );

  return (
    <Box px={30}>
      <Flex>
        <Paper p="lg" shadow="xs">
          <Table verticalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ fontSize: 18 }}>No.</Table.Th>
                <Table.Th style={{ fontSize: 18 }}>Type</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{typeRows}</Table.Tbody>
          </Table>
        </Paper>

        <Paper ml={10} p="lg" shadow="xs">
          <Table verticalSpacing="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ fontSize: 18 }}>No.</Table.Th>
                <Table.Th style={{ fontSize: 18 }}>Brand</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{brandrows}</Table.Tbody>
          </Table>
        </Paper>
      </Flex>
    </Box>
  );
};
