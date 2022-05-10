import { pool } from "../../database/queries.js";


export const getMovies = (req, res, next) => {
    pool.query('SELECT * FROM public.movies ORDER BY releaseDate DESC', (error, results) => {

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
};
