import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FormValues } from "../../../utils/types";
import {
  IconChevronDown,
  IconDeviceSim,
  IconPhoneFilled,
  IconSquareLetterMFilled,
  IconUser,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../form/hooks/useGetBrands";
import { useGetModels } from "../../form/hooks/useGetModels";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}

interface Operators {
  operator: string;
  phone_no: string;
}
const SimCardInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [simMode, setSimMode] = useState<string | null>("Single");
  const { data: brandData } = useGetBrands("Operator");
  const { mutate: createBrand } = useCreateBrand();

  const handleDualPhoneNumberChange = (
    index: number,
    field: keyof Operators,
    value: any
  ) => {
    const updatedOperators = [...form.values.operators];
    if (!updatedOperators[index]) {
      updatedOperators[index] = { operator: "", phone_no: "" };
    }
    updatedOperators[index][field] = value;
    form.setFieldValue("operators", updatedOperators);
  };

  console.log("clientData", form.values);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
          <Flex gap={"xl"} direction={"column"} mt={30}>
            <Text>Mode *</Text>
            <Text>First Operator *</Text>
            <Text>First Phone No. *</Text>
            {simMode == "Dual" && (
              <>
                <Text>Second Operator *</Text>
                <Text>Second Phone No. *</Text>
              </>
            )}
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              // placeholder="Select Mode"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={[
                { label: "Single", value: "Single" },
                { label: "Dual", value: "Dual" },
              ]}
              onChange={(value) => setSimMode(value)}
              leftSection={<IconSquareLetterMFilled size={18} />}
            />
            <Select
              // placeholder="Select Operator"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                brandData?.data.data.map((data: any) => ({
                  value: data.name,
                  label: data.name,
                })) || []
              }
              onChange={(value) =>
                handleDualPhoneNumberChange(0, "operator", value)
              }
              leftSection={<IconDeviceSim size={18} />}
              rightSectionPointerEvents="all"
              rightSection={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconChevronDown size={16} style={{ margin: 0 }} />
                  <ActionIcon
                    color={theme.colors.purple[1]}
                    style={{
                      height: 42,
                      width: 35,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      fontSize: 12,
                    }}
                    onClick={open}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <TextInput
              type="number"
              // placeholder="Enter Phone No."
              leftSection={<IconPhoneFilled size={18} />}
              onChange={(e) =>
                handleDualPhoneNumberChange(0, "phone_no", e.target.value)
              }
            />
            {simMode == "Dual" && (
              <>
                <Select
                  // placeholder="Select Operator"
                  searchable
                  comboboxProps={{
                    offset: 0,
                  }}
                  data={
                    brandData?.data.data.map((data: any) => ({
                      value: data.name,
                      label: data.name,
                    })) || []
                  }
                  onChange={(value) =>
                    handleDualPhoneNumberChange(1, "operator", value)
                  }
                  leftSection={<IconDeviceSim size={18} />}
                  rightSectionPointerEvents="all"
                  rightSection={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconChevronDown size={16} style={{ margin: 0 }} />
                      <ActionIcon
                        color={theme.colors.purple[1]}
                        style={{
                          height: 42,
                          width: 35,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          fontSize: 12,
                        }}
                        onClick={open}
                      >
                        Add
                      </ActionIcon>
                    </div>
                  }
                />
                <TextInput
                  type="number"
                  // placeholder="Enter Phone No."
                  leftSection={<IconPhoneFilled size={18} />}
                  onChange={(e) =>
                    handleDualPhoneNumberChange(1, "phone_no", e.target.value)
                  }
                />
              </>
            )}
          </Flex>
        </Grid.Col>
      </Grid>
      <Group mt="md" justify="center">
        <Button
          onClick={() => {}}
          radius={"lg"}
          size="sm"
          bg={theme.colors.purple[1]}
        >
          Continue
        </Button>
      </Group>

      <AddItemModal
        title="Operator"
        opened={opened}
        close={close}
        mutationFn={createBrand}
        type_group={"Operator"}
      />
    </>
  );
};

export default SimCardInfoForm;
