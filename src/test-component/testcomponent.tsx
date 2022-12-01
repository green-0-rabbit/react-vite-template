/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
import { useApolloClient } from "@apollo/client";
import { Box, Button, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import useDimensions from "react-cool-dimensions";
import { useService } from "react-service-locator";
import { AuthService } from "src/auth/auth.service";
import { getSdkApollo } from "src/core/sdk";
import { NotificationService } from "src/core/services/notification.service";
import { TestService } from "src/core/services/test.service";
import "twin.macro";

/** Represents Expenses */
const TestComponent: FC = () => {
  const theme = useMantineTheme();
  const { observe, currentBreakpoint } = useDimensions({
    // The "currentBreakpoint" will be the object key based on the target's width
    // for instance, 0px - 319px (currentBreakpoint = XS),
    // 320px - 479px (currentBreakpoint = SM) and so on
    // breakpoints: { XS: 0, SM: 320, MD: 480, LG: 640 },
    breakpoints: theme?.breakpoints,

    // Will only update the state on breakpoint changed, default is false
    updateOnBreakpointChange: true,
    onResize: ({ currentBreakpoint }) => {
      // Now the event callback will be triggered when breakpoint is changed
      // we can also access the "currentBreakpoint" here
      console.log(currentBreakpoint);
    }
  });

  const testService = useService(TestService);
  const authService = useService(AuthService);
  const notificationService = useService(NotificationService);
  const apolloclient = useApolloClient();
  const client = getSdkApollo(apolloclient);

  const companies = async () => {
    try {
      const { companies } = await client.companies(undefined);
      console.log(companies);
    } catch (err) {
      const error = err as any;
      notificationService.show(error, "error");
    }
  };

  const currencies = async () => {
    try {
      const { currencies } = await client.currencies(undefined);
      console.log(currencies);
    } catch (err) {
      const error = err as any;
      notificationService.show(error, "error");
    }
  };

  const users = async () => {
    try {
      const { users } = await client.users(undefined);
      console.log(companies);
    } catch (err) {
      const error = err as any;
      notificationService.show(error, "error");
    }
  };

  return (
    <Box tw="flex flex-col space-y-4">
      <div className={`card ${currentBreakpoint}`} ref={observe} tw="space-x-4">
        <Button
          className="card-header"
          onClick={async () => testService.companies()}
          radius="lg">
          Try one request 😎 .
        </Button>
        <Button
          className="card-header"
          onClick={async () => Promise.all([companies(), currencies()])}
          radius="lg">
          Try many request 🤷‍♀️
        </Button>
        <Button
          className="card-header"
          // onClick={async () => (authSDK.accessToken = "")}
          onClick={() => console.log(authService.accessToken)}
          radius="lg">
          get Access token 👕
        </Button>
        <Button
          className="card-header"
          // eslint-disable-next-line no-return-assign
          onClick={() => (authService.accessToken = "")}
          radius="lg">
          set Access token 👕
        </Button>
        <Button
          className="card-header"
          onClick={() => {
            console.log(testService.instanceId);
            testService.login();
          }}
          radius="lg">
          Test button
        </Button>
        <Button
          className="card-header"
          onClick={async () =>
            Promise.all([
              authService.refreshToken(),
              authService.refreshToken(),
              authService.refreshToken()
            ])
          }
          radius="lg">
          refresh Token
        </Button>
      </div>
    </Box>
  );
};

export default TestComponent;
