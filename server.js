import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import path from "path";
import url from "url";
import session from "cookie-session";
import hpp from "hpp"; // This protects against HTTP Parameter Pollution attacks
import serverStatus from "./serverStats.cjs";


import { apiRouter } from "./api/api_router.js";
import env from './.env.cjs';
const {COOKIE_SECRET} = env; // pas un fichier normal mais un fichier .env.js pour que ce soit + simple

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));


// setup
const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(logger("dev"));

// Security Configs
app.use(hpp());

app.use(
  session({
    name: "session",
    secret: COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);

app.use("/status", serverStatus(app));

// sert les fichiers du site react compilé
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/photos", express.static(path.join(__dirname, "photos")));

// setup des routers
app.use("/api", apiRouter);

// retourne l'app react compilé si aucun des routers n'a catch la requete avant
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, (err) => {
  if (err) console.log(err);

  console.log(`listening on port ${port}`);
});
