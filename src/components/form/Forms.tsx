import {
  ActionIcon,
  Box,
  Button,
  Group,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetBrands } from "../../page/form/hooks/useGetBrands";
import { useCreateType } from "../../hooks/useCreateType";
import { useCreateBrand } from "../../hooks/useCreateBrand";
import { useCreateModel } from "../../hooks/useCreateModel";

interface CreatePageProps {
  type_group: string;
}

export const Forms = ({ type_group }: CreatePageProps) => {
  const { data } = useGetBrands(type_group);
  const { mutate: typeMutate } = useCreateType();
  const { mutate: brandMutate } = useCreateBrand();
  const { mutate: modelMutate } = useCreateModel();

  const typeForm = useForm({
    initialValues: {
      name: "",
      type_group,
    },
  });

  const brandForm = useForm({
    initialValues: {
      name: "",
      type_group,
    },
  });

  const modelForm = useForm({
    initialValues: {
      name: "",
      brand_id: "",
      type_group,
    },
  });

  const handleTypeSubmit = () => {
    typeMutate(typeForm.values);
    typeForm.reset();
  };

  const handleBrandSubmit = () => {
    brandMutate(brandForm.values);
    brandForm.reset();
  };

  const handleModelSubmit = () => {
    const updatedValues = {
      ...modelForm.values,
      brand_id: Number(modelForm.values.brand_id),
    };

    modelMutate(updatedValues);
    modelForm.reset();
  };

  return (
    <Box>
      <Paper shadow="xl" p="xl">
        {/* <Flex gap={"lg"}> */}
        <form onSubmit={typeForm.onSubmit(handleTypeSubmit)}>
          <TextInput
            label="Add Type"
            placeholder="Enter type"
            rightSectionWidth={60}
            rightSection={
              <ActionIcon
                type="submit"
                size={42}
                style={{
                  margin: 0,
                  width: 70,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                Add
              </ActionIcon>
            }
            {...typeForm.getInputProps("name")}
          />
        </form>

        <form onSubmit={brandForm.onSubmit(handleBrandSubmit)}>
          <TextInput
            label="Add Brand"
            placeholder="Enter brand"
            rightSectionWidth={60}
            rightSection={
              <ActionIcon
                type="submit"
                size={42}
                style={{
                  margin: 0,
                  width: 70,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                Add
              </ActionIcon>
            }
            {...brandForm.getInputProps("name")}
          />
        </form>
        {/* </Flex> */}
      </Paper>
      <Paper shadow="xl" p="xl" mt={10}>
        <form onSubmit={modelForm.onSubmit(handleModelSubmit)}>
          <Select
            label="Select Brand for Model"
            placeholder="Select Brand"
            data={
              data?.data.data.map((data: any) => ({
                value: String(data.id),
                label: data.name,
              })) || []
            }
            {...modelForm.getInputProps("brand_id")}
          />
          <TextInput
            label="Add Model"
            placeholder="Enter model"
            {...modelForm.getInputProps("name")}
          />
          <Group m="md">
            <Button type="submit" size="sm">
              Add
            </Button>
            {/* <Button color="gray" size="sm">
              Cancel
            </Button> */}
          </Group>
        </form>
      </Paper>
    </Box>
  );
};
