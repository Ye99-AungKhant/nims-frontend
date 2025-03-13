import { MantineProvider } from "@mantine/core";
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
      defaultColorScheme="light" // Set default color scheme
    >
      {children}
    </MantineProvider>
  );
}
