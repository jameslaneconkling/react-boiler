import React from 'react';
import { graphqlQuery, graphqlMutation } from "../../graphql/react";
import { RatesQueryResponse, RATES_QUERY, CURRENCY_MUTATION } from "./appContainer";

const ratesContainer = graphqlQuery<{}, RatesQueryResponse, {}>(RATES_QUERY)(
  ({ query }) => {
    if (query.type === 'EMPTY') {
      return null;
    } else if (query.type === 'LOADING') {
      return <div>Loading</div>
    } else if (query.type === 'ERROR') {
      return <div>Error: <em>{query.error.message}</em></div>
    }

    return <div>{query.rates}</div>
  }
);

const setCurrencyContainer = graphqlMutation<{}, RatesQueryResponse, {}>(CURRENCY_MUTATION)(
  (props) => {
    return <button onClick={() => props.mutate()}>click</button>
  }
);
