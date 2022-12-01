/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AdminCreateUserMutationInput = {
  contact: AdminCreateUserContactInput,
  address?: AdminCreateUserAddressInput | null,
  userType: UserTypeEnum,
  authData: AdminCreateUserCognitoInfoInput,
  actions: AdminCreateUserMutationActions,
};

export type AdminCreateUserContactInput = {
  firstName: string,
  lastName: string,
  language: LanguageEnum,
  facebook?: string | null,
  linkedin?: string | null,
  Image?: string | null,
};

export enum LanguageEnum {
  fr = "fr",
  en = "en",
}


export type AdminCreateUserAddressInput = {
  name?: string | null,
  address1?: string | null,
  address2?: string | null,
  city?: string | null,
  zip?: string | null,
  province?: string | null,
  provinceCode?: string | null,
  country?: string | null,
  countryCode?: string | null,
  latitude?: string | null,
  longitude?: string | null,
};

export enum UserTypeEnum {
  admin = "admin",
  author = "author",
  contractor = "contractor",
  contributor = "contributor",
  business_developer = "business_developer",
  customer = "customer",
}


export type AdminCreateUserCognitoInfoInput = {
  username: string,
  attributes: Array< AdminCreateUserUserAttributeInput >,
  userGroups: Array< string >,
};

export type AdminCreateUserUserAttributeInput = {
  name: string,
  value: string,
  isVerified: boolean,
};

export type AdminCreateUserMutationActions = {
  tempPassword: string,
  sendTempPassword: boolean,
};

export type User = {
  __typename: "User",
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  contact?: Contact | null,
  address?: Address | null,
  userType: UserTypeEnum,
  owner: string,
  authData?: CognitoInfo | null,
};

export type Contact = {
  __typename: "Contact",
  firstName?: string | null,
  lastName?: string | null,
  language?: LanguageEnum | null,
  facebook?: string | null,
  linkedin?: string | null,
  Image?: string | null,
};

export type Address = {
  __typename: "Address",
  name?: string | null,
  address1?: string | null,
  address2?: string | null,
  city?: string | null,
  zip?: string | null,
  province?: string | null,
  provinceCode?: string | null,
  country?: string | null,
  countryCode?: string | null,
  latitude?: string | null,
  longitude?: string | null,
};

export type CognitoInfo = {
  __typename: "CognitoInfo",
  username: string,
  attributes:  Array<CognitoAttribute >,
  userGroups: Array< string >,
  enabled: boolean,
  userStatus: UserStatusEnum,
  mfa?: MFA | null,
};

export type CognitoAttribute = {
  __typename: "CognitoAttribute",
  name: string,
  value?: string | null,
  isVerified?: boolean | null,
};

export enum UserStatusEnum {
  UNCONFIRMED = "UNCONFIRMED",
  CONFIRMED = "CONFIRMED",
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  UNKNOWN = "UNKNOWN",
  RESET_REQUIRED = "RESET_REQUIRED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
}


export type MFA = {
  __typename: "MFA",
  mfaOptions?:  Array<MFAOption | null > | null,
  preferredMfaSetting?: string | null,
  userMFASettingList?: string | null,
};

export type MFAOption = {
  __typename: "MFAOption",
  deliveryMedium?: string | null,
  attributeName?: string | null,
};

export type AdminUpdateUserMutationInput = {
  id: string,
  username: string,
  contact?: AdminUpdateUserContactInput | null,
  address?: AdminUpdateUserAddressInput | null,
  userType?: UserTypeEnum | null,
  authData?: AdminUpdateUserCognitoInfoInput | null,
  actions?: AdminUpdateUserMutationActions | null,
};

export type AdminUpdateUserContactInput = {
  firstName: string,
  lastName: string,
  language: LanguageEnum,
  facebook: string,
  linkedin: string,
  Image: string,
};

export type AdminUpdateUserAddressInput = {
  name?: string | null,
  address1?: string | null,
  address2?: string | null,
  city?: string | null,
  zip?: string | null,
  province?: string | null,
  provinceCode?: string | null,
  country?: string | null,
  countryCode?: string | null,
  latitude?: string | null,
  longitude?: string | null,
};

export type AdminUpdateUserCognitoInfoInput = {
  username: string,
  attributes: Array< AdminUpdateUserUserAttributeInput >,
  userGroups?: Array< string > | null,
  enabled: boolean,
  userStatus: string,
  mfa?: AdminUpdateUserMFAInput | null,
};

export type AdminUpdateUserUserAttributeInput = {
  name: string,
  value?: string | null,
  isVerified?: boolean | null,
};

export type AdminUpdateUserMFAInput = {
  mfaOptions?: Array< AdminUpdateUserMFAOptionInput | null > | null,
  preferredMfaSetting?: string | null,
  userMFASettingList?: string | null,
};

export type AdminUpdateUserMFAOptionInput = {
  deliveryMedium?: string | null,
  attributeName?: string | null,
};

export type AdminUpdateUserMutationActions = {
  resetPassword?: boolean | null,
  tempPassword?: string | null,
  isTempPasswordPermanent?: boolean | null,
};

export type AdminDeleteUserMutationInput = {
  id: string,
  username: string,
};

export type AdminDeleteUserOutput = {
  __typename: "AdminDeleteUserOutput",
  id: string,
  isDeleted: boolean,
};

export type CreateCustomerInput = {
  id?: string | null,
  fullName: string,
  type?: CompanyTypeEnum | null,
  domain?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  billingCurrency?: CurrencyEnum | null,
  description?: string | null,
  address?: AddressInput | null,
  contact?: ContactInput | null,
  customerCompanyId?: string | null,
};

export enum CompanyTypeEnum {
  company = "company",
  individual = "individual",
}


export enum CurrencyEnum {
  XOF = "XOF",
  EUR = "EUR",
  USD = "USD",
  NAIRA = "NAIRA",
}


export type AddressInput = {
  name?: string | null,
  address1?: string | null,
  address2?: string | null,
  city?: string | null,
  zip?: string | null,
  province?: string | null,
  provinceCode?: string | null,
  country?: string | null,
  countryCode?: string | null,
  latitude?: string | null,
  longitude?: string | null,
};

export type ContactInput = {
  firstName?: string | null,
  lastName?: string | null,
  language?: LanguageEnum | null,
  facebook?: string | null,
  linkedin?: string | null,
  Image?: string | null,
};

export type ModelCustomerConditionInput = {
  fullName?: ModelStringInput | null,
  type?: ModelCompanyTypeEnumInput | null,
  domain?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  billingCurrency?: ModelCurrencyEnumInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCustomerConditionInput | null > | null,
  or?: Array< ModelCustomerConditionInput | null > | null,
  not?: ModelCustomerConditionInput | null,
  customerCompanyId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelCompanyTypeEnumInput = {
  eq?: CompanyTypeEnum | null,
  ne?: CompanyTypeEnum | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelCurrencyEnumInput = {
  eq?: CurrencyEnum | null,
  ne?: CurrencyEnum | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Customer = {
  __typename: "Customer",
  id: string,
  fullName: string,
  type?: CompanyTypeEnum | null,
  domain?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  billingCurrency?: CurrencyEnum | null,
  description?: string | null,
  address?: Address | null,
  contact?: Contact | null,
  company?: Company | null,
  customerCompanyId?: string | null,
};

export type Company = {
  __typename: "Company",
  id: string,
  name: string,
  isGroup?: boolean | null,
  parent?: Company | null,
  parentID?: string | null,
  branches?: ModelCompanyConnection | null,
  domain?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  addedAt?: string | null,
  establishedAt?: string | null,
  abbreviation?: string | null,
  defaultCurrency?: CurrencyEnum | null,
  description?: string | null,
  address?: Address | null,
  contact?: Contact | null,
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection",
  items:  Array<Company | null >,
  nextToken?: string | null,
};

export type UpdateCustomerInput = {
  id: string,
  fullName?: string | null,
  type?: CompanyTypeEnum | null,
  domain?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  billingCurrency?: CurrencyEnum | null,
  description?: string | null,
  address?: AddressInput | null,
  contact?: ContactInput | null,
  customerCompanyId?: string | null,
};

export type DeleteCustomerInput = {
  id: string,
};

export type CreateCompanyInput = {
  id?: string | null,
  name: string,
  isGroup?: boolean | null,
  parentID?: string | null,
  domain?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  addedAt?: string | null,
  establishedAt?: string | null,
  abbreviation?: string | null,
  defaultCurrency?: CurrencyEnum | null,
  description?: string | null,
  address?: AddressInput | null,
  contact?: ContactInput | null,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  isGroup?: ModelBooleanInput | null,
  parentID?: ModelIDInput | null,
  domain?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  addedAt?: ModelStringInput | null,
  establishedAt?: ModelStringInput | null,
  abbreviation?: ModelStringInput | null,
  defaultCurrency?: ModelCurrencyEnumInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  isGroup?: boolean | null,
  parentID?: string | null,
  domain?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  addedAt?: string | null,
  establishedAt?: string | null,
  abbreviation?: string | null,
  defaultCurrency?: CurrencyEnum | null,
  description?: string | null,
  address?: AddressInput | null,
  contact?: ContactInput | null,
};

export type DeleteCompanyInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  contact?: ContactInput | null,
  address?: AddressInput | null,
  userType: UserTypeEnum,
  owner: string,
  authData?: CognitoInfoInput | null,
};

export type CognitoInfoInput = {
  username: string,
  attributes: Array< CognitoAttributeInput >,
  userGroups: Array< string >,
  enabled: boolean,
  userStatus: UserStatusEnum,
  mfa?: MFAInput | null,
};

export type CognitoAttributeInput = {
  name: string,
  value?: string | null,
  isVerified?: boolean | null,
};

export type MFAInput = {
  mfaOptions?: Array< MFAOptionInput | null > | null,
  preferredMfaSetting?: string | null,
  userMFASettingList?: string | null,
};

export type MFAOptionInput = {
  deliveryMedium?: string | null,
  attributeName?: string | null,
};

export type ModelUserConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userType?: ModelUserTypeEnumInput | null,
  owner?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelUserTypeEnumInput = {
  eq?: UserTypeEnum | null,
  ne?: UserTypeEnum | null,
};

export type UpdateUserInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  contact?: ContactInput | null,
  address?: AddressInput | null,
  userType?: UserTypeEnum | null,
  owner?: string | null,
  authData?: CognitoInfoInput | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelCustomerFilterInput = {
  id?: ModelIDInput | null,
  fullName?: ModelStringInput | null,
  type?: ModelCompanyTypeEnumInput | null,
  domain?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  billingCurrency?: ModelCurrencyEnumInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCustomerFilterInput | null > | null,
  or?: Array< ModelCustomerFilterInput | null > | null,
  not?: ModelCustomerFilterInput | null,
  customerCompanyId?: ModelIDInput | null,
};

export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection",
  items:  Array<Customer | null >,
  nextToken?: string | null,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  isGroup?: ModelBooleanInput | null,
  parentID?: ModelIDInput | null,
  domain?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  addedAt?: ModelStringInput | null,
  establishedAt?: ModelStringInput | null,
  abbreviation?: ModelStringInput | null,
  defaultCurrency?: ModelCurrencyEnumInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userType?: ModelUserTypeEnumInput | null,
  owner?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type AdminCreateUserMutationVariables = {
  input: AdminCreateUserMutationInput,
};

export type AdminCreateUserMutation = {
  adminCreateUser?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type AdminUpdateUserMutationVariables = {
  input: AdminUpdateUserMutationInput,
};

export type AdminUpdateUserMutation = {
  adminUpdateUser?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type AdminDeleteUserMutationVariables = {
  input: AdminDeleteUserMutationInput,
};

export type AdminDeleteUserMutation = {
  adminDeleteUser?:  {
    __typename: "AdminDeleteUserOutput",
    id: string,
    isDeleted: boolean,
  } | null,
};

export type CreateCustomerMutationVariables = {
  input: CreateCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type CreateCustomerMutation = {
  createCustomer?:  {
    __typename: "Customer",
    id: string,
    fullName: string,
    type?: CompanyTypeEnum | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    billingCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    customerCompanyId?: string | null,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  input: UpdateCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type UpdateCustomerMutation = {
  updateCustomer?:  {
    __typename: "Customer",
    id: string,
    fullName: string,
    type?: CompanyTypeEnum | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    billingCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    customerCompanyId?: string | null,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  input: DeleteCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type DeleteCustomerMutation = {
  deleteCustomer?:  {
    __typename: "Customer",
    id: string,
    fullName: string,
    type?: CompanyTypeEnum | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    billingCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    customerCompanyId?: string | null,
  } | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    isGroup?: boolean | null,
    parent?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    parentID?: string | null,
    branches?:  {
      __typename: "ModelCompanyConnection",
      items:  Array< {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    addedAt?: string | null,
    establishedAt?: string | null,
    abbreviation?: string | null,
    defaultCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    isGroup?: boolean | null,
    parent?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    parentID?: string | null,
    branches?:  {
      __typename: "ModelCompanyConnection",
      items:  Array< {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    addedAt?: string | null,
    establishedAt?: string | null,
    abbreviation?: string | null,
    defaultCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    isGroup?: boolean | null,
    parent?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    parentID?: string | null,
    branches?:  {
      __typename: "ModelCompanyConnection",
      items:  Array< {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    addedAt?: string | null,
    establishedAt?: string | null,
    abbreviation?: string | null,
    defaultCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type AdminListUsersQuery = {
  adminListUsers?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type GetCustomerQueryVariables = {
  id: string,
};

export type GetCustomerQuery = {
  getCustomer?:  {
    __typename: "Customer",
    id: string,
    fullName: string,
    type?: CompanyTypeEnum | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    billingCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    customerCompanyId?: string | null,
  } | null,
};

export type ListCustomersQueryVariables = {
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCustomersQuery = {
  listCustomers?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      id: string,
      fullName: string,
      type?: CompanyTypeEnum | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      billingCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
      company?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      customerCompanyId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    isGroup?: boolean | null,
    parent?:  {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null,
    parentID?: string | null,
    branches?:  {
      __typename: "ModelCompanyConnection",
      items:  Array< {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    domain?: string | null,
    isActive?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    addedAt?: string | null,
    establishedAt?: string | null,
    abbreviation?: string | null,
    defaultCurrency?: CurrencyEnum | null,
    description?: string | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
  } | null,
};

export type ListCompaniesQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompaniesQuery = {
  listCompanies?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CompanyByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CompanyByNameQuery = {
  companyByName?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
      isGroup?: boolean | null,
      parent?:  {
        __typename: "Company",
        id: string,
        name: string,
        isGroup?: boolean | null,
        parentID?: string | null,
        domain?: string | null,
        isActive?: boolean | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        addedAt?: string | null,
        establishedAt?: string | null,
        abbreviation?: string | null,
        defaultCurrency?: CurrencyEnum | null,
        description?: string | null,
      } | null,
      parentID?: string | null,
      branches?:  {
        __typename: "ModelCompanyConnection",
        nextToken?: string | null,
      } | null,
      domain?: string | null,
      isActive?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      addedAt?: string | null,
      establishedAt?: string | null,
      abbreviation?: string | null,
      defaultCurrency?: CurrencyEnum | null,
      description?: string | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    contact?:  {
      __typename: "Contact",
      firstName?: string | null,
      lastName?: string | null,
      language?: LanguageEnum | null,
      facebook?: string | null,
      linkedin?: string | null,
      Image?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      name?: string | null,
      address1?: string | null,
      address2?: string | null,
      city?: string | null,
      zip?: string | null,
      province?: string | null,
      provinceCode?: string | null,
      country?: string | null,
      countryCode?: string | null,
      latitude?: string | null,
      longitude?: string | null,
    } | null,
    userType: UserTypeEnum,
    owner: string,
    authData?:  {
      __typename: "CognitoInfo",
      username: string,
      attributes:  Array< {
        __typename: "CognitoAttribute",
        name: string,
        value?: string | null,
        isVerified?: boolean | null,
      } >,
      userGroups: Array< string >,
      enabled: boolean,
      userStatus: UserStatusEnum,
      mfa?:  {
        __typename: "MFA",
        preferredMfaSetting?: string | null,
        userMFASettingList?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      contact?:  {
        __typename: "Contact",
        firstName?: string | null,
        lastName?: string | null,
        language?: LanguageEnum | null,
        facebook?: string | null,
        linkedin?: string | null,
        Image?: string | null,
      } | null,
      address?:  {
        __typename: "Address",
        name?: string | null,
        address1?: string | null,
        address2?: string | null,
        city?: string | null,
        zip?: string | null,
        province?: string | null,
        provinceCode?: string | null,
        country?: string | null,
        countryCode?: string | null,
        latitude?: string | null,
        longitude?: string | null,
      } | null,
      userType: UserTypeEnum,
      owner: string,
      authData?:  {
        __typename: "CognitoInfo",
        username: string,
        userGroups: Array< string >,
        enabled: boolean,
        userStatus: UserStatusEnum,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};
