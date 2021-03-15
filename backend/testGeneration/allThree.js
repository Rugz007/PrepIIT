const randomstring = require("randomstring");
const db = require("../db");

const allThree = (testObject, res) => {
  console.log("Here");
  var phyQues = [];
  var chemQues = [];
  var mathQues = [];
  const userTestId = randomstring.generate({
    length: 15,
    charset: "alphabetic",
  });
  const mcqQuestions = testObject.mcqdata ? testObject.mcqdata[0] : 0;
  db.query(
    `SELECT * FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${mcqQuestions}`
  ).then((resp) => {
    if (resp.rows) phyQues.push(resp.rows);
    const fibQuestions = testObject.fibdata ? testObject.fibdata[0] : 0;
    db.query(
      `SELECT * FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${fibQuestions}`
    ).then((resp) => {
      if (resp.rows) phyQues.push(resp.rows);
      const assertionQuestions = testObject.assertiondata
        ? testObject.assertiondata[0]
        : 0;
      db.query(
        `SELECT * FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${assertionQuestions}`
      ).then((resp) => {
        if (resp.rows) phyQues.push(resp.rows);
        const trueFalseQuestions = testObject.truefalse
          ? testObject.truefalse[0]
          : 0;
        db.query(
          `SELECT * FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${trueFalseQuestions}`
        ).then((resp) => {
          if (resp.rows) phyQues.push(resp.rows);
          const numericalQuestions = testObject.numerical
            ? testObject.numerical[0]
            : 0;
          db.query(
            `SELECT * FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${numericalQuestions}`
          ).then((resp) => {
            if (resp.rows) phyQues.push(resp.rows);
            const matchColumnQuestions = testObject.matchcolumn
              ? testObject.matchcolumn[0]
              : 0;
            db.query(
              `SELECT * FROM questions WHERE is_reported=FALSE OR subject='physics' ORDER BY RANDOM() LIMIT ${matchColumnQuestions}`
            ).then((resp) => {
              if (resp.rows) phyQues.push(resp.rows);
              const mcqQuestions = testObject.mcqdata
                ? testObject.mcqdata[0]
                : 0;
              db.query(
                `SELECT * FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${mcqQuestions}`
              ).then((resp) => {
                if (resp.rows) chemQues.push(resp.rows);
                const fibQuestions = testObject.fibdata
                  ? testObject.fibdata[0]
                  : 0;
                db.query(
                  `SELECT * FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${fibQuestions}`
                ).then((resp) => {
                  if (resp.rows) chemQues.push(resp.rows);
                  const assertionQuestions = testObject.assertiondata
                    ? testObject.assertiondata[0]
                    : 0;
                  db.query(
                    `SELECT * FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${assertionQuestions}`
                  ).then((resp) => {
                    if (resp.rows) chemQues.push(resp.rows);
                    const trueFalseQuestions = testObject.truefalse
                      ? testObject.truefalse[0]
                      : 0;
                    db.query(
                      `SELECT * FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${trueFalseQuestions}`
                    ).then((resp) => {
                      if (resp.rows) chemQues.push(resp.rows);
                      const numericalQuestions = testObject.numerical
                        ? testObject.numerical[0]
                        : 0;
                      db.query(
                        `SELECT * FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${numericalQuestions}`
                      ).then((resp) => {
                        if (resp.rows) chemQues.push(resp.rows);
                        const matchColumnQuestions = testObject.matchcolumn
                          ? testObject.matchcolumn[0]
                          : 0;
                        db.query(
                          `SELECT * FROM questions WHERE is_reported=FALSE OR subject='chemistry' ORDER BY RANDOM() LIMIT ${matchColumnQuestions}`
                        ).then((resp) => {
                          if (resp.rows) chemQues.push(resp.rows);
                          const mcqQuestions = testObject.mcqdata
                            ? testObject.mcqdata[0]
                            : 0;
                          db.query(
                            `SELECT * FROM questions WHERE is_reported=FALSE OR subject='maths' ORDER BY RANDOM() LIMIT ${mcqQuestions}`
                          ).then((resp) => {
                            if (resp.rows) mathQues.push(resp.rows);
                            const fibQuestions = testObject.fibdata
                              ? testObject.fibdata[0]
                              : 0;
                            db.query(
                              `SELECT * FROM questions WHERE is_reported=FALSE OR subject='maths' ORDER BY RANDOM() LIMIT ${fibQuestions}`
                            ).then((resp) => {
                              if (resp.rows) mathQues.push(resp.rows);
                              const assertionQuestions = testObject.assertiondata
                                ? testObject.assertiondata[0]
                                : 0;
                              db.query(
                                `SELECT * FROM questions WHERE is_reported=FALSE OR subject='maths' ORDER BY RANDOM() LIMIT ${assertionQuestions}`
                              ).then((resp) => {
                                if (resp.rows) mathQues.push(resp.rows);
                                const trueFalseQuestions = testObject.truefalse
                                  ? testObject.truefalse[0]
                                  : 0;
                                db.query(
                                  `SELECT * FROM questions WHERE is_reported=FALSE OR subject='maths' ORDER BY RANDOM() LIMIT ${trueFalseQuestions}`
                                ).then((resp) => {
                                  if (resp.rows) mathQues.push(resp.rows);
                                  const numericalQuestions = testObject.numerical
                                    ? testObject.numerical[0]
                                    : 0;
                                  db.query(
                                    `SELECT * FROM questions WHERE is_reported=FALSE OR subject='maths' ORDER BY RANDOM() LIMIT ${numericalQuestions}`
                                  ).then((resp) => {
                                    if (resp.rows) mathQues.push(resp.rows);
                                    const matchColumnQuestions = testObject.matchcolumn
                                      ? testObject.matchcolumn[0]
                                      : 0;
                                    db.query(
                                      `SELECT * FROM questions WHERE is_reported=FALSE OR subject='maths' ORDER BY RANDOM() LIMIT ${matchColumnQuestions}`
                                    ).then((resp) => {
                                      if (resp.rows) mathQues.push(resp.rows);
                                      res.json({
                                        userTestId: userTestId,
                                        phyQues: phyQues,
                                        chemQues: chemQues,
                                        mathQues: mathQues,
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
            });
          });
        });
      });
    });
  });
};

module.exports = allThree;
