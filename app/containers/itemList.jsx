import {
  connect
}                from 'react-redux';
import ItemList  from '../components/itemList';
import {
  selectItems
}                from '../selectors/items';

const mapStateToProps = state => ({
  items: selectItems(state)
});

export default connect(mapStateToProps, null)(ItemList);
