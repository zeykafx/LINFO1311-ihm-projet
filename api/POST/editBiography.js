import { pool } from "../database/queries.js";

export function editBiography(req, res, next) {
  if (req.session.username && (req.session.isAdmin || req.session.isEditor)) {
    // if the user is an admin or an editor


    if (req.body && req.body.hasOwnProperty("new_content")) {
      let now_timestamp = new Date().getTime();

      pool.query(
        "UPDATE public.biography SET content_md=$1, last_edit_timestamp=$2, last_edit_username=$3",
        [req.body.new_content, now_timestamp, req.session.username],
        (error, results) => {
          if (error) {
            console.log(error);
            res.send({
              status: false,
              message: "DATABASE_PROBLEM",
            });
            return;
          }

          res.send({
            status: true,
            message: "BIOGRAPHY_MODIFICATION_SUCCESSFUL",
          });
          return;
        }
      );
    } else {
      res.send({
        status: false,
        message: "BAD_REQUEST",
      });
      return;
    }
  } else {
      res.sendStatus(401);
  }
}
