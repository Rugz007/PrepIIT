const db = require("../db/index");
const { notNumerical, numerical } = require("../verifyAnswerType/index");

const updateLiveLog = (questions, donetestid, testid, userid, res) => {
  const query = `INSERT INTO livetestlog VALUES ('${donetestid}',$1,$2,'wrong',$3)`;
  var questionQueries = [];
  questions.forEach((question) => {
    questionQueries.push(db.query(query, question).catch((err) => err));
  });
  Promise.all(questionQueries)
    .then((resp) => {
      var phy = [0, 0, 0],
        chem = [0, 0, 0],
        math = [0, 0, 0];
      var correctPromise = [],
        notAttemptedPromise = [];
      var totalCorrect = 0,
        totalWrong = 0,
        totalNonAttempted = 0;
      db.query(
        `SELECT * FROM livetestlog INNER JOIN livetestquestions ON livetestlog.qid=livetestquestions.qid AND livetestlog.donetestid='${donetestid}'`
      ).then((respo) => {
        const answers = respo.rows;
        answers.forEach((answer) => {
          if (answer.type == "numerical") {
            if (!answer.useranswer.length) {
              totalNonAttempted++;
              if (answer.subject == "physics") {
                phy[2]++;
              } else if (answer.subject == "chemistry") {
                chem[2]++;
              } else {
                math[2]++;
              }
              notAttemptedPromise.push(
                db
                  .query(
                    `UPDATE livetestlog SET status='not attempted' WHERE qid=${answer.qid} AND donetestid='${donetestid}'`
                  )
                  .catch((err) => err)
              );
            } else if (numerical(answer)) {
              totalCorrect++;
              if (answer.subject == "physics") {
                phy[0]++;
              } else if (answer.subject == "chemistry") {
                chem[0]++;
              } else {
                math[0]++;
              }
              correctPromise.push(
                db
                  .query(
                    `UPDATE livetestlog SET status='correct' WHERE qid=${answer.qid} AND donetestid='${donetestid}'`
                  )
                  .catch((err) => err)
              );
            } else {
              totalWrong++;
              if (answer.subject == "physics") {
                phy[1]++;
              } else if (answer.subject == "chemistry") {
                chem[1]++;
              } else {
                math[1]++;
              }
            }
          } else if (answer.type != "numerical") {
            if (!answer.useranswer.length) {
              totalNonAttempted++;
              if (answer.subject == "physics") {
                phy[2]++;
              } else if (answer.subject == "chemistry") {
                chem[2]++;
              } else {
                math[2]++;
              }
              notAttemptedPromise.push(
                db
                  .query(
                    `UPDATE livetestlog SET status='not attempted' WHERE qid=${answer.qid}`
                  )
                  .catch((err) => err)
              );
            } else if (notNumerical(answer)) {
              totalCorrect++;
              if (answer.subject == "physics") {
                phy[0]++;
              } else if (answer.subject == "chemistry") {
                chem[0]++;
              } else {
                math[0]++;
              }
              correctPromise.push(
                db
                  .query(
                    `UPDATE livetestlog SET status='correct' WHERE qid=${answer.qid}`
                  )
                  .catch((err) => err)
              );
            } else {
              totalWrong++;
              if (answer.subject == "physics") {
                phy[1]++;
              } else if (answer.subject == "chemistry") {
                chem[1]++;
              } else {
                math[1]++;
              }
            }
          }
        });
        Promise.all(correctPromise).then((corEnd) => {
          Promise.all(notAttemptedPromise).then((naEnd) => {
            db.query(
              "INSERT INTO liveusertest VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                donetestid,
                testid,
                userid,
                phy[0],
                chem[0],
                math[0],
                0,
                phy[1],
                chem[1],
                math[1],
                0,
                phy[2],
                chem[2],
                math[2],
                0,
              ]
            )
              .then((resp) => {
                console.log(phy, chem, math);
                res.json({
                  totalCorrect: totalCorrect,
                  totalWrong: totalWrong,
                  totalNonAttempted: totalNonAttempted,
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  errmess: "DB Error",
                });
              });
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
};

module.exports = updateLiveLog;
