import { pool } from "../../database/queries.js";

export const ModifyTVShow = (req, res, next) => {
  if (req.session.username && (req.session.isAdmin || req.session.isEditor)) {
    if (
      req &&
      req.body &&
      req.body.hasOwnProperty("id") &&
      req.body.hasOwnProperty("name") &&
      req.body.hasOwnProperty("director") &&
      req.body.hasOwnProperty("coActors") &&
      req.body.hasOwnProperty("releaseDate") &&
      req.body.hasOwnProperty("languages") &&
      req.body.hasOwnProperty("description") &&
      req.body.hasOwnProperty("tvChannels") &&
      req.body.hasOwnProperty("streamingServices") &&
      req.body.hasOwnProperty("actorRole")
    ) {
      pool.query(
        "SELECT * FROM public.tvshows WHERE id=$1",
        [req.body.id],
        (error, results) => {
          if (error) {
            res.send({
              status: false,
              message: "QUERY_ERROR",
            });
            return;
          }

          const moviesFound = results.rows;

          if (moviesFound.length === 0) {
            res.send({
              status: false,
              message: "BAD_ID",
            });
            return;
          }

          pool.query(
            'UPDATE public.tvshows SET name=$1, director=$2, "coActors"=$3, "releaseDate"=$4, languages=$5, description=$6, "tv_channels"=$7, "streaming_services"=$8, "actorRole"=$9 WHERE id=$10',
            [
              req.body.name,
              req.body.director,
              req.body.coActors,
              req.body.releaseDate,
              req.body.languages,
              req.body.description,
              req.body.tvChannels,
              req.body.streamingServices,
              req.body.actorRole,
              req.body.id,
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
                message: "TVSHOW_MODIFICATION_SUCCESSFUL",
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
