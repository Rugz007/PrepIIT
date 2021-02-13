var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userAuth = require("../userAuth/userAuth");

const db = require("../db");

router.use(userAuth);
router.get("/", (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  res.send(jwt.verify(token, process.env.SECRET_KEY));
});

module.exports = router;
