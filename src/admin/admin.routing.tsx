/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
import AdminCompanyModule from "./admin-company";
import AdminUserModule from "./admin-user";

const AdminRoutingModule: FC = () => {
  const route = useRoutes([
    {
      path: "users/*",
      element: <AdminUserModule />
    },
    {
      path: "companies/*",
      element: <AdminCompanyModule />
    }
    // {
    //   path: "customer/*",
    //   element: <AdminCustomerModule />
    // }
    // {
    //   path: "/:userId",
    //   element: <User />
    // },
    // {
    //   path: "/create-user",
    //   element: <CreateUser />
    // }
  ]);
  return route;
};

export default AdminRoutingModule;
