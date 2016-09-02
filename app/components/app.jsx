'use strict';
import React from 'react';
import SearchForm from './search-form.jsx';
import { connect } from 'react-redux';

const App = React.createClass({
  propTypes: {
    queryString: React.PropTypes.string,
    items: React.PropTypes.array,
    updateQueryString: React.PropTypes.func,
    deleteItem: React.PropTypes.func,
  },

  updateQueryString(queryString) {
    this.props.setQueryString(queryString);
  },

  deleteItem(itemId) {
    this.props.deleteItem(itemId);
  },

  render() {
    return (
      <section>
        <h1>REACT BOILER</h1>
        <SearchForm queryString={this.props.queryString} updateQueryString={this.updateQueryString} />

        {this.props.children && React.cloneElement(this.props.children, {
          queryString: this.props.queryString,
          items: this.props.items,
          deleteItem: this.deleteItem
        })}
      </section>
    );
  }
});

const mapStateToProps = (state, props) => ({
  queryString: props.location.query.q,
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
