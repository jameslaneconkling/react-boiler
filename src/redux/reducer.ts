import {
  combineReducers,
  Reducer as IReducer,
} from 'redux';
import {
  routerReducer,
  RouterState as IRouterState,
  RouterAction as IRouterAction,
} from 'react-router-redux';
import items, {
  IItemsState,
  IItemsAction,
} from './modules/items';


export interface IState {
  items: IItemsState;
  routing: IRouterState;
}

export type IAction = IItemsAction
  | IRouterAction;


export default combineReducers({
  items,
  routing: (routerReducer as IReducer<IRouterState>),
});
