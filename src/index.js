import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

import App from './components/App';

import reducer, { initialState } from './contexts/reducer';
import { StateProvider } from './contexts/StateProvider';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer} >
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);