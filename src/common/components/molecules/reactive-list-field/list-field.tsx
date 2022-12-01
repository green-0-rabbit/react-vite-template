import { Box, Checkbox } from "@mantine/core";
import styled from "@emotion/styled";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactElement,
  useEffect,
  useState
} from "react";
import { ListFieldMetaProps } from "./types";
// https://blog.ippon.fr/2018/05/29/atomic-design-dans-la-pratique/

const Content = styled(Box)`
  width: 100%;
  overflow-x: auto;
  padding: 5px 12px 12px 3px;
  & > :nth-of-type(n) {
    margin-bottom: 8px;
  }
`;
const UnstyledList = ({
  length,
  ...props
}: {
  length: number;
  defaultValue: any;
}) => <Box {...props} />;
const ListFooter = styled(Box)`
  display: flex;
  & > :nth-of-type(n) {
    margin-right: 8px;
  }
`;
const LineNumber = styled(Box)``;
const LineNumberGroup = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 12px;
  & > :last-child {
    &:hover {
      outline-style: none;
      user-select: none;
    }
  }
`;
const CheckboxStyled = styled(Checkbox)`
  padding: 0px;
  margin-right: 8px;
`;
const ListHead = styled(Box)`
  font-size: 16px;
  padding-left: 13px;
  border-bottom: 1px solid var(--line-color);
  padding-top: 5px;
  padding-bottom: 5px;
`;
const ListRow = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ListCell = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 35px;
  &:hover {
    outline-style: solid;
    outline-color: #1c60d6;
    outline-width: 1px;
  }
  & :focus {
    background-color: #dddddd9c;
  }
`;
const List = styled(UnstyledList)`
  --line-color: #dcd7d7d4;
  display: grid;
  min-width: 300px;
  grid-template-columns: ${(props) =>
    props.defaultValue
      ? ` minmax(100px, auto) repeat(${props.length}, minmax(80px,1fr))`
      : `repeat(${props.length}, minmax(80px,1fr))`};
  grid-auto-rows: auto;
  border: 1px solid var(--line-color);
  border-radius: 8px;
  box-shadow: 2px 3px 18px 4px #5f5f5f1a;
  & > :nth-of-type(n) {
    /* access the table row on all column  */
    & > :last-child {
      & > :nth-of-type(n) {
        border-bottom: 1px solid var(--line-color);
      }
      & > :last-child {
        border-bottom: none;
      }
    }
  }
  /* add column delemiter */
  & > :nth-of-type(n) {
    border-right: 1px solid var(--line-color);
  }
  & > :first-of-type {
    border-right: 1px solid var(--line-color);
    /* background-color: blue; */
  }
  & > :last-child {
    border-right: none;
    /* background-color: blue; */
  }
`;

type BaseMetaType = ListFieldMetaProps;
// type BaseMetaType = IRenderFieldList["fieldsMeta"][0];
interface ISelected {
  id: string;
  selected: boolean;
}
interface IListField<T extends BaseMetaType> {
  fieldsMeta: T[];
  ids: string[];
  // eslint-disable-next-line react/require-default-props
  defaultValue?: unknown;
  row: (params: { id: string; index: number; fieldMeta: T }) => ReactElement;
  renderAppend: () => ReactElement;
  renderRemove: (rows: number[]) => ReactElement;
}
const ReactiveListField = <T extends BaseMetaType>(props: IListField<T>) => {
  const { fieldsMeta, ids, defaultValue, row, renderAppend, renderRemove } =
    props;
  const [selectedRows, setSelectedRows] = useState<ISelected[]>();
  const [selectedCount, setSelectedCount] = useState<number>();

  useEffect(() => {
    const selectRowsDefault = ids.map((id) => ({ id, selected: false }));
    setSelectedRows(selectRowsDefault);
  }, [ids]);
  useEffect(() => {
    if (selectedRows) {
      const count = selectedRows.filter(
        (value) => value.selected === true
      ).length;
      setSelectedCount(count);
    }
  }, [selectedRows]);

  const handleCheckboxChange = (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedRows) {
      const rowIndex = selectedRows.findIndex((value) => value.id === id);
      if (rowIndex >= 0) {
        const selectedRow = {
          id: selectedRows[rowIndex].id,
          selected: event.target.checked
        };
        selectedRows[rowIndex] = selectedRow;
        setSelectedRows([...selectedRows]);
      }
    }
  };
  const handleCheckAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedRows) {
      const newSeletedRows = selectedRows.map((value) => ({
        id: value.id,
        selected: event.target.checked
      }));
      setSelectedRows([...newSeletedRows]);
    }
  };

  return selectedRows ? (
    <Content>
      <List defaultValue={undefined} length={fieldsMeta.length}>
        {defaultValue ? (
          <LineNumber>
            <ListHead
            // sx={{ paddingLeft: 0 }}
            >
              <LineNumberGroup>
                <CheckboxStyled onChange={handleCheckAllChange} />
                <Box>No.</Box>
              </LineNumberGroup>
            </ListHead>
            <ListRow>
              {selectedRows.map((value, index) => (
                <LineNumberGroup key={`${value.id}-cell-number`}>
                  <CheckboxStyled
                    checked={value.selected}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleCheckboxChange(value.id, e)
                    }
                  />
                  <ListCell>{index}</ListCell>
                </LineNumberGroup>
              ))}
            </ListRow>
          </LineNumber>
        ) : null}
        {fieldsMeta.map((fieldMeta) => (
          <Box key={`${fieldMeta.inputKey}-row`}>
            <ListHead>{fieldMeta.label}</ListHead>
            <ListRow>
              {ids.map((id, index) => (
                <ListCell key={`${id}-cell`}>
                  {row({ id, fieldMeta, index })}
                </ListCell>
              ))}
            </ListRow>
          </Box>
        ))}
      </List>
      {defaultValue ? (
        <ListFooter>
          {renderAppend()}
          {selectedCount
            ? renderRemove(
                selectedRows
                  .filter((value) => value.selected === true)
                  .map((value, index) => index) // a revoir
              )
            : null}
        </ListFooter>
      ) : null}
    </Content>
  ) : null;
};

export default ReactiveListField;
