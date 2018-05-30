import React from 'react';
import { hot } from 'react-hot-loader';
import {
  add,
  identity,
} from '../../utils/utils';
import './style.scss';


const App: React.StatelessComponent<{}> = () => (
  <div className="app">
    <h1>REACT REDUX BOILER</h1>
    <pre>2 + 2 = {add(identity(2), 2)}</pre>
  </div>
);


export default hot(module)(App);
