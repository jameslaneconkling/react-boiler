import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/app.jsx';

render((
  <Router history={hashHistory}>
    <Route path='/' component={App} />
  </Router>
), document.getElementById('app'));

export default App;
