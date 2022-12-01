/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
import { useApolloClient } from "@apollo/client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Drawer,
  Group,
  Image,
  Input,
  MantineProvider,
  Space,
  Switch,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from "@mantine/core";
import { FC, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { useService } from "react-service-locator";
import { AuthService } from "src/auth/auth.service";
import { getSdkApollo } from "src/core/sdk";
import { NotificationService } from "src/core/services/notification.service";
import { TestService } from "src/core/services/test.service";
import "twin.macro";

import { IconPhoto } from "@tabler/icons";

/** Represents Expenses */
const Expenses: FC = () => {
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
      console.log(companies, "fdf");
    } catch (err) {
      const error = err as any;
      notificationService.show(error, "error");
    }
  };

  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider
      theme={
        // { activeStyles: { outlineColor:'red',outlineStyle:'solid', outlineWidth:'4px',
        // outlineOffset: '5px', } }
        theme
      }>
      <div
        className={`card ${currentBreakpoint}`}
        ref={observe}
        tw="space-x-4 p-4 space-y-4">
        <Button
          className="card-header"
          size="xl"
          onClick={async () => companies()}>
          Try one request 😎 .
        </Button>
        <Button
          className="card-header"
          onClick={async () => Promise.all([companies(), currencies()])}>
          Try many request 🤷‍♀️
        </Button>
        <Button
          className="card-header"
          variant="outline"
          // onClick={async () => (authSDK.accessToken = "")}
          onClick={() => console.log(authService.accessToken)}>
          get Access token 👕
        </Button>
        <Button
          className="card-header"
          // eslint-disable-next-line no-return-assign
          onClick={() => (authService.accessToken = "")}>
          set Access token 👕
        </Button>
        <Button
          className="card-header"
          onClick={() => {
            console.log(testService.instanceId);
            testService.login();
          }}>
          Test button
        </Button>
      </div>
      <div>
        <Text>
          Mollit eiusmod irure aliqua nisi tempor fugiat aliqua amet do nulla
          officia cupidatat. Minim magna aliqua amet in qui officia Lorem in.
        </Text>
        <Title>
          Find the
          <Text color="primary" inherit component="span">
            craftsman
          </Text>
          you need!
        </Title>
        <Container size="xs">Default container</Container>
        <Group>
          <Button variant="outline">1</Button>
          <Button variant="light">2</Button>
          <Button variant="outline">3</Button>
        </Group>
        <ThemeIcon>
          <IconPhoto />
        </ThemeIcon>
      </div>
      <div>
        <Button
          leftIcon={<IconPhoto size={18} />}
          sx={{
            ":active&:focus": { outline: "2px solid red", outlineOffset: "2px" }
          }}>
          Follow on Twitter
        </Button>
        <Space h="md" />
        <Button disabled>Follow on Github</Button>
        <Input />
        <Space h="sm" />
        <Checkbox />
        <Switch />
        <Card shadow="sm">
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
        <Space h={10} />
        <Avatar />
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Register">
          {/* Drawer content */}
        </Drawer>

        <Group position="center">
          <Button onClick={() => setOpened(true)}>Open Drawer</Button>
        </Group>
      </div>
    </MantineProvider>
  );
};

export default Expenses;
