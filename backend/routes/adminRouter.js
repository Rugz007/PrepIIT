var express = require("express");
var upload = require("../multer/index");
const uploadQuestions = require("../uploadQuestions/index");
var uploadLiveTest = require("../uploadLiveTest/index");
const randomstring = require("randomstring");

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
      latex,
      answers,
      options,
    } = req.body;
    db.query(
      "INSERT INTO questions VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
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
        latex,
        answers,
        options,
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
    uploadQuestions(req.file.originalname, res);
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
      latex,
      options,
      answers,
    } = req.body;
    db.query(
      "UPDATE questions SET statement=$1, img_path=$2, type=$3, subject=$4, topic=$5, subtopic=$6, level=$7, archive=$8, is_reported=$9, latex=$11, options=$12, answers=$13 WHERE qid=$10",
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
        latex,
        options,
        answers,
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
    const testname = body.testname;
    const subjectsallowed = body.subjectsallowed;
    var mcq = [],
      fib = [],
      anr = [],
      tof = [],
      nq = [],
      mtf = [];
    body.questions.map((question) => {
      if (question.type == "mcq") {
        mcq.push(question.number);
        mcq.push(question.correct);
        mcq.push(question.wrong);
        mcq.push(question.nullanswer);
      } else if (question.type == "fib") {
        fib.push(question.number);
        fib.push(question.correct);
        fib.push(question.wrong);
        fib.push(question.nullanswer);
      } else if (question.type == "anr") {
        anr.push(question.number);
        anr.push(question.correct);
        anr.push(question.wrong);
        anr.push(question.nullanswer);
      } else if (question.type == "tof") {
        tof.push(question.number);
        tof.push(question.correct);
        tof.push(question.wrong);
        tof.push(question.nullanswer);
      } else if (question.type == "num") {
        nq.push(question.number);
        nq.push(question.correct);
        nq.push(question.wrong);
        nq.push(question.nullanswer);
      } else if (question.type == "mtf") {
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
        res.status(500).json({ success: false });
      });
  })
  .post("/livetest", upload.single("QuestionBank"), (req, res, next) => {
    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);
    const liveid = req.body.liveid;
    const livename = req.body.livename;
    const startMonth = parseInt(startDate.getUTCMonth() + 1);
    const startDay = parseInt(startDate.getUTCDate());
    const startYear = parseInt(startDate.getUTCFullYear());
    const startTime = req.body.startTime.split(":");
    const startHour = parseInt(startTime[0]);
    const startMinute = parseInt(startTime[1]);
    const endMonth = parseInt(endDate.getUTCMonth() + 1);
    const endDay = parseInt(endDate.getUTCDate());
    const endYear = parseInt(endDate.getUTCFullYear());
    const endTime = req.body.endTime.split(":");
    const endHour = parseInt(endTime[0]);
    const endMinute = parseInt(endTime[1]);
    console.log(
      liveid,
      livename,
      startDay,
      startMonth,
      startYear,
      startHour,
      startMinute,
      endDay,
      endMonth,
      endYear,
      endHour,
      endMinute
    );
    db.query(
      "INSERT INTO livetest VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        liveid,
        livename,
        startDay,
        startMonth,
        startYear,
        startHour,
        startMinute,
        endDay,
        endMonth,
        endYear,
        endHour,
        endMinute,
      ]
    )
      .then((resp) => {
        uploadLiveTest(req.file.originalname, res, liveid);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false });
      });
  })
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
  })
  .post("/blog", (req, res, next) => {
    const postid = randomstring.generate({
      length: 15,
      charset: "alphabetic",
    });
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const userid = req.body.userid;
    var date = new Date();
    date = date.toDateString();
    db.query("INSERT INTO blogs VALUES($1,$2,$3,$4,$5,$6)", [
      postid,
      title,
      content,
      author,
      userid,
      date,
    ])
      .then((resp) => {
        console.log("Inserted Successfully");
        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      });
  });

module.exports = router;
