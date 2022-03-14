import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AdminLoginForm from './components/form/AdminLoginForm';
import AdminCreateAccountForm from './components/form/AdminCreateAccountForm';
import AdminAccountsViewer from './components/viewer/AdminAccountsViewer';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AdminLoginForm />
    <AdminCreateAccountForm />
    <AdminAccountsViewer />
  </React.StrictMode>,
  document.getElementById('root')
);
