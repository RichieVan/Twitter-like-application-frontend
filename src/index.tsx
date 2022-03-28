import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/style.scss';

import App from './App';
import { Context, storeList } from './Context';

const application = (
  <Context.Provider value={storeList}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);

ReactDOM.render(
  application,
  document.getElementById('root'),
);
