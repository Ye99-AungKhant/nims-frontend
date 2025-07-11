import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../../theme/override";

interface MantineConfigProps {
  children: React.ReactNode;
}

export function MantineConfig({ children }: MantineConfigProps) {
  return (
    <MantineProvider
      theme={{
        ...theme,
      }}
      defaultColorScheme="light"
    >
      <Notifications position="top-right" zIndex={1000} />
      {children}
    </MantineProvider>
  );
}
