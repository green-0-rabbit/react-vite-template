/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/prefer-default-export */
import { DataGridProps, SelectColumn } from "react-data-grid";
import { fieldRegex, flattenObj } from "src/common/utils";
import { RDGParserParams } from "./types";

export const reactDataGridParser = <TRow extends Record<string, any>>(
  params: RDGParserParams<TRow>
) => {
  const {
    columns,
    withSorting,
    withColumnResizing,
    withRowSelection,
    rowHeight,
    headerRowHeight,
    rows,
    rowKeyGetter,
    onRowClick,
    sortColumns,
    onSort,
    setSortColumns,
    selectedRows,
    onRowSelectionChange
  } = params;

  const parsedParam: DataGridProps<TRow> = {
    columns: columns.map((column) => ({
      name: column.name,
      key: column.key,
      width: column.width,
      formatter:
        column.render !== undefined
          ? (fProps) =>
              column.render!({
                row: fProps.row as TRow,
                rowIndex: fProps.rowIdx
              })
          : undefined,
      resizable: column.resizable,
      sortable: column.sortable
    })),
    defaultColumnOptions: {
      sortable: withSorting,
      resizable: withColumnResizing
    },
    // rows: flatedrows as unknown as readonly TRow[],
    rows,
    // rows: flattenObj(rows) as unknown as readonly TRow[],
    rowHeight,
    headerRowHeight,
    rowKeyGetter: rowKeyGetter as unknown as (row: unknown) => any,
    onRowClick: onRowClick
      ? (rowIdx, row, column) =>
          column.key !== "select-row" ? onRowClick(row as TRow) : undefined
      : undefined,
    // sortColumns: sortColumns as unknown as readonly Readonly<SortColumn>[],
    sortColumns,
    // onSortColumnsChange: onSort,
    onSortColumnsChange: (rows) => {
      setSortColumns(rows);
      if (onSort) {
        onSort(rows);
      }
    },
    selectedRows,
    onSelectedRowsChange: onRowSelectionChange
      ? (rows) => onRowSelectionChange(rows as Set<string>)
      : undefined
  };

  if (withRowSelection) {
    parsedParam.columns = [{ ...SelectColumn }, ...parsedParam.columns];
  }

  return parsedParam;
};

type Comparator<TRow> = (a: TRow, b: TRow) => number;

export const getComparator = <TRow extends Record<string, any>, TValue>(
  value: TValue,
  sortColumn: keyof TRow
): Comparator<TRow> => {
  const type = typeof value;
  switch (type) {
    case "number":
      return (a, b) => a[sortColumn] - b[sortColumn];
    case "string":
      // eslint-disable-next-line no-case-declarations
      const val = value as string;
      if (fieldRegex.dateISO.test(val)) {
        return (a, b) => {
          const date1 = new Date(a[sortColumn]);
          const date2 = new Date(b[sortColumn]);
          return date1.getTime() - date2.getTime();
        };
      }
      return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);

    case "boolean":
      return (a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
    default:
      throw new Error(`unsupported typeof value: "${String(sortColumn)}"`);
  }
};
