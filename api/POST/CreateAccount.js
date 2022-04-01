import { pool } from "../../database/queries.js";
import bcrypt from "bcrypt";

import { saltRounds } from '../Constants/Constants.js';

export const CreateAccount = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.username && 
        req.body.password &&
        req.body.passwordVerif &&
        req.body.accountType
        ){

        if (req.body.password !== req.body.passwordVerif){
            res.send({ 
                status: false,
                message: "NOT_EQUAL_PASSWORD"
            });
            return;   
        }

        pool.query('SELECT * FROM public.users WHERE username=$1', [req.body.username], (error, results) => {
            if (error) {
                res.send({ 
                    status: false,
                    message: "QUERY_ERROR"
                });
                return;
            }

            const usersFound = results.rows;

            if (usersFound.length>0){
                res.send({ 
                    status: false,
                    message: "USERNAME_ALREADY_USED"
                });
                return;
            }

            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

                if (err){
                    res.send({ 
                        status: false,
                        message: "HASH_PROBLEM"
                    });
                    return;
                }

                pool.query('INSERT INTO public.users(username, password, type) VALUES ($1, $2, $3)', [req.body.username, hash, req.body.accountType], (error, results) => {

                    if (error){
                        res.send({ 
                            status: false,
                            message: "DATABASE_PROBLEM"
                        });
                        return;    
                    }

                    res.send({ 
                        status: true,
                        message: "ACCOUNT_CREATION_SUCCESSFUL"
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
