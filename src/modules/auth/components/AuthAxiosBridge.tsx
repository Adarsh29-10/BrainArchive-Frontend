import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthTokenGetter } from "../../../shared/api/axios.api";
import { setFastapiAuthTokenGetter } from "../../../shared/api/fastapi.api";

/**
 * This component connects Auth0 → Axios
 * It runs once after login
 */
function AuthAxiosBridge() {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {

      const safeGetToken = async () => {
        try {
          return await getAccessTokenSilently();
        }
        catch(error: unknown){
          const err = error as { error?: string; message?: string; status?: number };

          if (
            err?.error === "invalid_grant" ||
            err?.message?.includes("Unknown or invalid refresh token") ||
            err?.status === 403
          ) {
            logout({logoutParams: { returnTo: window.location.origin }});
          }

          throw error
        }
      }

      setAuthTokenGetter(safeGetToken);
      setFastapiAuthTokenGetter(safeGetToken);
    }
  }, [isAuthenticated, getAccessTokenSilently, logout]);

  return null;
}

export default AuthAxiosBridge;
