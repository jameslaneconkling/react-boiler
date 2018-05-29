import { combineReducers } from 'redux';
import {
  routerReducer,
  RouterState,
  RouterAction,
} from 'react-router-redux';
import items, {
  ItemsState,
  ItemsAction,
} from './modules/items';


export interface State {
  items: ItemsState;
  routing: RouterState;
}

export type Action = ItemsAction
  | RouterAction;


export default combineReducers({
  items,
  routing: (routerReducer as any),
});
