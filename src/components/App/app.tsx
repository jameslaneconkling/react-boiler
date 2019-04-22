import React, { SFC } from 'react';
import { Props } from '../../containers/AppContainer';
import {
  add,
  identity,
} from '../../utils/utils';
import './style.scss';


const App: SFC<Props> = () => (
  <div className="app">
    <h1>REACT REDUX BOILER</h1>
    <pre>2 + 2 = {add(identity(2), 2)}</pre>
  </div>
);


export default App;
