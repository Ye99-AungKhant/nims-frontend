import { cloneElement, ReactElement } from "react";
import { Error301Page } from "./pages/Error301Page";
import useUserStore from "../../store/useUserStore";

interface PageProps {
  children: ReactElement;
  page: string; // Page name
  scope: "view" | "create" | "update" | "delete" | "renewal" | "repair";
  errorProps?: any;
  RenderError?: () => ReactElement;
}

const PermissionGate = ({
  children,
  page,
  scope,
  errorProps = null,
  RenderError = () => <Error301Page />,
}: PageProps) => {
  const { hasPermission } = useUserStore();
  const permissionGranted = hasPermission(page, scope);

  if (!permissionGranted && !errorProps) return <RenderError />;
  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });

  return <>{children}</>;
};

export default PermissionGate;
