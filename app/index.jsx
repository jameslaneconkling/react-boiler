/* eslint-disable no-undef */
import React                  from 'react';
import { render }             from 'react-dom';
import {
  Router,
  Route,
  hashHistory
}                             from 'react-router';
import {
  syncHistoryWithStore
}                             from 'react-router-redux';
import { Provider }           from 'react-redux';
import store                  from './redux/store';
import App                    from './components/app';
import                             './style.scss';

const history = syncHistoryWithStore(hashHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
), document.getElementById('app'));
