var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM questions ORDER BY RANDOM() LIMIT 30").then(
    (resp) => {
      console.log(resp.rows);
      res.json(resp.rows);
    }
  );
});

module.exports = router;
