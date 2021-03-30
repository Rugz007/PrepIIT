const randomstring = require("randomstring");
const db = require("../db");

const phyChem = (testObject, res) => {
  var phyQues = [];
  var chemQues = [];
  const userTestId = randomstring.generate({
    length: 15,
    charset: "alphabetic",
  });
  const mcqQuestions = testObject.mcqdata ? testObject.mcqdata[0] : 0;
  db.query(
    `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${mcqQuestions}`
  ).then((resp) => {
    if (resp.rows) phyQues = phyQues.concat(resp.rows);
    const fibQuestions = testObject.fibdata ? testObject.fibdata[0] : 0;
    db.query(
      `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${fibQuestions}`
    ).then((resp) => {
      if (resp.rows) phyQues = phyQues.concat(resp.rows);
      const assertionQuestions = testObject.assertiondata
        ? testObject.assertiondata[0]
        : 0;
      db.query(
        `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${assertionQuestions}`
      ).then((resp) => {
        if (resp.rows) phyQues = phyQues.concat(resp.rows);
        const trueFalseQuestions = testObject.truefalse
          ? testObject.truefalse[0]
          : 0;
        db.query(
          `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${trueFalseQuestions}`
        ).then((resp) => {
          if (resp.rows) phyQues = phyQues.concat(resp.rows);
          const numericalQuestions = testObject.numerical
            ? testObject.numerical[0]
            : 0;
          db.query(
            `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${numericalQuestions}`
          ).then((resp) => {
            if (resp.rows) phyQues = phyQues.concat(resp.rows);
            const matchColumnQuestions = testObject.matchcolumn
              ? testObject.matchcolumn[0]
              : 0;
            db.query(
              `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${matchColumnQuestions}`
            ).then((resp) => {
              if (resp.rows) phyQues = phyQues.concat(resp.rows);
              const mcqQuestions = testObject.mcqdata
                ? testObject.mcqdata[0]
                : 0;
              db.query(
                `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${mcqQuestions}`
              ).then((resp) => {
                if (resp.rows) chemQues = chemQues.concat(resp.rows);
                const fibQuestions = testObject.fibdata
                  ? testObject.fibdata[0]
                  : 0;
                db.query(
                  `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${fibQuestions}`
                ).then((resp) => {
                  if (resp.rows) chemQues = chemQues.concat(resp.rows);
                  const assertionQuestions = testObject.assertiondata
                    ? testObject.assertiondata[0]
                    : 0;
                  db.query(
                    `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${assertionQuestions}`
                  ).then((resp) => {
                    if (resp.rows) chemQues = chemQues.concat(resp.rows);
                    const trueFalseQuestions = testObject.truefalse
                      ? testObject.truefalse[0]
                      : 0;
                    db.query(
                      `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${trueFalseQuestions}`
                    ).then((resp) => {
                      if (resp.rows) chemQues = chemQues.concat(resp.rows);
                      const numericalQuestions = testObject.numerical
                        ? testObject.numerical[0]
                        : 0;
                      db.query(
                        `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${numericalQuestions}`
                      ).then((resp) => {
                        if (resp.rows) chemQues = chemQues.concat(resp.rows);
                        const matchColumnQuestions = testObject.matchcolumn
                          ? testObject.matchcolumn[0]
                          : 0;
                        db.query(
                          `SELECT qid,statement,img_path,type,archive,latex,options FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${matchColumnQuestions}`
                        ).then((resp) => {
                          if (resp.rows) chemQues = chemQues.concat(resp.rows);

                          res.json({
                            userTestId: userTestId,
                            subjects: ["Physics", "Chemistry"],
                            Physics: phyQues,
                            Chemistry: chemQues,
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

module.exports = phyChem;
