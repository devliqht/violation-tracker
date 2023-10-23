import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { StudentsContextProvider } from './context/StudentsContext';
import { ViolationsContextProvider } from './context/ViolationsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StudentsContextProvider>
      <ViolationsContextProvider>
        <App />
      </ViolationsContextProvider>
    </StudentsContextProvider>
  </React.StrictMode>
);

