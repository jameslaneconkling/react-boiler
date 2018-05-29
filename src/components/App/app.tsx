import React from 'react';
import {
  add,
  identity,
} from '../../utils/utils';
import './style';


const App: React.StatelessComponent<{}> = () => (
  <div className="app">
    <h1>REACT REDUX BOILER</h1>
    <pre>2 + 2 = {add(identity(2), 2)}</pre>
  </div>
);

export default App;
