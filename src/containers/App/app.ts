import {
  connect,
} from 'react-redux';
import {
  compose,
} from 'recompose';
import App from '../../components/App/index';


export default compose(
  connect()
)(App);
