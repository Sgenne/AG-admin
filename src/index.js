import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import FirebaseProvider from "./store/FirebaseProvider";

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById('root')
);

