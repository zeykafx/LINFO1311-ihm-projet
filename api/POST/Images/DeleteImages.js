import { pool } from "../../database/queries.js";

export const DeleteImage = (req, res, next) => {
  if (req.session.username && (req.session.isAdmin || req.session.isEditor)) {
    if (req && req.body && req.body.name) {
      pool.query(
        "DELETE FROM public.imagegallery WHERE name=$1",
        [req.body.name],
        (error, results) => {
            console.log(results);
          if (error) {
            res.send({
              status: false,
              message: "QUERY_ERROR",
            });
            return;
          }

          res.send({
            status: true,
            message: "IMAGE_DELETED",
          });
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
    res.send({
      status: false,
      message: "You can't do that.",
    });
  }
};
