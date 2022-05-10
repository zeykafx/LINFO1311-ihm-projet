import { unlinkSync } from "fs";
import { pool } from "../../database/queries.js";

export const DeleteTVShow = (req, res, next) => {
  if (req.session.username && (req.session.isAdmin || req.session.isEditor)) {
    if (req && req.body && req.body.id && req.body.filename) {
      pool.query(
        "DELETE FROM public.tvshows WHERE id=$1",
        [req.body.id],
        (error, results) => {
          if (error) {
            res.send({
              status: false,
              message: "QUERY_ERROR",
            });
            return;
          }

          try {
            unlinkSync(`photos/${req.body.filename}`);
          } catch (err) {
            res.send({
              status: false,
              message: "IMAGE_NOT_DELETED_FROM_DISK",
            });
            return;
          }

          res.send({
            status: true,
            message: "TVSHOW_DELETED",
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
