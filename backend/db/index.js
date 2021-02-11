const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: 'prepiit',
  password: 'postgres',
  port: process.env.DBPORT,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
