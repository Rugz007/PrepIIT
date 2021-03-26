var express = require("express");
var router = express.Router();

const userAuth = require("../userAuth/userAuth");

const db = require("../db");

router.use(userAuth);

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM livetest").then((resp) => {
    res.json(resp.rows);
  });
});

module.exports = router;
