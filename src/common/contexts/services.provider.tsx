/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode } from "react";
import { ServicesContext } from "./services.context";
interface IServiceProvider<T extends object> {
  services: Record<string, T>;
  children?: ReactNode;
}

export const ServicesProvider = <T extends object>(
  props: IServiceProvider<T>
) => {
  const { children, services } = props;

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
