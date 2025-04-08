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
const VehicleInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data: clientData } = useGetClients();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: vehicleTypeData } = useGetTypes("Vehicle");
  const { data: vehicleBrandData } = useGetBrands("Vehicle");
  const { data: vehicleModelData } = useGetModels(
    "Vehicle",
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
            <Text>Company Name *</Text>
            <Text>Type *</Text>
            <Text>Plate No. *</Text>
            <Text>Make *</Text>
            <Text>Model *</Text>
            <Text>Year *</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              placeholder="Select Client"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                clientData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("client")}
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
                    onClick={() => navigate("/client/create")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              placeholder="Select Vehicle Type"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                vehicleTypeData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("vehicleType")}
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
                    onClick={() => handleModal("Type")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <TextInput
              leftSection={""}
              {...form.getInputProps("vehiclePlateNo")}
            />
            <Select
              placeholder="Select Vehicle Brand"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                vehicleBrandData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("vehicleBrand")}
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
                    onClick={() => handleModal("Brand")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              placeholder="Select Vehicle Model"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                vehicleModelData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("vehicleModel")}
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
              leftSection={""}
              {...form.getInputProps("vehicleYear")}
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

export default VehicleInfoForm;
