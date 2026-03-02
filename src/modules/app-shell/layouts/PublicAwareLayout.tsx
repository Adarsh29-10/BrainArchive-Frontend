import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";

function PublicAwareLayout() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;
  if (isAuthenticated) return <AppLayout />;

  return (
    <div className="h-dvh min-h-0 bg-zinc-950">
      <Outlet />
    </div>
  );
}

export default PublicAwareLayout;
