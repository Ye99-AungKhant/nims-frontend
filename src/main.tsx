import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "./assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { MantineConfig } from "./components/core/MantineConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/react-query/queryClient";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineConfig>
      <RouterProvider router={router} />
    </MantineConfig>
  </QueryClientProvider>
);
