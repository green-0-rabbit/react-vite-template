/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/require-default-props */
/*
import {
  useAutocomplete,
  AutocompleteInputChangeReason,
  AutocompleteGroupedOption
} from "@mui/base/AutocompleteUnstyled";
import styled from "@emotion/styled";
// eslint-disable-next-line object-curly-newline
import { HTMLAttributes, Key, ReactNode, Ref, SyntheticEvent } from "react";
import "twin.macro";

const Listbox = styled.ul`
  margin: 0;
  padding: 0;
  border-radius: 3px;
  z-index: 40;
  position: absolute;
  list-style: none;
  background-color: white;
  overflow: auto;
  min-width: 100%;
  max-height: 300px;
  box-shadow: 0px 3px 21px 3px rgba(0, 0, 0, 0.07);
`;

const Container = styled.div`
  display: block;
  position: relative;
`;

const Inputbox = styled.div`
  min-width: 100%;
`;

const GroupLabel = styled.div`
  background-color: rgba(92, 90, 90, 0.356);
`;

interface AutocompleteRenderInputParams {
  id: string;
  inputProps: ReturnType<ReturnType<typeof useAutocomplete>["getInputProps"]>;
}

interface IAutoComplete<T> {
  id: string;
  readonly options: T[];
  groupBy?: ((option: T) => string) | undefined;
  getOptionLabel: (option: string | T) => string;
  onInputChange:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
      ) => void)
    | undefined;
  renderInput: (
    params: AutocompleteRenderInputParams,
    inputLabelProps: ReturnType<
      ReturnType<typeof useAutocomplete>["getInputLabelProps"]
    >,
    clearButtonProps: ReturnType<
      ReturnType<typeof useAutocomplete>["getClearProps"]
    >
  ) => React.ReactNode;
  renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: T) => ReactNode;
  ref?: Ref<HTMLDivElement> | null;
  renderGroup?: (params: {
    key: Key;
    group: any;
    children: ReactNode;
  }) => ReactNode;
}

const AutoComplete = <T extends object>(props: IAutoComplete<T>) => {
  const {
    id,
    options,
    groupBy,
    getOptionLabel,
    renderOption,
    renderInput,
    renderGroup,
    onInputChange,
    ref
  } = props;

  const {
    getRootProps,
    getInputLabelProps,
    getClearProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id,
    options,
    groupBy,
    getOptionLabel,
    onInputChange,
    clearOnEscape: true,
    freeSolo: true
  });

  const renderGroups = (key: Key, group: any, children: ReactNode) => {
    const defaultRenderGroup = (
      <li key={key}>
        <GroupLabel>{group}</GroupLabel>
        <ul>{children}</ul>
      </li>
    );

    return (
      (renderGroup ? renderGroup!({ key, group, children }) : undefined) ||
      defaultRenderGroup
    );
  };

  const renderListOption = (option: any, index: number) => {
    const optionProps = getOptionProps({ option, index });
    const defaultRenderOption = (
      props2: HTMLAttributes<HTMLLIElement>,
      option: T
    ) => <li {...props2}>{getOptionLabel(option)}</li>;

    return (
      (renderOption ? renderOption!({ ...optionProps }, option) : undefined) ||
      defaultRenderOption({ ...optionProps }, option)
    );
  };

  return (
    <Container {...props}>
      <Inputbox ref={ref} {...getRootProps()}>
        {renderInput(
          {
            id,
            inputProps: getInputProps()
          },
          getInputLabelProps(),
          getClearProps()
        )}
      </Inputbox>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as AutocompleteGroupedOption<T>[]).map(
            (option, index) => {
              if (groupBy) {
                return renderGroups(
                  option.key,
                  option.group,
                  option.options.map((option2, index2) =>
                    renderListOption(option2, option.index + index2)
                  )
                );
              }
              return renderListOption(option, index);
            }
          )}
        </Listbox>
      ) : null}
    </Container>
  );
};
export default AutoComplete;

*/

export default function AutoComplete() {
  return <div>AutoComplete</div>;
}
