import { pool } from "../../../database/queries.js";

export const CreateMovie = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("name") &&
        req.body.hasOwnProperty("director") && 
        req.body.hasOwnProperty("coActors") && 
        req.body.hasOwnProperty("releaseDate") &&
        req.body.hasOwnProperty("languages") &&
        req.body.hasOwnProperty("description") &&
        req.body.hasOwnProperty("ticketLinks") &&
        req.body.hasOwnProperty("actorRole") &&
        req.body.hasOwnProperty("filename")
        ){

        pool.query('INSERT INTO public.movies(name, director, "coActors", "releaseDate", languages, description, "ticketLinks", "actorRole", "filename") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
        [
            req.body.name,
            req.body.director,
            req.body.coActors,
            req.body.releaseDate,
            req.body.languages,
            req.body.description,
            req.body.ticketLinks,
            req.body.actorRole,
            req.body.filename
        ], (error, results) => {

            if (error){
                res.send({ 
                    status: false,
                    message: "DATABASE_PROBLEM"
                });
                return;    
            }

            res.send({ 
                status: true,
                message: "MOVIE_CREATION_SUCCESSFUL"
            });
            return;

        });

    } else {
        res.send({ 
            status: false,
            message: "BAD_REQUEST"
        });
        return;
    }

};
