import { pool } from "../../../database/queries.js";

export const DeleteTVShow = (req, res, next) => {

    if(req && req.body && req.body.id){

        pool.query('DELETE FROM public.tvshows WHERE id=$1', [req.body.id], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            res.send({ 
                status: true,
                message: "TVSHOW_DELETED"
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
