/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
import AuthBackground from "./auth-background";
import PasswordRecovery from "./password-recovery";
import SignIn from "./sign-in";
import VerificationCode from "./verification-code";
import NewPassword from "./new-password";
import { AuthNavigationObserver } from "./observers";

export const AuthRoutingModule: FC = () => {
  const route = useRoutes([
    {
      element: <AuthBackground />,
      children: [
        {
          index: true,
          // path: '/',
          element: <SignIn />
        },

        {
          path: "/new-password",
          element: <NewPassword />
        },
        {
          path: "/password-recovery",
          element: <PasswordRecovery />
        },
        {
          path: "/verification-code",
          element: <VerificationCode />
        }
      ]
    }
  ]);
  return route;
};
