var express = require("express");
const moment = require("moment");
var router = express.Router();

const userAuth = require("../userAuth/userAuth");

const phyChemMath = require("../testGeneration/phyChemMath");
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
          phyChemMath(testObject, userid, res);
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
          db.query(
            "SELECT hoursubmit,minsubmit,secsubmit,datesubmit,monthsubmit,yearsubmit FROM tempquestioncache WHERE currenttestid=$1",
            [donetestid]
          ).then((respon) => {
            const yearSubmit = respon.rows[0].yearsubmit;
            const monthSubmit = respon.rows[0].monthsubmit - 1;
            const dateSubmit = respon.rows[0].datesubmit;
            const hourSubmit = respon.rows[0].hoursubmit;
            const minSubmit = respon.rows[0].minsubmit;
            const secSubmit = respon.rows[0].secsubmit;
            var testEndDate = new Date(
              yearSubmit,
              monthSubmit,
              dateSubmit,
              hourSubmit,
              minSubmit,
              secSubmit
            );
            var duration = moment.duration(resp.rows[0].time, "minutes");
            var dateSubmitMoment = moment(testEndDate);
            dateSubmitMoment.subtract(duration);
            var currentTime = new Date();
            var currentTimeMoment = moment(currentTime);
            var timeTaken = dateSubmitMoment.diff(currentTimeMoment, "seconds");
            var testObject = resp.rows[0];
            updateLog(
              questions,
              donetestid,
              testid,
              userid,
              testObject,
              res,
              timeTaken
            );
          });
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
    db.query(
      "SELECT * from usertest inner join testtype on testtype.testid=usertest.testid and userid=$1",
      [req.headers.userid]
    )
      .then((resp) => {
        db.query("SELECT * FROM liveusertest WHERE userid=$1", [
          req.body.userid,
        ])
          .then((respo) => {
            for (var i = 0; i < respo.rows.length; i++) {
              respo.rows[i].physics = {
                marks: respo.rows[i].phymarks,
                correct: respo.rows[i].phycorrect,
                wrong: respo.rows[i].phywrong,
                notattempted: respo.rows[i].phyna,
              };
              respo.rows[i].chemistry = {
                marks: respo.rows[i].chemmarks,
                correct: respo.rows[i].chemcorrect,
                wrong: respo.rows[i].chemwrong,
                notattempted: respo.rows[i].chemna,
              };
              respo.rows[i].maths = {
                marks: respo.rows[i].mathmarks,
                correct: respo.rows[i].mathcorrect,
                wrong: respo.rows[i].mathwrong,
                notattempted: respo.rows[i].mathna,
              };
              respo.rows[i].biology = {
                marks: respo.rows[i].biomarks,
                correct: respo.rows[i].biocorrect,
                wrong: respo.rows[i].biowrong,
                notattempted: respo.rows[i].biona,
              };
              delete respo.rows[i].phymarks;
              delete respo.rows[i].chemmarks;
              delete respo.rows[i].mathmarks;
              delete respo.rows[i].biomarks;
              delete respo.rows[i].phycorrect;
              delete respo.rows[i].chemcorrect;
              delete respo.rows[i].mathcorrect;
              delete respo.rows[i].biocorrect;
              delete respo.rows[i].phywrong;
              delete respo.rows[i].chemwrong;
              delete respo.rows[i].mathwrong;
              delete respo.rows[i].biowrong;
              delete respo.rows[i].phyna;
              delete respo.rows[i].chemna;
              delete respo.rows[i].mathna;
              delete respo.rows[i].biona;
            }
            for (var i = 0; i < resp.rows.length; i++) {
              resp.rows[i].physics = {
                marks: resp.rows[i].phymarks,
                correct: resp.rows[i].phycorrect,
                wrong: resp.rows[i].phywrong,
                notattempted: resp.rows[i].phyna,
              };
              resp.rows[i].chemistry = {
                marks: resp.rows[i].chemmarks,
                correct: resp.rows[i].chemcorrect,
                wrong: resp.rows[i].chemwrong,
                notattempted: resp.rows[i].chemna,
              };
              resp.rows[i].maths = {
                marks: resp.rows[i].mathmarks,
                correct: resp.rows[i].mathcorrect,
                wrong: resp.rows[i].mathwrong,
                notattempted: resp.rows[i].mathna,
              };
              resp.rows[i].biology = {
                marks: resp.rows[i].biomarks,
                correct: resp.rows[i].biocorrect,
                wrong: resp.rows[i].biowrong,
                notattempted: resp.rows[i].biona,
              };
              delete resp.rows[i].phymarks;
              delete resp.rows[i].chemmarks;
              delete resp.rows[i].mathmarks;
              delete resp.rows[i].biomarks;
              delete resp.rows[i].phycorrect;
              delete resp.rows[i].chemcorrect;
              delete resp.rows[i].mathcorrect;
              delete resp.rows[i].biocorrect;
              delete resp.rows[i].phywrong;
              delete resp.rows[i].chemwrong;
              delete resp.rows[i].mathwrong;
              delete resp.rows[i].biowrong;
              delete resp.rows[i].phyna;
              delete resp.rows[i].chemna;
              delete resp.rows[i].mathna;
              delete resp.rows[i].biona;
            }
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
