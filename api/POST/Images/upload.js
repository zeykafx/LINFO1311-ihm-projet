import { pool } from "../../database/queries.js"

export const UploadImage = (req, res, next) => {
  console.log(req.file);
  res.send(JSON.stringify({ status: "accepted", error: null }));
};

export const AddImageToGallery = (req, res, next) => {
  if (req.session.username && (req.session.isAdmin || req.session.isEditor)) {
    if (
      req &&
      req.body &&
      req.body.hasOwnProperty("name") &&
      req.body.hasOwnProperty("description") &&
      req.body.hasOwnProperty("filename")
    ) {
      pool.query(
        "INSERT INTO public.imagegallery (name, description, filename) VALUES ($1, $2, $3)",
        [req.body.name, req.body.description, req.body.filename],
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
            message: "IMAGE_CREATION_SUCCESSFUL",
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
    res.send({
      status: false,
      message: "You can't do that.",
    });
  }
};
