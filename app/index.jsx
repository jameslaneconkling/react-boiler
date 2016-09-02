'use strict';
import React                  from 'react';
import { render }             from 'react-dom';
import {
  Router,
  Route,
  hashHistory
}                             from 'react-router';
import { Provider }           from 'react-redux';
import App                    from './components/app.jsx';
import Results                from './components/results.jsx';
import { store }              from './store.js';

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='/results' component={Results}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
