import { Button, Table, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";

type columnProp = {
  column: number;
};
const CreateForm = ({ column }: columnProp) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    owner: "",
    cName: "",
    cPhNo: "",
    address: "",
    vehicalType: "",
    vehicalBrand: "",
    vehicalModel: "",
    vehicalYear: "",
    vehicalPlateNo: "",
    gpsBrand: "",
    gpsModel: "",
    imei: "",
    serialNo: "",
    warranty: "",
    installDate: "",
    subscription: "",
    gpsExpireDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: e.target.value,
    }));
    console.log(inputValues);
  };

  return (
    <>
      {[...Array(column)].map((_, index) => (
        <Table.Tr key={index}>
          {/* <Button onClick={() => setColumn(column + 1)}>Add Column</Button> */}
          {index === 0 && (
            <Table.Td h={30} rowSpan={column}>
              <TextInput
                size="xs"
                w={100}
                value={inputValues.owner}
                onChange={(e) => handleInputChange(e, "owner")}
              />
            </Table.Td>
          )}

          <Table.Td h={30}>
            <TextInput
              size="xs"
              w={100}
              placeholder={`Name ${index + 1}`}
              value={inputValues[`cName${index}`]}
              onChange={(e) => handleInputChange(e, `cName${index}`)}
            />
          </Table.Td>

          <Table.Td h={30}>
            <TextInput
              size="xs"
              w={100}
              placeholder={`Phone ${index + 1}`}
              value={inputValues[`cPhNo${index}`] || ""}
              onChange={(e) => handleInputChange(e, `cPhNo${index}`)}
            />
          </Table.Td>

          {index === 0 && (
            <>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.address}
                  onChange={(e) => handleInputChange(e, "address")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.vehicalType}
                  onChange={(e) => handleInputChange(e, "vehicalType")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.vehicalBrand}
                  onChange={(e) => handleInputChange(e, "vehicalBrand")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.vehicalModel}
                  onChange={(e) => handleInputChange(e, "vehicalModel")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.vehicalYear}
                  onChange={(e) => handleInputChange(e, "vehicalYear")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.vehicalPlateNo}
                  onChange={(e) => handleInputChange(e, "vehicalPlateNo")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.gpsBrand}
                  onChange={(e) => handleInputChange(e, "gpsBrand")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.gpsModel}
                  onChange={(e) => handleInputChange(e, "gpsModel")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.imei}
                  onChange={(e) => handleInputChange(e, "imei")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.serialNo}
                  onChange={(e) => handleInputChange(e, "serialNo")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.warranty}
                  onChange={(e) => handleInputChange(e, "warranty")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.installDate}
                  onChange={(e) => handleInputChange(e, "installDate")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.subscription}
                  onChange={(e) => handleInputChange(e, "subscription")}
                />
              </Table.Td>
              <Table.Td h={30}>
                <TextInput
                  size="xs"
                  w={100}
                  value={inputValues.gpsExpireDate}
                  onChange={(e) => handleInputChange(e, "gpsExpireDate")}
                />
              </Table.Td>
            </>
          )}
        </Table.Tr>
      ))}
    </>
  );
};

export default CreateForm;
