import React, {
  Component
}                from 'react';
import {
  connect
}                from 'react-redux';


class Table extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>X</td>
            <td>Y</td>
            <td>Z</td>
          </tr>
          <tr>
            <td>X</td>
            <td>Y</td>
            <td>Z</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(null, null)(Table);
