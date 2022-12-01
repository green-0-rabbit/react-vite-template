/* eslint-disable no-console */
import { FC, useEffect } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
// import { API, graphqlOperation } from "@aws-amplify/api";
import { GetUserQuery } from "src/API";
import { $asyncQuery } from "src/config";
import { getUser } from "src/graphql/queries";
import { getInvoices } from "./data";
import { QueryNavLink } from "../common/components/atoms";

/** Represents invoices */
//
const getUserTest = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      status
      createdAt
      updatedAt
      contact {
        firstName
        lastName
        email
        verifiedEmail
        acceptTOS
        language
        facebook
        linkedin
        viadeo
        phone
        Image
      }
      adresse {
        name
        address1
        address2
        city
        zip
        province
        provinceCode
        country
        countryCode
        latitude
        longitude
      }
      userType
      owner
    }
  }
`;

// console.log(getUserTest, {
//   id: 'aad34d25-7d4c-46f0-b534-27cf65af333b'
// });

const Invoices: FC = () => {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            const filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            const filter = searchParams.get("filter");
            if (!filter) return true;
            const name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : ""
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}>
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
};

export default Invoices;
