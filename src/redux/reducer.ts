import {
  combineReducers,
} from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import items, {
  ItemsState,
  ItemsAction,
} from './modules/items';


export type State = {
  items: ItemsState;
  routing: RouterState;
}

export type Action = ItemsAction;


export default (history: History) => combineReducers({
  router: connectRouter(history),
  items,
});
