/* eslint-disable import/prefer-default-export */
import { DeepNonNullable, DeepOmit, DeepRequired } from "react-hm-dynamic-form";
import {
  CommonStatusEnum,
  CompaniesQuery,
  CreateCompanyInput,
  UpdateCompanyInput
} from "src/core/sdk/gql-sdk/api-sdk";

type CreateInput = DeepNonNullable<DeepRequired<CreateCompanyInput>>;
type UpdateInput = DeepNonNullable<DeepRequired<UpdateCompanyInput>>;
type Data = Pick<CompaniesQuery, "companies">["companies"][0];
type DataOmit = DeepOmit<Data, "__typename">;

export const defaultCompany: DataOmit = {
  headOfficeName: "",
  isActive: false,
  status: CommonStatusEnum.Active,
  name: "",
  abbreviation: "",
  isGroup: false,
  industryCode: "",
  description: "",
  currency: {
    id: "",
    createdAt: "",
    updatedAt: "",
    isActive: false,
    code: "",
    name: "",
    symbol: "",
    fractionUnit: 0,
    fraction: "",
    format: ""
  },
  id: "",
  createdAt: "",
  updatedAt: ""
};

export const createCompanyInput: CreateInput = {
  abbreviation: "",
  industryCode: "",
  name: "",
  status: CommonStatusEnum.Active,
  currencyId: "",
  description: "",
  headOfficeId: ""
};

export const updateCompanyInput: UpdateInput = {
  abbreviation: "",
  industryCode: "",
  name: "",
  status: CommonStatusEnum.Active,
  description: "",
  id: ""
};
