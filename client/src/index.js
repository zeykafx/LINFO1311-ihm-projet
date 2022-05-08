import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import NavBar from "./views/NavBar/NavBar";
import Admin from "./views/Admin/Admin";
import PageNotFound from "./views/PageNotFound";
import App from "./views/App";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/misc/Footer";

import AccountPage from "./views/Admin/AccountPage";
import CreatePage from "./views/Admin/CreatePage";
import EditPage from "./views/Admin/EditPage";
import AdminSubPages from "./views/Admin/Components/AdminSubPages";

function MainApp() {
  const [isUserAuthed, setIsUserAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("");

  let handleUserAuthChange = (bool) => {
    setIsUserAuthed(bool);
  };

  let handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };

  let handleAccountTypeChange = (newType) => {
    setAccountType(newType);
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar
          isUserAuthed={isUserAuthed}
          setIsUserAuthed={handleUserAuthChange}
          username={username}
          setUsername={handleUsernameChange}
          accountType={accountType}
          setAccountType={handleAccountTypeChange}
        />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/admin/edit-movies-shows"
            element={
              <AdminSubPages>
                <EditPage />
              </AdminSubPages>
            }
          />
          <Route
            path="/admin/create-movies-shows"
            element={
              <AdminSubPages>
                <CreatePage />
              </AdminSubPages>
            }
          />
          <Route
            path="/admin/accounts-settings"
            element={
              <AdminSubPages>
                <AccountPage />
              </AdminSubPages>
            }
          />

          {/* Si on trouve pas, on redirige vers 404 */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer
          isUserAuthed={isUserAuthed}
          setIsUserAuthed={handleUserAuthChange}
          username={username}
          setUsername={handleUsernameChange}
        />
      </BrowserRouter>
    </ChakraProvider>
  );
}

ReactDOM.render(<MainApp />, document.getElementById("root"));
