/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { fieldRegex, flattenObj } from "src/common/utils";
import { renderRows } from "./render-row";
import { ICellRenderProps, IColumn, IHMDataGrid, RowType } from "./types";

export default function useRenderRow<TRow extends Record<string, any>>(
  params: IHMDataGrid<TRow>
) {
  const parsedData = useMemo(
    () => {
      const { columns, rows } = params;
      const row = rows[0];
      if (!row) {
        return params;
      }
      const flatedrows = rows.map((row) => flattenObj(row));

      const newColumn = (
        columnType: RowType,
        column: IColumn<TRow>,
        columnKey: IColumn<TRow>["key"]
      ): typeof column => ({
        ...column,
        render: (props) => {
          const rowKey = columnKey as unknown as keyof typeof props.row;
          const value = props.row[rowKey];
          const render = renderRows[columnType];
          return render(value);
        }
      });

      const newColumns = columns.map((column) => {
        const { type, key } = column;
        const columnType = type ?? "text";

        const value = row[key];

        const typeofValue = typeof value;

        if (!type) {
          switch (typeofValue) {
            case "number":
              return newColumn("text", column, key);

            case "string":
              if (fieldRegex.dateISO.test(value)) {
                return newColumn("date", column, key);
              }
              return newColumn("text", column, key);

            case "boolean":
              return newColumn("checkbox", column, key);
            default:
              return newColumn(columnType, column, key);
          }
        }

        return newColumn(columnType, column, key);
      });

      const newData = {
        ...params,
        columns: newColumns,
        rows: flatedrows as unknown as TRow[]
      };
      return newData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.rows, params.columns]
  );

  return parsedData;
}
