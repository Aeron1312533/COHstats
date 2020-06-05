import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
