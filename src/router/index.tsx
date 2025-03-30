import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import CreateForm from "../page/form/CreateForm";
import { ClientPage } from "../page/client/ClientPage";
import { ClientCreate } from "../page/client/components/ClientCreate";
import { VehicleCreatePage } from "../page/vehicle/VehicleCreatePage";
import { VehiclePage } from "../page/vehicle/VehiclePage";
import { InstalledPage } from "../page/installed/InstalledPage";
import { DashboardPage } from "../page/dashboard";
import ClientDetailPage from "../page/client/ClientDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", index: true, element: <DashboardPage /> },
      { path: "installed", element: <InstalledPage /> },
      { path: "/installed/create", element: <CreateForm /> },
      { path: "client", element: <ClientPage /> },
      { path: "/client/detail", element: <ClientDetailPage /> },
      { path: "/client/create", element: <ClientCreate /> },
      { path: "/vehicle", element: <VehiclePage /> },
      { path: "/vehicle/create", element: <VehicleCreatePage /> },
    ],
  },
]);

export default router;
