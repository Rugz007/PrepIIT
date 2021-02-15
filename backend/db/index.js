const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "prepiit.czcwwm3rc7hv.ap-south-1.rds.amazonaws.com",
  database: "prepiit",
  password: "postgres",
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
