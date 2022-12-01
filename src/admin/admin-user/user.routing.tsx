/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { ServicesProvider } from "src/common/contexts";
import DrawerBrand from "src/common/components/molecules/Drawer";
import User from "./update/admin-update-user";
import AdminListUsers from "./list/admin-list-users";
import { adminAPIService } from "./services";
import {
  AdminCreateUser,
  IAdminCreateUserServices,
  AdminCreateUserStore
} from "./create";
import { AdminUpdateUserStore, IAdminUpdateUserServices } from "./update";
import { AdminListUserStore, IAdminListUserServices } from "./list";

const AdminUserRoutingModule: FC = () => {
  const createServices: IAdminCreateUserServices = {
    admin: { ...adminAPIService },
    userStore: new AdminCreateUserStore()
  };

  const updateServices: IAdminUpdateUserServices = {
    admin: { ...adminAPIService },
    userStore: new AdminUpdateUserStore()
    // userStore: adminUpdateUserStore
  };

  const listServices: IAdminListUserServices = {
    admin: { ...adminAPIService },
    listUserStore: new AdminListUserStore()
  };

  const route = useRoutes([
    {
      // index: true,
      path: "/",
      element: (
        <ServicesProvider services={{ ...listServices }}>
          <AdminListUsers />
        </ServicesProvider>
      ),
      children: [
        {
          path: "/:userId",
          element: (
            <ServicesProvider services={{ ...updateServices }}>
              <DrawerBrand>
                <User />
              </DrawerBrand>
            </ServicesProvider>
          )
        },
        {
          path: "/create-user",
          element: (
            <ServicesProvider services={{ ...createServices }}>
              <DrawerBrand>
                <AdminCreateUser />
              </DrawerBrand>
            </ServicesProvider>
          )
        }
      ]
    }
  ]);
  return route;
};

export default AdminUserRoutingModule;
