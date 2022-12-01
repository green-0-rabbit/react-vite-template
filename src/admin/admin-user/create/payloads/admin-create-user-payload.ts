import { DeepRequired, DeepNonNullable } from "react-hm-dynamic-form";
import {
  LanguageEnum,
  UserTypeEnum,
  AdminCreateUserMutationInput
} from "src/API";

export type AdminCreateUserPayloadType = DeepRequired<
  DeepNonNullable<AdminCreateUserMutationInput>
>;
export const adminCreateUserPayload: AdminCreateUserPayloadType = {
  contact: {
    firstName: "",
    lastName: "",
    language: LanguageEnum.fr,
    facebook: "",
    linkedin: "",
    Image: ""
  },
  userType: UserTypeEnum.customer,
  authData: {
    username: "",
    attributes: [
      { name: "email", value: "", isVerified: false }
      // { name: 'phone', value: '', isVerified: false }
    ],
    userGroups: []
  },
  actions: {
    tempPassword: "",
    sendTempPassword: false
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
  }
};
