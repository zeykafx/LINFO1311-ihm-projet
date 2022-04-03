import React, { useState } from "react";
import "./Admin.css";

import AdminLoginForm from '../components/form/AdminLoginForm';
import AdminCreateAccountForm from '../components/form/AdminCreateAccountForm';
import AdminAccountsViewer from '../components/viewer/AdminAccountsViewer';
import AdminCreateMovieForm from '../components/form/AdminCreateMovieForm';
import AdminMoviesViewer from "../components/viewer/AdminMoviesViewer";

import CButton from '../components/form/buttons/CButton';
import AdminCreateTVShowForm from "../components/form/TVShows/AdminCreateTVShowForm";
import AdminTVShowsViewer from "../components/viewer/TVShows/AdminTVShowsViewer";

function Admin() {

    const [index, setIndex] = useState(5);

    const getAdminPanel = () => {
        switch(index){
            case 0:
                return <AdminMoviesViewer />
            case 1:
                return <AdminCreateMovieForm />
            case 2:
                return <AdminAccountsViewer />
            case 3:
                return <AdminCreateAccountForm />
            case 4:
                return <AdminLoginForm />
            case 5:
                return <AdminTVShowsViewer />
            case 6:
                return <AdminCreateTVShowForm />
        }
    }
    
    const updateIndex = () => {
        if (index == 6){
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
