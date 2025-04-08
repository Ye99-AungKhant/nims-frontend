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
import { IconChevronDown, IconUser } from "@tabler/icons-react";
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
const SimCardInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [simMode, setSimMode] = useState<string | null>("Single");
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
            <Text>Mode *</Text>
            <Text>First Operator *</Text>
            <Text>First Phone No. *</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              placeholder="Select Mode"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={[
                { label: "Single", value: "Single" },
                { label: "Dual", value: "Dual" },
              ]}
              onChange={(value) => setSimMode(value)}
              leftSection={<IconUser size={16} />}
            />
            <Select
              placeholder="Select Operator"
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
              leftSection={<IconUser size={16} />}
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
              type="number"
              leftSection={""}
              {...form.getInputProps("imei")}
            />
            {simMode == "Dual" && (
              <>
                <Select
                  placeholder="Select Operator"
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
                  leftSection={<IconUser size={16} />}
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
                  type="number"
                  leftSection={""}
                  {...form.getInputProps("imei")}
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

export default SimCardInfoForm;
