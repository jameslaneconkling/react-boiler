import React, {
  Component
}                 from 'react';
import World      from './world.jsx';

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
