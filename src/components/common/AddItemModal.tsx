import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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
  isHaveType?: boolean;
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
  deleteMutationFn: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    number,
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
  isHaveType = false,
  mutationFn,
  updateMutationFn,
  deleteMutationFn,
}: Props) => {
  const theme = useMantineTheme();
  const [deleteItem, setDeleteItem] = useState(0);
  const [name, setName] = useState<string>();
  const [selectedId, setSelectedId] = useState<string | null>();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [editingCell, setEditingCell] = useState<{
    id: number;
    field: keyof EditableField;
  } | null>(null);

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
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteMutationFn(deleteItem, { onSuccess: () => setIsDeleting(false) });
    setDeleteItem(0);
  };

  const handleAddDesignation = () => {
    if (!name) return;
    setIsSaving(true);
    if (type_group) {
      mutationFn(
        {
          name,
          type_group,
          type_id: Number(selectedId),
          brand_id: Number(selectedId),
        },
        { onSuccess: () => setIsSaving(false) }
      );
    } else {
      mutationFn(name, { onSuccess: () => setIsSaving(false) });
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
        <ScrollArea.Autosize mah={300} mt={30} type="scroll" scrollbarSize={5}>
          <Table
            striped
            highlightOnHover
            withTableBorder
            horizontalSpacing="md"
          >
            <Table.Thead
              style={{
                backgroundColor: theme.colors.silver[1],
              }}
            >
              <Table.Tr>
                <Table.Th fw={"normal"}>#</Table.Th>
                {isHaveType && (
                  <Table.Th fw={"normal"}>
                    {title.includes("Brand") || title.includes("Domain")
                      ? "Type"
                      : "Brand"}
                  </Table.Th>
                )}

                <Table.Th fw={"normal"}>{title}</Table.Th>
                {title !== "Designation" && (
                  <Table.Th
                    fw={"normal"}
                    w={"10%"}
                    style={{ textAlign: "center" }}
                  >
                    Action
                  </Table.Th>
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.length ? (
                data.map((item, index) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    {isHaveType ? (
                      title.includes("Brand") || title.includes("Domain") ? (
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
                                handleTypeChange(
                                  item.id,
                                  "type_id",
                                  value || ""
                                )
                              }
                              variant="unstyled"
                              size="xs"
                              onBlur={handleUpdate}
                              nothingFoundMessage={`Please first create ${type_group} ${
                                title.includes("Brand") ? "type" : "brand"
                              }`}
                            />
                          ) : (
                            item?.type?.name
                          )}
                        </Table.Td>
                      ) : (
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
                              value={String(item?.brand_id)}
                              data={
                                selectItem?.map((data: any) => ({
                                  value: String(data.id),
                                  label: data.name,
                                })) || []
                              }
                              onChange={(value) =>
                                handleTypeChange(
                                  item.id,
                                  "type_id",
                                  value || ""
                                )
                              }
                              variant="unstyled"
                              size="xs"
                              onBlur={handleUpdate}
                              nothingFoundMessage={`Please first create ${type_group} ${
                                title.includes("Brand") ? "type" : "brand"
                              }`}
                            />
                          ) : (
                            item?.brand?.name
                          )}
                        </Table.Td>
                      )
                    ) : (
                      ""
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

                    {title !== "Designation" && (
                      <Table.Td style={{ textAlign: "center" }}>
                        <Button
                          color="dark"
                          size="xs"
                          onClick={() => setDeleteItem(item.id)}
                        >
                          Delete
                        </Button>
                      </Table.Td>
                    )}
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
        </ScrollArea.Autosize>
      </Box>
      <Divider mt={30} mb={"xs"} color="#dddddd" />
      <Box px={20}>
        <Grid grow>
          {title !== "Installation Engineer" ? (
            <>
              {isHaveType && (
                <Grid.Col span={6}>
                  <Select
                    label={`Select ${type_group} ${
                      title.includes("Brand") || title.includes("Domain")
                        ? "Type"
                        : "Brand"
                    }`}
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
                    nothingFoundMessage={`Please first create ${type_group} ${
                      title.includes("Brand") ? "type" : "brand"
                    }`}
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
            </>
          ) : (
            <Grid.Col span={6}>
              <TextInput
                label={`Add New ${title}`}
                withAsterisk
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid.Col>
          )}
        </Grid>
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
          loading={isSaving}
        >
          Save
        </Button>
      </Group>
      <Modal
        opened={Boolean(deleteItem)}
        onClose={() => setDeleteItem(0)}
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
            loading={isDeleting}
          >
            Yes, Delete it!
          </Button>
          <Button radius={"lg"} size="sm" onClick={close} color="gray">
            Cancel
          </Button>
        </Group>
      </Modal>
    </Modal>
  );
};
