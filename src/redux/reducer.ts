import {
  combineReducers,
} from 'redux';
import { RouterState } from 'connected-react-router';
import items, {
  IItemsState,
  IItemsAction,
} from './modules/items';


export interface IState {
  items: IItemsState;
  routing: RouterState;
}

export type IAction = IItemsAction;


export default combineReducers({
  items,
});
