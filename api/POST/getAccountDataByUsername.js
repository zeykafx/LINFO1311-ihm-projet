import { pool } from "../../database/queries.js";


export const getAccountDataByUsername = (req, res, next) => {
    if(req && req.body && req.body.username){

        pool.query('SELECT * FROM public.users WHERE username=$1', [req.body.username], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            const usersFound = results.rows;

            if (usersFound.length==0){
                res.send({ 
                    status: false,
                    message: "BAD_USERNAME"
                });
                return;
            }

            const userToVerify = usersFound[0];
            userToVerify.password = "";

            res.send({ 
                status: true,
                message: userToVerify
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