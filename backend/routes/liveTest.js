var express = require("express");
var router = express.Router();

const userAuth = require("../userAuth/userAuth");
const updateLiveLog = require("../updateLiveLog/index");

const randomstring = require("randomstring");

const db = require("../db");

router.use(userAuth);

router
  .get("/", (req, res, next) => {
    db.query("SELECT * FROM livetest").then((resp) => {
      res.json(resp.rows);
    });
  })
  .post("/", (req, res, next) => {
    var liveStartMin,
      liveStartHour,
      liveStartMonth,
      liveStartYear,
      liveStartDay,
      liveEndMin,
      liveEndHour,
      liveEndMonth,
      liveEndYear,
      liveEndDay;
    var liveid = req.body.liveid;
    db.query("SELECT * FROM livetest WHERE liveid=$1", [liveid])
      .then((resp) => {
        liveStartMin = resp.rows[0].startminute;
        liveStartHour = resp.rows[0].starthour;
        liveStartMonth = resp.rows[0].startmonth - 1;
        liveStartYear = resp.rows[0].startyear;
        liveStartDay = resp.rows[0].startday;
        liveEndMin = resp.rows[0].endminute;
        liveEndHour = resp.rows[0].endhour;
        liveEndMonth = resp.rows[0].endmonth - 1;
        liveEndYear = resp.rows[0].endyear;
        liveEndDay = resp.rows[0].endday;
        const currentDate = new Date();
        const liveStartDate = new Date(
          liveStartYear,
          liveStartMonth,
          liveStartDay,
          liveStartHour,
          liveStartMin
        );
        const liveEndDate = new Date(
          liveEndYear,
          liveEndMonth,
          liveEndDay,
          liveEndHour,
          liveEndMin
        );
        if (currentDate.getTime() < liveStartDate.getTime()) {
          const difference =
            Math.abs(currentDate.getTime() - liveStartDate.getTime()) / 1000;
          res.status(403).json({
            errmess:
              "The test has not yet started and will start in " +
              difference +
              " seconds",
          });
        } else if (currentDate.getTime() > liveEndDate.getTime()) {
          res.status(403).json({ errmess: "The Test has already ended" });
        } else {
          var phyQues = [],
            chemQues = [],
            mathQues = [];
          db.query(
            "SELECT qid,liveid,statement,img_path,type,subject,latex,options FROM livetestquestions WHERE liveid=$1 AND subject='physics'",
            [req.body.liveid]
          )
            .then((respo) => {
              if (respo.rows) phyQues.push(respo.rows);
              db.query(
                "SELECT qid,liveid,statement,img_path,type,subject,latex,options FROM livetestquestions WHERE liveid=$1 AND subject='chemistry'",
                [req.body.liveid]
              )
                .then((respon) => {
                  if (respon.rows) chemQues.push(respon.rows);
                  db.query(
                    "SELECT qid,liveid,statement,img_path,type,subject,latex,options FROM livetestquestions WHERE liveid=$1 AND subject='maths'",
                    [req.body.liveid]
                  )
                    .then((respons) => {
                      if (respons.rows) mathQues.push(respons.rows);
                      const donetestid = randomstring.generate({
                        length: 15,
                        charset: "alphabetic",
                      });
                      const timeLeft =
                        (liveEndDate.getTime() - currentDate.getTime()) / 1000;
                      res.status(200).json({
                        userTestId: donetestid,
                        subjects: resp.rows[0].subjectsallowed,
                        Physics: phyQues,
                        Chemistry: chemQues,
                        Maths: mathQues,
                        timeLeft: timeLeft,
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({ errmess: "Some Error Occured" });
                    });
                })
                .catch((err) => {
                  res.status(500).json({ errmess: "Some Error Occured" });
                });
            })
            .catch((err) => {
              res.status(500).json({ errmess: "Some Error Occured" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errmess: "Some Error Occured" });
      });
  })
  .post("/verifyanswers", (req, res, next) => {
    const { donetestid, questions, liveid, userid } = req.body;
    console.log(donetestid, liveid, userid);
    db.query("SELECT * FROM livetest WHERE liveid=$1", [testid]).then(
      (resp) => {
        var testObject = resp.rows[0];
        updateLiveLog(questions, donetestid, testid, userid, testObject, res);
      }
    );
  });

module.exports = router;
