var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userAuth = require("../userAuth/userAuth");

const db = require("../db");

router.use(userAuth);
router.post("/", (req, res, next) => {
  res.send(jwt.verify(req.body.token, process.env.SECRET_KEY));
});

module.exports = router;
