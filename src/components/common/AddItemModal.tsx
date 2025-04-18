import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Select,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useGetRoles } from "../../page/form/hooks/useGetRoles";
import { useDeleteType } from "../../hooks/useDeleteType";

interface EditableField {
  id: number;
  name: string;
  type_id: string;
  brand_id: string;
}
interface MutateProps {
  name: string;
  type_group: any;
  type_id?: number | null;
  brand_id?: number | null;
}
interface Props {
  title: string;
  type_group?: any;
  dataList?: any[];
  selectItem?: any[];
  opened: boolean;
  close: () => void;
  mutationFn: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    MutateProps | string,
    unknown
  >;
  updateMutationFn: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    MutateProps | string,
    unknown
  >;
}
export const AddItemModal = ({
  title,
  type_group,
  dataList,
  selectItem,
  opened,
  close,
  mutationFn,
  updateMutationFn,
}: Props) => {
  const theme = useMantineTheme();
  const [name, setName] = useState<string>();
  const [selectedId, setSelectedId] = useState<string | null>();
  const { data: roleData, isLoading: isRoleLoading } = useGetRoles();

  const [data, setData] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCell, setEditingCell] = useState<{
    id: number;
    field: keyof EditableField;
  } | null>(null);
  const { mutate: deleteType } = useDeleteType();

  const handleTypeChange = (
    id: number,
    field: keyof EditableField,
    value: string
  ) => {
    setData((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleUpdate = () => {
    if (editingCell) {
      const updatedVehicle = data.find((v) => v.id === editingCell.id);
      console.log("update", updatedVehicle);

      if (updatedVehicle) {
        updateMutationFn(updatedVehicle);
      }
      setEditingId(null);
    }
  };

  const handleDelete = (id: number) => {
    // deleteType(id);
  };

  const handleAddDesignation = () => {
    if (!name) return;
    if (type_group) {
      mutationFn({
        name,
        type_group,
        type_id: Number(selectedId),
        brand_id: Number(selectedId),
      });
    } else {
      mutationFn(name);
    }
    setName("");
  };

  useEffect(() => {
    if (dataList) setData(dataList);
  }, [dataList]);
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered={false}
      title={title}
      size={"lg"}
    >
      <Box px={20}>
        <Table
          striped
          highlightOnHover
          withTableBorder
          horizontalSpacing="md"
          mt={30}
        >
          <Table.Thead
            style={{
              backgroundColor: theme.colors.silver[1],
            }}
          >
            <Table.Tr>
              <Table.Th fw={"normal"}>#</Table.Th>
              {title !== "Vehicle Type" && (
                <Table.Th fw={"normal"}>Type</Table.Th>
              )}

              <Table.Th fw={"normal"}>{title}</Table.Th>
              <Table.Th fw={"normal"} w={"10%"} style={{ textAlign: "center" }}>
                Action
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.length ? (
              data.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{index + 1}</Table.Td>
                  {title !== "Vehicle Type" && (
                    <Table.Td
                      onClick={() =>
                        setEditingCell({ id: item.id, field: "type_id" })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {(editingCell?.id === item.id &&
                        editingCell?.field === "type_id") ||
                      editingCell?.field === "brand_id" ? (
                        <Select
                          autoFocus
                          comboboxProps={{
                            offset: 0,
                          }}
                          value={String(item?.type_id)}
                          data={
                            selectItem?.map((data: any) => ({
                              value: String(data.id),
                              label: data.name,
                            })) || []
                          }
                          onChange={(value) =>
                            handleTypeChange(item.id, "type_id", value || "")
                          }
                          variant="unstyled"
                          size="xs"
                          onBlur={handleUpdate}
                          nothingFoundMessage="Please first create vehicle type."
                        />
                      ) : (
                        item?.type?.name
                      )}
                    </Table.Td>
                  )}

                  <Table.Td
                    onClick={() =>
                      setEditingCell({ id: item.id, field: "name" })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {editingCell?.id === item.id &&
                    editingCell?.field === "name" ? (
                      <TextInput
                        autoFocus
                        value={item.name}
                        variant="unstyled"
                        size="xs"
                        onChange={(e) =>
                          handleTypeChange(
                            item.id,
                            "name",
                            e.currentTarget.value
                          )
                        }
                        onBlur={handleUpdate}
                      />
                    ) : (
                      item.name
                    )}
                  </Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    <Button
                      color="dark"
                      size="xs"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Center py={"md"}>
                    <Text color="dimmed">NO DATA FOUND!!!</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
      <Divider mt={"md"} mb={"xs"} color="#dddddd" />
      <Box px={20}>
        {title !== "Installation Engineer" ? (
          <Grid grow>
            {title !== "Vehicle Type" && (
              <Grid.Col span={6}>
                <Select
                  label="Select Type"
                  withAsterisk
                  comboboxProps={{
                    offset: 0,
                  }}
                  data={
                    selectItem?.map((data: any) => ({
                      value: String(data.id),
                      label: data.name,
                    })) || []
                  }
                  onChange={(value) => setSelectedId(value)}
                  nothingFoundMessage="Please first create vehicle type."
                />
              </Grid.Col>
            )}

            <Grid.Col span={6}>
              <TextInput
                label={`Add New ${title}`}
                withAsterisk
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid.Col>
          </Grid>
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
      </Box>
      <Divider my={"md"} color="#dddddd" />
      <Group gap="md" justify="right" pb={"md"} mr={"md"}>
        <Button radius={"lg"} size="sm" onClick={close} color="gray">
          Cancel
        </Button>
        <Button
          radius={"lg"}
          size="sm"
          color={theme.colors.purple[1]}
          onClick={handleAddDesignation}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
};
