import { useContext } from "react";
import { ServicesContext } from "../contexts";

const useServices = <T extends object>() => useContext<T>(ServicesContext);
export default useServices;
