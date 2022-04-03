import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Admin from './views/Admin';
import Index from './views/Index';

ReactDOM.render(
  <React.StrictMode>
    
    <App />

    <Index />

    <Admin />

  </React.StrictMode>,
  document.getElementById('root')
);
