'use strict';
const React = require('react');
import App from './components/app.jsx';

React.render(<App />, document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

export default App;
