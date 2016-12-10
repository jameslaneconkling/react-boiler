import React, {
  PropTypes
} from 'react';

const Item = (props) => {
  const { id, name, description, deleteClick } = props;
  const deleteClickEvent = () => deleteClick(id);

  return (
    <li>
      <button onClick={deleteClickEvent}>x</button>
      <strong>{name}</strong>: {description}
    </li>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  deleteClick: PropTypes.func.isRequired
};

export default Item;
