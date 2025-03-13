import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import { InstalledItems } from "../page/installation/InstalledItems";
import CreateForm from "../page/form/CreateForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <InstalledItems />,
      },
      { path: "create", element: <CreateForm /> },
    ],
  },
]);

export default router;
