import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const config = require('./config.json');
ReactDOM.render(
  <React.StrictMode>
        <App config={config}/>
  </React.StrictMode>,
  document.getElementById('root')
);
