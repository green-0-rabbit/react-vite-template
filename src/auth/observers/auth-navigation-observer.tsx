/* eslint-disable react/require-default-props */
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowEvent } from "@mantine/hooks";
import { useServices } from "src/common/hooks";
import { IBaseService } from "src/common/types";

type IService = IBaseService;

const AuthNavigationObserver: FC = (props) => {
  const { children } = props;
  // @see https://stackoverflow.com/questions/70028987/react-router-v6-display-previous-route
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useServices<IService>();

  /**
   *   Get redirect location or provide fallback
   *  @see https://stackoverflow.com/questions/70622541/how-can-i-use-previous-location-to-redirect-user-in-react-router-v6
   */
  const from = location.state?.from || "/";

  const redirectToHome = (pathname: string) => {
    const isAuthPath = pathname.includes("auth");
    const { uid } = auth;
    if (isAuthPath && uid) {
      return navigate(from, { replace: true });
    }
    return;
  };

  const redirectToAuth = (e: StorageEvent) => {
    const { key } = e;
    if (key === "uid") {
      navigate("auth", { replace: true })
    }
  };
  // useEffect(() => {
  //   redirectToHome(location.pathname);
  // }, [location.pathname]);

  useWindowEvent("storage", redirectToAuth);

  return <>{children}</>;
};

export default AuthNavigationObserver;
