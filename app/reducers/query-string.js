'use strict';
export default (state = '', action) => {
  switch (action.type) {
    case 'setQueryString':
      return action.value;
    default:
      return state;
  }
};