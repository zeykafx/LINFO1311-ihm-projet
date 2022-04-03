import { pool } from "../../../../database/queries.js";


export const client_getMovies = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("maxNumberOfMovies")
        ){

        // hard limit of 100 movies
        const maxNumberOFMovies = (req.body.maxNumberOfMovies<=0) ? 100 : parseInt(req.body.maxNumberOfMovies);

        pool.query('SELECT * FROM public.movies LIMIT $1', [maxNumberOFMovies], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "DATABASE_PROBLEM"
                });
                return;
            }
        
            res.send({ 
                status: true,
                message: results.rows
            });
        });

    }
};
