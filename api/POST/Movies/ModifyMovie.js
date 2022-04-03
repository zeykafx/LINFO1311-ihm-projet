import { pool } from "../../../database/queries.js";

export const ModifyMovie = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("id") &&
        req.body.hasOwnProperty("name") &&
        req.body.hasOwnProperty("director") && 
        req.body.hasOwnProperty("coActors") && 
        req.body.hasOwnProperty("releaseDate") &&
        req.body.hasOwnProperty("languages") &&
        req.body.hasOwnProperty("description") &&
        req.body.hasOwnProperty("ticketLinks") &&
        req.body.hasOwnProperty("actorRole")
        ){

        pool.query('SELECT * FROM public.movies WHERE id=$1', [req.body.id], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            const moviesFound = results.rows;

            if (moviesFound.length===0){
                res.send({ 
                    status: false,
                    message: "BAD_ID"
                });
                return;
            }

            pool.query('UPDATE public.movies SET name=$1, director=$2, "coActors"=$3, "releaseDate"=$4, languages=$5, description=$6, "ticketLinks"=$7, "actorRole"=$8 WHERE id=$9', 
            [
                req.body.name,
                req.body.director,
                req.body.coActors,
                req.body.releaseDate,
                req.body.languages,
                req.body.description,
                req.body.ticketLinks,
                req.body.actorRole,
                req.body.id
            ],
            (error, results) => {

                if (error){
                    res.send({ 
                        status: false,
                        message: "DATABASE_PROBLEM"
                    });
                    return;    
                }

                res.send({ 
                    status: true,
                    message: "MOVIE_MODIFICATION_SUCCESSFUL"
                });
                return;

            });
        });

    } else {
        res.send({ 
            status: false,
            message: "BAD_REQUEST"
        });
        return;
    }

};
