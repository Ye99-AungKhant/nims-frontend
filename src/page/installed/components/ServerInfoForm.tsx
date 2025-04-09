import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  MultiSelect,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FormValues } from "../../../utils/types";
import {
  IconBellFilled,
  IconCalendarWeek,
  IconChevronDown,
  IconClipboardDataFilled,
  IconCoinFilled,
  IconSquareLetterTFilled,
  IconUser,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AddItemModal } from "../../../components/common/AddItemModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetTypes } from "../../form/hooks/useGetTypes";
import { useCreateType } from "../../../hooks/useCreateType";
import { useCreateModel } from "../../../hooks/useCreateModel";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetInstallationEngineers } from "../../form/hooks/useGetInstallationEngineer";
import { DateInput } from "@mantine/dates";
import { useGetWarrantyPlans } from "../../form/hooks/useGetWarrantyPlans";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const ServerInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const { data: typeData } = useGetTypes("Server");
  const { data: installationEngineerData } = useGetInstallationEngineers();
  const { data: warrantyData } = useGetWarrantyPlans();

  const { mutate: createType } = useCreateType();
  const { mutate: createModel } = useCreateModel();
  const { mutate: createBrand } = useCreateBrand();

  console.log("clientData", form.values);
  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  const handleServerChange = (field: string, value: string | any) => {
    form.setFieldValue("server", {
      ...form.values.server,
      [field]: value,
    });
  };

  const handleInstallionEngChange = (selectedEng: string[]) => {
    const updatedEng = selectedEng.map((user_id, index) => ({
      user_id,
    }));

    form.setFieldValue("installationEngineer", updatedEng);
  };

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
          <Flex gap={"xl"} direction={"column"} mt={30}>
            <Text>Type *</Text>
            <Text>Domain *</Text>
            <Text>Installation Engineer *</Text>
            <Text>Installation Date *</Text>
            <Text>Subscription Plan *</Text>
            <Text>Invoice No. *</Text>
            <Text>Object-Base Fee *</Text>
            <Text>Expire Date *</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              // placeholder="Select Server Type"
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
              value={form.values.server.type_id}
              onChange={(value: any) => handleServerChange("type_id", value)}
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
                    onClick={() => handleModal("Type")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <TextInput
              // placeholder="Enter domain"
              leftSection={<IconWorld size={18} />}
              {...form.getInputProps("vehiclePlateNo")}
            />
            <MultiSelect
              // placeholder="Select Installation Engineer"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                installationEngineerData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              value={form.values.installationEngineer
                .map((eng) => eng.user_id)
                .filter((eng) => eng !== "")}
              onChange={(value) => handleInstallionEngChange(value)}
              leftSection={<IconUsers size={18} />}
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
                    onClick={() => handleModal("InstallEng")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <DateInput
              // placeholder="Select Installation Date"
              leftSection={<IconCalendarWeek size={18} />}
              value={form.values.server.installed_date}
              onChange={(date) =>
                handleServerChange("installed_date", date || "")
              }
            />
            <Select
              // placeholder="Select Subscription Plan"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                warrantyData?.data?.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              value={form.values.server.subscription_plan_id}
              onChange={(value: any) =>
                handleServerChange("subscription_plan_id", value)
              }
              leftSection={<IconBellFilled size={18} />}
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
                    onClick={() => handleModal("Subscription")}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />

            <TextInput
              // placeholder="Enter Invoice No."
              leftSection={<IconClipboardDataFilled size={18} />}
              withAsterisk
              value={form.values.server.invoice_no}
              onChange={(e) => handleServerChange("invoice_no", e.target.value)}
            />
            <TextInput
              // placeholder="Enter Fee"
              leftSection={<IconCoinFilled size={18} />}
              withAsterisk
              value={form.values.server.object_base_fee}
              onChange={(e) =>
                handleServerChange("object_base_fee", e.target.value)
              }
            />

            <DateInput
              // placeholder="Select expiry Date"
              leftSection={<IconCalendarWeek size={18} />}
              value={form.values.server.expire_date}
              onChange={(date) => handleServerChange("expire_date", date || "")}
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
          Save
        </Button>
      </Group>

      {modalType == "Type" && (
        <AddItemModal
          title="Server Type"
          opened={opened}
          close={close}
          mutationFn={createType}
          type_group={"Server"}
        />
      )}
      {modalType == "InstallEng" && (
        <AddItemModal
          title="Installation Engineer"
          opened={opened}
          close={close}
          mutationFn={createBrand}
          type_group={"Vehicle"}
        />
      )}
      {modalType == "Subscription" && (
        <AddItemModal
          title="Subscription"
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

export default ServerInfoForm;
