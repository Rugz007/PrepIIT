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
    db.query("SELECT testid,testname,subjectsallowed FROM testtype").then(
      (resp) => {
        res.status(200).json(resp.rows);
        res.end();
      }
    );
  })
  .post("/test", (req, res, next) => {
    const typeid = req.body.typeid;
    db.query("SELECT * FROM testtype WHERE testid=$1", [typeid])
      .then((resp) => {
        const testObject = resp.rows[0];
        var subjects = testObject.subjectsallowed;
        subjects.map((subject) => subject.toLowerCase());
        var physicsAllowed = subjects.includes("physics");
        var chemistryAllowed = subjects.includes("chemistry");
        var mathAllowed = subjects.includes("maths");
        if (physicsAllowed && chemistryAllowed && mathAllowed) {
          allThree(testObject, res);
        } else if (physicsAllowed && chemistryAllowed && !mathAllowed) {
          phyChem(testObject, res);
        } else if (physicsAllowed && !chemistryAllowed && mathAllowed) {
          phyMath(testObject, res);
        } else if (!physicsAllowed && chemistryAllowed && mathAllowed) {
          chemMath(testObject, res);
        } else if (physicsAllowed && !chemistryAllowed && !mathAllowed) {
          physics(testObject, res);
        } else if (!physicsAllowed && chemistryAllowed && !mathAllowed) {
          chemistry(testObject, res);
        } else if (!physicsAllowed && !chemistryAllowed && mathAllowed) {
          math(testObject, res);
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
