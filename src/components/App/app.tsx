import React, { SFC } from 'react';
import { hot } from 'react-hot-loader';
import { Props } from '../../containers/AppContainer/appContainer';
import './style.scss';


const App: SFC<Props> = ({ query, currency, onCurrencyChange, refetch }) => {
  if (query.type === 'EMPTY') {
    return <div/>
  } else if (query.type === 'ERROR') {
    return (
      <div>
        <h2>error</h2>
        <pre>
          {JSON.stringify(query.error, null, 2)}
        </pre>
      </div>
    );
  } else if (query.type === 'LOADING') {
    return (
      <div>
        <h2>loading</h2>
      </div>
    );
  }

  return (
    <div>
      <select
        value={currency}
        onChange={onCurrencyChange}
      >
        {['AED', 'AFN', 'ALL', 'AMD'].map((value) => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>

      <button
        onClick={refetch}
      >
        refresh
      </button>

      {query.loading && <span>loading...</span>}

      <h2>rates:</h2>
      <ul>
        {
          (query.rates || []).slice(0, 10).map(({ name, currency, rate }) => ( // rates is not possibly undefined--would apollo-codegen produce better types?
            <li key={currency}>
              <strong>{name}</strong> ({currency}): <span>{rate}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};


export default hot(module)(App);
