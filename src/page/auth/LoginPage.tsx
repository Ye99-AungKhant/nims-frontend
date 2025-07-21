import {
  Box,
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useLogin } from "./hooks/useLogin";
import { useState } from "react";
import { useAuthRoute } from "../../hooks/useAuth";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Please enter username." }),
  password: z.string().min(1, { message: "Please enter password." }),
});

const LoginPage = () => {
  useAuthRoute();
  const { mutate, isPending } = useLogin();
  const [error, setError] = useState("");
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const handleLogin = (values: any) => {
    mutate(values, {
      onError: (error) => {
        setError(error.response.data.message);
      },
    });
  };

  return (
    <Center
      w="100%"
      h="100vh"
      style={{
        position: "relative",
        backgroundColor: theme.colors.silver[1],
      }}
    >
      <Paper
        withBorder
        p={30}
        py={50}
        mb={50}
        miw={400}
        radius="md"
        shadow="md"
        component="form"
        onSubmit={form.onSubmit((values) => handleLogin(values))}
      >
        <Box component="img" alt="logo" src="/wimslogoblue.png" h={"80"} />
        <TextInput
          mt={20}
          withAsterisk
          label="Username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          withAsterisk
          mt="md"
          label="Password"
          {...form.getInputProps("password")}
        />
        {error && (
          <Center>
            <Text c={"red"}> {error}</Text>
          </Center>
        )}
        <Button fullWidth mt="xl" loading={isPending} type="submit">
          Login
        </Button>
      </Paper>
    </Center>
  );
};

export default LoginPage;
