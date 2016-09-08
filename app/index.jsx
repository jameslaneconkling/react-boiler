'use strict';
import React                  from 'react';
import { render }             from 'react-dom';
import {
  Router,
  Route,
  hashHistory
}                             from 'react-router';
import {
  syncHistoryWithStore,
  routerReducer
}                             from 'react-router-redux'
import {
  combineReducers,
  createStore
}                             from 'redux';
import { Provider }           from 'react-redux';
import reducers               from './reducers';
import App                    from './components/app.jsx';
import Results                from './components/results.jsx';

// TODO - replace with ...spread
const reducer = combineReducers(Object.assign({}, reducers, {routing: routerReducer}));
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

const history = syncHistoryWithStore(hashHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='/results' component={Results}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
