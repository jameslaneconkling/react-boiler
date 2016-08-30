'use strict';
import React from 'react';
import SearchForm from './search-form.jsx';

export default React.createClass({
  getInitialState() {
    return {
      items: [
        {id: 1, name: 'one', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id: 2, name: 'two', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id: 3, name: 'three', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id: 4, name: 'four', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id: 5, name: 'five', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id: 6, name: 'six', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id: 7, name: 'seven', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
      ],
      queryString: null
    };
  },

  updateQueryString(queryString) {
    this.setState({queryString});
  },

  render() {
    return (
      <section>
        <h1>REACT BOILER</h1>
        <SearchForm queryString={this.state.queryString} updateQueryString={this.updateQueryString} />

        {this.props.children && React.cloneElement(this.props.children, { items: this.state.items })}
      </section>
    );
  }
});
