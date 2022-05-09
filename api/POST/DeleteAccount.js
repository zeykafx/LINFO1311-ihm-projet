import { pool } from "../database/queries.js";

export const DeleteAccount = (req, res, next) => {
    if (req.session.username && req.session.isAdmin) {

    if(req && req.body && req.body.username){

        pool.query('DELETE FROM public.users WHERE username=$1', [req.body.username], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            res.send({ 
                status: true,
                message: "ACCOUNT_DELETED"
            });

        });

    } else {
        res.send({ 
            status: false,
            message: "BAD_REQUEST"
        });
        return;
    }
    } else {
        res.send({
            status: false,
            message: "You can't do that, you are not admin."
        })
    }
};
