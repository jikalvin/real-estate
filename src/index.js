import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HouseContextProvider from './Components.js/HouseContext';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
import { FirebaseAuthProvider } from './Files/FirebaseAuthContext';

Kommunicate.init("15f007d4a9bc298a384310698b4780c4b")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <FirebaseAuthProvider>
      <HouseContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HouseContextProvider>
    </FirebaseAuthProvider>
  </Router>
);

