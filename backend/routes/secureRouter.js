var express = require("express");
var router = express.Router();
const userAuth = require("../userAuth/userAuth");
const allThree = require("../testGeneration/allThree");
const updateLog = require("../updateLog/index");

var db = require("../db/index");

router.use(userAuth);

router
  .get("/test", (req, res, next) => {
    db.query("SELECT * FROM testtype").then((resp) => {
      res.status(200).json(resp.rows[0].testname);
      res.end();
    });
  })
  .post("/test", (req, res, next) => {
    const type = req.body.type;
    db.query("SELECT * FROM testtype WHERE testname=$1", [type]).then(
      (resp) => {
        console.log(resp.rows);
        const testObject = resp.rows[0];
        var subjects = testObject.subjectsallowed;
        subjects.map((subject) => subject.toLowerCase());
        var physics = subjects.includes("physics");
        var chemistry = subjects.includes("chemistry");
        var math = subjects.includes("maths");
        console.log(physics, chemistry, math);
        if (physics && chemistry && math) {
          allThree(testObject, res);
        } /*else if (physics && chemistry && !math) {
          phyChem(testObject, res);
        } else if (physics && !chemistry && math) {
          phyMath(testObject, res);
        } else if (!physics && chemistry && math) {
          chemMath(testObject, res);
        } else if (physics && !chemistry && !math) {
          physics(testObject, res);
        } else if (!physics && chemistry && !math) {
          chemistry(testObject, res);
        } else if (!physics && !chemistry && math) {
          math(testObject, res);
        }*/
      }
    );
  })
  .post("/verifyanswers", (req, res, next) => {
    const { donetestid, questions } = req.body;
    //console.log(donetestid, questions);
    updateLog(questions, donetestid, res);
  });

module.exports = router;
