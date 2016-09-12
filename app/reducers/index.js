import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import items               from './items.js';

export default combineReducers({
  items,
  routing: routerReducer
});

