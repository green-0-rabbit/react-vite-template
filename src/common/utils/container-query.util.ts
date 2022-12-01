/* eslint-disable import/prefer-default-export */
export type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl" | "base";

interface IGetBreakpointParams<T> {
  currentBreakpoint: BreakpointType;
  previousBreakpoint?: BreakpointType;
  breakpoints: Partial<Record<BreakpointType, T>>;
}
export const getBKValue = <T>(params: IGetBreakpointParams<T>) => {
  const { currentBreakpoint, breakpoints, previousBreakpoint } = params;
  return (
    breakpoints[currentBreakpoint] ??
    breakpoints[previousBreakpoint === undefined ? "xs" : previousBreakpoint]
  );
};
