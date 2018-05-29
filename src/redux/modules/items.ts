import {
  assoc,
  pipe,
} from 'ramda';
import { Action as ReduxAction } from 'redux';
import {
  Epic,
  ofType,
} from 'redux-observable';
import {
  empty,
} from 'rxjs';
import {
  switchMap,
} from 'rxjs/operators';
import {
  State,
  Action,
} from '../reducer';


/*
 * types
 */
// export type Status = 'complete' | 'error' | 'pending';
export interface Item {
  id: string;
  title: string;
}
export type ItemsAction = FetchItemsAction
  | FetchItemsSuccessAction
  | FetchItemsErrorAction;
export interface ItemsState {
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
interface FetchItemsAction extends ReduxAction {
  type: typeof FETCH_ITEMS;
  query: string;
}
export const fetchItems = (query: string): FetchItemsAction => ({
  type: FETCH_ITEMS,
  query,
});

interface FetchItemsSuccessAction {
  type: typeof FETCH_ITEMS_SUCCESS;
  query: string;
  items: Item[];
}
export const fetchItemsSuccess = (query: string, items: Item[]): FetchItemsSuccessAction => ({
  type: FETCH_ITEMS_SUCCESS, query, items,
});

interface FetchItemsErrorAction {
  type: typeof FETCH_ITEMS_ERROR;
  query: string;
  error: string;
}
export const fetchItemsError = (query: string, error: string): FetchItemsErrorAction => ({
  type: FETCH_ITEMS_ERROR, query, error,
});


/**
 * reducer
 */
export default (
  state: ItemsState = {
    status: 'complete',
  },
  action: Action
): ItemsState => {
  if (action.type === FETCH_ITEMS) {
    // TODO - replace with assoc
    return {
      ...state,
      status: 'pending',
    };
  } else if (action.type === FETCH_ITEMS_SUCCESS) {
    return pipe(
      assoc('status', 'complete'),
      assoc('data', action.items)
    )(state);
  } else if (action.type === FETCH_ITEMS_ERROR) {
    return {
      ...state,
      status: 'error',
    };
  }

  return state;
};


/**
 * epics
 */
export const noopEpic: Epic<Action, State> = (action$) => action$.pipe(
  ofType(FETCH_ITEMS),
  switchMap(() => empty())
);
