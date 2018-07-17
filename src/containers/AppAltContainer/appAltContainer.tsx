import React, { SFC } from 'react';
import {
  compose, withProps,
} from 'recompose';
import { graphql, Query, ChildDataProps, ChildProps } from 'react-apollo';
import gql from "graphql-tag";
import App from '../../components/App';

const APP_QUERY = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

type ExchangeRate = {
  currency: string
  rate: number
};

type QueryResponse = {
  rates: ExchangeRate[];
  thing: string
};


// fails w/ strictNullChecks: true

// If you want to preview the fix you can change the props type of OperationOption in your local react-apollo/types.d.ts from this:

// props?: (props: OptionProps<TProps, TData>, lastProps?: TChildProps | void) => TChildProps;
// to this:

// props?: (props: OptionProps<TProps, TData, TGraphQLVariables>, lastProps?: TChildProps | void) => TChildProps;
// If I'm not mistaken, that is the only change from this fix that will show up in the release.
// export default graphql<{}, QueryResponse, {}>(APP_QUERY)(
//   ({ data }) => (
//     <div>{data.loading}</div>
//   )
// );

// doesn't work w/ ChildProps
// export default graphql<{}, QueryResponse, {}, ChildProps<{}, QueryResponse>>(APP_QUERY)(
//   ({ data: { loading, rates, error } }) => (
//     <div>{loading}</div>
//   )
// );

// works w/ ChildDataProps
// export default graphql<{}, QueryResponse, {}, ChildDataProps<{}, QueryResponse>>(APP_QUERY)(
//   ({ data: { loading, rates, error } }) => (
//     <div>{loading}</div>
//   )
// );

// how to add type annotations to <Query>?
// const App: SFC = () => (
//   <Query
//     query={APP_QUERY}
//   >
//     {({ loading, error, data }) => (
//       loading ?
//       <div>loading</div> :
//       error ?
//       <div>error</div> :
//       <div>{JSON.stringify(data)}</div>
//     )}
//   </Query>
// );

type X = { a: string } | null

const fun = (x: X) => {
  // should error b/c of strictNullChecks
  // console.log(x.a);
}