import { Pool } from 'pg';

const pool = new Pool({
  user: 'pacesetter_postiews_user',
  host: 'dpg-d2911j9r0fns73eu9qlg-a.oregon-postgres.render.com',  // full host
  database: 'pacesetter_postiews',
  password: 'VFDCWd25m22cLBYgGNatzVvybMEZC1wJ',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});


export default pool;
