import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import CreateForm from "../page/form/CreateForm";
import { ClientPage } from "../page/client/ClientPage";
import { InstalledPage } from "../page/installed/InstalledPage";
import { DashboardPage } from "../page/dashboard";
import ClientDetailPage from "../page/client/ClientDetailPage";
import ClientCreatePage from "../page/client/ClientCreatePage";
import InstallationCreatePage from "../page/installed/InstallationCreatePage";
import LoginPage from "../page/auth/LoginPage";
import InstallationDetailPage from "../page/installed/InstallationDetailPage";
import UserPage from "../page/user/UserPage";
import UserCreatePage from "../page/user/UserCreatePage";
import RolePage from "../page/user/role/RolePage";
import RoleDetailPage from "../page/user/role/RoleDetailPage";
import { SimCardReport } from "../page/reports/SimCardReport";
import { ClientReport } from "../page/reports/ClientReport";
import { GPSReport } from "../page/reports/GPSReport";
import { PeripheralReport } from "../page/reports/PeripheralReport";
import { AccessoryReport } from "../page/reports/AccessoryReport";
import { ServerReport } from "../page/reports/ServerReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", index: true, element: <DashboardPage /> },
      { path: "installed", element: <InstalledPage /> },
      { path: "/installed/creat", element: <CreateForm /> },
      { path: "/installed/create", element: <InstallationCreatePage /> },
      { path: "/installed/detail", element: <InstallationDetailPage /> },
      { path: "/client", element: <ClientPage /> },
      { path: "/client/detail", element: <ClientDetailPage /> },
      { path: "/client/create", element: <ClientCreatePage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/user/create", element: <UserCreatePage /> },
      { path: "/role", element: <RolePage /> },
      { path: "/role/detail", element: <RoleDetailPage /> },
      { path: "/report/clients", element: <ClientReport /> },
      { path: "/report/simcard", element: <SimCardReport /> },
      { path: "/report/accessories", element: <AccessoryReport /> },
      { path: "/report/gps", element: <GPSReport /> },
      { path: "/report/peripherals", element: <PeripheralReport /> },
      { path: "/report/servers", element: <ServerReport /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
