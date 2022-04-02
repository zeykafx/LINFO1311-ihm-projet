import express from 'express';

// import des fonctions qui gère des endpoints
import { HelloWorld } from "./GET/hello_world.js";

// Account imports
import { Login } from "./POST/login.js";
import { VerifyCredentials } from "./POST/VerifyCredentials.js";
import { CreateAccount } from "./POST/CreateAccount.js";
import { ModifyAccount } from "./POST/ModifyAccount.js";
import { DeleteAccount } from "./POST/DeleteAccount.js";
import { getAccounts } from "./GET/getAccounts.js";
import { getAccountDataByUsername } from "./POST/getAccountDataByUsername.js";

// Movies imports
import { CreateMovie } from "./POST/Movies/CreateMovie.js";
import { ModifyMovie } from "./POST/Movies/ModifyMovie.js";
import { DeleteMovie } from "./POST/Movies/DeleteMovie.js";
import { getMovies } from "./GET/Movies/getMovies.js";

export const apiRouter = express.Router();

// API ROUTES
apiRouter.get("/", HelloWorld);

// Account system
apiRouter.post("/account/login", Login);
apiRouter.post("/account/verify", VerifyCredentials);
apiRouter.post("/account/create", CreateAccount);
apiRouter.post("/account/modify", ModifyAccount);
apiRouter.post("/account/delete", DeleteAccount);
apiRouter.get("/account/get", getAccounts);
apiRouter.post("/account/getAccountDataByUsername", getAccountDataByUsername);

// Movies system
apiRouter.post("/movies/create", CreateMovie);
apiRouter.post("/movies/modify", ModifyMovie);
apiRouter.post("/movies/delete", DeleteMovie);
apiRouter.get("/movies/get", getMovies);