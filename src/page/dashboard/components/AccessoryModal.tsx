import { Box, Grid, Group, Modal, Text } from "@mantine/core";
import { useGetAccessoryUsage } from "../hooks/useGetAccessoryUsage";
import { useNavigate } from "react-router-dom";

interface Props {
  opened: boolean;
  onClose: () => void;
}
const AccessoryModal = ({ opened, onClose }: Props) => {
  const { data, isLoading } = useGetAccessoryUsage();
  const navigate = useNavigate();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Accessory Usage"
      centered={false}
    >
      <Box m="md">
        <Grid mb="md">
          <Grid.Col span={12}>
            <Group justify="space-between">
              <Text size="md" fw={500} c={"dark"}>
                Name
              </Text>
              <Text size="md" fw={500} c={"dark"}>
                Quantity
              </Text>
            </Group>
          </Grid.Col>
          {!isLoading &&
            data?.map((accessory: any) => (
              <Grid.Col span={12} key={accessory.typeId}>
                <Group
                  justify="space-between"
                  onClick={() =>
                    navigate(`/report/accessories?type_id=${accessory.typeId}`)
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Text size="md" c={"dark"}>
                    {accessory.typeName}
                  </Text>
                  <Text size="md" c={"dark"}>
                    {accessory.usedCount}
                  </Text>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default AccessoryModal;
