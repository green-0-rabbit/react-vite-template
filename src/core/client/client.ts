/* eslint-disable import/prefer-default-export */
import {
  ApolloClient,
  ApolloError,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client/core";
// import { authSDK } from "..";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "../../common/config";

import to from "await-to-js";
import { Inject, Service } from "react-service-locator";
import { AuthService } from "src/auth/auth.service";

@Service()
export class ApolloClientFactory {
  @Inject(AuthService)
  private readonly _authService!: AuthService;

  // private _isRefreshing = false;

  private _pendingRequests: any[] = [];

  private _client: ApolloClient<NormalizedCacheObject>;

  get client() {
    return this._client;
  }

  constructor() {
    this._client = this._getclient();
  }

  private _getclient() {
    const url = API_URL;
    const httpLink = createHttpLink({
      uri: `${url}/graphql`
    });
    const authLink = this._authLink;
    const errorLink = this._errorLink;
    const client = new ApolloClient({
      /**
       * links order is important, if we put errorLink after authLink, when refreshing
       * accesToken, the pending request failed first. However when erroLink is put first,
       * @see https://stackoverflow.com/questions/50965347/how-to-execute-an-async-fetch-request-and-then-retry-last-failed-request
       * @see https://stackoverflow.com/a/51321068
       */
      link: from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache({}),
      connectToDevTools: false,
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache"
        }
      }
    });

    return client;
  }

  private get _authLink() {
    return setContext((_, { headers }) => {
      const { accessToken } = this._authService;
      console.log("(authLink)");

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : ""
        }
      };
    });
  }

  private get _errorLink() {
    return onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case "UNAUTHENTICATED":
              // console.log(" UNAUTHENTICATED ici");

              // error code is set to UNAUTHENTICATED
              // when AuthenticationError thrown in resolver
              let forward$;

              if (!this._authService.isTokenRefreshing) {
                // this._isRefreshing = true;
                forward$ = fromPromise(
                  (async () => {
                    try {
                      console.log(
                        "in refreshing (errorLink)",
                        operation.operationName
                      );
                      const [err, data] = await to(
                        this._authService.refreshToken()
                      );
                      if (err) {
                        throw err;
                      }
                      // const {
                      //   data: { accessToken }
                      // } = res;
                      // Modify the operation context with a new token
                      // const oldHeaders = operation.getContext().headers;
                      // operation.setContext({
                      //   headers: {
                      //     ...oldHeaders,
                      //     authorization: accessToken
                      //   }
                      // });
                      this._resolvePendingRequests();

                      return true;
                    } catch (error: any) {
                      this._pendingRequests = [];
                      // return; // Return a falsy value
                      throw new ApolloError({
                        graphQLErrors: [],
                        networkError: error
                      });
                    } finally {
                      // console.log("finally ici", operation.operationName);
                      // this._isRefreshing = false;
                    }
                  })()
                ).filter((value) => Boolean(value));
              } else {
                console.log("else ici", operation.operationName);
                // Will only emit once the Promise is resolved
                forward$ = fromPromise(
                  new Promise<void>((resolve) => {
                    this._pendingRequests.push(() => resolve());
                  })
                );
              }
              // console.log("finished", operation.operationName);

              // 1. flatMap/mergeMap =>
              // 2. forward(operation) => retry the request, returning the new observable
              // @see https://www.apollographql.com/docs/react/data/error-handling/#retrying-operations
              return forward$.flatMap(() => forward(operation));
          }
        }
      }
      if (networkError) {
        console.log("network ici");
        console.log(`[Network error]: ${networkError}`);
        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
      }
    });
  }

  private _resolvePendingRequests = () => {
    this._pendingRequests.map((callback: () => any) => callback());
    this._pendingRequests = [];
  };
}
