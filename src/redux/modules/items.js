import { Observable }    from 'rxjs/Observable';
import                        'rxjs/add/operator/switchMap';
import                        'rxjs/add/observable/empty';

/**
 * constants
 */
export const NO_OP = 'NO_OP';


/**
 * action creators
 */
export const noOp = () => ({ type: NO_OP });


/**
 * reducer
 */
export default (state = {}) => state;


/**
 * epics
 */
export const noopEpic = action$ =>
  action$.ofType(NO_OP)
    .switchMap(() => Observable.empty());
