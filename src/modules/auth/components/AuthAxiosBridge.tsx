import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthTokenGetter } from "../../../shared/api/axios.api";
import { setFastapiAuthTokenGetter } from "../../../shared/api/fastapi.api";

/**
 * This component connects Auth0 → Axios
 * It runs once after login
 */
function AuthAxiosBridge() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthTokenGetter(getAccessTokenSilently);
      setFastapiAuthTokenGetter(getAccessTokenSilently);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
}

export default AuthAxiosBridge;
