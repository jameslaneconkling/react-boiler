'use strict';
import React from 'react';
import { connect } from 'react-redux';
import {
  Link,
  hashHistory
} from 'react-router';

const App = React.createClass({
  propTypes: {
    queryString: React.PropTypes.string,
    items: React.PropTypes.array,
    updateQueryString: React.PropTypes.func,
    deleteItem: React.PropTypes.func,
  },

  getInitialState() {
    return {
      queryString: this.props.queryString
    };
  },

  updateQueryStringEvent(e) {
    this.setState({queryString: e.target.value})
  },

  itemClickEvent(e) {
    this.props.deleteItem(e.target.getAttribute('data-id'));
  },

  submitFilter() {
    hashHistory.push({ pathname: '/', query: { q: this.state.queryString } });
    // this.props.setQueryString(this.state.queryString);
  },

  render() {
    const items = this.props.items
      .filter(item => new RegExp(this.props.queryString.split('').join('.*')).test(item.name))
      .map(item => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <button onClick={this.itemClickEvent} data-id={item.id}>x</button>
          <p>{item.description}</p>
        </li>
      ));

    return (
      <main>
        <h1>REACT BOILER</h1>
        <hr/>

        <form onSubmit={this.submitFilter}>
          <input type="text" value={this.state.queryString} placeholder="..." onChange={this.updateQueryStringEvent}/>
          <button>
            {/* could just do <button onClick={this.submitFilter} />, but to demonstrate routing: */}
            <Link to={{ pathname: '/', query: { q: this.state.queryString } }}>Filter</Link>
          </button>
        </form>

        <ul>
          {items}
        </ul>
      </main>
    );
  }
});

const mapStateToProps = (state, props) => ({
  queryString: props.location.query.q,
  // queryString: state.queryString,
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  setQueryString(queryString) {
    dispatch({type: 'setQueryString', value: queryString});
  },
  deleteItem(itemId) {
    dispatch({type: 'deleteItem', value: itemId});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
