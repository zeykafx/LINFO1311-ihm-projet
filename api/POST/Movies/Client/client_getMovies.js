import { pool } from "../../../database/queries.js";


export const client_getMovies = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("maxNumberOfMovies")
        ){

        // hard limit of 100 movies
        const maxNumberOFMovies = (req.body.maxNumberOfMovies<=0) ? 100 : parseInt(req.body.maxNumberOfMovies);

        pool.query('SELECT * FROM public.movies ORDER BY "releaseDate" DESC LIMIT $1', [maxNumberOFMovies], (error, results) => {
            if (error) {
                console.log(error);
                res.send({ 
                    status: false,
                    message: "DATABASE_PROBLEM"
                });
                return;
            }
        
            results.rows.sort((a, b) => {
                return a.releaseDate - b.releaseDate;
            })

            let reversed = results.rows.reverse();


            res.send({ 
                status: true,
                message: reversed
            });
        });

    }
};
