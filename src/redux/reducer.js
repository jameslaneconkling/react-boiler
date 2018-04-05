import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import items               from './modules/items';

export default combineReducers({
  items,
  routing: routerReducer,
});
