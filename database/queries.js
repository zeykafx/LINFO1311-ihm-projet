import * as pg from 'pg'
const { Pool } = pg.default  // https://stackoverflow.com/a/55378800/14701142


export const pool = new Pool({
    user: 'postgres',
    host: 'ihm-db.duckdns.org',
    database: 'ihm',
    password: 'fG7v3',
    port: 5432,
  });;
