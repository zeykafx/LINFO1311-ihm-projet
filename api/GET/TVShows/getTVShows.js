import { pool } from "../../../database/queries.js";


export const getTVShows = (req, res, next) => {
    pool.query('SELECT * FROM public.tvshows', (error, results) => {

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
