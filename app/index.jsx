/* global document */
/* eslint-disable global-require */
import React                  from 'react';
import { render }             from 'react-dom';
import { AppContainer }       from 'react-hot-loader';
import {
  ConnectedRouter,
}                             from 'react-router-redux';
import {
  Route,
}                             from 'react-router';
import { Provider }           from 'react-redux';
import store, {
  history,
}                             from './redux/store';
import App                    from './containers/App';
import                             './style.scss';


const loadApplication = (Component) => {
  render((
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={Component} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  ), document.getElementById('app'));
};


loadApplication(App);


if (module.hot) {
  module.hot.accept('./containers/App', () => loadApplication(require('./containers/App').default));
}
