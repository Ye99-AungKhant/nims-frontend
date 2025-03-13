import { Box, Button, Paper } from "@mantine/core";
import { ListTable } from "./components/ListTable";
import { useState } from "react";

export const InstalledItems = () => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const handleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };
  return (
    <Box>
      <Button onClick={handleCreateForm} size="md">
        Add New
      </Button>
      <Paper p="lg" shadow="xs">
        <ListTable visible={showCreateForm} />
      </Paper>
    </Box>
  );
};
