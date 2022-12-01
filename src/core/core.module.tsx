/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { ServiceContainer } from "react-service-locator";
import { AuthService } from "src/auth/auth.service";
import { NotificationService } from "src/core/services/notification.service";
import { ApolloClientFactory } from "./client";
import { UiStore } from "./stores";
import { TestService } from "./services/test.service";
import { RouterService } from "./services/router.service";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "src/auth/auth.store";

const CoreModule: FC = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  return (
    <ServiceContainer
      services={[
        TestService,
        { provide: RouterService, useValue: new RouterService(navigate) },
        NotificationService,
        AuthService,
        ApolloClientFactory,
        UiStore,
        AuthStore
      ]}>
      {children}
    </ServiceContainer>
  );
};

export default CoreModule;
