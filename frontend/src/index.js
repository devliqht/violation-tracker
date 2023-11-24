import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { StudentsContextProvider } from './context/StudentsContext';
import { ViolationsContextProvider } from './context/ViolationsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientID = "177566154177-2qtgppuanma1jp9gum8lblaiu7lmevhh.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="177566154177-2qtgppuanma1jp9gum8lblaiu7lmevhh.apps.googleusercontent.com">
    <StudentsContextProvider>
      <ViolationsContextProvider>
        <App />
      </ViolationsContextProvider>
    </StudentsContextProvider>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);

