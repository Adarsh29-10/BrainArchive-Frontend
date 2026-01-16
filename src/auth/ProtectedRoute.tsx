import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthLoadingState } from "../components/loaders/LoaderStates";

function ProtectedRoute() {
  const {isAuthenticated, isLoading} = useAuth0();

  if(isLoading) return <AuthLoadingState />
  return isAuthenticated ? <Outlet /> : <Navigate to={'/'} replace />
}

export default ProtectedRoute