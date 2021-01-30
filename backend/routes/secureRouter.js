var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  var token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, resp) => {
      if (err) {
        res.status(403).json({ error: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    res.status(404).json({ error: "No Token Found" });
  }
});

router.get("/test", (req, res, next) => {
  res.status(200).json({ success: true, message: "You are verified" });
});

module.exports = router;
