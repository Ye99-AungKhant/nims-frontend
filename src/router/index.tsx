import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import CreateForm from "../page/form/CreateForm";
import { ClientPage } from "../page/client/ClientPage";
import { VehicleCreatePage } from "../page/vehicle/VehicleCreatePage";
import { VehiclePage } from "../page/vehicle/VehiclePage";
import { InstalledPage } from "../page/installed/InstalledPage";
import { DashboardPage } from "../page/dashboard";
import ClientDetailPage from "../page/client/ClientDetailPage";
import ClientCreatePage from "../page/client/ClientCreatePage";
import InstallationCreatePage from "../page/installed/InstallationCreatePage";
import LoginPage from "../page/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", index: true, element: <DashboardPage /> },
      { path: "installed", element: <InstalledPage /> },
      { path: "/installed/creat", element: <CreateForm /> },
      { path: "/installed/create", element: <InstallationCreatePage /> },
      { path: "/client", element: <ClientPage /> },
      { path: "/client/detail", element: <ClientDetailPage /> },
      { path: "/client/create", element: <ClientCreatePage /> },
      { path: "/vehicle", element: <VehiclePage /> },
      { path: "/vehicle/create", element: <VehicleCreatePage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
