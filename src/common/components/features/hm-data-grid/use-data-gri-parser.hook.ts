/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { SortColumn } from "react-data-grid";
import { getComparator, reactDataGridParser } from "./hm-data-grid.util";
import { IHMDataGrid } from "./types";

export default function useRGDParser<TRow extends Record<string, any>>(
  params: IHMDataGrid<TRow>
) {
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const parsedData = useMemo(
    () => reactDataGridParser({ ...params, setSortColumns, sortColumns }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.rows, params.columns, sortColumns, params.selectedRows]
  );
  const sortedRows = useMemo((): readonly TRow[] => {
    if (sortColumns.length === 0) return parsedData.rows;

    return [...parsedData.rows].sort((a, b) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const sort of sortColumns) {
        const { columnKey } = sort;
        const value = a[columnKey];

        const comparator = getComparator(value, sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedData.rows, sortColumns]);
  parsedData.rows = sortedRows;
  return parsedData;
}
