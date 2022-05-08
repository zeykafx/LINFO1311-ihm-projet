import { pool } from "../database/queries.js";


export function isLoggedIn(req, res, next) {
    if (req.session.username) {
        pool.query('SELECT * FROM public.users WHERE username=$1', [req.session.username], (error, results) => {
            if (error) {
                res.sendStatus(401)
                return;
            }

            const usersFound = results.rows;

            if (usersFound.length===0){
                res.sendStatus(401)
                return;
            }

            const userToVerify = usersFound[0];
            userToVerify.password = ""; // removing the hash to not leak info

            res.send({
                username: userToVerify.username,
                type: userToVerify.type,
            });

        });

    } else {
        res.sendStatus(401);
    }
}


export function logOut(req, res, next) {
    req.session = null; // destroying the session
    res.sendStatus(200);
}
