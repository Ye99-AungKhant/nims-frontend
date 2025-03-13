import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { MantineConfig } from "./components/core/MantineConfig";

createRoot(document.getElementById("root")!).render(
  <MantineConfig>
    <RouterProvider router={router} />
  </MantineConfig>
);
