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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
