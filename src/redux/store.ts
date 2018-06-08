/* global window */
/* eslint-disable no-underscore-dangle */
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  createEpicMiddleware,
} from 'redux-observable';
import reducer from './reducer';
import epic from './epic';


export const history = createBrowserHistory();


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(epic),
      routerMiddleware(history)
    ),
  )
);

export default store;
