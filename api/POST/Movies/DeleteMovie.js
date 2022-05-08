import { pool } from "../../database/queries.js";

export const DeleteMovie = (req, res, next) => {

    if(req && req.body && req.body.id){

        pool.query('DELETE FROM public.movies WHERE id=$1', [req.body.id], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            res.send({ 
                status: true,
                message: "MOVIE_DELETED"
            });

        });

    } else {
        res.send({ 
            status: false,
            message: "BAD_REQUEST"
        });
        return;
    }

};
