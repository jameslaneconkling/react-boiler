import React, {
  Component
}                 from 'react';
import World      from './world.jsx';

// const x = {a: 1, b: 2};
// const y = {...x, {c: 3}};
// console.log(y)

export default class App extends Component {
  render() {
    return (
      <section>
        <h1>REACT BOILER</h1>
        <World />
      </section>
    );
  }
}

