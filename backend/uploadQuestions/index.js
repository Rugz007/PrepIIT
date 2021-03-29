const fastcsv = require("fast-csv");
const fs = require("fs");
var db = require("../db/index");

const uploadQuestions = (fileName, res) => {
  if (!fileName) {
    res.status(403).json({ success: false });
  }
  var questions = [];
  var stream = fs.createReadStream(
    `/workspace/backend/questionsBackup/${fileName}`
  );
  var questionData = [];
  var csvStream = fastcsv
    .parse()
    .on("data", (data) => {
      questionData.push(data);
    })
    .on("end", () => {
      questionData.shift();
      const query =
        "INSERT INTO questions VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
      questionData.forEach((row) => {
        questions.push(
          db.query(query, row).catch((err) => {
            err;
          })
        );
      });
      Promise.all(questions)
        .then((resp) => {
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          res.status(500).json({ success: false });
        });
    });
  stream.pipe(csvStream);
};
module.exports = uploadQuestions;
