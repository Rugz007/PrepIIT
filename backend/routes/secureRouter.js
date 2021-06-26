var express = require("express");
const moment = require("moment");
var router = express.Router();

const userAuth = require("../userAuth/userAuth");

const allThree = require("../testGeneration/allThree");
const phyChem = require("../testGeneration/phyChem");
const phyMath = require("../testGeneration/phyMath");
const chemMath = require("../testGeneration/chemMath");
const physics = require("../testGeneration/physics");
const chemistry = require("../testGeneration/chemistry");
const math = require("../testGeneration/math");

const updateLog = require("../updateLog/index");

var db = require("../db/index");

router.use(userAuth);

router
  .get("/test", (req, res, next) => {
    var availableStaticTest = [];
    var availableLiveTest = [];
    const userid = req.headers.userid;
    db.query(
      "SELECT testid,testname,subjectsallowed FROM testtype tt WHERE tt.testid NOT IN (SELECT ut.testid FROM usertest ut WHERE userid=$1 GROUP BY ut.testid)",
      [userid]
    )
      .then((resp) => {
        availableStaticTest.push(resp.rows);
        db.query(
          "SELECT liveid,livename,subjectsallowed FROM livetest lt WHERE lt.liveid NOT IN (SELECT lut.testid FROM liveusertest lut WHERE userid=$1 GROUP BY lut.testid)",
          [userid]
        )
          .then((respons) => {
            availableLiveTest.push(respons.rows);
            res.status(200).json({
              availableStaticTest: availableStaticTest[0],
              availableLiveTest: availableLiveTest[0],
            });
          })
          .catch((err) => {
            res.status(500).json({ err: "Some Error Occured" });
          });
      })
      .catch((err) => {
        res.status(500).json({
          err: "Some Error Occured",
        });
      });
  })
  .post("/test", (req, res, next) => {
    const typeid = req.body.typeid;
    const userid = req.body.userid;
    console.log(typeid, userid);
    db.query("SELECT * FROM testtype WHERE testid=$1", [typeid])
      .then((resp) => {
        const testObject = resp.rows[0];
        var subjects = testObject.subjectsallowed;
        subjects.map((subject) => subject.toLowerCase());
        var physicsAllowed = subjects.includes("physics");
        var chemistryAllowed = subjects.includes("chemistry");
        var mathAllowed = subjects.includes("maths");
        if (physicsAllowed && chemistryAllowed && mathAllowed) {
          allThree(testObject, userid, res);
        } else if (physicsAllowed && chemistryAllowed && !mathAllowed) {
          phyChem(testObject, userid, res);
        } else if (physicsAllowed && !chemistryAllowed && mathAllowed) {
          phyMath(testObject, userid, res);
        } else if (!physicsAllowed && chemistryAllowed && mathAllowed) {
          chemMath(testObject, userid, res);
        } else if (physicsAllowed && !chemistryAllowed && !mathAllowed) {
          physics(testObject, userid, res);
        } else if (!physicsAllowed && chemistryAllowed && !mathAllowed) {
          chemistry(testObject, userid, res);
        } else if (!physicsAllowed && !chemistryAllowed && mathAllowed) {
          math(testObject, userid, res);
        }
      })
      .catch((err) => {
        res.json({ error: "No typeid found" });
      });
  })
  .post("/verifyanswers", (req, res, next) => {
    const { donetestid, questions, testid, userid } = req.body;
    console.log(donetestid, testid, userid);
    db.query("SELECT * FROM testtype WHERE testid=$1", [testid])
      .then((resp) => {
        console.log(resp.rows);
        if (resp.rows.length > 0) {
          var testObject = resp.rows[0];
          updateLog(questions, donetestid, testid, userid, testObject, res);
        } else {
          res.status(404).json({ err: "No such testid" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "No Such testid" });
      });
  })
  .post("/cachequestions", (req, res, next) => {
    var testid = req.body.testid;
    var phyQues = [];
    var chemQues = [];
    var mathQues = [];
    var mflag = false;
    var pflag = false;
    var cflag = false;
    var timeLeft;
    db.query(
      "SELECT hoursubmit,minsubmit,secsubmit,datesubmit,monthsubmit,yearsubmit FROM tempquestioncache WHERE currenttestid=$1",
      [testid]
    ).then((respons) => {
      if (!respons) res.status(404).json({ errmess: "No Such Test Found" });
      else {
        const yearSubmit = respons.rows[0].yearsubmit;
        const monthSubmit = respons.rows[0].monthsubmit - 1;
        const dateSubmit = respons.rows[0].datesubmit;
        const hourSubmit = respons.rows[0].hoursubmit;
        const minSubmit = respons.rows[0].minsubmit;
        const secSubmit = respons.rows[0].secsubmit;
        var testEndDate = new Date(
          yearSubmit,
          monthSubmit,
          dateSubmit,
          hourSubmit,
          minSubmit,
          secSubmit
        );
        testEndDate = moment(testEndDate);
        var currentDate = moment();
        timeLeft = testEndDate.diff(currentDate, "seconds");
        db.query(
          "SELECT currenttestid,qid,statement,img_path,type,subject,archive,latex,options FROM tempquestioncache WHERE currenttestid=$1 AND subject=$2",
          [testid, "physics"]
        ).then((resp) => {
          if (resp.rows.length > 0) {
            pflag = true;
            phyQues.push(resp.rows);
          }
          db.query(
            "SELECT currenttestid,qid,statement,img_path,type,subject,archive,latex,options FROM tempquestioncache WHERE currenttestid=$1 AND subject=$2",
            [testid, "chemistry"]
          ).then((respo) => {
            if (respo.rows.length > 0) {
              cflag = true;
              chemQues.push(respo.rows);
            }
            db.query(
              "SELECT currenttestid,qid,statement,img_path,type,subject,archive,latex,options FROM tempquestioncache WHERE currenttestid=$1 AND subject=$2",
              [testid, "maths"]
            ).then((respon) => {
              if (respon.rows.length > 0) {
                mflag = true;
                mathQues.push(respon.rows);
              }
              var subjects = [];
              if (pflag && mflag && cflag) {
                subjects[0] = "Physics";
                subjects[1] = "Chemistry";
                subjects[2] = "Maths";
              } else if (pflag && mflag && !cflag) {
                subjects[0] = "Physics";
                subjects[1] = "Maths";
              } else if (pflag && !mflag && cflag) {
                subjects[0] = "Physics";
                subjects[1] = "Chemistry";
              } else if (pflag && !mflag && !cflag) {
                subjects[0] = "Physics";
              } else if (!pflag && mflag && cflag) {
                subjects[0] = "Chemistry";
                subjects[1] = "Maths";
              } else if (!pflag && mflag && !cflag) {
                subjects[0] = "Maths";
              } else if (!pflag && !mflag && cflag) {
                subjects[0] = "Chemistry";
              }
              res.json({
                userTestId: testid,
                subjects: subjects,
                Physics: phyQues[0],
                Chemistry: chemQues[0],
                Maths: mathQues[0],
                timeLeft: timeLeft,
              });
            });
          });
        });
      }
    });
  })
  .post("/getheatmap", (req, res, next) => {
    db.query(
      "SELECT dateofsubmission AS date, COUNT(*) FROM usertest WHERE userid=$1 GROUP BY dateofsubmission",
      [req.body.userid]
    )
      .then((resp) => {
        console.log(resp.rows);
        db.query(
          "SELECT dateofsubmission AS date, COUNT(*) FROM liveusertest WHERE userid=$1 GROUP BY dateofsubmission",
          [req.body.userid]
        ).then((respo) => {
          var tests = [];
          if (resp.rows.length > 0 && respo.rows.length > 0)
            tests = resp.rows[0].concat(respo.rows[0]);
          else if (resp.rows.length > 0 && !respo.rows.length > 0)
            tests = resp.rows[0];
          else if (!resp.rows.length > 0 && respo.rows.length > 0)
            tests = respo.rows[0];
          else tests = [];
          res.status(200).send([tests]);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errmess: "DB Error" });
      });
  })
  .get("/giventests", (req, res, next) => {
    db.query("SELECT * from usertest inner join testtype on testtype.testid=usertest.testid and userid=$1", [req.headers.userid])
      .then((resp) => {
        db.query("SELECT * FROM liveusertest WHERE userid=$1", [
          req.body.userid,
        ])
          .then((respo) => {
            res
              .status(200)
              .json({ statictest: resp.rows, livetest: respo.rows });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ err: "DB Error" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "DB Error" });
      });
  })
  .post("/specifictestdetails", (req, res, next) => {
    if (req.body.statictest) {
      db.query(
        `SELECT * FROM testquestions INNER JOIN questions ON testquestions.qid=questions.qid AND testquestions.donetestid='${req.body.donetestid}'`
      )
        .then((resp) => {
          res
            .status(200)
            .json({ donetestid: req.body.donetestid, questions: resp.rows });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ err: "DB Error" });
        });
    } else {
      db.query(
        `SELECT * FROM livetestlog INNER JOIN questions ON livetestlog.qid=questions.qid AND livetestlog.donetestid='${req.body.donetestid}'`
      )
        .then((resp) => {
          res
            .status(200)
            .json({ donetestid: req.body.donetestid, questions: resp.rows });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ err: "DB Error" });
        });
    }
  });

module.exports = router;
