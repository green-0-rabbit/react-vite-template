/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
import { FC, Children, isValidElement, cloneElement } from "react";
// import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Text, Global } from "@mantine/core";

const GridHeader = styled("div")(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "light" ? "#fff" : "#212121",
  borderTop: "none",
  // border: `1px solid ${theme.palette.mode === "light" ? "#ddd" : " #444"}`,
  // border: "1px solid #ddd",
  borderRadius: "8px 8px 0 0 ",
  display: "flex",
  // justifyContent: 'flex-end',
  paddingInline: "12px",
  paddingBlock: "8px"
}));
const GridFooter = styled("div")(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "light" ? "#fff" : "#212121",
  borderTop: "none",
  // border: `1px solid ${theme.palette.mode === "light" ? "#ddd" : " #444"}`,
  // border: "1px solid #ddd",
  // borderRadius: "0 0 8px 8px",    ,
  display: "flex",
  justifyContent: "flex-end",
  paddingInline: "12px",
  paddingBlock: "8px"
}));

const Root = styled("div")``;
const List = styled("div")`
  width: 100%;
  .rdg {
    /* border-bottom: none;
    border-top: none; */
    border-style: none;
    color: #838383;

    @media (min-height: 800px) {
      height: 100%;
    }
  }
  .rdg-header-sort-cell {
    align-items: center;
  }
  .rdg .rdg-header-row:nth-of-type(1) {
    /* border-bottom: none;
    border-bottom-width: 0px; */
    background-color: #ffffff;
    & .rdg-cell {
      border-style: none;
      /* border-bottom-width: 0px; */
      /* min-width: max-content; */
    }
  }

  .rdg .rdg-row:nth-of-type(1) {
    /* border-top: none; */
  }
  .rdg-row,
  .rdg-header-row {
    & [aria-selected="true"] {
      box-shadow: none;
    }
  }
  & .rdg-cell {
    display: flex;
    border-right: none;
    padding: 0 16px 0 16px;
  }
`;
const LoadMore = styled(Button)`
  margin: 5px;
`;

const EmptyRowsRenderer = () => (
  <div style={{ textAlign: "center", gridColumn: "1/-1" }}>
    Nothing to show
    <span lang="ja" title="ショボーン">
      (´・ω・`)
    </span>
  </div>
);

interface IDataGridContainer {
  themeColor: "dark" | "light";
}

const DataGridContainer: FC<IDataGridContainer> = (props) => {
  const { children, themeColor } = props;
  let rowCount = 1;
  let selectedRowCount = 0;
  const modifiedChildren = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (isValidElement(child)) {
      rowCount = child.props.rows.length + 1;
      selectedRowCount = child.props.selectedRows
        ? child.props.selectedRows.size
        : 0;
      return cloneElement<any>(child, {
        className: themeColor === "dark" ? "rdg-dark" : "rdg-light",
        components: { noRowsFallback: <EmptyRowsRenderer /> }
      });
    }
    return child;
  });
  return (
    <Root {...props}>
      <Global
        styles={{
          ".rdg ": {
            "--row-count": `${rowCount}`,
            minHeight: `${
              rowCount >= 13
                ? "calc(100vh - 310px)"
                : "calc(var(--header-row-height) * var(--row-count))"
            }`
          }
        }}
      />
      <GridHeader style={{ height: "35px" }}>
        {selectedRowCount ? (
          <Text variant="text">
            {selectedRowCount}
            item(s) selected
          </Text>
        ) : null}
      </GridHeader>
      <List>{modifiedChildren}</List>
      <GridFooter>
        {/* <Button variant="contained">
          <NavigateBefore />
        </Button>
        <Button variant="contained">
          <NavigateNext />
        </Button>

        <LoadMore color="primary" variant="contained" size="small">
          Load more
        </LoadMore> */}
      </GridFooter>
    </Root>
  );
};

export default DataGridContainer;
