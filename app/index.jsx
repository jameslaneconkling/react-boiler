'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'; 
import App from './components/app.jsx';
import Results from './components/results.jsx';

render((
  <Router history={hashHistory}>
    <Route path='/' component={App} >
      <Route path='/results' component={Results}/>
    </Route>
  </Router>
), document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

export default App;
