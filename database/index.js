const { Pool } = require('pg');
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/birdshunterschile';

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({ connectionString });

  