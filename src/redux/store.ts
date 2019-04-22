import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import {
  createEpicMiddleware,
} from 'redux-observable';
import reducer, { Action, State } from './reducer';
import epic from './epic';


export const history = (() => {
  if (window.__history === undefined) {
    window.__history = createBrowserHistory();
  }
  return window.__history;
})();
const epicMiddleware = createEpicMiddleware<Action, Action, State>();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  reducer(history),
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      routerMiddleware(history)
    ),
  )
);

epicMiddleware.run(epic);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
