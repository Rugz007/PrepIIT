var express = require("express");
var router = express.Router();
const userAuth = require("../userAuth/userAuth");

var db = require("../db/index");

router.use(userAuth);

router
  .get("/test", (req, res, next) => {
    res.status(200).json({ success: true, message: "You are verified" });
  })
  .post("/test", (req, res, next) => {
    const mcq = 20;
    const numerical = 10;
    res.end();
  });

module.exports = router;
