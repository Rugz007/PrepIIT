var express = require("express");
var upload = require("../multer/index");
const uploadQuestions = require("../uploadQuestions/index");
var uploadLiveTest = require("../uploadLiveTest/index");
const randomstring = require("randomstring");

var router = express.Router();

const db = require("../db");

const adminAuth = require("../adminAuth/adminAuth");
const moment = require("moment");
router.use(adminAuth);
router
  .get("/enquiry", (req, res, next) => {
    db.query(`SELECT * FROM enquiry`).then((resp) => {
      res.json(resp.rows);
    });
  })
  .delete("/enquiry", (req, res, next) => {
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
      "UPDATE questions SET statement=$1, img_path=$2, type=$3, subject=$4, topic=$5, subtopic=$6, level=$7, archive=$8, is_reported=$9, latex=$10, options=$11, answers=$12 WHERE qid=$13",
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
        options,
        answers,
        qid,
      ]
    )
      .then((resp) => {
        console.log("Question Updated");
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false });
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
  .get("/statictest", (req, res, next) => {
    db.query("SELECT * FROM testtype")
      .then((resp) => {
        for (var i = 0; i < resp.rows.length; i++) {
          resp.rows[i].questions = [];
          if (resp.rows[i].mcqdata) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].mcqdata[1].toString(),
              wrong: resp.rows[i].mcqdata[2].toString(),
              nullanswer: resp.rows[i].mcqdata[3].toString(),
              number: resp.rows[i].mcqdata[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].assertiondata) {
            const obj = {
              type: "anr",
              correct: resp.rows[i].assertiondata[1].toString(),
              wrong: resp.rows[i].assertiondata[2].toString(),
              nullanswer: resp.rows[i].assertiondata[3].toString(),
              number: resp.rows[i].assertiondata[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].fibdata) {
            const obj = {
              type: "fib",
              correct: resp.rows[i].fibdata[1].toString(),
              wrong: resp.rows[i].fibdata[2].toString(),
              nullanswer: resp.rows[i].fibdata[3].toString(),
              number: resp.rows[i].fibdata[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].truefalse) {
            const obj = {
              type: "tof",
              correct: resp.rows[i].truefalse[1].toString(),
              wrong: resp.rows[i].truefalse[2].toString(),
              nullanswer: resp.rows[i].truefalse[3].toString(),
              number: resp.rows[i].truefalse[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].numerical) {
            const obj = {
              type: "num",
              correct: resp.rows[i].numerical[1].toString(),
              wrong: resp.rows[i].numerical[2].toString(),
              nullanswer: resp.rows[i].numerical[3].toString(),
              number: resp.rows[i].numerical[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].matchcolumn) {
            const obj = {
              type: "mtf",
              correct: resp.rows[i].matchcolumn[1].toString(),
              wrong: resp.rows[i].matchcolumn[2].toString(),
              nullanswer: resp.rows[i].matchcolumn[3].toString(),
              number: resp.rows[i].matchcolumn[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].mac) {
            const obj = {
              type: "mac",
              correct: resp.rows[i].mac[1].toString(),
              wrong: resp.rows[i].mac[2].toString(),
              nullanswer: resp.rows[i].mac[3].toString(),
              number: resp.rows[i].mac[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          delete resp.rows[i].mcqdata;
          delete resp.rows[i].assertiondata;
          delete resp.rows[i].fibdata;
          delete resp.rows[i].truefalse;
          delete resp.rows[i].numerical;
          delete resp.rows[i].matchcolumn;
          delete resp.rows[i].mac;
        }
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log("DB Error");
        res.json({ success: false });
      });
  })
  .post("/statictest", (req, res, next) => {
    var body = req.body.values;
    const testname = body.testname;
    const subjectsallowed = body.subjectsallowed;
    const time = moment.duration(req.body.time).asMinutes();
    console.log(time);
    var mcq = [],
      fib = [],
      anr = [],
      tof = [],
      nq = [],
      mtf = [],
      mac = [];
    var maxMarks = 0,
      totalMaxMarks = 0;
    if (body.questions != null) {
      body.questions.map((question) => {
        if (question) {
          if (question.type == "mcq") {
            maxMarks += question.number * question.correct;
            mcq.push(question.number);
            mcq.push(question.correct);
            mcq.push(question.wrong);
            mcq.push(question.nullanswer);
          } else if (question.type == "fib") {
            maxMarks += question.number * question.correct;
            fib.push(question.number);
            fib.push(question.correct);
            fib.push(question.wrong);
            fib.push(question.nullanswer);
          } else if (question.type == "anr") {
            maxMarks += question.number * question.correct;
            anr.push(question.number);
            anr.push(question.correct);
            anr.push(question.wrong);
            anr.push(question.nullanswer);
          } else if (question.type == "tof") {
            maxMarks += question.number * question.correct;
            tof.push(question.number);
            tof.push(question.correct);
            tof.push(question.wrong);
            tof.push(question.nullanswer);
          } else if (question.type == "num") {
            maxMarks += question.number * question.correct;
            nq.push(question.number);
            nq.push(question.correct);
            nq.push(question.wrong);
            nq.push(question.nullanswer);
          } else if (question.type == "mtf") {
            maxMarks += question.number * question.correct;
            mtf.push(question.number);
            mtf.push(question.correct);
            mtf.push(question.wrong);
            mtf.push(question.nullanswer);
          } else if (question.type == "mac") {
            maxMarks += question.number * question.correct;
            mac.push(question.number);
            mac.push(question.correct);
            mac.push(question.wrong);
            mac.push(question.nullanswer);
          }
        }
      });
    }
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
    if (mac.length == 0) {
      mac = null;
    }
    totalMaxMarks = maxMarks * subjectsallowed.length;
    db.query(
      "INSERT INTO testtype VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        testname,
        subjectsallowed,
        mcq,
        anr,
        fib,
        tof,
        nq,
        mtf,
        mac,
        maxMarks,
        totalMaxMarks,
        time,
      ]
    )
      .then((resp) => {
        console.log("Inserted Successfully");
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        console.log("DB Error");
        res.status(500).json({ success: false });
      });
  })
  .patch("/statictest", (req, res, next) => {
    var body = req.body.values;
    const testid = body.testid;
    const testname = body.testname;
    const subjectsallowed = body.subjectsallowed;
    const time = moment.duration(req.body.time).asMinutes();
    var mcq = [],
      fib = [],
      anr = [],
      tof = [],
      nq = [],
      mtf = [],
      mac = [];
    var maxMarks = 0,
      totalMaxMarks = 0;
    if (body.questions != null) {
      body.questions.map((question) => {
        if (question) {
          if (question.type == "mcq") {
            maxMarks += question.number * question.correct;
            mcq.push(question.number);
            mcq.push(question.correct);
            mcq.push(question.wrong);
            mcq.push(question.nullanswer);
          } else if (question.type == "fib") {
            maxMarks += question.number * question.correct;
            fib.push(question.number);
            fib.push(question.correct);
            fib.push(question.wrong);
            fib.push(question.nullanswer);
          } else if (question.type == "anr") {
            maxMarks += question.number * question.correct;
            anr.push(question.number);
            anr.push(question.correct);
            anr.push(question.wrong);
            anr.push(question.nullanswer);
          } else if (question.type == "tof") {
            maxMarks += question.number * question.correct;
            tof.push(question.number);
            tof.push(question.correct);
            tof.push(question.wrong);
            tof.push(question.nullanswer);
          } else if (question.type == "num") {
            maxMarks += question.number * question.correct;
            nq.push(question.number);
            nq.push(question.correct);
            nq.push(question.wrong);
            nq.push(question.nullanswer);
          } else if (question.type == "mtf") {
            maxMarks += question.number * question.correct;
            mtf.push(question.number);
            mtf.push(question.correct);
            mtf.push(question.wrong);
            mtf.push(question.nullanswer);
          } else if (question.type == "mac") {
            maxMarks += question.number * question.correct;
            mac.push(question.number);
            mac.push(question.correct);
            mac.push(question.wrong);
            mac.push(question.nullanswer);
          }
        }
      });
    }
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
    if (mac.length == 0) {
      mac = null;
    }
    totalMaxMarks = maxMarks * subjectsallowed.length;
    db.query(
      "UPDATE testtype SET testname=$1, subjectsallowed=$2, mcqdata=$3, assertiondata=$4, fibdata=$5, truefalse=$6, numerical=$7, matchcolumn=$8, mac=$9, maxmarks=$10, totalmaxmarks=$11, time=$12 WHERE testid=$13",
      [
        testname,
        subjectsallowed,
        mcq,
        anr,
        fib,
        tof,
        nq,
        mtf,
        mac,
        maxMarks,
        totalMaxMarks,
        time,
        testid,
      ]
    )
      .then((resp) => {
        console.log("Updated Successfully");
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        console.log("DB Error");
        res.status(500).json({ success: false });
      });
  })
  .delete("/statictest", (req, res, next) => {
    const testid = req.body.testid;
    console.log(testid);
    db.query("DELETE FROM testtype WHERE testid=$1", [testid])
      .then((resp) => {
        res.json({ success: "true" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: "false" });
      });
  })
  .get("/livetest", (req, res, next) => {
    db.query("SELECT * FROM livetest")
      .then((resp) => {
        for (var i = 0; i < resp.rows.length; i++) {
          resp.rows[i].questions = [];
          if (resp.rows[i].mcqdata) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].mcqdata[1].toString(),
              wrong: resp.rows[i].mcqdata[2].toString(),
              nullanswer: resp.rows[i].mcqdata[3].toString(),
              number: resp.rows[i].mcqdata[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].assertiondata) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].assertiondata[1].toString(),
              wrong: resp.rows[i].assertiondata[2].toString(),
              nullanswer: resp.rows[i].assertiondata[3].toString(),
              number: resp.rows[i].assertiondata[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].fibdata) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].fibdata[1].toString(),
              wrong: resp.rows[i].fibdata[2].toString(),
              nullanswer: resp.rows[i].fibdata[3].toString(),
              number: resp.rows[i].fibdata[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].truefalse) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].truefalse[1].toString(),
              wrong: resp.rows[i].truefalse[2].toString(),
              nullanswer: resp.rows[i].truefalse[3].toString(),
              number: resp.rows[i].truefalse[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].numerical) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].numerical[1].toString(),
              wrong: resp.rows[i].numerical[2].toString(),
              nullanswer: resp.rows[i].numerical[3].toString(),
              number: resp.rows[i].numerical[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].matchcolumn) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].matchcolumn[1].toString(),
              wrong: resp.rows[i].matchcolumn[2].toString(),
              nullanswer: resp.rows[i].matchcolumn[3].toString(),
              number: resp.rows[i].matchcolumn[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          if (resp.rows[i].mac) {
            const obj = {
              type: "mcq",
              correct: resp.rows[i].mac[1].toString(),
              wrong: resp.rows[i].mac[2].toString(),
              nullanswer: resp.rows[i].mac[3].toString(),
              number: resp.rows[i].mac[0].toString(),
            };
            resp.rows[i].questions.push(obj);
          }
          delete resp.rows[i].mcqdata;
          delete resp.rows[i].assertiondata;
          delete resp.rows[i].fibdata;
          delete resp.rows[i].truefalse;
          delete resp.rows[i].numerical;
          delete resp.rows[i].matchcolumn;
          delete resp.rows[i].mac;
        }
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "DB Error" });
      });
  })
  .post("/livetest", (req, res, next) => {
    var startDate = new Date(req.body.date);
    const liveid = randomstring.generate({ length: 20 });
    const startMonth = parseInt(startDate.getUTCMonth() + 1);
    const startDay = parseInt(startDate.getUTCDate());
    const startYear = parseInt(startDate.getUTCFullYear());
    const startTime = req.body.time[0].split(":");
    const startHour = parseInt(startTime[0]);
    const startMinute = parseInt(startTime[1]);
    const endMonth = startMonth;
    const endDay = startDay;
    const endYear = startYear;
    const endTime = req.body.time[1].split(":");
    const endHour = parseInt(endTime[0]);
    const endMinute = parseInt(endTime[1]);
    const livename = req.body.values.livename;
    const subjectsallowed = req.body.values.subjectsallowed;
    var mcq = [],
      fib = [],
      anr = [],
      tof = [],
      nq = [],
      mtf = [],
      mac = [];
    if (req.body.values.questions != null) {
      req.body.values.questions.map((question) => {
        if (question) {
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
          } else if (question.type == "mac") {
            mac.push(question.number);
            mac.push(question.correct);
            mac.push(question.wrong);
            mac.push(question.nullanswer);
          }
        }
      });
    }
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
    if (mac.length == 0) {
      mac = null;
    }
    db.query(
      "INSERT INTO livetest VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)",
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
        mcq,
        fib,
        anr,
        tof,
        nq,
        mtf,
        subjectsallowed,
        mac,
        false,
      ]
    )
      .then((resp) => {
        // uploadLiveTest(req.file.originalname, res, liveid);
        res.json({ testid: liveid });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false });
      });
  })
  .patch("/livetest", (req, res, next) => {
    var startDate = new Date(req.body.date);
    const liveid = req.body.values.liveid;
    const startMonth = parseInt(startDate.getUTCMonth() + 1);
    const startDay = parseInt(startDate.getUTCDate());
    const startYear = parseInt(startDate.getUTCFullYear());
    const startTime = req.body.time[0].split(":");
    const startHour = parseInt(startTime[0]);
    const startMinute = parseInt(startTime[1]);
    const endMonth = startMonth;
    const endDay = startDay;
    const endYear = startYear;
    const endTime = req.body.time[1].split(":");
    const endHour = parseInt(endTime[0]);
    const endMinute = parseInt(endTime[1]);
    const livename = req.body.values.testname;
    const subjectsallowed = req.body.values.subjectsallowed;
    var mcq = [],
      fib = [],
      anr = [],
      tof = [],
      nq = [],
      mtf = [],
      mac = [];
    if (req.body.values.questions != null) {
      req.body.values.questions.map((question) => {
        if (question) {
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
          } else if (question.type == "mac") {
            mac.push(question.number);
            mac.push(question.correct);
            mac.push(question.wrong);
            mac.push(question.nullanswer);
          }
        }
      });
    }
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
    if (mac.length == 0) {
      mac = null;
    }
    db.query(
      "UPDATE livetest SET livename=$1, startday=$2, startmonth=$3, startyear=$4, starthour=$5, startminute=$6, endday=$7, endmonth=$8, endyear=$9, endhour=$10, endminute=$11, mcqdata=$12, fibdata=$13, assertiondata=$14, truefalse=$15, numerical=$16, matchcolumn=$17, subjectsallowed=$18, mac=$19 WHERE liveid=$20",
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
        mcq,
        fib,
        anr,
        tof,
        nq,
        mtf,
        subjectsallowed,
        mac,
      ]
    )
      .then((resp) => {
        // uploadLiveTest(req.file.originalname, res, liveid);
        res.json({ testid: liveid });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false });
      });
  })
  .delete("/livetest", (req, res, next) => {
    const testid = req.body.liveid;
    db.query("DELETE FROM livetest WHERE liveid=$1", [testid])
      .then((resp) => {
        res.json({ success: "true" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: "false" });
      });
  })
  .get("/getlivequestions/:testid", (req, res, next) => {
    const testid = req.params.testid;
    db.query("SELECT * FROM livetestquestions where liveid=$1", [testid])
      .then((resp) => {
        res.json(resp.rows);
      })
      .catch((err) => {
        res.status(500).json({ err: "Some Error Occured" });
      });
  })
  .post(
    "/uploadlivequestions/:testid",
    upload.single("QuestionBank"),
    (req, res, next) => {
      const testid = req.params.testid;
      console.log(testid);
      uploadLiveTest(req.file.originalname, res, testid);
    }
  )
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
    const imagepath = req.body.imagepath;
    var date = new Date();
    date = date.toDateString();
    db.query("INSERT INTO blogs VALUES($1,$2,$3,$4,$5,$6,$7)", [
      postid,
      title,
      content,
      author,
      userid,
      date,
      imagepath,
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
  })
  .delete("/blog/:postid", (req, res, next) => {
    const postid = req.params.postid;
    db.query("DELETE FROM blogs WHERE postid=$1", [postid])
      .then((resp) => {
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false });
      });
  })
  .get("/template", (req, res, next) => {
    db.query("SELECT * FROM template")
      .then((resp) => {
        res.status(200).json({ template: resp.rows[0] });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "DB Error" });
      });
  })
  .post("/template", (req, res, next) => {
    const template = req.body.template;
    db.query("UPDATE template SET content=$1", [template])
      .then((resp) => {
        res.status(200).json({ success: "true" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: "false" });
      });
  })
  .post("/studentsperformancestatic", (req, res, next) => {
    const testid = req.body.testid;
    db.query(
      "SELECT usertest.*,users.userid,users.name FROM usertest INNER JOIN users ON users.userid=usertest.userid WHERE testid=$1",
      [testid]
    )
      .then((resp) => {
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "Some Error Occured" });
      });
  })
  .post("/studentsperformacelive", (req, res, next) => {
    const testid = req.body.liveid;
    db.query(
      "SELECT liveusertest.*,users.userid,users.name FROM liveusertest INNER JOIN users ON users.userid=liveusertest.userid WHERE liveid=$1",
      [testid]
    )
      .then((resp) => {
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "Some Error Occured" });
      });
  });

module.exports = router;
