'use strict';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import items from './reducers/items.js';
import queryString from './reducers/query-string.js';

const reducer = combineReducers({
  items, queryString
});

const mapStateToProps = (state, props) => ({
  queryString: props.location.query.q,
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  setQueryString(queryString) {
    dispatch({type: 'setQueryString', value: queryString});
  },
  deleteItem(itemId) {
    dispatch({type: 'deleteItem', value: itemId});
  }
});

export const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

export const connector = connect(mapStateToProps, mapDispatchToProps);
