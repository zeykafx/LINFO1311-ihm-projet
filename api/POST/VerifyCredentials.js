import { pool } from "../../database/queries.js";
import bcrypt from "bcrypt";

import { saltRounds } from '../Constants/Constants.js';

export const VerifyCredentials = (req, res, next) => {

    if(req && req.body && req.body.username && req.body.password && req.body.accountType){

        pool.query('SELECT * FROM public.users WHERE username=$1 AND type=$2', [req.body.username, req.body.accountType], (error, results) => {
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
                    message: "BAD_CREDENTIALS"
                });
                return;
            }

            const userToVerify = usersFound[0];

            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                bcrypt.compare(userToVerify.password, hash, function(sameHashes) {
                    if(!sameHashes){
                        res.send({ 
                            status: false,
                            message: "BAD_CREDENTIALS"
                        });
                        return;
                    }
    
                    res.send({ 
                        status: true,
                        message: "VERIFICATION_SUCCESSFUL"
                    });
                });
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
