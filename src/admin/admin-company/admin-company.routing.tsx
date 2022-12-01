/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
import AdminCreateCompany from "./admin-create-company";
import AdminListCompanies from "./admin-list-companies";
import AdminUpdateCompany from "./admin-update-company";

const AdminCompanyRouting: FC = () => {
  const route = useRoutes([
    {
      // index: true,
      path: "/",
      element: <AdminListCompanies />,
      children: [
        {
          path: "/create-company",
          element: <AdminCreateCompany />
        },
        {
          path: "/:id",
          element: <AdminUpdateCompany />
        }
      ]
    }
  ]);
  return route;
};

export default AdminCompanyRouting;
