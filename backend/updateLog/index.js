const db = require("../db/index");
const updateLog = (questions, donetestid, res) => {
  console.log(questions);
  const query = `INSERT INTO testquestions VALUES ('${donetestid}',$1,$2,'wrong',$3)`;
  var questionQueries = [];
  questions.forEach((question) => {
    console.log(question);
    questionQueries.push(db.query(query, question).catch((err) => err));
  });
  Promise.all(questionQueries)
    .then((resp) => {
      console.log(questionQueries);
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
};
module.exports = updateLog;
