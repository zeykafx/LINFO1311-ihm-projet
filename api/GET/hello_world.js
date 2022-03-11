import { pool } from "../../database/queries.js";

export const HelloWorld = (req, res, next) => {
  pool.query("SELECT * FROM public.users", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    res.send({ message: results.rows});
  });
};
