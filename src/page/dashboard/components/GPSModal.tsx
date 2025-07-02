import { Box, Divider, Grid, Group, Modal, Text } from "@mantine/core";
import { useGetGPSUsage } from "../hooks/useGetGPSUsage";

interface Props {
  opened: boolean;
  onClose: () => void;
}
const GPSModal = ({ opened, onClose }: Props) => {
  const { data, isLoading } = useGetGPSUsage();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="GPS Usage"
      centered={false}
      size={"lg"}
    >
      <Box m="md">
        {!isLoading &&
          data?.map((gpsBrand: any) => (
            <Box key={gpsBrand.brandId}>
              <Grid my="md">
                <Grid.Col span={12}>
                  <Group gap={"sm"}>
                    <Text size="md" fw={500} c="dark">
                      {gpsBrand.brandName}
                    </Text>
                    <Text size="sm">-</Text>
                    <Text size="md" fw={500} c="dark">
                      {gpsBrand.brandUsedCount}
                    </Text>
                  </Group>
                </Grid.Col>

                <Grid.Col span={12} pl={"md"}>
                  <Text fw={500} size="sm" c="dark">
                    Models
                  </Text>
                </Grid.Col>

                {gpsBrand.models.map((model: any) => (
                  <Grid.Col key={`model-${model.modelId}`} span={4} pl={"md"}>
                    <Group gap={"sm"}>
                      <Text size="sm">{model.modelName}</Text>
                      <Text size="sm">-</Text>
                      <Text size="sm">{model.modelUsedCount}</Text>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
              <Divider />
            </Box>
          ))}
      </Box>
    </Modal>
  );
};

export default GPSModal;
