import { Box, Grid, Group, Modal, Text } from "@mantine/core";
import { useGetOperatorUsage } from "../hooks/useGetOperatorUsage";

interface Props {
  opened: boolean;
  onClose: () => void;
}
const SimcardModal = ({ opened, onClose }: Props) => {
  const { data, isLoading } = useGetOperatorUsage();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="SIM Card Usage"
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
            data?.map((operator: any) => (
              <Grid.Col span={12} key={operator.brandId}>
                <Group justify="space-between">
                  <Text size="md" c={"dark"}>
                    {operator.brandName}
                  </Text>
                  <Text size="md" c={"dark"}>
                    {operator.usedCount}
                  </Text>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default SimcardModal;
