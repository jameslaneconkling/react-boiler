import {
  assoc,
  pipe,
  find,
  equals,
  pathOr,
} from 'ramda';
import {
  Reducer,
} from 'redux';
import {
  Epic,
  ofType,
} from 'redux-observable';
import {
  of,
} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  delay,
} from 'rxjs/operators';
import {
  State,
  Action,
} from '../reducer';
import { createActionCreator } from '../../utils/redux';


/* types */
export interface Item {
  id: string
  title: string
}
export type Status = 'complete' | 'error' | 'pending'
export type ItemsAction = FetchItemsAction
  | FetchItemsSuccessAction
  | FetchItemsErrorAction
export interface ItemsState {
  status: Status
  data?: Item[]
  error?: string
}


/* selectors */
type Selector<S, T> = (state: S, ...params: any[]) => T

export const getItem: Selector<State, Item | undefined> = (state, id) => pipe(
  pathOr([], ['items', 'data']),
  find(equals(id))
)(state);


/* constants */
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';


/* action creators */
export const fetchItems = createActionCreator<{ query: string }, typeof FETCH_ITEMS>(FETCH_ITEMS);
export type FetchItemsAction = ReturnType<typeof fetchItems>

export const fetchItemsSuccess = createActionCreator<{ query: string, items: Item[] }, typeof FETCH_ITEMS_SUCCESS>(FETCH_ITEMS_SUCCESS);
export type FetchItemsSuccessAction = ReturnType<typeof fetchItemsSuccess>

export const fetchItemsError = createActionCreator<{ query: string, error: string }, typeof FETCH_ITEMS_ERROR>(FETCH_ITEMS_ERROR);
export type FetchItemsErrorAction = ReturnType<typeof fetchItemsError>


/* reducer */
const reducer: Reducer<ItemsState, Action> = (
  state = {
    status: 'complete',
  },
  action
) => {
  if (action.type === FETCH_ITEMS) {
    return assoc('status', 'pending', state);
  } else if (action.type === FETCH_ITEMS_SUCCESS) {
    return pipe(
      assoc('status', 'complete' as Status),
      assoc('data', action.items),
    )(state);
  } else if (action.type === FETCH_ITEMS_ERROR) {
    return pipe(
      assoc('status', 'error' as Status),
      assoc('error', action.error),
    )(state);
  }

  return state;
};

export default reducer;


/* epics */
export const noopEpic: Epic<Action, Action, State> = (action$) => action$.pipe(
  ofType<Action, FetchItemsAction>(FETCH_ITEMS),
  switchMap(({ query }) => (
    of([{ id: '1', title: 'thing1' }, { id: '2', title: 'thing2' }]).pipe(
      delay(1000),
      map((items) => fetchItemsSuccess({ query, items })),
      catchError((error) => of(fetchItemsError({ query, error })))
    )
  ))
);
