import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';


const LOCAL_STATE = `
  type Query {
    currency: String!
  }
`;

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    // TODO - write type defs for apollo-link-state
    // https://github.com/apollographql/apollo-link-state/blob/master/packages/apollo-link-state/src/index.ts#L21-L27
    withClientState({
      defaults: {
        currency: 'AED',
      },
      resolvers: {
        Mutation: {
          setCurrency: (_: any, { currency }: { currency: string }, { cache }: { cache: any }) => {
            cache.writeData({ data: { currency } });
            return currency;
          },
        },
      },
      typeDefs: LOCAL_STATE,
    }),
    new HttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});
