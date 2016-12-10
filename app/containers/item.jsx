import {
  connect
}                from 'react-redux';
import Item      from '../components/item';
import {
  deleteClickAction
}                from '../actions/items';

const mapDispatchToProps = dispatch => ({
  deleteClick(id) {
    dispatch(deleteClickAction(id));
  }
});

export default connect(null, mapDispatchToProps)(Item);
