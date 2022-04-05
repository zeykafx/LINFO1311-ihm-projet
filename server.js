import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import path from "path";
import url from "url";

import { apiRouter } from "./api/api_router.js";

// setup
const app = express();
const port = process.env.PORT || 80;

// sert les fichiers du site react compilé
let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/photos", express.static(path.join(__dirname, "photos")));


app.use(bodyParser.json());
app.use(logger("dev"));

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
