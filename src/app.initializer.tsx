import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useService } from "react-service-locator";
// import { isResolved } from "../../utils";
import to from "await-to-js";
import { AuthService } from "./auth/auth.service";
import { wait } from "./common/utils";
import { UiStore } from "./core/stores";

const AppInitilizer = ({ children }: { children: JSX.Element }) => {
  const authService = useService(AuthService);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOk, setIsOk] = useState(false);
  const uiStore = useService(UiStore);

  const refreshToken = async () => {
    const [err, data] = await to(authService.refreshToken());
    return true;
  };

  const checkIfOK = async () => {
    const [err, data] = await to(
      uiStore.loading(Promise.all([wait(2000), refreshToken()]))
    );
    setIsOk(true);
  };

  useEffect(() => {
    checkIfOK();
  }, []);

  return isOk ? <>{children}</> : <></>;
};

export default AppInitilizer;
