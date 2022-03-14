import express from 'express';

// import des fonctions qui gère des endpoints
import { HelloWorld } from "./GET/hello_world.js";
import { Login } from "./POST/login.js";
import { VerifyCredentials } from "./POST/VerifyCredentials.js";
import { CreateAccount } from "./POST/CreateAccount.js";
import { getAccounts } from "./GET/getAccounts.js";
import { getAccountDataByUsername } from "./POST/getAccountDataByUsername.js";

export const apiRouter = express.Router();

// API ROUTES
apiRouter.get("/", HelloWorld);

// Account system
apiRouter.post("/account/login", Login);
apiRouter.post("/account/verify", VerifyCredentials);
apiRouter.post("/account/create", CreateAccount);
apiRouter.get("/account/get", getAccounts);
apiRouter.post("/account/getAccountDataByUsername", getAccountDataByUsername);