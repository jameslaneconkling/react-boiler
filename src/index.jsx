/* global document */
/* eslint-disable global-require */
import React from 'react';
import { render } from 'react-dom';
import {
  ConnectedRouter,
} from 'react-router-redux';
import {
  Route,
} from 'react-router';
import { Provider } from 'react-redux';
import store, {
  history,
} from './redux/store';
import App from './containers/App';
import './style.scss';


const renderApp = (Root) => {
  render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/" component={Root} />
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('app'));
};

renderApp(App);


if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderApp(require('./containers/App').default);
  });
}
