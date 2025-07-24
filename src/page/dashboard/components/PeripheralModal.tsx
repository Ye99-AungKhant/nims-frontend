import { Box, Divider, Grid, Group, Modal, Text } from "@mantine/core";
import { useGetPeripheralUsage } from "../hooks/useGetPeripheralUsage";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  opened: boolean;
  onClose: () => void;
}
const PeripheralModal = ({ opened, onClose }: Props) => {
  const { data, isLoading } = useGetPeripheralUsage();
  const navigate = useNavigate();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Peripheral Usage"
      centered={false}
      size={"lg"}
    >
      <Box m="md">
        {!isLoading &&
          data?.map((gpsType: any) => (
            <Box key={gpsType.typeId}>
              <Text
                size="md"
                fw={500}
                c="dark"
                mb="xs"
                onClick={() =>
                  navigate(
                    `/report/peripherals?filterType=type&filterId=${gpsType.typeId}`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {gpsType.typeName} - {gpsType.typeUsedCount}
              </Text>

              {gpsType?.brands?.map((brand: any) => (
                <Box key={`brand-${brand.brandId}`} pl="md" mb="sm">
                  <Text fw={500} size="sm" mt="xs" mb="xs" c="dark">
                    Brands
                  </Text>
                  <Group
                    gap="sm"
                    mb="xs"
                    onClick={() =>
                      navigate(
                        `/report/peripherals?filterType=brand&filterId=${brand.brandId}`
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Text size="sm" fw={500} pl="md">
                      {brand.brandName}
                    </Text>
                    <Text size="sm">-</Text>
                    <Text size="sm">{brand.brandUsedCount}</Text>
                  </Group>

                  {brand?.models?.length > 0 && (
                    <>
                      <Text size="sm" fw={500} mb="xs" c="dark">
                        Models
                      </Text>
                      <Grid pl="md">
                        {brand.models.map((model: any) => (
                          <Grid.Col key={`model-${model.modelId}`} span={6}>
                            <Group
                              gap="sm"
                              onClick={() =>
                                navigate(
                                  `/report/peripherals?filterType=model&filterId=${model.modelId}`
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <Text size="sm">{model.modelName}</Text>
                              <Text size="sm">-</Text>
                              <Text size="sm">{model.modelUsedCount}</Text>
                            </Group>
                          </Grid.Col>
                        ))}
                      </Grid>
                    </>
                  )}
                  <Divider my="md" />
                </Box>
              ))}

              {/* <Divider my="md" /> */}
            </Box>
          ))}
      </Box>
    </Modal>
  );
};

export default PeripheralModal;
