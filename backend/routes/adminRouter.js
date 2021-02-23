var express = require("express");
var upload = require("../multer/index");
const uploadQuestions = require("../uploadQuestions/index");

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
      "INSERT INTO questions VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        statement,
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
  })
  .post("/excelupload", upload.single("QuestionBank"), (req, res, next) => {
    try {
      uploadQuestions(req.file.originalname).then((resp) =>
        res.status(200).json({ success: resp })
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
      next(err);
    }
  })
  .post("/editquestion", (req, res, next) => {
    console.log(req.body);
    const {
      archive,
      img_path,
      is_reported,
      level,
      qid,
      statement,
      subject,
      subtopic,
      topic,
      type,
    } = req.body;
    db.query(
      "UPDATE questions SET statement=$1, img_path=$2, type=$3, subject=$4, topic=$5, subtopic=$6, level=$7, archive=$8, is_reported=$9 WHERE qid=$10",
      [
        statement,
        img_path,
        type,
        subject,
        topic,
        subtopic,
        level,
        archive,
        is_reported,
        qid,
      ]
    )
      .then((resp) => {
        console.log("Question Updated");
        res.json({ success: true });
      })
      .catch((err) => {
        console.log("DB Error");
        res.json({ success: false });
      });
  })
  .get("/reported", (req, res, next) => {
    db.query(`SELECT * FROM questions WHERE is_reported=TRUE`)
      .then((resp) => {
        console.log(resp.rows);
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log("DB Error");
        res.status(500).json({ success: false });
      });
  })
  .get("/testtype", (req, res, next) => {
    db.query("SELECT * FROM testtype")
      .then((resp) => {
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log("DB Error");
        res.json({ success: false });
      });
  })
  .post("/testtype", (req, res, next) => {
    var body = req.body.values;
    const testname = body.name;
    const subjectsallowed = body.subjects;
    var mcq = [],
      fib = [],
      anr = [],
      tof = [],
      nq = [],
      mtf = [];
    body.questions.map((question) => {
      if (question.type == "MCQ") {
        mcq.push(question.number);
        mcq.push(question.correct);
        mcq.push(question.wrong);
        mcq.push(question.nullanswer);
      } else if (question.type == "FIB") {
        fib.push(question.number);
        fib.push(question.correct);
        fib.push(question.wrong);
        fib.push(question.nullanswer);
      } else if (question.type == "ANR") {
        anr.push(question.number);
        anr.push(question.correct);
        anr.push(question.wrong);
        anr.push(question.nullanswer);
      } else if (question.type == "TOF") {
        tof.push(question.number);
        tof.push(question.correct);
        tof.push(question.wrong);
        tof.push(question.nullanswer);
      } else if (question.type == "NQ") {
        nq.push(question.number);
        nq.push(question.correct);
        nq.push(question.wrong);
        nq.push(question.nullanswer);
      } else if (question.type == "MTF") {
        mtf.push(question.number);
        mtf.push(question.correct);
        mtf.push(question.wrong);
        mtf.push(question.nullanswer);
      }
    });
    if (mcq.length == 0) {
      mcq = null;
    }
    if (fib.length == 0) {
      fib = null;
    }
    if (anr.length == 0) {
      anr = null;
    }
    if (tof.length == 0) {
      tof = null;
    }
    if (nq.length == 0) {
      nq = null;
    }
    if (mtf.length == 0) {
      mtf = null;
    }
    console.log(mcq, fib, anr, tof, nq, mtf);
    db.query("INSERT INTO testtype VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8)", [
      testname,
      subjectsallowed,
      mcq,
      anr,
      fib,
      tof,
      nq,
      mtf,
    ])
      .then((resp) => {
        console.log(resp);
        console.log("Inserted Successfully");
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        console.log("DB Error");
        res.json({ success: false });
      });
  });

module.exports = router;
