var express = require("express");
var router = express.Router();
const db = require("../db/index");

router
  .get("/allblogs", (req, res, next) => {
    db.query("SELECT * FROM blogs")
      .then((resp) => {
        console.log(resp.rows);
        res.status(200).json(resp.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errmess: "DB Error" });
      });
  })
  .get("/blog", (req, res, next) => {
    const postid = req.headers.postid;
    db.query("SELECT * FROM blogs WHERE postid=$1", [postid])
      .then((resp) => {
        console.log(resp.rows);
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errmess: "DB Error" });
      });
  });

module.exports = router;
