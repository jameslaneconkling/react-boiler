/* global document */
import React                  from 'react';
import { render }             from 'react-dom';
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
import App                    from './components/App';


render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));