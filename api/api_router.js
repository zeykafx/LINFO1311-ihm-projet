import express from "express";
import multer from "multer";

// import des fonctions qui gère des endpoints
// Account imports
import {Login} from "./POST/login.js";
import {VerifyCredentials} from "./POST/VerifyCredentials.js";
import {CreateAccount} from "./POST/CreateAccount.js";
import {ModifyAccount} from "./POST/ModifyAccount.js";
import {DeleteAccount} from "./POST/DeleteAccount.js";
import {getAccounts} from "./GET/getAccounts.js";
import {getAccountDataByUsername} from "./POST/getAccountDataByUsername.js";

// Movies imports
import {CreateMovie} from "./POST/Movies/CreateMovie.js";
import {ModifyMovie} from "./POST/Movies/ModifyMovie.js";
import {DeleteMovie} from "./POST/Movies/DeleteMovie.js";

import {client_getMovies} from "./POST/Movies/Client/client_getMovies.js";
import {client_getMovieFromID} from "./POST/Movies/Client/client_getMovieFromID.js";
import {getMovies} from "./GET/Movies/getMovies.js";

// TV Shows imports
import {CreateTVShow} from "./POST/TVShows/CreateTVShow.js";
import {ModifyTVShow} from "./POST/TVShows/ModifyTVShow.js";
import {DeleteTVShow} from "./POST/TVShows/DeleteTVShow.js";

import {client_getTVShows} from "./POST/TVShows/Client/client_getTVShows.js";
import { client_getTVShowFromID } from "./POST/TVShows/Client/client_getTVShowFromID.js";
import {getTVShows} from "./GET/TVShows/getTVShows.js";

// Others
import {UploadImage} from "./POST/upload.js"
import {isLoggedIn, logOut} from "./GET/accountInfo.js";
import { getBiography } from "./GET/getBiography.js";
import { editBiography } from "./POST/editBiography.js";

// Search imports
import { Search } from "./POST/Search/Search.js";


export const apiRouter = express.Router();

// multer setup
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `photos/${file.originalname}.${ext}`);
    },
});
export const upload = multer({
    storage: storage,
});

// API ROUTES
apiRouter.post("/upload", upload.single("image"), UploadImage);

// biography routes
apiRouter.get("/biography", getBiography)
apiRouter.post("/biography/modify", editBiography)

// Account system
apiRouter.post("/account/login", Login);
apiRouter.post("/account/verify", VerifyCredentials);
apiRouter.post("/account/create", CreateAccount);
apiRouter.post("/account/modify", ModifyAccount);
apiRouter.post("/account/delete", DeleteAccount);
apiRouter.get("/account/get", getAccounts);
apiRouter.post("/account/getAccountDataByUsername", getAccountDataByUsername);
apiRouter.get("/account/isLoggedIn", isLoggedIn);
apiRouter.get("/account/logOut", logOut);

// Movies system
apiRouter.post("/movies/create", CreateMovie);
apiRouter.post("/movies/modify", ModifyMovie);
apiRouter.post("/movies/delete", DeleteMovie);

apiRouter.post("/movies/client/get", client_getMovies);
apiRouter.post("/movies/client/getFromID", client_getMovieFromID);
apiRouter.get("/movies/get", getMovies);

// TV Show system
apiRouter.post("/tvshows/create", CreateTVShow);
apiRouter.post("/tvshows/modify", ModifyTVShow);
apiRouter.post("/tvshows/delete", DeleteTVShow);

apiRouter.post("/tvshows/client/get", client_getTVShows);
apiRouter.post("/tvshows/client/getFromID", client_getTVShowFromID);
apiRouter.get("/tvshows/get", getTVShows);

// Search
apiRouter.post("/search/", Search);
