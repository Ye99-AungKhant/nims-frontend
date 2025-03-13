import { Table, ScrollArea, Text } from "@mantine/core";
import React, { useState } from "react";
import CreateForm from "./CreateForm";

const styles = {
  tableHeader: {
    backgroundColor: "#228BE6",
    color: "#f1f1f1",
  },
  th: {
    textAlign: "center",
  },
};
const data = [
  {
    owner: "John Doe",
    contact: [
      {
        name: "Alex",
        phone: "09124445",
      },
      {
        name: "Alex",
        phone: "09124445",
      },
    ],
    address: "New York, USA",
    type: "SUV",
    brand: "Toyota",
    model: "RAV4",
    year: 2022,
    plateNo: "XYZ-1234",
    gpsBrand: "Garmin",
    gpsModel: "GTR-500",
    imei: "123456789012345",
    serial: "SN-987654",
    warranty: "2 Years",
    installationDate: "2024-01-15",
    subscription: "1 month",
    expireDate: "2024-02-15",
  },
  {
    owner: "John Doe",
    contact: [
      {
        name: "Alex",
        phone: "09124445",
      },
    ],
    address: "New York, USA",
    type: "SUV",
    brand: "Toyota",
    model: "RAV4",
    year: 2022,
    plateNo: "XYZ-1234",
    gpsBrand: "Garmin",
    gpsModel: "GTR-500",
    imei: "123456789012345",
    serial: "SN-987654",
    warranty: "2 Years",
    installationDate: "2024-01-15",
    subscription: "1 month",
    expireDate: "2024-02-15",
  },
];

type ShowCreateFormProps = {
  visible: boolean;
};

export const ListTable: React.FC<ShowCreateFormProps> = ({ visible }) => {
  const [column, setColumn] = useState(1);
  return (
    <Table.ScrollContainer minWidth={500} type="native">
      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr style={[styles.tableHeader, { fontSize: "16px" }]}>
            <Table.Th colSpan={3} style={{ textAlign: "center" }}>
              Client Information
            </Table.Th>
            <Table.Th colSpan={5} style={{ textAlign: "center" }}>
              Vehicle Information
            </Table.Th>
            <Table.Th colSpan={9} style={{ textAlign: "center" }}>
              GPS TRACER
            </Table.Th>
          </Table.Tr>
          <Table.Tr style={styles.tableHeader}>
            <Table.Th>Owner</Table.Th>
            <Table.Th colSpan={2} style={{ textAlign: "center" }}>
              Contact
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ color: "#fff" }}>Name</Text>
                <Text style={{ color: "#fff" }}>Phone No.</Text>

                <Text onClick={() => setColumn(column + 1)}>Add</Text>
              </div>
            </Table.Th>
            <Table.Th style={{ textAlign: "center" }}>
              Address/Location
            </Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Type</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Brand</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Model</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Year</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Plate No.</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Brand</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Model</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>IMEI</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>SERIAL</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>WARRANTY</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>
              Installation Date
            </Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Subscription</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Expire Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {visible && <CreateForm column={column} />}
          {data.map((item, index) => {
            const contactCount = item.contact.length;
            return (
              <React.Fragment key={index}>
                {item.contact.map((cnt, i) => (
                  <Table.Tr key={i}>
                    {/* Merge owner column only in the first contact row */}
                    {i === 0 && (
                      <Table.Td rowSpan={contactCount}>{item.owner}</Table.Td>
                    )}

                    {/* Display Name and Phone normally */}
                    <Table.Td>{cnt.name}</Table.Td>
                    <Table.Td>{cnt.phone}</Table.Td>

                    {/* Merge address and type columns only in the first contact row */}
                    {i === 0 && (
                      <>
                        <Table.Td rowSpan={contactCount}>
                          {item.address}
                        </Table.Td>
                        <Table.Td rowSpan={contactCount}>{item.type}</Table.Td>
                        <Table.Td rowSpan={contactCount}>{item.brand}</Table.Td>
                        <Table.Td rowSpan={contactCount}>{item.model}</Table.Td>
                        <Table.Td rowSpan={contactCount}>{item.year}</Table.Td>
                        <Table.Td
                          rowSpan={contactCount}
                          style={{ width: "100px" }}
                        >
                          {item.plateNo}
                        </Table.Td>
                        <Table.Td rowSpan={contactCount}>
                          {item.gpsBrand}
                        </Table.Td>
                        <Table.Td
                          rowSpan={contactCount}
                          style={{ width: "100px" }}
                        >
                          {item.gpsModel}
                        </Table.Td>
                        <Table.Td rowSpan={contactCount}>{item.imei}</Table.Td>
                        <Table.Td
                          rowSpan={contactCount}
                          style={{ width: "100px" }}
                        >
                          {item.serial}
                        </Table.Td>
                        <Table.Td rowSpan={contactCount}>
                          {item.warranty}
                        </Table.Td>
                        <Table.Td
                          rowSpan={contactCount}
                          style={{ width: "100px" }}
                        >
                          {item.installationDate}
                        </Table.Td>
                        <Table.Td rowSpan={contactCount}>
                          {item.subscription}
                        </Table.Td>
                        <Table.Td
                          rowSpan={contactCount}
                          style={{ width: "100px" }}
                        >
                          {item.expireDate}
                        </Table.Td>
                      </>
                    )}
                  </Table.Tr>
                ))}
              </React.Fragment>
            );
          })}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
