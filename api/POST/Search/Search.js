import { pool } from "../../database/queries.js";


export const Search = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("q")
        ){

        const term = "%" + req.body.q + "%";

        // Movies
        pool.query('SELECT * FROM public.movies WHERE name LIKE $1', [term], (errorMovie, resultsMovies) => {
            if (errorMovie) {
                res.send({ 
                    status: false,
                    message: "DATABASE_PROBLEM"
                });
                return;
            }
        
            // Tv Shows
            pool.query('SELECT * FROM public.tvshows WHERE name LIKE $1', [term], (errorTvShows, resultsTvShows) => {
                if (errorTvShows) {
                    res.send({ 
                        status: false,
                        message: "DATABASE_PROBLEM"
                    });
                    return;
                }
    
                res.send({ 
                    status: true,
                    message: [
                        ...resultsMovies.rows.map((result) => {
                            return {...result, type:"movie"}
                        }),
                        ...resultsTvShows.rows.map((result) => {
                            return {...result, type:"tvShow"}
                        })
                    ]
                });
            });

        });

    }
};
