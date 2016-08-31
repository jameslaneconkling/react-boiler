'use strict';
import React from 'react';
import { Link } from 'react-router';
const { string, func } = React.PropTypes;

export default React.createClass({
  propTypes: {
    queryString: string,
    updateQueryString: func
  },
  inputQueryStringEvent(e) {
    this.props.updateQueryString(e.target.value);
  },
  render() {
    return (
      <div>
        <input type="text" value={this.props.queryString} placeholder="..." onChange={this.inputQueryStringEvent}/>
        <button>
          <Link to={{ pathname: '/results', query: { q: this.props.queryString } }}>Search</Link>
        </button>
      </div>
    );
  }
});
