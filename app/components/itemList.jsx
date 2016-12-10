import React, {
  PropTypes
}                from 'react';
import Item      from '../containers/item';

const ItemList = ({ items }) => (
  <ul>
    {items.map(item => (
      <Item
        key={item.id}
        id={item.id}
        name={item.name}
        description={item.description}
      />
    ))}
  </ul>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape())
};

export default ItemList;
