/* eslint-disable import/prefer-default-export */
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from "mobx";
import { RouterService } from "../services/router.service";

type BaseRow = { id: string };
export abstract class DataGrid<Row extends BaseRow> {
  rowsPerPage = 10;

  page = 0;

  @observable
  private _selectedRows: ReadonlySet<string> = new Set();

  @computed
  get selectedRows() {
    return this._selectedRows;
  }

  constructor(readonly routerService: RouterService, private path: string) {
    makeObservable(this);
  }

  @action
  setSelectedRows = (rows: ReadonlySet<string>) => {
    runInAction(() => {
      this._selectedRows = rows;
    });
  };

  onRowClick = (row: Row) => {
    this.routerService.navigate(`${this.path}/${row.id}`);
  };
}
