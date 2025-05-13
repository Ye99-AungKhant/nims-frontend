import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Radio,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconUsers } from "@tabler/icons-react";
import { z } from "zod";
import { userSchema } from "./components/userValidationSchema";
import { useGetPermissions } from "../../hooks/useGetPermission";
import { useCreateUserByAdmin } from "../../hooks/useCreateUserByAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAuthAccessRole } from "../../hooks/useGetAuthAccessRole";
import { useEffect } from "react";
import { useUpdateUserByAdmin } from "../../hooks/useUpdateUserByAdmin";

type FormData = z.infer<typeof userSchema>;

const UserCreatePage = () => {
  const theme = useMantineTheme();
  const param = useLocation();
  const editData = param?.state?.data || null;
  const { data: roleData } = useGetAuthAccessRole();
  const { mutate, isPending } = useCreateUserByAdmin();
  const { mutate: updateUserMutate } = useUpdateUserByAdmin();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validate: zodResolver(userSchema),
  });

  const handleSubmit = (data: FormData) => {
    if (editData) {
      updateUserMutate(data, {
        onSuccess: () => navigate("/user"),
      });
    } else {
      mutate(data, {
        onSuccess: () => navigate("/user"),
      });
    }
  };

  useEffect(() => {
    if (editData) {
      form.setValues({
        id: editData.id,
        name: editData.name,
        username: editData.username,
        email: editData.email,
        phone: editData.phone,
        password: editData.password,
        confirmPassword: editData.password,
        role: String(editData.role_id),
        allow_login: editData.allow_login,
      });
    }
  }, [editData]);

  return (
    <Box p="30px">
      <Paper shadow="sm" radius="md">
        <Box style={{ borderBottom: "1px solid #dddddd" }} py="md" px={30}>
          <Group gap={0} h={36}>
            <IconUsers size={24} />
            <Text size="lg" fw={600} c={"dark"} ml={"8px"}>
              {editData ? "Edit" : "New"} User
            </Text>
          </Group>
          <Text>Please fill the form below add new record</Text>
        </Box>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Box px={"30px"} pt={"30px"}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label={"Name"}
                  placeholder="Name"
                  {...form.getInputProps("name")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <PasswordInput
                  label={"Password"}
                  placeholder="Password"
                  type="password"
                  {...form.getInputProps("password")}
                />
              </Grid.Col>
            </Grid>
            <Grid my={"lg"}>
              <Grid.Col span={6}>
                <TextInput
                  label={"Username"}
                  placeholder="Username"
                  {...form.getInputProps("username")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <PasswordInput
                  label={"Confirm Password"}
                  placeholder="Confirm Password"
                  type="password"
                  {...form.getInputProps("confirmPassword")}
                />
              </Grid.Col>
            </Grid>
            <Grid mb={"lg"}>
              <Grid.Col span={6}>
                <TextInput
                  label={"Email"}
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label={"Phone"}
                  placeholder="Phone"
                  {...form.getInputProps("phone")}
                />
              </Grid.Col>
            </Grid>
            <Box my={"lg"}>
              {editData && (
                <Checkbox
                  label="Allow to Login"
                  size="sm"
                  radius={"sm"}
                  color={theme.colors.purple[1]}
                  mb={"md"}
                  {...form.getInputProps("allow_login", { type: "checkbox" })}
                />
              )}

              <Radio.Group label="Role" {...form.getInputProps("role")}>
                <Flex gap={50}>
                  {roleData?.items.map((role: any) => (
                    <Radio
                      key={role.id}
                      value={String(role.id)}
                      label={role.name}
                      color={theme.colors.purple[1]}
                    />
                  ))}
                </Flex>
              </Radio.Group>
              {/* <Text>Role</Text>
              <Flex gap={50} mt={"xs"}>
                <Checkbox
                  label="Super Admin"
                  size="sm"
                  radius={"sm"}
                  checked={form.getValues().role.includes("SuperAdmin")}
                  color={theme.colors.purple[1]}
                  {...form.getInputProps("role")}
                />
                <Checkbox
                  label="Normal"
                  size="sm"
                  radius={"sm"}
                  checked={form.getValues().role.includes("Normal")}
                  // onChange={() => setSelectedRole("Normal")}
                  color={theme.colors.purple[1]}
                  {...form.getInputProps("role")}
                />
              </Flex> */}
            </Box>
            {/* <Box my={"lg"}>
              <Text>Permission</Text>
              <Flex gap={50} mt={"xs"}>
                <Checkbox
                  label="can view all records"
                  size="sm"
                  radius={"sm"}
                  checked={form.getValues().permissions.canView}
                  color={theme.colors.purple[1]}
                  {...form.getInputProps("permissions.canView")}
                />
                <Checkbox
                  label="Can edit all records"
                  size="sm"
                  radius={"sm"}
                  checked={form.getValues().permissions.canEdit}
                  color={theme.colors.purple[1]}
                  {...form.getInputProps("permissions.canEdit")}
                />
              </Flex>
            </Box> */}
          </Box>
          <Box style={{ borderTop: "1px solid #dddddd" }} p="md">
            <Group justify="center">
              <Button
                radius={"lg"}
                size="sm"
                bg={theme.colors.purple[1]}
                disabled={false}
                loading={isPending}
                fw={500}
                type="submit"
              >
                Save
              </Button>
            </Group>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default UserCreatePage;
