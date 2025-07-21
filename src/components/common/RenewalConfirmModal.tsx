import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  MultiSelect,
  Select,
  Text,
  TextInput,
  useMantineTheme,
  useModalsStack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, UseFormReturnType, zodResolver } from "@mantine/form";
import {
  IconBellFilled,
  IconCalendarWeek,
  IconChevronDown,
  IconClipboardDataFilled,
  IconCoinFilled,
  IconSquareLetterTFilled,
  IconWorld,
} from "@tabler/icons-react";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useGetWarrantyPlans } from "../../hooks/useGetWarrantyPlans";
import { useGetTypes } from "../../hooks/useGetTypes";
import { useGetBrands } from "../../hooks/useGetBrands";
import { useRenewalInstallObject } from "../../hooks/useRenewalInstallObject";
import { useCreateType } from "../../hooks/useCreateType";
import { useUpdateType } from "../../hooks/useUpdateType";
import { useDeleteType } from "../../hooks/useDeleteType";
import { useUpdateBrand } from "../../hooks/useUpdateBrand";
import { useDeleteBrand } from "../../hooks/useDeleteBrand";
import { useCreateBrand } from "../../hooks/useCreateBrand";
import { useEffect, useState } from "react";
import { AddItemModal } from "./AddItemModal";
import WarrantyPlan from "./WarrantyPlan";
import { useDisclosure } from "@mantine/hooks";
import { renewalformSchema } from "../../page/installed/components/InstallValidation";

interface Props {
  openedMainModel: boolean;
  onClose: () => void;
  onClick: any;
  title: string;
  description: string;
  isloading: boolean;
  data: any;
}

const RenewalConfirmModal = ({
  openedMainModel,
  onClose,
  onClick,
  title,
  description,
  isloading,
  data,
}: Props) => {
  const theme = useMantineTheme();
  const [modalType, setModalType] = useState("confirm-page");
  const [opened, { open, close }] = useDisclosure(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const form = useForm({
    initialValues: {
      id: data.server_id,
      renewalDate: new Date(),
      expireDate: "",
      subscriptionPlan: String(data.subscription_plan_id),
      objectBaseFee: data.object_base_fee,
      type: String(data.type_id),
      domain: [
        String(data.domain_id),
        ...(data?.extra_server[0]?.domain_id
          ? [String(data?.extra_server[0]?.domain_id)]
          : []),
      ],
      invoiceNo: "",
    },
    validate: zodResolver(renewalformSchema),
  });

  const { data: warrantyData } = useGetWarrantyPlans();
  const { data: typeData } = useGetTypes("Server");
  const { mutate, isPending } = useRenewalInstallObject();
  const { data: domainData } = useGetBrands("Server", Number(form.values.type));

  const { mutate: createType } = useCreateType();
  const { mutate: updateType } = useUpdateType();
  const { mutate: deleteType } = useDeleteType();

  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const { mutate: deleteBrand } = useDeleteBrand();

  const handleSubmit = (values: any) => {
    const payloadData = {
      ...values,
      extra_server_id: data?.extra_server[0]?.id,
    };
    mutate(payloadData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleModal = (name: string) => {
    setModalType(name);
    open();
  };

  const handleCloseConfirmModals = () => {
    setOpenConfirmActionModal(false);
    onClose();
  };

  form.watch("type", ({ value }) => {
    form.setValues({ domain: undefined });
  });

  console.log("form values", form.values);

  return (
    <>
      <Modal
        opened={openedMainModel}
        onClose={onClose}
        title={
          <Text size="xl" fw={700} c={"dark"}>
            {title}
          </Text>
        }
        centered={false}
      >
        <Center>{description}</Center>
        <Group m="md" gap="md" justify="right">
          <Button
            radius={"lg"}
            size="sm"
            onClick={handleCloseConfirmModals}
            color="gray"
          >
            Cancel
          </Button>
          <Button
            radius={"lg"}
            size="sm"
            onClick={() => setOpenConfirmActionModal(true)}
            loading={isloading}
            color={theme.colors.purple[1]}
          >
            Confirm
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={openConfirmActionModal}
        onClose={onClose}
        title={
          <Text size="xl" fw={700} c={"dark"}>
            Renewal
          </Text>
        }
        centered={false}
        size={"lg"}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex p="md" direction={"column"} gap={"md"}>
            <DateInput
              label="Renewal Date"
              withAsterisk
              leftSection={<IconCalendarWeek size={18} />}
              {...form.getInputProps("renewalDate")}
            />

            <DateInput
              label="Expire Date"
              withAsterisk
              leftSection={<IconCalendarWeek size={18} />}
              {...form.getInputProps("expireDate")}
            />

            <Select
              label="Subscription Plan"
              withAsterisk
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
              {...form.getInputProps("subscriptionPlan")}
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
            />

            <TextInput
              label="Object-Base Fee"
              leftSection={<IconCoinFilled size={18} />}
              withAsterisk
              {...form.getInputProps("objectBaseFee")}
            />

            <Select
              label="Type"
              withAsterisk
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
              {...form.getInputProps("type")}
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
            />

            <MultiSelect
              label="Domain"
              withAsterisk
              searchable
              comboboxProps={{
                offset: 0,
              }}
              maxValues={(() => {
                const selectedType = typeData?.data.data.find(
                  (serverType: any) =>
                    String(serverType.id) === form.values.type
                );
                return selectedType?.name.includes("Dual") ? 2 : 1;
              })()}
              data={
                domainData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                  type_id: String(data.type_id),
                })) || []
              }
              {...form.getInputProps("domain")}
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
            />

            <TextInput
              label="Invoice No."
              leftSection={<IconClipboardDataFilled size={18} />}
              withAsterisk
              {...form.getInputProps("invoiceNo")}
            />
          </Flex>
          <Divider />
          <Group m="md" gap="md" justify="right">
            <Button
              radius={"lg"}
              size="sm"
              onClick={handleCloseConfirmModals}
              color="gray"
            >
              Close
            </Button>
            <Button
              radius={"lg"}
              size="sm"
              loading={isPending}
              type="submit"
              color={theme.colors.purple[1]}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>

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

export default RenewalConfirmModal;
