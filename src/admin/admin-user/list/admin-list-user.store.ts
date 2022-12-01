/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
import { makeAutoObservable, toJS, runInAction } from "mobx";
import { ChangeEvent } from "react";
import { CalculatedColumn, SortColumn } from "react-data-grid";
import { customMerging, isResolved, flattenObj } from "src/common/utils";
import { IStoreServices } from "../types";
import {
  AdminListUsersPayloadType,
  adminListUsersPayload as defaultRowData
} from "./payloads";

/**
 * Mobx - runInAction() usage. Why do we need it?
 * @see https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 */

type User = AdminListUsersPayloadType;
type Comparator = (a: IRow, b: IRow) => number;

interface IRow {
  email: string;
  userStatus: string;
  id: string;
  enabled: boolean;
}

interface IQueryParams {
  filter: object;
  limit: number;
  nextToken?: string;
}

type UpdataUserStoreServices = Omit<IStoreServices<User>, "methods">;
class AdminListUserStore {
  private _rows: IRow[] = [];

  private _sortColumns: SortColumn[] = [];

  private _selectedRows: ReadonlySet<string> = new Set();

  rowsPerPage = 10;

  private _nextToken: IQueryParams["nextToken"];

  private _service?: UpdataUserStoreServices;

  page = 0;

  constructor() {
    makeAutoObservable(this);
  }

  private get _services() {
    if (!this._service) {
      throw new Error("servicesFactory was not call");
    }
    return this._service;
  }

  get sortedRows() {
    const rows = this.rowsJSON;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { sortColumns, _getComparator } = this;
    if (sortColumns.length === 0) return rows;

    const newSortedRows = [...rows];
    newSortedRows.sort((a, b) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const sort of sortColumns) {
        const comparator = _getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
    return newSortedRows;
  }

  get isRowSelected() {
    return this._selectedRows.size === 1 && !this.isRowsSelected;
  }

  get isRowsSelected() {
    return this._selectedRows.size > 1;
  }

  get selectedRows() {
    return this._selectedRows;
  }

  get sortColumns() {
    return this._sortColumns;
  }

  onRowClick = (
    rowIdx: number,
    row: IRow,
    column: CalculatedColumn<IRow, unknown>
  ) => {
    const { navigate } = this._services;
    const { key } = column;
    if (key !== "select-row") {
      navigate(`${row.id}`);
    }
  };

  setSortColumns = (columns: SortColumn[]) => {
    runInAction(() => {
      this._sortColumns = columns;
    });
  };

  setSelectedRows = (rows: typeof this._selectedRows) => {
    runInAction(() => {
      this._selectedRows = rows;
    });
  };

  get rowsJSON() {
    return toJS(this._rows);
  }

  servicesRegister = (service: UpdataUserStoreServices) => {
    this._service = service;
  };

  loadData = async (token?: string) => {
    const params = {
      filter: {},
      limit: this.rowsPerPage,
      nextToken: token
    };

    await this._listUsersData(params);
    // setNextTokens(listStore.nextToken as string);
    // if (listStore.users) {
    //   setRows(listStore.users);
    // }
  };

  refreshData = async () => {
    const params = {
      filter: {},
      limit: this.rowsPerPage,
      nextToken: this._nextToken
    };

    await this._listUsersData(params);
  };

  private _listUsersData = async (params: IQueryParams) => {
    const { admin, logger } = this._services;

    const res = await admin.listUsersService(params);
    if (!isResolved(res)) {
      const { error } = res;
      logger.notify(error, "error");
      return;
    }
    const { items, nextToken } = res.data;

    const rows = this._parseUser(items as User[]);
    runInAction(() => {
      this._nextToken = nextToken as string;
      this._rows = rows;
    });
  };

  paginationOnPageChange = async (event: any, newPage: number) => {
    runInAction(() => {
      this.page = newPage;
    });

    const params = {
      filter: {},
      limit: this.rowsPerPage,
      nextToken: this._nextToken
    };
    await this._listUsersData(params);
  };

  paginationOnRowsPerPageChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rowPerPage = parseInt(event.target.value, 10);
    runInAction(() => {
      this.rowsPerPage = rowPerPage;
      // reload initial page
      this.page = 0;
      this._nextToken = undefined;
    });

    const params = {
      filter: {},
      limit: this.rowsPerPage,
      nextToken: this._nextToken
    };
    await this._listUsersData(params);
  };

  private _parseUser = (users: User[]) => {
    const newUsers = users.map((item, index) => {
      const mergedData = customMerging(item, defaultRowData);

      const flatObj = flattenObj(mergedData);
      return {
        id: flatObj.id!,
        email: flatObj["authData.username"]!,
        userStatus: flatObj["authData.userStatus"]!,
        enabled: flatObj["authData.enabled"]
      };
    });
    return newUsers;
  };

  private _getComparator(sortColumn: string): Comparator {
    switch (sortColumn) {
      case "email":
        return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
      case "userStatus":
        return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
      case "enabled":
        return (a, b) =>
          a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }
}
export default AdminListUserStore;
