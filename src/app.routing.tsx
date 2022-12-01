/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
// import Invoice from './Invoice/Invoice';
// Icons
import {
  IconBuilding,
  IconDots,
  IconReceipt,
  IconUsers,
  IconWallet
} from "@tabler/icons";
import AdminModule from "./admin/admin.module.";
import AuthModule from "./auth/auth.module";
import { CanActivate } from "./common/components/guards";
import { IModuleLink, Layout } from "./common/components/layouts";
import ExpenseModule from "./expense";
import InvoiceModule from "./invoice";
import UserModule from "./user";
import TestModule from "./test-component";

const modulesLink: IModuleLink[] = [
  {
    icon: <IconWallet size={16} />,
    label: "Expense",
    color: "green",
    isAdminModule: false,
    to: "/expenses"
  },
  {
    icon: <IconDots size={16} />,
    label: "TestMod",
    color: "green",
    isAdminModule: false,
    to: "/testmod"
  },
  {
    icon: <IconReceipt size={16} />,
    label: "Invoice",
    color: "grape",
    isAdminModule: false,
    to: "/invoices"
  },
  
  // {
  //   icon: <SettingsIcon />,
  //   title: 'Settings',
  //   to: '/setting',
  //   isAdminModule: false,
  //   navBottom: true,
  //   BottomProps: {
  //     order: 2
  //   }
  // },

  {
    icon: <IconUsers size={16} />,
    label: "Users",
    isAdminModule: true,
    to: "/admin/users",
    BottomProps: {
      order: 1
    }
  },
  {
    icon: <IconBuilding size={16} />,
    label: "Companies",
    color: "red",
    isAdminModule: true,
    to: "/admin/companies",
    BottomProps: {
      order: 1
    }
  },
  // {
  //   icon: <IconUserPlus size={16} />,
  //   label: "Customers",
  //   color: "cyan",
  //   isAdminModule: true,
  //   to: "/admin/customer",
  //   BottomProps: {
  //     order: 1
  //   }
  // },
  {
    icon: <IconDots />,
    isAdminModule: false,
    label: "More",
    BottomProps: {
      order: 3
    }
  }
];

const AppRouting: FC = () => {

  const route = useRoutes([
    {
      path: "/",
      element: (
        <CanActivate>
          <Layout modules={modulesLink} />
        </CanActivate>
      ),
      children: [
        { path: "expenses", element: <ExpenseModule /> },
        { path: "testmod", element: <TestModule /> },
        {
          path: "admin/*",
          element: <AdminModule />
        },
        {
          path: "user/*",
          element: <UserModule />
        },
        {
          path: "invoices",
          element: <InvoiceModule />,
          children: [
            {
              index: true,
              element: (
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              )
            }
            // { path: ':invoiceId', element: <Invoice /> }
          ]
        },
        {
          path: "*",
          element: (
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          )
        }
      ]
    },
    {
      path: "auth/*",
      element: <AuthModule />
    }
  ]);
  return route;
};

export default AppRouting;
