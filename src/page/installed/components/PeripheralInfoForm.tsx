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
  IconAlignBoxCenterMiddleFilled,
  IconChevronDown,
  IconListNumbers,
  IconShieldCheckFilled,
  IconSquareLetterBFilled,
  IconSquareLetterMFilled,
  IconSquareLetterTFilled,
  IconUser,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useGetClients } from "../../form/hooks/useGetClients";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetTypes } from "../../form/hooks/useGetTypes";
import { useCreateType } from "../../../hooks/useCreateType";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../form/hooks/useGetBrands";
import { useGetModels } from "../../form/hooks/useGetModels";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const PeripheralInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data: clientData } = useGetClients();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: typeData } = useGetTypes("Sensor");
  const { data: brandData } = useGetBrands("Sensor");
  const { data: modelData } = useGetModels(
    "Sensor",
    Number(form.values.vehicleBrand)
  );
  const { mutate: createType } = useCreateType();
  const { mutate: createModel } = useCreateModel();
  const { mutate: createBrand } = useCreateBrand();

  console.log("clientData", form.values);
  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
          <Flex gap={"xl"} direction={"column"} mt={30}>
            <Text>Sensor Type *</Text>
            <Text>Brand *</Text>
            <Text>Model *</Text>
            <Text>QTY *</Text>
            <Text>Serial *</Text>
            <Text>Warranty *</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              // placeholder="Select Sensor Type"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                typeData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("")}
              leftSection={<IconSquareLetterTFilled size={18} />}
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
                    onClick={() => navigate("/client/create")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              // placeholder="Select Sensor Model"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                typeData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("vehicleType")}
              leftSection={<IconSquareLetterMFilled size={18} />}
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
                    onClick={() => handleModal("Type")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              // placeholder="Select Sensor Brand"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                typeData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("vehicleType")}
              leftSection={<IconSquareLetterBFilled size={18} />}
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
                    onClick={() => handleModal("Type")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <TextInput
              // placeholder="Enter QTY"
              leftSection={<IconListNumbers size={18} />}
              {...form.getInputProps("vehicleYear")}
            />
            <TextInput
              // placeholder="Enter Serial No."
              leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
              {...form.getInputProps("vehicleYear")}
            />
            <Select
              // placeholder="Select Warranty"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                modelData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("vehicleModel")}
              leftSection={<IconShieldCheckFilled size={18} />}
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
                    onClick={() => handleModal("Model")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
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

      {modalType == "Type" && (
        <AddItemModal
          title="Vehicle Type"
          opened={opened}
          close={close}
          mutationFn={createType}
          type_group={"Vehicle"}
        />
      )}
      {modalType == "Brand" && (
        <AddItemModal
          title="Vehicle Brand"
          opened={opened}
          close={close}
          mutationFn={createBrand}
          type_group={"Vehicle"}
        />
      )}
      {modalType == "Model" && (
        <AddItemModal
          title="Vehicle Model"
          opened={opened}
          close={close}
          mutationFn={createModel}
          type_group={"Vehicle"}
          brand_id={Number(form.values.vehicleBrand)}
        />
      )}
    </>
  );
};

export default PeripheralInfoForm;
