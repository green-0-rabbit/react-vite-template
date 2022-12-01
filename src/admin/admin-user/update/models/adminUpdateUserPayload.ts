import { DeepRequired, DeepNonNullable } from "react-hm-dynamic-form";
import {
  GetUserQuery,
  LanguageEnum,
  UserTypeEnum,
  ListUsersQuery,
  UserStatusEnum,
  AdminUpdateUserMutationInput,
  UpdateUserMutation
} from "src/API";

type GetUser = DeepRequired<
  DeepNonNullable<NonNullable<GetUserQuery["getUser"]>>
>;
type Data = Pick<GetUser, "updatedAt" | "createdAt">;
export type AdminUpdateUserPayloadType = DeepRequired<
  DeepNonNullable<AdminUpdateUserMutationInput>
> &
  Data;
export const adminUpdateUserPayload: AdminUpdateUserPayloadType = {
  id: "",
  username: "",
  updatedAt: "",
  createdAt: "",
  userType: UserTypeEnum.customer,
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
  authData: {
    username: "",
    attributes: [{ name: "email", value: "test@mail.com", isVerified: false }],
    userGroups: ["Admin"],
    enabled: true,
    userStatus: UserStatusEnum.UNKNOWN,
    mfa: {
      mfaOptions: [
        {
          deliveryMedium: "",
          attributeName: ""
        }
      ],
      preferredMfaSetting: "",
      userMFASettingList: ""
    }
  },
  actions: {
    resetPassword: false,
    tempPassword: "",
    isTempPasswordPermanent: false
  }
};
