import React from 'react';
import {
  add,
} from 'ramda';


export default () => (
  <div className="app">
    <h1>REACT REDUX BOILER</h1>
    <pre>2 + 2 = {add(2, 2)}</pre>
  </div>
);
