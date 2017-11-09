/* global window */
/* eslint-disable no-underscore-dangle */
import {
  createStore,
  applyMiddleware,
  compose,
}                             from 'redux';
import createHistory          from 'history/createBrowserHistory';
import {
  routerMiddleware,
}                             from 'react-router-redux';
import {
  createEpicMiddleware,
}                             from 'redux-observable';
import reducer                from './reducer';
import epic                   from './epic';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(epic),
      routerMiddleware(history)
    ),
  )
);
