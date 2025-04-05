import {
  Button,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

interface Props {
  opened: boolean;
  close: () => void;
}
export const AddItemModal = ({ opened, close }: Props) => {
  const theme = useMantineTheme();
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered={false}
      title="Add New Designation"
    >
      <TextInput label="Designation" withAsterisk />
      <Group mt="md" gap="md" justify="right">
        <Button radius={"lg"} size="sm" color={theme.colors.purple[1]}>
          Save
        </Button>
        <Button radius={"lg"} size="sm" onClick={close} color="gray">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
