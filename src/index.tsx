import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/style.scss';

import { Provider } from 'react-redux';
import App from './App';
import { Context, storeList } from './Context';
import { store as ReduxStore } from './store';
import Reduxtest from './components/reduxtest';

const application = (
  <>
    <Provider store={ReduxStore}>
      <Context.Provider value={storeList}>
        <Reduxtest />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  </>
);

ReactDOM.render(
  application,
  document.getElementById('root'),
);
