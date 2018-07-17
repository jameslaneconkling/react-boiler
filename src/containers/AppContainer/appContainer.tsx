import React, { ChangeEvent, SFC } from 'react';
import {
  compose, withHandlers, branch, renderComponent, renderNothing, mapProps,
} from 'recompose';
import { graphql, ChildMutateProps, MutateProps, DataProps } from 'react-apollo';
import gql from "graphql-tag";
import App from '../../components/App';
import { hot } from 'react-hot-loader';
import { graphqlQuery, graphqlMutation, QueryResponse, QueryProps, QueryDataResponse } from '../../graphql/react';


export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const CURRENCY_QUERY = gql`
  {
    currency @client
  }
`;

export const RATES_QUERY = gql`
  query Rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
      name
    }
  }
`;

export const CURRENCY_MUTATION = gql`
  mutation SetCurrency($currency: Int!) {
    setCurrency(currency: $currency) @client
  }
`;

export type CurrencyQueryResponse = {
  currency: string
}

export type RatesQueryVariables = {
  currency: string
}

export type ExchangeRate = {
  name: string
  currency: string
  rate: number
};

export type RatesQueryResponse = {
  rates: ExchangeRate[]
};

export type CurrencyMutationResponse = MutateProps


export type Handlers = {
  onCurrencyChange(e: ChangeEvent<HTMLSelectElement>): void
  refetch(): void
}


export const renderEmpty = branch<QueryProps<QueryResponse>>(
  ({ query: { type } }) => type === 'EMPTY',
  renderNothing
);
export const renderLoading = branch<QueryProps<QueryResponse>>(
  ({ query: { type } }) => type === 'LOADING',
  renderComponent(() => <div>loading</div>)
);
export const renderError = branch<QueryProps<QueryResponse>>(
  ({ query: { type } }) => type === 'ERROR',
  renderComponent(() => <div>error</div>)
);

export const handleNonDataStates = compose(renderEmpty, renderLoading, renderError);


type ContainerProps = {}
type MapProps = { currency: string }

export type AppProps =
  & ContainerProps
  & MapProps
  & QueryProps<QueryResponse<RatesQueryResponse>>
  & CurrencyMutationResponse
  & Handlers

const AppContainer = compose<AppProps, ContainerProps>(
  graphqlQuery(CURRENCY_QUERY),
  handleNonDataStates,
  mapProps<
    MapProps,
    QueryProps<QueryDataResponse<CurrencyQueryResponse>>
  >(({ query, ...rest }) => ({
    ...rest,
    currency: query.currency || 'USD',
  })),
  graphqlQuery<
    ContainerProps & MapProps
  >(RATES_QUERY, {
    options: ({ currency }) => ({
      variables: { currency }
    }),
  }),
  graphqlMutation(CURRENCY_MUTATION),
  withHandlers<
    ContainerProps & MapProps & QueryProps<QueryResponse<RatesQueryResponse>> & CurrencyMutationResponse,
    Handlers
  >({
    onCurrencyChange: ({ mutate }) => ({ target: { value } }) => mutate({
      variables: { currency: value }
    }),
    refetch: ({ query }) => () => query.type === 'DATA' || query.type === 'ERROR' && query.refetch(),
  })
)(App);


// // doesn't work...
export default hot(module)(AppContainer);
