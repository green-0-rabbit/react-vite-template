/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-inner-declarations */

// import gql from 'graphql-tag';
// import { API, graphqlOperation } from "@aws-amplify/api";:

const graphqlOperation = (...param: any) => {};
let API: any;
enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}
interface AuthParameters {
  userName: string;
  password: string;
}
export interface IGraphQLError {
  path: string[];
  data: any[];
  errorType: string;
  errorInfo: any;
  locations: object[];
  message: string;
}
export interface AsyncListInput {
  filter?: object;
  limit?: number;
  nextToken?: string;
}
export interface AsyncSortInput {
  [key: string]: any;
  sortDirection?: ModelSortDirection;
  filter?: object;
  limit?: number;
  nextToken?: string;
}

export type ClientUser =
  | "Admin"
  | "BusinessDeveloper"
  | "Contractor"
  | "Customer"
  | "CustomerManager"
  | "Technician"
  | "ContractorTechnician";

export type QueryParams = { id: string; inputgql: string };
export type InputParams = { input: object; inputgql: string };

// export class ConfigAWSAppSyncClient extends AWSAppSyncClient<NormalizedCacheObject> {}

// generic query function.  A way to quickly reuse query statements

// generic async function asyncGql mutation
export async function $asyncMutation<Output>(
  params: InputParams
): Promise<Output> {
  const { input, inputgql } = params;
  const variables = { input };
  try {
    const res = (await API.graphql(
      graphqlOperation(inputgql, {
        input
      })
    )) as Promise<Output>;
    const data = { ...(res as any).data };
    return data;
  } catch (err) {
    console.error("$asyncMutation", err);
    throw err;
  }
}
// generic async function asyncGql query
export async function $asyncQuery<Output>(
  params: QueryParams
): Promise<Output> {
  const { id, inputgql } = params;
  const variables = { id };
  try {
    // const res = await executeQuery(inputgql, variables);
    const res = (await API.graphql(
      graphqlOperation(inputgql, variables)
    )) as Promise<Output>;
    const data = { ...(res as any).data };
    return data;
  } catch (err) {
    console.error("$asyncQuery error", err);
    throw err;
  }
}
// generic async function asyncGql List
export async function $asyncList<Output>(
  input: AsyncListInput,
  inputgql: string
): Promise<Output> {
  const { limit, nextToken } = input;
  try {
    const res = (await API.graphql(
      graphqlOperation(inputgql, {
        limit,
        nextToken
      })
    )) as Promise<Output>;
    const data = { ...(res as any).data };
    return data;
  } catch (err) {
    console.error("$asyncList", err);
    throw err;
  }
}
// generic async function asyncGql Sort
export async function $asyncSort<Output>(
  input: AsyncSortInput,
  inputgql: string
): Promise<Output> {
  const variables: AsyncSortInput = { ...input };
  // console.log(variables);
  try {
    const res = (await API.graphql(
      graphqlOperation(inputgql, {
        input
      })
    )) as Promise<Output>;

    return await res;
  } catch (err) {
    console.error("$asyncSort", err);
    throw err;
  }
}

//
