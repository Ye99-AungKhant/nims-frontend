import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  Loader,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
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
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useGetBrands } from "../../../hooks/useGetBrands";
import FormTable from "../../../components/common/FormTable";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "../../../hooks/useDeleteBrand";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  isRowtable?: boolean;
  disableDual?: boolean;
}

interface Operators {
  operator: string;
  phone_no: string;
}
const SimCardInfoForm = ({
  form,
  isRowtable = false,
  disableDual = false,
}: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSim, setSelectedSim] = useState(
    form.values.operators.length === 1 ? "SINGLE" : "DUAL"
  );
  const { data: brandData, isLoading: isBrandLoading } =
    useGetBrands("Operator");
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();

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

    if (!isRowtable) {
      form.setFieldValue("operators", updatedOperators);
    } else {
      const opt = updatedOperators.map((item, i) => {
        if (index == i) {
          return {
            ...item,
            is_replacement: true,
          };
        }
        return item;
      });

      form.setFieldValue("operators", opt);
    }
  };
  console.log("clientData", form.values);

  const rows = [
    {
      label: `${!disableDual ? "Mode *" : ""}`,
      input: (
        <Group>
          {!disableDual && (
            <>
              <Checkbox
                label="SINGLE SIM"
                size="sm"
                radius={"sm"}
                checked={selectedSim === "SINGLE"}
                onChange={() => setSelectedSim("SINGLE")}
                color={theme.colors.purple[1]}
              />
              <Checkbox
                label="DUAL SIM"
                size="sm"
                radius={"sm"}
                checked={selectedSim === "DUAL"}
                onChange={() => setSelectedSim("DUAL")}
                color={theme.colors.purple[1]}
              />
            </>
          )}
        </Group>
      ),
    },
    {
      label: selectedSim === "DUAL" ? "First Operator *" : "Operator *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          value={form.values.operators[0]?.operator}
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
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isBrandLoading ? (
                <Box mr={20} mt={"xs"}>
                  <Loader size={16} />
                </Box>
              ) : (
                <IconChevronDown size={16} style={{ marginRight: 20 }} />
              )}
              <ActionIcon
                color={theme.colors.purple[1]}
                style={{
                  height: 42,
                  width: 60,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  fontSize: " var(--mantine-font-size-sm)",
                }}
                fw={500}
                onClick={open}
              >
                Add
              </ActionIcon>
            </div>
          }
          error={form.errors[`operators.${0}.operator`]}
        />
      ),
    },
    {
      label: selectedSim === "DUAL" ? "First Phone No. *" : "Phone No. *",
      input: (
        <TextInput
          type="number"
          leftSection={<IconPhoneFilled size={18} />}
          value={form.values.operators[0]?.phone_no}
          onChange={(e) =>
            handleDualPhoneNumberChange(0, "phone_no", e.target.value)
          }
          error={form.errors[`operators.${0}.phone_no`]}
        />
      ),
    },
    {
      label: "Second Operator *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          value={form.values.operators[1]?.operator}
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
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isBrandLoading ? (
                <Box mr={20} mt={"xs"}>
                  <Loader size={16} />
                </Box>
              ) : (
                <IconChevronDown size={16} style={{ marginRight: 20 }} />
              )}
              <ActionIcon
                color={theme.colors.purple[1]}
                style={{
                  height: 42,
                  width: 60,
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
          error={form.errors[`operators.${1}.operator`]}
        />
      ),
    },
    {
      label: "Second Phone No. *",
      input: (
        <TextInput
          type="number"
          leftSection={<IconPhoneFilled size={18} />}
          value={form.values.operators[1]?.phone_no}
          onChange={(e) =>
            handleDualPhoneNumberChange(1, "phone_no", e.target.value)
          }
          error={form.errors[`operators.${1}.phone_no`]}
        />
      ),
    },
  ];

  const rowFilter =
    selectedSim === "DUAL" ? rows : rows.slice(0, rows.length - 2);

  return (
    <>
      <FormTable rows={rowFilter} isRowtable={isRowtable} />
      <AddItemModal
        title="Operator"
        opened={opened}
        close={close}
        mutationFn={createBrand}
        updateMutationFn={updateBrand}
        deleteMutationFn={deleteBrand}
        selectItem={brandData?.data.data}
        dataList={brandData?.data.data}
        type_group={"Operator"}
      />
    </>
  );
};

export default SimCardInfoForm;
