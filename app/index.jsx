'use strict';
import React                  from 'react';
import { render }             from 'react-dom';
import {
  Router,
  Route,
  hashHistory
}                             from 'react-router';
import {
  combineReducers,
  createStore
}                             from 'redux';
import { Provider }           from 'react-redux';
import reducers               from './reducers';
import App                    from './components/app.jsx';
import Results                from './components/results.jsx';

const reducer = combineReducers(reducers);
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='/results' component={Results}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
