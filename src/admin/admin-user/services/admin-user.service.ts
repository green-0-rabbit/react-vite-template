/* eslint-disable @typescript-eslint/naming-convention */
import {
  $asyncList,
  $asyncMutation,
  $asyncQuery,
  AsyncListInput,
  IGraphQLError,
  QueryParams
} from "src/config";
import { getUser, listUsers } from "src/graphql/queries";
import {
  AdminCreateUserMutation,
  AdminCreateUserMutationInput,
  AdminDeleteUserMutation,
  AdminDeleteUserMutationInput,
  AdminDeleteUserMutationVariables,
  AdminUpdateUserMutation,
  AdminUpdateUserMutationInput,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  ListUsersQuery,
  UpdateUserInput,
  UpdateUserMutation
} from "src/API";
import {
  adminCreateUser,
  adminDeleteUser,
  adminUpdateUser,
  deleteUser,
  updateUser
} from "src/graphql/mutations";
import { DeepOmit } from "react-hm-dynamic-form";
import { errorResponse, response } from "../../../common/utils";

export const testService = async () => {
  const user = [
    {
      name: "machin",
      age: 99
    },
    {
      name: "trenteu",
      age: 24
    },
    {
      name: "olivier",
      age: 45
    }
  ];
  console.table([user]);
};

export const getUserService = async (id: string) => {
  try {
    const res = await $asyncQuery<DeepOmit<GetUserQuery, "__typename">>({
      id,
      inputgql: getUser
    });
    const data = { ...res.getUser };

    return response(data);
  } catch (err) {
    return errorResponse(<IGraphQLError>err);
  }
};
export const updateUserService = async (
  input: AdminUpdateUserMutationInput
) => {
  try {
    const res = await $asyncMutation<AdminUpdateUserMutation>({
      input,
      inputgql: adminUpdateUser
    });
    const data = { ...res.adminUpdateUser };
    return response(data);
  } catch (err) {
    return errorResponse(<IGraphQLError>err);
  }
};

export const deleteUserService = async (
  input: AdminDeleteUserMutationInput
) => {
  try {
    const res = await $asyncMutation<AdminDeleteUserMutation>({
      input,
      inputgql: adminDeleteUser
    });

    const data = { ...res.adminDeleteUser };
    return response(data);
  } catch (err) {
    return errorResponse(<IGraphQLError>err);
  }
};

export const createUserService = async (
  input: AdminCreateUserMutationInput
) => {
  try {
    const res = await $asyncMutation<
      DeepOmit<AdminCreateUserMutation, "__typename">
    >({
      input,
      inputgql: adminCreateUser
    });
    const data = { ...res.adminCreateUser };
    return response(data);
  } catch (err) {
    return errorResponse(<IGraphQLError>err);
  }
};

export const listUsersService = async (input: AsyncListInput) => {
  // eslint-disable-next-line no-underscore-dangle
  const _listUsers = /* GraphQL */ `
    query ListUsers(
      $filter: ModelUserFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          createdAt
          updatedAt
          contact {
            firstName
            lastName
            language
            facebook
            linkedin
            Image
          }
          address {
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
          authData {
            username
            attributes {
              name
              value
              isVerified
            }
            userGroups
            enabled
            userStatus
          }
        }
        nextToken
      }
    }
  `;
  try {
    const res = await $asyncList<
      DeepOmit<ListUsersQuery, "__typename" | "mfa">
    >(input, listUsers);
    const data = { ...res.listUsers };

    return response(data);
  } catch (err) {
    return errorResponse(<IGraphQLError>err);
  }
};

export interface IUserAttributes {
  email: string;
  email_verified: boolean;
  sub: string;
}

export const listAdmins = async (limit: number, nextToken: string) => {
  const apiName = "AdminQueries";
  const path = "/listUsersInGroup";
  const myInit = {
    queryStringParameters: {
      groupname: "Admin",
      limit,
      token: nextToken
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${0}`
    }
  };
  let rest: any;
  // const { NextToken, ...rest } = await API.get(apiName, path, myInit);
  // eslint-disable-next-line no-param-reassign
  // nextToken = NextToken;
  console.log({ nextToken, rest });
  return { nextToken, rest };
};

export const testQuery = async <Output>(params: QueryParams) => {
  const test = await $asyncQuery<Output>(params);
};
