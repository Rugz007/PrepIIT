const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "8.tcp.ngrok.io",
  database: "prepiit",
  password: "postgres",
  port: 17794,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
