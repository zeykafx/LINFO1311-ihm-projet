import { pool } from "../../database/queries.js";


export const getAccounts = (req, res, next) => {
    pool.query('SELECT * FROM public.users WHERE username=$1', [req.body.username], (error, results) => {
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
