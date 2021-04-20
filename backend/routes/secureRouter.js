var express = require("express");
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
    var availableTest = [];
    var givenTest = [];
    const userid = req.headers.userid;
    db.query(
      "SELECT testid,testname,subjectsallowed FROM testtype tt WHERE tt.testid NOT IN (SELECT ut.testid FROM usertest ut WHERE userid=$1 GROUP BY ut.testid)",
      [userid]
    )
      .then((resp) => {
        availableTest.push(resp.rows);
        db.query("SELECT * FROM usertest WHERE userid=$1", [userid])
          .then((respo) => {
            givenTest.push(respo.rows);
            res.status(200).json({
              availableTest: availableTest,
              givenTest: givenTest,
            });
          })
          .catch((err) => {
            res.status(500).json({
              err: "Some Error Occured",
            });
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
    updateLog(questions, donetestid, testid, userid, res);
  })
  .post("/cachequestions", (req, res, next) => {
    var testid = req.body.testid;
    var phyQues = [];
    var chemQues = [];
    var mathQues = [];
    var mflag = false;
    var pflag = false;
    var cflag = false;
    db.query(
      "SELECT * FROM tempquestioncache WHERE currenttestid=$1 OR subject=$2",
      [testid, "physics"]
    ).then((resp) => {
      if (resp.rows.length > 0) {
        pflag = true;
        phyQues.push(resp.rows);
      }
      db.query(
        "SELECT * FROM tempquestioncache WHERE currenttestid=$1 OR subject=$2",
        [testid, "chemistry"]
      ).then((respo) => {
        if (respo.rows.length > 0) {
          cflag = true;
          chemQues.push(respo.rows);
        }
        db.query(
          "SELECT * FROM tempquestioncache WHERE currenttestid=$1 OR subject=$2",
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
            phyQues: phyQues,
            chemQues: chemQues,
            mathQues: mathQues,
          });
        });
      });
    });
  });

module.exports = router;
