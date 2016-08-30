'use strict';
import React from 'react';

export default React.createClass({
  render() {
    const queryString = this.props.location.query.q;
    const items = this.props.items.filter(item => item);
    return (
      <section>
        <h1>Results</h1>
        <h2><em><small>{queryString}</small></em></h2>

        <ul>
          {items.map(item => (
            <li key={item.id}>
              <dl>
                <dt>ID</dt>
                <dd>{item.id}</dd>
                <dt>Description</dt>
                <dd>{item.description}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    );
  }
});
