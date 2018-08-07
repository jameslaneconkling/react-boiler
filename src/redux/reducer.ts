import {
  combineReducers,
} from 'redux';
import { RouterState } from 'connected-react-router';
import items, {
  ItemsState,
  ItemsAction,
} from './modules/items';


export type State = {
  items: ItemsState;
  routing: RouterState;
}

export type Action = ItemsAction;


export default combineReducers({
  items,
});
