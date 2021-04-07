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
    db.query("SELECT testid,testname,subjectsallowed FROM testtype").then(
      (resp) => {
        availableTest.push(resp.rows);
        db.query("SELECT * FROM usertest WHERE userid=$1", [userid]).then(
          (respo) => {
            givenTest.push(respo);
            res.status(200).json({
              availableTest: availableTest,
              givenTest: givenTest,
            });
          }
        );
      }
    );
  })
  .post("/test", (req, res, next) => {
    const typeid = req.body.typeid;
    const userid = req.body.userid;
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
  });

module.exports = router;
