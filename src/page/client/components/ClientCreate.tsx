import { Box, Button, Group, Paper, TextInput } from "@mantine/core";
import React from "react";

export const ClientCreate = () => {
  return (
    <Box px={30}>
      <Paper shadow="xl" p="xl">
        <TextInput label="Name" placeholder="Enter name" withAsterisk />
        <TextInput label="Address" placeholder="Enter Address" withAsterisk />
        <Group m="md">
          <Button type="submit" size="sm">
            Create
          </Button>
          <Button color="gray" size="sm">
            Cancel
          </Button>
        </Group>
      </Paper>
    </Box>
  );
};
