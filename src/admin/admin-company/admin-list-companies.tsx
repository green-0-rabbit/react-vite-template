/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import { Box } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useService } from "react-service-locator";
import { HMDataGrid, IColumn } from "src/common/components/features";
import {
  ReactiveListButton,
  RenderButtonType
} from "src/common/components/molecules";
import { AdminCompanyStore } from "./admin-company.store";

const AdminListCompanies: FC = () => {
  const adminCompanyStore = useService(AdminCompanyStore);
  const navigate = useNavigate();
  type Data = typeof adminCompanyStore.companies;

  useEffect(() => {
    adminCompanyStore.loadData();
  }, [adminCompanyStore]);

  const columns: IColumn<Data[0]>[] = [
    {
      key: "id",
      name: "ID",
      sortable: false
    },
    { key: "updatedAt", name: "Updated At" },
    { key: "abbreviation", name: "Abbreviation" },
    {
      key: "isGroup",
      name: "Is Head Office"
    },
    {
      key: "createdAt",
      name: "Is Active",
      type: "date"
    }
  ];
  const buttonsHeadMeta: RenderButtonType[] = [
    {
      name: "",
      type: "refresh",
      onClick: async () => adminCompanyStore.refreshData()
    },
    {
      name: "Create",
      type: "button",
      onClick: () => {
        navigate("create-company");
      }
    }
  ];
  return (
    <Box tw="space-y-4">
      <Box tw="flex justify-end items-center">
        <ReactiveListButton actionsMeta={buttonsHeadMeta} position="end" />
      </Box>
      <HMDataGrid
        withRowSelection
        withSorting
        columns={columns}
        rows={adminCompanyStore.companies}
        onRowClick={adminCompanyStore.onRowClick}
        selectedRows={adminCompanyStore.selectedRows}
        onRowSelectionChange={adminCompanyStore.setSelectedRows}
      />
      <Outlet />
    </Box>
  );
};

export default observer(AdminListCompanies);
