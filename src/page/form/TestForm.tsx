import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, MultiSelect, Select, Stack } from "@mantine/core";

function TestForm() {
  const form = useForm({
    initialValues: {
      peripheralType: [],
      peripheralBrand: [], // Store brands as an array
    },
  });

  // Sample Data for Peripheral Types & Brands
  const peripheralTypeData = [
    { id: 1, name: "Monitor" },
    { id: 2, name: "Keyboard" },
    { id: 3, name: "Mouse" },
  ];

  const peripheralsBrandData = [
    { id: 101, name: "Brand A", typeId: 1 },
    { id: 102, name: "Brand B", typeId: 1 },
    { id: 103, name: "Brand C", typeId: 2 },
    { id: 104, name: "Brand D", typeId: 3 },
  ];

  // Selected peripheral types from MultiSelect
  const selectedPeripheralTypes = form.values.peripheralType;

  // Update the brand selection in the array
  const handleBrandChange = (typeId: string, value: string) => {
    form.setFieldValue("peripheralBrand", {
      ...form.values.peripheralBrand,
      [typeId]: value,
    });
  };

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* MultiSelect for Peripheral Type */}
      <MultiSelect
        label="Peripheral Type"
        placeholder="Select Peripheral Type"
        data={peripheralTypeData.map((data) => ({
          value: String(data.id),
          label: data.name,
        }))}
        {...form.getInputProps("peripheralType")}
      />

      {/* Dynamically generate Select components for each selected type */}
      <Stack mt="md">
        {selectedPeripheralTypes.map((typeId, index) => {
          const filteredBrands = peripheralsBrandData.filter(
            (brand) => brand.typeId === Number(typeId)
          );

          return (
            <Select
              key={typeId}
              label={`Brand for ${
                peripheralTypeData.find((t) => t.id === Number(typeId))?.name
              }`}
              placeholder="Select Brand"
              data={filteredBrands.map((brand) => ({
                value: String(brand.id),
                label: brand.name,
              }))}
              value={form.values.peripheralBrand[typeId] || ""}
              onChange={(value: any) => handleBrandChange(typeId, value)}
            />
          );
        })}
      </Stack>
      <Button type="submit" variant="outline" color="blue">
        Submit
      </Button>
    </form>
  );
}

export default TestForm;
