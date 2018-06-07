import { combineEpics } from 'redux-observable';
import { noopEpic } from './modules/items';


export default combineEpics(noopEpic);
