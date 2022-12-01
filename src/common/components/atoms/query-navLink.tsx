/* eslint-disable react/require-default-props */
import { FC } from "react";

import { useLocation, NavLink, NavLinkProps } from "react-router-dom";

const QueryNavLink: FC<NavLinkProps> = ({ to, ...props }) => {
  const location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
};

export default QueryNavLink;
