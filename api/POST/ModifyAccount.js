import { pool } from "../../database/queries.js";
import bcrypt from "bcrypt";

import { saltRounds } from '../Constants/Constants.js';

export const ModifyAccount = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("original_username") &&
        req.body.hasOwnProperty("username") && 
        req.body.hasOwnProperty("shouldEditPassword") && 
        req.body.hasOwnProperty("password") &&
        req.body.hasOwnProperty("passwordVerif") &&
        req.body.hasOwnProperty("accountType")
        ){

        if (req.body.shouldEditPassword && (req.body.password !== req.body.passwordVerif)){
            res.send({ 
                status: false,
                message: "NOT_EQUAL_PASSWORD"
            });
            return;   
        }

        pool.query('SELECT * FROM public.users WHERE username=$1', [req.body.original_username], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            const usersFound = results.rows;

            if (usersFound.length===0){
                res.send({ 
                    status: false,
                    message: "BAD_USERNAME"
                });
                return;
            }

            const userModified = usersFound[0];


            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

                if (err){
                    res.send({ 
                        status: false,
                        message: "HASH_PROBLEM"
                    });
                    return;
                }

                pool.query('UPDATE public.users SET username=$1, password=$2, type=$3 WHERE username=$4', 
                [
                    req.body.username,
                    req.body.shouldEditPassword ? hash : userModified.password, 
                    req.body.accountType,
                    req.body.original_username
                ],
                (error, results) => {

                    if (error){
                        console.log(error);
                        res.send({ 
                            status: false,
                            message: "DATABASE_PROBLEM"
                        });
                        return;    
                    }

                    res.send({ 
                        status: true,
                        message: "ACCOUNT_MODIFICATION_SUCCESSFUL"
                    });
                    return;

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
