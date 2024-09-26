import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { MessageContextProvider } from './context/MessageContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
