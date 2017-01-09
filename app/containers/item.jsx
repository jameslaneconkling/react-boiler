import {
  connect
}                from 'react-redux';
import Item      from '../components/item';
import {
  deleteItem
}                from '../redux/modules/items';

const mapDispatchToProps = dispatch => ({
  deleteClick(id) {
    dispatch(deleteItem(id));
  }
});

export default connect(null, mapDispatchToProps)(Item);
