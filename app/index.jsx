'use strict';
import React                  from 'react';
import { render }             from 'react-dom';
import {
  Router,
  Route,
  hashHistory
}                             from 'react-router';
import {
  syncHistoryWithStore
}                             from 'react-router-redux'
import { createStore }        from 'redux';
import { Provider }           from 'react-redux';
import reducer                from './reducers/index.js';
import App                    from './components/app.jsx';

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

const history = syncHistoryWithStore(hashHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
), document.getElementById('app'));
