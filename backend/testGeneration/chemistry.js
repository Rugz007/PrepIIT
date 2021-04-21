const randomstring = require("randomstring");
const db = require("../db");

const chemistry = (testObject, userid, res) => {
  var chemQues = [];
  var questionPromise = [];
  const userTestId = randomstring.generate({
    length: 15,
    charset: "alphabetic",
  });
  db.query("UPDATE users SET currenttestid=$1 WHERE userid=$2", [
    userTestId,
    userid,
  ])
    .then((resp) => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err);
    });
  const mcqQuestions = testObject.mcqdata ? testObject.mcqdata[0] : 0;
  db.query(
    `SELECT qid,statement,img_path,type,archive,latex,options,subject FROM questions WHERE is_reported=FALSE AND subject='chemistry' ORDER BY RANDOM() LIMIT ${mcqQuestions}`
  ).then((resp) => {
    if (resp.rows) chemQues = chemQues.concat(resp.rows);
    const fibQuestions = testObject.fibdata ? testObject.fibdata[0] : 0;
    db.query(
      `SELECT qid,statement,img_path,type,archive,latex,options,subject FROM questions WHERE is_reported=FALSE AND subject='chemistry' ORDER BY RANDOM() LIMIT ${fibQuestions}`
    ).then((resp) => {
      if (resp.rows) chemQues = chemQues.concat(resp.rows);
      const assertionQuestions = testObject.assertiondata
        ? testObject.assertiondata[0]
        : 0;
      db.query(
        `SELECT qid,statement,img_path,type,archive,latex,options,subject FROM questions WHERE is_reported=FALSE AND subject='chemistry' ORDER BY RANDOM() LIMIT ${assertionQuestions}`
      ).then((resp) => {
        if (resp.rows) chemQues = chemQues.concat(resp.rows);
        const trueFalseQuestions = testObject.truefalse
          ? testObject.truefalse[0]
          : 0;
        db.query(
          `SELECT qid,statement,img_path,type,archive,latex,options,subject FROM questions WHERE is_reported=FALSE AND subject='chemistry' ORDER BY RANDOM() LIMIT ${trueFalseQuestions}`
        ).then((resp) => {
          if (resp.rows) chemQues = chemQues.concat(resp.rows);
          const numericalQuestions = testObject.numerical
            ? testObject.numerical[0]
            : 0;
          db.query(
            `SELECT qid,statement,img_path,type,archive,latex,options,subject FROM questions WHERE is_reported=FALSE AND subject='chemistry' ORDER BY RANDOM() LIMIT ${numericalQuestions}`
          ).then((resp) => {
            if (resp.rows) chemQues = chemQues.concat(resp.rows);
            const matchColumnQuestions = testObject.matchcolumn
              ? testObject.matchcolumn[0]
              : 0;
            db.query(
              `SELECT qid,statement,img_path,type,archive,latex,options,subject FROM questions WHERE is_reported=FALSE AND subject='chemistry' ORDER BY RANDOM() LIMIT ${matchColumnQuestions}`
            ).then((resp) => {
              if (resp.rows) chemQues = chemQues.concat(resp.rows);
              res.json({
                userTestId: userTestId,
                subjects: ["Chemistry"],
                Chemistry: chemQues,
              });
              chemQues.forEach((question) => {
                questionPromise.push(
                  db
                    .query(
                      "INSERT INTO tempquestioncache VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
                      [
                        userTestId,
                        question.qid,
                        question.statement,
                        question.img_path,
                        question.type,
                        question.subject,
                        question.archive,
                        question.latex,
                        question.options,
                        hour,
                        min,
                        sec,
                        date,
                        month,
                        year,
                      ]
                    )
                    .catch((err) => err)
                );
              });
              Promise.all(questionPromise)
                .then((resp) => {
                  console.log("Inserted Successfully");
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
      });
    });
  });
};

module.exports = chemistry;
