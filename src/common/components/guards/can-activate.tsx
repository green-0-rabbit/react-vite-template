import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useService } from "react-service-locator";
import { AuthService } from "src/auth/auth.service";
import { useServices } from "../../hooks";
import { isResolved } from "../../utils";

const CanActivate: FC = ({ children }) => {
  const authService = useService(AuthService);
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = async () => {
    const token = authService.accessToken;
    if (!token) {
      await authService.refreshToken();
      return authService.accessToken;
    }
    return token;
  };

  const isAuthenticated = async () => {
    const accessToken = await getToken();

    if (!accessToken) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return navigate("/auth", {
        state: { from: location },
        replace: true
      });
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return <>{children}</>;
};

export default CanActivate;
