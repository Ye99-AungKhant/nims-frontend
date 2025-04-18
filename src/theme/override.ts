import type { MantineThemeOverride } from "@mantine/core";
import colors from "./colors";
import components from "./components";
import headings from "./headings";

export const theme: MantineThemeOverride = {
  primaryColor: "primary",
  fontFamily: "Segoe UI",
  colors,
  headings,
  components,
};
