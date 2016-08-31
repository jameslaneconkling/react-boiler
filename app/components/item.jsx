'use strict';
import React from 'react';

export default React.createClass({
  deleteButtonClicked() {
    this.props.deleteItem(this.props.item.id);
  },
  render() {
    return (
      <li>
        <dl>
          <dt>ID</dt>
          <dd>{this.props.item.id}</dd>
          <dt>Description</dt>
          <dd>{this.props.item.description}</dd>
        </dl>
        <button onClick={this.deleteButtonClicked}>X</button>
      </li>
    );
  }
});
