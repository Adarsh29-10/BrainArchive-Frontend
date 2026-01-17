import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute() {
  const {isAuthenticated, isLoading} = useAuth0();

  if(isLoading) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to={'/'} replace />
}

export default ProtectedRoute