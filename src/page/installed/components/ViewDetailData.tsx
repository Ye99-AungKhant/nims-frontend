import { Center, Table, Text } from "@mantine/core";
import "../../../assets/styles/ultis.css";
import dayjs from "dayjs";

export const clientData = (data: any) => [
  { label: "Company", field: data.name },
  { label: "Primary Contact", field: data.contact_person[0]?.name },
  { label: "Designation", field: data.contact_person[0]?.role?.name },
  { label: "Email", field: data.contact_person[0]?.email },
  { label: "Phone", field: data.contact_person[0]?.phone },
  { label: "Address", field: data.contact_person[0]?.address },
];

export const contactPersonData = (data: any) => {
  return (
    <Table striped highlightOnHover withRowBorders>
      <Table.Thead h={50}>
        <Table.Tr>
          <Table.Th style={{ color: "#474747" }}>Name</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Phone</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Email</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Designation</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length ? (
          data.map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td style={{ color: "#474747" }}>{item.name}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>
                {item.role?.name}
              </Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.email}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.phone}</Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Center py={"md"}>
                <Text color="dimmed">NO DATA FOUND!!!</Text>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export const vehicleData = (data: any) => [
  { label: "Type", field: data.type.name },
  { label: "Brand", field: data.brand.name },
  { label: "Model", field: data.brand.model[0].name },
  { label: "Year", field: data.year },
  { label: "Plate No.", field: data.plate_number },
  { label: "Odometer/Engine Hour", field: data.odometer },
];

// export const gpsDeviceData = (data: any) => [
//   { label: "Brand", field: data.brand.name },
//   { label: "Model", field: data.brand.model[0].name },
//   { label: "IMEI/UID", field: data.imei },
//   { label: "Serial No.", field: data.serial_no },
//   { label: "Warranty", field: data.warranty_plan.name },
// ];

export const gpsDeviceData = (data: any) => {
  return (
    <Table striped highlightOnHover withRowBorders>
      <Table.Thead h={50}>
        <Table.Tr>
          <Table.Th style={{ color: "#474747" }}>Brand</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Model</Table.Th>
          <Table.Th style={{ color: "#474747" }}>IMEI/UID</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Serial No.</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Warranty</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data ? (
          <Table.Tr>
            <Table.Td style={{ color: "#474747" }}>{data.brand.name}</Table.Td>
            <Table.Td style={{ color: "#474747" }}>
              {data.brand.model[0].name}
            </Table.Td>
            <Table.Td style={{ color: "#474747" }}>{data.imei}</Table.Td>
            <Table.Td style={{ color: "#474747" }}>{data.serial_no}</Table.Td>
            <Table.Td style={{ color: "#474747" }}>
              {data.warranty_plan.name}
            </Table.Td>
          </Table.Tr>
        ) : (
          <Table.Tr>
            <Table.Td colSpan={5}>
              <Center py={"md"}>
                <Text color="dimmed">NO DATA FOUND!!!</Text>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export const simCardData = (data: any) => {
  return (
    <Table striped highlightOnHover withRowBorders>
      <Table.Thead h={50}>
        <Table.Tr>
          <Table.Th style={{ color: "#474747" }}>Operator</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Phone No.</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length ? (
          data.map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td style={{ color: "#474747" }}>{item.operator}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.phone_no}</Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={2}>
              <Center py={"md"}>
                <Text color="dimmed">NO DATA FOUND!!!</Text>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export const peripheralData = (data: any) => {
  return (
    <Table striped highlightOnHover withRowBorders>
      <Table.Thead h={50}>
        <Table.Tr>
          <Table.Th style={{ color: "#474747" }}>Type</Table.Th>
          <Table.Th style={{ color: "#474747" }}>QTY</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Brand</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Model</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Warranty</Table.Th>
          <Table.Th style={{ color: "#474747" }}>Serial No.</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length ? (
          data.map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td style={{ color: "#474747" }}>{item.type.name}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.qty}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>
                {item.peripheralDetail.map((peri: any) => (
                  <span key={peri.id}>
                    {peri.brand.name}
                    <br />
                  </span>
                ))}
              </Table.Td>
              <Table.Td style={{ color: "#474747" }}>
                {item.peripheralDetail.map((peri: any) => (
                  <span key={peri.id}>
                    {peri.model.name}
                    <br />
                  </span>
                ))}
              </Table.Td>
              <Table.Td style={{ color: "#474747" }}>
                {item.peripheralDetail.map((peri: any) => (
                  <span key={peri.id}>
                    {peri.warranty_plan.name}
                    <br />
                  </span>
                ))}
              </Table.Td>
              <Table.Td style={{ color: "#474747" }}>
                {item.peripheralDetail.map((peri: any) => (
                  <span key={peri.id}>
                    {peri.serial_no}
                    <br />
                  </span>
                ))}
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={6}>
              <Center py={"md"}>
                <Text color="dimmed">NO DATA FOUND!!!</Text>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export const serverData = (data: any) => [
  { label: "Type", field: data.type.name },
  { label: "Domain", field: data.domain.name },
  { label: "Object Base Fee", field: data.object_base_fee },
  { label: "Invoice No.", field: data.invoice_no },
  {
    label: "Status",
    field: (
      <span
        style={{
          backgroundColor: `${
            data.status === "Active" ? "#ABC37B" : "#F15D60"
          } `,
          color: "white",
          padding: "3px 10px",
          borderRadius: 20,
        }}
      >
        {data.status}
      </span>
    ),
  },
  {
    label: "Installed Date",
    field: dayjs(data.installed_date).format("DD-MM-YYYY"),
  },
  { label: "Expiry Date", field: dayjs(data.expire_date).format("DD-MM-YYYY") },
  { label: "Subscription Plan", field: data.warranty_plan.name },
];

export const accessoryData = (data: any) => {
  return (
    <Table striped highlightOnHover withRowBorders>
      <Table.Thead h={50}>
        <Table.Tr>
          <Table.Th style={{ color: "#474747" }}>Type</Table.Th>
          <Table.Th style={{ color: "#474747" }}>QTY</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length ? (
          data.map((item: any) => (
            <Table.Tr key={item.id}>
              <Table.Td style={{ color: "#474747" }}>{item.type.name}</Table.Td>
              <Table.Td style={{ color: "#474747" }}>{item.qty}</Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={2}>
              <Center py={"md"}>
                <Text color="dimmed">NO DATA FOUND!!!</Text>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};
