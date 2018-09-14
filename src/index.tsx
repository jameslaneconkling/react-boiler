import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store, {
  history,
} from './redux/store';
import App from './containers/AppContainer';
import './style';

console.log('*', process.env.__GIT_DESCRIPTION__);

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route
        path="/"
        component={App}
      />
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
