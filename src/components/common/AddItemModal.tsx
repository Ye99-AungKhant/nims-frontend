import {
  Button,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

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
      <TextInput
        label={title}
        withAsterisk
        onChange={(e) => setName(e.target.value)}
      />
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
