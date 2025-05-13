import { Button, Center, Group, Modal, Text } from "@mantine/core";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  opened: boolean;
  onClose: () => void;
  title: string;
  mutationFn: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    number | string,
    unknown
  >;
  isloading: boolean;
  id: number | string;
}

const DeleteConfirmModal = ({
  opened,
  onClose,
  title,
  mutationFn,
  isloading,
  id,
}: Props) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    // setIsDeleting(true);
    mutationFn(id, {
      onSuccess: () => {
        onClose();
        title === "Role" && navigate("/role");
      },
    });
    // setDeleteItem(0);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="xl" fw={700} c={"dark"}>
          Confirm Delete {title}
        </Text>
      }
      centered={false}
    >
      <Center>Are you sure you want to delete this record?</Center>
      <Group m="md" gap="md" justify="right">
        <Button
          radius={"lg"}
          size="sm"
          onClick={handleDelete}
          loading={isloading}
        >
          Yes, Delete it!
        </Button>
        <Button radius={"lg"} size="sm" onClick={close} color="gray">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteConfirmModal;
