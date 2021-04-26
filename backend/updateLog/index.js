const db = require("../db/index");
const { notNumerical, numerical } = require("../verifyAnswerType/index");

const updateLog = (questions, donetestid, testid, userid, testObject, res) => {
  const mcqCorrectMarks = testObject.mcqdata ? testObject.mcqdata[1] : 0;
  const mcqWrongMarks = testObject.mcqdata ? testObject.mcqdata[2] : 0;
  const mcqNaMarks = testObject.mcqdata ? testObject.mcqdata[3] : 0;
  const fibCorrectMarks = testObject.fibdata ? testObject.fibdata[1] : 0;
  const fibWrongMarks = testObject.fibdata ? testObject.fibdata[2] : 0;
  const fibNaMarks = testObject.fibdata ? testObject.fibdata[3] : 0;
  const anrCorrectMarks = testObject.anrdata ? testObject.anrdata[1] : 0;
  const anrWrongMarks = testObject.anrdata ? testObject.anrdata[2] : 0;
  const anrNaMarks = testObject.anrdata ? testObject.anrdata[3] : 0;
  const tofCorrectMarks = testObject.truefalse ? testObject.truefalse[1] : 0;
  const tofWrongMarks = testObject.truefalse ? testObject.truefalse[2] : 0;
  const tofNaMarks = testObject.truefalse ? testObject.truefalse[3] : 0;
  const numCorrectMarks = testObject.numerical ? testObject.numerical[1] : 0;
  const numWrongMarks = testObject.numerical ? testObject.numerical[2] : 0;
  const numNaMarks = testObject.numerical ? testObject.numerical[3] : 0;
  const mtfCorrectMarks = testObject.matchcolumn
    ? testObject.matchcolumn[1]
    : 0;
  const mtfWrongMarks = testObject.matchcolumn ? testObject.matchcolumn[2] : 0;
  const mtfNaMarks = testObject.matchcolumn ? testObject.matchcolumn[3] : 0;
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
      var phyCorrect = {},
        chemCorrect = {},
        mathCorrect = {},
        phyWrong = {},
        chemWrong = {},
        mathWrong = {},
        phyNa = {},
        chemNa = {},
        mathNa = {};
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
                if (phyNa[answer.type]) phyNa[answer.type]++;
                else phyNa[answer.type] = 1;
              } else if (answer.subject == "chemistry") {
                chem[2]++;
                if (chemNa[answer.type]) chemNa[answer.type]++;
                else chemNa[answer.type] = 1;
              } else {
                math[2]++;
                if (mathNa[answer.type]) mathNa[answer.type]++;
                else mathNa[answer.type] = 1;
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
                if (phyCorrect[answer.type]) phyCorrect[answer.type]++;
                else phyCorrect[answer.type] = 1;
              } else if (answer.subject == "chemistry") {
                chem[0]++;
                if (chemCorrect[answer.type]) chemCorrect[answer.type]++;
                else chemCorrect[answer.type] = 1;
              } else {
                math[0]++;
                if (mathCorrect[answer.type]) mathCorrect[answer.type]++;
                else mathCorrect[answer.type] = 1;
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
                if (phyWrong[answer.type]) phyWrong[answer.type]++;
                else phyWrong[answer.type] = 1;
              } else if (answer.subject == "chemistry") {
                chem[1]++;
                if (chemWrong[answer.type]) chemWrong[answer.type]++;
                else chemWrong[answer.type] = 1;
              } else {
                math[1]++;
                if (mathWrong[answer.type]) mathWrong[answer.type]++;
                else mathWrong[answer.type] = 1;
              }
            }
          } else if (answer.type != "numerical") {
            if (!answer.useranswer || !answer.useranswer.length) {
              totalNonAttempted++;
              if (answer.subject == "physics") {
                phy[2]++;
                if (phyNa[answer.type]) phyNa[answer.type]++;
                else phyNa[answer.type] = 1;
              } else if (answer.subject == "chemistry") {
                chem[2]++;
                if (chemNa[answer.type]) chemNa[answer.type]++;
                else chemNa[answer.type] = 1;
              } else {
                math[2]++;
                if (mathNa[answer.type]) mathNa[answer.type]++;
                else mathNa[answer.type] = 1;
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
                if (phyCorrect[answer.type]) phyCorrect[answer.type]++;
                else phyCorrect[answer.type] = 1;
              } else if (answer.subject == "chemistry") {
                chem[0]++;
                if (chemCorrect[answer.type]) chemCorrect[answer.type]++;
                else chemCorrect[answer.type] = 1;
              } else {
                math[0]++;
                if (chemCorrect[answer.type]) chemCorrect[answer.type]++;
                else chemCorrect[answer.type] = 1;
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
                if (phyWrong[answer.type]) phyWrong[answer.type]++;
                else phyWrong[answer.type] = 1;
              } else if (answer.subject == "chemistry") {
                chem[1]++;
                if (chemWrong[answer.type]) chemWrong[answer.type]++;
                else chemWrong[answer.type] = 1;
              } else {
                math[1]++;
                if (mathWrong[answer.type]) mathWrong[answer.type]++;
                else mathWrong[answer.type] = 1;
              }
            }
          }
        });
        Promise.all(correctPromise).then((corEnd) => {
          Promise.all(notAttemptedPromise).then((naEnd) => {
            var phyMarks =
                phyCorrect["mcq"] * mcqCorrectMarks +
                phyWrong["mcq"] * mcqWrongMarks +
                phyNa["mcq"] * mcqNaMarks +
                phyCorrect["fib"] * fibCorrectMarks +
                phyWrong["fib"] * fibWrongMarks +
                phyNa["fib"] * fibNaMarks +
                phyCorrect["anr"] * anrCorrectMarks +
                phyWrong["mcq"] * anrWrongMarks +
                phyNa["anr"] * anrNaMarks +
                phyCorrect["tof"] * tofCorrectMarks +
                phyWrong["tof"] * tofWrongMarks +
                phyNa["tof"] * tofNaMarks +
                phyCorrect["num"] * numCorrectMarks +
                phyWrong["num"] * numWrongMarks +
                phyNa["num"] * numNaMarks +
                phyCorrect["mtf"] * mtfCorrectMarks +
                phyWrong["mtf"] * mtfWrongMarks +
                phyNa["mtf"] * mtfNaMarks,
              chemMarks =
                chemCorrect["mcq"] * mcqCorrectMarks +
                chemWrong["mcq"] * mcqWrongMarks +
                chemNa["mcq"] * mcqNaMarks +
                chemCorrect["fib"] * fibCorrectMarks +
                chemWrong["fib"] * fibWrongMarks +
                chemNa["fib"] * fibNaMarks +
                chemCorrect["anr"] * anrCorrectMarks +
                chemWrong["mcq"] * anrWrongMarks +
                chemNa["anr"] * anrNaMarks +
                chemCorrect["tof"] * tofCorrectMarks +
                chemWrong["tof"] * tofWrongMarks +
                chemNa["tof"] * tofNaMarks +
                chemCorrect["num"] * numCorrectMarks +
                chemWrong["num"] * numWrongMarks +
                chemNa["num"] * numNaMarks +
                chemCorrect["mtf"] * mtfCorrectMarks +
                chemWrong["mtf"] * mtfWrongMarks +
                chemNa["mtf"] * mtfNaMarks,
              mathMarks =
                mathCorrect["mcq"] * mcqCorrectMarks +
                mathWrong["mcq"] * mcqWrongMarks +
                mathNa["mcq"] * mcqNaMarks +
                mathCorrect["fib"] * fibCorrectMarks +
                mathWrong["fib"] * fibWrongMarks +
                mathNa["fib"] * fibNaMarks +
                mathCorrect["anr"] * anrCorrectMarks +
                mathWrong["mcq"] * anrWrongMarks +
                mathNa["anr"] * anrNaMarks +
                mathCorrect["tof"] * tofCorrectMarks +
                mathWrong["tof"] * tofWrongMarks +
                mathNa["tof"] * tofNaMarks +
                mathCorrect["num"] * numCorrectMarks +
                mathWrong["num"] * numWrongMarks +
                mathNa["num"] * numNaMarks +
                mathCorrect["mtf"] * mtfCorrectMarks +
                mathWrong["mtf"] * mtfWrongMarks +
                mathNa["mtf"] * mtfNaMarks;
            var totalMarks = phyMarks + chemMarks + mathMarks;
            var date = new Date();
            date = date.toISOString().split("T")[0];
            date = date.toString();
            console.log(date);
            db.query(
              "INSERT INTO usertest VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)",
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
                date,
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

module.exports = updateLog;
