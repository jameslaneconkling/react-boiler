"use strict";
const React = require('react');

const App = React.createClass({
  render() {
    return (
      <h1>REACT BOILER</h1>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
