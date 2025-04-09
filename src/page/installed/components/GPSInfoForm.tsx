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
  IconShieldCheckFilled,
  IconSquareLetterBFilled,
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
import { DateInput } from "@mantine/dates";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const GPSInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: brandData } = useGetBrands("GPS");
  const { data: modelData } = useGetModels("GPS", Number(form.values.gpsBrand));
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
            <Text>Brand *</Text>
            <Text>Model *</Text>
            <Text>IMEI/UID *</Text>
            <Text>Serial *</Text>
            <Text>Warranty *</Text>
            {/* <Text>Installation Date *</Text> */}
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              // placeholder="Select Device Brand"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                brandData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("gpsBrand")}
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
                    onClick={() => handleModal("Brand")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              // placeholder="Select Device Model"
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
              {...form.getInputProps("gpsModel")}
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
                    onClick={() => handleModal("Model")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <TextInput
              // placeholder="Enter IMEI No."
              leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
              {...form.getInputProps("imei")}
            />
            <TextInput
              // placeholder="Enter Serial No."
              leftSection={<IconAlignBoxCenterMiddleFilled size={18} />}
              {...form.getInputProps("gpsSerial")}
            />
            <Select
              // placeholder="Select Warranty"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                brandData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("warranty")}
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
                    onClick={() => handleModal("Brand")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            {/* <DateInput
                            label={`Select Warranty Expiry Date`}
                            // placeholder="Select warranty Expiry Date"
                            {...form.getInputProps("")}
                          /> */}
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

      {modalType == "Brand" && (
        <AddItemModal
          title="GPS Brand"
          opened={opened}
          close={close}
          mutationFn={createBrand}
          type_group={"GPS"}
        />
      )}
      {modalType == "Model" && (
        <AddItemModal
          title="GPS Model"
          opened={opened}
          close={close}
          mutationFn={createModel}
          type_group={"GPS"}
          brand_id={Number(form.values.vehicleBrand)}
        />
      )}
    </>
  );
};

export default GPSInfoForm;
