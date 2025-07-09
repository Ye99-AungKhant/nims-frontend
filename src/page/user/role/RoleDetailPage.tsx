import {
  TextInput,
  Button,
  Checkbox,
  Group,
  Box,
  Title,
  Text,
  Divider,
  Stack,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PermissionType } from "../../../utils/types";
import { useForm } from "@mantine/form";
import { useAssignRolePermission } from "../../../hooks/useAssignRolePermission";
import { useUpdateRole } from "../../client/hooks/useUpdateRole";
import { useDeleteRole } from "../../../hooks/useDeleteRole";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import { useDisclosure } from "@mantine/hooks";
import PermissionGate from "../../../components/middleware/PermissionGate";

type PermissionSection = {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  renewal: boolean;
  repair: boolean;
};

type PermissionFormValues = Record<string, PermissionSection>;
type Role = {
  id: number;
  name: string;
};

type RolePermissionFormValues = {
  role: Role;
  permissions: PermissionFormValues;
};

const RoleDetailPage = () => {
  const theme = useMantineTheme();
  const param = useLocation();
  const navigate = useNavigate();
  const { roleData } = param.state;
  const [opened, { open, close }] = useDisclosure(false);
  const defaultSections = ["installed_objects", "clients", "users", "roles"];
  const { mutate, isPending } = useAssignRolePermission();
  const { mutate: updateRole, isPending: updateRoleLoading } = useUpdateRole();
  const { mutate: deleteRole, isPending: isDeleteLoading } = useDeleteRole();

  const transformPermissions = (data: PermissionType[]) => {
    const result: PermissionFormValues = {};

    if (data.length == 0) {
      defaultSections.forEach((section) => {
        result[section] = {
          view: false,
          create: false,
          update: false,
          delete: false,
          renewal: false,
          repair: false,
        };
      });
    } else {
      data.forEach((item) => {
        result[item.page_name] = {
          view: item.view || false,
          create: item.create || false,
          update: item.update || false,
          delete: item.delete || false,
          renewal: item.renewal || false,
          repair: item.repair || false,
        };
      });
    }

    return result;
  };

  const form = useForm<RolePermissionFormValues>({
    initialValues: {
      role: { id: roleData?.id, name: roleData?.name },
      permissions: transformPermissions(roleData?.permissions || []),
    },
  });

  const preparePermissions = async (permissionsObj: any) => {
    return Object.entries(permissionsObj).map(([page_name, perms]: any) => ({
      page_name,
      view: perms.view || false,
      create: perms.create || false,
      update: perms.update || false,
      delete: perms.delete || false,
      renewal: perms.renewal || false,
      repair: perms.repair || false,
    }));
  };

  const handlePermissionSubmit = async () => {
    console.log("submit", form.values.permissions);
    const formattedPermissions = await preparePermissions(
      form.values.permissions
    );
    const payload = {
      role: form.values.role,
      permissions: formattedPermissions,
    };
    console.log(payload);
    mutate(payload, {
      onSuccess: () => navigate("/role"),
    });
  };

  const handleRoleSubmit = async () => {
    updateRole(form.values.role);
  };

  // const handleDelete = () => {
  //   deleteRole(roleData?.id, { onSuccess: () => navigate("/role") });
  // };

  return (
    <Box p="md" mx="auto">
      <Paper shadow="sm" p="md" mb={30}>
        <TextInput
          label="Role Name"
          mb="sm"
          {...form.getInputProps("role.name")}
        />
        <Group justify="space-between" mb="md">
          <PermissionGate
            page={"roles"}
            scope={"delete"}
            errorProps={{ style: { visibility: "hidden" } }}
          >
            <Button variant="subtle" color="red" onClick={open}>
              Delete Role
            </Button>
          </PermissionGate>
          <Button
            bg={theme.colors.purple[1]}
            onClick={handleRoleSubmit}
            loading={updateRoleLoading}
          >
            Save
          </Button>
        </Group>
      </Paper>

      <Text size="lg" my="xs" c={"dark"} fw={"bold"}>
        Role Permissions
      </Text>
      <Text mb="md" size="sm" color="dimmed">
        Update the role permissions in the form below
      </Text>

      <Paper shadow="sm" p="md">
        <Divider label="Install Objects" labelPosition="left" my="sm" />
        <Group>
          <Checkbox
            size="xs"
            radius={"sm"}
            label="View Objects"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.installed_objects.view}
            {...form.getInputProps("permissions.installed_objects.view")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Create Objects"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.installed_objects.create}
            {...form.getInputProps("permissions.installed_objects.create")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Update Objects"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.installed_objects.update}
            // onChange={(e) =>
            //   form.setFieldValue(
            //     "installed_objects.update",
            //     e.currentTarget.checked
            //   )
            // }
            {...form.getInputProps("permissions.installed_objects.update")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Repair/Replacement Objects"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.installed_objects.repair}
            {...form.getInputProps("permissions.installed_objects.repair")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Renewal Objects"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.installed_objects.renewal}
            {...form.getInputProps("permissions.installed_objects.renewal")}
          />
        </Group>

        <Divider label="Clients" labelPosition="left" my="sm" />
        <Group>
          <Checkbox
            size="xs"
            radius={"sm"}
            label="View Clients"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.clients.view}
            // onChange={(e) =>
            //   form.setFieldValue("clients.view", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.clients.view")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Create Clients"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.clients.create}
            // onChange={(e) =>
            //   form.setFieldValue("clients.create", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.clients.create")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Update Clients"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.clients.update}
            // onChange={(e) =>
            //   form.setFieldValue("clients.update", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.clients.update")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Delete Clients"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.clients.delete}
            // onChange={(e) =>
            //   form.setFieldValue("clients.delete", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.clients.delete")}
          />
        </Group>

        <Divider label="Users" labelPosition="left" my="sm" />
        <Group>
          <Checkbox
            size="xs"
            radius={"sm"}
            label="View Users"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.users.view}
            // onChange={(e) =>
            //   form.setFieldValue("users.view", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.users.view")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Create Users"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.users.create}
            // onChange={(e) =>
            //   form.setFieldValue("users.create", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.users.create")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Update Users"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.users.update}
            // onChange={(e) =>
            //   form.setFieldValue("users.update", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.users.update")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Delete Users"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.users.delete}
            // onChange={(e) =>
            //   form.setFieldValue("users.delete", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.users.delete")}
          />
        </Group>

        <Divider label="Roles" labelPosition="left" my="sm" />
        <Group>
          <Checkbox
            size="xs"
            radius={"sm"}
            label="View Roles"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.roles.view}
            // onChange={(e) =>
            //   form.setFieldValue("roles.view", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.roles.view")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Create Roles"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.roles.create}
            // onChange={(e) =>
            //   form.setFieldValue("roles.create", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.roles.create")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Update Roles"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.roles.update}
            // onChange={(e) =>
            //   form.setFieldValue("roles.update", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.roles.update")}
          />
          <Checkbox
            size="xs"
            radius={"sm"}
            label="Delete Roles"
            color={theme.colors.purple[1]}
            checked={form.values.permissions.roles.delete}
            // onChange={(e) =>
            //   form.setFieldValue("roles.delete", e.currentTarget.checked)
            // }
            {...form.getInputProps("permissions.roles.delete")}
          />
        </Group>
        <Group justify="right" my="lg">
          <PermissionGate
            page={"roles"}
            scope={"update"}
            errorProps={{ style: { visibility: "hidden" } }}
          >
            <Button
              bg={theme.colors.purple[1]}
              onClick={handlePermissionSubmit}
              loading={isPending}
            >
              Save
            </Button>
          </PermissionGate>
        </Group>
      </Paper>
      <DeleteConfirmModal
        opened={opened}
        mutationFn={deleteRole}
        isloading={isDeleteLoading}
        onClose={close}
        title={"Role"}
        id={roleData?.id}
      />
    </Box>
  );
};

export default RoleDetailPage;
