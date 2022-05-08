import { pool } from "../database/queries.js";
import bcrypt from "bcrypt";

import { saltRounds } from '../Constants/Constants.js';

export const Login = (req, res, next) => {

    if(req && req.body && req.body.username && req.body.password){

        pool.query('SELECT * FROM public.users WHERE username=$1', [req.body.username], (error, results) => {
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
                    message: "Bad credentials",
                    username: "",
                    type: "",
                });
                return;
            }

            const userToVerify = usersFound[0];


            if (bcrypt.compareSync(req.body.password, userToVerify.password)) {

                // on crée la session avec le nom d'utilisateur
                req.session.username = userToVerify.username;

                res.send({
                    status: true,
                    message: "LOGIN_SUCCESSFUL",
                    username: req.session.username,
                    type: userToVerify.type,
                });
            } else {
                res.send({
                    status: false,
                    message: "Bad credentials",
                    username: "",
                    type: "",
                });
            }

        });

    } else {
        res.send({ 
            status: false,
            message: "BAD_REQUEST"
        });
    }

};
