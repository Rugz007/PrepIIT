var express = require("express");
var router = express.Router();

const db = require("../db");

const adminAuth = require("../adminAuth/adminAuth");

router.use(adminAuth);
router.get("/enquiry", (req, res, next) => {
  db.query(`SELECT * FROM enquiry`).then((resp) => {
    res.json(resp.rows);
  });
});

module.exports = router;
