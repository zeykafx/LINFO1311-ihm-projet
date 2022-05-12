import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import NavBar from "./views/NavBar/NavBar";
import Admin from "./views/Admin/Admin.js";
import PageNotFound from "./views/PageNotFound";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/misc/Footer";

import Index from "./views/Index.js";
import { Gallery } from "./views/Gallery";
import { Contact } from "./views/Contact";

import { Movie } from "./views/Movie";
import { TVShow } from "./views/TVShow";

import { MoviesTab } from "./views/MoviesTab";
import { TvTab } from "./views/TvTab";

import AccountPage from "./views/Admin/AccountPage";
import CreatePage from "./views/Admin/CreatePage";
import EditPage from "./views/Admin/EditPage";
import BioTextEditor from "./views/Admin/BioTextEditor";

import AdminSubPages from "./views/Admin/Components/AdminSubPages";
import AdminGalleryPage from "./views/Admin/AdminGalleryPage";

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
          <Route path="/" element={<Index />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/movies" element={<MoviesTab/>} />
          <Route path="/television" element={<TvTab/>} />

          <Route path="/movie/:id" element={<Movie/>} />

          <Route path="/tvShow/:id" element={<TVShow/>} />

          <Route
            path="/admin"
            element={isUserAuthed ? <Admin /> : <PageNotFound />}
          />

          <Route
            path="/admin/edit-movies-shows"
            element={
              <AdminSubPages isUserAuthed={isUserAuthed}>
                <EditPage />
              </AdminSubPages>
            }
          />
          <Route
            path="/admin/create-movies-shows"
            element={
              <AdminSubPages isUserAuthed={isUserAuthed}>
                <CreatePage />
              </AdminSubPages>
            }
          />
          <Route
            path="/admin/accounts-settings"
            element={
              <AdminSubPages isUserAuthed={isUserAuthed}>
                <AccountPage accountType={accountType}/>
              </AdminSubPages>
            }
          />
          <Route
            path={"/admin/bio-editor"}
            element={
              <AdminSubPages isUserAuthed={isUserAuthed}>
                <BioTextEditor />
              </AdminSubPages>
            }
          />

        <Route
            path={"/admin/gallery-editor"}
            element={
              <AdminSubPages isUserAuthed={isUserAuthed}>
                <AdminGalleryPage />
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
          setAccountType={setAccountType}
        />
      </BrowserRouter>
    </ChakraProvider>
  );
}

ReactDOM.render(<MainApp />, document.getElementById("root"));
