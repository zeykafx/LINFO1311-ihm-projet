import { pool } from "../../../database/queries.js";


export const client_getTVShows = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("maxNumberOfTVShows")
        ){

        // hard limit of 100 movies
        const maxNumberOfTVShows = (req.body.maxNumberOfTVShows<=0) ? 100 : parseInt(req.body.maxNumberOfTVShows);

        pool.query('SELECT * FROM public.tvshows LIMIT $1', [maxNumberOfTVShows], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "DATABASE_PROBLEM"
                });
                return;
            }
        
            results.rows.sort((a, b) => {
                return a.releaseDate - b.releaseDate;
            })

            res.send({ 
                status: true,
                message: results.rows
            });
        });

    }
};
