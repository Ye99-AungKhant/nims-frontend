import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { FormValues } from "../../../utils/types";
import { IconChevronDown, IconUser } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useGetClients } from "../../form/hooks/useGetClients";

interface VehicleInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}
const VehicleInfo = ({ form }: VehicleInfoProps) => {
  const theme = useMantineTheme();
  const { data: clientData } = useGetClients();
  console.log("clientData", clientData);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 4, md: 3, lg: 3 }}>
          <Flex gap={"xl"} direction={"column"} mt={30}>
            <Text>Company Name *</Text>
            <Text>Type *</Text>
            <Text>Plate No. *</Text>
            <Text>Make *</Text>
            <Text>Model *</Text>
            <Text>Year *</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 6, md: 3, lg: 8 }}>
          <Flex gap={"md"} direction={"column"} mt={10}>
            <Select
              placeholder="Select Client"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                clientData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("client")}
              leftSection={<IconUser size={16} />}
              rightSectionPointerEvents="all"
              rightSection={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconChevronDown size={16} style={{ margin: 0 }} />
                  <ActionIcon
                    color={theme.colors.purple[1]}
                    style={{
                      height: 42,
                      width: 35,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      fontSize: 12,
                    }}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              placeholder="Select Client"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                clientData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("client")}
              leftSection={<IconUser size={16} />}
              rightSectionPointerEvents="all"
              rightSection={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconChevronDown size={16} style={{ margin: 0 }} />
                  <ActionIcon
                    color={theme.colors.purple[1]}
                    style={{
                      height: 42,
                      width: 35,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      fontSize: 12,
                    }}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <TextInput type="email" leftSection={""} required />
            <Select
              placeholder="Select Client"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                clientData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("client")}
              leftSection={<IconUser size={16} />}
              rightSectionPointerEvents="all"
              rightSection={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconChevronDown size={16} style={{ margin: 0 }} />
                  <ActionIcon
                    color={theme.colors.purple[1]}
                    style={{
                      height: 42,
                      width: 35,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      fontSize: 12,
                    }}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />
            <Select
              placeholder="Select Client"
              searchable
              comboboxProps={{
                offset: 0,
              }}
              data={
                clientData?.data.data.map((data: any) => ({
                  value: String(data.id),
                  label: data.name,
                })) || []
              }
              {...form.getInputProps("client")}
              leftSection={<IconUser size={16} />}
              rightSectionPointerEvents="all"
              rightSection={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconChevronDown size={16} style={{ margin: 0 }} />
                  <ActionIcon
                    color={theme.colors.purple[1]}
                    style={{
                      height: 42,
                      width: 35,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      fontSize: 12,
                    }}
                  >
                    Add
                  </ActionIcon>
                </div>
              }
            />

            <TextInput type="number" leftSection={""} required />
          </Flex>
        </Grid.Col>
      </Grid>
      <Group mt="md" justify="center">
        <Button
          onClick={() => {}}
          radius={"lg"}
          size="sm"
          bg={theme.colors.purple[1]}
        >
          Continue
        </Button>
      </Group>
    </>
  );
};

export default VehicleInfo;
