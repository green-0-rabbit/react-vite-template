/* eslint-disable @typescript-eslint/naming-convention */
import { $asyncMutation, $asyncQuery, IGraphQLError } from "src/config";
import { getUser } from "src/graphql/queries";
import { GetUserQuery, UpdateUserInput, UpdateUserMutation } from "src/API";
import { updateUser } from "src/graphql/mutations";
import { DeepOmit } from "react-hm-dynamic-form";
import { errorResponse, response } from "src/common/utils";

export const getUserService = async (id: string) => {
  const _getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
      getUser(id: $id) {
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
          mfa {
            mfaOptions {
              deliveryMedium
              attributeName
            }
            preferredMfaSetting
            userMFASettingList
          }
        }
      }
    }
  `;
  try {
    const res = await $asyncQuery<DeepOmit<GetUserQuery, "__typename">>({
      id,
      inputgql: _getUser
    });
    const data = { ...res.getUser };

    return response(data);
  } catch (err) {
    return errorResponse(<IGraphQLError>err);
  }
};
export const updateUserService = async (input: UpdateUserInput) => {
  try {
    const res = await $asyncMutation<UpdateUserMutation>({
      input,
      inputgql: updateUser
    });
    const data = { ...res.updateUser };
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
