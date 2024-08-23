import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // Use createRoot instead of render

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
