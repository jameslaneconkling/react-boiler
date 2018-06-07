import {
  assoc,
  pipe,
  find,
  equals,
  path,
  pathOr,
} from 'ramda';
import {
  Reducer,
  Action,
  ActionCreator,
} from 'redux';
import {
  Epic,
  ofType,
} from 'redux-observable';
import {
  of,
  empty,
} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  delay,
} from 'rxjs/operators';
import {
  IState,
  IAction,
} from '../reducer';


/* types */
export interface IItem {
  id: string
  title: string
}
export type IStatus = 'complete' | 'error' | 'pending'
export type IItemsAction = IFetchItems
  | IFetchItemsSuccess
  | IFetchItemsError
export interface IItemsState {
  status: IStatus
  data?: IItem[]
}


/* selectors */
type Selector<S, T> = (state: S, ...params: any[]) => T

export const getItem: Selector<IState, IItem | undefined> = (state, id) => pipe(
  pathOr([], ['items', 'data']),
  find(equals(id))
)(state);


/* constants */
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';



interface IFetchItems extends Action<typeof FETCH_ITEMS> {
  query: string
}
export const fetchItems = (query: string): IFetchItems => ({
  type: FETCH_ITEMS, query,
});

interface IFetchItemsSuccess extends Action<typeof FETCH_ITEMS_SUCCESS> {
  query: string, items: IItem[]
}
export const fetchItemsSuccess = (query: string, items: IItem[]): IFetchItemsSuccess => ({
  type: FETCH_ITEMS_SUCCESS, query, items,
});

interface IFetchItemsError extends Action<typeof FETCH_ITEMS_ERROR> {
  query: string, error: string
}
export const fetchItemsError = (query: string, error: string): IFetchItemsError => ({
  type: FETCH_ITEMS_ERROR, query, error,
});


/* reducer */
const reducer: Reducer<IItemsState, IAction> = ( // TODO - can this be Action? 
  state = {
    status: 'complete',
  },
  action
) => {
  if (action.type === FETCH_ITEMS) {
    return assoc('status', 'pending', state);
  } else if (action.type === FETCH_ITEMS_SUCCESS) {
    return pipe(
      assoc('status', 'complete' as IStatus),
      assoc('data', action.items),
    )(state);
  } else if (action.type === FETCH_ITEMS_ERROR) {
    return assoc('status', 'error', state);
  }

  return state;
};

export default reducer;


/* epics */
export const noopEpic: Epic<IAction, IState> = (action$) => action$.pipe(
  ofType<IAction, IFetchItems>(FETCH_ITEMS),
  switchMap(({ query }) => (
    of([{ id: '1', title: 'thing1' }, { id: '2', title: 'thing2' }]).pipe(
      delay(1000),
      map((items) => fetchItemsSuccess(query, items)),
      catchError((error) => of(fetchItemsError(query, error)))
    )
  ))
);
