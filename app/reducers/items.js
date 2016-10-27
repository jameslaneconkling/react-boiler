'use strict';
const items = [
  {id: '1', name: 'one', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: '2', name: 'two', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: '3', name: 'three', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: '4', name: 'four', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: '5', name: 'five', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: '6', name: 'six', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: '7', name: 'seven', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
];

export default (state = items, action) => {
  switch (action.type) {
    case 'deleteItem':
      return state.filter(item => item.id !== action.value);
    default:
      return state;
  }
};
