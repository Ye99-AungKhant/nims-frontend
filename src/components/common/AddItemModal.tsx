import {
  Button,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useState } from "react";

interface Props {
  opened: boolean;
  close: () => void;
  mutationFn: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    string,
    unknown
  >;
}
export const AddItemModal = ({ opened, close, mutationFn }: Props) => {
  const theme = useMantineTheme();
  const [data, setData] = useState<string>();

  const handleAddDesignation = () => {
    if (!data) return;
    mutationFn(data);
    close();
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered={false}
      title="Add New Designation"
    >
      <TextInput
        label="Designation"
        withAsterisk
        onChange={(e) => setData(e.target.value)}
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
