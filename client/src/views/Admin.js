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
            default:
              return <AdminMoviesViewer />
        }
    }
    
    const updateIndex = () => {
        if (index === 6){
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

  return (
    <div className="adminQuickRender">
      <div className="simulatedNavigationBar">
        {/* <h1>Navigation bar preview</h1> */}
        {/* <CButton 
          text="Change panel"
          onPress={() => updateIndex()}
        /> */}
        <CButton 
          text="Movie viewer"
          onPress={() => setIndex(0)}
        />
        <CButton 
          text="Create movie"
          onPress={() => setIndex(1)}
        />
        <CButton 
          text="Account viewer"
          onPress={() => setIndex(2)}
        />
        <CButton 
          text="Create Account"
          onPress={() => setIndex(3)}
        />
        <CButton 
          text="Login form"
          onPress={() => setIndex(4)}
        />
        <CButton 
          text="TV show viewer"
          onPress={() => setIndex(5)}
        />
        <CButton 
          text="Create TV show"
          onPress={() => setIndex(6)}
        />
      </div>
      <div className="simulatedContainer">
        {getAdminPanel()}
      </div>
    </div>
  );
}

export default Admin;
