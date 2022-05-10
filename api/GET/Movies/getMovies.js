import { pool } from "../../database/queries.js";


export const getMovies = (req, res, next) => {
    pool.query('SELECT * FROM public.movies', (error, results) => {

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

    let reversed = results.rows.reverse();

    res.send({ 
        status: true,
        message: reversed
    });
  });
};
