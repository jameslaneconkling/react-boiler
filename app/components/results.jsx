'use strict';
import React from 'react';
import Item from './item.jsx';

export default React.createClass({
  render() {
    const queryString = this.props.location.query.q;
    const items = this.props.items.filter(item => item);
    return (
      <section>
        <h1>Results</h1>
        <h2><em><small>{queryString}</small></em></h2>

        <ul>
          {items.map(item => <Item 
            item={item}
            key={item.id}
            deleteItem={this.props.deleteItem} 
          />)}
        </ul>
      </section>
    );
  }
});
