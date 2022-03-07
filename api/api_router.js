import express from 'express';

// import des fonctions qui gère des endpoints
import { HelloWorld } from "./GET/hello_world.js";

export const apiRouter = express.Router();

// API ROUTES
apiRouter.get("/", HelloWorld);
