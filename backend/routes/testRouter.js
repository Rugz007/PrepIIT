var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM users").then((resp) => {
    console.log(resp);
    res.end();
  });
});

module.exports = router;
