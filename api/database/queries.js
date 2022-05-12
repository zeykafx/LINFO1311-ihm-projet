import * as pg from 'pg'
const { Pool } = pg.default  // https://stackoverflow.com/a/55378800/14701142
import env from '../../.env.cjs';


let { DB_USER, DB_NAME, DB_IPADDR, DB_PASSWORD, DB_PORT } = env;

export const pool = new Pool({
    user: DB_USER,
    host: DB_IPADDR,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });
