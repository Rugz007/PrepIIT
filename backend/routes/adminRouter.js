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
  })
  .get("/question", (req, res, next) => {
    db.query("SELECT * FROM questions")
      .then((resp) => res.status(200).json(resp.rows))
      .catch((err) => {
        console.log("DB Error");
        res.status(500).json({ success: false });
      });
  })
  .post("/question", (req, res, next) => {
    console.log(req.body);
    const {
      statement,
      latex,
      img_path,
      type,
      subject,
      topic,
      subtopic,
      level,
      archive,
      is_reported,
    } = req.body;
    db.query(
      "INSERT INTO questions VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        statement,
        latex,
        img_path,
        type,
        subject,
        topic,
        subtopic,
        level,
        archive,
        is_reported,
      ]
    )
      .then((resp) => {
        console.log("Inserted Successfully");
        res.status(201).json({ success: true });
      })
      .catch((err) => {
        console.log("DB Error");
        res.status(500).json({ success: false });
      });
  })
  .delete("/question", (req, res, next) => {
    const qid = req.body.qid;
    if (qid) {
      db.query("DELETE FROM questions WHERE qid=$1", [qid])
        .then((resp) => {
          console.log("Deleted Successfully");
          res.status(201).json({ success: true });
        })
        .catch((err) => {
          console.log("DB Error");
          res.status(500).json({ success: false });
        });
    } else {
      res.json({
        success: false,
        errmess: "No Question ID Found",
      });
    }
  });

module.exports = router;
