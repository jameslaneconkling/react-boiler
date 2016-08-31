'use strict';
// import redux from 'redux';
// import reactRedux from 'react-redux';
const redux = require('redux');
const reactRedux = require('react-redux');

const SET_QUERY_STRING = 'setQueryString';
const DELETE_ITEM = 'deleteItem';

const initialState = {
  items: [
    {id: 1, name: 'one', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {id: 2, name: 'two', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {id: 3, name: 'three', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {id: 4, name: 'four', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {id: 5, name: 'five', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {id: 6, name: 'six', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {id: 7, name: 'seven', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
  ],
  queryString: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY_STRING:
      return Object.assign({}, state, {queryString: action.value});
    case DELETE_ITEM:
      const items = state.items.filter(item => item.id !== action.value);
      return Object.assign({}, state, { items });
    default:
      return state;
  }
};

const mapStateToProps = state => ({
  queryString: state.queryString,
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  setQueryString(queryString) {
    dispatch({type: SET_QUERY_STRING, value: queryString});
  },
  deleteItem(itemId) {
    dispatch({type: DELETE_ITEM, value: itemId});
  }
});

export const store = redux.createStore(reducer);

export const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps);
