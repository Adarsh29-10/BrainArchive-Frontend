import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthRedirectHandler() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !isLoading && 
      isAuthenticated && 
      location.pathname === '/'
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  return null;
}

export default AuthRedirectHandler;
