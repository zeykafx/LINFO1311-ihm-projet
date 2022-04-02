import React, { useState } from "react";
import "./Admin.css";

import AdminLoginForm from '../components/form/AdminLoginForm';
import AdminCreateAccountForm from '../components/form/AdminCreateAccountForm';
import AdminAccountsViewer from '../components/viewer/AdminAccountsViewer';
import AdminCreateMovieForm from '../components/form/AdminCreateMovieForm';
import AdminMoviesViewer from "../components/viewer/AdminMoviesViewer";

import CButton from '../components/form/buttons/CButton';

function Admin() {

    const [index, setIndex] = useState(0);

    const getAdminPanel = () => {
        switch(index){
            case 0:
                return <AdminMoviesViewer />
            case 1:
                return <AdminCreateAccountForm />
            case 2:
                return <AdminAccountsViewer />
            case 3:
                return <AdminCreateMovieForm />
            case 4:
                return <AdminLoginForm />
        }
    }
    
    const updateIndex = () => {
        if (index == 4){
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

  return (
    <div className="adminQuickRender">
      <div className="simulatedNavigationBar">
        <h1>Navigation bar preview</h1>
        <CButton 
          text="Change panel"
          onPress={() => updateIndex()}
        />
      </div>
      <div className="simulatedContainer">
        {getAdminPanel()}
      </div>
    </div>
  );
}

export default Admin;
