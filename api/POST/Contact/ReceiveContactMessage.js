import { pool } from "../../database/queries.js";
import nodemailer from 'nodemailer';

export const ReceiveContactMessage = (req, res, next) => {

    if( req &&
        req.body &&
        req.body.hasOwnProperty("name") &&
        req.body.hasOwnProperty("mail") &&
        req.body.hasOwnProperty("message")
        ){
            
            pool.query('SELECT * FROM public.email LIMIT 1', [], (errorFetch, credentialsContainer) => {
                if (errorFetch || credentialsContainer.rows.length===0) {
                    res.send({ 
                        status: false,
                        message: "DATABASE_PROBLEM"
                    });
                    return;
                }

                const credentials = credentialsContainer.rows[0];
                const REP_mail = credentials.username;
                const REP_password = credentials.password;

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: REP_mail,
                        pass: REP_password
                    }
                });
                
                var mailOptions = {
                from: req.body.mail,
                to: REP_mail,
                subject: 'New message on your website',
                text: `
                    Name of the sender: ${req.body.name}\n
                    Email of the sender: ${req.body.mail}\n
                    Message of the sender: \n
                    ${req.body.message}
                `
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        res.send({ 
                            status: false,
                            message: "SERVER_PROBLEM"
                        });
                        return;
                    } else {
                        res.send({ 
                            status: true,
                            message: "MESSAGE_SENT"
                        });
                        return;
                    }
                });


            });

    }
};
