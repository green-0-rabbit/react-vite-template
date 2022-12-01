/* eslint-disable react/no-unescaped-entities */
import { ApolloProvider } from "@apollo/client/react";
import NiceModal from "@ebay/nice-modal-react";
import { Box, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { FC } from "react";
import { ServiceContainer, useService } from "react-service-locator";
import AppInitilizer from "./app.initializer";
import AppRouting from "./app.routing";
import theme from "./app.theming";
import { AuthNavigationObserver } from "./auth/observers";
import { AppLoading } from "./common/components/atoms";
import { ApolloClientFactory } from "./core/client";

const AppModule: FC = () => {
  const apolloClientFactory = useService(ApolloClientFactory);
  const { client } = apolloClientFactory;
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <AppLoading />
      <NotificationsProvider>
        <NiceModal.Provider>
          <ApolloProvider client={client}>
            <AppInitilizer>
              {/* <AuthNavigationObserver> */}
              <AppRouting />
              {/* </AuthNavigationObserver> */}
            </AppInitilizer>
          </ApolloProvider>
        </NiceModal.Provider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default AppModule;
