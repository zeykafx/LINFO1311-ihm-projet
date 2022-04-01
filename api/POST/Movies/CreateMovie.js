import { pool } from "../../../database/queries.js";

export const CreateMovie = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.name && 
        req.body.director &&
        req.body.coActors &&
        req.body.releaseDate &&
        req.body.languages &&
        req.body.description &&
        req.body.ticketLinks &&
        req.body.actorRole
        ){

        pool.query('INSERT INTO public.movies(name, director, "coActors", "releaseDate", languages, description, "ticketLinks", "actorRole") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
        [
            req.body.name,
            req.body.director,
            req.body.coActors,
            req.body.releaseDate,
            req.body.languages,
            req.body.description,
            req.body.ticketLinks,
            req.body.actorRole
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
