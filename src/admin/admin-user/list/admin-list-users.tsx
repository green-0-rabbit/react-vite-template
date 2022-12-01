/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import DataGrid, { Column, SelectColumn } from "react-data-grid";
import { FC, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import {
  ReactiveListButton,
  DataGridContainer,
  RenderButtonType
} from "src/common/components/molecules";
import { observer } from "mobx-react-lite";
import { Box, Checkbox, Pagination } from "@mantine/core";
import { IBaseService } from "src/common/types";
import { useServices } from "../../../common/hooks";
import { IAdminListUserServices as IService } from "./types";

const columns: Column<Data>[] = [
  SelectColumn,
  { key: "id", name: "ID", sortable: false },
  { key: "email", name: "Email" },
  { key: "userStatus", name: "Status" },
  {
    key: "enabled",
    name: "Enabled",
    formatter(props) {
      const value = props.row.enabled;
      return (
        <Checkbox
          color="secondary"
          checked={value}
          // inputProps={{ "aria-label": "controlled" }}
        />
      );
    }
  }
];

const rowKeyGetter = (row: Data) => row.id;

interface Data {
  email: string;
  userStatus: string;
  id: string;
  enabled: boolean;
}

enum RowHeight {
  small = 20,
  standard = 36,
  big = 45
}

const AdminListUsers: FC = observer(() => {
  const navigate = useNavigate();
  // const theme = useTheme();
  const { admin, listUserStore, logger } = useServices<
    IService & IBaseService
  >();
  useEffect(() => {
    listUserStore.servicesRegister({ admin, logger, navigate });
    listUserStore.loadData();
  }, [listUserStore]);

  const sortedRows = useMemo(
    () => listUserStore.sortedRows,
    [listUserStore.rowsJSON, listUserStore.sortColumns]
  );

  const buttonsHeadMeta: RenderButtonType[] = [
    {
      name: "",
      type: "refresh",
      onClick: () => listUserStore.refreshData()
    },
    {
      name: "Create",
      type: "button",
      onClick: () => {
        navigate("create-user");
      }
    }
  ];
  return (
    <Box tw="space-y-6">
      <Box tw="flex justify-end items-center mt-3 space-x-3">
        <ReactiveListButton actionsMeta={buttonsHeadMeta} position="end" />
      </Box>
      <DataGridContainer
        themeColor="light"
        // themeColor={theme.palette.mode}
      >
        <DataGrid
          columns={columns}
          defaultColumnOptions={{
            sortable: true
          }}
          rows={sortedRows}
          rowHeight={RowHeight.standard}
          selectedRows={listUserStore.selectedRows}
          onSelectedRowsChange={listUserStore.setSelectedRows}
          rowKeyGetter={rowKeyGetter}
          sortColumns={listUserStore.sortColumns}
          onSortColumnsChange={listUserStore.setSortColumns}
          onRowClick={listUserStore.onRowClick}
        />
      </DataGridContainer>
      <Pagination total={listUserStore.page} />
      <Outlet />
    </Box>
  );
});

export default AdminListUsers;
