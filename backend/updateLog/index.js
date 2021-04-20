const db = require("../db/index");
const { notNumerical, numerical } = require("../verifyAnswerType/index");

const updateLog = (questions, donetestid, testid, userid, res) => {
  const query = `INSERT INTO testquestions VALUES ('${donetestid}',$1,$2,'wrong',$3,$4)`;
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
        `SELECT * FROM testquestions INNER JOIN questions ON testquestions.qid=questions.qid AND testquestions.donetestid='${donetestid}'`
      ).then((respo) => {
        const answers = respo.rows;
        answers.forEach((answer) => {
          if (answer.type == "numerical") {
            if (!answer.useranswer || !answer.useranswer.length) {
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
                    `UPDATE testquestions SET status='not attempted' WHERE qid=${answer.qid} AND donetestid='${donetestid}'`
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
                    `UPDATE testquestions SET status='correct' WHERE qid=${answer.qid} AND donetestid='${donetestid}'`
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
            if (!answer.useranswer || !answer.useranswer.length) {
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
                    `UPDATE testquestions SET status='not attempted' WHERE qid=${answer.qid}`
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
                    `UPDATE testquestions SET status='correct' WHERE qid=${answer.qid}`
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
              "SELECT rightmarks,wrongmarks,namarks FROM testtype WHERE testid=$1",
              [testid]
            ).then((respo) => {
              const rightMarks = respo.rows[0].rightmarks;
              const wrongMarks = respo.rows[0].wrongmarks;
              const naMarks = respo.rows[0].namarks;
              console.log(respo.rows);
              const phyCorrectMarks = rightMarks * phy[0];
              const phyWrongMarks = wrongMarks * phy[1];
              const phyNaMarks = naMarks * phy[2];
              const chemCorrectMarks = rightMarks * chem[0];
              const chemWrongMarks = wrongMarks * chem[1];
              const chemNaMarks = naMarks * chem[2];
              const mathCorrectMarks = rightMarks * math[0];
              const mathWrongMarks = wrongMarks * math[1];
              const mathNaMarks = naMarks * math[2];
              const totalCorrectMarks =
                phyCorrectMarks + chemCorrectMarks + mathCorrectMarks;
              const totalWrongMarks =
                phyWrongMarks + chemWrongMarks + mathWrongMarks;
              const totalNaMarks = phyNaMarks + chemNaMarks + mathNaMarks;
              const totalMarks =
                totalCorrectMarks + totalWrongMarks + totalNaMarks;
              const phyMarks = phyCorrectMarks + phyWrongMarks + phyNaMarks;
              const chemMarks = chemCorrectMarks + chemWrongMarks + chemNaMarks;
              const mathMarks = mathCorrectMarks + mathWrongMarks + mathNaMarks;
              db.query(
                "INSERT INTO usertest VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)",
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
                  phyMarks,
                  chemMarks,
                  mathMarks,
                  totalMarks,
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
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
};

module.exports = updateLog;
