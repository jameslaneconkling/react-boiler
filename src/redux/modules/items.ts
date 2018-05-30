import {
  assoc,
  pipe,
} from 'ramda';
import { Action as ReduxAction } from 'redux';
import {
  Epic as IEpic,
  ofType,
} from 'redux-observable';
import {
  empty,
} from 'rxjs';
import {
  switchMap,
} from 'rxjs/operators';
import {
  IState,
  IAction,
} from '../reducer';


/*
 * types
 */
// export type Status = 'complete' | 'error' | 'pending';
export interface IItem {
  id: string;
  title: string;
}
export type IItemsAction = IFetchItemsAction
  | IFetchItemsSuccessAction
  | IFetchItemsErrorAction;
export interface IItemsState {
  status: string;
  // TODO
  // status: Status;
}


/**
 * constants
 */
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';


/**
 * action creators
 */
interface IFetchItemsAction extends ReduxAction {
  type: typeof FETCH_ITEMS;
  query: string;
}
export const fetchItems = (query: string): IFetchItemsAction => ({
  type: FETCH_ITEMS,
  query,
});

interface IFetchItemsSuccessAction {
  type: typeof FETCH_ITEMS_SUCCESS;
  query: string;
  items: IItem[];
}
export const fetchItemsSuccess = (query: string, items: IItem[]): IFetchItemsSuccessAction => ({
  type: FETCH_ITEMS_SUCCESS, query, items,
});

interface IFetchItemsErrorAction {
  type: typeof FETCH_ITEMS_ERROR;
  query: string;
  error: string;
}
export const fetchItemsError = (query: string, error: string): IFetchItemsErrorAction => ({
  type: FETCH_ITEMS_ERROR, query, error,
});


/**
 * reducer
 */
export default (
  state: IItemsState = {
    status: 'complete',
  },
  action: IAction
) => {
  if (action.type === FETCH_ITEMS) {
    return assoc('status', 'pending', state);
  } else if (action.type === FETCH_ITEMS_SUCCESS) {
    return pipe(
      assoc('status', 'complete'),
      assoc('data', action.items)
    )(state);
  } else if (action.type === FETCH_ITEMS_ERROR) {
    return assoc('status', 'error', state);
  }

  return state;
};


/**
 * epics
 */
export const noopEpic: IEpic<IAction, IState> = (action$) => action$.pipe(
  ofType(FETCH_ITEMS),
  switchMap(() => empty())
);
