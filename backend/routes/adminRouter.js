var express = require("express");
var router = express.Router();

const db = require("../db");

const adminAuth = require("../adminAuth/adminAuth");

router.use(adminAuth);
router
  .get("/enquiry", (req, res, next) => {
    db.query(`SELECT * FROM enquiry`).then((resp) => {
      console.log(resp.rows);
      res.json(resp.rows);
    });
  })
  .delete("/enquiry", (req, res, next) => {
    console.log(req.body);
    db.query("DELETE FROM enquiry WHERE enqid=$1", [req.body.enqid])
      .then((resp) => {
        console.log("Deleted Successfully");
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log("DB Error");
        res.status(500).json({ success: false });
      });
  });

module.exports = router;
