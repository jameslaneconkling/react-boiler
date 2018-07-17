import React from 'react';
import { render } from 'react-dom';
// import { hot } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import client from './graphql/client';
import App from './containers/AppContainer';
import './style';


console.log('-----------\n', process.env.__GIT_DESCRIPTION__ + '-----------');

render((
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Route
        path="/"
        component={App}
      />
    </ApolloProvider>
  </BrowserRouter>
), document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
