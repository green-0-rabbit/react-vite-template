import { DeepRequired, DeepNonNullable, DeepOmit } from "react-hm-dynamic-form";
import {
  LanguageEnum,
  UserTypeEnum,
  ListUsersQuery,
  UserStatusEnum,
  GetUserQuery
} from "src/API";

type GetUser = DeepRequired<
  DeepNonNullable<NonNullable<GetUserQuery["getUser"]>>
>;

// type ListUsers = DeepRequired<
//   DeepNonNullable<NonNullable<ListUsersQuery["listUsers"]>>
// >;
// type User = DeepRequired<
//   DeepNonNullable<NonNullable<DeepOmit<ListUsers["items"][0], "__typename">>>
// >;
type Data = DeepOmit<GetUser, "__typename">;
export type AdminListUsersPayloadType = DeepRequired<DeepNonNullable<Data>>;
export const adminListUsersPayload: AdminListUsersPayloadType = {
  id: "",
  createdAt: "",
  updatedAt: "",
  contact: {
    firstName: "",
    lastName: "",
    language: LanguageEnum.fr,
    facebook: "",
    linkedin: "",
    Image: ""
  },
  address: {
    name: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    province: "",
    provinceCode: "",
    country: "",
    countryCode: "",
    latitude: "",
    longitude: ""
  },
  userType: UserTypeEnum.customer,
  owner: "",
  authData: {
    username: "",
    attributes: [{ name: "email", value: "", isVerified: false }],
    userGroups: ["Admin"],
    enabled: true,
    userStatus: UserStatusEnum.UNKNOWN,
    mfa: {
      preferredMfaSetting: "",
      userMFASettingList: ""
    }
  }
};
