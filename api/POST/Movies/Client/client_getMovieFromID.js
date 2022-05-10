import { pool } from "../../../database/queries.js";


export const client_getMovieFromID = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("id")
        ){

        pool.query('SELECT * FROM public.movies WHERE id = $1', [req.body.id], (error, results) => {
            if (error) {
                console.log(error);
                res.send({ 
                    status: false,
                    message: "DATABASE_PROBLEM"
                });
                return;
            }
        
            res.send({ 
                status: true,
                message: results.rows[0]
            });
        });

    }
};
