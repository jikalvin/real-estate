import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HouseContextProvider from './Components.js/HouseContext';
import { BrowserRouter as Router } from 'react-router-dom';

import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

Kommunicate.init("2f45360e44a345cc3b401a58e66f51006")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <HouseContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HouseContextProvider>
  </Router>
);

