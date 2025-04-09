import {
  Button,
  Group,
  Modal,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useGetRoles } from "../../page/form/hooks/useGetRoles";

interface MutateProps {
  name: string;
  type_group: any;
  brand_id?: number;
}
interface Props {
  title: string;
  type_group?: any;
  brand_id?: number;
  opened: boolean;
  close: () => void;
  mutationFn: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    MutateProps | string,
    unknown
  >;
}
export const AddItemModal = ({
  title,
  type_group,
  brand_id,
  opened,
  close,
  mutationFn,
}: Props) => {
  const theme = useMantineTheme();
  const [name, setName] = useState<string>();
  const { data: roleData, isLoading: isRoleLoading } = useGetRoles();

  const handleAddDesignation = () => {
    if (!name) return;
    if (type_group) {
      mutationFn({ name, type_group, brand_id });
    } else {
      mutationFn(name);
    }
    close();
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered={false}
      title={`Add New ${title}`}
    >
      {title !== "Installation Engineer" ? (
        <TextInput
          label={title}
          withAsterisk
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <TextInput
            label="Name"
            withAsterisk
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            withAsterisk
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Phone No."
            withAsterisk
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            label="Role"
            withAsterisk
            comboboxProps={{
              offset: 0,
            }}
            data={
              roleData?.data?.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
          />
        </>
      )}
      <Group mt="md" gap="md" justify="right">
        <Button
          radius={"lg"}
          size="sm"
          color={theme.colors.purple[1]}
          onClick={handleAddDesignation}
        >
          Save
        </Button>
        <Button radius={"lg"} size="sm" onClick={close} color="gray">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
