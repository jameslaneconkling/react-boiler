'use strict';
import React from 'react';
import { Link, browserHistory } from 'react-router';
const { string, func } = React.PropTypes;

export default React.createClass({
  propTypes: {
    queryString: string,
    updateQueryString: func
  },

  getInitialState() {
    return {queryString: this.props.queryString || ''};
  },

  componentWillReceiveProps(newProps) {
    this.setState({queryString: newProps.queryString});
  },

  updateQueryStringEvent(e) {
    this.setState({queryString: e.target.value})
  },

  submitSearch(e) {
    e.preventDefault();

    // TODO - doesn't work'
    // browserHistory.push({ pathname: '/results', query: { q: this.state.queryString } });
  },

  render() {
    return (
      <form onSubmit={this.submitSearch}>
        <input type="text" value={this.state.queryString} placeholder="..." onChange={this.updateQueryStringEvent}/>
        <button>
          <Link to={{ pathname: '/results', query: { q: this.state.queryString } }}>Search</Link>
        </button>
      </form>
    );
  }
});
