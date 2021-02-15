var express = require("express");
var router = express.Router();
const userAuth = require("../userAuth/userAuth");

router.use(userAuth);

router.get("/test", (req, res, next) => {
  res.status(200).json({ success: true, message: "You are verified" });
});

module.exports = router;
