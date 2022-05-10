import { pool } from "../../database/queries.js";

export const ModifyImage = (req, res, next) => {
  if (req.session.username && (req.session.isAdmin || req.session.isEditor)) {
    if (
      req &&
      req.body &&
      req.body.hasOwnProperty("old_name") &&
      req.body.hasOwnProperty("name") &&
      req.body.hasOwnProperty("description")
    ) {
      pool.query(
        "SELECT * FROM public.imagegallery WHERE name=$1",
        [req.body.old_name],
        (error, results) => {
          if (error) {
            res.send({
              status: false,
              message: "QUERY_ERROR",
            });
            return;
          }

          const imagesFound = results.rows;

          if (imagesFound.length === 0) {
            res.send({
              status: false,
              message: "BAD_NAME",
            });
            return;
          }

          pool.query(
            'UPDATE public.imagegallery SET name=$1, description=$2',
            [
              req.body.name,
              req.body.description,
            ],
            (error, results) => {
              if (error) {
                res.send({
                  status: false,
                  message: "DATABASE_PROBLEM",
                });
                return;
              }

              res.send({
                status: true,
                message: "IMAGE_MODIFICATION_SUCCESSFUL",
              });
              return;
            }
          );
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
