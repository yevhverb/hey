import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as Store } from 'react-redux';
import { store } from './store';
import { App } from './App';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Store store={store}>
      <Router>
        <App />
      </Router>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
