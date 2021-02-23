var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM testtype").then((resp) => {
    console.log(resp.rows);
    res.json(resp.rows);
  });
});

module.exports = router;
