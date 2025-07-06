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
import React, { useEffect, useState } from "react";
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
import { useGetTypes } from "../../../hooks/useGetTypes";
import { useCreateType } from "../../../hooks/useCreateType";
import { useGetInstallationEngineers } from "../../../hooks/useGetInstallationEngineer";
import { DateInput } from "@mantine/dates";
import { useGetWarrantyPlans } from "../../../hooks/useGetWarrantyPlans";
import FormTable from "../../../components/common/FormTable";
import { useUpdateType } from "../../../hooks/useUpdateType";
import { useDeleteType } from "../../../hooks/useDeleteType";
import WarrantyPlan from "../../../components/common/WarrantyPlan";
import { useGetBrands } from "../../../hooks/useGetBrands";
import { useCreateBrand } from "../../../hooks/useCreateBrand";
import { useUpdateBrand } from "../../../hooks/useUpdateBrand";
import { useDeleteBrand } from "../../../hooks/useDeleteBrand";
import { useCreateInstallationEngineer } from "../../../hooks/useCreateInstallEngineer";
import { useUpdateInstallEngineer } from "../../../hooks/useUpdateInstallEngineer";
import { useDeleteInstallEngineer } from "../../../hooks/useDeleteInstallEngineer";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const ServerInfoForm = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<any[]>([]);
  const { data: typeData } = useGetTypes("Server");
  const { data: domainData } = useGetBrands(
    "Server",
    Number(form.values.server.type_id)
  );
  const { data: warrantyData } = useGetWarrantyPlans();

  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();

  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();

  const { data: installationEngineerData } = useGetInstallationEngineers();
  const { mutate: createInstallationEngineer } =
    useCreateInstallationEngineer();

  const { mutate: updateInstallationEngineer } = useUpdateInstallEngineer();
  const { mutate: deleteInstallationEngineer } = useDeleteInstallEngineer();

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
    if(field === "domain") {
      setSelectedDomain(value);
    }
  };

  const handleInstallionEngChange = (selectedEng: string[]) => {
    const updatedEng = selectedEng.map((user_id, index) => ({
      user_id,
    }));

    form.setFieldValue("installationEngineer", updatedEng);
  };

  useEffect(() => {
    if (form.values.server.domain) {
      setSelectedDomain(form.values.server.domain);
    }
  }, [form.values.server.domain]);

  const rows = [
    {
      label: "Type *",
      input: (
        <Select
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
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconChevronDown size={16} style={{ marginRight: 20 }} />
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
                onClick={() => handleModal("Type")}
              >
                Add
              </ActionIcon>
            </div>
            }
            error={form.errors[`server.type_id`]}
          />
          ),
        },
        {
          label: "Domain *",
          input: (
          <MultiSelect
            searchable
            comboboxProps={{
            offset: 0,
            }}
            maxValues={
            (() => {
              const selectedType = typeData?.data.data.find(
              (serverType: any) => String(serverType.id) === form.values.server.type_id
              );
              return selectedType?.name.includes("Dual") ? 2 : 1;
            })()
            }
            data={
            domainData?.data.data.map((data: any) => ({
              value: String(data.id),
              label: `${data.name} (${data.type.name})`,
              type_id: String(data.type_id),
            })) || []
            }
            value={selectedDomain?.map((domain:any) => domain)
            .filter((domain:any) => domain !== undefined)}
            onChange={(value: any) => handleServerChange("domain", value)}
            leftSection={<IconWorld size={18} />}
            rightSectionPointerEvents="all"
            rightSectionWidth={90}
            rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconChevronDown size={16} style={{ marginRight: 20 }} />
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
                onClick={() => handleModal("Brand")}
              >
                Add
              </ActionIcon>
            </div>
          }
          error={form.errors[`server.domain`]}
        />
      ),
    },
    {
      label: "Installation Engineer *",
      input: (
        <MultiSelect
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            installationEngineerData?.data?.data?.map((data: any) => ({
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
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconChevronDown size={16} style={{ marginRight: 20 }} />
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
                onClick={() => handleModal("InstallEng")}
              >
                Add
              </ActionIcon>
            </div>
          }
          error={form.errors[`installationEngineer.${0}.user_id`]}
        />
      ),
    },
    {
      label: "Installation Date *",
      input: (
        <DateInput
          leftSection={<IconCalendarWeek size={18} />}
          value={form.values.server.installed_date}
          onChange={(date) => handleServerChange("installed_date", date || "")}
          error={form.errors[`server.installed_date`]}
        />
      ),
    },
    {
      label: "Subscription Plan *",
      input: (
        <Select
          searchable
          comboboxProps={{
            offset: 0,
          }}
          data={
            warrantyData?.data.data.map((data: any) => ({
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
          rightSectionWidth={90}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconChevronDown size={16} style={{ marginRight: 20 }} />
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
                onClick={() => handleModal("Subscription")}
              >
                Add
              </ActionIcon>
            </div>
          }
          error={form.errors[`server.subscription_plan_id`]}
        />
      ),
    },
    {
      label: "Invoice No. *",
      input: (
        <TextInput
          leftSection={<IconClipboardDataFilled size={18} />}
          withAsterisk
          value={form.values.server.invoice_no}
          onChange={(e) => handleServerChange("invoice_no", e.target.value)}
          error={form.errors[`server.invoice_no`]}
        />
      ),
    },
    {
      label: "Object-Base Fee *",
      input: (
        <TextInput
          type="number"
          leftSection={<IconCoinFilled size={18} />}
          withAsterisk
          value={form.values.server.object_base_fee}
          onChange={(e) =>
            handleServerChange("object_base_fee", e.target.value)
          }
          error={form.errors[`server.object_base_fee`]}
        />
      ),
    },
    {
      label: "Expire Date *",
      input: (
        <DateInput
          leftSection={<IconCalendarWeek size={18} />}
          value={form.values.server.expire_date}
          onChange={(date) => handleServerChange("expire_date", date || "")}
          error={form.errors[`server.expire_date`]}
        />
      ),
    },
  ];

  return (
    <>
      <FormTable rows={rows} />

      {modalType == "Type" && (
        <AddItemModal
          title="Server Type"
          opened={opened}
          close={close}
          mutationFn={createType}
          updateMutationFn={updateType}
          deleteMutationFn={deleteType}
          dataList={typeData?.data.data}
          type_group={"Server"}
        />
      )}
      {modalType == "Brand" && (
        <AddItemModal
          title="Server Domain"
          opened={opened}
          close={close}
          isHaveType={true}
          mutationFn={createBrand}
          updateMutationFn={updateBrand}
          deleteMutationFn={deleteBrand}
          selectItem={typeData?.data.data}
          dataList={domainData?.data.data}
          type_group={"Server"}
        />
      )}
      {modalType == "InstallEng" && (
        <AddItemModal
          title="Installation Engineer"
          opened={opened}
          close={close}
          mutationFn={createInstallationEngineer}
          updateMutationFn={updateInstallationEngineer}
          deleteMutationFn={deleteInstallationEngineer}
          dataList={installationEngineerData?.data?.data}
        />
      )}
      {modalType == "Subscription" && (
        <WarrantyPlan
          title="Server Subscription Plan"
          opened={opened}
          close={close}
          type_group={"Server"}
        />
      )}
    </>
  );
};

export default ServerInfoForm;
