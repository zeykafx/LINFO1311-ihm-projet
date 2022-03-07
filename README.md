# Projet IHM 
## Setup
- run `npm i` pour installer tout les modules
- Lancer le serveur en faisant `npm start` dans le dossier principale
- si vous voulez voire le site compilé via le serveur vous devez faire `npm run build` dans `./client`
- sinon, pour faire tourner le site en mode dev il faut run `npm start` dans `./client` (ceci va ouvrir la version dev du site react sur `localhost:3000`)


$\to$ Le serveur doit tourner même si vous lancer le site react en mode dev.
## Organisation
- Front end react dans le dossier `./client`
  - `./client/build` contient la version compilé du site react qui est retourné par le serveur si vous visitez `localhost`
  - `./client/public` contient les fichiers utilisé comme base pour les fichiers compilé (donc on trouve le favicon, la base du fichier index.html,...)
- Back end express dans le dossier principale
  - `./api` contient les routes utilisé par l'api, et est divisé en deux dossiers `GET` et `POST` qui contiennent les fichiers correspondant à chaque type de requêtes.
  - `./api/api_router.js` est le router de l'api (toute les routes de ce router sont préfixé par `/api/`), c'est donc la dedans que vous allez ajouter les fonctions qui gère les requêtes pour un certain endpoint (`./api/GET/hello_world.js` est un exemple d'une fonction qui gère les requêtes pour `/api/`).
