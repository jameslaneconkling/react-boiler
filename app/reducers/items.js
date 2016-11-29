import R from 'ramda';

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
    case 'add':
      const newItemId = Math.max(Object.keys(state));
      return {
        ...state,
        { [newItemId]: { name: `new item ${newItemId}`, description: 'new lorem' } }
      };
    case 'remove':
      return R.omit([action.value], state);
    default:
      return state;
  }
};
