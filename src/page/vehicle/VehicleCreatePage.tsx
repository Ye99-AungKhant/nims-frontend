import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { Forms } from "../../components/form/Forms";

interface CreatePageProps {
  type_group: string;
}

export const VehicleCreatePage = () => {
  return (
    <Box px={30}>
      <Forms type_group="Vehicle" />
    </Box>
  );
};
