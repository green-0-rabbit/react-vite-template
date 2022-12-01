/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode } from "react";

type ServicesContextType<T> = T;

/**
 *  HMR breaks by Vitejs with React context provider
 * The workaround is to dedicate a seperate file for context and his related provider
 * @see https://github.com/vitejs/vite/issues/3301#issuecomment-1192661323
 * work in progress to resolve this vitejs isssue
 * @see https://github.com/vitejs/vite/issues/3301#issuecomment-1257374648
 */
export const ServicesContext = createContext<ServicesContextType<any>>(
  {} as ServicesContextType<any>
);

interface IServiceProvider<T extends object> {
  services: Record<string, T>;
  children?: ReactNode;
}