/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import { Pagination } from "@mantine/core";
import DataGrid from "react-data-grid";
import DataGridContainer from "../../molecules/data-grid-container";
import { IHMDataGrid, RowHeight } from "./types";
import useRGDParser from "./use-data-gri-parser.hook";
import useRenderRow from "./use-render-row.hook";

const HMDataGrid = <TRow extends Record<string, any>>(
  props: IHMDataGrid<TRow>
) => {
  const {
    columns,
    // sortColumns,
    rows,
    selectedRows,
    headerRowHeight,
    rowHeight = RowHeight.standard,
    onRowClick,
    onRowSelectionChange,
    onSort,
    rowKeyGetter = (row: TRow) => row.id,
    withColumnResizing = false,
    withRowSelection = false,
    withSorting = false
  } = props;

  const params = {
    columns,
    rows,
    selectedRows,
    headerRowHeight,
    rowHeight,
    onRowClick,
    onRowSelectionChange,
    onSort,
    rowKeyGetter,
    withColumnResizing,
    withRowSelection,
    withSorting
  };

  // this hook is required for flattering row and row render
  const data = useRenderRow<TRow>(params);
  const parsedData = useRGDParser<TRow>(data);

  return (
    <>
      <DataGridContainer themeColor="light">
        <DataGrid {...parsedData} />
      </DataGridContainer>
      <Pagination total={10} />
    </>
  );
};

export default HMDataGrid;
