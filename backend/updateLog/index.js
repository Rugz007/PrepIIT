const db = require("../db/index");
const updateLog = (questions, donetestid, res) => {
  const query = `INSERT INTO testquestions VALUES ('${donetestid}',$1,$2,'wrong',$3)`;
  var questionQueries = [];
  questions.forEach((question) => {
    questionQueries.push(db.query(query, question).catch((err) => err));
  });
  Promise.all(questionQueries)
    .then((resp) => {
      var marksExcludingNumerical = 0;
      db.query(
        "SELECT COUNT(*) FROM testquestions INNER JOIN questions ON testquestions.qid=questions.qid AND testquestions.useranswer=questions.answers"
      ).then((respo) => {
        console.log(respo.rows[0].count);
        marksExcludingNumerical = respo.rows[0].count;
        res.status(201).json({ marks: marksExcludingNumerical, success: true });
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
};
module.exports = updateLog;
