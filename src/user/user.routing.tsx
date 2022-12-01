/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { ServicesProvider } from "src/common/contexts";
import { userServices } from "./services";
import { IUpdateUserServices, UpdateUser, UpdateUserStore } from "./update";

// test
const UserRoutingModule: FC = () => {
  const updateServices: IUpdateUserServices = {
    user: { ...userServices },
    userStore: new UpdateUserStore()
    // userStore: adminUpdateUserStore
  };
  const route = useRoutes([
    {
      index: true,
      element: (
        <ServicesProvider services={{ ...updateServices }}>
          <UpdateUser />
        </ServicesProvider>
      )
    }
  ]);
  return route;
};

export default UserRoutingModule;
