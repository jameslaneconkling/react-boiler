import React, {
  Component
}                  from 'react';
import { connect } from 'react-redux';
import World       from './world.jsx';

const selectItems = state => {
  return Object.keys(state.items).map(itemId => ({
    [itemId]: { name: state.items[itemId].name, description: state.items[itemId].description }
  }));
};


export default class App extends Component {
  render() {
    const { items } = this.props;

    return (
      <main>
        <h1>REACT BOILER</h1>

        <World />

        <ul>
          {items.map(item => (
            <li
              key={item.key}
            >
              {item.name}: {item.description}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => ({
  items: selectItems(state)
});

const mapDispatchToProps = dispatch => ({
  add() {
    dispatch({ type: 'add' });
  },
  remove(value) {
    dispatch({ type: 'remove', value });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
