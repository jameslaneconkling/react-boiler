import { graphql, QueryOpts, MutationOpts, MutateProps } from 'react-apollo';
// import { query } from '../../node_modules/react-apollo/query-hoc';
import { DocumentNode } from 'apollo-link';
import { ApolloError, FetchMoreQueryOptions, FetchMoreOptions, ApolloQueryResult, SubscribeToMoreOptions, UpdateQueryOptions } from 'apollo-client';


/*
issues
- need a compact way to describe all possible states
- TChildProps isn't really typesafe, as it doesn't confirm that what you return matches typecheck (or does it?  OperationOption.props looks like it should get validated to return result)
- config.name is not considered for default TChildProps
- how to automatically type gql queries (e.g. when they are compiled)?  and if possible, how to pass w/o explicitly passing TData generic
- need to extract the childProps from a HOC: ChildProps<typeof graphqlQuery(...)>
- possible to typecheck compiled queries as query/mutation/subscription?

general gql issues
- no progressive queries
- normalization requires additional client-side footwork

Food for thought
- the HOC type signature and return child props types becomes much simpler when split into mutate/query/subscription functions
- the HOC return type becomes much easier to handle if represented as a union type (see reason-apollo)
- config options that can't typecheck _might_ be better left out
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type GraphqlQuerySuccessControls<TGraphQLVariables = {}> = {
  networkStatus: number;
  loading: boolean;
  variables: TGraphQLVariables;
  // TODO - get rid of any
  fetchMore: (fetchMoreOptions: FetchMoreQueryOptions<any, any> & FetchMoreOptions) => Promise<ApolloQueryResult<any>>;
  refetch: (variables?: TGraphQLVariables) => Promise<ApolloQueryResult<any>>;
  startPolling: (pollInterval: number) => void;
  stopPolling: () => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  updateQuery: (mapFn: (previousQueryResult: any, options: UpdateQueryOptions<any>) => any) => void;
}

export type GraphqlQueryErrorControls<TGraphQLVariables = {}> = {
  error: ApolloError;
  networkStatus: number;
  loading: boolean;
  variables: TGraphQLVariables;
  // TODO - get rid of any
  // fetchMore: (fetchMoreOptions: FetchMoreQueryOptions<any, any> & FetchMoreOptions) => Promise<ApolloQueryResult<any>>;
  refetch: (variables?: TGraphQLVariables) => Promise<ApolloQueryResult<any>>;
  // startPolling: (pollInterval: number) => void;
  // stopPolling: () => void;
  // subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  // updateQuery: (mapFn: (previousQueryResult: any, options: UpdateQueryOptions<any>) => any) => void;
}

export type QueryProps<Response> = {
  query: Response
}

export type QueryResponse<TData = {}, TGraphQLVariables = {}> = QueryEmtpyResponse
  | QueryLoadingResponse
  | QueryErrorResponse<TGraphQLVariables>
  | QueryDataResponse<TData, TGraphQLVariables>;

export type QueryEmtpyResponse = { type: 'EMPTY' }

export type QueryLoadingResponse = { type: 'LOADING' }

export type QueryErrorResponse<TGraphQLVariables = {}> =
  GraphqlQueryErrorControls<TGraphQLVariables>
  & { type: 'ERROR' }

export type QueryDataResponse<TData = {}, TGraphQLVariables = {}> = 
  GraphqlQuerySuccessControls<TGraphQLVariables>
  & Partial<TData>
  & { type: 'DATA' }

export type QueryOperationOption<TProps, TGraphQLVariables = {}> = {
  options?: QueryOpts<TGraphQLVariables> | ((props: TProps) => QueryOpts<TGraphQLVariables>)
  skip?: boolean | ((props: TProps) => boolean)
  withRef?: boolean
  shouldResubscribe?: (props: TProps, nextProps: TProps) => boolean
  alias?: string
}

export type MutationOperationOption<TProps, TData, TGraphQLVariables = {}> = {
  options?: MutationOpts<TData, TGraphQLVariables> | ((props: TProps) => MutationOpts<TData, TGraphQLVariables>)
  withRef?: boolean;
  shouldResubscribe?: (props: TProps, nextProps: TProps) => boolean;
  alias?: string;
}


export const graphqlQuery = <
  TProps extends TGraphQLVariables | {} = {},
  TData = {},
  TGraphQLVariables = {}
>(
  query: DocumentNode,
  config: QueryOperationOption<TProps, TGraphQLVariables> = {}
) => {
  return graphql<
    TProps,
    TData,
    TGraphQLVariables,
    QueryProps<QueryResponse<TData, TGraphQLVariables>>
  >(
    query,
    {
      ...config,
      props: ({ data }) => {
        if (data === undefined) {
          return { query: { type: 'EMPTY' } };
        } else if (data.networkStatus === 1) {
          return { query: { type: 'LOADING' } };
        } else if (data.error) {
          return { query: Object.assign({ type: 'ERROR' }, data) as QueryErrorResponse<TGraphQLVariables> };
        }

        return { query: Object.assign({ type: 'DATA' }, data) as QueryDataResponse<TData, TGraphQLVariables> };
      }
    }
  );
};


export const graphqlMutation = <
  TProps extends TGraphQLVariables | {} = {},
  TData = {},
  TGraphQLVariables = {}
>(
  query: DocumentNode,
  config: MutationOperationOption<TProps, TData, TGraphQLVariables> = {}
) => graphql<TProps, TData, TGraphQLVariables, MutateProps<TData, TGraphQLVariables>>(query, config);
