import R from 'ramda';

/**
 * constants
 */
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';


/**
 * action creators
 */
export const addItem = () => ({ type: ADD_ITEM });
export const deleteItem = id => ({ type: DELETE_ITEM, value: id });


/**
 * reducer
 */
const items = {
  1: { name: 'one', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
  2: { name: 'two', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
  3: { name: 'three', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
  4: { name: 'four', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
  5: { name: 'five', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
  6: { name: 'six', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
  7: { name: 'seven', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' }
};

export default (state = items, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItemId = Math.max(Object.keys(state));
      return {
        ...state,
        [newItemId]: { name: `new item ${newItemId}`, description: 'new lorem' }
      };
    }
    case DELETE_ITEM: {
      return R.omit([action.value], state);
    }
    default:
      return state;
  }
};


/**
 * epics
 */
export const noopEpic = action$ =>
  action$.ofType(DELETE_ITEM)
    .map(() => ({ type: 'NO_OP_RESPONSE' }));
