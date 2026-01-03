import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthTokenGetter } from "../apis/axios.api";

/**
 * This component connects Auth0 → Axios
 * It runs once after login
 */
function AuthAxiosBridge() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthTokenGetter(getAccessTokenSilently);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
}

export default AuthAxiosBridge;
