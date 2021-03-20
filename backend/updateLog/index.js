const db = require("../db/index");
const { notNumerical, numerical } = require("../verifyAnswerType/index");

const updateLog = (questions, donetestid, res) => {
  const query = `INSERT INTO testquestions VALUES ('${donetestid}',$1,$2,'wrong',$3)`;
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
            console.log(answer.useranswer.length);
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
            res.json({
              totalCorrect: totalCorrect,
              totalWrong: totalWrong,
              totalNonAttempted: totalNonAttempted,
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
