'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
import App from './components/app.jsx';

ReactDOM.render(<App />, document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

export default App;
