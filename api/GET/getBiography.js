import { pool } from "../database/queries.js";

export function getBiography(req, res, next) {
    pool.query('SELECT * FROM public.biography', (error, results) => {
        if (error) {
            res.send({status: false, message: "Database error, try again later or contact the site's administrators."});
            return;
        }

        if (results.rows.length === 0) {
            res.send({status: false, message: "No biography found in the database"});
            return;
        }

        let biographyRes = results.rows[results.rows.length-1];
        res.send({status: true, message: "", biography: biographyRes});
    });
}